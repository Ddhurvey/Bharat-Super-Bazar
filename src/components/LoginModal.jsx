import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, LogIn, UserPlus } from 'lucide-react';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
    const { login, register } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

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
                    <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
                    <p>{isRegistering ? 'Join Bharat Super Bazar' : 'Login to your account'}</p>
                </div>

                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

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
                </form>

                <div className="modal-footer">
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
