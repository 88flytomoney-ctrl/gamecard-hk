import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQuantity, setCartOpen, cartOpen } = useCart();

  if (!cartOpen) return null;

  if (cart.length === 0) {
    return (
      <div className="cart-overlay" onClick={() => setCartOpen(false)}>
        <div className="cart-panel empty" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>我的購物車</h2>
            <button className="close-btn" onClick={() => setCartOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="cart-empty">
            <ShoppingBag size={64} />
            <p>購物車是空的</p>
            <Link to="/products" className="shop-btn" onClick={() => setCartOpen(false)}>
              開始購物
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay" onClick={() => setCartOpen(false)}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>我的購物車 ({cart.length})</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
              <div className="item-total">
                ${item.price * item.quantity}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>總計:</span>
            <span className="total-price">${cartTotal}</span>
          </div>
          <Link to="/checkout" className="checkout-btn" onClick={() => setCartOpen(false)}>
            結賬
          </Link>
        </div>
      </div>
    </div>
  );
}
