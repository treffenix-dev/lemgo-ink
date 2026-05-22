"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* Shared chrome materials — created once, reused across all meshes */
function useChromeMaterials() {
  return useMemo(() => ({
    bright: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#141414"),
      metalness: 1.0,
      roughness: 0.0,
      reflectivity: 1.0,
      envMapIntensity: 3.0,
    }),
    dark: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a0a0a"),
      metalness: 1.0,
      roughness: 0.02,
      reflectivity: 0.9,
      envMapIntensity: 2.2,
    }),
    accent: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1c1c1c"),
      metalness: 1.0,
      roughness: 0.01,
      reflectivity: 1.0,
      envMapIntensity: 2.8,
    }),
    glow: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      metalness: 0.0,
      roughness: 0.0,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 4.0,
    }),
  }), []);
}

/* Premium grip with fine knurling */
function Grip({ mat }: { mat: ReturnType<typeof useChromeMaterials> }) {
  return (
    <group>
      {/* Main tapered body */}
      <mesh material={mat.bright}>
        <cylinderGeometry args={[0.19, 0.235, 3.0, 64]} />
      </mesh>

      {/* Dense knurling rings — 14 rings for fine texture */}
      {Array.from({ length: 14 }, (_, i) => -1.0 + i * 0.155).map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={mat.dark}>
          <torusGeometry args={[0.24, 0.014, 6, 64]} />
        </mesh>
      ))}

      {/* Center accent band */}
      <mesh position={[0, 0, 0]} material={mat.accent}>
        <cylinderGeometry args={[0.248, 0.248, 0.055, 64]} />
      </mesh>

      {/* Lower taper to tube */}
      <mesh position={[0, -1.66, 0]} material={mat.dark}>
        <cylinderGeometry args={[0.13, 0.235, 0.28, 32]} />
      </mesh>

      {/* Needle tube — ultra-thin chrome */}
      <mesh position={[0, -2.5, 0]} material={mat.bright}>
        <cylinderGeometry args={[0.038, 0.022, 1.72, 24]} />
      </mesh>

      {/* Motor housing flare */}
      <mesh position={[0, 1.72, 0]} material={mat.dark}>
        <cylinderGeometry args={[0.29, 0.19, 0.64, 64]} />
      </mesh>

      {/* Coil cylinder */}
      <mesh position={[0, 2.18, 0]} material={mat.accent}>
        <cylinderGeometry args={[0.21, 0.21, 0.62, 32]} />
      </mesh>

      {/* Coil rings */}
      {[-0.2, 0, 0.2].map((y, i) => (
        <mesh key={i} position={[0, 2.18 + y, 0]} material={mat.bright}>
          <torusGeometry args={[0.22, 0.01, 6, 32]} />
        </mesh>
      ))}

      {/* Dome top cap */}
      <mesh position={[0, 2.54, 0]} material={mat.dark}>
        <sphereGeometry args={[0.17, 32, 32]} />
      </mesh>
    </group>
  );
}

/* Vibrating needle tip with emissive glow */
function NeedleTip({ mat }: { mat: ReturnType<typeof useChromeMaterials> }) {
  const needleRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const v = Math.abs(Math.sin(state.clock.elapsedTime * 22)) * 0.065;
    if (needleRef.current) needleRef.current.position.y = -3.42 + v;
    if (lightRef.current) {
      lightRef.current.position.y = -3.6 + v;
      lightRef.current.intensity = 0.25 + v * 2.8;
    }
  });

  return (
    <>
      <mesh ref={needleRef} position={[0, -3.42, 0]} material={mat.glow}>
        <coneGeometry args={[0.019, 0.55, 8]} />
      </mesh>
      <pointLight ref={lightRef} position={[0, -3.6, 0]} color="#ffffff" distance={2.2} />
    </>
  );
}

/* Ink stream — additive blending so they glow like light */
function InkStream() {
  const count = 140;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const s = 0.055;
      pos[i * 3]     = (Math.random() - 0.5) * s;
      pos[i * 3 + 1] = -3.45 - Math.random() * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * s;
      spd[i] = 0.007 + Math.random() * 0.018;
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
      if (arr[i * 3 + 1] < -10) {
        arr[i * 3 + 1] = -3.45;
        arr[i * 3]     = (Math.random() - 0.5) * 0.055;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.055;
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
        size={0.065}
        color="#ffffff"
        transparent
        opacity={0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* Full machine assembly — tilted like an artist holds it */
function TattooMachine() {
  const mat = useChromeMaterials();

  return (
    <Float speed={0.3} floatIntensity={0.14} rotationIntensity={0.035}>
      {/* Right-side placement, ~33° tilt (realistic hold angle) */}
      <group position={[2.3, 0.7, 0]} rotation={[0.05, 0.28, -0.58]}>
        <Grip mat={mat} />
        <NeedleTip mat={mat} />
        <InkStream />
      </group>
    </Float>
  );
}

/* Ambient ink dust — very slow, additive so it glows softly */
function InkDust() {
  const count = 550;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      spd[i] = 0.001 + Math.random() * 0.003;
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
        arr[i * 3]     = (Math.random() - 0.5) * 22;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
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
        size={0.016}
        color="#ffffff"
        transparent
        opacity={0.13}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* Camera drifts gently with mouse */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x += (state.mouse.x * 0.5 - state.camera.position.x) * 0.02;
    state.camera.position.y += (state.mouse.y * 0.3 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
    >
      <ambientLight intensity={0.04} />
      {/* Dramatic key light from upper-right — creates chrome highlight streak */}
      <pointLight position={[7, 9, 5]} intensity={10} color="#ffffff" />
      {/* Cool fill from lower-left */}
      <pointLight position={[-5, -4, 3]} intensity={3} color="#aaaaaa" />
      {/* Rim light from behind */}
      <pointLight position={[-2, 3, -3]} intensity={2} color="#888888" />
      {/* Spotlight for drama */}
      <spotLight
        position={[5, 11, 4]}
        intensity={20}
        color="#ffffff"
        angle={0.28}
        penumbra={0.95}
      />
      <fog attach="fog" args={["#020202", 18, 46]} />

      {/* HDR studio env — drives the chrome reflections */}
      <Environment preset="studio" />

      <TattooMachine />
      <InkDust />
      <CameraRig />

    </Canvas>
  );
}
