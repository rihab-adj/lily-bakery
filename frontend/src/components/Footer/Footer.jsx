import { Link } from "react-router-dom";
import { SHOP } from "../../config";
import { CATEGORIES } from "../../data/categories";
import SocialLinks from "../SocialLinks/SocialLinks";
import { PhoneIcon, MailIcon, PinIcon } from "../Icons/Icons";
import "./Footer.css";

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-light">Lily Bakery</span>
          <p>Fait à la commande, une couche à la fois. Pâtisserie artisanale à Oran, Bir El Djir.</p>
          <SocialLinks />
        </div>

        <div>
          <h4>Nos gâteaux</h4>
          <ul className="footer-links">
            {Object.entries(CATEGORIES).slice(0, 6).map(([slug, c]) => (
              <li key={slug}><Link to={`/boutique?cat=${slug}`}>{c.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>La boutique</h4>
          <ul className="footer-links">
            <li><Link to="/">Notre histoire</Link></li>
            <li><Link to="/a-propos">À propos &amp; FAQ</Link></li>
            <li><Link to="/livraison">Livraison &amp; retrait</Link></li>
            <li><Link to="/panier">Mon panier</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><PhoneIcon width={16} height={16} /><a href={`tel:${SHOP.phoneLink}`}>{SHOP.phone}</a></li>
            <li><MailIcon width={16} height={16} /><a href={`mailto:${SHOP.email}`}>{SHOP.email}</a></li>
            <li><PinIcon width={16} height={16} /><a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer">{SHOP.address}</a></li>
          </ul>
          <h4 className="hours-title">Horaires</h4>
          <ul className="footer-hours">
            {SHOP.hours.map(([day, time]) => (
              <li key={day}><span>{day}</span><span>{time}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">© {YEAR} Lily Bakery — Tous droits réservés</div>
    </footer>
  );
}

export default Footer;
