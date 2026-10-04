import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { categoryLabel } from "../../data/categories";
import CakeImage from "../CakeImage/CakeImage";
import "./ProductCard.css";

// "product" vient de l'API (title, price, description, category, color, id)
function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-visual">
        <Link to={`/product/${product.id}`} aria-label={product.title}>
          <CakeImage product={product} />
        </Link>
      </div>
      <div className="product-body">
        <span className="product-tag">{categoryLabel(product.category)}</span>
        <h3>{product.title}</h3>
        <p className="product-desc">
          {product.description.length > 80 ? `${product.description.slice(0, 80).trimEnd()}…` : product.description}
        </p>
        <div className="product-foot">
          <span className="price">{product.price.toLocaleString("fr-FR")} DA</span>
          <div className="card-actions">
            <button className="add-btn" onClick={() => addToCart(product)}>
              + Panier
            </button>
            {/* Lien vers /product/:id -> envoie l'id du gâteau dans l'URL */}
            <Link to={`/product/${product.id}`} className="details-btn">
              Détails
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
