"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const galleryItems = [
    {
        title: "Precision Engineering",
        description: "Every component crafted to perfection",
        position: "top-0 left-0",
        size: "md:col-span-2 md:row-span-2",
        hasVideo: true,
        videoSrc: "/porsche-precision.mp4"
    },
    {
        title: "Interior Luxury",
        description: "Hand-stitched leather details",
        position: "top-0 right-0",
        size: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Performance Track",
        description: "Born on the Nürburgring",
        position: "bottom-0 left-0",
        size: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Night Drive",
        description: "LED matrix headlights",
        position: "bottom-0 right-0",
        size: "md:col-span-1 md:row-span-2"
    }
];

export default function ParallaxGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <section ref={containerRef} className="relative py-32 px-6 md:px-12 overflow-hidden bg-black">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-wider text-white mb-6">
                        Visual Story
                    </h2>
                    <p className="text-white/60 text-lg">
                        Experience the details that define excellence
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {galleryItems.map((item, index) => {
                        const useY1 = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                style={{ 
                                    y: useY1 ? y1 : y2,
                                    scale
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`group relative ${item.size} h-[400px] rounded-2xl overflow-hidden cursor-pointer`}
                            >
                                {/* Background placeholder with gradient or video */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                                    {item.hasVideo ? (
                                        <div className="absolute inset-0 z-0">
                                            <video
                                                className="w-full h-full object-cover opacity-60"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                preload="auto"
                                            >
                                                <source src={item.videoSrc} type="video/mp4" />
                                            </video>
                                            <div className="absolute inset-0 bg-black/40 z-10" />
                                        </div>
                                    ) : (
                                        /* Animated mesh gradient */
                                        <motion.div
                                            animate={{
                                                background: [
                                                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                                    'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                                ]
                                            }}
                                            transition={{ duration: 5, repeat: Infinity }}
                                            className="absolute inset-0"
                                        />
                                    )}
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl md:text-3xl font-light text-white mb-2 tracking-wide"
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-white/70 text-sm"
                                    >
                                        {item.description}
                                    </motion.p>

                                    {/* View more indicator */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileHover={{ x: 0, opacity: 1 }}
                                        className="mt-4 flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider"
                                    >
                                        <span>View Details</span>
                                        <div className="w-8 h-[1px] bg-white/30" />
                                    </motion.div>
                                </div>

                                {/* Border glow on hover */}
                                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-500" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <p className="text-sm tracking-[0.5em] uppercase text-white/30">
                        Crafted with Passion
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
