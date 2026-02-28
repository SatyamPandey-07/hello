"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function ARExperienceCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background ambient */}
      <div className="absolute inset-0">
        {/* Subtle radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, #D5001C 0%, transparent 70%)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Top accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D5001C] to-transparent mx-auto mb-10"
        />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.6em] uppercase text-[#D5001C]/60 mb-6 font-light"
        >
          Augmented Reality
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-wider text-white mb-6 leading-tight"
        >
          Experience It
          <br />
          <span className="text-white/40">In Your Space</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-white/30 font-light tracking-wider max-w-md mx-auto mb-12 leading-relaxed"
        >
          Place the Porsche 911 in your world. Walk around it.
          Feel the presence. Hear the engine.
        </motion.p>

        {/* CTA Button — navigates to /ar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/ar">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex px-10 py-5 overflow-hidden cursor-pointer"
              id="ar-experience-cta"
            >
              {/* Border animation */}
              <span className="absolute inset-0 border border-white/15 group-hover:border-[#D5001C]/40 transition-colors duration-700" />

              {/* Hover fill */}
              <span className="absolute inset-0 bg-[#D5001C]/0 group-hover:bg-[#D5001C]/10 transition-all duration-700" />

              {/* Red accent line at bottom */}
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D5001C]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              <span className="relative z-10 flex items-center gap-4 text-white/80 group-hover:text-white transition-colors duration-500">
                {/* AR icon */}
                <svg
                  className="w-5 h-5 text-[#D5001C]/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span className="text-xs tracking-[0.35em] uppercase font-light">
                  Launch AR Test Drive
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[#D5001C]/60"
                >
                  →
                </motion.span>
              </span>
            </motion.span>
          </Link>
        </motion.div>

        {/* Device compatibility note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-8 text-[10px] tracking-[0.4em] uppercase text-white/15"
        >
          Compatible with iOS &amp; Android devices
        </motion.p>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mt-16"
        />
      </motion.div>
    </section>
  );
}
