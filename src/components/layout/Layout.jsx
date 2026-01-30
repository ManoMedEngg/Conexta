import React from 'react';
import { Navbar } from './Navbar';
import { motion } from 'framer-motion';
import { GridBackground } from '../ui/GridBackground';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-deep-bg text-white selection:bg-neon-blue/30 selection:text-neon-blue relative isolate">
            <GridBackground />
            <Navbar />
            <main className="flex-1 container mx-auto p-4 md:p-6 relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px]" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-[128px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};
