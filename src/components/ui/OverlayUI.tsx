"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Share2, ExternalLink, Twitter, Facebook, Linkedin } from "lucide-react";
import { globalModelController } from "@/systems/modelSystem";

export default function OverlayUI() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const [showShareMenu, setShowShareMenu] = useState(false);
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

    const handleShare = (platform: string) => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        const text = `Check out this incredible ${currentModel.name} 3D Experience`;
        
        const urls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        };
        
        if (urls[platform]) {
            window.open(urls[platform], "_blank", "width=600,height=400");
        }
        setShowShareMenu(false);
    };

    const copyToClipboard = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setShowShareMenu(false);
        }
    };

    // Scene 1: 0-10%
    const s1Title = useTransform(scrollYProgress, [0, 0.02, 0.07, 0.09], [0, 1, 1, 0]);
    const s1Sub   = useTransform(scrollYProgress, [0.01, 0.04, 0.07, 0.09], [0, 1, 1, 0]);
    const s1Hint  = useTransform(scrollYProgress, [0, 0.02, 0.05, 0.08], [1, 1, 1, 0]);

    // Scene 2: 10-25%
    const s2 = useTransform(scrollYProgress, [0.13, 0.16, 0.21, 0.24], [0, 1, 1, 0]);
    // Scene 3: 25-32%
    const s3 = useTransform(scrollYProgress, [0.26, 0.28, 0.30, 0.32], [0, 1, 1, 0]);
    // Scene 4: 32-40% — entering
    const s4 = useTransform(scrollYProgress, [0.34, 0.36, 0.38, 0.40], [0, 1, 1, 0]);
    // Scene 5: 40-48% — steering
    const s5 = useTransform(scrollYProgress, [0.41, 0.43, 0.46, 0.48], [0, 1, 1, 0]);
    // Scene 6: 48-56% — driver POV
    const s6 = useTransform(scrollYProgress, [0.49, 0.51, 0.54, 0.56], [0, 1, 1, 0]);
    // Scene 7: 56-64% — gear
    const s7 = useTransform(scrollYProgress, [0.57, 0.59, 0.62, 0.64], [0, 1, 1, 0]);
    // Scene 8: 64-72% — seat
    const s8 = useTransform(scrollYProgress, [0.65, 0.67, 0.70, 0.72], [0, 1, 1, 0]);
    // Scene 9: 72-80% — panoramic
    const s9 = useTransform(scrollYProgress, [0.73, 0.75, 0.78, 0.80], [0, 1, 1, 0]);
    // Scene 11: 90-100%
    const s11 = useTransform(scrollYProgress, [0.92, 0.97], [0, 1]);
    const s11y = useTransform(scrollYProgress, [0.92, 0.98], [30, 0]);

    return (
        <div ref={ref} id="scroll-container" className="relative z-10 w-full">
            
            {/* ═══ SHARE BUTTON (FIXED) ═══ */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed top-6 right-6 z-50 pointer-events-auto"
            >
                <div className="relative">
                    <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all duration-300 group"
                        aria-label="Share"
                    >
                        <Share2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </button>
                    
                    {showShareMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 min-w-[200px] shadow-2xl"
                        >
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-3 px-2">Share</p>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => handleShare("twitter")}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                                >
                                    <Twitter className="w-4 h-4 text-white/60" />
                                    <span className="text-sm text-white/80">Twitter</span>
                                </button>
                                <button
                                    onClick={() => handleShare("facebook")}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                                >
                                    <Facebook className="w-4 h-4 text-white/60" />
                                    <span className="text-sm text-white/80">Facebook</span>
                                </button>
                                <button
                                    onClick={() => handleShare("linkedin")}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                                >
                                    <Linkedin className="w-4 h-4 text-white/60" />
                                    <span className="text-sm text-white/80">LinkedIn</span>
                                </button>
                                <div className="h-px bg-white/10 my-1" />
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                                >
                                    <ExternalLink className="w-4 h-4 text-white/60" />
                                    <span className="text-sm text-white/80">Copy Link</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* ═══ SCENE 1 — SILHOUETTE ═══ */}
            <section className="h-[100vh] flex items-center justify-center pointer-events-none relative">
                <motion.h1 style={{ opacity: s1Title }} className="text-hero text-[12vw] md:text-[10vw] select-none absolute">
                    PORSCHE
                </motion.h1>
                <motion.div style={{ opacity: s1Sub }} className="absolute bottom-[20vh] text-center">
                    <p className="text-xs md:text-sm tracking-[0.8em] text-white/40 uppercase font-extralight">
                        Form &nbsp;·&nbsp; Focus &nbsp;·&nbsp; Force
                    </p>
                </motion.div>
                <motion.div style={{ opacity: s1Hint }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                    <span className="text-[0.6rem] tracking-[0.5em] uppercase text-white/20 font-light">Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
                </motion.div>
            </section>

            {/* ═══ SCENE 2 — ORBIT ═══ */}
            <section className="h-[150vh] flex items-center pointer-events-none">
                <motion.div style={{ opacity: s2 }} className="ml-10 md:ml-24 max-w-xl">
                    <p className="text-section-label mb-4">Exterior</p>
                    <h2 className="text-section-title text-3xl md:text-4xl mb-5">Sculpted<br />by Air</h2>
                    <div className="line-accent mb-5" />
                    <p className="text-section-body max-w-xs mb-8">
                        Every contour shaped by decades of wind-tunnel refinement.
                    </p>
                    
                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm pointer-events-none">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-1">Top Speed</p>
                            <p className="text-2xl font-light text-white">190 mph</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-1">0-60 mph</p>
                            <p className="text-2xl font-light text-white">3.9 sec</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-1">Power</p>
                            <p className="text-2xl font-light text-white">443 hp</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-1">Engine</p>
                            <p className="text-2xl font-light text-white">3.0L</p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 pointer-events-auto">
                        <button className="px-6 py-3 bg-white text-black font-medium text-sm tracking-wider uppercase hover:bg-white/90 transition-all duration-300 hover:scale-105">
                            Configure
                        </button>
                        <button className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium text-sm tracking-wider uppercase hover:bg-white/5 hover:border-white/50 transition-all duration-300">
                            Test Drive
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* ═══ SCENE 3 — REAR ═══ */}
            <section className="h-[70vh] flex items-center justify-end pointer-events-none">
                <motion.div style={{ opacity: s3 }} className="mr-10 md:mr-24 text-right max-w-sm">
                    <p className="text-section-label mb-4">Detail</p>
                    <h2 className="text-section-title text-3xl md:text-4xl mb-5">Pure<br />Precision</h2>
                    <div className="line-accent-right mb-5" />
                </motion.div>
            </section>

            {/* ═══ SCENE 4 — ENTER ═══ */}
            <section className="h-[80vh] flex items-center justify-center pointer-events-none">
                <motion.div style={{ opacity: s4 }} className="text-center">
                    <p className="text-section-label mb-6">Interior</p>
                    <h2 className="text-section-title text-4xl md:text-5xl tracking-[0.15em]">Step Inside</h2>
                    <div className="w-12 h-[1px] bg-white/10 mx-auto mt-6" />
                </motion.div>
            </section>

            {/* ═══ SCENE 5 — STEERING WHEEL ═══ */}
            <section className="h-[80vh] flex items-center justify-end pointer-events-none">
                <motion.div style={{ opacity: s5 }} className="mr-10 md:mr-24 text-right max-w-xs">
                    <p className="text-section-label mb-3">Control</p>
                    <h3 className="text-section-title text-2xl md:text-3xl mb-3 tracking-[0.15em]">
                        GT Sport Wheel
                    </h3>
                    <div className="line-accent-right mb-4" />
                    <p className="text-section-body text-right">
                        Alcantara grip. Race-derived paddle shifters. Every micro-correction, amplified.
                    </p>
                </motion.div>
            </section>

            {/* ═══ SCENE 6 — DRIVER POV ═══ */}
            <section className="h-[80vh] flex items-center pointer-events-none">
                <motion.div style={{ opacity: s6 }} className="ml-10 md:ml-24 max-w-xs">
                    <p className="text-section-label mb-3">Vision</p>
                    <h3 className="text-section-title text-2xl md:text-3xl mb-3 tracking-[0.15em]">
                        The Driver&apos;s View
                    </h3>
                    <div className="line-accent mb-4" />
                    <p className="text-section-body">
                        Curved instrument cluster. Heads-up display. The road ahead, distilled.
                    </p>
                </motion.div>
            </section>

            {/* ═══ SCENE 7 — GEAR / CONSOLE ═══ */}
            <section className="h-[80vh] flex items-center justify-end pointer-events-none">
                <motion.div style={{ opacity: s7 }} className="mr-10 md:mr-24 text-right max-w-xs">
                    <p className="text-section-label mb-3">Precision</p>
                    <h3 className="text-section-title text-2xl md:text-3xl mb-3 tracking-[0.15em]">
                        Command Center
                    </h3>
                    <div className="line-accent-right mb-4" />
                    <p className="text-section-body text-right">
                        PDK gear selector. Drive mode switch. Control distilled to its essence.
                    </p>
                </motion.div>
            </section>

            {/* ═══ SCENE 8 — SEAT ═══ */}
            <section className="h-[80vh] flex items-center pointer-events-none">
                <motion.div style={{ opacity: s8 }} className="ml-10 md:ml-24 max-w-xs">
                    <p className="text-section-label mb-3">Craft</p>
                    <h3 className="text-section-title text-2xl md:text-3xl mb-3 tracking-[0.15em]">
                        Adaptive Sport Seats
                    </h3>
                    <div className="line-accent mb-4" />
                    <p className="text-section-body">
                        18-way electric adjustment. Memory foam bolsters. Hand-stitched leather.
                    </p>
                </motion.div>
            </section>

            {/* ═══ SCENE 9 — PANORAMIC CABIN ═══ */}
            <section className="h-[80vh] flex items-center justify-center pointer-events-none">
                <motion.div style={{ opacity: s9 }} className="text-center max-w-2xl px-6">
                    <p className="text-section-label mb-3">Atmosphere</p>
                    <h3 className="text-section-title text-2xl md:text-3xl mb-3 tracking-[0.15em]">
                        Cabin Architecture
                    </h3>
                    <div className="w-12 h-[1px] bg-white/10 mx-auto mb-4" />
                    <p className="text-section-body text-center mb-8">
                        Ambient lighting. Carbon fiber trim. A sanctuary of singular focus.
                    </p>

                    {/* Technical Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 pointer-events-none">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                            <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-1">Transmission</p>
                            <p className="text-sm font-light text-white">8-Speed PDK</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                            <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-1">Drive</p>
                            <p className="text-sm font-light text-white">RWD / AWD</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                            <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-1">Weight</p>
                            <p className="text-sm font-light text-white">3,354 lbs</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                            <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-1">Torque</p>
                            <p className="text-sm font-light text-white">390 lb-ft</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═══ SCENE 10 — SUNROOF EXIT ═══ */}
            <section className="h-[100vh]" />

            {/* ═══ SCENE 11 — ASCEND ═══ */}
            <section className="h-[100vh] flex flex-col items-center justify-center pointer-events-none">
                <motion.div style={{ opacity: s11, y: s11y }} className="text-center px-6">
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-[0.4em] uppercase mb-8">
                        Porsche
                    </h2>
                    <div className="flex flex-col items-center gap-6 mb-12">
                        <div className="w-16 h-[1px] bg-white/15" />
                        <p className="text-xs tracking-[0.7em] uppercase text-white/30 font-light">
                            Engineered for Emotion
                        </p>
                    </div>

                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
                    >
                        <button className="px-8 py-4 bg-white text-black font-medium text-sm tracking-wider uppercase hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl">
                            Build Your 911
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium text-sm tracking-wider uppercase hover:bg-white/5 hover:border-white/50 transition-all duration-300">
                            Find a Dealer
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium text-sm tracking-wider uppercase hover:bg-white/5 hover:border-white/50 transition-all duration-300">
                            Schedule Test Drive
                        </button>
                    </motion.div>

                    {/* Specifications Summary */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 max-w-4xl mx-auto"
                    >
                        <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-6">Technical Specifications</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pointer-events-none">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                                <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-2">Engine Type</p>
                                <p className="text-xs font-light text-white">Twin-Turbo Flat-6</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                                <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-2">Displacement</p>
                                <p className="text-xs font-light text-white">2,981 cc</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                                <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-2">Max Power</p>
                                <p className="text-xs font-light text-white">443 hp @ 6,500 rpm</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                                <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-2">Max Torque</p>
                                <p className="text-xs font-light text-white">390 lb-ft @ 2,300 rpm</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                                <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-2">0-60 mph</p>
                                <p className="text-xs font-light text-white">3.9 seconds</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                                <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/40 mb-2">Top Speed</p>
                                <p className="text-xs font-light text-white">190 mph</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-16 pt-8 border-t border-white/10"
                    >
                        <p className="text-[0.6rem] text-white/20 tracking-wider">
                            © 2026 Porsche. All Specifications Subject to Change. 
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
