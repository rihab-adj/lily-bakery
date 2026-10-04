import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from "../../context/ProductsContext";
import { searchProducts } from "../../utils/search";
import { categoryLabel } from "../../data/categories";
import { SHOP } from "../../config";
import usePageTitle from "../../hooks/usePageTitle";
import "./Boutique.css";

function Boutique() {
  const { products, loading, error, reload } = useProducts();
  const [params, setParams] = useSearchParams();

  // Tout est dans l'adresse : /boutique?q=chocolat&cat=vegan&sort=prix-asc (on peut partager le lien)
  const q = params.get("q") || "";
  const catParam = params.get("cat") || "tous";
  const sort = params.get("sort") || "pertinence";

  function update(changes) {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, val]) => {
      if (!val || val === "tous" || val === "pertinence") next.delete(key);
      else next.set(key, val);
    });
    setParams(next);
  }

  // 1) la recherche, 2) le filtre de catégorie, 3) le tri
  const searched = useMemo(() => (q.trim() ? searchProducts(products, q) : products), [products, q]);
  const partial = Boolean(searched.partial);
  const categories = [...new Set(products.map((p) => p.category))];
  const cat = categories.includes(catParam) ? catParam : "tous";

  const visible = useMemo(() => {
    const list = cat === "tous" ? searched : searched.filter((p) => p.category === cat);
    if (sort === "prix-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "prix-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [searched, cat, sort]);

  usePageTitle(q ? `Recherche : ${q}` : cat !== "tous" ? categoryLabel(cat) : "Boutique");

  if (loading) return <p className="status-msg">Chargement des gâteaux...</p>;
  if (error) {
    return (
      <div className="status-msg error">
        <p>{error}</p>
        <button className="filter-btn" onClick={reload}>Réessayer</button>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Bonjour, je cherche un gâteau${q ? ` : ${q}` : ""}`)}`;

  return (
    <section className="boutique">
      <div className="boutique-header">
        <p className="eyebrow">Boutique</p>
        <h1>{q ? <>Résultats pour « {q} »</> : cat !== "tous" ? categoryLabel(cat) : "Tous nos gâteaux"}</h1>
        <p className="result-count">
          {visible.length} gâteau{visible.length > 1 ? "x" : ""}
          {q && (
            <button className="link-btn" onClick={() => update({ q: "" })}>Effacer la recherche</button>
          )}
        </p>
        {partial && visible.length > 0 && (
          <p className="partial-note">Aucune correspondance exacte : voici les gâteaux qui s'en rapprochent.</p>
        )}
      </div>

      <div className="filter-bar">
        <div className="filter-chips">
          <button className={cat === "tous" ? "filter-btn active" : "filter-btn"} onClick={() => update({ cat: "tous" })}>
            Tous
          </button>
          {categories.map((c) => {
            const count = searched.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                className={cat === c ? "filter-btn active" : "filter-btn"}
                onClick={() => update({ cat: c })}
                disabled={q && count === 0}
              >
                {categoryLabel(c)}{q ? ` (${count})` : ""}
              </button>
            );
          })}
        </div>
        <label className="sort-box">
          Trier par
          <select value={sort} onChange={(e) => update({ sort: e.target.value })}>
            <option value="pertinence">Pertinence</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>
        </label>
      </div>

      {visible.length > 0 ? (
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Aucun gâteau trouvé</h2>
          <p>Essayez un autre mot (« chocolat », « vegan », « mariage »…) ou demandez-nous directement : on crée aussi du sur-mesure.</p>
          <div className="empty-actions">
            <button className="btn-solid" onClick={() => setParams({})}>Voir tous les gâteaux</button>
            <a className="btn-outline" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Demander sur WhatsApp</a>
          </div>
        </div>
      )}
    </section>
  );
}

export default Boutique;
