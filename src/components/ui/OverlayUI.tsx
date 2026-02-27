"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function OverlayUI() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

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

            {/* ═══ SCENE 1 — SILHOUETTE ═══ */}
            <section className="h-[100vh] flex items-center justify-center pointer-events-none relative">
                <motion.h1 style={{ opacity: s1Title }} className="text-hero text-[18vw] md:text-[15vw] select-none absolute">
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
                <motion.div style={{ opacity: s2 }} className="ml-10 md:ml-24 max-w-sm">
                    <p className="text-section-label mb-4">Exterior</p>
                    <h2 className="text-section-title text-3xl md:text-4xl mb-5">Sculpted<br />by Air</h2>
                    <div className="line-accent mb-5" />
                    <p className="text-section-body max-w-xs">
                        Every contour shaped by decades of wind-tunnel refinement.
                    </p>
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
                <motion.div style={{ opacity: s9 }} className="text-center max-w-md">
                    <p className="text-section-label mb-3">Atmosphere</p>
                    <h3 className="text-section-title text-2xl md:text-3xl mb-3 tracking-[0.15em]">
                        Cabin Architecture
                    </h3>
                    <div className="w-12 h-[1px] bg-white/10 mx-auto mb-4" />
                    <p className="text-section-body text-center">
                        Ambient lighting. Carbon fiber trim. A sanctuary of singular focus.
                    </p>
                </motion.div>
            </section>

            {/* ═══ SCENE 10 — SUNROOF EXIT ═══ */}
            <section className="h-[100vh]" />

            {/* ═══ SCENE 11 — ASCEND ═══ */}
            <section className="h-[100vh] flex flex-col items-center justify-center pointer-events-none">
                <motion.div style={{ opacity: s11, y: s11y }} className="text-center">
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-[0.4em] uppercase mb-8">
                        Porsche
                    </h2>
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-[1px] bg-white/15" />
                        <p className="text-xs tracking-[0.7em] uppercase text-white/30 font-light">
                            Engineered for Emotion
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
