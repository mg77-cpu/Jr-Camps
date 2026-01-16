"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, ChevronRight, Cpu, Lightbulb, Rocket, Wrench, ArrowLeft } from "lucide-react";
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

const programs = [
    {
        name: "Robotics & Coding",
        description: "Build and program robots while learning the fundamentals of computational thinking and logic.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
        skills: ["Block-Based Coding", "Robot Assembly", "Problem Solving"]
    },
    {
        name: "Chemistry Labs",
        description: "Explore chemical reactions through safe, hands-on experiments — from slime to volcanoes!",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
        skills: ["Safe Experiments", "Scientific Method", "Chemical Reactions"]
    },
    {
        name: "Engineering Labs",
        description: "Design, build, and test structures while learning fundamental engineering principles.",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
        skills: ["Structural Design", "Material Science", "Creative Building"]
    }
];

const benefits = [
    {
        icon: Lightbulb,
        title: "Critical Thinking",
        description: "Develop problem-solving skills through hands-on challenges and experimentation."
    },
    {
        icon: Cpu,
        title: "Tech Literacy",
        description: "Build foundational tech skills that prepare kids for a digital future."
    },
    {
        icon: Rocket,
        title: "Creativity & Innovation",
        description: "Encourage creative solutions and innovative thinking through open-ended projects."
    },
    {
        icon: Wrench,
        title: "Hands-On Learning",
        description: "Learn by doing with tactile, engaging activities that make concepts stick."
    }
];

export default function JrStemPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark overflow-x-hidden selection:bg-card-orange selection:text-white">
            <Navbar />
            <main className="relative pt-24 overflow-hidden">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-card-orange/5 via-transparent to-card-orange/10 dark:from-card-orange/10 dark:to-card-orange/5" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-8"
                        >
                            <Link
                                href="/#parents"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-card-orange transition-colors duration-200"
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
                                    <div className="h-14 w-14 bg-card-orange/10 rounded-2xl flex items-center justify-center text-card-orange">
                                        <FlaskConical size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-sm font-semibold text-card-orange uppercase tracking-wider">Jr STEM</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                    Innovate. Build.{" "}
                                    <span className="text-card-orange">Discover.</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                                    Hands-on labs where children build robots, conduct chemistry experiments, and learn engineering basics through discovery.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-full px-8 bg-card-orange hover:bg-orange-600 hover:-translate-y-0.5 shadow-lg transition-all duration-200"
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
                                        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
                                        alt="Kids in STEM lab"
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
                                        <div className="h-12 w-12 bg-card-orange/10 rounded-xl flex items-center justify-center text-card-orange">
                                            <Cpu size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">20+</p>
                                            <p className="text-sm text-gray-500">STEM Projects</p>
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
                                Our STEM Programs
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Engaging, hands-on learning experiences that spark curiosity and build future-ready skills.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {programs.map((program, index) => (
                                <motion.div key={program.name} variants={fadeIn}>
                                    <CardSpotlight
                                        className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 h-full"
                                        color="#FF7E67"
                                        spotlightColor={[[255, 126, 103], [255, 126, 103]]}
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={program.image}
                                                alt={program.name}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="inline-block bg-card-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                    0{index + 1}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 relative z-20">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {program.name}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                                                {program.description}
                                            </p>
                                            <div className="space-y-2">
                                                {program.skills.map((skill) => (
                                                    <div key={skill} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-card-orange mr-2" />
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
                                Why Choose Jr STEM?
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                We turn curiosity into knowledge through engaging, hands-on experiments and projects.
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
                                    className="group text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-card-orange/20 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-14 w-14 mx-auto bg-card-orange/10 rounded-2xl flex items-center justify-center text-card-orange mb-4 group-hover:scale-110 transition-transform duration-300">
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
                <section className="py-20 lg:py-28 bg-gradient-to-br from-card-orange to-orange-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div {...fadeIn}>
                            <div className="h-16 w-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                                <FlaskConical size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                                Ready to Spark Your Child's Curiosity?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                                Join our STEM programs where learning is an adventure and every experiment is a discovery.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-full px-8 bg-white text-card-orange hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg transition-all duration-200"
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
