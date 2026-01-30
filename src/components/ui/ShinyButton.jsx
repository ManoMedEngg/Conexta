import React from 'react';
import { motion } from 'framer-motion';

export const ShinyButton = ({ children, onClick, className = '', variant = 'primary' }) => {
    const baseClass = "relative px-6 py-2 rounded-lg font-bold overflow-hidden group transition-all duration-300";
    const variants = {
        primary: "bg-neon-blue/10 text-neon-blue border border-neon-blue/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]",
        danger: "bg-alert-red/10 text-alert-red border border-alert-red/50 hover:shadow-[0_0_20px_rgba(255,42,109,0.5)]",
        secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClass} ${variants[variant]} ${className}`}
        >
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-[100%] group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
};
