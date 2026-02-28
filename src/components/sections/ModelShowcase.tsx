"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const models = [
    {
        name: "911 Carrera",
        tagline: "The Icon",
        description: "Pure driving pleasure in its most iconic form. Rear-engine layout, timeless design.",
        specs: { power: "379 hp", speed: "182 mph", acceleration: "4.0s" },
        price: "From $106,100",
        gradient: "from-zinc-900 via-zinc-800 to-zinc-900",
        image: "https://images.unsplash.com/photo-1553201108-3cb4c5a04302?q=80&w=4000&auto=format&fit=crop"
    },
    {
        name: "911 Carrera S",
        tagline: "Elevated Performance",
        description: "Enhanced twin-turbo power with wider body and advanced dynamics.",
        specs: { power: "443 hp", speed: "190 mph", acceleration: "3.9s" },
        price: "From $120,340",
        gradient: "from-red-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1768066522148-2a9d0df56803?q=80&w=4000&auto=format&fit=crop"
    },
    {
        name: "911 Turbo",
        tagline: "Explosive Power",
        description: "All-wheel drive precision with devastating acceleration and active aerodynamics.",
        specs: { power: "572 hp", speed: "198 mph", acceleration: "2.7s" },
        price: "From $177,200",
        gradient: "from-orange-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1738169679745-a4be01c7292d?q=80&w=4000&auto=format&fit=crop"
    },
    {
        name: "911 GT3",
        tagline: "Track Weapon",
        description: "Naturally aspirated 4.0L flat-six screaming to 9,000 RPM. Pure motorsport DNA.",
        specs: { power: "502 hp", speed: "197 mph", acceleration: "3.2s" },
        price: "From $162,450",
        gradient: "from-blue-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1693149351428-15a4961d698d?q=80&w=4000&auto=format&fit=crop"
    },
    {
        name: "Taycan",
        tagline: "Soul, Electrified",
        description: "Striking proportions, timeless and instantly recognizable design. The first all-electric Porsche.",
        specs: { power: "402 hp", speed: "143 mph", acceleration: "4.5s" },
        price: "From $90,900",
        gradient: "from-cyan-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1658052855902-0e3428bd89fc?q=80&w=4000&auto=format&fit=crop"
    },
    {
        name: "Panamera",
        tagline: "Drive. And Driven.",
        description: "Sports car performance forged with luxury sedan comfort for the everyday.",
        specs: { power: "348 hp", speed: "169 mph", acceleration: "5.0s" },
        price: "From $99,900",
        gradient: "from-purple-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1678789521533-3967bcebb275?q=80&w=4000&auto=format&fit=crop"
    }
];

const ModelCard = ({ model, index }: { model: typeof models[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.2 1"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

    // Alternating layout based on index (even/odd)
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity, y }}
            className={`relative mb-32 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${model.gradient} flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center min-h-[600px]`}
        >
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60 pointer-events-none" />

            {/* Model Info Section */}
            <div className={`w-full lg:w-1/2 p-8 lg:p-16 z-10 flex flex-col justify-center h-full`}>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm tracking-[0.4em] uppercase text-white/50 mb-3"
                >
                    {model.tagline}
                </motion.p>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-6xl font-light tracking-wide text-white mb-6"
                >
                    {model.name}
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-white/70 leading-relaxed max-w-xl mb-10"
                >
                    {model.description}
                </motion.p>

                {/* Specs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-3 gap-4 mb-10"
                >
                    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-4">
                        <p className="text-2xl md:text-3xl font-light text-white mb-1">{model.specs.power}</p>
                        <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">Power</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-4">
                        <p className="text-2xl md:text-3xl font-light text-white mb-1">{model.specs.speed}</p>
                        <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">Top Speed</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-4">
                        <p className="text-2xl md:text-3xl font-light text-white mb-1">{model.specs.acceleration}</p>
                        <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">0-60 mph</p>
                    </div>
                </motion.div>

                {/* Price & CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center gap-6"
                >
                    <button className="group flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-all hover:scale-105">
                        Configure
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xl font-light text-white/60">{model.price}</p>
                </motion.div>
            </div>

            {/* Image Section */}
            <div className={`w-full lg:w-1/2 relative h-[400px] lg:h-full min-h-[400px] lg:min-h-[600px] overflow-hidden`}>
                {/* Parallax effect on image */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                >
                    <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover object-center"
                        unoptimized // Adding unoptimized since these are external Wikipedia images 
                    />
                    {/* Dark gradient overlay for blending into the background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-black/80 via-black/20 to-transparent hidden lg:block`} />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function ModelShowcase() {
    return (
        <section className="relative py-32 px-6 md:px-12 bg-black">
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <p className="text-sm tracking-[0.5em] uppercase text-white/40 mb-4">Model Range</p>
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-wider text-white">
                        Choose Your Legend
                    </h2>
                </motion.div>

                {/* Staggered Model Cards List */}
                <div className="flex flex-col">
                    {models.map((model, index) => (
                        <ModelCard key={index} model={model} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
