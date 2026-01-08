"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function Testimonials() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        whileInView: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">What Our Community Says</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto italic">Real stories from the parents, principals, and partners who trust us every day.</p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {/* Testimonial 1 */}
                    <motion.div
                        className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[3rem] border border-gray-100 dark:border-slate-700 relative"
                        variants={fadeIn}
                    >
                        <div className="flex gap-1 text-[#FCD34D] mb-6">
                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                        </div>
                        <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            "As a working mom, the convenience of having high-quality sports right at the school is unmatched. My son actually puts down the iPad to go to his Jr Sports clinic. He's more active and confident than ever."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" alt="Parent" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h5 className="font-bold text-gray-900 dark:text-white">Jessica M.</h5>
                                <p className="text-sm text-gray-500">Parent, LAUSD District</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonial 2 */}
                    <motion.div
                        className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[3rem] border border-gray-100 dark:border-slate-700"
                        variants={fadeIn}
                    >
                        <div className="flex gap-1 text-[#FCD34D] mb-6">
                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                        </div>
                        <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            "Jr Camps is a true turnkey partner. They handled the hiring, the insurance, and the registration flawlessly. It's the easiest program we've ever implemented, with zero work for my front office staff."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" alt="Principal" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h5 className="font-bold text-gray-900 dark:text-white">Dr. Roberts</h5>
                                <p className="text-sm text-gray-500">Principal, Riverside Academy</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
