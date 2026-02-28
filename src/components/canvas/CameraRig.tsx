"use client";

import { useEffect, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { globalTimeline } from "@/systems/sharedTimeline";
import type { PerspectiveCamera as PerspectiveCameraType } from "three";

export default function CameraRig() {
    const cameraRef = useRef<PerspectiveCameraType>(null);
    const { camera } = useThree();

    useEffect(() => {
        // Listen for camera reset events from model controller
        const handleReset = (event: CustomEvent) => {
            if (camera) {
                const config = event.detail.config;
                const startPos = config.cameraEntryPath.start;
                camera.position.set(startPos.x, startPos.y, startPos.z);
                camera.lookAt(0, 1, 0);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resetCamera', handleReset as EventListener);
            return () => {
                window.removeEventListener('resetCamera', handleReset as EventListener);
            };
        }
    }, [camera]);

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={45}
            near={0.1}
            far={100}
            position={[0, 3, 15]}
        />
    );
}
