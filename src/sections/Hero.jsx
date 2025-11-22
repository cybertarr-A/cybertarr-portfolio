import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section id="about" className="hero-section">
            <div className="hero-container">
                <h2 className="about-title">About Me</h2>

                <motion.div
                    className="about-card"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p>
                        I'm <strong className="highlight-cyan">Jashraj Shah (CyberTarr-A)</strong>, an AI Developer and Researcher with 2 years of experience specializing in cutting-edge machine learning, automation, web scraping, and digital marketing.
                    </p>
                    <p>
                        My work spans across Python automation, generative AI (Stable Diffusion, VQGAN+CLIP), neural network development, and building intelligent systems that bridge theoretical research with practical applications.
                    </p>
                    <p>
                        As a Social Media Manager, I've crafted data-driven content strategies and executed campaigns with proven engagement metrics. I combine analytical thinking with creative problem-solving to push the boundaries of what's possible with AI.
                    </p>
                    <p>
                        When not coding, I contribute to open-source projects, write technical articles, and mentor aspiring AI developers.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
