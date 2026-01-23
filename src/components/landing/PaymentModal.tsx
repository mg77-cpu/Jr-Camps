"use client";

import { useState, useEffect } from "react";
import { X, Check, Loader2, LogIn, UserPlus, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { sanitize } from "@/lib/utils";

interface Session {
    id: string;
    program: { name: string };
    partner: { name: string; location: string };
    startDate: string;
    endDate: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: {
        name: string;
        price: number;
        period: string;
    };
    sessionId?: string;
}

export function PaymentModal({ isOpen, onClose, plan, sessionId }: PaymentModalProps) {
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loadingSessions, setLoadingSessions] = useState(false);

    const [studentInfo, setStudentInfo] = useState({
        name: "",
        dob: "",
        notes: "",
        sessionId: "",
    });

    useEffect(() => {
        if (isOpen) {
            fetchSessions();
        }
    }, [isOpen]);

    const fetchSessions = async () => {
        setLoadingSessions(true);
        try {
            const response = await fetch("/api/sessions");
            if (response.ok) {
                const data = (await response.json()) as Session[];
                setSessions(data);
                // Pre-select session from prop if provided and exists in the list
                const preselectedSession = sessionId && data.find(s => s.id === sessionId);
                if (preselectedSession) {
                    setStudentInfo(prev => ({ ...prev, sessionId: preselectedSession.id }));
                } else if (data.length > 0) {
                    setStudentInfo(prev => ({ ...prev, sessionId: data[0].id }));
                }
            }
        } catch (err) {
            console.error("Failed to fetch sessions:", err);
        } finally {
            setLoadingSessions(false);
        }
    };

    const handleStudentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (!studentInfo.sessionId) {
            setError("Please select a session location");
            return;
        }
        
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planName: plan.name,
                    amount: plan.price,
                    sessionId: studentInfo.sessionId,
                    parentDetails: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.primaryEmailAddress?.emailAddress,
                        phone: "",
                    },
                    studentDetails: {
                        name: sanitize(studentInfo.name),
                        dob: studentInfo.dob, // Date input is usually safe but can be sanitized if needed
                        notes: sanitize(studentInfo.notes),
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || "Checkout session creation failed");
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />
                <motion.div
                    className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Registration: <span className="text-primary">{plan.name}</span>
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Progress Bar (Only show if logged in) */}
                    {user && (
                        <div className="h-1 bg-gray-100 dark:bg-slate-800 w-full">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "50%" }}
                                animate={{ width: "100%" }}
                            />
                        </div>
                    )}

                    {/* Content Area - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                        {!isLoaded ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : !user ? (
                            <div className="space-y-6 py-4 text-center">
                                <div className="space-y-2">
                                    <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                                        <LogIn size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Sign up to Continue</h4>
                                    <p className="text-gray-500 max-w-xs mx-auto">
                                        You need an account to register for {plan.name}. It only takes a minute!
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <SignUpButton mode="modal">
                                        <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                            <UserPlus size={20} />
                                            Create Account
                                        </button>
                                    </SignUpButton>
                                    
                                    <div className="flex items-center gap-3 py-2">
                                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-slate-700"></div>
                                        <span className="text-xs text-gray-400 font-medium">OR</span>
                                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-slate-700"></div>
                                    </div>

                                    <SignInButton mode="modal">
                                        <button className="w-full py-3 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleStudentSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Student Information</h4>
                                    <p className="text-sm text-gray-500">Who will be attending the program?</p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">{plan.name}</p>
                                        <p className="text-sm text-gray-500">{plan.period}</p>
                                    </div>
                                    <p className="text-xl font-bold text-primary">${plan.price}</p>
                                </div>
                                
                                {error && (
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/30">
                                        {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Location & Session</label>
                                        {loadingSessions ? (
                                            <div className="flex items-center gap-2 text-sm text-gray-500 py-3 px-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700">
                                                <Loader2 size={16} className="animate-spin text-primary" />
                                                <span>Loading available sessions...</span>
                                            </div>
                                        ) : sessions.length > 0 ? (
                                            <div className="relative group">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none">
                                                    <MapPin size={18} />
                                                </div>
                                                <select
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer hover:border-gray-300 dark:hover:border-slate-600"
                                                    value={studentInfo.sessionId}
                                                    onChange={(e) => setStudentInfo({ ...studentInfo, sessionId: e.target.value })}
                                                >
                                                    {sessions.map((s) => (
                                                        <option key={s.id} value={s.id} className="dark:bg-slate-900 text-gray-900 dark:text-white">
                                                    {s.partner.name} • {new Date(s.startDate).toLocaleDateString("en-US", { timeZone: "UTC" })} ({s.program.name})
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm rounded-lg border border-amber-100 dark:border-amber-900/30 flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                                                    <MapPin size={16} />
                                                </div>
                                                <p>No active sessions found for this program. Please contact our support team.</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Student Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                                                value={studentInfo.name}
                                                placeholder="Enter full name"
                                                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                                            <input
                                                required
                                                type="date"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                                                value={studentInfo.dob}
                                                onChange={(e) => setStudentInfo({ ...studentInfo, dob: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes / Allergies</label>
                                        <textarea
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white min-h-[80px]"
                                            value={studentInfo.notes}
                                            onChange={(e) => setStudentInfo({ ...studentInfo, notes: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-card-orange to-[#FF9A76] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Proceed to Payment
                                            <Check size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
