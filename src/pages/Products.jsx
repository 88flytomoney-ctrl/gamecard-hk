import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import './Products.css';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let q;
        if (category && category !== 'new') {
          q = query(collection(db, 'products'), where('category', '==', category));
        } else {
          q = query(collection(db, 'products'));
        }
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const categoryName = {
    psn: 'PSN 卡',
    steam: 'STEAM 卡',
    itunes: 'iTunes 卡',
    google: 'Google Play',
    nintendo: 'Nintendo',
    other: '其他',
    new: '新品上架',
  }[category] || '所有產品';

  return (
    <div className="products-page">
      <div className="container">
        <h1>{categoryName}</h1>
        {loading ? (
          <div className="loading">載入中...</div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>暫無商品</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
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
    </div>
  );
}
