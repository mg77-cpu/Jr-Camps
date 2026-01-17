"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, DollarSign, Trophy, FlaskConical, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentModal } from "./PaymentModal";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

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
        color: "#FF7E67",
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

export function Pricing() {
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
        <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            {/* Background decoration */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <DollarSign size={16} strokeWidth={1.5} />
                        Transparent Pricing
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Invest in Their Future
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
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
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeIn}
                            className={`relative group ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <span className="bg-gradient-to-r from-card-orange to-[#FF9A76] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div
                                className={`h-full bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-soft hover:shadow-card transition-all duration-500 border ${plan.popular
                                    ? "border-card-orange/30 ring-2 ring-card-orange/20"
                                    : "border-gray-100 dark:border-slate-700"
                                    } overflow-hidden`}
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
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {plan.name}
                                    </h3>
                                    <p
                                        className={`text-sm font-semibold ${plan.textClass} uppercase tracking-wider mb-6 italic`}
                                    >
                                        &quot;{plan.tagline}&quot;
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                            ${plan.price}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            /{plan.period}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
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

                                    {/* CTA Button */}
                                    <MovingBorderButton
                                        onClick={() => {
                                            setSelectedPlan({
                                                name: plan.name,
                                                price: plan.price,
                                                period: plan.period,
                                            });
                                            setIsModalOpen(true);
                                        }}
                                        borderRadius="0.75rem"
                                        duration={8000}
                                        containerClassName="w-full h-14"
                                        borderClassName="opacity-40"
                                        style={{
                                            "--moving-border-color": plan.color,
                                        } as React.CSSProperties}
                                        className={cn(
                                            "w-full h-full font-semibold text-base transition-all duration-300 border-none",
                                            plan.popular
                                                ? "bg-gradient-to-r from-card-orange to-[#FF9A76] text-white"
                                                : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
                                        )}
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background: `radial-gradient(circle at center, ${plan.color}20 0%, transparent 70%)`
                                            }}
                                        />
                                        <span className="relative z-10">Get Started</span>
                                    </MovingBorderButton>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Note */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-gray-500 text-sm">
                        💳 Secure payments powered by Stripe • 🔄 Flexible cancellation policy • 👨‍👩‍👧‍👦 Sibling discounts available
                    </p>
                </motion.div>
            </div>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={selectedPlan}
            />
        </section>
    );
}
