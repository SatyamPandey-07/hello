"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AtmosphericParticlesProps {
    color: string;
    density: number;
    glow: number;
}

export default function AtmosphericParticles({ color, density, glow }: AtmosphericParticlesProps) {
    const particlesRef = useRef<THREE.Points>(null);
    
    const particleCount = Math.floor(density * 500); // Scale density to particle count
    
    const { positions, sizes } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            // Distribute particles in a sphere around the car
            const radius = 15 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Vertical spread
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
            
            sizes[i] = Math.random() * 2 + 0.5;
        }
        
        return { positions, sizes };
    }, [particleCount]);
    
    useFrame((state) => {
        if (!particlesRef.current) return;
        
        // Gentle rotation
        particlesRef.current.rotation.y += 0.0002;
        
        // Subtle vertical drift
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
            
            // Reset if particle drifts too far
            if (positions[i * 3 + 1] > 10) {
                positions[i * 3 + 1] = -10;
            } else if (positions[i * 3 + 1] < -10) {
                positions[i * 3 + 1] = 10;
            }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });
    
    if (particleCount === 0) return null;
    
    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={particleCount}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                    count={particleCount}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={1}
                color={color}
                transparent
                opacity={glow}
                sizeAttenuation
                blending={glow > 0.5 ? THREE.AdditiveBlending : THREE.NormalBlending}
                depthWrite={false}
            />
        </points>
    );
}
