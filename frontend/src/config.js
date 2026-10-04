// L'adresse du backend, écrite UNE SEULE FOIS pour tout le site.
// En local : http://localhost:5000
// Si le backend est hébergé : crée un fichier .env avec  VITE_API_URL=https://ton-backend.com
// En ligne (un seul serveur) : adresse vide = même adresse que le site.
export const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.PROD ? "" : "http://localhost:5000");

// ─── Informations de la boutique : modifie-les ICI, elles changent partout sur le site ───
export const SHOP = {
  name: "Lily Bakery",
  phone: "+213 555 00 00 00",
  phoneLink: "+213555000000", // sans espaces (pour le lien "appeler")
  whatsapp: "213555000000", // format international, sans + ni espaces
  email: "commande@lilybakery.dz",
  address: "Bir El Djir, Oran, Algérie",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bir+El+Djir%2C+Oran%2C+Alg%C3%A9rie",
  hours: [
    ["Dim – Jeu", "9h – 19h"],
    ["Ven", "14h – 19h"],
    ["Sam", "9h – 20h"],
  ],
};

// Réseaux sociaux : remplace les liens par ceux de TA boutique.
export const SOCIALS = [
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/lilybakery.oran" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/lilybakery.oran" },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@lilybakery.oran" },
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("Bonjour Lily Bakery, je voudrais commander un gâteau.")}`,
  },
];

// Services de livraison (page /livraison + menu). Adapte les prix et délais à ta réalité.
export const DELIVERY = [
  {
    id: "domicile",
    icon: "truck",
    title: "Livraison à domicile",
    price: "300 – 600 DA",
    delay: "Le jour même ou le lendemain",
    text: "Votre gâteau arrive à la maison, emballé dans une boîte rigide et transporté au frais. Tarif selon le quartier.",
  },
  {
    id: "retrait",
    icon: "store",
    title: "Retrait en boutique",
    price: "Gratuit",
    delay: "À l'heure choisie, 24h après la commande",
    text: "Passez récupérer votre commande à l'atelier pendant nos horaires d'ouverture. Parfait pour les petits budgets.",
  },
  {
    id: "express",
    icon: "bolt",
    title: "Livraison express",
    price: "800 DA",
    delay: "Sous 2 heures (parts, cupcakes, cakes de voyage)",
    text: "Pour les envies pressées : commande avant midi, livraison dans l'après-midi, selon disponibilité en vitrine.",
  },
  {
    id: "evenement",
    icon: "heart",
    title: "Événements & mariages",
    price: "Sur devis",
    delay: "Commande 7 à 15 jours à l'avance",
    text: "Livraison et installation sur place des pièces montées, avec un acompte pour réserver votre date.",
  },
];
