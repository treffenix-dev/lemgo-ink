"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D-Kerzenlicht: goldene Glut-Partikel schweben mit echter Tiefe im Raum,
 * sanfte Kamera-Parallaxe auf Mausbewegung. Raw Three.js, leichtgewichtig,
 * SSR-sicher, respektiert prefers-reduced-motion.
 */
export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 14;

    // Partikel-Volumen
    const COUNT = 520;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      speeds[i] = Math.random() * 0.012 + 0.004;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Weiches, glühendes Partikel-Sprite
    const sprite = makeGlowTexture();
    const mat = new THREE.PointsMaterial({
      size: 0.5,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color("#E9B45A"),
      sizeAttenuation: true,
      opacity: 0.9,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Maus-Parallaxe
    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 1.4;
      target.y = (e.clientY / window.innerHeight - 0.5) * 1.0;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      for (let i = 0; i < COUNT; i++) {
        let y = pos.getY(i) + speeds[i];
        if (y > 11) y = -11;
        pos.setY(i, y);
        pos.setX(i, pos.getX(i) + Math.sin(t * 0.5 + i) * 0.002);
      }
      pos.needsUpdate = true;
      points.rotation.y = t * 0.03;

      camera.position.x += (target.x - camera.position.x) * 0.03;
      camera.position.y += (-target.y - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}

/** Erzeugt eine weiche, runde Glow-Textur per Canvas (kein externes Asset). */
function makeGlowTexture(): THREE.Texture {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,225,170,1)");
  g.addColorStop(0.3, "rgba(233,180,90,0.7)");
  g.addColorStop(1, "rgba(233,150,60,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
