"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

export default function GlobalLoader() {
    const { progress, active } = useProgress();
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        // Prevent scrolling and interaction while loading
        if (!hidden) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [hidden]);

    useEffect(() => {
        // Hide loader after a smooth transition when fully loaded
        if (progress === 100) {
            const timeout = setTimeout(() => setHidden(true), 1200); 
            return () => clearTimeout(timeout);
        }
    }, [progress]);

    if (hidden) return null;

    return (
        <div 
            className={`fixed inset-0 flex flex-col items-center justify-center bg-[#050505] z-[9999] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] transition-all ${
                progress === 100 ? "opacity-0 blur-md scale-105 pointer-events-none" : "opacity-100 blur-0 scale-100 pointer-events-auto"
            }`}
        >
            <div className="relative flex flex-col items-center">
                <div className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 tabular-nums">
                    {progress.toFixed(0)}<span className="text-3xl md:text-5xl text-white/50 font-light">%</span>
                </div>
                
                <div className="w-64 md:w-80 h-[2px] bg-white/10 relative overflow-hidden backdrop-blur-md rounded-full">
                    <div 
                        className="absolute inset-y-0 left-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out rounded-full" 
                        style={{ width: `${progress}%` }} 
                    />
                </div>
                
                <div className="mt-8 text-xs md:text-sm tracking-[0.4em] text-[#a8a8a8] uppercase font-bold text-center">
                    Initializing
                    <span className="block mt-2 text-white/30 font-light tracking-[0.2em] text-[10px]">
                        Interactive Experience
                    </span>
                </div>
            </div>
        </div>
    );
}
