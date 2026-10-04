import { Link } from "react-router-dom";
import { DELIVERY, SHOP } from "../../config";
import { WhatsAppIcon } from "../../components/Icons/Icons";
import { ICON_BY_NAME } from "../../components/Icons/iconMap";
import usePageTitle from "../../hooks/usePageTitle";
import "../About/About.css";
import "./Livraison.css";

const NOTES = [
  "Votre gâteau voyage dans une boîte rigide, à plat, de préférence dans le coffre de la voiture.",
  "Nous confirmons toujours l'heure de passage par téléphone avant la livraison.",
  "Le paiement se fait à la livraison ou au retrait (acompte demandé pour les mariages et gros gâteaux).",
  "Pensez à nous donner une adresse précise et un numéro joignable le jour J.",
];

function Livraison() {
  usePageTitle("Livraison & retrait");

  return (
    <div className="about-page">
      <section className="page-hero">
        <p className="eyebrow">Livraison &amp; retrait</p>
        <h1>Votre gâteau, <em>là où vous le voulez</em></h1>
        <p className="lead">
          Livraison à domicile, retrait à l'atelier ou installation sur place pour vos grands événements : choisissez la formule qui vous convient.
        </p>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="delivery-grid">
          {DELIVERY.map((d) => {
            const Icon = ICON_BY_NAME[d.icon];
            return (
              <article className="info-card delivery-card" id={d.id} key={d.id}>
                <span className="icon-circle"><Icon width={24} height={24} /></span>
                <h3>{d.title}</h3>
                <p className="d-price">{d.price}</p>
                <p className="d-delay">{d.delay}</p>
                <p>{d.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="block tinted">
        <h2 className="centered">Bon à savoir</h2>
        <ul className="notes">
          {NOTES.map((n) => <li key={n}>{n}</li>)}
        </ul>
        <div className="page-hero-actions" style={{ marginTop: 28 }}>
          <Link to="/boutique" className="btn-solid">Commander un gâteau</Link>
          <a className="btn-outline" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={16} height={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />
            Poser une question
          </a>
        </div>
      </section>
    </div>
  );
}

export default Livraison;
