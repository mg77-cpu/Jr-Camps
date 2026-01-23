"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Banknote, Trophy, FlaskConical, ShieldCheck } from "lucide-react";
import { PaymentModal } from "@/components/landing/PaymentModal";

const plans = [
    {
        name: "Starter",
        tagline: "Perfect for busy families.",
        price: 289,
        period: "month",
        icon: Trophy,
        color: "#4361EE",
        bgClass: "bg-primary/10",
        textClass: "text-primary",
        features: [
            "2 days per week",
            "Access to all program types",
            "Professional coaching staff",
            "All equipment provided",
            "Flexible scheduling",
        ],
        popular: false,
    },
    {
        name: "All Access",
        tagline: "Maximum growth & engagement.",
        price: 489,
        period: "month",
        icon: FlaskConical,
        color: "#FFA08E",
        bgClass: "bg-card-orange/10",
        textClass: "text-card-orange",
        features: [
            "5 days per week",
            "Full access to all programs",
            "Priority enrollment",
            "Progress reports included",
            "Best value for active kids",
        ],
        popular: true,
    },
    {
        name: "Team",
        tagline: "Practice & play competitively.",
        price: 780,
        period: "season",
        icon: ShieldCheck,
        color: "#14B8A6",
        bgClass: "bg-brand-teal/10",
        textClass: "text-brand-teal",
        features: [
            "Team practice sessions",
            "Competitive league games",
            "Team jersey included",
            "End-of-season tournament",
            "Team photo & trophy",
        ],
        popular: false,
    },
];

export function PortalPricing() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    const staggerContainer = {
        whileInView: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({ name: "", price: 0, period: "" });

    return (
        <div className="relative">
            {/* Background decoration */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Banknote size={16} strokeWidth={1.5} />
                        Honest, Upfront Pricing
                    </motion.div>
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Each program runs for 8 weeks with 1-hour sessions, twice per week. All equipment and materials included.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeIn}
                            className={`relative group ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <span className="bg-gradient-to-r from-orange-400 to-orange-300 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div
                                className={`h-full bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-lg transition-all duration-500 border ${plan.popular
                                    ? "border-orange-200 ring-2 ring-orange-100"
                                    : "border-slate-100"
                                    } overflow-hidden flex flex-col`}
                            >
                                {/* Background accent */}
                                <div
                                    className="absolute top-0 right-0 w-40 h-40 rounded-bl-[6rem] -mr-12 -mt-12 transition-all duration-500 group-hover:scale-110 opacity-50"
                                    style={{ backgroundColor: `${plan.color}15` }}
                                />

                                {/* Icon */}
                                <div
                                    className={`h-14 w-14 ${plan.bgClass} rounded-2xl flex items-center justify-center ${plan.textClass} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10`}
                                >
                                    <plan.icon size={28} strokeWidth={1.5} />
                                </div>

                                {/* Plan Info */}
                                <div className="relative z-10 mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                        {plan.name}
                                    </h3>
                                    <p
                                        className={`text-sm font-semibold ${plan.textClass} uppercase tracking-wider mb-6 italic`}
                                    >
                                        &quot;{plan.tagline}&quot;
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-bold text-slate-900">
                                            ${plan.price}
                                        </span>
                                        <span className="text-slate-500 text-sm">
                                            /{plan.period}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-slate-600"
                                            >
                                                <div
                                                    className={`h-5 w-5 rounded-full ${plan.bgClass} flex items-center justify-center flex-shrink-0 mt-0.5`}
                                                >
                                                    <Check
                                                        size={12}
                                                        strokeWidth={2.5}
                                                        className={plan.textClass}
                                                    />
                                                </div>
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Button */}
                                <div className="mt-auto pt-8 relative z-10">
                                    <button
                                        onClick={() => {
                                            setSelectedPlan({ name: plan.name, price: plan.price, period: plan.period });
                                            setIsModalOpen(true);
                                        }}
                                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md ${
                                            plan.popular
                                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                                : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
                                        }`}
                                    >
                                        Choose {plan.name}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={selectedPlan}
            />
        </div>
    );
}
