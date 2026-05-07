import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div id="wrap">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Cart />
            <footer className="footer">
              <div className="container">
                <p>&copy; 2024 GameCard HK. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
