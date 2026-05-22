"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* Central ink blob — dark metallic morphing sphere */
function InkBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.03;
  });
  return (
    <Float speed={0.7} floatIntensity={0.35} rotationIntensity={0.15}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.9, 128, 128]} />
        <MeshDistortMaterial
          color="#121212"
          emissive="#000000"
          emissiveIntensity={0.05}
          distort={0.75}
          speed={1.8}
          roughness={0.02}
          metalness={0.99}
        />
      </mesh>
    </Float>
  );
}

/* Inner glow sphere */
function GlowCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 0.9 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
    </mesh>
  );
}

/* Gold orbital ring 1 */
function GoldRing1() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.25;
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.9, 0.018, 8, 200]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.6}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

/* Crimson orbital ring 2 — blood red, slower */
function GoldRing2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 3 + state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.7, 0.012, 8, 200]} />
      <meshStandardMaterial
        color="#aaaaaa"
        emissive="#aaaaaa"
        emissiveIntensity={0.5}
        metalness={1}
        roughness={0}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

/* Ink drop particles — fall downward like dripping ink */
function InkParticles() {
  const count = 1800;
  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      spd[i] = 0.003 + Math.random() * 0.008;
      off[i] = Math.random() * Math.PI * 2;
      void r; void theta;
    }
    return { positions: pos, speeds: spd, offsets: off };
  }, []);

  const ref = useRef<THREE.Points>(null);
  const posRef = useRef(positions.slice());

  useFrame(() => {
    if (!ref.current) return;
    const arr = posRef.current;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i];
      if (arr[i * 3 + 1] < -13) {
        arr[i * 3 + 1] = 13;
        arr[i * 3] = (Math.random() - 0.5) * 26;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
      }
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).array = arr;
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#ffffff"
        transparent
        opacity={0.22}
        sizeAttenuation
      />
    </points>
  );
}

/* Camera follows mouse subtly */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x +=
      (state.mouse.x * 0.6 - state.camera.position.x) * 0.025;
    state.camera.position.y +=
      (state.mouse.y * 0.4 - state.camera.position.y) * 0.025;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Gothic tattoo-studio lighting */}
      <ambientLight intensity={0.06} />
      <pointLight position={[0, 10, 3]} intensity={4} color="#ffffff" />
      <pointLight position={[0, -8, 2]} intensity={1.5} color="#666666" />
      <pointLight position={[-5, 2, 5]} intensity={0.8} color="#ffffff" />
      <fog attach="fog" args={["#030303", 12, 38]} />

      <InkBlob />
      <GlowCore />
      <GoldRing1 />
      <GoldRing2 />
      <InkParticles />
      <CameraRig />
    </Canvas>
  );
}
