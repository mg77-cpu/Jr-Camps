import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { ThreePillars } from "@/components/landing/ThreePillars";
import { ValueSwitch } from "@/components/landing/ValueSwitch";
import { TurnkeyPromise } from "@/components/landing/TurnkeyPromise";
import { SafetyShield } from "@/components/landing/SafetyShield";
import { Testimonials } from "@/components/landing/Testimonials";
import { Gallery } from "@/components/landing/Gallery";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { BackgroundBlobs } from "@/components/landing/BackgroundBlobs";

export default function Home() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark overflow-x-hidden selection:bg-primary selection:text-white">
            <Navbar />
            <main className="relative pt-24 overflow-hidden">
                <Hero />
                <TrustBar />
                <ThreePillars />
                <ValueSwitch />
                <TurnkeyPromise />
                <SafetyShield />
                <Testimonials />
                <Gallery />
                <Pricing />
                <FinalCTA />
                <Footer />
                <BackgroundBlobs />
            </main>
        </div>
    );
}
