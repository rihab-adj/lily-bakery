import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { API_URL } from "../../config";
import "./Panier.css";

function Panier() {
  const { cart, changeQty, total, clearCart } = useCart();

  // les champs du formulaire client
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const order = {
      customerName,
      phone,
      address,
      note,
      items: cart.map((item) => ({ id: item.id, title: item.title, price: item.price, qty: item.qty })),
      total,
    };

    fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then(async (res) => {
        if (!res.ok) {
          // on affiche le vrai message envoyé par le serveur
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || `Erreur du serveur (${res.status}).`);
        }
        return res.json();
      })
      .then(() => {
        setConfirmed(true);
        clearCart();
        setSending(false);
      })
      .catch((err) => {
        console.error(err);
        setError(
          err instanceof TypeError
            ? "Impossible de joindre le serveur. Vérifiez que le backend est lancé."
            : err.message
        );
        setSending(false);
      });
  }

  if (confirmed) {
    return (
      <section className="panier confirmed">
        <h1>Commande envoyée 🎂</h1>
        <p>Merci {customerName} ! Nous vous contacterons bientôt au {phone} pour confirmer.</p>
        <Link to="/boutique" className="back-link">← Retour à la boutique</Link>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="panier empty">
        <h1>Votre panier est vide</h1>
        <Link to="/boutique" className="back-link">← Choisir un gâteau</Link>
      </section>
    );
  }

  return (
    <section className="panier">
      <h1>Votre panier</h1>

      <div className="panier-items">
        {cart.map((item) => (
          <div className="panier-item" key={item.id}>
            <span className="item-name">{item.title}</span>
            <div className="item-qty">
              <button type="button" onClick={() => changeQty(item.id, -1)}>−</button>
              <span>{item.qty}</span>
              <button type="button" onClick={() => changeQty(item.id, 1)}>+</button>
            </div>
            <span className="item-price">{(item.price * item.qty).toLocaleString("fr-FR")} DA</span>
          </div>
        ))}
      </div>

      <div className="panier-total">
        <span>Total</span>
        <strong>{total.toLocaleString("fr-FR")} DA</strong>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Vos informations</h2>

        <label htmlFor="customerName">Nom complet</label>
        <input id="customerName" type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

        <label htmlFor="phone">Téléphone</label>
        <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label htmlFor="address">Adresse de livraison</label>
        <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label htmlFor="note">Message (optionnel)</label>
        <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} />

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={sending}>
          {sending ? "Envoi en cours..." : "Envoyer ma commande"}
        </button>
      </form>
    </section>
  );
}

export default Panier;
