"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Loader, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import PorscheModel from "./PorscheModel";
import CameraRig from "./CameraRig";
import ScrollController from "./ScrollController";

export default function PorscheScene() {
    return (
        <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 bg-[#050505]">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, toneMapping: 4 }}
            >
                <Suspense fallback={null}>
                    <CameraRig />
                    <ScrollController />
                    <PorscheModel />

                    {/* ── Cinematic Studio Lighting ── */}
                    <ambientLight intensity={0.08} color="#f0ece4" />

                    {/* Key light — warm, dramatic, from above-right */}
                    <spotLight
                        position={[8, 12, 8]}
                        angle={0.2}
                        penumbra={1}
                        intensity={3}
                        castShadow
                        color="#fff5e6"
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />

                    {/* Fill light — cool, subtle, from left */}
                    <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#e0e8ff" />

                    {/* Rim light — sharp contour from behind */}
                    <spotLight
                        position={[-3, 5, -8]}
                        angle={0.4}
                        penumbra={0.5}
                        intensity={1.5}
                        color="#ffffff"
                    />

                    {/* Under-car bounce */}
                    <pointLight position={[0, 0.1, 0]} intensity={0.15} color="#f0ece4" distance={5} />

                    <Environment preset="city" />

                    <ContactShadows
                        position={[0, -0.01, 0]}
                        opacity={0.7}
                        scale={25}
                        blur={2.5}
                        far={5}
                        color="#000000"
                    />

                    {/* ── Cinematic Post-Processing ── */}
                    <EffectComposer disableNormalPass>
                        <Bloom
                            luminanceThreshold={0.9}
                            mipmapBlur
                            intensity={0.25}
                            radius={0.6}
                        />
                        <ChromaticAberration
                            blendFunction={BlendFunction.NORMAL}
                            offset={[0.0004, 0.0004]}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}
