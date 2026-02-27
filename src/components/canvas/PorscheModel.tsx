"use client";

import { useGLTF, Environment, ContactShadows, PerspectiveCamera, Float, useScroll } from "@react-three/drei";
import { useEffect, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Model Source: a validated GLTF of a Porsche 911 930 Turbo
const MODEL_URL = "https://raw.githubusercontent.com/UtkarshPathrabe/Porche-911-930-Turbo-1975-3D-Model/refs/heads/main/scene.gltf";

export default function PorscheModel() {
    const { scene } = useGLTF(MODEL_URL);
    const carRef = useRef<THREE.Group>(null);

    // Apply luxury materials/adjustments if needed
    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.envMapIntensity = 1.5;
                }
            }
        });
    }, [scene]);

    useLayoutEffect(() => {
        if (!carRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#main-experience",
                start: "75% top", // Start moving near the end
                end: "bottom bottom",
                scrub: 1,
            }
        });

        tl.to(carRef.current.position, {
            z: -10, // Drive forward
            duration: 5,
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === "#main-experience") st.kill();
            });
        };
    }, []);

    return (
        <group ref={carRef} dispose={null}>
            <primitive object={scene} scale={1.2} position={[0, -0.5, 0]} />
            <ContactShadows
                position={[0, -0.5, 0]}
                opacity={0.4}
                scale={20}
                blur={2}
                far={4.5}
            />
        </group>
    );
}

useGLTF.preload(MODEL_URL);
