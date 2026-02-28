"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Zap, Shield, Gauge } from "lucide-react";
import { carModels } from "@/data/carModels";

export default function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const car = carModels.find(c => c.slug === slug);

    if (!car) return notFound();

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Sticky nav bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm tracking-wider uppercase">Back</span>
                    </Link>
                    <h1 className="text-lg font-light tracking-[0.2em] uppercase">{car.name}</h1>
                    <Link href={`/car/${car.slug}/checkout`}>
                        <button className="px-6 py-2 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-all">
                            Buy Now
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative h-[80vh] flex items-end overflow-hidden pt-16">
                <Image
                    src={car.gallery[0]}
                    alt={car.name}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm tracking-[0.5em] uppercase text-white/50 mb-3"
                    >
                        {car.tagline}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl md:text-8xl font-extralight tracking-wider mb-4"
                    >
                        {car.name}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-white/60 max-w-xl"
                    >
                        {car.description}
                    </motion.p>
                </div>
            </section>

            {/* Specs Bar */}
            <section className="border-y border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-8 items-center">
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-light text-white">{car.specs.power}</p>
                            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Power</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-light text-white">{car.specs.speed}</p>
                            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Top Speed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-light text-white">{car.specs.acceleration}</p>
                            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">0-60 mph</p>
                        </div>
                        <div className="hidden md:block text-center">
                            <p className="text-3xl md:text-4xl font-light text-white">{car.price.replace("From ", "")}</p>
                            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Starting At</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-light tracking-wider mb-12 text-center"
                    >
                        Gallery
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {car.gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className={`relative overflow-hidden rounded-2xl group ${
                                    i === 0 ? 'md:col-span-2 h-[500px]' : 'h-[350px]'
                                }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${car.name} - View ${i + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
                <div className="max-w-7xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-light tracking-wider mb-16 text-center"
                    >
                        Key Features
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {car.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-6 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.06] transition-colors"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                    <Check className="w-5 h-5 text-emerald-400" />
                                </div>
                                <p className="text-white/80 text-lg pt-1.5">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-32 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-sm tracking-[0.5em] uppercase text-white/40 mb-4">Ready to Own</p>
                        <h3 className="text-5xl md:text-6xl font-extralight tracking-wider mb-6">
                            Make It Yours
                        </h3>
                        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
                            Experience the thrill of owning a {car.name}. Complete your purchase today.
                        </p>
                        <Link href={`/car/${car.slug}/checkout`}>
                            <button className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-all hover:scale-105">
                                Buy Now — {car.price.replace("From ", "")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
