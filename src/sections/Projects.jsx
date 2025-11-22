import React, { useState } from 'react';
import '../styles/Projects.css';

const projectsData = [
    {
        id: 1,
        title: 'Airdrop + Faucet + NFT Radar v3',
        category: 'Automation',
        description: 'A comprehensive n8n workflow that monitors multiple sources for new airdrops, faucets, and NFT drops, including Zora, OpenSea, Galxe, and Zealy.',
        tech: ['n8n', 'Automation', 'Web Scraping', 'API'],
        link: 'https://github.com/cybertarr-A/N8N-workflows',
        bgClass: 'bg-matrix'
    },
    {
        id: 2,
        title: 'AI Content Strategy Generator',
        category: 'AI Strategy',
        description: 'Uses Gemini to analyze trends from Reddit, YouTube, and X (Twitter) to generate detailed content strategy reports.',
        tech: ['n8n', 'Gemini AI', 'API', 'Content Strategy'],
        link: 'https://github.com/cybertarr-A/N8N-workflows',
        bgClass: 'bg-pulse'
    },
    {
        id: 3,
        title: 'Reddit Lead Generator',
        category: 'Lead Gen',
        description: 'Complex n8n workflow to find leads on Reddit. It searches posts, checks competitor mentions, filters results, and uses AI for analysis and response generation.',
        tech: ['n8n', 'Reddit', 'AI', 'Lead Generation'],
        link: 'https://github.com/cybertarr-A/N8N-workflows',
        bgClass: 'bg-swirl'
    },
    {
        id: 4,
        title: 'Reddit Post Fetcher',
        category: 'Data Engineering',
        description: 'Scheduled n8n workflow to fetch new posts from configured subreddits using the Reddit API, deduplicates them, and stores them in a Postgres database.',
        tech: ['n8n', 'Reddit API', 'PostgreSQL', 'Automation'],
        link: 'https://github.com/cybertarr-A/N8N-workflows',
        bgClass: 'bg-matrix'
    },
    {
        id: 5,
        title: 'Reddit Keyword Extractor',
        category: 'Analytics',
        description: 'Filters Reddit posts and comments by keyword, upvotes, and date. It then formats the results into a clean markdown report.',
        tech: ['n8n', 'Reddit', 'Data Filtering', 'Markdown'],
        link: 'https://github.com/cybertarr-A/N8N-workflows',
        bgClass: 'bg-pulse'
    },
    {
        id: 6,
        title: 'Airdrops.io Full Scraper',
        category: 'Web Scraping',
        description: 'An n8n workflow that scrapes the Airdrops.io sitemap, fetches individual airdrop pages, and parses the details like title, description, and claim link.',
        tech: ['n8n', 'Web Scraping', 'Automation'],
        link: 'https://github.com/cybertarr-A/N8N-workflows',
        bgClass: 'bg-swirl'
    },
    {
        id: 7,
        title: 'AI Image Captioning',
        category: 'AI / RAG',
        description: 'An n8n workflow that receives an image, processes it (text splitting, embeddings), and uses a RAG agent with a chat model (Anthropic) to generate a caption.',
        tech: ['n8n', 'AI', 'LangChain', 'RAG'],
        link: 'https://github.com/cybertarr-A/N8N-workflows',
        bgClass: 'bg-matrix'
    },
    {
        id: 8,
        title: 'Reddit Trend Analyzer',
        category: 'Analytics',
        description: 'Python scripts and n8n workflows monitoring subreddit activity, analyzing trends, and generating automated insights for content strategy.',
        tech: ['Python', 'n8n', 'PRAW', 'Analytics'],
        link: 'https://github.com/cybertarr-A',
        bgClass: 'bg-pulse'
    },
    {
        id: 9,
        title: 'Reddit Post Title Scraper',
        category: 'Scraping',
        description: 'Python tool using Reddit API (PRAW) to scrape post titles for content monitoring and analytics.',
        tech: ['Python', 'PRAW', 'API'],
        link: 'https://github.com/cybertarr-A/Reddit-post-scraper',
        bgClass: 'bg-swirl'
    },
    {
        id: 10,
        title: 'Subreddit Image Downloader',
        category: 'Automation',
        description: 'Automation script downloading images from top posts of selected subreddits for dataset creation.',
        tech: ['Python', 'Automation', 'Web Scraping'],
        link: 'https://github.com/cybertarr-A/reddit_media_downloader',
        bgClass: 'bg-matrix'
    },
    {
        id: 11,
        title: 'Reddit Job Post Finder',
        category: 'Crawler',
        description: 'Real-time crawler extracting and storing job posts from multiple subreddits into CSV/Google Sheets.',
        tech: ['Python', 'Real-time', 'CSV'],
        link: 'https://github.com/cybertarr-A/reddit-job-crawler',
        bgClass: 'bg-pulse'
    },
    {
        id: 12,
        title: 'AI-Based Image Generator',
        category: 'Generative AI',
        description: 'Colab-based generative AI tool creating unique images using Stable Diffusion and VQGAN+CLIP.',
        tech: ['Python', 'Stable Diffusion', 'VQGAN+CLIP', 'AI'],
        link: 'https://github.com/cybertarr-A/Image-Generator',
        bgClass: 'bg-swirl'
    },
    {
        id: 13,
        title: 'Hacker AI Assistant',
        category: 'Cybersecurity',
        description: 'AI system scraping vulnerability data, classifying exploits with custom neural networks for bug bounty automation.',
        tech: ['Python', 'Neural Networks', 'Security', 'AI'],
        link: 'https://github.com/cybertarr-A/CyberWarriorV1',
        bgClass: 'bg-matrix'
    },
    {
        id: 14,
        title: 'Subreddit Analyzer',
        category: 'Analytics',
        description: 'Python analytics tool examining subreddit activity, user engagement, and trending topics for marketing insights.',
        tech: ['Python', 'Data Analysis', 'Marketing'],
        link: 'https://github.com/cybertarr-A/Subreddit-analyzer.git',
        bgClass: 'bg-pulse'
    },
    {
        id: 15,
        title: 'Instagram Follower Scraper',
        category: 'Scraping',
        description: 'n8n workflow collecting follower data from public Instagram accounts for analytics.',
        tech: ['n8n', 'Automation', 'Instagram API'],
        link: 'https://github.com/cybertarr-A/instagram-scraper-workflow',
        bgClass: 'bg-swirl'
    },
    {
        id: 16,
        title: 'Pinterest Image Downloader',
        category: 'Scraping',
        description: 'Automation tool scraping and downloading images from Pinterest boards for content curation.',
        tech: ['n8n', 'Web Scraping', 'Pinterest'],
        link: 'https://github.com/cybertarr-A/Pin-interest-data-scraper',
        bgClass: 'bg-matrix'
    }
];

const ProjectCard = ({ project }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`project-card ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
        >
            <div className="card-inner">
                <div className={`card-front ${project.bgClass}`}>
                    <div className="card-content">
                        <h3>{project.title}</h3>
                        <span className="category">{project.category}</span>
                        <div className="click-hint">CLICK TO ACCESS DATA</div>
                    </div>
                    <div className="holo-overlay"></div>
                </div>
                <div className="card-back">
                    <div className="card-content">
                        <h3>DETAILS_</h3>
                        <p>{project.description}</p>
                        <div className="tech-stack">
                            {project.tech.map(t => <span key={t}>{t}</span>)}
                        </div>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="access-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            INITIATE PROTOCOL
                        </a>
                    </div>
                    <div className="holo-overlay"></div>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <h2 className="section-title">PROJECT ARCHIVES</h2>
            <div className="projects-grid">
                {projectsData.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
