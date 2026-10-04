import { useState, useEffect } from "react";
import { API_URL } from "../../config";
import { useAdmin } from "../../context/AdminContext";
import "./Admin.css";

function Admin() {
  const { token, isAdmin, login, logout } = useAdmin();

  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [checking, setChecking] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function describe(err) {
    return err instanceof TypeError
      ? "Impossible de joindre le serveur. Le backend est-il lancé ?"
      : err.message;
  }

  // Récupère les commandes avec le jeton. Si le jeton n'est plus valable : déconnexion propre.
  async function loadOrders() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout();
        setLoginError("Session expirée, reconnectez-vous.");
        return;
      }
      if (!res.ok) throw new Error(`Le serveur a répondu avec l'erreur ${res.status}.`);
      setOrders(await res.json());
    } catch (err) {
      setError(describe(err));
    } finally {
      setLoading(false);
    }
  }

  // dès qu'on est connecté, on charge les commandes
  useEffect(() => {
    if (token) loadOrders();
  }, [token]);

  async function handleLogin(e) {
    e.preventDefault();
    setChecking(true);
    setLoginError("");
    try {
      await login(passwordInput);
      setPasswordInput("");
    } catch (err) {
      setLoginError(describe(err));
    }
    setChecking(false);
  }

  async function toggleStatus(id) {
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout();
        setLoginError("Session expirée, reconnectez-vous.");
        return;
      }
      if (!res.ok) throw new Error(`Modification impossible (erreur ${res.status}).`);
      await loadOrders();
    } catch (err) {
      setError(describe(err));
    }
  }

  if (!isAdmin) {
    return (
      <section className="admin admin-login">
        <h1>Accès patron</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="adminPassword">Mot de passe</label>
          <input
            id="adminPassword"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          {loginError && <p className="form-error">{loginError}</p>}
          <button type="submit" disabled={checking}>
            {checking ? "Vérification..." : "Entrer"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="admin">
      <h1>Commandes reçues</h1>

      <div className="admin-actions">
        <button type="button" onClick={loadOrders}>↻ Actualiser</button>
        <button type="button" onClick={logout}>Se déconnecter</button>
      </div>

      {error && <p className="form-error">{error}</p>}
      {loading && <p className="status-msg">Chargement des commandes...</p>}

      {!loading && orders.length === 0 && !error && (
        <p className="status-msg">Aucune commande pour le moment.</p>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className={`order-card ${order.status}`}>
            <div className="order-head">
              <span className="order-client">{order.customerName} — {order.phone}</span>
              <span className={`order-status ${order.status}`}>{order.status}</span>
            </div>

            {order.address && <p className="order-address">📍 {order.address}</p>}

            <ul className="order-items">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.qty} × {item.title} — {(item.price * item.qty).toLocaleString("fr-FR")} DA
                </li>
              ))}
            </ul>

            {order.note && <p className="order-note">Note : {order.note}</p>}

            <div className="order-foot">
              <strong>{order.total.toLocaleString("fr-FR")} DA</strong>
              <button onClick={() => toggleStatus(order.id)}>
                {order.status === "nouvelle" ? "Marquer comme traitée" : "Remettre en nouvelle"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
