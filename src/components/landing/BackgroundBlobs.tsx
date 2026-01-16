"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
    return (
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute top-[10%] left-[20%] w-96 h-96 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten filter opacity-70"
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -50, 20, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-[20%] right-[20%] w-96 h-96 bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten filter opacity-70"
                animate={{
                    x: [0, -30, 20, 0],
                    y: [0, 50, -20, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute bottom-[20%] left-[40%] w-96 h-96 bg-pink-100/50 dark:bg-pink-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten filter opacity-70"
                animate={{
                    x: [0, 40, -30, 0],
                    y: [0, -30, 40, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />
        </div>
    );
}
