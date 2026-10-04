import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/categories";
import { DELIVERY, SHOP } from "../../config";
import SocialLinks from "../SocialLinks/SocialLinks";
import { CloseIcon, ChevronIcon, LeafIcon, WheatIcon, BrushIcon, HeartIcon, PhoneIcon, WhatsAppIcon } from "../Icons/Icons";
import { ICON_BY_NAME } from "../Icons/iconMap";
import "./MenuDrawer.css";

// Nos options (clic = ouvre la boutique filtrée ou la page concernée)
const OPTIONS = [
  { icon: LeafIcon, title: "Vegan", text: "Sans œufs ni produits laitiers", to: "/boutique?cat=vegan" },
  { icon: WheatIcon, title: "Sans gluten", text: "Farine d'amande, base sans gluten", to: "/boutique?cat=sans-gluten" },
  { icon: BrushIcon, title: "Sur-mesure", text: "Forme, logo, thème à votre image", to: "/boutique?cat=sur-mesure" },
  { icon: HeartIcon, title: "Message personnalisé", text: "Prénom, date, dédicace en chocolat", to: "/a-propos#faq" },
];

// Menu "trois lignes" : types de gâteaux, options, livraison, contact, réseaux
function MenuDrawer({ open, onClose }) {
  const closeRef = useRef(null);

  // Échap ferme le menu, et on bloque le défilement de la page derrière
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={open ? "drawer-root open" : "drawer-root"} aria-hidden={!open}>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Menu principal">
        <div className="drawer-head">
          <span className="drawer-title">Menu</span>
          <button ref={closeRef} className="drawer-close" onClick={onClose} aria-label="Fermer le menu">
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-body">
          <section>
            <h3>Nos types de gâteaux</h3>
            <ul className="drawer-list">
              <li><Link to="/boutique" onClick={onClose}>Tous les gâteaux <ChevronIcon width={16} height={16} /></Link></li>
              {Object.entries(CATEGORIES).map(([slug, c]) => (
                <li key={slug}>
                  <Link to={`/boutique?cat=${slug}`} onClick={onClose}>
                    <span className="dot" style={{ background: c.color }} />
                    {c.label}
                    <ChevronIcon width={16} height={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Nos options</h3>
            <ul className="drawer-cards">
              {OPTIONS.map(({ icon: Icon, title, text, to }) => (
                <li key={title}>
                  <Link to={to} onClick={onClose}>
                    <Icon width={22} height={22} />
                    <span><strong>{title}</strong><small>{text}</small></span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Nos services de livraison</h3>
            <ul className="drawer-cards">
              {DELIVERY.map((d) => {
                const Icon = ICON_BY_NAME[d.icon];
                return (
                  <li key={d.id}>
                    <Link to={`/livraison#${d.id}`} onClick={onClose}>
                      <Icon width={22} height={22} />
                      <span><strong>{d.title}</strong><small>{d.price} · {d.delay.split(",")[0]}</small></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h3>La boutique</h3>
            <ul className="drawer-list">
              <li><Link to="/" onClick={onClose}>Notre histoire <ChevronIcon width={16} height={16} /></Link></li>
              <li><Link to="/a-propos" onClick={onClose}>À propos &amp; FAQ <ChevronIcon width={16} height={16} /></Link></li>
              <li><Link to="/livraison" onClick={onClose}>Livraison &amp; retrait <ChevronIcon width={16} height={16} /></Link></li>
              <li><Link to="/panier" onClick={onClose}>Mon panier <ChevronIcon width={16} height={16} /></Link></li>
            </ul>
          </section>
        </div>

        <div className="drawer-foot">
          <a className="drawer-btn" href={`tel:${SHOP.phoneLink}`}><PhoneIcon width={18} height={18} /> {SHOP.phone}</a>
          <a className="drawer-btn wa" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={18} height={18} /> WhatsApp
          </a>
          <SocialLinks />
        </div>
      </aside>
    </div>
  );
}

export default MenuDrawer;
