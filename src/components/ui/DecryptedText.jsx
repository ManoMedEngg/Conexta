import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const DecryptedText = ({ text, speed = 50, maxIterations = 10, className, revealDirection = 'start' }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const iterations = useRef(0);
    const intervalRef = useRef(null);

    const startAnimation = () => {
        iterations.current = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text.split('').map((char, index) => {
                    if (index < iterations.current) {
                        return text[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join('')
            );

            if (iterations.current >= text.length) {
                clearInterval(intervalRef.current);
                setDisplayText(text);
            }

            iterations.current += 1 / 3; // Slow down the reveal
        }, speed);
    };

    useEffect(() => {
        startAnimation();
        return () => clearInterval(intervalRef.current);
    }, [text]);

    return (
        <span
            className={className}
            onMouseEnter={startAnimation} // Re-animate on hover
        >
            {displayText}
        </span>
    );
};
