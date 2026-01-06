import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container footer-content">
                <div className="footer-column">
                    <Link to="/" className="footer-logo">
                        <ShoppingBag size={24} />
                        <span>Bharat Super Bazar</span>
                    </Link>
                    <p className="footer-tagline">Your Family's One-Stop Shop in Dharamshala.</p>
                    <div className="address-box">
                        <p>Kotwali Bazar, Dharamshala</p>
                        <p>Distt. Kangra (H.P.)</p>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <ul className="footer-contact-list">
                        <li>Vijay K. (R): 98166-73077</li>
                        <li>Vijay K. (R): 98161-42643</li>
                        <li>Balram K. (M): 98052-92520</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                        <a href="#" className="social-icon"><Twitter size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Bharat Super Bazar. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
