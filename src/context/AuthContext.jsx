import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('currentUser');
        
        if (savedToken && savedUser) {
            setToken(savedToken);
            setCurrentUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // Save to localStorage when user/token changes
    useEffect(() => {
        if (token && currentUser) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
        }
    }, [token, currentUser]);

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setToken(data.token);
                setCurrentUser(data.user);
                return { success: true, message: 'Login successful!' };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setToken(data.token);
                setCurrentUser(data.user);
                return { success: true, message: 'Registration successful!' };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (err) {
            console.error('Registration error:', err);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const loginWithSocial = async (provider, socialData) => {
        try {
            const res = await fetch('/api/auth/social', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ provider, ...socialData })
            });

            const data = await res.json();

            if (res.ok) {
                setToken(data.token);
                setCurrentUser(data.user);
                return { success: true, message: `Successfully logged in with ${provider}` };
            } else {
                return { success: false, message: data.message || 'Social login failed' };
            }
        } catch (err) {
            console.error('Social login error:', err);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const logout = () => {
        setToken(null);
        setCurrentUser(null);
    };

    const promoteUser = async (userId, newRole) => {
        try {
            const res = await fetch(`/api/auth/promote/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            const data = await res.json();

            if (res.ok) {
                return { success: true, message: `User promoted to ${newRole}` };
            } else {
                return { success: false, message: data.message || 'Failed to promote user' };
            }
        } catch (err) {
            console.error('Promotion error:', err);
            return { success: false, message: 'Network error' };
        }
    };

    // Permission checks
    const canEditContent = currentUser?.role === 'admin' || currentUser?.role === 'owner';
    const canManageRoles = currentUser?.role === 'owner';

    const value = {
        currentUser,
        token,
        login,
        register,
        loginWithSocial,
        logout,
        promoteUser,
        canEditContent,
        canManageRoles,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
