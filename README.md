# Fresh Groceries - E-Commerce Website

A complete React-based e-commerce website for grocery shopping with a modern, beautiful UI.

## Features

- 🛒 **Product Catalog**: Browse through various grocery categories (Fruits, Vegetables, Dairy, Bakery, Meat & Seafood, Pantry)
- 🔍 **Search & Filter**: Search products by name and filter by category
- 🛍️ **Shopping Cart**: Add items to cart, update quantities, and manage your shopping list
- 📦 **Product Details**: View detailed information about each product
- 💳 **Checkout**: Complete checkout process with shipping information and payment options
- 💾 **Local Storage**: Cart data persists in browser local storage
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
testEcom/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── context/         # React Context for state management
│   │   └── CartContext.jsx
│   ├── data/           # Product data
│   │   └── groceryData.js
│   ├── App.jsx         # Main app component
│   ├── App.css         # Global styles
│   └── main.jsx        # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern CSS features

## Grocery Categories

- Fruits (Apples, Bananas, Oranges, Strawberries, etc.)
- Vegetables (Carrots, Broccoli, Tomatoes, Spinach, etc.)
- Dairy (Milk, Yogurt, Cheese, Butter, Eggs)
- Bakery (Bread, Croissants, Bagels)
- Meat & Seafood (Chicken, Salmon, Ground Beef)
- Pantry (Olive Oil, Pasta, Rice, Honey)

## Features in Detail

### Shopping Cart
- Add/remove items
- Update quantities
- View total price
- Persistent cart (saved in localStorage)

### Product Features
- Product images (emoji-based for simplicity)
- Ratings and reviews
- Price with discount badges
- Stock status
- Category filtering

### Checkout Process
- Shipping information form
- Payment method selection
- Order summary
- Order confirmation

## Customization

You can easily customize the grocery products by editing `src/data/groceryData.js`. Add more products, categories, or modify existing ones.

## License

This project is open source and available for personal and commercial use.
