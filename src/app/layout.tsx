import type { Metadata } from "next";
import { Inter, Noto_Sans, Figtree, Poppins, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
    variable: "--font-geist",
    subsets: ["latin"],
});

const momo = localFont({
    src: "../../public/fonts/Momo_Trust_Display/MomoTrustDisplay-Regular.ttf",
    variable: "--font-momo-display",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const noto_sans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
    variable: "--font-figtree",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Jr Camps | Youth Enrichment Programs",
    description: "High-quality After-School Sports, STEM, and Self-Defense programs.",
};

import { SmoothScroll } from "@/components/providers/SmoothScroll";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className="scroll-smooth" suppressHydrationWarning>
                <body className={`${inter.variable} ${noto_sans.variable} ${figtree.variable} ${poppins.variable} ${geistSans.variable} ${momo.variable} antialiased font-sans`}>
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                </body>
            </html>
        </ClerkProvider>
    );
}
