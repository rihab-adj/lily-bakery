const express = require("express");
const products = require("../data/products");
const { requireAdmin } = require("../auth");
const db = require("../db");
const router = express.Router();

// GET /api/orders -> le patron récupère toutes les commandes (plus récentes en premier)
router.get("/", requireAdmin, async (req, res) => {
  try {
    res.json(await db.listOrders());
  } catch (err) {
    console.error("❌ Lecture des commandes :", err);
    res.status(500).json({ message: "Impossible de lire les commandes." });
  }
});

// POST /api/orders -> un client envoie une commande
router.post("/", async (req, res) => {
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

    await db.addOrder(newOrder);

    console.log(`📦 Nouvelle commande de ${newOrder.customerName} — ${total} DA`);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Enregistrement de la commande :", err);
    res.status(500).json({ message: "Le serveur n'a pas pu enregistrer la commande." });
  }
});

// PATCH /api/orders/:id -> le patron change le statut (nouvelle <-> traitée)
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = await db.toggleOrder(id);

    if (!order) {
      return res.status(404).json({ message: "Commande introuvable." });
    }

    res.json(order);
  } catch (err) {
    console.error("❌ Mise à jour de la commande :", err);
    res.status(500).json({ message: "Impossible de modifier la commande." });
  }
});

module.exports = router;
