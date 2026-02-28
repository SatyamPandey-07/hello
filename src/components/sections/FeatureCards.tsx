"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import { Gauge, Wind, Zap, Shield } from "lucide-react";

interface Feature {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
    color: string;
    hasVideo?: boolean;
    videoSrc?: string;
}

const features: Feature[] = [
    {
        icon: Gauge,
        title: "Peak Performance",
        description: "Twin-turbocharged flat-six engine delivering 443 hp with instantaneous throttle response.",
        stat: "3.9s",
        statLabel: "0-60 mph",
        color: "from-red-500/20 to-orange-500/20"
    },
    {
        icon: Wind,
        title: "Aerodynamics",
        description: "Active aerodynamics with adaptive rear spoiler optimizing downforce at every speed.",
        stat: "0.29",
        statLabel: "Drag Coefficient",
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        icon: Zap,
        title: "Precision Engineering",
        description: "Porsche Active Suspension Management adapts to driving conditions in milliseconds.",
        stat: "10ms",
        statLabel: "Response Time",
        color: "from-purple-500/20 to-pink-500/20",
        hasVideo: true,
        videoSrc: "/porsche-precision.mp4"
    },
    {
        icon: Shield,
        title: "Safety First",
        description: "Advanced driver assistance with collision prevention and adaptive cruise control.",
        stat: "5★",
        statLabel: "Safety Rating",
        color: "from-green-500/20 to-emerald-500/20"
    }
];

export default function FeatureCards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const handleMouseEnter = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 px-6 md:px-12 overflow-hidden bg-black">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
            
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }} />
            </div>

            <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-sm tracking-[0.5em] uppercase text-white/40 mb-4">Engineering Excellence</p>
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-wider text-white mb-6">
                        Beyond Limits
                    </h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
                </motion.div>

                {/* Feature cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: index * 0.2,
                                    ease: [0.25, 0.4, 0.25, 1]
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                    y: -10, 
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                                className="group relative"
                                onMouseEnter={feature.hasVideo ? handleMouseEnter : undefined}
                                onMouseLeave={feature.hasVideo ? handleMouseLeave : undefined}
                            >
                                {/* Card */}
                                <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                                    {/* Video background for precision engineering card — hidden by default, shown on hover */}
                                    {feature.hasVideo && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                                            <video
                                                ref={videoRef}
                                                className="w-full h-full object-cover"
                                                loop
                                                muted
                                                playsInline
                                                preload="auto"
                                                disablePictureInPicture
                                                controls={false}
                                            >
                                                <source src={feature.videoSrc} type="video/mp4" />
                                            </video>
                                            {/* Video overlay gradient for better text readability */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30 z-10" />
                                        </div>
                                    )}

                                    {/* Hover gradient effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    
                                    {/* Animated corner accent */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                                    
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="mb-6 inline-block"
                                        >
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors">
                                                <Icon className="w-8 h-8 text-white/70 group-hover:text-white transition-colors" />
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-light tracking-wide text-white mb-4 group-hover:text-white transition-colors">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors">
                                            {feature.description}
                                        </p>

                                        {/* Stat */}
                                        <div className="pt-6 border-t border-white/10 group-hover:border-white/30 transition-colors">
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-light text-white">
                                                    {feature.stat}
                                                </span>
                                                <span className="text-xs text-white/40 pb-2 tracking-wider uppercase">
                                                    {feature.statLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Particle effect on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1 h-1 bg-white rounded-full"
                                                initial={{ x: '50%', y: '50%', opacity: 0 }}
                                                whileInView={{
                                                    x: `${Math.random() * 100}%`,
                                                    y: `${Math.random() * 100}%`,
                                                    opacity: [0, 1, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.3,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <button className="group relative px-12 py-5 bg-white text-black text-sm font-medium tracking-wider uppercase overflow-hidden">
                        <span className="relative z-10">Explore Technology</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}
