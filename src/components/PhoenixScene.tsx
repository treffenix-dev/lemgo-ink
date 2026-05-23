"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 5000;
const CYCLE = 29.0;

function ease(t: number): number {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
}

/* ── VERTEX SHADER ─────────────────────────────────────────────────────── */
const vertexShader = /* glsl */`
attribute vec3  aTarget;
attribute float aRandom;
attribute vec3  aColor;

uniform float uTime;
uniform float uGather;
uniform float uScroll;

varying vec3  vColor;
varying float vAlpha;

void main() {
  vec3 pos = mix(position, aTarget, uGather);

  /* Turbulent scatter flight */
  float sp  = 1.0 - uGather;
  float sa  = aRandom * 6.2832 + uTime * (0.22 + aRandom * 0.38);
  float se  = (aRandom - 0.5) * 3.14159;
  vec3  fd  = vec3(cos(sa)*cos(se), sin(se)*0.8 + aRandom*0.2 - 0.1, sin(sa)*cos(se)*0.45);
  pos += fd * sp * (2.8 + aRandom * 5.5);

  /* Organic breathing */
  pos.x += sin(aTarget.y * 2.4 + uTime * 0.75 + aRandom * 6.28) * 0.050 * uGather;
  pos.y += cos(aTarget.x * 1.9 + uTime * 0.55 + aRandom * 3.14) * 0.035 * uGather;

  /* Slow Y-axis rotation */
  float rot = uTime * 0.085 * uGather;
  float c   = cos(rot);
  float s   = sin(rot);
  pos = vec3(pos.x * c - pos.z * s, pos.y, pos.x * s + pos.z * c);

  /* Scroll dispersion */
  float scr = clamp(uScroll, 0.0, 1.0);
  pos.y += scr * (aRandom * 3.5 + 2.0);
  pos.x += scr * sin(aRandom * 6.28) * 2.5;
  pos.z += scr * cos(aRandom * 6.28) * 1.2;

  vColor = aColor;
  vAlpha = (uGather * 0.88 + sp * 0.10) * (1.0 - scr * 0.85);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = max(1.2, (uGather * 18.0 + sp * 8.0) / -mv.z);
  gl_Position  = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */`
varying vec3  vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d) * vAlpha * 0.92;
  gl_FragColor = vec4(vColor, a);
}
`;

/* ── SHAPE 1: PHOENIX ───────────────────────────────────────────────────── */
function buildPhoenixTargets(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  let idx = 0;
  const nHead  = Math.floor(count * 0.10);
  const nBody  = Math.floor(count * 0.15);
  const nLWing = Math.floor(count * 0.27);
  const nRWing = Math.floor(count * 0.27);
  const nTail  = count - nHead - nBody - nLWing - nRWing;

  for (let i = 0; i < nHead; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.38;
    arr[idx++] = Math.cos(a) * r * 0.75;
    arr[idx++] = 2.1 + Math.random() * 0.7;
    arr[idx++] = Math.sin(a) * r * 0.28;
  }
  for (let i = 0; i < nBody; i++) {
    const h = Math.random();
    const a = Math.random() * Math.PI * 2;
    const r = (0.30 - h * 0.16) * Math.sqrt(Math.random());
    arr[idx++] = Math.cos(a) * r;
    arr[idx++] = -0.9 + h * 3.1;
    arr[idx++] = Math.sin(a) * r * 0.45;
  }
  for (let i = 0; i < nLWing; i++) {
    const u = Math.pow(Math.random(), 0.55);
    const v = Math.random();
    arr[idx++] = -(u * 3.6 + v * 0.28);
    arr[idx++] = 1.2 - u * u * 0.6 + (v - 0.5) * (1.05 - u * 0.65);
    arr[idx++] = (Math.random() - 0.5) * 0.14 * (1 - u * 0.7);
  }
  for (let i = 0; i < nRWing; i++) {
    const u = Math.pow(Math.random(), 0.55);
    const v = Math.random();
    arr[idx++] = u * 3.6 + v * 0.28;
    arr[idx++] = 1.2 - u * u * 0.6 + (v - 0.5) * (1.05 - u * 0.65);
    arr[idx++] = (Math.random() - 0.5) * 0.14 * (1 - u * 0.7);
  }
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

/* ── SHAPE 2: "LEMGO INK" TEXT ──────────────────────────────────────────── */
function buildTextTargets(count: number): Float32Array {
  if (typeof document === "undefined") {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i*3] = (Math.random()-0.5)*8; arr[i*3+1] = (Math.random()-0.5)*3; arr[i*3+2] = 0;
    }
    return arr;
  }
  const W = 800, H = 360;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 116px Arial, sans-serif";
  ctx.fillText("LEMGO", W / 2, 148);
  ctx.font = "bold 148px Arial, sans-serif";
  ctx.fillText("INK", W / 2, 316);

  const px  = ctx.getImageData(0, 0, W, H).data;
  const lit: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (px[(y * W + x) * 4 + 3] > 100) lit.push(x, y);
    }
  }
  const n   = lit.length / 2;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    if (n === 0) continue;
    const k      = Math.floor(Math.random() * n) * 2;
    arr[i*3]   = (lit[k]     / W - 0.5) * 8.2;
    arr[i*3+1] = -(lit[k+1] / H - 0.5) * 3.4;
    arr[i*3+2] = (Math.random() - 0.5) * 0.18;
  }
  return arr;
}

/* ── SHAPE 3: GOTHIC SPIRE / LEMGO INK LOGO ────────────────────────────── */
function buildLogoTargets(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  let idx = 0;

  const nSpire    = Math.floor(count * 0.27);
  const nBody     = Math.floor(count * 0.31);
  const nCrescent = Math.floor(count * 0.16);
  const nWings    = Math.floor(count * 0.12);
  const nBase     = count - nSpire - nBody - nCrescent - nWings;

  /* Narrow pointed spire */
  for (let i = 0; i < nSpire; i++) {
    const t = Math.random();
    const w = 0.16 * (1 - t);
    arr[idx++] = (Math.random() - 0.5) * w * 2;
    arr[idx++] = 1.3 + t * 2.1;
    arr[idx++] = (Math.random() - 0.5) * 0.06;
  }
  /* Church body */
  for (let i = 0; i < nBody; i++) {
    arr[idx++] = (Math.random() - 0.5) * 1.1;
    arr[idx++] = -1.5 + Math.random() * 2.9;
    arr[idx++] = (Math.random() - 0.5) * 0.1;
  }
  /* Crescent moon above spire */
  for (let i = 0; i < nCrescent; i++) {
    const a   = Math.PI * 0.15 + Math.random() * Math.PI * 0.7;
    const or  = 0.30;
    const ox  = Math.cos(a) * or;
    const oy  = Math.sin(a) * or * 0.6;
    const isx = 0.11, ir = 0.20;
    const dist = Math.sqrt((ox - isx) * (ox - isx) + (oy / 0.6) * (oy / 0.6));
    if (dist > ir) {
      arr[idx++] = ox; arr[idx++] = 3.7 + oy; arr[idx++] = (Math.random()-0.5)*0.04;
    } else {
      const a2 = Math.PI + Math.random() * Math.PI * 0.4;
      arr[idx++] = Math.cos(a2) * or; arr[idx++] = 3.7 + Math.sin(a2) * or * 0.6; arr[idx++] = 0;
    }
  }
  /* Flying buttresses */
  for (let i = 0; i < nWings; i++) {
    const side = Math.random() > 0.5 ? 1 : -1;
    const t    = Math.random();
    arr[idx++] = side * (0.58 + t * 0.72);
    arr[idx++] = 0.4 - t * 1.1;
    arr[idx++] = (Math.random() - 0.5) * 0.08;
  }
  /* Base */
  for (let i = 0; i < nBase; i++) {
    arr[idx++] = (Math.random() - 0.5) * 1.5;
    arr[idx++] = -1.5 + (Math.random() - 0.5) * 0.12;
    arr[idx++] = (Math.random() - 0.5) * 0.1;
  }
  return arr;
}

/* ── COLOR BUILDERS ─────────────────────────────────────────────────────── */
function buildPhoenixColors(targets: Float32Array, count: number): Float32Array {
  const c = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = targets[i*3+1];
    let r: number, g: number, b: number;
    if (y > 1.5)       { r=0.95; g=0.95; b=1.0; }
    else if (y > 0.3)  { const t=(y-0.3)/1.2; r=0.83+t*0.12; g=0.69+t*0.26; b=0.22+t*0.78; }
    else if (y > -0.85){ r=0.83; g=0.69; b=0.22; }
    else               { const t=Math.min(1,(-y-0.85)/2.4); r=0.83-t*0.18; g=0.69-t*0.38; b=0.22-t*0.10; }
    c[i*3]=r; c[i*3+1]=g; c[i*3+2]=b;
  }
  return c;
}

function buildTextColors(targets: Float32Array, count: number): Float32Array {
  const c = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = Math.abs(targets[i*3]);
    const t = Math.min(1, x / 3.0);
    c[i*3]   = 0.88 + t * 0.07;
    c[i*3+1] = 0.75 + t * 0.20;
    c[i*3+2] = 0.22 + t * 0.73;
  }
  return c;
}

function buildLogoColors(targets: Float32Array, count: number): Float32Array {
  const c = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = targets[i*3+1];
    let r: number, g: number, b: number;
    if (y > 3.2)       { r=0.97; g=0.95; b=0.90; }
    else if (y > 1.8)  { const t=(y-1.8)/1.4; r=0.90+t*0.07; g=0.83+t*0.12; b=0.60+t*0.30; }
    else if (y > 0.0)  { r=0.83; g=0.69; b=0.22; }
    else               { r=0.78; g=0.62; b=0.18; }
    c[i*3]=r; c[i*3+1]=g; c[i*3+2]=b;
  }
  return c;
}

/* ── PARTICLES COMPONENT ────────────────────────────────────────────────── */
function PhoenixParticles() {
  const geoRef   = useRef<THREE.BufferGeometry>(null);
  const stateRef = useRef({ currentShape: 0 });

  const { initPos, phoenixT, textT, logoT, phoenixC, textC, logoC, randoms } = useMemo(() => {
    const phT = buildPhoenixTargets(COUNT);
    const txT = buildTextTargets(COUNT);
    const lgT = buildLogoTargets(COUNT);
    const init = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 4 + Math.random() * 5;
      init[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      init[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      init[i*3+2] = r * Math.cos(phi);
      rand[i] = Math.random();
    }
    return {
      initPos: init,
      phoenixT: phT, textT: txT, logoT: lgT,
      phoenixC: buildPhoenixColors(phT, COUNT),
      textC:    buildTextColors(txT, COUNT),
      logoC:    buildLogoColors(lgT, COUNT),
      randoms:  rand,
    };
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { uTime: { value: 0 }, uGather: { value: 0 }, uScroll: { value: 0 } },
    transparent: true,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), []);

  useFrame(({ clock }) => {
    const t   = clock.elapsedTime;
    const cT  = t % CYCLE;

    /* ── Which shape target is active ── */
    const targetShape = cT < 9.5 ? 0 : cT < 19.5 ? 1 : 2;

    /* ── Gather value (0 = scattered, 1 = fully formed) ── */
    let gather: number;
    if      (cT < 2.5)  gather = ease(cT / 2.5);
    else if (cT < 8.0)  gather = 1.0;
    else if (cT < 9.5)  gather = 1.0 - ease((cT - 8.0)  / 1.5);
    else if (cT < 12.0) gather = ease((cT - 9.5)  / 2.5);
    else if (cT < 18.0) gather = 1.0;
    else if (cT < 19.5) gather = 1.0 - ease((cT - 18.0) / 1.5);
    else if (cT < 22.0) gather = ease((cT - 19.5) / 2.5);
    else if (cT < 27.5) gather = 1.0;
    else                gather = 1.0 - ease((cT - 27.5) / 1.5);

    /* Breathing pulse when fully gathered */
    if (gather >= 0.99) gather = 0.94 + Math.sin(t * 0.4) * 0.06;

    /* ── Swap buffers when scattered ── */
    const state = stateRef.current;
    if (targetShape !== state.currentShape && gather < 0.12) {
      const geo = geoRef.current;
      if (geo) {
        const newT = [phoenixT, textT, logoT][targetShape];
        const newC = [phoenixC, textC, logoC][targetShape];
        (geo.attributes.aTarget as THREE.BufferAttribute).set(newT);
        (geo.attributes.aTarget as THREE.BufferAttribute).needsUpdate = true;
        (geo.attributes.aColor  as THREE.BufferAttribute).set(newC);
        (geo.attributes.aColor  as THREE.BufferAttribute).needsUpdate = true;
      }
      state.currentShape = targetShape;
    }

    material.uniforms.uTime.value   = t;
    material.uniforms.uGather.value = gather;
    material.uniforms.uScroll.value = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
  });

  return (
    <points material={material}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" count={COUNT} array={initPos}   itemSize={3} />
        <bufferAttribute attach="attributes-aTarget"  count={COUNT} array={phoenixT}  itemSize={3} />
        <bufferAttribute attach="attributes-aColor"   count={COUNT} array={phoenixC}  itemSize={3} />
        <bufferAttribute attach="attributes-aRandom"  count={COUNT} array={randoms}   itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

/* ── CAMERA PARALLAX ────────────────────────────────────────────────────── */
function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.7 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── AMBIENT MIST ───────────────────────────────────────────────────────── */
function GoldMist() {
  const ref       = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 5;
      arr[i*3]   = Math.cos(a) * r;
      arr[i*3+1] = (Math.random() - 0.5) * 8;
      arr[i*3+2] = Math.sin(a) * r * 0.35;
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.018;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={220} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.014} color="#D4AF37" transparent opacity={0.12}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ── EXPORT ─────────────────────────────────────────────────────────────── */
export default function PhoenixScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 52 }}
      style={{ background: "#000000" }}
      gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
    >
      <ambientLight intensity={0.0} />
      <PhoenixParticles />
      <GoldMist />
      <CameraRig />
    </Canvas>
  );
}
