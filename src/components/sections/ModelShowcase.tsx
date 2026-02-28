"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { carModels } from "@/data/carModels";

const ModelCard = ({ model, index }: { model: typeof carModels[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.2 1"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity, y }}
            className={`relative mb-32 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${model.gradient} flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center min-h-[600px]`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60 pointer-events-none" />

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

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center gap-6"
                >
                    <Link href={`/car/${model.slug}`}>
                        <button className="group flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-all hover:scale-105">
                            Buy Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <p className="text-xl font-light text-white/60">{model.price}</p>
                </motion.div>
            </div>

            <div className={`w-full lg:w-1/2 relative h-[400px] lg:h-full min-h-[400px] lg:min-h-[600px] overflow-hidden`}>
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                >
                    <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover object-center"
                        unoptimized
                    />
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

                <div className="flex flex-col">
                    {carModels.map((model, index) => (
                        <ModelCard key={index} model={model} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
