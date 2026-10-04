import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Boutique from "./pages/Boutique/Boutique";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Panier from "./pages/Panier/Panier";
import Admin from "./pages/Admin/Admin";
import About from "./pages/About/About";
import Livraison from "./pages/Livraison/Livraison";
import NotFound from "./pages/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        {/* "/" = 1ère page du site = Histoire */}
        <Route path="/" element={<Home />} />
        <Route path="/histoire" element={<Navigate to="/" replace />} />

        {/* 2ème page = la boutique (liste des gâteaux) */}
        <Route path="/boutique" element={<Boutique />} />

        {/* route dynamique : /product/122, /product/5, etc. */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* le panier + formulaire client */}
        <Route path="/panier" element={<Panier />} />

        {/* la page du patron, pour voir les commandes */}
        <Route path="/admin" element={<Admin />} />

        {/* À propos (histoire, équipe, FAQ, contact) et livraison */}
        <Route path="/a-propos" element={<About />} />
        <Route path="/about" element={<Navigate to="/a-propos" replace />} />
        <Route path="/livraison" element={<Livraison />} />

        {/* toute autre adresse = page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
