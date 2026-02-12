import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDropdown.css';

const CartDropdown = ({ isOpen, onClose }) => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="cart-dropdown-overlay" onClick={onClose}></div>

            {/* Cart Panel */}
            <div className={`cart-dropdown ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="cart-dropdown-header">
                    <div>
                        <h3 className="cart-dropdown-title">Shopping Cart</h3>
                        <p className="cart-dropdown-location">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                    <button className="cart-dropdown-close" onClick={onClose} aria-label="Close cart">
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div className="cart-dropdown-items">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <div className="empty-icon">🛒</div>
                            <p>Your cart is empty</p>
                            <button className="continue-shopping-btn-empty" onClick={onClose}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-dropdown-item">
                                <img
                                    src={item.image?.startsWith('http') ? item.image : '/placeholder.png'}
                                    alt={item.name}
                                    className="cart-dropdown-item-image"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <div className="cart-dropdown-item-details">
                                    <h4 className="cart-dropdown-item-name">{item.name}</h4>
                                    <p className="cart-dropdown-item-weight">{item.weight || item.category || '500g'}</p>

                                    <div className="cart-dropdown-item-footer">
                                        <div className="quantity-controls-dropdown">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="cart-dropdown-item-price">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="cart-dropdown-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    title="Remove"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="cart-dropdown-footer">
                        <div className="cart-dropdown-total">
                            <span>Subtotal:</span>
                            <span className="total-amount">₹{getCartTotal().toFixed(2)}</span>
                        </div>
                        <Link to="/cart" className="view-cart-btn" onClick={onClose}>
                            View Cart
                        </Link>
                        <button
                            className="checkout-btn-dropdown"
                            onClick={() => {
                                onClose();
                                window.location.href = '/checkout';
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDropdown;
