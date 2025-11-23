import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const InteractiveParticles = () => {
    const pointsRef = useRef();
    const { mouse, viewport } = useThree();
    const [hovered, setHovered] = useState(false);

    const particleData = useMemo(() => {
        const count = 1000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const velocities = new Float32Array(count * 3);

        const palette = [
            new THREE.Color('#00E6FF'),
            new THREE.Color('#8A3FFC'),
            new THREE.Color('#C6FF00'),
            new THREE.Color('#FF0055'),
        ];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 0.15 + 0.05;
        }

        return { positions, colors, sizes, velocities };
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array;
        const { velocities } = particleData;

        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            const dx = positions[i] - mouseX;
            const dy = positions[i + 1] - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 5) {
                const force = (5 - distance) / 5;
                positions[i] += dx * force * 0.1;
                positions[i + 1] += dy * force * 0.1;
            }

            if (positions[i] > 25) positions[i] = -25;
            if (positions[i] < -25) positions[i] = 25;
            if (positions[i + 1] > 25) positions[i + 1] = -25;
            if (positions[i + 1] < -25) positions[i + 1] = 25;
            if (positions[i + 2] > 15) positions[i + 2] = -15;
            if (positions[i + 2] < -15) positions[i + 2] = 15;

            positions[i + 1] += Math.sin(time + positions[i] * 0.5) * 0.01;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.05;
    });

    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);

        return new THREE.CanvasTexture(canvas);
    }, []);

    return (
        <points
            ref={pointsRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleData.positions.length / 3}
                    array={particleData.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleData.colors.length / 3}
                    array={particleData.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particleData.sizes.length}
                    array={particleData.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                map={texture}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const Background = ({ children }) => {
    return (
        <>
            {/* Fixed canvas background */}
            <div style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                backgroundColor: '#000000'
            }}>
                <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
                    <color attach="background" args={['#000000']} />
                    <fog attach="fog" args={['#000000', 20, 50]} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00E6FF" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8A3FFC" />

                    <InteractiveParticles />
                </Canvas>
            </div>

            {/* Scrollable content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </>
    );
};

export default Background;
