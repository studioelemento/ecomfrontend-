import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { categories } from '../data/groceryData';
import './Header.css';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get current category from URL
  const currentCategory = searchParams.get('category') || 'All';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoriesDropdown(false);
      }
    };

    if (showCategoriesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoriesDropdown]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/');
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
    setShowCategoriesDropdown(false);
    // Scroll to products section if on home page
    if (location.pathname === '/') {
      setTimeout(() => {
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <Link to="/" className="logo">
              <span className="logo-icon">🛒</span>
              <div className="logo-text">
                <span className="logo-main">CARTNET</span>
                <span className="logo-sub">Online Shopping</span>
              </div>
            </Link>
            
            <form className="header-search" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search for items..." 
                className="search-input-header"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>

            <div className="header-right">
              <div className="header-actions">
                <div className="header-action-item">
                  <span className="action-icon">📍</span>
                  <span className="action-text">All</span>
                </div>
                <div className="header-action-item">
                  <span className="action-icon">❤️</span>
                  <span className="action-text">Wishlist</span>
                  <span className="action-badge">0</span>
                </div>
                <Link to="/cart" className="header-action-item cart-link">
                  <span className="action-icon">🛒</span>
                  <span className="action-text">Cart</span>
                  {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
                </Link>
                <button className="sign-in-btn">Sign In</button>
              </div>
              
              <div className="support-info">
                <span className="support-icon">📞</span>
                <div>
                  <div className="support-number">1900-888</div>
                  <div className="support-text">24/7 Support Center</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-nav">
        <div className="container">
          <div className="categories-dropdown-wrapper" ref={dropdownRef}>
            <button 
              className="browse-categories-btn"
              onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
              onMouseEnter={() => setShowCategoriesDropdown(true)}
            >
              <span className="grid-icon">☰</span>
              Browse All Categories
              <span className={`dropdown-icon ${showCategoriesDropdown ? 'open' : ''}`}>▼</span>
            </button>
            {showCategoriesDropdown && (
              <div 
                className="categories-dropdown"
                onMouseLeave={() => setShowCategoriesDropdown(false)}
              >
                <button
                  className="category-dropdown-item"
                  onClick={() => handleCategoryClick('All')}
                >
                  View All Categories
                </button>
                {categories.filter(c => c !== 'All').map(category => (
                  <button
                    key={category}
                    className="category-dropdown-item"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <nav className="main-nav">
            <button 
              className={`nav-link ${currentCategory === 'All' ? 'active' : ''}`}
              onClick={() => {
                navigate('/');
                handleCategoryClick('All');
              }}
            >
              Home
            </button>
            {categories.filter(c => c !== 'All').slice(0, 6).map(category => (
              <button
                key={category}
                className={`nav-link ${currentCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
                <span className="dropdown-icon">▼</span>
              </button>
            ))}
            <Link to="/" className="nav-link">Shop <span className="dropdown-icon">▼</span></Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
