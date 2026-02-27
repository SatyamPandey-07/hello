"use client";

import { PerspectiveCamera } from "@react-three/drei";

export default function CameraRig() {
    return (
        <PerspectiveCamera
            makeDefault
            fov={45}
            near={0.1}
            far={100}
        />
    );
}
