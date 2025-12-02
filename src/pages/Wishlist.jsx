import { useNavigate, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <h1>My Wishlist</h1>
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <button onClick={() => navigate('/')} className="shop-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>My Wishlist</h1>
        <div className="wishlist-content">
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <Link to={`/product/${item.id}`} className="wishlist-item-link">
                  <div className="wishlist-item-image">
                    {item.image && (item.image.startsWith('http://') || item.image.startsWith('https://')) ? (
                      <img src={item.image} alt={item.name} className="wishlist-item-img" />
                    ) : (
                      <span className="product-emoji">{item.image}</span>
                    )}
                  </div>
                </Link>
                <div className="wishlist-item-info">
                  <Link to={`/product/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p className="wishlist-item-category">{item.category}</p>
                  <p className="wishlist-item-price">₹{item.price.toFixed(2)}</p>
                  {item.originalPrice && (
                    <p className="wishlist-item-original-price">₹{item.originalPrice.toFixed(2)}</p>
                  )}
                </div>
                <div className="wishlist-item-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button className="clear-wishlist-btn" onClick={clearWishlist}>
              Clear Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

