"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ring({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.02, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

export default function CTAScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} style={{ background: "transparent" }} gl={{ alpha: true }}>
      <Ring radius={3} speed={0.2} color="#4f46e5" />
      <Ring radius={4.5} speed={-0.15} color="#06b6d4" />
      <Ring radius={6} speed={0.1} color="#8b5cf6" />
    </Canvas>
  );
}
