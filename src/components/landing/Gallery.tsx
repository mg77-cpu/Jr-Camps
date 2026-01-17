"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const images = [
        "/junior sports coach-8941567.jpg",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
        "/science lab.jpg",
        "/drone project.jpg",
        "/taekwan.jpg",
        "/rocket.jpg"
    ];

    const column1 = [images[0], images[3]];
    const column2 = [images[1], images[4]];
    const column3 = [images[2], images[5]];

    const fadeInScale = {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    return (
        <section className="py-24 bg-background-light dark:bg-background-dark overflow-hidden" ref={containerRef}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 italic">
                        The "<span className="text-primary">Vibe</span> Check"
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Real moments of growth, discovery, and teamwork.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <motion.div style={{ y: y1 }} className="space-y-6">
                        {column1.map((src, i) => (
                            <motion.div
                                key={`col1-${i}`}
                                className="rounded-3xl overflow-hidden shadow-lg"
                                variants={fadeInScale}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={src} alt={`Gallery image col1-${i + 1}`} className="w-full h-auto" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div style={{ y: y2 }} className="space-y-6">
                        {column2.map((src, i) => (
                            <motion.div
                                key={`col2-${i}`}
                                className="rounded-3xl overflow-hidden shadow-lg"
                                variants={fadeInScale}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={src} alt={`Gallery image col2-${i + 1}`} className="w-full h-auto" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div style={{ y: y3 }} className="space-y-6">
                        {column3.map((src, i) => (
                            <motion.div
                                key={`col3-${i}`}
                                className="rounded-3xl overflow-hidden shadow-lg"
                                variants={fadeInScale}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={src} alt={`Gallery image col3-${i + 1}`} className="w-full h-auto" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
