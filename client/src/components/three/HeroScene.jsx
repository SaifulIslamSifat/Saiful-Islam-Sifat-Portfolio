import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';

// Abstract digital structure: a distorted glossy core, a wireframe shell and two orbit rings.
function Structure({ reduced }) {
  const group = useRef();
  const shell = useRef();
  const ringA = useRef();
  const ringB = useRef();

  useFrame((state, delta) => {
    // Subtle mouse interaction: ease the whole group toward the pointer.
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.5 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.35 - group.current.rotation.x) * 0.04;

    if (reduced) return;
    shell.current.rotation.y += delta * 0.12;
    shell.current.rotation.x += delta * 0.05;
    ringA.current.rotation.z += delta * 0.2;
    ringB.current.rotation.x += delta * 0.15;
  });

  return (
    <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={reduced ? 0 : 0.8}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.05, 24]} />
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#4c1d95"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.7}
            distort={reduced ? 0 : 0.28}
            speed={1.1}
          />
        </mesh>

        <mesh ref={shell}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
        </mesh>

        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.95, 0.012, 8, 120]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
        <mesh ref={ringB} rotation={[0, Math.PI / 3, Math.PI / 5]}>
          <torusGeometry args={[2.2, 0.01, 8, 120]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

// `active` false => frameloop "never": zero GPU work while hidden/off-screen.
export default function HeroScene({ active, reduced }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#22d3ee" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#8b5cf6" />
      <Environment preset="city" />
      <Structure reduced={reduced} />
    </Canvas>
  );
}
