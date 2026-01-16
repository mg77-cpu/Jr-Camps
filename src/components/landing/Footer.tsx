"use client";

import Link from "next/link";
import { ShieldCheck, Activity, CheckCircle2, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    return (
        <motion.footer
            className="bg-slate-950 text-gray-400 py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">jr camps</h3>
                        <p className="text-sm leading-relaxed mb-6">
                            A premier youth enrichment provider turning "idle time" into "active learning" since 2012.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Programs</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/jr-sports" className="hover:text-white transition-colors">Jr Sports Clinics</Link></li>
                            <li><Link href="/jr-stem" className="hover:text-white transition-colors">Jr STEM Labs</Link></li>
                            <li><Link href="/jr-defense" className="hover:text-white transition-colors">Jr Defense Training</Link></li>
                            <li><Link href="/for-parents" className="hover:text-white transition-colors font-medium text-primary">For Parents Overview</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Partners</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/for-partners" className="hover:text-white transition-colors">For Schools</Link></li>
                            <li><Link href="/for-partners" className="hover:text-white transition-colors">For Cities & Rec</Link></li>
                            <li><Link href="/for-partners" className="hover:text-white transition-colors">For HOAs & Apartments</Link></li>
                            <li><Link href="/for-partners" className="hover:text-white transition-colors font-medium text-primary">Partner Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Safety & Compliance</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-primary" />
                                <span>Live Scan Background Verified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity size={16} className="text-primary" />
                                <span>CPR & First Aid Certified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-primary" />
                                <span>Fully Insured & Bonded</span>
                            </div>
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <p className="flex items-center gap-2 mb-2 font-medium"><Phone size={14} /> (800) 555-CAMP</p>
                                <p className="flex items-center gap-2"><Mail size={14} /> help@jrcamps.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs tracking-wide uppercase">
                    <p>© 2026 JR CAMPS. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Staff Login</Link>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
