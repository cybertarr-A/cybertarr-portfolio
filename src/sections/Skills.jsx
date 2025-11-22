import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Skills.css';

const skillsData = [
    {
        category: "Core Languages",
        items: [
            { name: "Python", level: 95 },
            { name: "JavaScript/TypeScript", level: 90 },
            { name: "Node.js", level: 85 },
            { name: "HTML/CSS", level: 90 },
            { name: "C/C++", level: 75 }
        ]
    },
    {
        category: "Frontend",
        items: [
            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "Tailwind", level: 90 },
            { name: "Three.js", level: 70 },
            { name: "WebGL", level: 65 }
        ]
    },
    {
        category: "AI/ML",
        items: [
            { name: "TensorFlow", level: 85 },
            { name: "PyTorch", level: 85 },
            { name: "Scikit-learn", level: 90 },
            { name: "OpenCV", level: 80 },
            { name: "Stable Diffusion", level: 85 },
            { name: "VQGAN+CLIP", level: 80 },
            { name: "Transformers", level: 75 }
        ]
    },
    {
        category: "Automation/Data",
        items: [
            { name: "n8n", level: 95 },
            { name: "Selenium", level: 90 },
            { name: "BeautifulSoup", level: 95 },
            { name: "Pandas", level: 90 },
            { name: "NumPy", level: 85 },
            { name: "PRAW", level: 95 }
        ]
    }
];

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState(skillsData[0].category);

    return (
        <section id="skills" className="skills-section">
            <h2 className="section-title">CORE CAPABILITIES</h2>

            <div className="skills-container">
                <div className="category-nav">
                    {skillsData.map((cat) => (
                        <button
                            key={cat.category}
                            className={`category-btn ${activeCategory === cat.category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.category)}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>

                <div className="skills-display">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="skills-grid"
                        >
                            {skillsData.find(c => c.category === activeCategory).items.map((skill) => (
                                <div key={skill.name} className="skill-card">
                                    <div className="skill-header">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-percent">{skill.level}%</span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <motion.div
                                            className="progress-bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Skills;
