"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ─── MATERIALS (created once, shared) ────────────────────────────────────── */
function useMaterials() {
  return useMemo(() => ({
    chrome: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c2c8d4"),
      metalness: 1.0,
      roughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 2.2,
    }),
    darkChrome: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#16161c"),
      metalness: 0.95,
      roughness: 0.14,
      reflectivity: 0.9,
      envMapIntensity: 1.8,
    }),
    grip: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0c0c10"),
      metalness: 0.65,
      roughness: 0.58,
      envMapIntensity: 0.7,
    }),
    accent: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#888ea0"),
      metalness: 1.0,
      roughness: 0.22,
      envMapIntensity: 1.5,
    }),
    glowMat: new THREE.MeshBasicMaterial({
      color: new THREE.Color("#99aaff"),
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    }),
  }), []);
}

/* ─── TATTOO MACHINE ──────────────────────────────────────────────────────── */
function TattooMachine() {
  const groupRef  = useRef<THREE.Group>(null);
  const needleRef = useRef<THREE.Group>(null);
  const inkRef    = useRef<THREE.Points>(null);
  const mats      = useMaterials();

  const smooth = useRef({ rx: 0, rz: 0, py: 0.5 });

  /* Ink drip particle pool */
  const dripPositions = useMemo(() => {
    const count = 70;
    const arr   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 0.18;
      arr[i * 3 + 1] = -Math.random() * 3.8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
    }
    return arr;
  }, []);

  const dripArr    = useRef(dripPositions.slice());
  const dripSpeeds = useMemo(
    () => new Float32Array(70).map(() => 0.008 + Math.random() * 0.022),
    []
  );

  useFrame(({ mouse, clock }) => {
    if (!groupRef.current) return;
    const t  = clock.elapsedTime;
    const sp = Math.min(1, window.scrollY / (window.innerHeight * 0.85));
    const s  = smooth.current;

    /* Mouse tilt — machine "aims" like an artist at the cursor */
    s.rx += (mouse.y * 0.10 - s.rx) * 0.038;
    s.rz += (-mouse.x * 0.055 - s.rz) * 0.038;

    /* Scroll descent */
    const targetY = 0.6 - sp * 2.4;
    s.py += (targetY - s.py) * 0.052;

    groupRef.current.rotation.x = s.rx;
    groupRef.current.rotation.z = s.rz;
    groupRef.current.position.y = s.py;

    /* Needle rapid vibration (tattooing) */
    if (needleRef.current) {
      needleRef.current.position.y = -Math.abs(Math.sin(t * 30)) * 0.068;
    }

    /* Glow pulse on needle tip */
    mats.glowMat.opacity = 0.28 + Math.sin(t * 14) * 0.14 + sp * 0.22;

    /* Ink drips fall faster as user scrolls (tattoo in progress) */
    const arr = dripArr.current;
    for (let i = 0; i < 70; i++) {
      arr[i * 3 + 1] -= dripSpeeds[i] * (1 + sp * 2.5);
      if (arr[i * 3 + 1] < -4.2) {
        arr[i * 3 + 1] = 0;
        arr[i * 3]     = (Math.random() - 0.5) * 0.14;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.14;
      }
    }
    if (inkRef.current) {
      (inkRef.current.geometry.attributes.position as THREE.BufferAttribute).array = arr;
      inkRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  /* Grip knurling Y positions */
  const knurlingY = [-0.72, -0.52, -0.32, -0.12, 0.08, 0.28, 0.48, 0.68];

  return (
    /* Positioned right-of-center, angled ~32° diagonal — like a hand tattooing */
    <group ref={groupRef} position={[1.35, 0.6, 0]} rotation={[0.36, 0.12, -0.54]}>

      {/* ── TOP CAP ── */}
      <mesh material={mats.darkChrome} position={[0, 2.62, 0]}>
        <cylinderGeometry args={[0.165, 0.185, 0.32, 32]} />
      </mesh>
      <mesh material={mats.chrome} position={[0, 2.80, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.065, 16]} />
      </mesh>

      {/* ── UPPER MOTOR HOUSING ── */}
      <mesh material={mats.darkChrome} position={[0, 2.02, 0]}>
        <cylinderGeometry args={[0.192, 0.192, 1.08, 32]} />
      </mesh>

      {/* ── HOUSING ACCENT RINGS ── */}
      {[1.57, 2.46].map((y, i) => (
        <mesh key={i} material={mats.chrome} position={[0, y, 0]}>
          <torusGeometry args={[0.196, 0.016, 12, 64]} />
        </mesh>
      ))}

      {/* ── BRAND ENGRAVING BAND (recessed detail) ── */}
      <mesh material={mats.accent} position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.194, 0.194, 0.12, 32]} />
      </mesh>

      {/* ── GRIP / BARREL ── */}
      <mesh material={mats.grip} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.168, 0.172, 1.82, 32]} />
      </mesh>

      {/* ── KNURLING RINGS ── */}
      {knurlingY.map((y, i) => (
        <mesh key={i} material={mats.chrome} position={[0, y + 0.5, 0]}>
          <torusGeometry args={[0.175, 0.011, 8, 48]} />
        </mesh>
      ))}

      {/* ── FRONT COLLAR ── */}
      <mesh material={mats.chrome} position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.178, 0.135, 0.30, 32]} />
      </mesh>

      {/* ── NEEDLE TUBE ── */}
      <mesh material={mats.chrome} position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.052, 0.062, 0.58, 16]} />
      </mesh>

      {/* ── CARTRIDGE CLIP ── */}
      <mesh material={mats.accent} position={[0, -0.88, 0]}>
        <torusGeometry args={[0.058, 0.008, 8, 32]} />
      </mesh>

      {/* ── NEEDLE (vibrating sub-group) ── */}
      <group ref={needleRef} position={[0, -1.12, 0]}>
        <mesh material={mats.chrome}>
          <cylinderGeometry args={[0.011, 0.002, 0.78, 8]} />
        </mesh>
        {/* Glow at needle tip */}
        <mesh material={mats.glowMat} position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.036, 12, 12]} />
        </mesh>
        {/* Outer soft glow halo */}
        <mesh position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshBasicMaterial
            color="#5566cc"
            transparent
            opacity={0.07}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* ── INK DRIPS ── */}
      <points ref={inkRef} position={[0, -1.62, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={70}
            array={dripPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.016}
          color="#b0c0ff"
          transparent
          opacity={0.55}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ─── FLOATING INK MIST ───────────────────────────────────────────────────── */
function InkMist() {
  const ref   = useRef<THREE.Points>(null);
  const count = 280;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r     = 1.8 + Math.random() * 5.2;
      arr[i * 3]     = Math.cos(angle) * r + 1.0;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = Math.sin(angle) * r * 0.35;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.022;
    }
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
        size={0.011}
        color="#ffffff"
        transparent
        opacity={0.14}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── EXPORT ──────────────────────────────────────────────────────────────── */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.2], fov: 44 }}
      style={{ background: "transparent" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
    >
      <ambientLight intensity={0.04} />
      <pointLight position={[4, 6, 3]}  intensity={4}   color="#ffffff" />
      <pointLight position={[-3, -3, 2]} intensity={2}  color="#5566bb" />
      <spotLight
        position={[1, 9, 2]}
        intensity={6}
        angle={0.35}
        penumbra={0.9}
        color="#ffffff"
      />

      <Environment preset="studio" />

      <TattooMachine />
      <InkMist />
    </Canvas>
  );
}
