"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function SafetyShield() {
    return (
        <section className="py-24 bg-background-dark text-white overflow-hidden relative">
            <motion.div
                className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-3xl pointer-events-none"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="space-y-10"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-4">
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-bold border border-primary/30"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <ShieldCheck size={16} />
                                Safety First Protocol
                            </motion.div>
                            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">The "Safety Shield" Confidence</h2>
                            <p className="text-gray-400 text-lg">Every coach passes a rigorous multi-step vetting process because we know that trust is everything.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Live Scan Verified", color: "#FCD34D", desc: "Every staff member is fingerprinted and cleared through DOJ/FBI databases." },
                                { title: "CPR & First Aid", color: "#FF7E67", desc: "Certified by the American Red Cross to ensure immediate response in any situation." },
                                { title: "Fully Bonded & Insured", color: "#14B8A6", desc: "Multi-million dollar policy covering all activities at your site, with schools/cities as Additionally Insured.", full: true }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className={`p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 ${item.full ? "sm:col-span-2" : ""}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <h5 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        {item.title}
                                    </h5>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-square group bg-white/5">
                            <motion.img
                                src="/junior sports coach-8941567.jpg"
                                alt="Reassuring Coach"
                                className="w-full h-full object-contain"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
