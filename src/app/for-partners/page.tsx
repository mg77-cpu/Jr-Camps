"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, IdCard, Package, Laptop, BarChart3, Building2, Users, ArrowRight, CheckCircle2, FileText, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
} as const;

const processSteps = [
    {
        icon: IdCard,
        title: "We Bring the Staff",
        description: "Live Scan verified, CPR/First Aid certified coaches who love teaching and are background-checked through DOJ/FBI.",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
        icon: Package,
        title: "We Bring the Gear",
        description: "From soccer balls to robotics kits, we handle 100% of the equipment. Your site stays clean and organized.",
        color: "text-orange-500",
        bg: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
        icon: Laptop,
        title: "We Handle Admin",
        description: "Registration, payments, insurance, and liability waivers are all managed on our secure digital platform.",
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-900/20"
    }
];

const features = [
    {
        icon: BarChart3,
        title: "Revenue Share Models",
        description: "Our programs generate consistent passive income for your school or city recreation department."
    },
    {
        icon: Building2,
        title: "LURA Compliance",
        description: "Fulfill social service requirements for affordable housing/HOAs while adding massive tenant value."
    },
    {
        icon: ShieldCheck,
        title: "Fully Insured",
        description: "Comprehensive liability coverage that protects your site. We assume the risk, you get the credit."
    },
    {
        icon: Handshake,
        title: "Zero Staff Workload",
        description: "We require zero administrative support from your team. We are a true 'plug-and-play' partner."
    }
];

export default function ForPartnersPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen selection:bg-primary selection:text-white">
            <Navbar />
            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-transparent to-primary/5 dark:from-slate-800 dark:via-transparent dark:to-primary/10" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
                                    <Building2 size={16} />
                                    <span>For Schools, Cities & HOAs</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                                    A True <span className="text-primary">Turnkey Partner</span> <br />
                                    for Your Site
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                                    Add premium enrichment without adding a single hour to your staff's workload. We manage everything from hiring to liability.
                                </p>
                                <div className="flex flex-col sm:row gap-4">
                                    <Button size="lg" asChild className="rounded-full px-8 h-14 bg-primary hover:bg-blue-700 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                                        <Link href="/coming-soon">
                                            Become a Partner
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild className="rounded-full px-8 h-14 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                                        <Link href="/coming-soon">
                                            Download Partnership Guide
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700">
                                    <img
                                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200"
                                        alt="Professional classroom environment"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white text-lg font-medium italic">
                                            "The most reliable enrichment partner we've ever had. They truly handle everything."
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* The 3-Step Process */}
                <section className="py-24 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Plug-and-Play Solution</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Our partnership model is built for efficiency. We bring the expertise, you get the credit.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {processSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative flex flex-col items-center text-center"
                                >
                                    {i < 2 && (
                                        <div className="hidden lg:block absolute top-10 left-[70%] w-full h-[2px] bg-gray-100 dark:bg-slate-800 -z-0" />
                                    )}
                                    <div className={`h-20 w-20 ${step.bg} ${step.color} rounded-[2rem] flex items-center justify-center mb-6 relative z-10 shadow-sm border border-white dark:border-slate-800`}>
                                        <step.icon size={36} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Logistics & Benefits Grid */}
                <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Designed for Compliance & Scale</h2>
                                <p className="text-lg text-gray-500 mb-8">
                                    We understand the unique requirements of government-funded sites, private schools, and affordable housing communities.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Live Scan Background Checked (DOJ/FBI)",
                                        "CPR & First Aid Certified Staff",
                                        "Comprehensive General Liability Insurance",
                                        "Digital Attendance & Safety Reporting",
                                        "Fully ADA Compliant Programming"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button asChild className="mt-10 rounded-full px-8 h-12 font-bold group">
                                    <Link href="/coming-soon">
                                        Request Sample Contract <FileText className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-soft">
                                        <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                                            <feature.icon size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-primary rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-5xl font-bold mb-6">Let's build a better community together.</h2>
                            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                                Schedule a 15-minute intro call to see how Jr Camps can add value to your location with zero administrative overhead.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild className="bg-white text-slate-900 hover:bg-gray-100 rounded-full px-10 h-14 text-lg font-bold">
                                    <Link href="/coming-soon">
                                        Schedule Intro Call
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 h-14 text-lg font-bold">
                                    <Link href="/coming-soon">
                                        Contact Partnership Team
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
