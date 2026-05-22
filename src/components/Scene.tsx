"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ─── TERRAIN ─────────────────────────────────────────────────────────── */
function RockyTerrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(55, 55, 140, 140);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h =
        Math.sin(x * 0.22) * Math.cos(y * 0.28) * 3.8 +
        Math.sin(x * 0.6 + y * 0.5) * 2.1 +
        Math.cos(x * 1.1 + y * 0.9) * 1.0 +
        Math.sin(x * 2.0 + y * 1.7) * 0.45 +
        Math.cos(x * 3.1 + y * 2.5) * 0.18;
      pos.setZ(i, h);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.8, 0]}>
      <meshStandardMaterial
        color="#0b0b0b"
        metalness={0.08}
        roughness={0.94}
        envMapIntensity={0.4}
      />
    </mesh>
  );
}

/* Atmospheric mist plane just above terrain */
function TerrainMist() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
      <planeGeometry args={[55, 55]} />
      <meshBasicMaterial color="#0d0d0d" transparent opacity={0.55} depthWrite={false} />
    </mesh>
  );
}

/* ─── STARS ───────────────────────────────────────────────────────────── */
function StarField() {
  const count = 2200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 28 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── TATTOO MACHINE ──────────────────────────────────────────────────── */
function useChromeMaterials() {
  return useMemo(() => ({
    bright: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#141414"),
      metalness: 1.0,
      roughness: 0.0,
      reflectivity: 1.0,
      envMapIntensity: 3.5,
    }),
    dark: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a0a0a"),
      metalness: 1.0,
      roughness: 0.02,
      reflectivity: 0.9,
      envMapIntensity: 2.5,
    }),
    accent: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1c1c1c"),
      metalness: 1.0,
      roughness: 0.01,
      reflectivity: 1.0,
      envMapIntensity: 3.0,
    }),
    glow: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ffffff"),
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 5.0,
    }),
  }), []);
}

function MachineBody({ mat }: { mat: ReturnType<typeof useChromeMaterials> }) {
  return (
    <group>
      <mesh material={mat.bright}>
        <cylinderGeometry args={[0.2, 0.24, 3.0, 64]} />
      </mesh>
      {Array.from({ length: 14 }, (_, i) => -1.0 + i * 0.155).map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={mat.dark}>
          <torusGeometry args={[0.245, 0.015, 6, 64]} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0]} material={mat.accent}>
        <cylinderGeometry args={[0.25, 0.25, 0.06, 64]} />
      </mesh>
      <mesh position={[0, -1.68, 0]} material={mat.dark}>
        <cylinderGeometry args={[0.13, 0.24, 0.28, 32]} />
      </mesh>
      <mesh position={[0, -2.52, 0]} material={mat.bright}>
        <cylinderGeometry args={[0.04, 0.024, 1.72, 24]} />
      </mesh>
      <mesh position={[0, 1.74, 0]} material={mat.dark}>
        <cylinderGeometry args={[0.29, 0.2, 0.64, 64]} />
      </mesh>
      <mesh position={[0, 2.2, 0]} material={mat.accent}>
        <cylinderGeometry args={[0.21, 0.21, 0.64, 32]} />
      </mesh>
      {[-0.21, 0, 0.21].map((y, i) => (
        <mesh key={i} position={[0, 2.2 + y, 0]} material={mat.bright}>
          <torusGeometry args={[0.22, 0.011, 6, 32]} />
        </mesh>
      ))}
      <mesh position={[0, 2.58, 0]} material={mat.dark}>
        <sphereGeometry args={[0.17, 32, 32]} />
      </mesh>
    </group>
  );
}

function NeedleTip({ mat }: { mat: ReturnType<typeof useChromeMaterials> }) {
  const needleRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const v = Math.abs(Math.sin(state.clock.elapsedTime * 22)) * 0.065;
    if (needleRef.current) needleRef.current.position.y = -3.44 + v;
    if (lightRef.current) {
      lightRef.current.position.y = -3.6 + v;
      lightRef.current.intensity = 0.3 + v * 3.2;
    }
  });

  return (
    <>
      <mesh ref={needleRef} position={[0, -3.44, 0]} material={mat.glow}>
        <coneGeometry args={[0.02, 0.5, 8]} />
      </mesh>
      <pointLight ref={lightRef} position={[0, -3.6, 0]} color="#ffffff" distance={2.5} />
    </>
  );
}

/* Ink particles rising from needle — additive so they glow */
function InkRising() {
  const count = 160;
  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const s = 0.08;
      pos[i * 3]     = (Math.random() - 0.5) * s;
      pos[i * 3 + 1] = -3.4 - Math.random() * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * s;
      spd[i] = 0.006 + Math.random() * 0.016;
      off[i] = Math.random() * Math.PI * 2;
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
      if (arr[i * 3 + 1] < -11) {
        arr[i * 3 + 1] = -3.4;
        arr[i * 3]     = (Math.random() - 0.5) * 0.08;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
      }
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).array = arr;
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#ffffff"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* Floating ink dust around the scene */
function InkDust() {
  const count = 400;
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = 0.0008 + Math.random() * 0.002;
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
      if (arr[i * 3 + 1] < -7) {
        arr[i * 3 + 1] = 7;
        arr[i * 3]     = (Math.random() - 0.5) * 20;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).array = arr;
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        color="#ffffff"
        transparent
        opacity={0.1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function TattooMachine() {
  const mat = useChromeMaterials();
  return (
    /* Float above terrain — center-right, elevated */
    <Float speed={0.28} floatIntensity={0.2} rotationIntensity={0.04}>
      <group position={[1.8, 1.2, 0]} rotation={[0.05, 0.22, -0.52]}>
        <MachineBody mat={mat} />
        <NeedleTip mat={mat} />
        <InkRising />
      </group>
    </Float>
  );
}

/* ─── CAMERA ──────────────────────────────────────────────────────────── */
function CameraRig() {
  useFrame((state) => {
    /* Slow parallax on mouse */
    state.camera.position.x += (state.mouse.x * 0.6 - state.camera.position.x) * 0.018;
    state.camera.position.y +=
      (state.mouse.y * 0.3 + 0.8 - state.camera.position.y) * 0.018;
    state.camera.lookAt(0.5, 0, 0);
  });
  return null;
}

/* ─── SCENE ───────────────────────────────────────────────────────────── */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 10.5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
    >
      {/* Ambient — very dark */}
      <ambientLight intensity={0.04} />
      {/* Key light — upper front, chrome streak */}
      <pointLight position={[6, 10, 6]} intensity={12} color="#ffffff" />
      {/* Cool fill — lower left */}
      <pointLight position={[-6, -2, 4]} intensity={3} color="#aaaaaa" />
      {/* Rim from behind — silhouette on terrain peaks */}
      <pointLight position={[-1, 4, -8]} intensity={5} color="#888888" />
      {/* Terrain uplight — separates machine from ground */}
      <pointLight position={[0, -2.5, 3]} intensity={1.5} color="#444444" />
      {/* Dramatic spotlight */}
      <spotLight
        position={[4, 12, 5]}
        intensity={25}
        color="#ffffff"
        angle={0.26}
        penumbra={0.95}
      />

      <fog attach="fog" args={["#030303", 18, 50]} />

      {/* HDR environment drives chrome reflections */}
      <Environment preset="warehouse" />

      <StarField />
      <RockyTerrain />
      <TerrainMist />
      <TattooMachine />
      <InkDust />
      <CameraRig />
    </Canvas>
  );
}
