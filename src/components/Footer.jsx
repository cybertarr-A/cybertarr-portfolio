import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="#" className="social-icon">GITHUB</a>
                    <a href="#" className="social-icon">TWITTER / X</a>
                </div>
                <p className="copyright">© 2025 CYBERTARR-A SYSTEMS. ALL RIGHTS RESERVED.</p>
            </div>
            <div className="scan-line"></div>
        </footer>
    );
};

export default Footer;
