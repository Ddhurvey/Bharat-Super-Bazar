import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ShieldAlert } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = ({ onClose }) => {
    const { promoteUser, currentUser, token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/auth/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handlePromote = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const res = await promoteUser(userId, newRole);
        if (res.success) {
            fetchUsers(); // Refresh list
        } else {
            alert(res.message);
        }
    };

    if (currentUser?.role !== 'owner') return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content admin-modal animate-fade-in">
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <div className="modal-icon admin-icon">
                        <ShieldAlert size={32} />
                    </div>
                    <h2>Admin Management</h2>
                    <p>Manage user roles and permissions.</p>
                </div>

                <div className="user-list">
                    {loading ? <p>Loading users...</p> : users.map(user => (
                        <div key={user._id} className="user-list-item">
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </div>
                            <div className="user-actions">
                                {user.role === 'owner' ? (
                                    <span className="badge owner-badge"><Shield size={14} /> Owner</span>
                                ) : (
                                    <button
                                        className={`role-toggle-btn ${user.role === 'admin' ? 'is-admin' : ''}`}
                                        onClick={() => handlePromote(user._id, user.role)}
                                    >
                                        {user.role === 'admin' ? (
                                            <>Revoke Admin</>
                                        ) : (
                                            <>Make Admin</>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="modal-footer">
                    <p>Admins can add/remove products and manage orders but cannot manage other users.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
