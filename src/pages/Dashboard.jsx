import React, { useState, useEffect } from 'react';
import { 
    ShoppingBag, 
    Package, 
    DollarSign, 
    TrendingUp, 
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    Edit,
    Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { token, canEditContent } = useAuth();
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalRevenue: 0
    });
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (canEditContent) {
            fetchDashboardData();
        }
    }, [canEditContent]);

    const fetchDashboardData = async () => {
        try {
            // Fetch stats
            const statsRes = await fetch('/api/orders/stats/summary', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }

            // Fetch recent orders
            const ordersRes = await fetch('/api/orders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (ordersRes.ok) {
                const ordersData = await ordersRes.json();
                setOrders(ordersData.slice(0, 10)); // Latest 10 orders
            }

            // Fetch products
            const productsRes = await fetch('/api/products');
            if (productsRes.ok) {
                const productsData = await productsRes.json();
                setProducts(productsData);
            }

            setLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                fetchDashboardData(); // Refresh data
            }
        } catch (err) {
            console.error('Error updating order:', err);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { class: 'badge-warning', icon: Clock, text: 'Pending' },
            confirmed: { class: 'badge-info', icon: CheckCircle, text: 'Confirmed' },
            processing: { class: 'badge-primary', icon: Package, text: 'Processing' },
            completed: { class: 'badge-success', icon: CheckCircle, text: 'Completed' },
            cancelled: { class: 'badge-danger', icon: XCircle, text: 'Cancelled' }
        };
        const badge = badges[status] || badges.pending;
        const Icon = badge.icon;
        return (
            <span className={`status-badge ${badge.class}`}>
                <Icon size={14} />
                {badge.text}
            </span>
        );
    };

    if (!canEditContent) {
        return (
            <div className="dashboard-page">
                <div className="access-denied">
                    <XCircle size={64} />
                    <h2>Access Denied</h2>
                    <p>You need admin privileges to access the dashboard.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your store, orders, and products</p>
            </div>

            <div className="container">
                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <ShoppingBag size={32} />
                        </div>
                        <div className="stat-details">
                            <h3>{stats.totalOrders}</h3>
                            <p>Total Orders</p>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <Clock size={32} />
                        </div>
                        <div className="stat-details">
                            <h3>{stats.pendingOrders}</h3>
                            <p>Pending Orders</p>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <CheckCircle size={32} />
                        </div>
                        <div className="stat-details">
                            <h3>{stats.completedOrders}</h3>
                            <p>Completed</p>
                        </div>
                    </div>

                    <div className="stat-card stat-revenue">
                        <div className="stat-icon">
                            <DollarSign size={32} />
                        </div>
                        <div className="stat-details">
                            <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="dashboard-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Recent Orders
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="tab-content">
                        <div className="overview-grid">
                            <div className="overview-card">
                                <h3>Quick Stats</h3>
                                <div className="quick-stats">
                                    <div className="quick-stat">
                                        <span className="label">Total Products:</span>
                                        <span className="value">{products.length}</span>
                                    </div>
                                    <div className="quick-stat">
                                        <span className="label">Average Order Value:</span>
                                        <span className="value">
                                            ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
                                        </span>
                                    </div>
                                    <div className="quick-stat">
                                        <span className="label">Completion Rate:</span>
                                        <span className="value">
                                            {stats.totalOrders > 0 ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="tab-content">
                        <div className="orders-table-container">
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="no-data">No orders yet</td>
                                        </tr>
                                    ) : (
                                        orders.map(order => (
                                            <tr key={order._id}>
                                                <td className="order-number">{order.orderNumber}</td>
                                                <td>
                                                    <div className="customer-info">
                                                        <strong>{order.customerName}</strong>
                                                        <small>{order.customerPhone}</small>
                                                    </div>
                                                </td>
                                                <td>{order.items.length} items</td>
                                                <td className="amount">₹{order.totalAmount}</td>
                                                <td>{getStatusBadge(order.status)}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <select 
                                                            value={order.status}
                                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                            className="status-select"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="processing">Processing</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="tab-content">
                        <div className="products-grid-dashboard">
                            {products.map(product => (
                                <div key={product._id} className="product-card-dashboard">
                                    <img src={product.image} alt={product.name} />
                                    <div className="product-info-dashboard">
                                        <h4>{product.name}</h4>
                                        <p className="product-price-dashboard">₹{product.price}</p>
                                        <span className="product-category-badge">{product.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
