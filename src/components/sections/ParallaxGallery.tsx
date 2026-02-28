"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const galleryItems = [
    {
        title: "Precision Engineering",
        description: "Every component crafted to perfection",
        size: "md:col-span-2 md:row-span-2",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop",
        youtubeId: "DZAdVY9kKbc",
    },
    {
        title: "Interior Luxury",
        description: "Hand-stitched leather details",
        size: "md:col-span-1 md:row-span-1",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
        youtubeId: "OGEEQ9VEEmc",
    },
    {
        title: "Performance Track",
        description: "Born on the Nürburgring",
        size: "md:col-span-1 md:row-span-1",
        image: "https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?q=80&w=2000&auto=format&fit=crop",
        youtubeId: "B7oOtTgYEZM",
    },
    {
        title: "Night Drive",
        description: "LED matrix headlights",
        size: "md:col-span-1 md:row-span-2",
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=2000&auto=format&fit=crop",
        youtubeId: "j1pBfCmmrCo",
    }
];

function GalleryCard({ item, index, y }: { item: typeof galleryItems[0]; index: number; y: any }) {
    const [isHovered, setIsHovered] = useState(false);

    const youtubeEmbedUrl = `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${item.youtubeId}&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`;

    return (
        <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative ${item.size} h-[400px] rounded-2xl overflow-hidden cursor-pointer`}
        >
            {/* Background image (always visible) */}
            <div className="absolute inset-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                />
                {/* Dark overlay on image */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* YouTube iframe (hidden by default, shows on hover) */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {isHovered && (
                    <iframe
                        className="w-full h-full pointer-events-none"
                        style={{
                            transform: 'scale(1.5)',
                            transformOrigin: 'center center',
                            border: 'none',
                        }}
                        src={youtubeEmbedUrl}
                        title={item.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen={false}
                    />
                )}
                {/* Subtle overlay on video */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end">
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

                {/* Play indicator */}
                <motion.div
                    className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white/60 transition-colors duration-500"
                >
                    <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
                        <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <span className="text-xs uppercase tracking-wider">Playing</span>
                </motion.div>
            </div>

            {/* Border glow on hover */}
            <div className="absolute inset-0 z-30 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
        </motion.div>
    );
}

export default function ParallaxGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={containerRef} className="relative py-32 px-6 md:px-12 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

            {/* Background image */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src="/istockphoto-1419988769-612x612.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-[0.08]"
                    unoptimized
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

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
                    {galleryItems.map((item, index) => (
                        <GalleryCard
                            key={index}
                            item={item}
                            index={index}
                            y={index % 2 === 0 ? y1 : y2}
                        />
                    ))}
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
