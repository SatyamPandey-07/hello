"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GitCompareArrows } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { label: "Models", href: "#models" },
    { label: "Experience", href: "#experience" },
    { label: "Technology", href: "#technology" },
    { label: "Gallery", href: "#gallery" },
    { label: "Configure", href: "#configure" },
];

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [atTop, setAtTop] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleScroll = useCallback(() => {
        const currentY = window.scrollY;
        setAtTop(currentY < 20);

        if (currentY > lastScrollY && currentY > 80) {
            // Scrolling down & past threshold → hide
            setVisible(false);
            setMobileOpen(false);
        } else {
            // Scrolling up → show
            setVisible(true);
        }
        setLastScrollY(currentY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <>
            <AnimatePresence>
                {visible && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${atTop
                                ? "bg-transparent"
                                : "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
                            }`}
                    >
                        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                            {/* Logo */}
                            <a href="#" className="flex items-center gap-3 group">
                                <span className="text-sm font-extralight tracking-[0.4em] uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                                    Porsche
                                </span>
                                <span className="text-[0.6rem] tracking-[0.2em] text-white/30 font-light hidden sm:inline">
                                    911
                                </span>
                            </a>

                            {/* Desktop Links */}
                            <div className="hidden md:flex items-center gap-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const target = document.querySelector(link.href);
                                            if (target && (window as any).lenis) {
                                                (window as any).lenis.scrollTo(target, { offset: 0, duration: 1.5 });
                                            }
                                        }}
                                        className="relative text-[0.7rem] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 font-light py-1 group"
                                    >
                                        {link.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 group-hover:w-full transition-all duration-300" />
                                    </a>
                                ))}
                            </div>

                            {/* CTA + Compare + Mobile Toggle */}
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/compare"
                                    className="hidden md:inline-flex items-center gap-2 text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2 text-white/40 hover:text-white/80 transition-all duration-300 font-light group"
                                >
                                    <GitCompareArrows className="w-3.5 h-3.5 group-hover:text-[#D5001C] transition-colors" />
                                    Compare
                                </Link>
                                <a
                                    href="#"
                                    className="hidden md:inline-block text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 rounded-sm font-light"
                                >
                                    Build Yours
                                </a>

                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                    className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                                    aria-label="Menu"
                                >
                                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {mobileOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5"
                                >
                                    <div className="px-6 py-6 flex flex-col gap-4">
                                        {navLinks.map((link, i) => (
                                            <motion.a
                                                key={link.label}
                                                href={link.href}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="text-sm tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors font-light py-2 border-b border-white/5"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setMobileOpen(false);
                                                    const target = document.querySelector(link.href);
                                                    if (target && (window as any).lenis) {
                                                        (window as any).lenis.scrollTo(target, { offset: 0, duration: 1.5 });
                                                    }
                                                }}
                                            >
                                                {link.label}
                                            </motion.a>
                                        ))}
                                        <Link
                                            href="/compare"
                                            className="flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors font-light py-2 border-b border-white/5"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <GitCompareArrows className="w-4 h-4" />
                                            Compare Models
                                        </Link>
                                        <a
                                            href="#"
                                            className="mt-2 text-center text-xs tracking-[0.15em] uppercase px-5 py-3 border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 font-light"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            Build Yours
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
