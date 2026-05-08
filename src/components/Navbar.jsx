import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, loginWithGoogle } = useAuth();
  const { cartCount, setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="top">
      <div className="container">
        <div className="header">
          <div className="logo_area">
            <Link to="/" className="logo">
              <img src="/logo.svg" alt="GameCard HK" />
            </Link>
            <div className="slogan">
              <img src="/slogan.svg" alt="" />
            </div>
          </div>

          <div className="account_area">
            <ul>
              {user ? (
                <>
                  <li>
                    <a className="btn" href="#">
                      {user.displayName}
                    </a>
                  </li>
                  <li className="line">|</li>
                  <li>
                    <button className="btn" onClick={logout}>
                      <LogOut size={16} /> 登出
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a className="btn" href="#">
                      我的戶口
                    </a>
                  </li>
                  <li className="line">|</li>
                  <li>
                    <button className="btn" onClick={loginWithGoogle}>
                      登入
                    </button>
                  </li>
                </>
              )}
              <li className="large_space" />
              <li>
                <button
                  className="btn cart-btn"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCart size={16} /> 我的購物車 ({cartCount})
                </button>
              </li>
              <li className="space" />
              <li>
                <Link to="/">
                  <img src="https://i.imgur.com/placeholder.png" alt="首頁" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="mobile_btn">
            <button
              className="mobile_search"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />} Menu
            </button>
          </div>
        </div>

        <div className="top_line" />

        <div id="menu" className={menuOpen ? 'mobile_open' : ''}>
          <div className="menu_area">
            <ul className="menu_list">
              <li>
                <Link className="lv1" to="/">
                  首頁
                </Link>
              </li>
              <li className="menu_row">|</li>
              <li>
                <Link className="lv1" to="/products">
                  所有產品
                </Link>
              </li>
              <li className="menu_row">|</li>
              <li>
                <Link className="lv1" to="/products?category=psn">
                  PSN 卡
                </Link>
              </li>
              <li className="menu_row">|</li>
              <li>
                <Link className="lv1" to="/products?category=steam">
                  STEAM 卡
                </Link>
              </li>
              <li className="menu_row">|</li>
              <li>
                <Link className="lv1" to="/products?category=itunes">
                  iTunes 卡
                </Link>
              </li>
              <li className="menu_row">|</li>
              <li>
                <Link className="lv1" to="/products?category=new">
                  新品上架
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
