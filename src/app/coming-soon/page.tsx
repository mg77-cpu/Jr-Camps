"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Sparkles, ArrowLeft, Construction, CreditCard } from "lucide-react";
import { useState } from "react";

export default function ComingSoon() {
    const [isLoading, setIsLoading] = useState(false);

    const handleTestPayment = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: 'test_session_id',
                    amount: 49.99,
                    programName: 'Test Enrichment Program',
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Payment failed to initialize. Make sure environment variables are set.');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('An error occurred. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark flex flex-col selection:bg-primary selection:text-white">
            <Navbar />
            
            <main className="flex-grow relative overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse z-0" />
                <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse z-0" />
                
                {/* Hero Section */}
                <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-24 px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                    <div className="mb-8 flex justify-center">
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary font-semibold flex items-center gap-2 animate-bounce">
                            <Sparkles size={14} />
                            Something Exciting is Brewing!
                        </Badge>
                    </div>
                    
                    <div className="relative inline-block mb-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-tight font-momo">
                            Coming <span className="text-primary">Soon</span>
                        </h1>
                        <div className="absolute -top-6 -right-8 text-primary animate-spin-slow">
                            <Construction size={48} className="opacity-20" />
                        </div>
                    </div>
                    
                    <p className="text-lg md:text-xl text-gray-600/80 dark:text-gray-400/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                        We're currently building out this feature to ensure it meets our high standards for 
                        <span className="text-gray-900 dark:text-white font-semibold"> After-School Enrichment</span>. 
                        It won't be long now!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button size="lg" className="rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                <ArrowLeft className="mr-2" size={20} />
                                Back to Home
                            </Button>
                        </Link>
                        <Button 
                            size="lg" 
                            variant="secondary" 
                            className="rounded-full px-8 h-14 text-lg font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2"
                            onClick={handleTestPayment}
                            disabled={isLoading}
                        >
                            <CreditCard size={20} />
                            {isLoading ? 'Processing...' : 'Test Payment ($49.99)'}
                        </Button>
                    </div>
                </section>

                {/* Feature Grid Section */}
                <section className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-20 lg:py-32 px-6 lg:px-8 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What's in the Works</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                                Our team is hard at work bringing you the best enrichment experience possible.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Rocket, title: "Turnkey Setup", desc: "We're perfecting the staff onboarding and gear delivery systems." },
                                { icon: Sparkles, title: "Active Learning", desc: "Our curriculum designers are putting the final touches on new modules." },
                                { icon: Construction, title: "Digital Platform", desc: "We're streamlining the registration and parent communication portal." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
