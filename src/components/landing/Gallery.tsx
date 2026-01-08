"use client";

import { motion } from "framer-motion";

export function Gallery() {
    const fadeInScale = {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    const staggerContainer = {
        whileInView: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="py-24 bg-background-light dark:bg-background-dark overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 italic">The "Vibe Check"</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Real moments of growth, discovery, and teamwork.</p>
                </motion.div>

                <motion.div
                    className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {[
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
                        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
                        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600",
                        "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=600",
                        "https://images.unsplash.com/photo-1502086223501-7ea244344e13?q=80&w=600",
                        "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=600"
                    ].map((src, i) => (
                        <motion.div
                            key={i}
                            className="break-inside-avoid rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800"
                            variants={fadeInScale}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={src} alt={`Gallery image ${i + 1}`} className="w-full h-auto" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
