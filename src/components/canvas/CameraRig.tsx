"use client";

import { useRef, useLayoutEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CameraRig() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const { scene } = useThree();

    useLayoutEffect(() => {
        if (!cameraRef.current) return;

        // Timeline for camera motion
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#main-experience",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Initial State (Hero) - Side Profile
        cameraRef.current.position.set(-6, 1.2, 0);
        cameraRef.current.lookAt(0, 0, 0);

        // Section 2: Zoom to Door
        tl.to(cameraRef.current.position, {
            x: -3.5,
            y: 1.2,
            z: 3,
            duration: 2,
        }, "door")
            .to(cameraRef.current.rotation, {
                x: 0,
                y: -Math.PI / 4,
                z: 0,
                duration: 2,
            }, "door");

        // Section 3: Interior Transition
        tl.to(cameraRef.current.position, {
            x: -0.4,
            y: 0.8,
            z: 0.2,
            duration: 2,
        }, "interior")
            .to(cameraRef.current.rotation, {
                x: -0.1,
                y: -0.2,
                z: 0,
                duration: 2,
            }, "interior");

        // Section 4: Sunroof Exit
        tl.to(cameraRef.current.position, {
            x: 0,
            y: 6,
            z: 0,
            duration: 2,
        }, "exit")
            .to(cameraRef.current.rotation, {
                x: -Math.PI / 2,
                y: 0,
                z: 0,
                duration: 2,
            }, "exit");

        // Section 5: Bird's Eye & Out
        tl.to(cameraRef.current.position, {
            y: 12,
            z: -4,
            duration: 2,
        }, "final");

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    // Soft floating effect for idle
    useFrame((state) => {
        if (cameraRef.current) {
            // Small idle movement
            cameraRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001;
        }
    });

    return (
        <PerspectiveCamera
            makeDefault
            ref={cameraRef}
            fov={45}
            near={0.1}
            far={100}
        />
    );
}
