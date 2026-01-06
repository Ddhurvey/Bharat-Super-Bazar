import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ShoppingBag, User, LogOut, Shield, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import AdminPanel from './AdminPanel';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const { currentUser, logout, canManageRoles } = useAuth();
    const { getCartCount, setIsCartOpen } = useCart();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <header className="navbar-container">
                {/* Top Bar */}
                <div className="top-bar">
                    <div className="container top-bar-content">
                        <div className="contact-info">
                            <a href="tel:9816673077" className="contact-item">
                                <Phone size={14} />
                                <span>98166-73077 (Vijay K.)</span>
                            </a>
                            <span className="divider">|</span>
                            <a href="https://goo.gl/maps/placeholder" target="_blank" rel="noopener noreferrer" className="contact-item">
                                <MapPin size={14} />
                                <span>Kotwali Bazar, Dharamshala</span>
                            </a>
                        </div>
                        <div className="user-actions">
                            <button 
                                className="cart-btn" 
                                onClick={() => setIsCartOpen(true)}
                                title="Shopping Cart"
                            >
                                <ShoppingCart size={20} />
                                {getCartCount() > 0 && (
                                    <span className="cart-badge">{getCartCount()}</span>
                                )}
                            </button>
                            {currentUser ? (
                                <div className="user-profile">
                                    <span className="user-greeting">Hi, {currentUser.name.split(' ')[0]}</span>
                                    {canManageRoles && (
                                        <button
                                            className="icon-btn"
                                            onClick={() => setShowAdminPanel(true)}
                                            title="Admin Management"
                                        >
                                            <Shield size={16} />
                                        </button>
                                    )}
                                    <button className="icon-btn" onClick={logout} title="Logout">
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            ) : (
                                <button className="login-link" onClick={() => setShowLogin(true)}>
                                    <User size={14} /> Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="main-nav container">
                    <Link to="/" className="logo">
                        <ShoppingBag className="logo-icon" size={32} />
                        <div className="logo-text">
                            <span className="brand-name">Bharat Super Bazar</span>
                            <span className="brand-tagline">Family Shopping Destination</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="nav-links desktop-only">
                        <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
                        <li><NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink></li>
                        {canManageRoles && (
                            <li><NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink></li>
                        )}
                        <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About Us</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink></li>
                    </ul>

                    <div className="mobile-menu-btn" onClick={toggleMenu}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    <ul className="mobile-nav-links">
                        <li onClick={toggleMenu}><Link to="/">Home</Link></li>
                        <li onClick={toggleMenu}><Link to="/products">Products</Link></li>
                        <li onClick={toggleMenu}><Link to="/about">About Us</Link></li>
                        <li onClick={toggleMenu}><Link to="/contact">Contact</Link></li>
                        {currentUser ? (
                            <li onClick={() => { logout(); toggleMenu(); }} className="mobile-auth-link">Logout ({currentUser.name})</li>
                        ) : (
                            <li onClick={() => { setShowLogin(true); toggleMenu(); }} className="mobile-auth-link">Login</li>
                        )}
                    </ul>
                </div>
            </header>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
        </>
    );
};

export default Navbar;
