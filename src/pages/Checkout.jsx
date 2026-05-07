import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('請先登入');
      return;
    }
    if (cart.length === 0) {
      alert('購物車是空的');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userName: formData.name,
        userEmail: formData.email,
        phone: formData.phone,
        address: formData.address,
        items: cart,
        total: cartTotal,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      clearCart();
      alert('訂單已提交！我們會盡快聯絡您。');
      navigate('/');
    } catch (error) {
      console.error('Order error:', error);
      alert('提交失敗，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="login-required">
            <h2>請先登入</h2>
            <p>您需要登入才能結賬</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>結賬</h1>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>聯絡資料</h2>
            <div className="form-group">
              <label>姓名 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>電郵 *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>電話 *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>送貨地址</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
              />
            </div>

            <h2>訂單備註</h2>
            <div className="form-group">
              <textarea
                placeholder="有任何特別要求請在此說明..."
                rows={3}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '提交中...' : '確認訂單'}
            </button>
          </form>

          <div className="order-summary">
            <h2>訂單摘要</h2>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>總計:</span>
              <span>${cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
