"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, Component, ReactNode, useState, useEffect } from "react";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import PorscheModel from "./PorscheModel";
import CameraRig from "./CameraRig";
import ScrollController from "./ScrollController";
import { globalModelController } from "@/systems/modelSystem";
import * as THREE from "three";

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center w-full h-full text-white/50 text-sm">
                    Interactive 3D experience requires WebGL. Please enable hardware acceleration.
                </div>
            );
        }
        return this.props.children;
    }
}

function DynamicFog({ config }: { config: any }) {
    if (!config.visualTheme?.fog?.enabled) return null;
    
    const fog = config.visualTheme.fog;
    return <fog attach="fog" args={[fog.color, fog.near, fog.far]} />;
}

export default function PorscheScene() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentModel, setCurrentModel] = useState<any>(globalModelController.current);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsubscribe = globalModelController.subscribe((newModel: any) => {
            setCurrentModel(newModel);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const theme = currentModel.visualTheme || {
        backgroundColor: '#050505',
        gradientColors: ['#000000', '#0a0a0a', '#050505'],
        environment: 'city'
    };

    return (
        <div 
            className="fixed inset-0 w-full h-screen pointer-events-none z-0 transition-all duration-1000"
            style={{ backgroundColor: theme.backgroundColor }}
        >
            {/* Dynamic Gradient Background Overlay */}
            <div 
                className="absolute inset-0 opacity-60 transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(ellipse at center, ${theme.gradientColors[1]} 0%, ${theme.gradientColors[0]} 100%)`
                }}
            />

            {/* Transition Overlay for Model Switching */}
            <div
                id="transition-overlay"
                className="absolute inset-0 bg-black pointer-events-none opacity-0 transition-opacity duration-800 ease-in-out z-50"
            />

            <WebGLErrorBoundary>
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    gl={{ antialias: true, toneMapping: 4 }}
                >
                    <Suspense fallback={null}>
                        <CameraRig />
                        <ScrollController />
                        <PorscheModel key={currentModel.id} />

                        {/* Dynamic Fog based on model config */}
                        <DynamicFog config={currentModel} />

                        {/* Dynamic Environment */}
                        <Environment preset={theme.environment as any} />

                        <ContactShadows
                            position={[0, -0.01, 0]}
                            opacity={0.7}
                            scale={25}
                            blur={2.5}
                            far={5}
                            color="#000000"
                        />

                        {/* ── Cinematic Post-Processing ── */}
                        <EffectComposer>
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
            </WebGLErrorBoundary>
        </div>
    );
}
