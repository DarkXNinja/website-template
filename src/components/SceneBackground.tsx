import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Mesh } from 'three';

function FloatingRing() {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.15;
      mesh.current.rotation.x = clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={mesh} rotation={[0.4, 0.8, 0]}>
      <torusGeometry args={[1.3, 0.05, 16, 120]} />
      <meshStandardMaterial color="#d6c3a9" metalness={0.92} roughness={0.18} />
    </mesh>
  );
}

function ParticleField() {
  const points = useMemo(
    () =>
      Array.from({ length: 24 }, () => [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number]),
    []
  );

  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.02;
      group.current.position.x = Math.sin(clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {points.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial color="#e2e7ff" emissive="#7d8fff" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function SceneBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 35 }}>
        <color attach="background" args={['#090b10']} />
        <ambientLight intensity={0.45} />
        <spotLight position={[5, 5, 5]} angle={0.25} intensity={1.2} penumbra={0.7} />
        <pointLight position={[-5, 1, 2]} intensity={0.7} />
        <FloatingRing />
        <ParticleField />
      </Canvas>
    </div>
  );
}
