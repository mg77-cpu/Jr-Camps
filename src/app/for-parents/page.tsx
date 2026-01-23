"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Heart, Zap, MapPin, Trophy, FlaskConical, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PaymentModal } from "@/components/landing/PaymentModal";

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

const pillars = [
    {
        icon: MapPin,
        title: "Ultimate Convenience",
        description: "We operate directly at your child's school or community center. No extra driving required.",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
        icon: Shield,
        title: "Uncompromising Safety",
        description: "All coaches are background-checked and CPR certified. Safety is our #1 priority.",
        color: "text-green-500",
        bg: "bg-green-50 dark:bg-green-900/20"
    },
    {
        icon: Heart,
        title: "Professional Curriculum",
        description: "Not just supervision—kids master agility in sports, logic in STEM, and confidence in defense.",
        color: "text-red-500",
        bg: "bg-red-50 dark:bg-red-900/20"
    }
];

const programs = [
    {
        name: "Jr Sports",
        icon: Trophy,
        href: "/jr-sports",
        color: "#4361EE"
    },
    {
        name: "Jr STEM",
        icon: FlaskConical,
        href: "/jr-stem",
        color: "#FF7E67"
    },
    {
        name: "Jr Defense",
        icon: ShieldCheck,
        href: "/jr-defense",
        color: "#14B8A6"
    }
];

export default function ForParentsPage() {
    type Session = {
        id: string;
        program: { name: string; category?: string | null };
        partner: {
            name: string;
            type?: string | null;
            location?: string;
            addressLine1?: string;
            city?: string;
            state?: string;
            postalCode?: string;
            latitude?: number;
            longitude?: number;
        };
        startDate: string;
        endDate: string;
        capacity: number;
    };
    const [sessions, setSessions] = useState<Session[]>([]);
    const [query, setQuery] = useState("");
    const [loadingGeo, setLoadingGeo] = useState(false);
    const [geoLabel, setGeoLabel] = useState("");
    const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [radius, setRadius] = useState<number>(25);
    const [sortByDistance, setSortByDistance] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({ name: "", price: 0, period: "" });
    const [selectedSessionId, setSelectedSessionId] = useState<string | undefined>();
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    function resetFilters() {
        setQuery("");
        setGeoLabel("");
        setUserCoords(null);
        setRadius(25);
        setSortByDistance(true);
    }

    useEffect(() => {
        fetch("/api/sessions").then(r => r.json()).then(setSessions).catch(() => {});
    }, []);

    const upcoming = useMemo(() => sessions.filter(s => new Date(s.endDate) >= new Date()), [sessions]);
    const upcomingNewestFirst = useMemo(() => {
        return [...upcoming].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }, [upcoming]);

    function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString("en-US", { timeZone: "UTC" });

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let base = upcoming;
        if (q) {
            base = base.filter(s => {
                const loc = (s.partner?.location || "").toLowerCase();
                const city = (s.partner?.city || "").toLowerCase();
                const state = (s.partner?.state || "").toLowerCase();
                const zip = String(s.partner?.postalCode || "").toLowerCase();
                const pname = (s.partner?.name || "").toLowerCase();
                const prog = (s.program?.name || "").toLowerCase();
                return (
                    loc.includes(q) ||
                    city.includes(q) ||
                    state.includes(q) ||
                    zip.includes(q) ||
                    pname.includes(q) ||
                    prog.includes(q)
                );
            });
        }
        if (userCoords) {
            base = base.filter(s => {
                if (s.partner?.latitude == null || s.partner?.longitude == null) return true;
                const km = haversine(userCoords.lat, userCoords.lon, s.partner.latitude, s.partner.longitude);
                const mi = km * 0.621371;
                return mi <= radius;
            });
            if (sortByDistance) {
                base = [...base].sort((a, b) => {
                    const da = a.partner?.latitude != null && a.partner?.longitude != null
                        ? haversine(userCoords.lat, userCoords.lon, a.partner!.latitude!, a.partner!.longitude!)
                        : Number.POSITIVE_INFINITY;
                    const db = b.partner?.latitude != null && b.partner?.longitude != null
                        ? haversine(userCoords.lat, userCoords.lon, b.partner!.latitude!, b.partner!.longitude!)
                        : Number.POSITIVE_INFINITY;
                    return da - db;
                });
            }
        }
        return base;
    }, [upcoming, query, userCoords, radius, sortByDistance]);

    function useMyLocation() {
        if (!navigator.geolocation) return;
        setLoadingGeo(true);
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setUserCoords({ lat: latitude, lon: longitude });
            setGeoLabel("Your location");
            setLoadingGeo(false);
        }, () => setLoadingGeo(false), { enableHighAccuracy: true, timeout: 8000 });
    }

    const cityOptions = useMemo(() => {
        const set = new Set<string>();
        for (const s of upcoming) {
            const v = (s.partner?.city || s.partner?.location || "").trim();
            if (v) set.add(v);
        }
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [upcoming]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen selection:bg-primary selection:text-white">
            <Navbar />
            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/20 dark:to-transparent" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                                    Empower Your Child's <br />
                                    <span className="text-primary">After-School Time</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                                    High-quality enrichment that feels like play, but builds real-world skills. Join thousands of parents who trust Jr Camps.
                                </p>
                                <div className="flex flex-col sm:row gap-4">
                                    <Button size="lg" asChild className="rounded-full px-8 h-14 bg-primary hover:bg-blue-700 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                                        <Link href="#near-me">Find a Program Near Me</Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild className="rounded-full px-8 h-14 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                                        <Link
                                            href="/#parents"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsCatalogOpen(true);
                                            }}
                                        >
                                            View All Programs
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                                    <img
                                        src="/kids-playing-chess (2).jpg"
                                        alt="Kids learning and playing"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                                        <p className="text-lg italic font-medium mb-2">
                                            "The easiest way to keep my kids active and learning."
                                        </p>
                                        <div className="flex items-center gap-2 text-sm opacity-80">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Zap key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <span>5-Star Parent Rating</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badges */}
                                <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 animate-bounce-slow">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Certified Safety</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">100% Background Checked</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Why Jr Camps Section */}
                <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Parents Love Us</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                We designed our programs with the modern family in mind—combining professional instruction with total peace of mind.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {pillars.map((pillar, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-soft"
                                >
                                    <div className={`h-14 w-14 ${pillar.bg} ${pillar.color} rounded-2xl flex items-center justify-center mb-6`}>
                                        <pillar.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{pillar.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Links to Programs */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Programs</h2>
                                <p className="text-lg text-gray-500">
                                    Specialized curriculum designed to turn idle time into active discovery.
                                </p>
                            </div>
                            <Button variant="ghost" asChild className="group">
                                <Link href="/#parents">
                                    View Detailed Curriculum <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {programs.map((program) => (
                                <Link key={program.name} href={program.href}>
                                    <div
                                        className="group p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1 h-full flex flex-col"
                                    >
                                        <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6 relative z-20" style={{ backgroundColor: `${program.color}15`, color: program.color }}>
                                            <program.icon size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-20">{program.name}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 relative z-20 flex-grow">Master new skills through expert-led clinics.</p>
                                        <div className="mt-8 flex items-center text-sm font-bold relative z-20 group-hover:translate-x-1 transition-transform" style={{ color: program.color }}>
                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="near-me" className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Find a Program Near You</h2>
                            <p className="text-gray-500">Search by city or ZIP, or use your current location.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 max-w-3xl mx-auto mb-8">
                            <div className="flex-1 min-w-[240px]">
                                <Input value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} placeholder="e.g., 95814 or Sacramento" list="near-me-cities" />
                                <datalist id="near-me-cities">
                                    {cityOptions.map((c) => (
                                        <option key={c} value={c} />
                                    ))}
                                </datalist>
                            </div>
                            <Button onClick={useMyLocation} disabled={loadingGeo} className="h-9">
                                <MapPin className="mr-2 h-4 w-4" /> {loadingGeo ? "Locating..." : "Use My Location"}
                            </Button>
                            <select
                                value={radius}
                                onChange={(e) => setRadius(Number((e.target as HTMLSelectElement).value))}
                                className="h-9 rounded-md border bg-transparent px-3 py-1 text-sm"
                            >
                                <option value={10}>10 miles</option>
                                <option value={25}>25 miles</option>
                                <option value={50}>50 miles</option>
                            </select>
                            <Button
                                variant="outline"
                                className="h-9"
                                onClick={() => setSortByDistance((v) => !v)}
                            >
                                {sortByDistance ? "Sort: Distance" : "Sort: Default"}
                            </Button>
                            <Button
                                variant="ghost"
                                className="h-9"
                                onClick={resetFilters}
                            >
                                Reset Filters
                            </Button>
                        </div>
                        {(query || geoLabel) && (
                            <div className="text-sm text-muted-foreground text-center mb-6">
                                <p>
                                    Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""} {query || geoLabel ? `near "${query || geoLabel}"` : ""}
                                </p>
                                {userCoords && (
                                    <p className="mt-1">
                                        Within radius: {radius} miles{sortByDistance ? " • Sorted by distance" : ""}
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((s) => {
                                const miles = userCoords && s.partner?.latitude != null && s.partner?.longitude != null
                                  ? (haversine(userCoords.lat, userCoords.lon, s.partner!.latitude!, s.partner!.longitude!) * 0.621371)
                                  : null;
                                return (
                                  <div key={s.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-soft">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h3 className="font-bold text-lg">{s.partner?.name}</h3>
                                        <p className="text-sm text-gray-500">{s.partner?.location || "Location TBA"}</p>
                                        {miles != null && (<p className="text-xs text-muted-foreground mt-1">{miles.toFixed(1)} mi away</p>)}
                                      </div>
                                    </div>
                                    <div className="mt-4 text-sm">
                                      <p className="font-medium">{s.program?.name}</p>
                                      <p className="text-gray-500">{formatDate(s.startDate)} - {formatDate(s.endDate)}</p>
                                    </div>
                                    <div className="mt-4">
                                      <Button variant="ghost" size="sm" className="rounded-full mr-2">Details</Button>
                                      <Button 
                                        size="sm" 
                                        className="rounded-full bg-primary text-white hover:bg-primary/90"
                                        onClick={() => {
                                          setSelectedSessionId(s.id);
                                          setSelectedPlan({ name: "All Access", price: 489, period: "month" });
                                          setIsModalOpen(true);
                                        }}
                                      >
                                        Register
                                      </Button>
                                    </div>
                                  </div>
                                );
                            })}
                            {filtered.length === 0 && (
                                <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
                                    No sessions near your area yet. Check back soon or contact support.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent" />
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-5xl font-bold mb-6">Join the Jr Camps family</h2>
                            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                                We're adding new locations every month. Find a program near you and give your child the enrichment they deserve.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full px-10 h-14 text-lg font-bold">
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <PaymentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    plan={selectedPlan}
                    sessionId={selectedSessionId}
                />
                <AlertDialog open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
                    <AlertDialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-[#0056b3]">Available Sessions</AlertDialogTitle>
                            <AlertDialogDescription className="text-[#7a7a7a]">
                                Browse upcoming sessions and register for a program near you.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        
                        <div className="flex-1 overflow-y-auto pr-2 -mr-2 py-2">
                            <div className="flex flex-col gap-4">
                                {upcomingNewestFirst.map((s) => (
                                    <div
                                        key={s.id}
                                        className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-[#0056b3]">
                                                    {s.program?.name}
                                                </h3>
                                                {s.program?.category && (
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                                                        {s.program.category}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="text-sm text-[#7a7a7a] space-y-0.5">
                                                <p className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{s.partner?.name}</span>
                                                    {s.partner?.type && <span className="text-gray-400">• {s.partner.type}</span>}
                                                </p>
                                                <p>
                                                    {formatDate(s.startDate)} 
                                                    {' — '} 
                                                    {formatDate(s.endDate)}
                                                </p>
                                                <p className="text-xs">Capacity: <span className="font-medium">{s.capacity}</span> students</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="hidden sm:flex text-[#0056b3] hover:text-[#004494] hover:bg-blue-50"
                                            >
                                                Details
                                            </Button>
                                            <Button
                                                className="flex-1 sm:flex-none bg-[#f39c12] text-[#212529] font-semibold hover:bg-[#ffa500] shadow-md hover:shadow-lg transition-all rounded-lg"
                                                onClick={() => {
                                                    setSelectedSessionId(s.id);
                                                    setSelectedPlan({ name: "All Access", price: 489, period: "month" });
                                                    setIsCatalogOpen(false);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Register Now
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                
                                {upcomingNewestFirst.length === 0 && (
                                    <div className="py-12 text-center text-[#7a7a7a]">
                                        <p className="text-lg font-medium">No upcoming sessions found</p>
                                        <p className="text-sm">Please check back later for new schedules.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end pt-4 border-t border-gray-100">
                            <AlertDialogCancel onClick={() => setIsCatalogOpen(false)} className="border-gray-200 text-gray-600 hover:bg-gray-50">
                                Close
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            </main>
            <Footer />
        </div>
    );
}
