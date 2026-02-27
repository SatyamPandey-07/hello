"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Loader } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import PorscheModel from "./PorscheModel";
import CameraRig from "./CameraRig";

export default function PorscheScene() {
    return (
        <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 bg-[#0a0a0a]">
            <Canvas shadows dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <PorscheModel />
                    <CameraRig />

                    {/* Studio Lighting */}
                    <ambientLight intensity={0.1} />
                    <spotLight
                        position={[5, 10, 5]}
                        angle={0.3}
                        penumbra={1}
                        intensity={5}
                        castShadow
                        color="#ffffff"
                    />
                    <directionalLight position={[-2, 5, 2]} intensity={0.5} color="#ffffff" />

                    <Environment preset="city" />

                    <EffectComposer enableNormalPass={false}>
                        <Bloom
                            luminanceThreshold={1}
                            mipmapBlur
                            intensity={0.5}
                            radius={0.4}
                        />
                        <Noise opacity={0.02} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}
