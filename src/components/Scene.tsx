"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* Tattoo machine grip — dark chrome cylinder with texture rings */
function MachinGrip() {
  return (
    <group>
      {/* Main grip body */}
      <mesh>
        <cylinderGeometry args={[0.21, 0.25, 2.6, 32]} />
        <meshStandardMaterial
          color="#0e0e0e"
          metalness={0.98}
          roughness={0.03}
          emissive="#ffffff"
          emissiveIntensity={0.008}
        />
      </mesh>

      {/* Knurling rings on grip */}
      {[-0.85, -0.4, 0.05, 0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.26, 0.02, 8, 32]} />
          <meshStandardMaterial color="#1c1c1c" metalness={1} roughness={0.01} />
        </mesh>
      ))}

      {/* Bottom cap */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.16, 0.21, 0.2, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.97} roughness={0.05} />
      </mesh>

      {/* Needle tube */}
      <mesh position={[0, -2.05, 0]}>
        <cylinderGeometry args={[0.048, 0.03, 1.5, 16]} />
        <meshStandardMaterial color="#181818" metalness={0.99} roughness={0.01} />
      </mesh>

      {/* Motor housing */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.27, 0.21, 0.55, 32]} />
        <meshStandardMaterial color="#0c0c0c" metalness={0.95} roughness={0.07} />
      </mesh>

      {/* Coil body */}
      <mesh position={[0, 1.94, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.52, 20]} />
        <meshStandardMaterial
          color="#131313"
          metalness={0.9}
          roughness={0.15}
          emissive="#ffffff"
          emissiveIntensity={0.004}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 2.22, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.08} />
      </mesh>
    </group>
  );
}

/* Rapidly vibrating needle tip — mimics tattoo machine motion */
function NeedleTip() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    // Rapid oscillation ~20 cycles/sec for visual clarity
    const v = Math.abs(Math.sin(state.clock.elapsedTime * 20)) * 0.055;
    ref.current.position.y = -2.88 + v;
  });

  return (
    <mesh ref={ref} position={[0, -2.88, 0]}>
      <coneGeometry args={[0.026, 0.44, 8]} />
      <meshStandardMaterial
        color="#282828"
        metalness={1}
        roughness={0}
        emissive="#ffffff"
        emissiveIntensity={0.07}
      />
    </mesh>
  );
}

/* Ink droplets falling from needle — local space so they trail with tilt */
function InkDrips() {
  const count = 90;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const spread = 0.09;
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = -2.9 - Math.random() * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      spd[i] = 0.009 + Math.random() * 0.018;
    }
    return { positions: pos, speeds: spd };
  }, []);

  const ref = useRef<THREE.Points>(null);
  const posRef = useRef(positions.slice());

  useFrame(() => {
    if (!ref.current) return;
    const arr = posRef.current;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i];
      if (arr[i * 3 + 1] < -7.5) {
        arr[i * 3 + 1] = -2.9;
        arr[i * 3] = (Math.random() - 0.5) * 0.09;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.09;
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
      <pointsMaterial size={0.055} color="#ffffff" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

/* Full tattoo machine — grip + needle + drips, tilted like an artist holds it */
function TattooMachine() {
  return (
    <Float speed={0.45} floatIntensity={0.18} rotationIntensity={0.05}>
      {/* Position right-center; tilt ~35° = -0.61 rad on Z */}
      <group position={[2.4, 0.4, 0]} rotation={[0.08, 0.3, -0.61]}>
        <MachinGrip />
        <NeedleTip />
        <InkDrips />
      </group>
    </Float>
  );
}

/* Ambient ink mist — tiny particles drifting downward across full scene */
function InkMist() {
  const count = 700;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      spd[i] = 0.002 + Math.random() * 0.005;
    }
    return { positions: pos, speeds: spd };
  }, []);

  const ref = useRef<THREE.Points>(null);
  const posRef = useRef(positions.slice());

  useFrame(() => {
    if (!ref.current) return;
    const arr = posRef.current;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i];
      if (arr[i * 3 + 1] < -11) {
        arr[i * 3 + 1] = 11;
        arr[i * 3] = (Math.random() - 0.5) * 24;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
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
      <pointsMaterial size={0.022} color="#ffffff" transparent opacity={0.16} sizeAttenuation />
    </points>
  );
}

/* Camera subtly follows mouse */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x += (state.mouse.x * 0.5 - state.camera.position.x) * 0.022;
    state.camera.position.y += (state.mouse.y * 0.35 - state.camera.position.y) * 0.022;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.05} />
      {/* Key light from upper-right — reveals chrome surface */}
      <pointLight position={[5, 7, 4]} intensity={6} color="#ffffff" />
      {/* Fill light from left */}
      <pointLight position={[-4, -3, 3]} intensity={2} color="#999999" />
      {/* Rim light behind */}
      <pointLight position={[0, 3, 7]} intensity={1.8} color="#ffffff" />
      <spotLight
        position={[6, 9, 4]}
        intensity={10}
        color="#ffffff"
        angle={0.35}
        penumbra={0.9}
      />
      <fog attach="fog" args={["#030303", 15, 42]} />

      <TattooMachine />
      <InkMist />
      <CameraRig />
    </Canvas>
  );
}
