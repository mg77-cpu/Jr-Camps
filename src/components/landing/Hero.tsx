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
                    className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
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
            </motion.div>

            <div className="relative w-full h-[600px] md:h-[500px] mt-12 hidden lg:block pointer-events-none">
                {/* Left Card */}
                <motion.div
                    className="absolute left-0 bottom-[-10%] xl:left-[-5%] w-80 bg-accent-salmon rounded-[2rem] shadow-2xl p-6 text-white transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 pointer-events-auto"
                    initial={{ opacity: 0, x: -50, rotate: -10 }}
                    animate={{ opacity: 1, x: 0, rotate: -2 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white/30">
                            <img alt="Jr Sports" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=100" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg leading-tight">Jr Sports</h3>
                            <span className="inline-block bg-[#3F1610] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 tracking-wide uppercase">Active</span>
                        </div>
                    </div>
                    <div className="relative h-48 w-full mt-4">
                        <div className="absolute top-1/4 right-0 bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-white">Agility</div>
                        <div className="absolute top-1/2 left-1/3 bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-white">Teamwork</div>
                        <div className="absolute bottom-1/4 left-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">Today</div>
                        <svg className="absolute inset-0 w-full h-full" overflow="visible">
                            <path d="M10 150 C 60 150, 100 100, 150 100 S 250 50, 300 30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"></path>
                            <circle cx="20" cy="150" fill="white" r="4"></circle>
                            <line stroke="white" strokeWidth="2" x1="20" x2="20" y1="150" y2="180"></line>
                        </svg>
                        <div className="absolute bottom-0 left-0">
                            <div className="text-4xl font-bold tracking-tight">Soccer Clinic</div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Yellow Card */}
                <motion.div
                    className="absolute right-0 top-[-20%] xl:right-[-5%] w-72 bg-card-yellow rounded-[2rem] shadow-xl p-6 text-white transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 pointer-events-auto"
                    initial={{ opacity: 0, x: 50, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 3 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <h3 className="text-2xl font-bold leading-tight mb-2">How to build a robot in 30 days</h3>
                    <div className="flex items-center text-sm font-medium text-white/90 mb-6">
                        <span>15 min • Video Guide</span>
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-white/30 backdrop-blur-md hover:bg-white/40 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                            Next Step
                        </button>
                        <button className="bg-white/30 backdrop-blur-md hover:bg-white/40 h-9 w-9 flex items-center justify-center rounded-full text-white transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>

                {/* Pink Coaching Card */}
                <motion.div
                    className="absolute right-[10%] bottom-[-15%] xl:right-[15%] w-80 bg-card-pink rounded-[2rem] shadow-2xl p-6 text-gray-800 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 pointer-events-auto"
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/50 bg-gray-200">
                            <img alt="Coach" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white">Coach Sarah</h3>
                            <p className="text-xs text-white/80">STEM Instructor</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm relative text-gray-800">
                            <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent transform rotate-180"></div>
                            <p className="text-sm font-medium leading-snug">
                                Hi Sarah, what materials do we need for the volcano?
                            </p>
                        </div>
                        <div className="bg-white/40 rounded-2xl rounded-tl-none p-3 shadow-sm w-3/4">
                            <p className="text-sm font-medium text-white leading-snug">
                                Sure! Just baking soda and...
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mobile version of cards */}
            <div className="mt-12 space-y-6 lg:hidden">
                <motion.div
                    className="mx-auto w-full max-w-sm bg-accent-salmon rounded-3xl p-6 text-white relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white/30">
                                <img alt="Profile" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=100" />
                            </div>
                            <div>
                                <h3 className="font-bold">Jr Sports</h3>
                                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-32 relative">
                        <div className="absolute bottom-0 text-3xl font-bold">Soccer Clinic</div>
                        <svg className="absolute top-4 left-0 w-full h-20" overflow="visible">
                            <path d="M0 60 Q 50 60, 100 30 T 300 0" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"></path>
                        </svg>
                    </div>
                </motion.div>

                <motion.div
                    className="mx-auto w-full max-w-sm bg-card-pink rounded-3xl p-6 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            <img alt="Coach" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Coach Sarah</h3>
                            <p className="text-xs text-white/80">STEM Instructor</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm mb-2 text-gray-800">
                        <p className="text-sm">Hi Sarah, what materials do we need for the volcano?</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
