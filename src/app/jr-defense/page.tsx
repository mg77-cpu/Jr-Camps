"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight, Shield, ArrowLeft, MessageSquare, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
} as const;

const staggerContainer = {
    whileInView: {
        transition: {
            staggerChildren: 0.15
        }
    }
} as const;

const modules = [
    {
        name: "Verbal Judo & Confidence",
        description: "Empowering kids to use their words effectively to navigate social challenges and de-escalate potential conflicts.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        skills: ["Voice Control", "De-escalation", "Body Language"]
    },
    {
        name: "Situational Awareness",
        description: "Teaching children how to be mindful of their environment and recognize safe vs. unsafe situations without fear.",
        image: "https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?w=600&h=400&fit=crop",
        skills: ["Safety Habits", "Environmental Cues", "Exit Planning"]
    },
    {
        name: "Non-violent Self Defense",
        description: "Practical, age-appropriate physical skills focused on escaping and staying safe, never on aggression.",
        image: "/taekwan.jpg",
        skills: ["Escape Techniques", "Safety Distance", "Defensive Posture"]
    }
];

const benefits = [
    {
        icon: Shield,
        title: "Self-Confidence",
        description: "Empower children with the mental and physical tools to handle difficult situations with grace."
    },
    {
        icon: Eye,
        title: "Safety Mindset",
        description: "Foster a lifelong commitment to personal safety and proactive situational awareness."
    },
    {
        icon: MessageSquare,
        title: "Conflict Resolution",
        description: "Master positive communication skills that build bridges instead of walls in social settings."
    },
    {
        icon: Heart,
        title: "Emotional Intelligence",
        description: "Build resilience and empathy through scenarios that challenge and grow their character."
    }
];

export default function JrDefensePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark overflow-x-hidden selection:bg-brand-teal selection:text-white">
            <Navbar />
            <main className="relative pt-24 overflow-hidden">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-teal/10 dark:from-brand-teal/10 dark:to-brand-teal/5" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-8"
                        >
                            <Link
                                href="/#parents"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-teal transition-colors duration-200"
                            >
                                <ArrowLeft size={16} strokeWidth={1.5} />
                                Back to Programs
                            </Link>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="h-14 w-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal">
                                        <ShieldCheck size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-sm font-semibold text-brand-teal uppercase tracking-wider">Jr Defense</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                    Confidence. Safety.{" "}
                                    <span className="text-brand-teal">Awareness.</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                                    A unique safety curriculum teaching verbal de-escalation, situational awareness, and anti-bullying techniques to build true confidence.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-full px-8 bg-brand-teal hover:bg-teal-700 hover:-translate-y-0.5 shadow-lg transition-all duration-200"
                                    >
                                        <Link href="/#pricing">Register Now</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="rounded-full px-8 border-2 hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/jr defense.avif"
                                        alt="Jr Defense Program"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                {/* Floating stat badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal">
                                            <ShieldCheck size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
                                            <p className="text-sm text-gray-500">Confidence Built</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Programs Grid */}
                <section className="py-20 lg:py-28 bg-gray-50 dark:bg-slate-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16"
                            {...fadeIn}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                Program Modules
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Our curriculum is designed to be engaging, age-appropriate, and focused on safety first.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {modules.map((module, index) => (
                                <motion.div key={module.name} variants={fadeIn}>
                                    <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-slate-800 h-full flex flex-col">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={module.image}
                                                alt={module.name}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="inline-block bg-brand-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                    0{index + 1}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {module.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                                                {module.description}
                                            </p>
                                            <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800 mt-auto">
                                                {module.skills.map((skill) => (
                                                    <div key={skill} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mr-2" />
                                                        {skill}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 lg:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16"
                            {...fadeIn}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                Why Choose Jr Defense?
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                We focus on building character and confidence, ensuring children feel safe and empowered in their daily lives.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {benefits.map((benefit) => (
                                <motion.div
                                    key={benefit.title}
                                    variants={fadeIn}
                                    className="group text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-brand-teal/20 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-14 w-14 mx-auto bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <benefit.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-teal to-teal-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div {...fadeIn}>
                            <div className="h-16 w-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                                <ShieldCheck size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                                Give Your Child the Gift of Confidence
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                                Join families who trust Jr Defense to provide quality safety education that builds lasting skills and self-assurance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-full px-8 bg-white text-brand-teal hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg transition-all duration-200"
                                >
                                    <Link href="/#pricing">
                                        View Pricing
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-8 border-2 border-white text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 bg-transparent"
                                >
                                    <Link href="/contact">Schedule a Visit</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
