import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { groceryProducts } from '../data/groceryData';
import { useWishlist } from '../context/WishlistContext';
import './Slider.css';

const Slider = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  // Get featured products (first 5 products with discounts or high ratings)
  const featuredProducts = groceryProducts
    .filter(p => p.originalPrice || p.rating >= 4.5)
    .slice(0, 5);

  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
      setProgress(0);
    }, 2000); // Auto-slide every 2 seconds

    // Progress bar animation
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 5; // Update every 100ms (2000ms / 20 = 100ms per 5%)
      });
    }, 100);

    return () => {
      clearInterval(timer);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [featuredProducts.length, isPaused]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    setProgress(0);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    setProgress(0);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [featuredProducts.length]);

  if (featuredProducts.length === 0) return null;

  return (
    <div 
      className="slider-container"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slider-progress-bar">
        <div 
          className="slider-progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="slider-wrapper">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`slide ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'prev' : ''} ${index > currentSlide ? 'next' : ''}`}
            style={{ 
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              opacity: index === currentSlide ? 1 : 0
            }}
          >
            <div className="slide-background-overlay"></div>
            <div className="slide-content">
              <div className="slide-image">
                <div className="slide-image-wrapper">
                  {product.image && (product.image.startsWith('http://') || product.image.startsWith('https://')) ? (
                    <img src={product.image} alt={product.name} className="slide-img" />
                  ) : (
                    <span className="slide-emoji">{product.image}</span>
                  )}
                  {product.originalPrice && (
                    <span className="slide-discount">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
              <div className="slide-info">
                <div className="slide-badge">Featured Product</div>
                <h2 className="slide-title">{product.name}</h2>
                <p className="slide-category">{product.category}</p>
                <p className="slide-description">{product.description}</p>
                <div className="slide-rating">
                  <div className="stars-container">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''} ${i === Math.floor(product.rating) && product.rating % 1 !== 0 ? 'half' : ''}`}>★</span>
                    ))}
                  </div>
                  <span className="rating-text">{product.rating}</span>
                  <span className="reviews">({product.reviews} reviews)</span>
                </div>
                <div className="slide-price">
                  <span className="current-price">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="slide-actions">
                  <Link to={`/product/${product.id}`} className="slide-btn primary">
                    <span>Shop Now</span>
                  </Link>
                  <button 
                    className={`slide-btn secondary ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                  >
                    <span>{isInWishlist(product.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button className="slider-btn prev" onClick={goToPrevious} aria-label="Previous slide">
          <span className="btn-icon">‹</span>
        </button>
        <button className="slider-btn next" onClick={goToNext} aria-label="Next slide">
          <span className="btn-icon">›</span>
        </button>
      </div>
      
      <div className="slider-controls">
        <div className="slider-dots">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="slider-counter">
          <span className="current-slide">{currentSlide + 1}</span>
          <span className="divider">/</span>
          <span className="total-slides">{featuredProducts.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Slider;
