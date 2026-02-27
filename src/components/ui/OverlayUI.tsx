"use client";

import { motion } from "framer-motion";

export default function OverlayUI() {
    return (
        <div id="main-experience" className="relative z-10 w-full">
            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center p-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-thin tracking-tighter uppercase mb-4">
                        911
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-[0.5em] uppercase opacity-60">
                        Precision in Motion
                    </p>
                </motion.div>

                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-[1px] h-12 bg-black/20" />
                </motion.div>
            </section>

            {/* Door / Entry Section */}
            <section className="h-screen flex items-center justify-start p-10 md:p-24">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-200px" }}
                    className="max-w-md"
                >
                    <h2 className="text-4xl font-light mb-4">Perfect Entry</h2>
                    <p className="text-lg opacity-70">
                        Engineered for seamless interaction. Every curve, every handle, every detail is considered for the perfect driver entry.
                    </p>
                </motion.div>
            </section>

            {/* Interior Story Section */}
            <section className="h-[200vh] relative">
                <div className="sticky top-0 h-screen flex flex-col items-end justify-center p-10 md:p-24 space-y-24">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-right"
                    >
                        <h3 className="text-3xl font-light mb-2">Digital Cockpit</h3>
                        <p className="opacity-60 max-w-xs ml-auto">Intuitive control at your fingertips. High-definition displays meet classic heritage.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-right"
                    >
                        <h3 className="text-3xl font-light mb-2">Leather Interiors</h3>
                        <p className="opacity-60 max-w-xs ml-auto">Premium Alcantara and hand-stitched leather. Unmatched comfort for high-performance driving.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-right"
                    >
                        <h3 className="text-3xl font-light mb-2">Ambient Lighting</h3>
                        <p className="opacity-60 max-w-xs ml-auto">Craft the perfect mood for every journey with customizable interior glow.</p>
                    </motion.div>
                </div>
            </section>

            {/* Exit Section */}
            <section className="h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-light mb-4">Ascend</h2>
                    <p className="opacity-70 max-w-sm">Experience the world from a new perspective.</p>
                </motion.div>
            </section>

            {/* Final Section */}
            <section className="h-screen flex flex-col items-center justify-center bg-black/5">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/d/df/Porsche_logo.svg"
                        alt="Porsche"
                        className="w-48 mb-12 grayscale opacity-80"
                    />
                    <h2 className="text-3xl font-light tracking-[0.3em] uppercase mb-8">
                        The Legend Lives On
                    </h2>
                    <button className="px-12 py-4 border border-black/20 hover:bg-black hover:text-white transition-colors duration-500 uppercase tracking-widest text-sm">
                        Explore the Machine
                    </button>
                </motion.div>
            </section>
        </div>
    );
}
