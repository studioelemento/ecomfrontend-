import { useNavigate } from 'react-router-dom';
import { categories } from '../data/groceryData';
import './FeaturedCategories.css';

const categoryIcons = {
  'Fruits': '🍎',
  'Vegetables': '🥕',
  'Dairy': '🥛',
  'Bakery': '🍞',
  'Meat & Seafood': '🍗',
  'Pantry': '🛒'
};

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const featuredCats = categories.filter(c => c !== 'All').slice(0, 8);

  const handleCategoryClick = (category) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="featured-categories">
      <div className="container">
        <h2 className="section-title">Featured Categories</h2>
        <div className="categories-grid">
          {featuredCats.map((category) => (
            <div 
              key={category} 
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-icon">
                {categoryIcons[category] || '🛒'}
              </div>
              <div className="category-name">{category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
