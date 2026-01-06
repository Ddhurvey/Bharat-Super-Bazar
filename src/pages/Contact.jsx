import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-header">
                <div className="container">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">We'd love to hear from you. Visit us or give us a call.</p>
                </div>
            </div>

            <div className="container section">
                <div className="contact-container">
                    {/* Contact Info */}
                    <div className="contact-info-card">
                        <h2>Get In Touch</h2>

                        <div className="info-item">
                            <MapPin className="info-icon" />
                            <div>
                                <h3>Our Location</h3>
                                <p>Kotwali Bazar, Dharamshala,<br /> Distt. Kangra (H.P.)</p>
                                <a href="https://goo.gl/maps/placeholder" target="_blank" rel="noopener noreferrer" className="link-action">Get Directions</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <Phone className="info-icon" />
                            <div>
                                <h3>Phone Numbers</h3>
                                <div className="phone-list">
                                    <p><span>Vijay K. (R):</span> <a href="tel:9816673077">98166-73077</a></p>
                                    <p><span>Vijay K. (R):</span> <a href="tel:9816142643">98161-42643</a></p>
                                    <p><span>Balram K. (M):</span> <a href="tel:9805292520">98052-92520</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="info-item">
                            <Clock className="info-icon" />
                            <div>
                                <h3>Opening Hours</h3>
                                <p>Open All Days</p>
                                <p>9:00 AM - 9:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-card">
                        <h2>Send us a Message</h2>
                        <form className="form-grid">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="Your Phone Number" required />
                            </div>
                            <div className="form-group">
                                <label>Email (Optional)</label>
                                <input type="email" placeholder="Your Email" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="4" placeholder="How can we help you?" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="map-section section">
                    <iframe
                        title="Google Map"
                        className="map-frame"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.987747761073!2d76.323!3d32.219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDEzJzA4LjQiTiA3NsKwMTknMjIuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
