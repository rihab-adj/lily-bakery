import { createContext, useContext, useState } from "react";

// Le "Context" est une façon de partager une information (ici le panier)
// entre plusieurs pages/composants, sans avoir à la passer manuellement partout.
const CartContext = createContext();

// Ce composant va "envelopper" toute l'application (voir App.jsx)
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // liste des gâteaux dans le panier

  // Ajoute un gâteau au panier (ou augmente sa quantité s'il y est déjà)
  function addToCart(product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Petit "raccourci" pour utiliser le panier facilement dans n'importe quelle page :
// const { cart, addToCart } = useCart();
export function useCart() {
  return useContext(CartContext);
}
