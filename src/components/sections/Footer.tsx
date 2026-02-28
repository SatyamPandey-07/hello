"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const footerLinks = {
    models: [
        { name: "911 Carrera", href: "#" },
        { name: "911 Carrera S", href: "#" },
        { name: "911 Turbo", href: "#" },
        { name: "911 GT3", href: "#" },
        { name: "Taycan", href: "#" },
        { name: "Panamera", href: "#" }
    ],
    services: [
        { name: "Find a Dealer", href: "#" },
        { name: "Book Test Drive", href: "#" },
        { name: "Configure Your Car", href: "#" },
        { name: "Financing Options", href: "#" },
        { name: "Maintenance", href: "#" },
        { name: "Accessories", href: "#" }
    ],
    company: [
        { name: "About Porsche", href: "#" },
        { name: "Careers", href: "#" },
        { name: "News & Events", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Innovation", href: "#" },
        { name: "Museum", href: "#" }
    ]
};

const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" }
];

export default function Footer() {
    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
            
            {/* Animated grid */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }} />
            </div>

            <div className="relative z-10">
                {/* Newsletter section */}
                <div className="border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
                                    Stay Connected
                                </h3>
                                <p className="text-white/60 text-lg">
                                    Subscribe for exclusive updates, new model releases, and special events.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="flex gap-4"
                            >
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                                />
                                <button className="px-8 py-4 bg-white text-black font-medium text-sm tracking-wider uppercase hover:bg-white/90 transition-all group">
                                    <span className="flex items-center gap-2">
                                        Subscribe
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Main footer content */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                        {/* Models */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-sm tracking-[0.3em] uppercase text-white/40 mb-6">Models</h4>
                            <ul className="space-y-3">
                                {footerLinks.models.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-white/70 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Services */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-sm tracking-[0.3em] uppercase text-white/40 mb-6">Services</h4>
                            <ul className="space-y-3">
                                {footerLinks.services.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-white/70 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Company */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-sm tracking-[0.3em] uppercase text-white/40 mb-6">Company</h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-white/70 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-sm tracking-[0.3em] uppercase text-white/40 mb-6">Contact</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-white/40 mt-1" />
                                    <a href="mailto:info@porsche.com" className="text-white/70 hover:text-white transition-colors text-sm">
                                        info@porsche.com
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-white/40 mt-1" />
                                    <a href="tel:+1234567890" className="text-white/70 hover:text-white transition-colors text-sm">
                                        +1 (234) 567-890
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-white/40 mt-1" />
                                    <span className="text-white/70 text-sm">
                                        Stuttgart, Germany
                                    </span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            {/* Logo & Copyright */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-center md:text-left"
                            >
                                <h2 className="text-3xl font-extralight tracking-[0.3em] uppercase mb-2">Porsche</h2>
                                <p className="text-xs text-white/40">
                                    © 2026 Porsche Experience. All rights reserved.
                                </p>
                            </motion.div>

                            {/* Social links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="flex gap-4"
                            >
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-full transition-all group"
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                        </motion.a>
                                    );
                                })}
                            </motion.div>

                            {/* Legal links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="flex gap-6 text-xs text-white/40"
                            >
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                                <a href="#" className="hover:text-white transition-colors">Cookies</a>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
        </footer>
    );
}
