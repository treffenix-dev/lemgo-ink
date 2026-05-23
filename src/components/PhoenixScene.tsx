"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── VERTEX SHADER ─────────────────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
attribute vec3  aTarget;
attribute float aRandom;
attribute vec3  aColor;

uniform float uTime;
uniform float uProgress;
uniform float uScroll;

varying vec3  vColor;
varying float vAlpha;

void main() {
  float p = clamp(uProgress, 0.0, 1.0);

  /* Lerp from scattered start pos to phoenix target */
  vec3 pos = mix(position, aTarget, p);

  /* Organic breathing */
  float bx = sin(pos.y * 2.4 + uTime * 0.75 + aRandom * 6.28) * 0.055 * p;
  float by = cos(pos.x * 1.9 + uTime * 0.55 + aRandom * 3.14) * 0.038 * p;
  pos.x += bx;
  pos.y += by;

  /* Slow Y-axis rotation */
  float angle = uTime * 0.09;
  float cosA  = cos(angle);
  float sinA  = sin(angle);
  float rx    = pos.x * cosA - pos.z * sinA;
  float rz    = pos.x * sinA + pos.z * cosA;
  pos = vec3(rx, pos.y, rz);

  /* Scroll dispersion — fly upward and outward */
  float sp = clamp(uScroll, 0.0, 1.0);
  pos.y += sp * (aRandom * 3.5 + 2.0);
  pos.x += sp * sin(aRandom * 6.28) * 2.5;
  pos.z += sp * cos(aRandom * 6.28) * 1.2;

  vColor = aColor;
  vAlpha = p * (1.0 - sp * 0.85);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = max(1.5, 22.0 / -mvPosition.z);
  gl_Position  = projectionMatrix * mvPosition;
}
`;

/* ── FRAGMENT SHADER ───────────────────────────────────────────────────────── */
const fragmentShader = /* glsl */ `
varying vec3  vColor;
varying float vAlpha;

void main() {
  float d     = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.05, d) * vAlpha * 0.88;
  gl_FragColor = vec4(vColor, alpha);
}
`;

/* ── PHOENIX GEOMETRY GENERATOR ─────────────────────────────────────────────── */
function buildPhoenixTargets(count: number) {
  const arr = new Float32Array(count * 3);
  let idx = 0;

  const nHead  = Math.floor(count * 0.10);
  const nBody  = Math.floor(count * 0.15);
  const nLWing = Math.floor(count * 0.27);
  const nRWing = Math.floor(count * 0.27);
  const nTail  = count - nHead - nBody - nLWing - nRWing;

  /* HEAD — teardrop cluster at top */
  for (let i = 0; i < nHead; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.38;
    arr[idx++] = Math.cos(a) * r * 0.75;
    arr[idx++] = 2.1 + Math.random() * 0.7;
    arr[idx++] = Math.sin(a) * r * 0.28;
  }

  /* BODY — tapered column */
  for (let i = 0; i < nBody; i++) {
    const h = Math.random();
    const a = Math.random() * Math.PI * 2;
    const r = (0.30 - h * 0.16) * Math.sqrt(Math.random());
    arr[idx++] = Math.cos(a) * r;
    arr[idx++] = -0.9 + h * 3.1;
    arr[idx++] = Math.sin(a) * r * 0.45;
  }

  /* LEFT WING — broad sweep up-left */
  for (let i = 0; i < nLWing; i++) {
    const u = Math.pow(Math.random(), 0.55);
    const v = Math.random();
    const wx = -(u * 3.6 + v * 0.28);
    const wy = 1.2 - u * u * 0.6 + (v - 0.5) * (1.05 - u * 0.65);
    const wz = (Math.random() - 0.5) * 0.14 * (1 - u * 0.7);
    arr[idx++] = wx;
    arr[idx++] = wy;
    arr[idx++] = wz;
  }

  /* RIGHT WING — mirror */
  for (let i = 0; i < nRWing; i++) {
    const u = Math.pow(Math.random(), 0.55);
    const v = Math.random();
    const wx = u * 3.6 + v * 0.28;
    const wy = 1.2 - u * u * 0.6 + (v - 0.5) * (1.05 - u * 0.65);
    const wz = (Math.random() - 0.5) * 0.14 * (1 - u * 0.7);
    arr[idx++] = wx;
    arr[idx++] = wy;
    arr[idx++] = wz;
  }

  /* TAIL — spreading fan downward */
  for (let i = 0; i < nTail; i++) {
    const t   = Math.random();
    const fan = Math.pow(t, 0.45) * 2.4;
    const a   = (Math.random() - 0.5) * Math.PI * 1.15;
    arr[idx++] = Math.sin(a) * fan;
    arr[idx++] = -0.9 - t * 2.8;
    arr[idx++] = (Math.random() - 0.5) * fan * 0.22;
  }

  return arr;
}

function buildColors(targets: Float32Array, count: number) {
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = targets[i * 3 + 1];
    let r: number, g: number, b: number;

    if (y > 1.5) {
      /* Wing tips & head: silver-white */
      r = 0.95; g = 0.95; b = 1.0;
    } else if (y > 0.3) {
      /* Upper wings: gold → white blend */
      const t = (y - 0.3) / 1.2;
      r = 0.83 + t * 0.12;
      g = 0.69 + t * 0.26;
      b = 0.22 + t * 0.78;
    } else if (y > -0.85) {
      /* Body: pure gold #D4AF37 */
      r = 0.83; g = 0.69; b = 0.22;
    } else {
      /* Tail: amber → dark gold */
      const t = Math.min(1, (-y - 0.85) / 2.4);
      r = 0.83 - t * 0.18;
      g = 0.69 - t * 0.38;
      b = 0.22 - t * 0.10;
    }

    colors[i * 3]     = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }
  return colors;
}

/* ── PHOENIX PARTICLES ──────────────────────────────────────────────────────── */
function PhoenixParticles() {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const COUNT  = 5000;
  const progressRef = useRef(0);

  const { initPos, targetPos, randoms, colors } = useMemo(() => {
    const target = buildPhoenixTargets(COUNT);
    const init   = new Float32Array(COUNT * 3);
    const rand   = new Float32Array(COUNT);
    const col    = buildColors(target, COUNT);

    for (let i = 0; i < COUNT; i++) {
      /* Scattered start positions — spherical shell */
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 4 + Math.random() * 5;
      init[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      init[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      init[i * 3 + 2] = r * Math.cos(phi);
      rand[i] = Math.random();
    }

    return { initPos: init, targetPos: target, randoms: rand, colors: col };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime:     { value: 0 },
          uProgress: { value: 0 },
          uScroll:   { value: 0 },
        },
        transparent: true,
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
        vertexColors: false,
      }),
    []
  );

  matRef.current = material;

  useFrame(({ clock }) => {
    const t  = clock.elapsedTime;
    const sp = Math.min(1, window.scrollY / (window.innerHeight * 0.9));

    /* Animate progress: 0→1 over first 2.5s, then gentle pulse */
    if (progressRef.current < 1) {
      progressRef.current = Math.min(1, t / 2.5);
    }
    const pulse = progressRef.current >= 1
      ? 0.94 + Math.sin(t * 0.4) * 0.06
      : progressRef.current;

    material.uniforms.uTime.value     = t;
    material.uniforms.uProgress.value = pulse;
    material.uniforms.uScroll.value   = sp;
  });

  return (
    <points material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={initPos}    itemSize={3} />
        <bufferAttribute attach="attributes-aTarget"  count={COUNT} array={targetPos}  itemSize={3} />
        <bufferAttribute attach="attributes-aColor"   count={COUNT} array={colors}     itemSize={3} />
        <bufferAttribute attach="attributes-aRandom"  count={COUNT} array={randoms}    itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

/* ── CAMERA PARALLAX ────────────────────────────────────────────────────────── */
function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.7 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── AMBIENT MIST ────────────────────────────────────────────────────────────── */
function GoldMist() {
  const ref   = useRef<THREE.Points>(null);
  const COUNT = 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 5;
      arr[i * 3]     = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = Math.sin(a) * r * 0.35;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        color="#D4AF37"
        transparent
        opacity={0.12}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── EXPORT ─────────────────────────────────────────────────────────────────── */
export default function PhoenixScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 52 }}
      style={{ background: "#000000" }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
    >
      <ambientLight intensity={0.0} />
      <PhoenixParticles />
      <GoldMist />
      <CameraRig />
    </Canvas>
  );
}
