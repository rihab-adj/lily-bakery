import { Link } from "react-router-dom";
import Marquee from "../../components/Marquee/Marquee";
import { CakeArt } from "../../components/CakeImage/CakeImage";
import { CATEGORIES } from "../../data/categories";
import usePageTitle from "../../hooks/usePageTitle";
import "./Home.css";

function Home() {
  usePageTitle("Notre histoire");
  return (
    <div className="home-page">
      <Marquee />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <p className="eyebrow">Pâtisserie de quartier — toutes occasions</p>
            <h1>Une vitrine pour <em>chaque</em> gourmandise.</h1>
            <p className="hero-sub">
              Anniversaires, mariages, pièces sur-mesure ou simplement une part
              avec le café — chaque gâteau est composé à la commande, une
              couche à la fois.
            </p>
            <Link to="/boutique" className="btn-primary">Voir la boutique</Link>
          </div>
          <div className="hero-visual">
            <div className="sticker sticker-1">100% Fait Maison</div>
            <div className="sticker sticker-2">Sans Conservateurs</div>
            <svg viewBox="0 0 320 300" className="display-case">
              <rect x="30" y="60" width="260" height="200" rx="18" fill="#FFFDF9" stroke="rgba(74,58,61,0.12)" />
              <rect x="45" y="190" width="230" height="6" rx="3" fill="#CFE3D8" />
              <rect x="65" y="150" width="60" height="40" rx="6" fill="#E39AA0" />
              <rect x="140" y="140" width="50" height="50" rx="8" fill="#8FB79E" />
              <rect x="205" y="158" width="55" height="32" rx="6" fill="#D8B97A" />
              <rect x="20" y="256" width="280" height="20" rx="8" fill="#C97480" opacity="0.85" />
            </svg>
          </div>
        </div>
      </section>

      <section className="story">
        <div className="story-inner">
          <div className="story-visual">
            <svg viewBox="0 0 220 220" width="200">
              <circle cx="110" cy="110" r="100" fill="#CFE3D8" opacity="0.5" />
              <path d="M70 110c0-22 18-40 40-40s40 18 40 40-18 60-40 78c-22-18-40-56-40-78z" fill="#E39AA0" />
            </svg>
          </div>
          <div className="story-text">
            <p className="eyebrow">Notre histoire</p>
            <h2>Née d'une envie toute simple</h2>
            <p>
              Lily Bakery est né d'une envie simple : que chaque gâteau sur une
              table de fête soit fait avec de vrais ingrédients, par quelqu'un
              qui connaît votre nom. Pas de glaçage industriel, pas de
              raccourcis — juste des couches construites avec soin.
            </p>
            <Link to="/a-propos" className="btn-primary">En savoir plus sur nous</Link>
          </div>
        </div>
      </section>

      <section className="categories">
        <p className="eyebrow centered">Nos créations</p>
        <h2 className="centered">Un gâteau pour chaque occasion</h2>
        <div className="cat-grid">
          {Object.entries(CATEGORIES).map(([slug, c]) => (
            <Link to={`/boutique?cat=${slug}`} className="cat-tile" key={slug}>
              <div className="cat-art"><CakeArt category={slug} color={c.color} /></div>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <p className="eyebrow centered">Avis clients</p>
        <h2 className="centered">Ce qu'on nous dit</h2>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <p>Le number cake pour l'anniversaire de ma fille était magnifique et tellement bon.</p>
            <span>— Amina B.</span>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <p>Enfin une pâtisserie qui pense aux options vegan et sans gluten sans sacrifier le goût.</p>
            <span>— Sarah M.</span>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <p>Le gâteau sur-mesure a dépassé ce qu'on avait imaginé.</p>
            <span>— Yacine R.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
