import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <div className="staggered-menu">
            <button className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className="menu-nav"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.a href="#home" className="menu-item" variants={itemVariants} onClick={toggleMenu}>
                            <span className="item-number">01</span>
                            <span>Home</span>
                        </motion.a>
                        <motion.a href="#about" className="menu-item" variants={itemVariants} onClick={toggleMenu}>
                            <span className="item-number">02</span>
                            <span>About</span>
                        </motion.a>
                        <motion.a href="#skills" className="menu-item" variants={itemVariants} onClick={toggleMenu}>
                            <span className="item-number">03</span>
                            <span>Skills</span>
                        </motion.a>
                        <motion.a href="#projects" className="menu-item" variants={itemVariants} onClick={toggleMenu}>
                            <span className="item-number">04</span>
                            <span>Projects</span>
                        </motion.a>
                        <motion.a href="#contact" className="menu-item" variants={itemVariants} onClick={toggleMenu}>
                            <span className="item-number">05</span>
                            <span>Contact</span>
                        </motion.a>

                        <motion.div className="menu-socials" variants={itemVariants}>
                            <a href="https://github.com/cybertarr-A" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://x.com/cybertarr_A" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
                            <a href="mailto:jashs7944@gmail.com">Email</a>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navigation;
