import { Link } from "react-router-dom";
import { SHOP } from "../../config";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import { LeafIcon, HeartIcon, BrushIcon, WheatIcon, PhoneIcon, MailIcon, PinIcon, ClockIcon, WhatsAppIcon } from "../../components/Icons/Icons";
import usePageTitle from "../../hooks/usePageTitle";
import "./About.css";

// ⚠️ Textes d'exemple : remplace-les par la vraie histoire de ta boutique.
const TIMELINE = [
  { year: "2019", title: "Le premier gâteau", text: "Dans la cuisine familiale, à Oran, un gâteau d'anniversaire pour une amie… puis dix commandes le mois suivant grâce au bouche-à-oreille." },
  { year: "2021", title: "Un vrai atelier", text: "Lily Bakery s'installe dans un petit atelier avec une vitrine, un four professionnel et la même règle : tout est fait à la commande." },
  { year: "2023", title: "Vegan & sans gluten", text: "Après de nombreuses demandes, nous créons des recettes vegan et sans gluten, aussi gourmandes que les classiques." },
  { year: "2026", title: "La boutique en ligne", text: "Vous pouvez désormais choisir, commander et vous faire livrer en quelques clics, sans rien perdre du côté artisanal." },
];

const STATS = [
  { value: "5 ans", label: "d'expérience" },
  { value: "2 000+", label: "gâteaux préparés" },
  { value: "20", label: "créations à la carte" },
  { value: "100%", label: "fait maison" },
];

const VALUES = [
  { icon: LeafIcon, title: "Ingrédients naturels", text: "Beurre, vrais œufs, chocolat de qualité, fruits de saison. Aucun arôme artificiel, aucun conservateur." },
  { icon: HeartIcon, title: "Fait main, à la commande", text: "Votre gâteau n'existe pas avant votre commande : il est préparé pour vous, le jour même ou la veille." },
  { icon: BrushIcon, title: "Créatif et sur-mesure", text: "Thème, couleurs, prénom, logo : nous dessinons le gâteau qui ressemble à votre événement." },
  { icon: WheatIcon, title: "Pour tous les régimes", text: "Options vegan et sans gluten pensées dès la recette, pas comme un simple remplacement." },
];

const STEPS = [
  { title: "Vous choisissez", text: "Parcourez la boutique, ajoutez vos gâteaux au panier ou écrivez-nous pour un projet sur-mesure." },
  { title: "Nous confirmons", text: "Nous vous appelons pour valider les détails : date, heure, message, allergies." },
  { title: "Nous préparons", text: "Votre gâteau est préparé à la main avec des ingrédients frais, au plus près de la date." },
  { title: "Vous recevez", text: "Livraison à domicile ou retrait à l'atelier, dans une boîte soignée qui protège votre gâteau." },
];

const TEAM = [
  { initials: "N", name: "Nadia", role: "Fondatrice & cheffe pâtissière", color: "#E39AA0" },
  { initials: "Y", name: "Yacine", role: "Décors & gâteaux sculptés", color: "#8FB79E" },
  { initials: "S", name: "Samia", role: "Commandes & relation client", color: "#D8B97A" },
];

const FAQ = [
  { q: "Combien de temps à l'avance dois-je commander ?", a: "Pour un gâteau de la carte, 24 à 48 heures suffisent. Pour un gâteau sur-mesure ou un mariage, comptez 7 à 15 jours." },
  { q: "Puis-je ajouter un message ou un prénom sur le gâteau ?", a: "Oui. Indiquez-le dans la note de commande au moment de valider le panier, ou précisez-le lors de notre appel de confirmation." },
  { q: "Comment payer ma commande ?", a: "Le paiement se fait à la livraison ou au retrait en boutique. Pour les gros gâteaux et les mariages, un acompte permet de réserver la date." },
  { q: "Vos gâteaux vegan et sans gluten sont-ils sûrs pour les allergies ?", a: "Ils sont préparés avec des recettes dédiées, mais notre atelier manipule aussi du gluten, des œufs et des fruits à coque. Prévenez-nous de toute allergie sévère." },
  { q: "Comment conserver mon gâteau ?", a: "Au réfrigérateur, dans sa boîte. Sortez-le 20 minutes avant de servir. Les gâteaux à la crème se consomment sous 48 heures, les cakes de voyage jusqu'à 5 jours." },
  { q: "Livrez-vous en dehors d'Oran ?", a: "Pour les événements et mariages, oui, sur devis. Contactez-nous avec l'adresse et la date." },
];

function About() {
  usePageTitle("À propos");

  return (
    <div className="about-page">
      <section className="page-hero">
        <p className="eyebrow">À propos de nous</p>
        <h1>Une pâtisserie de quartier, <em>faite avec le cœur</em></h1>
        <p className="lead">
          Lily Bakery, c'est une petite équipe de passionnés à Oran (Bir El Djir) qui prépare chaque gâteau à la main, pour vos anniversaires, vos mariages et tous les petits bonheurs du quotidien.
        </p>
        <div className="page-hero-actions">
          <Link to="/boutique" className="btn-solid">Découvrir la boutique</Link>
          <a href="#contact" className="btn-outline">Nous contacter</a>
        </div>
      </section>

      <section className="stats">
        {STATS.map((s) => (
          <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
        ))}
      </section>

      <section className="block">
        <p className="eyebrow centered">Notre histoire</p>
        <h2 className="centered">De la cuisine familiale à l'atelier</h2>
        <ol className="timeline">
          {TIMELINE.map((t) => (
            <li key={t.year}>
              <span className="tl-year">{t.year}</span>
              <div><h3>{t.title}</h3><p>{t.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="block tinted">
        <p className="eyebrow centered">Nos valeurs</p>
        <h2 className="centered">Ce qui compte pour nous</h2>
        <div className="card-grid">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <article className="info-card" key={title}>
              <span className="icon-circle"><Icon width={24} height={24} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <p className="eyebrow centered">Comment ça marche</p>
        <h2 className="centered">De votre envie à votre table</h2>
        <div className="card-grid steps">
          {STEPS.map((s, i) => (
            <article className="info-card" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block tinted">
        <p className="eyebrow centered">L'équipe</p>
        <h2 className="centered">Les mains derrière vos gâteaux</h2>
        <div className="team">
          {TEAM.map((m) => (
            <article key={m.name}>
              <span className="avatar" style={{ background: m.color }}>{m.initials}</span>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block narrow" id="faq">
        <p className="eyebrow centered">FAQ</p>
        <h2 className="centered">Questions fréquentes</h2>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="block" id="contact">
        <p className="eyebrow centered">Contact</p>
        <h2 className="centered">Venez nous voir, appelez-nous ou écrivez-nous</h2>
        <div className="contact-grid">
          <ul className="contact-list">
            <li><PhoneIcon /><a href={`tel:${SHOP.phoneLink}`}>{SHOP.phone}</a></li>
            <li><MailIcon /><a href={`mailto:${SHOP.email}`}>{SHOP.email}</a></li>
            <li><PinIcon /><a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer">{SHOP.address} — voir sur la carte</a></li>
            <li className="hours-row"><ClockIcon />
              <span>{SHOP.hours.map(([d, h]) => <span key={d} className="hour-line"><b>{d}</b> {h}</span>)}</span>
            </li>
          </ul>
          <div className="contact-cta">
            <h3>Une question, un projet ?</h3>
            <p>Écrivez-nous sur WhatsApp : nous répondons en général dans la journée.</p>
            <a className="wa-big" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width={20} height={20} /> Discuter sur WhatsApp
            </a>
            <p className="follow">Suivez-nous</p>
            <SocialLinks />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
