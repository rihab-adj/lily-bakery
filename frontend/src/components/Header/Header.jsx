import { useCallback, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAdmin } from "../../context/AdminContext";
import SearchBar from "../SearchBar/SearchBar";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import { MenuIcon, CartIcon, InfoIcon } from "../Icons/Icons";
import "./Header.css";

// Le header est partagé par toutes les pages
function Header() {
  const { itemCount } = useCart();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Accès secret : 5 clics rapides sur le logo ouvrent la page patron
  const clicks = useRef({ count: 0, timer: null });
  function handleLogoClick(e) {
    const c = clicks.current;
    c.count += 1;
    clearTimeout(c.timer);
    if (c.count >= 5) {
      c.count = 0;
      e.preventDefault(); // sinon le lien du logo nous renverrait aussitôt vers "/"
      navigate("/admin");
      return;
    }
    c.timer = setTimeout(() => { c.count = 0; }, 2000);
  }

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <button className="icon-btn" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}>
              <MenuIcon width={24} height={24} />
            </button>
            <Link to="/" className="logo" onClick={handleLogoClick}>
              <svg width="30" height="30" viewBox="0 0 34 34" aria-hidden="true">
                <path d="M4 26 L4 18 Q17 10 30 18 L30 26 Q17 32 4 26 Z" fill="#E39AA0" />
              </svg>
              <span>Lily Bakery</span>
            </Link>
          </div>

          <nav className="main-nav" aria-label="Navigation principale">
            <NavLink to="/" end>Notre histoire</NavLink>
            <NavLink to="/boutique">Boutique</NavLink>
            <NavLink to="/livraison">Livraison</NavLink>
          </nav>

          <SearchBar />

          <div className="header-right">
            {isAdmin && (
              <Link to="/admin" className="admin-icon" title="Espace patron">🔑</Link>
            )}
            <NavLink to="/a-propos" className="about-link" title="À propos de nous">
              <InfoIcon width={22} height={22} />
              <span>À propos</span>
            </NavLink>
            <Link to="/panier" className="cart-link" aria-label={`Panier (${itemCount} article${itemCount > 1 ? "s" : ""})`}>
              <CartIcon width={24} height={24} />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
