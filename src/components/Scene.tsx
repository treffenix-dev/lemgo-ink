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
          color="#0d0d0d"
          emissive="#c9a227"
          emissiveIntensity={0.06}
          distort={0.55}
          speed={1.4}
          roughness={0.05}
          metalness={0.98}
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
      <meshBasicMaterial color="#c9a227" transparent opacity={0.03} />
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
        color="#c9a227"
        emissive="#c9a227"
        emissiveIntensity={1.2}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

/* Gold orbital ring 2 — thinner, slower */
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
      <torusGeometry args={[3.7, 0.01, 8, 200]} />
      <meshStandardMaterial
        color="#c9a227"
        emissive="#c9a227"
        emissiveIntensity={0.6}
        metalness={1}
        roughness={0}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* Gold dust particles */
function GoldParticles() {
  const count = 2200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.007;
    ref.current.rotation.x = state.clock.elapsedTime * 0.003;
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
        size={0.022}
        color="#c9a227"
        transparent
        opacity={0.3}
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
      {/* Dramatic tattoo-studio lighting */}
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 8, 3]} intensity={3} color="#c9a227" />
      <pointLight position={[0, -6, 2]} intensity={1.5} color="#8b0000" />
      <pointLight position={[-6, 2, 4]} intensity={1} color="#ffffff" />
      <pointLight position={[6, -2, -2]} intensity={0.5} color="#c9a227" />

      <InkBlob />
      <GlowCore />
      <GoldRing1 />
      <GoldRing2 />
      <GoldParticles />
      <CameraRig />
    </Canvas>
  );
}
