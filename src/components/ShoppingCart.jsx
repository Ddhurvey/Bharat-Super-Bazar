import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart as CartIcon, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, isCartOpen, setIsCartOpen, checkout } = useCart();
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [orderSuccess, setOrderSuccess] = useState(null);

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        setShowCheckoutForm(true);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const result = await checkout(customerInfo);
        
        if (result.success) {
            setOrderSuccess(result.orderNumber);
            setCustomerInfo({ name: '', email: '', phone: '', notes: '' });
            setTimeout(() => {
                setShowCheckoutForm(false);
                setOrderSuccess(null);
                setIsCartOpen(false);
            }, 3000);
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>
                        <CartIcon size={24} />
                        Shopping Cart ({getCartCount()})
                    </h2>
                    <button className="cart-close" onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {orderSuccess ? (
                    <div className="order-success">
                        <CheckCircle size={64} />
                        <h3>Order Placed Successfully!</h3>
                        <p>Your order number is: <strong>{orderSuccess}</strong></p>
                        <p>We'll contact you shortly to confirm your order.</p>
                    </div>
                ) : showCheckoutForm ? (
                    <div className="checkout-form-container">
                        <h3>Customer Information</h3>
                        <form onSubmit={handleSubmitOrder} className="checkout-form">
                            <div className="form-field">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-field">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={customerInfo.email}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className="form-field">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                    required
                                    placeholder="98166-73077"
                                />
                            </div>
                            <div className="form-field">
                                <label>Special Instructions (Optional)</label>
                                <textarea
                                    value={customerInfo.notes}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                                    placeholder="Any special requests?"
                                    rows="3"
                                />
                            </div>
                            <div className="cart-total">
                                <span>Total Amount:</span>
                                <span className="total-amount">₹{getCartTotal()}</span>
                            </div>
                            <div className="checkout-buttons">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCheckoutForm(false)}>
                                    Back to Cart
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="cart-empty">
                                    <CartIcon size={64} />
                                    <p>Your cart is empty</p>
                                    <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item._id} className="cart-item">
                                        <img src={item.image} alt={item.name} className="cart-item-image" />
                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p className="cart-item-category">{item.category}</p>
                                            <div className="cart-item-price">
                                                <span className="price">₹{item.price}</span>
                                                {item.originalPrice && (
                                                    <span className="original-price">₹{item.originalPrice}</span>
                                                )}
                                            </div>
                                            <div className="cart-item-actions">
                                                <div className="quantity-controls">
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button 
                                                    className="remove-btn" 
                                                    onClick={() => removeFromCart(item._id)}
                                                    title="Remove from cart"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Total:</span>
                                    <span className="total-amount">₹{getCartTotal()}</span>
                                </div>
                                <button className="btn btn-primary btn-checkout" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
