// Noms lisibles des catégories + couleurs + mots-clés utilisés par la recherche
export const CATEGORIES = {
  anniversaire: { label: "Anniversaire", color: "#E39AA0", keywords: "birthday anniv fete bougies enfant number layer" },
  mariage: { label: "Mariage", color: "#D8B97A", keywords: "wedding noces piece montee fiancailles ceremonie" },
  "sur-mesure": { label: "Sur-mesure", color: "#B98B5E", keywords: "personnalise personnalisation custom logo entreprise theme devis" },
  part: { label: "À la part", color: "#E7B3B8", keywords: "parts portion slice individuel vitrine" },
  vegan: { label: "Vegan", color: "#5F8A55", keywords: "vegetal vegetalien vegane sans oeufs sans lait plant based" },
  "sans-gluten": { label: "Sans gluten", color: "#CBA765", keywords: "gluten free celiaque intolerance" },
  cupcakes: { label: "Cupcakes", color: "#C97480", keywords: "cupcake muffin box mini" },
  cheesecake: { label: "Cheesecakes", color: "#E0C88A", keywords: "cheesecake fromage creme new york" },
  voyage: { label: "Cakes de voyage", color: "#B98B5E", keywords: "gouter loaf marbre emporter conservation cafe the" },
};

export function categoryLabel(slug) {
  return CATEGORIES[slug]?.label || slug;
}
