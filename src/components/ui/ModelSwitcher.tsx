"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { globalModelController } from "@/systems/modelSystem";
import { globalTimeline } from "@/systems/sharedTimeline";

export default function ModelSwitcher() {
    const [currentModel, setCurrentModel] = useState(globalModelController.current);
    const [isVisible, setIsVisible] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Subscribe to model changes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsubscribe = globalModelController.subscribe((newModel: any) => {
            setCurrentModel(newModel);
        });

        // Subscribe to timeline phase changes
        const unsubscribeTimeline = globalTimeline.subscribe((phase: string) => {
            // Show buttons only after entry animation completes
            if (phase === 'idle' || phase === 'scroll') {
                setTimeout(() => setIsVisible(true), 500);
            } else {
                setIsVisible(false);
            }
        });

        return () => {
            unsubscribe();
            unsubscribeTimeline();
        };
    }, []);

    const handlePrev = async () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        await globalModelController.prevModel();
        setTimeout(() => setIsTransitioning(false), 2000);
    };

    const handleNext = async () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        await globalModelController.nextModel();
        setTimeout(() => setIsTransitioning(false), 2000);
    };

    return (
        <>
            {/* Model Navigation Controls */}
            <div
                className={`fixed top-1/2 -translate-y-1/2 left-8 right-8 flex items-center justify-between pointer-events-none z-40 transition-all duration-1000 ${
                    isVisible && !isTransitioning ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    disabled={isTransitioning}
                    className="group pointer-events-auto w-14 h-14 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous Model"
                >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={isTransitioning}
                    className="group pointer-events-auto w-14 h-14 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next Model"
                >
                    <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Model Name Indicator */}
            <div
                className={`fixed top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
            >
                <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-6 py-3">
                    <div className="text-center">
                        <div className="text-xs tracking-[0.3em] text-white/40 uppercase font-bold mb-1">
                            Current Model
                        </div>
                        <div className="text-lg font-black text-white tracking-tight">
                            {currentModel.name}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
