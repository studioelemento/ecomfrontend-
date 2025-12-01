import { useParams, useNavigate } from 'react-router-dom';
import { groceryProducts } from '../data/groceryData';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = groceryProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')}>Go back to home</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  return (
    <div className="product-details-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="product-details">
          <div className="product-details-image">
            {product.image && (product.image.startsWith('http://') || product.image.startsWith('https://')) ? (
              <img src={product.image} alt={product.name} className="product-img-large" />
            ) : (
              <span className="product-emoji-large">{product.image}</span>
            )}
            {product.originalPrice && (
              <span className="discount-badge">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
          <div className="product-details-info">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <div className="product-rating">
              <span className="stars">⭐</span>
              <span>{product.rating}</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="product-price-large">
              <span className="current-price">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="stock-status">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            <button
              className="add-to-cart-btn-large"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
