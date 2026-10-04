const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET /api/products  -> toute la liste (comme https://dummyjson.com/products/category/smartphones)
router.get("/", (req, res) => {
  res.json(products);
});

// GET /api/products/:id  -> un seul produit (comme https://dummyjson.com/products/122)
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Produit introuvable" });
  }

  res.json(product);
});

module.exports = router;
