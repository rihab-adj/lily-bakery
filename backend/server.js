const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const { login } = require("./auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // autorise le front-end (autre port) à appeler cette API
app.use(express.json()); // lit le JSON envoyé par le client

// Journal : chaque requête reçue s'affiche dans le terminal (très utile pour débugger)
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.url}`);
  next();
});

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

// Connexion du patron
app.post("/api/admin/login", login);

// Test rapide : http://localhost:5000/api/health
app.get("/api/health", (req, res) => {
  res.json({ ok: true, routes: ["/api/products", "/api/orders"] });
});

// En ligne : le même serveur affiche aussi le site (dossier frontend/dist, créé par "npm run build")
const path = require("path");
const fs = require("fs");
const DIST = path.join(__dirname, "..", "frontend", "dist");
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  // toute page du site (/boutique, /panier...) renvoie index.html (le site gère ses routes)
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(DIST, "index.html"));
    }
    next();
  });
} else {
  app.get("/", (req, res) => res.send("API Lily Bakery — backend fonctionne ✅"));
}

// Route inconnue -> réponse JSON claire (au lieu de la page HTML "Cannot GET")
app.use((req, res) => {
  res.status(404).json({ message: `Route introuvable : ${req.method} ${req.url}` });
});

// Toute erreur inattendue arrive ici : le serveur ne plante pas
app.use((err, req, res, next) => {
  console.error("❌ Erreur :", err);
  const status = err.status || 500;
  res.status(status).json({
    message: status === 400 ? "Données invalides." : "Erreur interne du serveur.",
  });
});

// connecte la base de données au démarrage (si DATABASE_URL existe) pour voir tout de suite une erreur éventuelle
require("./db").init().catch((err) => console.error("❌ Connexion à la base de données impossible :", err.message));

const server = app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
  console.log("   Routes : /api/products  /api/orders  /api/health");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n❌ Le port ${PORT} est déjà utilisé : un ancien serveur tourne encore.`);
    console.error("   Ferme les autres terminaux (ou termine les processus Node.js), puis relance.\n");
  } else {
    console.error(err);
  }
  process.exit(1);
});
