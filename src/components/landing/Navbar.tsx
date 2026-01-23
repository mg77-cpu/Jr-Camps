"use client";

import { useState, useEffect } from "react";
import { Magnet } from "../ui/magnet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
const NAV_ITEMS = [
    { 
        title: "For Parents", 
        href: "/for-parents" 
    },
    { 
        title: "For Schools & Cities", 
        href: "/for-partners" 
    },
    { 
        title: "Pricing", 
        href: "/#pricing" 
    },
];

const MotionLink = motion(Link);

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

                <div className="shrink-0 hidden md:flex items-center space-x-2">
                    {NAV_ITEMS.map((item, index) => (
                        <MotionLink
                            key={item.title}
                            href={item.href}
                            className="relative group flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-black transition-all duration-200 text-sm font-medium"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            whileHover={{ 
                                scale: 1.15,
                                y: -3,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span 
                                className="text-blue-600 transition-all duration-300"
                                whileHover={{ 
                                    scale: 1.4, 
                                    rotate: [0, -10, 10, -10, 0],
                                    transition: { 
                                        scale: { duration: 0.3 },
                                        rotate: { duration: 0.6, ease: "easeInOut" }
                                    }
                                }}
                            >
                            </motion.span>
                            <motion.span
                                whileHover={{ 
                                    y: -2,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {item.title}
                            </motion.span>
                            
                            {/* Enhanced floating dock-style underline with more dramatic animation */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 origin-center"
                                initial={{ scaleX: 0 }}
                                whileHover={{ 
                                    scaleX: 1,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                            />
                            {/* Additional glow effect */}
                            <motion.div
                                className="absolute -inset-1 bg-blue-600 opacity-0 rounded-lg blur-sm"
                                whileHover={{ 
                                    opacity: 0.1,
                                    transition: { duration: 0.3 }
                                }}
                            />
                        </MotionLink>
                    ))}
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
                                    <Button asChild variant="ghost" size="sm" className="text-[#0056b3] font-bold hover:bg-blue-50 hover:text-[#004494]">
                                        <Link href="/portal">My Portal</Link>
                                    </Button>
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
