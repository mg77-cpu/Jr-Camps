"use client";

import { ChevronRight, Trophy, FlaskConical, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function ThreePillars() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        whileInView: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section id="parents" className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Our Core Curriculum</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Specialized skill-building designed to turn idle time into active discovery.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {/* Jr Sports */}
                    <motion.div
                        className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 overflow-hidden"
                        variants={fadeIn}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110"></div>
                        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <Trophy size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Jr Sports</h3>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 italic">"Agility. Teamwork. Sportsmanship."</p>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                            Focused clinics designed to get kids moving and off screens. Agility and teamwork through athletics.
                        </p>
                        <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                                Soccer & Basketball
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                                Flag Football
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                                Multi-Sport Clinics
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-400">01</span>
                            <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                    </motion.div>

                    {/* Jr STEM */}
                    <motion.div
                        className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 overflow-hidden"
                        variants={fadeIn}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-card-orange/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110"></div>
                        <div className="h-16 w-16 bg-card-orange/10 rounded-2xl flex items-center justify-center text-card-orange mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <FlaskConical size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Jr STEM</h3>
                        <p className="text-sm font-semibold text-card-orange uppercase tracking-wider mb-4 italic">"Innovate. Build. Discover."</p>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                            Hands-on labs where children build robots, conduct chemistry, and learn engineering basics.
                        </p>
                        <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-card-orange mr-2"></div>
                                Robotics & Coding
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-card-orange mr-2"></div>
                                Chemistry (Slime/Volcanoes)
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-card-orange mr-2"></div>
                                Engineering Labs
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-400">02</span>
                            <ChevronRight className="text-card-orange opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                    </motion.div>

                    {/* Jr Defense */}
                    <motion.div
                        className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 overflow-hidden"
                        variants={fadeIn}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110"></div>
                        <div className="h-16 w-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <ShieldCheck size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Jr Defense</h3>
                        <p className="text-sm font-semibold text-brand-teal uppercase tracking-wider mb-4 italic">"Confidence. Safety. Awareness."</p>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                            Unique safety curriculum teaching verbal de-escalation and anti-bullying techniques.
                        </p>
                        <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mr-2"></div>
                                Verbal Judo & Confidence
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mr-2"></div>
                                Situational Awareness
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mr-2"></div>
                                Non-violent Self Defense
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-400">03</span>
                            <ChevronRight className="text-brand-teal opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
