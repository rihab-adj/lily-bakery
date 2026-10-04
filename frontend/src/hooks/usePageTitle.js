import { useEffect } from "react";

// Change le titre de l'onglet du navigateur pour chaque page
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Lily Bakery` : "Lily Bakery — Pâtisserie artisanale à Oran";
  }, [title]);
}
