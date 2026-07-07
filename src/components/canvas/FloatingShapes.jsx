import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';

function FloatingShape({ position, color, speed, size, distort }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.getElapsedTime() * speed * 0.3;
    mesh.current.rotation.y = state.clock.getElapsedTime() * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.3}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <group>
      <FloatingShape position={[-3, 2, -2]} color="#915EFF" speed={1.5} size={0.4} distort={0.4} />
      <FloatingShape position={[3.5, -1, -3]} color="#00d4ff" speed={1} size={0.3} distort={0.3} />
      <FloatingShape position={[-2, -2, -1]} color="#ff006e" speed={2} size={0.25} distort={0.5} />
      <FloatingShape position={[2, 1.5, -2.5]} color="#915EFF" speed={1.2} size={0.35} distort={0.35} />
      <FloatingShape position={[0, -3, -2]} color="#00d4ff" speed={0.8} size={0.2} distort={0.4} />
    </group>
  );
}
