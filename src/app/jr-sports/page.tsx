"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, ChevronRight, Users, Clock, Shield, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CardSpotlight } from "@/components/ui/card-spotlight";

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

const sports = [
    {
        name: "Soccer & Basketball",
        description: "Develop coordination, footwork, and team strategy through America's favorite team sports.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
        skills: ["Dribbling & Passing", "Team Coordination", "Game Strategy"]
    },
    {
        name: "Flag Football",
        description: "Learn the fundamentals of football in a safe, non-contact environment.",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop",
        skills: ["Route Running", "Defensive Skills", "Playbook Basics"]
    },
    {
        name: "Multi-Sport Clinics",
        description: "Explore a variety of sports to discover new passions and build diverse athletic skills.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
        skills: ["Athletic Variety", "Skill Discovery", "Seasonal Sports"]
    }
];

const benefits = [
    {
        icon: Zap,
        title: "Physical Fitness",
        description: "Build strength, endurance, and coordination through structured athletic activities."
    },
    {
        icon: Users,
        title: "Teamwork & Social Skills",
        description: "Learn to collaborate, communicate, and build lasting friendships with peers."
    },
    {
        icon: Clock,
        title: "Screen-Free Active Time",
        description: "Replace idle screen time with engaging physical activities that energize and inspire."
    },
    {
        icon: Shield,
        title: "Professional Coaching",
        description: "Expert coaches focus on technique, sportsmanship, and age-appropriate skill development."
    }
];

export default function JrSportsPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark overflow-x-hidden selection:bg-primary selection:text-white">
            <Navbar />
            <main className="relative pt-24 overflow-hidden">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:to-primary/5" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-8"
                        >
                            <Link
                                href="/#parents"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors duration-200"
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
                                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                        <Trophy size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Jr Sports</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                    Agility. Teamwork.{" "}
                                    <span className="text-primary">Sportsmanship.</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                                    Focused clinics designed to get kids moving and off screens. Build agility, coordination, and teamwork through athletics.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-full px-8 bg-primary hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg transition-all duration-200"
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
                                        src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=600&fit=crop"
                                        alt="Kids playing sports"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                {/* Floating stat badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <Users size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">500+</p>
                                            <p className="text-sm text-gray-500">Active Athletes</p>
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
                                Our Sports Programs
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Age-appropriate athletic clinics designed to build skills, confidence, and a love for sports.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {sports.map((sport, index) => (
                                <motion.div key={sport.name} variants={fadeIn}>
                                    <CardSpotlight
                                        className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 h-full"
                                        color="#4361EE"
                                        spotlightColor={[[67, 97, 238], [67, 97, 238]]}
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={sport.image}
                                                alt={sport.name}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                    0{index + 1}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 relative z-20">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {sport.name}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                                                {sport.description}
                                            </p>
                                            <div className="space-y-2">
                                                {sport.skills.map((skill) => (
                                                    <div key={skill} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                                                        {skill}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardSpotlight>
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
                                Why Choose Jr Sports?
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                More than just games — we build character, confidence, and healthy habits.
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
                                    className="group text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-14 w-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
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
                <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-blue-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div {...fadeIn}>
                            <div className="h-16 w-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                                <Trophy size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                                Ready to Get Your Child Moving?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                                Join hundreds of families who trust Jr Camps to provide quality athletic programs that build skills and character.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-full px-8 bg-white text-primary hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg transition-all duration-200"
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
