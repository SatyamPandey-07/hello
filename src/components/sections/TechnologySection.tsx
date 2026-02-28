"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Cpu, Battery, Radio } from "lucide-react";

const innovations = [
    {
        year: "2024",
        title: "Active Ride Control",
        description: "Electrohydraulic single-wheel control for maximum agility and comfort",
        icon: Sparkles
    },
    {
        year: "2025",
        title: "Intelligent Range",
        description: "AI-powered battery management optimizing performance and efficiency",
        icon: Battery
    },
    {
        year: "2026",
        title: "Connected Drive",
        description: "Real-time vehicle communication with predictive maintenance alerts",
        icon: Radio
    }
];

export default function TechnologySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

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
                    {/* Vertical line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

                    <div className="space-y-32">
                        {innovations.map((item, index) => {
                            const Icon = item.icon;
                            const isEven = index % 2 === 0;

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
                                            <div className="px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                                                <span className="text-sm font-mono text-white/70">{item.year}</span>
                                            </div>
                                        </motion.div>

                                        <h3 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/60 text-lg leading-relaxed max-w-md">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Icon circle */}
                                    <div className={`${isEven ? 'md:col-start-2' : 'md:col-start-1'} flex justify-center`}>
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="relative"
                                        >
                                            {/* Outer glow ring */}
                                            <motion.div
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.5, 0.2, 0.5]
                                                }}
                                                transition={{ 
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                className="absolute inset-0 bg-white/10 rounded-full blur-xl"
                                            />

                                            {/* Icon container */}
                                            <div className="relative w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-full flex items-center justify-center">
                                                <Icon className="w-12 h-12 text-white" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Center dot (desktop only) */}
                                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-4 border-black" />
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
