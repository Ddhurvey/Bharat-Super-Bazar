import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, MapPin, ArrowRight, ShieldCheck, Smile, Gift, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content container animate-fade-in">
                    <span className="hero-badge">Welcome to Bharat Super Bazar</span>
                    <h1 className="hero-title">
                        Style & Quality for <span className="highlight-text">Every Family</span>
                    </h1>
                    <p className="hero-tagline">
                        Discover the latest trends in garments, school uniforms, and accessories.
                        Quality you trust, at prices you love.
                    </p>
                    <div className="hero-cta">
                        <Link to="/products" className="btn btn-primary">Shop Collections</Link>
                        <Link to="/contact" className="btn btn-outline">Visit Store</Link>
                    </div>
                </div>
                {/* Decorative Background Elements */}
                <div className="hero-shape shape-1"></div>
                <div className="hero-shape shape-2"></div>
            </section>

            {/* Key Highlights */}
            <section className="highlights-bar">
                <div className="container highlights-grid">
                    <div className="highlight-item">
                        <ShoppingBag className="highlight-icon" />
                        <div>
                            <span className="highlight-title">Wide Variety</span>
                            <span className="highlight-desc">Fashion for All Ages</span>
                        </div>
                    </div>
                    <div className="highlight-item">
                        <ShieldCheck className="highlight-icon" />
                        <div>
                            <span className="highlight-title">Premium Quality</span>
                            <span className="highlight-desc">Trusted Brands</span>
                        </div>
                    </div>
                    <div className="highlight-item">
                        <Smile className="highlight-icon" />
                        <div>
                            <span className="highlight-title">Family Owned</span>
                            <span className="highlight-desc">Serving Since 1990</span>
                        </div>
                    </div>
                    <div className="highlight-item">
                        <MapPin className="highlight-icon" />
                        <div>
                            <span className="highlight-title">Prime Location</span>
                            <span className="highlight-desc">Kotwali Bazar</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="section featured-categories">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Curated Collections</h2>
                        <p className="section-subtitle">Explore our most popular categories tailored for you</p>
                    </div>

                    <div className="categories-grid">
                        <Link to="/products" className="category-card">
                            <div className="card-image-bg bg-garments">
                                <ShoppingBag size={48} />
                            </div>
                            <div className="card-content">
                                <h3>Readymade Garments</h3>
                                <p>Trendy wear for Men, Women & Kids</p>
                                <span className="card-link">Explore <ArrowRight size={16} /></span>
                            </div>
                        </Link>

                        <Link to="/products" className="category-card">
                            <div className="card-image-bg bg-uniforms">
                                <Star size={48} />
                            </div>
                            <div className="card-content">
                                <h3>School Uniforms</h3>
                                <p>Official uniforms for all local schools</p>
                                <span className="card-link">Order Now <ArrowRight size={16} /></span>
                            </div>
                        </Link>

                        <Link to="/products" className="category-card">
                            <div className="card-image-bg bg-footwear">
                                <Smile size={48} />
                            </div>
                            <div className="card-content">
                                <h3>Footwear</h3>
                                <p>Comfortable Shoes, Chappals & Sandals</p>
                                <span className="card-link">Browse <ArrowRight size={16} /></span>
                            </div>
                        </Link>

                        <Link to="/products" className="category-card">
                            <div className="card-image-bg bg-accessories">
                                <Gift size={48} />
                            </div>
                            <div className="card-content">
                                <h3>Jewellery & Gifts</h3>
                                <p>Elegant cosmetics & gift items</p>
                                <span className="card-link">Discover <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us / Trust Section (New) */}
            <section className="section why-choose-us">
                <div className="container">
                    <div className="feature-box">
                        <div className="feature-text">
                            <h2>Why Bharat Super Bazar?</h2>
                            <p>We believe in building relationships, not just customers. Our legacy in Dharamshala is built on trust, quality, and fair pricing.</p>
                            <ul className="feature-list">
                                <li><Clock size={20} /> Open 7 Days a Week</li>
                                <li><Star size={20} /> Latest Fashion Trends</li>
                                <li><Smile size={20} /> Friendly Customer Service</li>
                            </ul>
                            <Link to="/about" className="btn btn-primary">Read Our Story</Link>
                        </div>
                        <div className="feature-visual">
                            {/* Decorative visual block */}
                            <div className="visual-circle"></div>
                            <div className="visual-content">
                                <h3>1000+</h3>
                                <p>Happy Families Served</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Us Banner */}
            <section className="section visit-banner">
                <div className="container text-center">
                    <h2>Experience It Yourself</h2>
                    <p>Visit our store in Kotwali Bazar, Dharamshala for the best shopping experience.</p>
                    <div className="banner-actions">
                        <a href="https://goo.gl/maps/placeholder" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            Get Directions
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
