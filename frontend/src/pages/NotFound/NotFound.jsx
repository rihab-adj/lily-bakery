import { Link } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

function NotFound() {
  usePageTitle("Page introuvable");
  return (
    <section className="status-msg" style={{ flexDirection: "column", gap: 12, textAlign: "center", padding: "0 5%" }}>
      <h1 style={{ fontFamily: "Fraunces, serif", margin: 0, fontSize: "3rem", color: "#c97480" }}>404</h1>
      <p style={{ margin: 0 }}>Oups, cette page n'existe pas (ou elle a déjà été dévorée).</p>
      <Link to="/" className="btn-primary" style={{ display: "inline-block", background: "#e39aa0", color: "#fff", textDecoration: "none", padding: "12px 26px", borderRadius: 999, fontWeight: 600 }}>
        Retour à la boutique
      </Link>
    </section>
  );
}

export default NotFound;
