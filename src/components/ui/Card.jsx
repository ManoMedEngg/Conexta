import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, glow = false }) => {
    return (
        <div
            className={twMerge(
                'bg-glass-panel backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300',
                glow && 'hover:shadow-neon border-neon-blue/30',
                className
            )}
        >
            {children}
        </div>
    );
};
