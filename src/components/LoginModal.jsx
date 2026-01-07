import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, LogIn, UserPlus } from 'lucide-react';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
    const { login, register, loginWithSocial } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!formData.email) {
            setError('Please enter your email address');
            return;
        }

        // Mock forgot password - in production, this would send an email
        setSuccessMessage('Password reset link sent to your email!');
        setTimeout(() => {
            setIsForgotPassword(false);
            setSuccessMessage('');
        }, 3000);
    };

    const handleSocialLogin = async (provider) => {
        // Mock data for social login
        const mockData = {
             name: `${provider} User`,
             email: `user_${Date.now()}@${provider.toLowerCase()}.com`
        };

        const res = await loginWithSocial(provider, mockData);
        if (res.success) {
            onClose();
        } else {
            setError(res.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let res;
        if (isRegistering) {
            res = await register(formData.name, formData.email, formData.password);
            if (res.success) {
                // Initial auto-login after register or just switch to login
                res = await login(formData.email, formData.password);
            }
        } else {
            res = await login(formData.email, formData.password);
        }

        if (res.success) {
            onClose();
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-fade-in">
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <div className="modal-icon">
                        <User size={32} />
                    </div>
                    <h2>{isForgotPassword ? 'Reset Password' : isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
                    <p>{isForgotPassword ? 'Enter your email to receive reset link' : isRegistering ? 'Join Bharat Super Bazar' : 'Login to your account'}</p>
                </div>

                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
                {successMessage && <div style={{ color: 'green', textAlign: 'center', marginBottom: '1rem' }}>{successMessage}</div>}

                {isForgotPassword ? (
                    <form onSubmit={handleForgotPassword}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Send Reset Link
                        </button>
                    </form>
                ) : (
                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        {isRegistering ? <><UserPlus size={18} /> Register</> : <><LogIn size={18} /> Login</>}
                    </button>

                    {!isRegistering && (
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button
                                type="button"
                                onClick={() => setIsForgotPassword(true)}
                                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}
                </form>
                )}

                <div className="social-login-container">
                    <div className="divider">Or continue with</div>
                    <button type="button" className="social-btn google" onClick={() => handleSocialLogin('Google')}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="social-icon" />
                        Google
                    </button>
                    <button type="button" className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
                        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="social-icon" />
                        Facebook
                    </button>
                </div>

                {!isForgotPassword && (
                <div className="social-login-container">
                    <div className="divider">Or continue with</div>
                    <button type="button" className="social-btn google" onClick={() => handleSocialLogin('Google')}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="social-icon" />
                        Google
                    </button>
                    <button type="button" className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
                        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="social-icon" />
                        Facebook
                    </button>
                </div>
                )}

                <div className="modal-footer">
                    {isForgotPassword ? (
                        <button
                            onClick={() => { setIsForgotPassword(false); setError(''); setSuccessMessage(''); }}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Back to Login
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
