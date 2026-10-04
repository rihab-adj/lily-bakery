import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";

// Charge la liste des gâteaux UNE seule fois et la partage (boutique, recherche du header...)
const ProductsContext = createContext({ products: [], loading: true, error: null, reload: () => {} });

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les gâteaux. Le serveur backend tourne-t-il ?");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <ProductsContext.Provider value={{ products, loading, error, reload }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
