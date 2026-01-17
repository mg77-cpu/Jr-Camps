"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Magnet } from "@/components/ui/magnet";

export function Hero() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const springPop = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1
        }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const h1Text = "Building Specialized Skills";
    const h1Line2 = "When The School";
    const h1Line3 = "Day Ends";

    return (
        <section id="hero">
            <BackgroundLines
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 sm:pt-20 h-auto"
                svgOptions={{ duration: 25 }}
            >
            <motion.div
                className="text-center max-w-4xl mx-auto mb-16 relative"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <motion.h1
                    className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#353538] dark:text-white mb-6 leading-tight font-momo text-center max-w-3xl mx-auto"
                >
                    {h1Text.split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            className={`inline-block mr-[0.25em] ${word === "Specialized" ? "text-primary" : ""}`}
                            variants={springPop}
                        >
                            {word}
                        </motion.span>
                    ))}
                    <br />
                    <span className="block px-4 sm:px-8 md:px-12">
                        {h1Line2.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.25em]"
                                variants={springPop}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                    <span className="block">
                        {h1Line3.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.25em]"
                                variants={springPop}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-semibold text-center"
                    variants={fadeIn}
                >
                    High-quality After-School Sports, STEM, and Self-Defense programs. <br />
                    <span className="block px-6 sm:px-12">Turning idle time into active discovery.</span>
                </motion.p>
                <motion.div className="mt-8" variants={fadeIn}>
                    <Magnet padding={50} magnetStrength={3}>
                        <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg transition-all duration-200 cursor-pointer">
                            <Link href="#pricing">Get started</Link>
                        </Button>
                    </Magnet>
                </motion.div>

                {/* Floating Cards - Rearranged per mockup */}

                {/* Robot Card - Top Right */}
                <motion.div
                    className="absolute -right-20 lg:-right-36 xl:-right-56 top-8 w-64 lg:w-72 bg-white rounded-lg shadow-xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto hidden md:block z-20"
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
                    className="absolute -left-12 lg:-left-24 xl:-left-36 top-[40%] w-48 lg:w-56 bg-white rounded-lg shadow-2xl overflow-hidden -rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-auto hidden md:block z-10"
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

                {/* Coach Sarah Card (Defense Image) - Bottom Right */}
                <motion.div
                    className="absolute -right-2 lg:-right-8 xl:-right-12 bottom-[-35%] w-64 lg:w-72 bg-white rounded-lg shadow-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto hidden md:block z-10"
                    initial={{ opacity: 0, y: 50, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <img
                        src="/fight.jpg"
                        alt="Self Defense"
                        className="w-full h-auto block"
                    />
                </motion.div>
            </motion.div>

            <div className="relative w-full h-100px mt-12 hidden lg:block pointer-events-none">
                {/* Decorative Cards Container (Moved) */}
            </div>

            {/* Mobile version of cards */}
            <div className="mt-12 space-y-6 md:hidden">
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
                        src="/baseball campy.jpg"
                        alt="Baseball Camp"
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
                        src="/fight.jpg"
                        alt="Self Defense"
                        className="w-full h-auto block"
                    />
                </motion.div>
            </div>
        </BackgroundLines>
        </section>
    );
}
