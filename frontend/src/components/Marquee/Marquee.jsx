import "./Marquee.css";

function Marquee() {
  const text = "Fait maison • Avec amour • Frais chaque jour • Oran, Bir El Djir •";

  return (
    <div className="marquee-strip">
      {/* on répète le texte deux fois pour que le défilement boucle sans trou */}
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Marquee;
