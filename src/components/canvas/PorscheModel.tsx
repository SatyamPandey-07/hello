"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { globalModelController } from "@/systems/modelSystem";
import { globalTimeline } from "@/systems/sharedTimeline";
import { useThree } from "@react-three/fiber";

export default function PorscheModel() {
    const [currentConfig, setCurrentConfig] = useState(globalModelController.current);
    const { scene: loadedScene } = useGLTF(currentConfig.modelPath);
    const { camera, scene: threeScene } = useThree();

    // Subscribe to model changes
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsubscribe = globalModelController.subscribe((newConfig: any) => {
            setCurrentConfig(newConfig);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Setup scene and run timeline when model loads
    useEffect(() => {
        if (!loadedScene || !camera || !threeScene) return;

        loadedScene.position.set(0, 0, 0);
        loadedScene.rotation.set(0, 0, 0);
        loadedScene.scale.set(1, 1, 1);

        const box = new THREE.Box3().setFromObject(loadedScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center pivot at world origin, sit on Y=0
        loadedScene.position.set(-center.x, -center.y + size.y / 2, -center.z);

        loadedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.envMapIntensity = 2;
                    child.material.needsUpdate = true;
                }
            }
        });

        // Initialize timeline with Three.js references
        globalTimeline.setReferences(camera, threeScene);

        // Run the full cinematic sequence
        globalTimeline.runFullSequence(currentConfig);

        return () => {
            globalTimeline.reset();
        };
    }, [loadedScene, camera, threeScene, currentConfig]);

    // Update lighting based on config
    useEffect(() => {
        if (!threeScene) return;

        const lighting = currentConfig.lighting;
        
        // Find and update lights (or create if needed)
        const updateLight = (name: string, type: string, config: any) => {
            let light = threeScene.getObjectByName(name) as THREE.Light;
            
            if (!light) {
                if (type === 'ambient') {
                    light = new THREE.AmbientLight();
                } else if (type === 'directional') {
                    light = new THREE.DirectionalLight();
                } else if (type === 'spot') {
                    light = new THREE.SpotLight();
                }
                if (light) {
                    light.name = name;
                    threeScene.add(light);
                }
            }

            if (light) {
                light.color.set(config.color);
                light.intensity = config.intensity;
                if (config.position && 'position' in light) {
                    const [x, y, z] = config.position;
                    light.position.set(x, y, z);
                }
            }
        };

        updateLight('ambient', 'ambient', lighting.ambient);
        updateLight('key-light', 'spot', lighting.key);
        updateLight('fill-light', 'directional', lighting.fill);
        updateLight('rim-light', 'spot', lighting.rim);

    }, [currentConfig, threeScene]);

    return (
        <group name="porsche-model">
            <primitive object={loadedScene} scale={1.2} />
        </group>
    );
}

// Preload all models (compressed versions for better performance)
useGLTF.preload("/models/closed-compressed.glb");
useGLTF.preload("/models/free_porsche_911_carrera_4s-compressed.glb");
useGLTF.preload("/models/porsche_918_spyder_2015__www.vecarz.com-compressed.glb");
useGLTF.preload("/models/porsche_gt3_rs-compressed.glb");
