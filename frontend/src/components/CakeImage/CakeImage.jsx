import { useState } from "react";
import { CATEGORIES } from "../../data/categories";
import "./CakeImage.css";

// éclaircit (t > 0) ou assombrit (t < 0) une couleur hexadécimale
function shade(hex, t) {
  const n = parseInt(hex.replace("#", ""), 16);
  const target = t < 0 ? 0 : 255;
  const k = Math.abs(t);
  const ch = (v) => Math.round(v + (target - v) * k);
  return `rgb(${ch((n >> 16) & 255)},${ch((n >> 8) & 255)},${ch(n & 255)})`;
}

const CREAM = "#FFF6EA";

// Illustration d'un gâteau selon sa catégorie (toujours visible, même sans photo)
export function CakeArt({ category, color = "#E39AA0" }) {
  const main = color;
  const dark = shade(color, -0.18);
  const light = shade(color, 0.45);
  const accent = shade(color, -0.35);
  let art;

  if (category === "mariage") {
    art = (
      <>
        <rect x="38" y="98" width="124" height="26" rx="6" fill={main} />
        <rect x="55" y="74" width="90" height="25" rx="6" fill={light} />
        <rect x="72" y="54" width="56" height="21" rx="6" fill={main} />
        {[44, 70, 100, 130, 156].map((x) => <circle key={x} cx={x} cy="98" r="5" fill={CREAM} />)}
        {[64, 100, 136].map((x) => <circle key={x} cx={x} cy="74" r="4.5" fill={CREAM} />)}
        <circle cx="100" cy="48" r="5" fill="#D8B97A" />
        <circle cx="62" cy="92" r="4" fill="#8FB79E" />
        <circle cx="138" cy="92" r="4" fill="#8FB79E" />
      </>
    );
  } else if (category === "part") {
    art = (
      <>
        <rect x="55" y="100" width="90" height="22" rx="7" fill={dark} />
        <rect x="55" y="93" width="90" height="8" fill={CREAM} />
        <rect x="55" y="75" width="90" height="19" fill={main} />
        <rect x="55" y="68" width="90" height="8" fill={CREAM} />
        <rect x="55" y="52" width="90" height="17" rx="7" fill={light} />
        <circle cx="100" cy="46" r="7" fill={accent} />
        <path d="M100 39q3-6 7-6" stroke="#5F8A55" strokeWidth="2" fill="none" />
      </>
    );
  } else if (category === "cupcakes") {
    art = (
      <>
        {[45, 100, 155].map((cx, i) => {
          const y = i === 1 ? 4 : 10;
          return (
            <g key={cx}>
              <path d={`M${cx - 20} ${100 + y}L${cx + 20} ${100 + y}L${cx + 15} 126L${cx - 15} 126Z`} fill={dark} />
              <ellipse cx={cx} cy={96 + y} rx="23" ry="10" fill={main} />
              <ellipse cx={cx} cy={86 + y} rx="17" ry="9" fill={light} />
              <ellipse cx={cx} cy={77 + y} rx="11" ry="8" fill={main} />
              <circle cx={cx} cy={68 + y} r="4.5" fill={accent} />
            </g>
          );
        })}
      </>
    );
  } else if (category === "cheesecake") {
    art = (
      <>
        <rect x="42" y="98" width="116" height="26" rx="8" fill="#C79A62" />
        <rect x="42" y="68" width="116" height="32" rx="6" fill={CREAM} />
        <rect x="42" y="62" width="116" height="14" rx="7" fill={main} />
        {[62, 84, 106, 128].map((x, i) => <rect key={x} x={x - 4} y="68" width="8" height={i % 2 ? 20 : 14} rx="4" fill={main} />)}
        {[75, 100, 125].map((x) => <circle key={x} cx={x} cy="56" r="6" fill={accent} />)}
      </>
    );
  } else if (category === "voyage") {
    art = (
      <>
        <rect x="38" y="76" width="124" height="46" rx="14" fill={main} />
        <ellipse cx="100" cy="76" rx="62" ry="17" fill={light} />
        <ellipse cx="100" cy="72" rx="50" ry="9" fill={CREAM} opacity="0.85" />
        {[68, 100, 132].map((x) => <rect key={x} x={x - 1.5} y="86" width="3" height="32" rx="1.5" fill={dark} opacity="0.35" />)}
        <circle cx="86" cy="70" r="3" fill={accent} />
        <circle cx="116" cy="73" r="3" fill={accent} />
      </>
    );
  } else {
    // gâteau à étages avec glaçage qui coule (anniversaire, sur-mesure, vegan, sans gluten...)
    art = (
      <>
        <rect x="45" y="70" width="110" height="54" rx="10" fill={main} />
        <rect x="45" y="94" width="110" height="7" fill={CREAM} />
        <rect x="45" y="60" width="110" height="20" rx="10" fill={light} />
        {[58, 92, 128].map((x, i) => <rect key={x} x={x - 5} y="70" width="10" height={[16, 24, 13][i]} rx="5" fill={light} />)}
        {category === "anniversaire" ? (
          [80, 100, 120].map((x, i) => (
            <g key={x}>
              <rect x={x - 2} y="40" width="4" height="20" rx="2" fill={[accent, "#8FB79E", "#D8B97A"][i]} />
              <ellipse cx={x} cy="36" rx="3" ry="5" fill="#F5B83D" />
            </g>
          ))
        ) : (
          <>
            {[82, 100, 118].map((x, i) => <circle key={x} cx={x} cy={i === 1 ? 52 : 55} r="7" fill={accent} />)}
            <path d="M100 45q2-7 8-8" stroke="#5F8A55" strokeWidth="2" fill="none" />
          </>
        )}
        {category === "sans-gluten" && [60, 80, 120, 140].map((x) => <circle key={x} cx={x} cy="112" r="2.4" fill={CREAM} />)}
      </>
    );
  }

  return (
    <svg className="cake-art" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Illustration : ${category}`}>
      <rect width="200" height="150" fill={shade(color, 0.82)} />
      <circle cx="30" cy="28" r="40" fill={shade(color, 0.7)} opacity="0.5" />
      <circle cx="176" cy="130" r="46" fill={shade(color, 0.7)} opacity="0.5" />
      <ellipse cx="100" cy="128" rx="78" ry="9" fill="#fff" opacity="0.85" />
      {art}
    </svg>
  );
}

// Affiche la VRAIE photo si le produit a un champ "image" (ex: "/images/gateaux/red-velvet.jpg"),
// sinon (ou si la photo ne charge pas) affiche l'illustration.
export default function CakeImage({ product, className = "" }) {
  const [failed, setFailed] = useState(false);
  const color = product.color || CATEGORIES[product.category]?.color;

  return (
    <div className={`cake-image ${className}`}>
      {product.image && !failed ? (
        <img src={product.image} alt={product.title} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <CakeArt category={product.category} color={color} />
      )}
    </div>
  );
}
