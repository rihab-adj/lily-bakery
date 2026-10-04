import { CATEGORIES } from "../data/categories";

// minuscules + sans accents + sans ponctuation : "Gâteau Amande!" -> "gateau amande"
export function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Mots trop généraux : "gateau", "cake"... ne filtrent rien (tous nos produits sont des gâteaux)
const STOP = new Set([
  "gateau", "gateaux", "cake", "cakes", "de", "du", "des", "la", "le", "les",
  "au", "aux", "a", "et", "un", "une", "pour", "en", "d", "l", "sur", "avec",
]);

// Équivalences (anglais, fautes courantes...) : le mot tapé OU l'un de ses synonymes suffit
const SYNONYMS = {
  birthday: ["anniversaire"], anniv: ["anniversaire"], wedding: ["mariage"], noce: ["mariage"],
  chocolate: ["chocolat"], choco: ["chocolat"], strawberry: ["fraise"], fraise: ["fraisier"], fraisier: ["fraise"], lemon: ["citron"],
  pistachio: ["pistache"], carrot: ["carotte"], almond: ["amande"], vegetal: ["vegan"],
  vegane: ["vegan"], free: ["gluten"], celiaque: ["gluten"], cheese: ["cheesecake"],
  slice: ["part"], portion: ["part"], mini: ["cupcake"], muffin: ["cupcake"],
};

function tokenize(query) {
  return normalize(query)
    .split(" ")
    .filter((t) => t && !STOP.has(t))
    .map((t) => (t.length > 3 && /[sx]$/.test(t) ? t.slice(0, -1) : t)); // pluriel -> singulier
}

function matchScore(product, token) {
  const alts = [token, ...(SYNONYMS[token] || [])];
  const cat = CATEGORIES[product.category];
  const title = normalize(product.title);
  const category = normalize(`${product.category} ${cat?.label || ""} ${cat?.keywords || ""}`);
  const desc = normalize(product.description);
  let best = 0;
  for (const a of alts) {
    if (title.includes(a)) best = Math.max(best, 3);
    else if (category.includes(a)) best = Math.max(best, 2);
    else if (desc.includes(a)) best = Math.max(best, 1);
  }
  return best;
}

// Retourne les produits triés par pertinence. Tous les mots tapés doivent correspondre ;
// si rien n'est trouvé, on propose les produits qui correspondent à AU MOINS un mot.
export function searchProducts(products, query) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return products;

  const scored = products.map((p) => {
    const scores = tokens.map((t) => matchScore(p, t));
    return { p, scores, total: scores.reduce((a, b) => a + b, 0) };
  });

  const exact = scored.filter((s) => s.scores.every((x) => x > 0));
  const list = exact.length > 0 ? exact : scored.filter((s) => s.total > 0);
  const results = list.sort((a, b) => b.total - a.total).map((s) => s.p);
  results.partial = exact.length === 0 && results.length > 0;
  return results;
}
