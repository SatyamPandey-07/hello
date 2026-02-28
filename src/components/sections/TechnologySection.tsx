"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Cpu, Battery, Radio } from "lucide-react";
import Image from "next/image";

const innovations = [
    {
        year: "2024",
        title: "Active Ride Control",
        description: "Electrohydraulic single-wheel control for maximum agility and comfort",
        icon: Sparkles,
        gradient: "from-amber-400 via-orange-500 to-red-500",
        glowColor: "rgba(251,146,60,0.5)",
    },
    {
        year: "2025",
        title: "Intelligent Range",
        description: "AI-powered battery management optimizing performance and efficiency",
        icon: Battery,
        gradient: "from-emerald-400 via-teal-500 to-cyan-500",
        glowColor: "rgba(45,212,191,0.5)",
    },
    {
        year: "2026",
        title: "Connected Drive",
        description: "Real-time vehicle communication with predictive maintenance alerts",
        icon: Radio,
        gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
        glowColor: "rgba(168,85,247,0.5)",
    }
];

export default function TechnologySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

    // Car moves from top to bottom of the timeline
    const carY = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
    const carOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

    // Track scroll to determine which icon the car is near
    // 3 icons evenly spaced: thresholds at ~0.30, ~0.50, ~0.70
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.22) {
            setActiveIndex(-1);
        } else if (latest < 0.38) {
            setActiveIndex(0); // Active Ride Control
        } else if (latest < 0.55) {
            setActiveIndex(1); // Intelligent Range
        } else if (latest < 0.72) {
            setActiveIndex(2); // Connected Drive
        } else {
            setActiveIndex(-1); // Car has passed all
        }
    });

    return (
        <section ref={containerRef} className="relative py-32 px-6 md:px-12 overflow-hidden bg-black">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="tech-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#tech-pattern)" />
                </svg>
            </div>

            <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
                        <Cpu className="w-5 h-5 text-white/40" />
                        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-wider text-white mb-6">
                        Innovation Timeline
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Pioneering technology that redefines what&apos;s possible on four wheels
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line — gradient colored */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] hidden md:block overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-b from-amber-500/30 via-teal-500/30 to-purple-500/30" />
                    </div>

                    {/* Scroll-driven Porsche car (top-down) along the timeline */}
                    <motion.div
                        style={{ top: carY, opacity: carOpacity }}
                        className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:block pointer-events-none"
                    >
                        <div className="relative -ml-[30px] w-[60px]">
                            <Image
                                src="/porsche-topdown.png"
                                alt="Porsche"
                                width={60}
                                height={100}
                                className="drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                style={{ objectFit: 'contain' }}
                            />
                            {/* Headlight glow effect */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-300/20 rounded-full blur-lg" />
                        </div>
                    </motion.div>

                    <div className="space-y-32">
                        {innovations.map((item, index) => {
                            const Icon = item.icon;
                            const isEven = index % 2 === 0;
                            const isActive = activeIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className={`relative grid md:grid-cols-2 gap-12 items-center ${
                                        isEven ? '' : 'md:flex-row-reverse'
                                    }`}
                                >
                                    {/* Content */}
                                    <div className={`${isEven ? 'md:text-right' : 'md:col-start-2'}`}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="inline-block mb-4"
                                        >
                                            <div
                                                className="px-6 py-2 backdrop-blur-sm rounded-full transition-all duration-500"
                                                style={{
                                                    background: isActive
                                                        ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                                                        : 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                                                    borderWidth: '1px',
                                                    borderStyle: 'solid',
                                                    borderColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                                                }}
                                            >
                                                <span
                                                    className={`text-sm font-mono font-semibold transition-all duration-500 ${isActive
                                                            ? `bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`
                                                            : 'text-white/30'
                                                        }`}
                                                >
                                                    {item.year}
                                                </span>
                                            </div>
                                        </motion.div>

                                        <h3 className={`text-4xl md:text-5xl font-light mb-4 tracking-wide transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40'
                                            }`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-lg leading-relaxed max-w-md transition-colors duration-500 ${isActive ? 'text-white/70' : 'text-white/30'
                                            }`}>
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Icon circle — glows only when active */}
                                    <div className={`${isEven ? 'md:col-start-2' : 'md:col-start-1'} flex justify-center`}>
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="relative"
                                        >
                                            {/* Outer glow ring — only when active */}
                                            <div
                                                className="absolute inset-0 rounded-full blur-xl transition-all duration-700"
                                                style={{
                                                    background: item.glowColor,
                                                    opacity: isActive ? 0.6 : 0,
                                                    transform: isActive ? 'scale(1.3)' : 'scale(1)',
                                                }}
                                            />

                                            {/* Second glow layer */}
                                            <div
                                                className="absolute inset-0 rounded-full blur-2xl transition-all duration-700"
                                                style={{
                                                    background: item.glowColor,
                                                    opacity: isActive ? 0.3 : 0,
                                                    transform: isActive ? 'scale(1.5)' : 'scale(1)',
                                                }}
                                            />

                                            {/* Icon container */}
                                            <div className="relative w-32 h-32 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500">
                                                {/* Gradient border ring */}
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-full transition-opacity duration-500`}
                                                    style={{ opacity: isActive ? 1 : 0.15 }}
                                                />
                                                {/* Inner dark circle */}
                                                <div className="absolute inset-[2px] bg-black/90 rounded-full" />
                                                {/* Inner gradient fill — only when active */}
                                                <div
                                                    className={`absolute inset-[2px] bg-gradient-to-br ${item.gradient} rounded-full transition-opacity duration-500`}
                                                    style={{ opacity: isActive ? 0.2 : 0.03 }}
                                                />
                                                {/* Icon */}
                                                <Icon
                                                    className="relative z-10 w-12 h-12 transition-all duration-500"
                                                    style={{
                                                        color: isActive ? 'white' : 'rgba(255,255,255,0.25)',
                                                        filter: isActive ? `drop-shadow(0 0 12px ${item.glowColor})` : 'none',
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Center dot */}
                                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-black overflow-hidden transition-all duration-500">
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-full transition-opacity duration-500`}
                                            style={{ opacity: isActive ? 1 : 0.2 }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-32"
                >
                    <button className="group relative px-12 py-5 bg-transparent border-2 border-white/20 text-white text-sm font-medium tracking-wider uppercase hover:border-white/40 transition-all overflow-hidden">
                        <span className="relative z-10 group-hover:text-black transition-colors">Discover Innovations</span>
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ y: '100%' }}
                            whileHover={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}
