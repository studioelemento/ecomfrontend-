import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CARTNET</h3>
            <p>Your one-stop shop for fresh, quality groceries delivered to your door.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li>Fruits & Vegetables</li>
              <li>Dairy Products</li>
              <li>Meat & Seafood</li>
              <li>Bakery Items</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CARTNET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
