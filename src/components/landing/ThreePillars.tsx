"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Trophy, FlaskConical, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ThreePillars() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Use gsap.context for proper cleanup in React
        const ctx = gsap.context(() => {
            const headerElements = section.querySelectorAll(".features-header > *");
            const wrappers = section.querySelectorAll(".feature-wrapper");
            const cards = section.querySelectorAll(".feature-card");

            // Initial states to avoid FOUC
            gsap.set(headerElements, { opacity: 0, y: 50 });
            gsap.set(wrappers, { opacity: 0, y: 100, scale: 0.95 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%", // Animation starts when top of section hits 60% of viewport height
                    toggleActions: "play reverse play reverse", // Re-triggers animation on re-entry
                    scrub: false,
                }
            });

            // Phase 1: The Entrance (The "Anti-Gravity Arrival")
            // Header elements drift upwards
            tl.to(headerElements, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out", // Strong ease-out
                stagger: 0.1
            })
            // The Cards (Staggered Float) - Animate the Wrapper
            .to(wrappers, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: "power2.out", // Extremely slow at the end
            }, "-=1.0"); // Overlap: Start shortly after header starts

            // Phase 2: The Perpetual Float (The "Expensive" touch)
            // Continuous, subtle floating motion - Animate the Inner Card
            // This runs independently so it doesn't conflict with entrance/exit
            gsap.to(cards, {
                y: -10, // Drift up slightly
                duration: 5, // Long duration for weightlessness
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                stagger: {
                    each: 0.5,
                    from: "random" // Randomized start
                }
            });

        }, sectionRef);

        return () => ctx.revert(); // Cleanup/kill ScrollTriggers
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="parents" 
            className="features-section py-24 bg-background-light dark:bg-background-dark relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="features-header text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Our Core Curriculum</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-6">
                        Specialized skill-building designed to turn idle time into active discovery.
                    </p>
                    <Link 
                        href="/for-parents" 
                        className="inline-flex items-center text-primary font-bold hover:underline gap-1 group"
                    >
                        Learn more about our Parent Benefits 
                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Jr Sports */}
                    <div className="feature-wrapper">
                        <Link href="/jr-sports" className="block feature-card">
                            <div
                                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 overflow-hidden cursor-pointer relative hover:-translate-y-1"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110"></div>
                                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-20">
                                    <Trophy size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-20">Jr Sports</h3>
                                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 italic relative z-20">"Agility. Teamwork. Sportsmanship."</p>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed relative z-20">
                                    Focused clinics designed to get kids moving and off screens. Agility and teamwork through athletics.
                                </p>
                                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-20">
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
                                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center relative z-20">
                                    <span className="text-sm font-bold text-gray-400">01</span>
                                    <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Jr STEM */}
                    <div className="feature-wrapper">
                        <Link href="/jr-stem" className="block feature-card">
                            <div
                                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 overflow-hidden cursor-pointer relative hover:-translate-y-1"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-card-orange/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110"></div>
                                <div className="h-16 w-16 bg-card-orange/10 rounded-2xl flex items-center justify-center text-card-orange mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-20">
                                    <FlaskConical size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-20">Jr STEM</h3>
                                <p className="text-sm font-semibold text-card-orange uppercase tracking-wider mb-4 italic relative z-20">"Innovate. Build. Discover."</p>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed relative z-20">
                                    Hands-on labs where children build robots, conduct chemistry, and learn engineering basics.
                                </p>
                                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-20">
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
                                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center relative z-20">
                                    <span className="text-sm font-bold text-gray-400">02</span>
                                    <ChevronRight className="text-card-orange opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Jr Defense */}
                    <div className="feature-wrapper">
                        <Link href="/jr-defense" className="block feature-card">
                            <div
                                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-soft hover:shadow-card transition-all duration-500 border border-gray-100 dark:border-slate-800 overflow-hidden cursor-pointer relative hover:-translate-y-1"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110"></div>
                                <div className="h-16 w-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-20">
                                    <ShieldCheck size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-20">Jr Defense</h3>
                                <p className="text-sm font-semibold text-brand-teal uppercase tracking-wider mb-4 italic relative z-20">"Confidence. Safety. Awareness."</p>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed relative z-20">
                                    Unique safety curriculum teaching verbal de-escalation and anti-bullying techniques.
                                </p>
                                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-20">
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
                                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center relative z-20">
                                    <span className="text-sm font-bold text-gray-400">03</span>
                                    <ChevronRight className="text-brand-teal opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
