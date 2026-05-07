import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import './Home.css';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('featured', '==', true),
          limit(8)
        );
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>🎮 香港遊戲點數卡專門店</h1>
          <p>PSN | STEAM | iTunes | Google Play | Nintendo</p>
        </div>
      </div>

      <div className="container">
        <div className="section">
          <h2>暢銷商品</h2>
          {loading ? (
            <div className="loading">載入中...</div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="category">{product.category}</p>
                    <p className="price">${product.price}</p>
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart size={16} /> 加入購物車
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h2>商品分類</h2>
          <div className="category-grid">
            <Link to="/products?category=psn" className="category-card">
              <h3>🎮 PSN 卡</h3>
              <p>PlayStation 點數</p>
            </Link>
            <Link to="/products?category=steam" className="category-card">
              <h3>💻 STEAM 卡</h3>
              <p>PC 遊戲平台</p>
            </Link>
            <Link to="/products?category=itunes" className="category-card">
              <h3>🍎 iTunes 卡</h3>
              <p>Apple 服務</p>
            </Link>
            <Link to="/products?category=google" className="category-card">
              <h3>📱 Google Play</h3>
              <p>Android 應用</p>
            </Link>
            <Link to="/products?category=nintendo" className="category-card">
              <h3>🎯 Nintendo</h3>
              <p>Switch 點數</p>
            </Link>
            <Link to="/products?category=other" className="category-card">
              <h3>📦 其他</h3>
              <p>更多遊戲卡</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
