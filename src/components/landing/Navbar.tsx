import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-transparent dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-12">
                        <Link href="/" className="text-3xl font-bold tracking-tight text-black dark:text-white font-display">
                            jr camps
                        </Link>
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="#parents" className="text-sm font-semibold text-gray-900 hover:text-primary transition-colors">For Parents</Link>
                            <div className="h-4 w-px bg-gray-200"></div>
                            <Link href="#partners" className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors">For Schools & Cities</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Button asChild className="rounded-full px-6 bg-[#FF7E67] hover:bg-orange-600 animate-pulse-soft text-white border-none shadow-md">
                            <Link href="/find">Find a Camp</Link>
                        </Button>
                        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Log in</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
