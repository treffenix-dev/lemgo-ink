"use client";

import { useEffect, useRef } from "react";

// Three.js types inlined to avoid import issues at module level
type Renderer = {
  setSize(w: number, h: number): void;
  setPixelRatio(r: number): void;
  render(scene: unknown, camera: unknown): void;
  dispose(): void;
  domElement: HTMLCanvasElement;
};

export function WaveMesh() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let raf: number;
    let THREE: typeof import("three");
    let renderer: Renderer;
    let cleanup = false;

    async function init() {
      THREE = await import("three");
      if (cleanup) return;

      let W = window.innerWidth;
      let H = window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 200);
      camera.position.set(0, 5, 16);
      camera.lookAt(0, -2, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.cssText =
        "position:fixed;inset:0;z-index:0;pointer-events:none;";
      mount.appendChild(renderer.domElement);

      // ── Flowing wave surface (GLSL shader) ──────────────────────────
      const SEGS = 80;
      const geo = new THREE.PlaneGeometry(34, 22, SEGS, SEGS);

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime:   { value: 0 },
          uScroll: { value: 0 },
          uMouse:  { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: /* glsl */`
          uniform float uTime;
          uniform float uScroll;
          uniform vec2  uMouse;
          varying float vZ;
          varying vec2  vUv;

          void main() {
            vUv = uv;
            vec3 p = position;

            // Four overlapping sine waves — more complex, more dramatic
            float w1 = sin(p.x * 0.42 + uTime * 0.85)
                     * cos(p.y * 0.36 + uTime * 0.52) * 2.4;
            float w2 = sin(p.x * 0.26 + p.y * 0.20 + uTime * 1.2) * 1.4;
            float w3 = cos(p.x * 0.16 - p.y * 0.13 + uTime * 0.65) * 0.85;
            float w4 = sin(p.x * 0.55 + p.y * 0.08 - uTime * 1.45) * 0.6;

            // Mouse influence — stronger pull
            float mDist = length(vec2(p.x, p.y) - uMouse * 10.0);
            float mPull = exp(-mDist * 0.1) * 2.2;

            p.z = (w1 + w2 + w3 + w4) * 1.3 + mPull - uScroll * 5.0;
            vZ = p.z;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: /* glsl */`
          varying float vZ;
          varying vec2  vUv;
          uniform float uTime;

          void main() {
            // Stronger depth contrast — darker valleys, brighter crests
            float d = clamp((vZ + 3.5) / 7.0, 0.0, 1.0);
            vec3 col = mix(
              vec3(0.005, 0.005, 0.02),  // dark valley
              vec3(0.10, 0.15, 0.32),    // crest — visible navy
              d
            );

            // Edge fade
            float ex = smoothstep(0.0, 0.14, vUv.x) * smoothstep(1.0, 0.86, vUv.x);
            float ey = smoothstep(0.0, 0.10, vUv.y) * smoothstep(1.0, 0.90, vUv.y);
            float edge = ex * ey;

            // Bright crest shimmer
            float crest = pow(clamp(d, 0.0, 1.0), 2.5) * 0.8;
            col += vec3(crest * 0.25, crest * 0.38, crest * 1.0);

            gl_FragColor = vec4(col, (0.55 + crest * 0.3) * edge);
          }
        `,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI * 0.30;
      scene.add(mesh);

      // ── Second mesh for layered depth ───────────────────────────────
      const mat2 = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime:   { value: 0 },
          uScroll: { value: 0 },
          uMouse:  { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: /* glsl */`
          uniform float uTime;
          uniform float uScroll;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 p = position;
            p.z = sin(p.x * 0.28 + uTime * 0.55) * cos(p.y * 0.22 + uTime * 0.38) * 0.9
                + sin(p.x * 0.16 + p.y * 0.14 + uTime * 0.8) * 0.45
                - uScroll * 2.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: /* glsl */`
          varying vec2 vUv;
          void main() {
            float ex = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
            float ey = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
            gl_FragColor = vec4(0.05, 0.07, 0.18, 0.12 * ex * ey);
          }
        `,
      });
      const mesh2 = new THREE.Mesh(new THREE.PlaneGeometry(34, 22, 40, 40), mat2);
      mesh2.rotation.x = -Math.PI * 0.30;
      mesh2.position.set(0, -3, -5);
      scene.add(mesh2);

      // ── Mouse tracking ───────────────────────────────────────────────
      const mouse = new THREE.Vector2(0, 0);
      const targetCam = new THREE.Vector3(0, 5, 16);

      const onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / W - 0.5) * 2;
        mouse.y = -(e.clientY / H - 0.5) * 2;
        targetCam.x = mouse.x * 1.5;
        targetCam.y = 5 + mouse.y * 0.8;
      };
      window.addEventListener("mousemove", onMouse);

      // ── Scroll tracking ──────────────────────────────────────────────
      let scrollY = 0;
      const onScroll = () => { scrollY = window.scrollY; };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Resize ───────────────────────────────────────────────────────
      const onResize = () => {
        W = window.innerWidth;
        H = window.innerHeight;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
      };
      window.addEventListener("resize", onResize);

      // ── Render loop ──────────────────────────────────────────────────
      const clock = new THREE.Clock();

      const tick = () => {
        raf = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();
        const scroll = Math.min(scrollY / (window.innerHeight * 0.8), 1);

        // Smooth camera follow
        camera.position.lerp(targetCam, 0.025);
        camera.lookAt(0, -2, 0);

        // Update uniforms
        (mat.uniforms.uTime as { value: number }).value = t;
        (mat.uniforms.uScroll as { value: number }).value = scroll;
        (mat.uniforms.uMouse as { value: THREE.Vector2 }).value = mouse;
        (mat2.uniforms.uTime as { value: number }).value = t;
        (mat2.uniforms.uScroll as { value: number }).value = scroll;

        renderer.render(scene, camera);
      };
      tick();

      // Cleanup refs
      (mount as { _cleanup?: () => void })._cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        mat2.dispose();
        mesh2.geometry.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    }

    init();

    return () => {
      cleanup = true;
      const m = mount as { _cleanup?: () => void };
      if (m._cleanup) m._cleanup();
    };
  }, []);

  return <div ref={mountRef} aria-hidden />;
}
