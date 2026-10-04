import { createContext, useContext, useState } from "react";
import { API_URL } from "../config";

// Le "jeton" de connexion est gardé dans CE navigateur seulement (localStorage).
// Les clients n'en ont jamais : ils ne voient donc jamais l'icône patron.
const KEY = "lilybakery_admin_token";

const AdminContext = createContext();

function readToken() {
  try {
    return localStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
}

export function AdminProvider({ children }) {
  const [token, setToken] = useState(readToken);

  // Envoie le mot de passe au serveur ; s'il est bon, on reçoit un jeton
  async function login(password) {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Erreur du serveur (${res.status}).`);
    try {
      localStorage.setItem(KEY, data.token);
    } catch {
      /* stockage bloqué : la connexion durera juste le temps de la page */
    }
    setToken(data.token);
  }

  function logout() {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* rien */
    }
    setToken("");
  }

  return (
    <AdminContext.Provider value={{ token, isAdmin: Boolean(token), login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
