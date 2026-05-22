"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── GLSL: Simplex Noise (Stefan Gustavson) ───────────────────────────── */
const NOISE_GLSL = /* glsl */ `
vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289v4(((x*34.)+10.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289v3(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))
    +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 105.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/* ─── VERTEX SHADER ────────────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
${NOISE_GLSL}

uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  vNormal   = normal;
  vPosition = position;

  float t  = uTime * 0.16;
  float n1 = snoise(position * 1.6 + vec3(t * 0.80, t * 0.45, t * 0.60));
  float n2 = snoise(position * 3.2 + vec3(-t * 0.35, t * 0.70, -t * 0.50));
  float n3 = snoise(position * 6.5 + vec3(t * 0.25, -t * 0.55, t * 0.40));

  float disp = n1 * 0.32 + n2 * 0.14 + n3 * 0.05;
  vNoise = disp;

  vec3 displaced = position + normal * disp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

/* ─── FRAGMENT SHADER ──────────────────────────────────────────────────── */
const fragmentShader = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  /* ink-dark base */
  vec3 ink = vec3(0.032, 0.034, 0.040);

  /* Fresnel rim — bright edges facing away from camera */
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float rim = 1.0 - max(0.0, dot(normalize(vNormal), viewDir));
  rim = pow(rim, 2.2);

  /* surface veins along high-displacement ridges */
  float vein = smoothstep(0.16, 0.26, abs(vNoise));

  /* subtle pulse */
  float pulse = sin(uTime * 0.7) * 0.012 + 0.012;

  vec3 rimCol  = vec3(0.82, 0.88, 1.00) * rim  * 0.28;
  vec3 veinCol = vec3(0.55, 0.60, 0.70) * vein * 0.10;
  vec3 color   = ink + rimCol + veinCol + pulse;

  gl_FragColor = vec4(color, 1.0);
}
`;

/* ─── INK BLOB ─────────────────────────────────────────────────────────── */
function InkBlob() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 } },
      }),
    []
  );

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh material={material} position={[0.6, 0, 0]}>
      {/* high-poly sphere so displacement looks smooth */}
      <sphereGeometry args={[2.85, 256, 256]} />
    </mesh>
  );
}

/* ─── ORBITAL PARTICLES ────────────────────────────────────────────────── */
function OrbitalField() {
  const groupRef = useRef<THREE.Points>(null);

  const { positions, phases, radii } = useMemo(() => {
    const count = 4800;
    const pos    = new Float32Array(count * 3);
    const ph     = new Float32Array(count);
    const ra     = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r     = 3.6 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = (Math.random() - 0.5) * Math.PI * 0.75;

      pos[i * 3]     = r * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);

      ph[i] = Math.random() * Math.PI * 2;
      ra[i] = r;
    }
    return { positions: pos, phases: ph, radii: ra };
  }, []);

  const posRef = useRef(positions.slice());

  useFrame(({ clock }) => {
    const t   = clock.elapsedTime;
    const arr = posRef.current;

    for (let i = 0; i < 4800; i++) {
      const r   = radii[i];
      const spd = (0.08 + 0.04 / (r * 0.2)) * 0.22; // inner orbits faster
      const ph  = phases[i] + t * spd;

      /* gentle vertical oscillation */
      const vOsc = Math.sin(t * 0.12 + phases[i]) * 0.4;

      arr[i * 3]     = Math.cos(ph) * r;
      arr[i * 3 + 1] = Math.sin(ph * 0.6) * r * 0.18 + vOsc;
      arr[i * 3 + 2] = Math.sin(ph) * r;
    }

    if (groupRef.current) {
      (groupRef.current.geometry.attributes.position as THREE.BufferAttribute).array = arr;
      groupRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={groupRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={4800}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── CLOSE HALO PARTICLES (near blob) ────────────────────────────────── */
function HaloParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph  = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r     = 2.9 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi   = (Math.random() - 0.5) * Math.PI;
      pos[i * 3]     = r * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, phases: ph };
  }, []);

  const posRef = useRef(positions.slice());

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.18;
    const arr = posRef.current;
    for (let i = 0; i < count; i++) {
      const r   = 2.9 + Math.sin(phases[i] + t) * 0.5;
      const ph  = phases[i] + t * 0.3;
      const vph = phases[i] * 0.5 + t * 0.15;
      arr[i * 3]     = Math.cos(ph) * r;
      arr[i * 3 + 1] = Math.sin(vph) * r * 0.35;
      arr[i * 3 + 2] = Math.sin(ph) * r;
    }
    if (ref.current) {
      (ref.current.geometry.attributes.position as THREE.BufferAttribute).array = arr;
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#aabbff"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── CAMERA ────────────────────────────────────────────────────────────── */
function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.016;
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.016;
    camera.lookAt(0.6, 0, 0);
  });
  return null;
}

/* ─── EXPORT ────────────────────────────────────────────────────────────── */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 48 }}
      style={{ background: "transparent" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      {/* Minimal ambient — shaders handle their own lighting */}
      <ambientLight intensity={0.0} />
      <pointLight position={[6, 8, 4]}  intensity={2} color="#ffffff" />
      <pointLight position={[-4, -5, 2]} intensity={1} color="#6688cc" />

      <InkBlob />
      <HaloParticles />
      <OrbitalField />
      <CameraRig />
    </Canvas>
  );
}
