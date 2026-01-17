"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PillNav from "@/components/PillNav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Magnet } from "@/components/ui/magnet";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const NAV_ITEMS = [
    { label: "For Parents", href: "/for-parents" },
    { label: "For Schools & Cities", href: "/for-partners" },
    { label: "Pricing", href: "/#pricing" },
];

export function Navbar() {
    const { user } = useUser();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full flex justify-center font-bold fixed top-0 left-0 right-0 z-100 bg-[#f0f9ff]/60 backdrop-blur-md border-b border-blue-100/50 px-4 md:px-8 transition-all duration-300">
            <div className="max-w-7xl w-full flex items-center justify-between py-2">
                {/* Standalone Logo */}
                <Link
                            href="/"
                            className="rounded-full inline-flex items-center gap-2 overflow-hidden transition-transform duration-200 hover:scale-105 shrink-0 pr-2"
                            style={{
                                height: '48px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.0), 0 2px 4px -2px rgb(0 0 0 / 0.0)'
                            }}
                        >
                            <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                                <Logo className="w-full h-full" />
                            </div>
                            <span className="text-xl font-stretch-semi-condensed font-semibold text-gray-900 tracking-tight">
                                JrCamps
                            </span>
                        </Link>

                {/* Spacer to maintain centering on desktop */}
                <div className="flex-1 hidden md:block" />

                <div className="shrink-0">
                    <PillNav
                        items={NAV_ITEMS}
                        baseColor="#FFB01F"
                        pillColor="#F3F4F6"
                        hoveredPillTextColor="#000000"
                        pillTextColor="#111827"
                        showLogo={false}
                        containerBg="transparent"
                    >
                        {mounted && (
                            <div className="flex flex-col gap-2 p-2">
                                <SignedOut>
                                    <div className="grid grid-cols-2 gap-2">
                                        <SignInButton mode="modal">
                                            <Magnet padding={20} magnetStrength={3}>
                                                <motion.button
                                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full justify-center rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200"
                                                >
                                                    Log in
                                                </motion.button>
                                            </Magnet>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <Magnet padding={20} magnetStrength={3}>
                                                <motion.button
                                                    whileHover={{ scale: 1.05, y: -1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full justify-center rounded-full px-4 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                                                >
                                                    Sign Up
                                                </motion.button>
                                            </Magnet>
                                        </SignUpButton>
                                    </div>
                                </SignedOut>
                                <SignedIn>
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        <UserButton afterSignOutUrl="/#hero" />
                                        <span className="text-sm font-medium text-gray-700">Account</span>
                                    </div>
                                </SignedIn>
                            </div>
                        )}
                    </PillNav>
                </div>

                <div className="flex-1 hidden md:flex justify-end items-center gap-2">
                    {mounted && (
                        <>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <Magnet padding={20} magnetStrength={3}>
                                        <motion.button
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="rounded-full px-5 py-2 text-sm font-semibold text-gray-700 transition-all duration-200"
                                        >
                                            Log in
                                        </motion.button>
                                    </Magnet>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Magnet padding={20} magnetStrength={3}>
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="rounded-full px-6 py-2 text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
                                        >
                                            Sign Up
                                        </motion.button>
                                    </Magnet>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <div className="flex items-center gap-2">
                                    <UserButton afterSignOutUrl="/#hero" />
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        {user?.firstName || user?.username || 'Account'}
                                    </span>
                                </div>
                            </SignedIn>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
