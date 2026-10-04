const express = require("express");
const fs = require("fs");
const path = require("path");
const products = require("../data/products");
const { requireAdmin } = require("../auth");
const router = express.Router();

// Notre "base de données" : un fichier JSON
const ORDERS_FILE = path.join(__dirname, "../data/orders.json");

// Lit les commandes. Si le fichier manque ou est cassé, on le recrée au lieu de planter.
function readOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, "[]");
      return [];
    }
    const content = fs.readFileSync(ORDERS_FILE, "utf-8").trim();
    if (content === "") return [];
    const data = JSON.parse(content);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("⚠️  orders.json illisible, sauvegarde puis remise à zéro :", err.message);
    try {
      fs.copyFileSync(ORDERS_FILE, ORDERS_FILE + ".backup-" + Date.now());
    } catch (e) {
      /* pas grave */
    }
    return [];
  }
}

// Écrit d'abord dans un fichier temporaire, puis le renomme : jamais de fichier à moitié écrit
function writeOrders(orders) {
  const tmp = ORDERS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(orders, null, 2));
  fs.renameSync(tmp, ORDERS_FILE);
}

// GET /api/orders -> le patron récupère toutes les commandes (plus récentes en premier)
router.get("/", requireAdmin, (req, res) => {
  try {
    res.json(readOrders().slice().reverse());
  } catch (err) {
    console.error("❌ Lecture des commandes :", err);
    res.status(500).json({ message: "Impossible de lire les commandes." });
  }
});

// POST /api/orders -> un client envoie une commande
router.post("/", (req, res) => {
  try {
    const { customerName, phone, address, note, items } = req.body || {};

    if (!customerName || !String(customerName).trim() || !phone || !String(phone).trim()) {
      return res.status(400).json({ message: "Le nom et le téléphone sont obligatoires." });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Le panier est vide." });
    }

    // On reconstruit les lignes de commande à partir de NOTRE catalogue :
    // le prix et le total ne viennent jamais du navigateur (impossible de les falsifier).
    const cleanItems = [];
    for (const item of items) {
      const product = products.find((p) => p.id === Number(item.id));
      const qty = Number(item.qty);
      if (!product || !Number.isInteger(qty) || qty < 1 || qty > 50) {
        return res.status(400).json({ message: "Un article du panier est invalide." });
      }
      cleanItems.push({ id: product.id, title: product.title, price: product.price, qty });
    }
    const total = cleanItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    const newOrder = {
      id: Date.now(),
      customerName: String(customerName).trim(),
      phone: String(phone).trim(),
      address: address ? String(address).trim() : "",
      note: note ? String(note).trim() : "",
      items: cleanItems,
      total,
      status: "nouvelle",
      createdAt: new Date().toISOString(),
    };

    const orders = readOrders();
    orders.push(newOrder);
    writeOrders(orders);

    console.log(`📦 Nouvelle commande de ${newOrder.customerName} — ${total} DA`);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Enregistrement de la commande :", err);
    res.status(500).json({ message: "Le serveur n'a pas pu enregistrer la commande." });
  }
});

// PATCH /api/orders/:id -> le patron change le statut (nouvelle <-> traitée)
router.patch("/:id", requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const orders = readOrders();
    const order = orders.find((o) => o.id === id);

    if (!order) {
      return res.status(404).json({ message: "Commande introuvable." });
    }

    order.status = order.status === "nouvelle" ? "traitée" : "nouvelle";
    writeOrders(orders);
    res.json(order);
  } catch (err) {
    console.error("❌ Mise à jour de la commande :", err);
    res.status(500).json({ message: "Impossible de modifier la commande." });
  }
});

module.exports = router;
