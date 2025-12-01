import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';
import FeaturedCategories from '../components/FeaturedCategories';
import { groceryProducts, categories } from '../data/groceryData';
import './Home.css';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    if (search) {
      setSearchTerm(search);
    } else {
      setSearchTerm('');
    }
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const filteredProducts = groceryProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home">
      <section className="slider-section">
        <Slider />
      </section>

      <FeaturedCategories />

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Popular Products</h2>
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  if (category === 'All') {
                    setSearchParams({});
                  } else {
                    setSearchParams({ category });
                  }
                }}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>No products found. Try a different search or category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
