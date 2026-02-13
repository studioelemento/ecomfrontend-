import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { categories } from '../data/groceryData';
import CartDropdown from './CartDropdown';
import MobileMenu from './MobileMenu';
import LoginModal from './LoginModal';
import './Header.css';
import StoreSelector from './StoreSelector';
// Import your logo image - replace this path with your actual logo file location
// Option 1: If logo is in public folder, use: const logoImage = '/logo.png';
// Option 2: If logo is in src/assets, use: import logoImage from '../assets/images/logo.png';
const logoImage = '/logo.png'; // Change this path to match your logo file location

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const cartCount = getCartItemsCount();
  const wishlistCount = getWishlistCount();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
              <img
                src={logoImage}
                alt="CARTNET Logo"
                className="logo-image"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="logo-text-fallback" style={{ display: 'none' }}>
                <span className="logo-main">CARTNET</span>
                <span className="logo-sub">Online Shopping</span>
              </div>
            </Link>

            {/* Store Selector */}
            <StoreSelector />


            {/* <form className="header-search" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search for items..." 
                className="search-input-header"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">🔍</button>
            </form> */}

            <div className="header-right">
              <div className="header-actions">
                <Link to="/wishlist" className="header-action-item">
                  <span className="action-icon">❤️</span>
                  <span className="action-text">Wishlist</span>
                  {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
                </Link>
                <button
                  className="header-action-item cart-link"
                  onClick={() => setIsCartDropdownOpen(true)}
                >
                  <span className="action-icon">🛒</span>
                  <span className="action-text">Cart</span>
                  {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
                </button>
                <button
                  className="sign-in-btn"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Sign In
                </button>
              </div>

              <div className="support-info hidden md:flex">
                <span className="support-icon">📞</span>
                <div>
                  <div className="support-number">1900-888</div>
                  <div className="support-text">24/7 Support Center</div>
                </div>
              </div>
            </div>

            <button
              className="header-action-item mobile-menu-btn"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="action-icon">☰</span>
            </button>
          </div>
        </div>
      </div>

      <div className="header-nav hidden md:block">
        <div className="container">
          <div className="categories-dropdown-wrapper" ref={dropdownRef}>
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

      {/* Cart Dropdown */}
      <CartDropdown
        isOpen={isCartDropdownOpen}
        onClose={() => setIsCartDropdownOpen(false)}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};

export default Header;
