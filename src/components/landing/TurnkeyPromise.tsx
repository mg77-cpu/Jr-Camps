"use client";

import { IdCard, Package, Laptop } from "lucide-react";
import { motion } from "framer-motion";

export function TurnkeyPromise() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        whileInView: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <section id="partners" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 italic leading-tight">Specifically Built for Institutions</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Our Turnkey Solution solves the "3:00 PM Gap" for schools and cities.</p>
                </motion.div>

                <div className="relative">
                    {/* Dotted Connection Line - Desktop */}
                    <motion.div
                        className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dotted border-gray-200 dark:border-slate-800 -translate-y-1/2 z-0"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                    ></motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-center"
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {/* Step 1 */}
                        <motion.div
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-soft"
                            variants={fadeIn}
                        >
                            <div className="h-16 w-16 bg-[#FCD34D]/10 rounded-2xl flex items-center justify-center text-[#FCD34D] mb-6 mx-auto">
                                <IdCard size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">We Bring the Staff</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Live Scan background-checked, CPR certified, and expert-trained instructors for every session.
                            </p>
                        </motion.div>
                        {/* Step 2 */}
                        <motion.div
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-soft scale-105 ring-4 ring-primary/5"
                            variants={fadeIn}
                        >
                            <div className="h-16 w-16 bg-[#FF7E67]/10 rounded-2xl flex items-center justify-center text-[#FF7E67] mb-6 mx-auto">
                                <Package size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">We Bring the Gear</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                From soccer balls to advanced robotics kits, we handle the equipment management and storage.
                            </p>
                        </motion.div>
                        {/* Step 3 */}
                        <motion.div
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-soft"
                            variants={fadeIn}
                        >
                            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto">
                                <Laptop size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">We Handle Admin</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Payments, waivers, and parent communication are managed on our secure digital platform.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
