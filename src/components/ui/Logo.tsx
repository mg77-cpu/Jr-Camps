import React from 'react';

export const Logo = ({ className = "w-16 h-16" }: { className?: string }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <img 
                src="/jr_icon_.png" 
                alt="Jr Camps Logo" 
                className="w-full h-full object-contain "
            />
        </div>
    );
};
