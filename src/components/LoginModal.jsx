import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { GOOGLE_CLIENT_ID } from '../config/api';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
    const { login, register, loginWithGoogle } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');
        
        const res = await loginWithGoogle(credentialResponse);
        
        setLoading(false);
        
        if (res.success) {
            onClose();
        } else {
            setError(res.message);
        }
    };

    const handleGoogleError = () => {
        setError('Google sign-in failed. Please try again.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (isRegistering && !formData.name.trim()) {
            setError('Please enter your name');
            setLoading(false);
            return;
        }

        if (!formData.email.trim()) {
            setError('Please enter your email');
            setLoading(false);
            return;
        }

        if (!formData.password || formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        let res;
        if (isRegistering) {
            res = await register(formData.name, formData.email, formData.password);
        } else {
            res = await login(formData.email, formData.password);
        }

        setLoading(false);

        if (res.success) {
            onClose();
        } else {
            setError(res.message);
        }
    };

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setError('');
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={onClose} aria-label="Close">
                        <X size={20} />
                    </button>

                    <div className="modal-header">
                        <div className="modal-logo">B</div>
                        <h2>{isRegistering ? 'Create your account' : 'Welcome back'}</h2>
                        <p>{isRegistering ? 'Sign up to get started with Bharat Super Bazar' : 'Sign in to your account'}</p>
                    </div>

                    <div className="modal-body">
                        {error && (
                            <div className="message error">
                                <span>⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Google Sign-In */}
                        <div className="google-signin-container">
                            <div className="google-signin-wrapper">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    useOneTap
                                    text={isRegistering ? 'signup_with' : 'signin_with'}
                                    shape="rectangular"
                                    theme="outline"
                                    size="large"
                                    width="100%"
                                />
                            </div>
                        </div>

                        <div className="divider">OR</div>

                        {/* Email/Password Form */}
                        <form className="login-form" onSubmit={handleSubmit}>
                            {isRegistering && (
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={loading}
                                        autoComplete="name"
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={loading}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder={isRegistering ? 'Create a password (min. 6 characters)' : 'Enter your password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    disabled={loading}
                                    autoComplete={isRegistering ? 'new-password' : 'current-password'}
                                />
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span>Please wait...</span>
                                    </>
                                ) : (
                                    <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="modal-footer">
                        {isRegistering ? (
                            <>
                                Already have an account?{' '}
                                <button className="link-btn" onClick={toggleMode} disabled={loading}>
                                    Sign in
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <button className="link-btn" onClick={toggleMode} disabled={loading}>
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginModal;
