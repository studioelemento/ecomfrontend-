import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;
    const ua = navigator.userAgent;

    const isMobileOrTab =
      width < 1024 ||
      /Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Mobile/i.test(ua);

    if (isMobileOrTab) {
      setAllowed(false);
    }
  }, []);

  if (!allowed) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, #040b25, #08123b, #0d1e5b)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 10s ease infinite",
        }}
      >
        <style>
          {`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>

        {/* Gold Premium Glass Card */}
        <div
          style={{
            width: "90%",
            maxWidth: "480px",
            padding: "40px 30px",
            borderRadius: "22px",
            background: "rgba(255, 255, 255, 0.10)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1.8px solid rgba(212, 175, 55, 0.6)", // Gold border
            boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
            animation: "fadeIn 1s ease",
          }}
        >
          {/* Gold Logo */}
          <div
            style={{
              fontSize: "35px",
              fontWeight: "900",
              letterSpacing: "3px",
              marginBottom: "12px",
              background: "linear-gradient(90deg, #D4AF37, #f2d984, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 12px rgba(212,175,55,0.6)",
            }}
          >
            CARTNET
          </div>

          <div
            style={{
              width: "70px",
              height: "4px",
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              margin: "0 auto 20px auto",
              borderRadius: "50px",
            }}
          ></div>

          <div style={{ fontSize: "55px", marginBottom: "10px", color: "#D4AF37" }}>
            🚧
          </div>

          <h2
            style={{
              marginBottom: "15px",
              fontWeight: "700",
              background: "linear-gradient(90deg, #f8e7a1, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Website Under Development
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              marginBottom: "10px",
              color: "#f4f4f4",
            }}
          >
            This website is optimized for <strong>Desktop</strong> use.
            <br />
            The mobile and tablet version is currently under development.
          </p>

          <p style={{ fontSize: "16px", color: "#D4AF37", marginTop: "15px" }}>
            We appreciate your patience and understanding!
          </p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
