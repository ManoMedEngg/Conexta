import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50';

    const variants = {
        primary: 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/30 hover:shadow-neon',
        secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
        danger: 'bg-alert-red/20 text-alert-red border border-alert-red/50 hover:bg-alert-red/30 hover:shadow-neon-red',
        ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};
