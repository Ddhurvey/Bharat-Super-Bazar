import React from 'react';
import { Users, Award, Heart } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="container">
                    <h1 className="about-title">Our Story</h1>
                    <p className="about-subtitle">Serving Families, For Families</p>
                </div>
            </div>

            <div className="container section">
                <div className="about-layout">
                    <div className="about-content">
                        <h2>Welcome to Bharat Super Bazar</h2>
                        <p>
                            Nestled in the heart of Dharamshala at Kotwali Bazar, Bharat Super Bazar has been a cornerstone for local families for years.
                            As a family-owned business, we understand the value of trust, quality, and personal connection.
                        </p>
                        <p>
                            Our journey began with a simple mission: to provide the people of Dharamshala with a one-stop destination for all their daily and special needs.
                            From the finest readymade garments to essential school uniforms and beautiful accessories, we curate our collection with care.
                        </p>

                        <div className="values-grid">
                            <div className="value-item">
                                <Users className="value-icon" />
                                <span>Family Centric</span>
                            </div>
                            <div className="value-item">
                                <Award className="value-icon" />
                                <span>Quality Assured</span>
                            </div>
                            <div className="value-item">
                                <Heart className="value-icon" />
                                <span>Community Love</span>
                            </div>
                        </div>

                        <div className="owners-section">
                            <h3>Meet the Owners</h3>
                            <ul className="owners-list">
                                <li>Vijay K. (R)</li>
                                <li>Vijay K. (R)</li>
                                <li>Balram K. (M)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="about-image-column">
                        <div className="image-placeholder-large">
                            {/* This would be the actual family photo */}
                            <span>Family Photo - "Serving Families, For Families"</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
