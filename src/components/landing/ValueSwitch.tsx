"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ValueSwitch() {
    const [audience, setAudience] = useState<"parents" | "partners">("parents");

    return (
        <section id="value-switch" className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col items-center mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                        Designed for <span className="text-primary">Parents</span> & <span className="text-primary">Partners</span>
                    </h2>
                    <div className="inline-flex p-1 bg-gray-100 dark:bg-slate-800 rounded-full shadow-inner relative z-10">
                        <button
                            onClick={() => setAudience("parents")}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 relative z-10 ${audience === "parents" ? "text-primary" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                        >
                            {audience === "parents" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-md"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">For Parents</span>
                        </button>
                        <button
                            onClick={() => setAudience("partners")}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 relative z-10 ${audience === "partners" ? "text-primary" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                        >
                            {audience === "partners" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-md"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">For Schools & Cities</span>
                        </button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative min-h-[450px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={audience}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-8"
                            >
                                {audience === "parents" ? (
                                    <>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Empower Your Child's After-School Time</h3>
                                            <p className="text-gray-500 dark:text-gray-400">High-quality enrichment that feels like play, but builds real-world skills.</p>
                                        </div>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Ultimate Convenience", desc: "We operate directly at your child's school or community center. No extra driving required." },
                                                { title: "Uncompromising Safety", desc: "All coaches are background-checked and CPR certified. Safety is our #1 priority." },
                                                { title: "Professional Curriculum", desc: "Not just supervision—kids master agility in sports, logic in STEM, and confidence in defense." }
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 + 0.2 }}
                                                    className="flex items-start gap-4"
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                        <CheckCircle2 size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button variant="outline" asChild className="rounded-full px-8 h-12 font-bold border-2">
                                                <Link href="/for-parents">
                                                    Learn More about Parent Benefits
                                                </Link>
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">A True Turnkey Partner for Your Site</h3>
                                            <p className="text-gray-500 dark:text-gray-400">Add premium enrichment without adding a single hour to your staff's workload.</p>
                                        </div>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Zero Administrative Burden", desc: "We handle registration, payments, insurance, and liability waivers on our secure platform." },
                                                { title: "Revenue Share Models", desc: "Our programs generate income for your school or city recreation department." },
                                                { title: "LURA Compliance (HOAs)", desc: "Fulfill social service requirements for affordable housing while adding significant tenant value." }
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 + 0.2 }}
                                                    className="flex items-start gap-4"
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                        <CheckCircle2 size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button className="rounded-full px-8 h-12 bg-primary hover:bg-blue-700 transition-all font-bold group">
                                                Become a Partner <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                            <Button variant="outline" asChild className="rounded-full px-8 h-12 font-bold border-2">
                                                <Link href="/for-partners">
                                                    View Partnership Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <motion.div
                        className="order-1 lg:order-2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={audience}
                                src={audience === "parents"
                                    ? "/kids-playing-chess (2).jpg"
                                    : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200"
                                }
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6 }}
                                alt="Jr Camps Preview"
                                className="object-cover w-full h-full"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent z-10">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={audience}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-white font-medium italic"
                                >
                                    {audience === "parents"
                                        ? "\"The easiest way to keep my kids active and learning.\""
                                        : "\"The most reliable enrichment partner we've ever had.\""
                                    }
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
