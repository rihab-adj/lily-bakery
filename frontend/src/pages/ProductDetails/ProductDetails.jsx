import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductsContext";
import { API_URL, SHOP } from "../../config";
import { categoryLabel } from "../../data/categories";
import CakeImage from "../../components/CakeImage/CakeImage";
import ProductCard from "../../components/ProductCard/ProductCard";
import { TruckIcon, WhatsAppIcon } from "../../components/Icons/Icons";
import usePageTitle from "../../hooks/usePageTitle";
import "./ProductDetails.css";

function ProductDetails() {
  // useParams() lit la partie dynamique de l'URL : /product/:id
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  // à chaque fois que "id" change (si on clique sur un autre produit), on refait la requête
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produit introuvable");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err instanceof TypeError
            ? "Impossible de joindre le serveur. Le backend tourne-t-il ?"
            : err.message
        );
        setLoading(false);
      });
  }, [id]);

  usePageTitle(product ? product.title : "Gâteau");

  if (loading) return <p className="status-msg">Chargement...</p>;
  if (error) {
    return (
      <div className="status-msg error">
        <p>{error}</p>
        <Link to="/boutique" className="back-link inline">← Retour à la boutique</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const whatsappUrl = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Bonjour, je voudrais commander : ${product.title} (${product.price.toLocaleString("fr-FR")} DA).`)}`;

  return (
    <section className="product-details">
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/boutique">Boutique</Link> / <Link to={`/boutique?cat=${product.category}`}>{categoryLabel(product.category)}</Link> / <span>{product.title}</span>
      </nav>

      <div className="details-inner">
        <div className="details-visual">
          <CakeImage product={product} />
        </div>

        <div className="details-text">
          <span className="product-tag">{categoryLabel(product.category)}</span>
          <h1>{product.title}</h1>
          <p className="price">{product.price.toLocaleString("fr-FR")} DA</p>
          <p className="description">{product.description}</p>

          <div className="details-actions">
            <button
              className="add-to-cart-btn"
              onClick={() => {
                addToCart(product);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
            >
              {added ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
            <a className="wa-btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width={18} height={18} /> Commander sur WhatsApp
            </a>
          </div>

          <p className="delivery-note">
            <TruckIcon width={18} height={18} />
            Livraison à domicile ou retrait en boutique — <Link to="/livraison">voir les détails</Link>
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related">
          <h2>Dans la même catégorie</h2>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;
