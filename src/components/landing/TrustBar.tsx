export function TrustBar() {
    return (
        <section className="bg-white py-12 border-y border-gray-100 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
                    Trusted by 50+ Schools and Communities in Texas
                </p>
                <div className="relative overflow-hidden group">
                    <div className="flex animate-marquee whitespace-nowrap gap-16 items-center w-max">
                        {/* Logo Set 1 */}
                        <div className="flex items-center gap-16 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <span className="text-2xl font-bold tracking-tighter">LAUSD</span>
                            <span className="text-2xl font-bold tracking-tighter">SDUSD</span>
                            <span className="text-2xl font-bold tracking-tighter">SFUSD</span>
                            <span className="text-2xl font-bold tracking-tighter">CITY OF SACRAMENTO</span>
                            <span className="text-2xl font-bold tracking-tighter">YMCA</span>
                            <span className="text-2xl font-bold tracking-tighter">BOYS & GIRLS CLUBS</span>
                        </div>
                        {/* Logo Set 2 (Duplicate for seamless loop) */}
                        <div className="flex items-center gap-16 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <span className="text-2xl font-bold tracking-tighter">LAUSD</span>
                            <span className="text-2xl font-bold tracking-tighter">SDUSD</span>
                            <span className="text-2xl font-bold tracking-tighter">SFUSD</span>
                            <span className="text-2xl font-bold tracking-tighter">CITY OF SACRAMENTO</span>
                            <span className="text-2xl font-bold tracking-tighter">YMCA</span>
                            <span className="text-2xl font-bold tracking-tighter">BOYS & GIRLS CLUBS</span>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
