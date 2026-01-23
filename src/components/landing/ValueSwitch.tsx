"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ValueSwitch() {
    const [audience, setAudience] = useState<"parents" | "partners">("parents");
    const [isAnimating, setIsAnimating] = useState(false);
    
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    // Initial Entrance Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header elements stagger in
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Tabs float up
            gsap.from(tabsRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "back.out(1.7)"
            });

            // Content and Image stagger
            gsap.from([contentRef.current, imageRef.current], {
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Switch Animation Handler
    const handleSwitch = (newAudience: "parents" | "partners") => {
        if (audience === newAudience || isAnimating) return;
        
        setIsAnimating(true);
        
        const ctx = gsap.context(() => {
            // Animate Out
            const tl = gsap.timeline({
                onComplete: () => {
                    setAudience(newAudience);
                    setIsAnimating(false);
                }
            });

            tl.to([contentRef.current, imageRef.current], {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                stagger: 0.05
            });
        }, containerRef);
    };

    // Animate In when audience changes
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reset position for entrance
            gsap.set([contentRef.current, imageRef.current], { y: 20, opacity: 0 });
            
            gsap.to([contentRef.current, imageRef.current], {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.1,
                clearProps: "all" // Important to clear for hover effects later if added
            });

            // Animate list items specifically for that satisfying ripple
            const listItems = contentRef.current?.querySelectorAll(".feature-item");
            if (listItems) {
                gsap.fromTo(listItems, 
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.1, ease: "power2.out" }
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, [audience]);


    return (
        <section ref={containerRef} id="value-switch" className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                        Designed for <span className="text-primary">Parents</span> & <span className="text-primary">Partners</span>
                    </h2>
                    <div ref={tabsRef} className="inline-flex p-1 bg-gray-100 dark:bg-slate-800 rounded-full shadow-inner relative z-10">
                        <button
                            onClick={() => handleSwitch("parents")}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 ${audience === "parents" ? "text-primary" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                        >
                            {audience === "parents" && (
                                <div
                                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-md animate-in fade-in zoom-in-95 duration-300"
                                    style={{ transformOrigin: "center" }}
                                />
                            )}
                            <span className="relative z-10">For Parents</span>
                        </button>
                        <button
                            onClick={() => handleSwitch("partners")}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 ${audience === "partners" ? "text-primary" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                        >
                            {audience === "partners" && (
                                <div
                                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-md animate-in fade-in zoom-in-95 duration-300"
                                    style={{ transformOrigin: "center" }}
                                />
                            )}
                            <span className="relative z-10">For Schools & Cities</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div ref={contentRef} className="order-2 lg:order-1 relative min-h-[450px]">
                        
                        {audience === "parents" ? (
                            <div className="space-y-8">
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
                                        <div
                                            key={i}
                                            className="feature-item flex items-start gap-4"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button variant="outline" asChild className="rounded-full px-8 h-12 font-bold border-2">
                                        <Link href="/for-parents">
                                            Learn More about Parent Benefits
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
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
                                        <div
                                            key={i}
                                            className="feature-item flex items-start gap-4"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
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
                            </div>
                        )}
                        
                    </div>

                    <div
                        ref={imageRef}
                        className="order-1 lg:order-2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl group"
                    >
                        <img
                            src={audience === "parents"
                                ? "/kids-playing-chess (2).jpg"
                                : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200"
                            }
                            alt="Jr Camps Preview"
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent z-10">
                            <p className="text-white font-medium italic translate-y-0 opacity-100 transition-all duration-500">
                                {audience === "parents"
                                    ? "\"The easiest way to keep my kids active and learning.\""
                                    : "\"The most reliable enrichment partner we've ever had.\""
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
