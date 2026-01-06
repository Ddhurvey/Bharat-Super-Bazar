import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Trash2, Lock, X, Phone, MapPin, ShoppingCart, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Products.css';

const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'garments', name: 'Readymade Garments' },
    { id: 'hosiery', name: 'Hosiery Goods' },
    { id: 'uniforms', name: 'School Uniforms' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'accessories', name: 'Fashion Accessories' },
    { id: 'gifts', name: 'Gift Items' }
];

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const { canEditContent, token } = useAuth();
    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ name: '', price: '', category: 'garments' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
            setLoading(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) return;

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newItem)
            });

            if (res.ok) {
                const addedProduct = await res.json();
                setProducts([addedProduct, ...products]);
                setNewItem({ name: '', price: '', category: 'garments' });
            } else {
                alert('Failed to add product');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to remove this item?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setProducts(products.filter(item => item._id !== id));
            } else {
                alert('Failed to delete product');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filteredProducts = activeCategory === 'all' 
        ? products 
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="products-page animate-fade-in">
            <div className="products-header">
                <div className="container">
                    <h1 className="products-title">Our Collections</h1>
                    <p className="products-subtitle">Explore our wide range of quality products available in-store.</p>
                </div>
            </div>

            <div className="container section">
                {/* Admin Add Product Form */}
                {canEditContent && (
                    <div className="add-item-form animate-fade-in">
                        <h3><Lock size={16} /> Admin Controls: Add Product</h3>
                        <form onSubmit={handleAddItem}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                >
                                    <option value="garments">Garments</option>
                                    <option value="uniforms">Uniforms</option>
                                    <option value="footwear">Footwear</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="hosiery">Hosiery</option>
                                    <option value="gifts">Gifts</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <Plus size={18} /> Add Item
                            </button>
                        </form>
                    </div>
                )}

                {/* Category Filter */}
                <div className="category-filter">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="products-shop-grid">
                    {loading ? (
                        <p className="no-items">Loading products...</p>
                    ) : filteredProducts.length === 0 ? (
                        <p className="no-items">No products found in this category.</p>
                    ) : (
                        filteredProducts.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-image-container">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    {product.originalPrice && (
                                        <span className="discount-badge">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                        </span>
                                    )}
                                    {canEditContent && (
                                        <button
                                            className="delete-product-btn"
                                            onClick={() => handleDeleteItem(product._id)}
                                            title="Remove Product"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={14} 
                                                fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                                                color="#fbbf24"
                                            />
                                        ))}
                                        <span className="rating-text">({product.rating})</span>
                                    </div>
                                    <div className="product-pricing">
                                        <span className="product-price">₹{product.price}</span>
                                        {product.originalPrice && (
                                            <span className="product-original-price">₹{product.originalPrice}</span>
                                        )}
                                    </div>
                                    <button 
                                        className="btn btn-add-to-cart"
                                        onClick={() => addToCart(product)}
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
