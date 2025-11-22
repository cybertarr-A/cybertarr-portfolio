import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import '../styles/Welcome.css';

const DNA = () => {
    const points = useRef();
    const [hovered, setHovered] = useState(false);

    const particles = useMemo(() => {
        const count = 150;
        const positions = new Float32Array(count * 3 * 2);
        const colors = new Float32Array(count * 3 * 2);
        const originalPositions = new Float32Array(count * 3 * 2);

        const color1 = new THREE.Color('#00E6FF');
        const color2 = new THREE.Color('#8A3FFC');

        for (let i = 0; i < count; i++) {
            const t = i * 0.3;
            const y = (i - count / 2) * 0.15;

            // Strand 1
            const x1 = Math.cos(t) * 1.5;
            const z1 = Math.sin(t) * 1.5;

            positions[i * 3] = x1;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z1;

            originalPositions[i * 3] = x1;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z1;

            colors[i * 3] = color1.r;
            colors[i * 3 + 1] = color1.g;
            colors[i * 3 + 2] = color1.b;

            // Strand 2
            const idx2 = (count + i) * 3;
            const x2 = Math.cos(t + Math.PI) * 1.5;
            const z2 = Math.sin(t + Math.PI) * 1.5;

            positions[idx2] = x2;
            positions[idx2 + 1] = y;
            positions[idx2 + 2] = z2;

            originalPositions[idx2] = x2;
            originalPositions[idx2 + 1] = y;
            originalPositions[idx2 + 2] = z2;

            colors[idx2] = color2.r;
            colors[idx2 + 1] = color2.g;
            colors[idx2 + 2] = color2.b;
        }

        return { positions, colors, originalPositions };
    }, []);

    // Create circular glowing texture
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame((state) => {
        if (!points.current) return;

        const time = state.clock.getElapsedTime();
        points.current.rotation.y = time * 0.2;

        const currentPositions = points.current.geometry.attributes.position.array;
        const { originalPositions } = particles;

        for (let i = 0; i < currentPositions.length; i += 3) {
            const ox = originalPositions[i];
            const oy = originalPositions[i + 1];
            const oz = originalPositions[i + 2];

            let tx = ox;
            let ty = oy;
            let tz = oz;

            if (hovered) {
                tx = ox + Math.sin(time * 5 + oy) * 2;
                tz = oz + Math.cos(time * 5 + oy) * 2;
            }

            currentPositions[i] += (tx - currentPositions[i]) * 0.1;
            currentPositions[i + 1] += (ty - currentPositions[i + 1]) * 0.1;
            currentPositions[i + 2] += (tz - currentPositions[i + 2]) * 0.1;
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points
            ref={points}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.25}
                map={texture}
                vertexColors
                transparent
                opacity={1}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const Welcome = () => {
    return (
        <section id="home" className="welcome-section">
            <motion.div
                className="welcome-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="dna-container-welcome">
                    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                            <DNA />
                        </Float>
                    </Canvas>
                </div>

                <h1 className="welcome-title">
                    Welcome to <span className="gradient-text">CyberTarr-A's</span> CodeSpace
                </h1>
                <p className="welcome-subtitle">
                    I don't just build automation or models — I architect systems that think, adapt, and evolve.
                </p>
                <motion.div
                    className="scroll-hint"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Scroll to explore
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Welcome;
