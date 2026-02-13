import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories } from '../data/groceryData';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const currentCategory = searchParams.get('category') || 'All';

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm)}`);
            onClose();
        }
    };

    const handleCategoryClick = (category) => {
        if (category === 'All') {
            navigate('/');
        } else {
            navigate(`/?category=${encodeURIComponent(category)}`);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="mobile-menu-overlay" onClick={onClose}></div>

            {/* Mobile Menu Panel */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="mobile-menu-header">
                    <h3>Menu</h3>
                    <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
                        ✕
                    </button>
                </div>

                {/* Search Section */}
                <div className="mobile-menu-section">
                    <h4 className="mobile-menu-section-title">Search Products</h4>
                    <form onSubmit={handleSearch} className="mobile-search-form">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mobile-search-input"
                        />
                        <button type="submit" className="mobile-search-btn">
                            🔍
                        </button>
                    </form>
                </div>



                {/* Categories Section */}
                <div className="mobile-menu-section">
                    <h4 className="mobile-menu-section-title">Categories</h4>
                    <div className="mobile-categories-list">
                        <button
                            className={`mobile-category-item ${currentCategory === 'All' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('All')}
                        >
                            <span className="category-icon">🏪</span>
                            <span>All Products</span>
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`mobile-category-item ${currentCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <span className="category-icon">
                                    {category === 'Wellness Products' && '💊'}
                                    {category === 'Home Care Products' && '🧹'}
                                    {category === 'Herbal Products' && '🌿'}
                                    {category === 'Personal Care Products' && '🧴'}
                                    {category === 'Health & Fitness' && '💪'}
                                    {!['Wellness Products', 'Home Care Products', 'Herbal Products', 'Personal Care Products', 'Health & Fitness'].includes(category) && '📦'}
                                </span>
                                <span>{category}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Support Center Section */}
                <div className="mobile-menu-section support-section mt-auto">
                    <a href="tel:1900888" className="mobile-support-link">
                        <span className="support-icon-mobile">📞</span>
                        <div className="support-details">
                            <div className="support-number-mobile">1900-888</div>
                            <div className="support-text-mobile">24/7 Support Center</div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
