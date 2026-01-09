"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                className="text-center max-w-4xl mx-auto mb-16 relative"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
                    variants={fadeIn}
                >
                    Give your <br className="hidden sm:block" />
                    children specialized <br className="hidden sm:block" />
                    active learning
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    variants={fadeIn}
                >
                    High-quality After-School Sports, STEM, and Self-Defense programs. <br className="hidden sm:block" />
                    Turning idle time into active discovery.
                </motion.p>
                <motion.div className="mt-8" variants={fadeIn}>
                    <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg transition-all duration-200">
                        <Link href="/get-started">Get started</Link>
                    </Button>
                </motion.div>

                {/* Floating Cards - Rearranged per mockup */}

                {/* Robot Card - Top Right */}
                <motion.div
                    className="absolute -right-20 lg:-right-36 xl:-right-56 top-0 w-64 lg:w-72 bg-white rounded-[2rem] shadow-xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto hidden md:block z-20"
                    initial={{ opacity: 0, x: 50, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 3 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <img
                        src="/kids in STEM.jpg"
                        alt="Kids in STEM"
                        className="w-full h-auto block"
                    />
                </motion.div>

                {/* Baseball Card - Mid Left (Starts between subtitle and button level) */}
                <motion.div
                    className="absolute -left-12 lg:-left-24 xl:-left-36 top-[40%] w-48 lg:w-56 bg-white rounded-[2rem] shadow-2xl overflow-hidden -rotate-6 transition-transform duration-500 pointer-events-auto hidden md:block z-10"
                    initial={{ opacity: 0, x: -50, rotate: 0 }}
                    animate={{ opacity: 1, x: 0, rotate: -6 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <img
                        src="/baseball campy.jpg"
                        alt="Baseball Camp"
                        className="w-full h-auto block"
                    />
                </motion.div>

                {/* Coach Sarah Card - Bottom Right */}
                <motion.div
                    className="absolute -right-8 lg:-right-16 xl:-right-24 bottom-[-25%] w-64 lg:w-72 bg-white rounded-[2rem] shadow-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto hidden md:block z-10"
                    initial={{ opacity: 0, y: 50, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <img
                        src="/jr defense.avif"
                        alt="Jr Defense"
                        className="w-full h-auto block"
                    />
                </motion.div>
            </motion.div>

            <div className="relative w-full h-[100px] mt-12 hidden lg:block pointer-events-none">
                {/* Decorative Cards Container (Moved) */}
            </div>

            {/* Mobile version of cards */}
            <div className="mt-12 space-y-6 lg:hidden">
                <motion.div
                    className="mx-auto w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-lg relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="/kids in STEM.jpg"
                        alt="Kids in STEM"
                        className="w-full h-auto block"
                    />
                </motion.div>


                <motion.div
                    className="mx-auto w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-lg relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="/jr defense.avif"
                        alt="Jr Defense"
                        className="w-full h-auto block"
                    />
                </motion.div>
            </div>
        </div>
    );
}
