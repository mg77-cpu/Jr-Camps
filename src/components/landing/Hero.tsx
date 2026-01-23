"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Magnet } from "@/components/ui/magnet";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    const h1Text = "Building Specialized Skills";
    const h1Line2 = "When The School";
    const h1Line3 = "Day Ends";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial Entrance Animation
            const tl = gsap.timeline();

            // Animate words
            tl.from(".hero-word", {
                opacity: 0,
                y: 30,
                scale: 0.8,
                rotation: 10,
                stagger: 0.04,
                duration: 0.8,
                ease: "back.out(1.7)"
            })
            // Animate description
            .from(".hero-desc", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4")
            // Animate button
            .from(".hero-btn-container", {
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: "back.out(1.5)"
            }, "-=0.4");

            // Desktop Floating Cards Entrance
            gsap.from(".desktop-card", {
                opacity: 0,
                x: (i) => (i === 1 ? -100 : 100), // Middle card comes from left, others from right
                y: 50,
                rotation: (i) => (i % 2 === 0 ? 15 : -15),
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                delay: 0.2
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const renderWords = (text: string, highlightWord?: string) => {
        return text.split(" ").map((word, i) => (
            <span
                key={i}
                className={`hero-word inline-block mr-[0.25em] ${word === highlightWord ? "text-primary" : ""}`}
            >
                {word}
            </span>
        ));
    };

    return (
        <section id="hero" ref={containerRef} className="relative overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 h-[420px] w-[520px] sm:h-[520px] sm:w-[720px] lg:h-[640px] lg:w-[980px] rounded-full blur-3xl opacity-70 dark:opacity-50 bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),transparent_70%)]" />
                <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 h-[360px] w-[460px] sm:h-[460px] sm:w-[640px] lg:h-[560px] lg:w-[860px] rounded-full blur-3xl opacity-60 dark:opacity-45 bg-[radial-gradient(closest-side,rgba(168,85,247,0.28),transparent_72%)]" />
            </div>
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 sm:pt-20 min-h-screen"
            >
                <div className="text-center max-w-4xl mx-auto mb-16 relative">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#353538] dark:text-white mb-6 leading-tight font-momo text-center max-w-3xl mx-auto">
                        {renderWords(h1Text, "Specialized")}
                        <br />
                        <span className="block px-4 sm:px-8 md:px-12">
                            {renderWords(h1Line2)}
                        </span>
                        <span className="block">
                            {renderWords(h1Line3)}
                        </span>
                    </h1>
                    <p className="hero-desc mt-4 sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-semibold text-center tracking-tight">
                        High-quality After-School Sports, STEM, and Self-Defense programs, turning idle time into active discovery.
                    </p>
                    <div className="hero-btn-container mt-8">
                        <Magnet padding={50} magnetStrength={3}>
                            <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-blue-500 hover:-translate-y-0.5 shadow-lg transition-all duration-200 cursor-pointer">
                                <Link href="#pricing">Get started</Link>
                            </Button>
                        </Magnet>
                    </div>

                    {/* Floating Cards - Rearranged per mockup */}

                    {/* Robot Card - Top Right */}
                    <div className="desktop-card card-1 absolute -right-20 lg:-right-36 xl:-right-56 top-8 w-64 lg:w-72 bg-white rounded-lg shadow-xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto hidden md:block z-20">
                        <img
                            src="/kids in STEM.jpg"
                            alt="Kids in STEM"
                            className="w-full h-auto block"
                        />
                    </div>

                    {/* Baseball Card - Mid Left */}
                    <div className="desktop-card card-2 absolute -left-16 lg:-left-28 xl:-left-40 top-[15%] w-48 lg:w-56 bg-white rounded-lg shadow-2xl overflow-hidden -rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-auto hidden md:block z-10">
                        <img
                            src="/baseball campy.jpg"
                            alt="Baseball Camp"
                            className="w-full h-auto block"
                        />
                    </div>

                </div>

                <div className="relative w-full h-100px mt-12 hidden lg:block pointer-events-none">
                    {/* Decorative Cards Container (Moved) */}
                </div>

                {/* Mobile version of cards */}
                <div className="mt-12 space-y-6 md:hidden">
                    <div className="mobile-card mx-auto w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-lg relative">
                        <img
                            src="/kids in STEM.jpg"
                            alt="Kids in STEM"
                            className="w-full h-auto block"
                        />
                    </div>

                    <div className="mobile-card mx-auto w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-lg relative">
                        <img
                            src="/baseball campy.jpg"
                            alt="Baseball Camp"
                            className="w-full h-auto block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
