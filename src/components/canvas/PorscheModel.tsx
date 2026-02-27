"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = "/models/closed.glb";

export default function PorscheModel() {
    const { scene } = useGLTF(MODEL_URL);

    useEffect(() => {
        if (!scene) return;

        scene.position.set(0, 0, 0);
        scene.rotation.set(0, 0, 0);
        scene.scale.set(1, 1, 1);

        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center pivot at world origin, sit on Y=0
        scene.position.set(-center.x, -center.y + size.y / 2, -center.z);

        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.envMapIntensity = 2;
                    child.material.needsUpdate = true;
                }
            }
        });
    }, [scene]);

    return (
        <group name="porsche-model">
            <primitive object={scene} scale={1.2} />
        </group>
    );
}

useGLTF.preload(MODEL_URL);
