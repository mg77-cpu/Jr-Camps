export function BackgroundBlobs() {
    return (
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten filter opacity-70 animate-blob"></div>
            <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten filter opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[20%] left-[40%] w-96 h-96 bg-pink-100/50 dark:bg-pink-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten filter opacity-70 animate-blob animation-delay-4000"></div>
        </div>
    );
}
