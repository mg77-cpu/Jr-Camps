"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FinalCTA() {
    return (
        <section className="relative py-24 bg-primary text-white overflow-hidden">
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-accent-yellow/10 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            ></motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-8">Ready to Activate Potential?</h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        Join the hundreds of families and institutions turning idle time into active learning.
                    </p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Button size="lg" className="rounded-full px-10 h-14 bg-accent-orange hover:bg-orange-600 text-white border-none shadow-xl font-bold text-lg group w-full sm:w-auto">
                            Find a Program Near Me <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-10 h-14 border-2 border-white/30 text-white hover:bg-white hover:text-primary font-bold text-lg w-full sm:w-auto">
                            Bring Jr Camps to My Site
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
