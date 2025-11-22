import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/BootSequence.css';

const BootSequence = ({ onComplete }) => {
    const [text, setText] = useState('');
    const fullText = "Initializing Cybertarr-A Portfolio...";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;
            if (index > fullText.length) {
                clearInterval(interval);
                console.log("Boot sequence complete");
                setTimeout(onComplete, 1000); // Wait 1s before finishing
            }
        }, 50);
        return () => clearInterval(interval);
    }, []); // Empty dependency array to run once

    return (
        <motion.div
            className="boot-sequence"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="terminal-text">
                <span className="prefix">{'>'}</span> {text}<span className="cursor">_</span>
            </div>
        </motion.div>
    );
};

export default BootSequence;
