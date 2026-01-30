import React from 'react';
import { motion } from 'framer-motion';

export const GridBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

            {/* Moving Lights */}
            <motion.div
                className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-50"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-50"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2 }}
            />
            <motion.div
                className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30"
                animate={{ left: ['-100%', '100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 1 }}
            />
        </div>
    );
};
