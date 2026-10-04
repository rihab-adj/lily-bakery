const crypto = require("crypto");

// Mot de passe du patron. Pour le changer : ADMIN_PASSWORD=monmotdepasse npm start
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gateau2026";

const TOKEN_LIFETIME = 7 * 24 * 60 * 60 * 1000; // la connexion dure 7 jours
const tokens = new Map(); // jeton -> date d'expiration
const attempts = new Map(); // ip -> { count, until } (protection contre les essais en boucle)

function sameString(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// POST /api/admin/login  { password }  ->  { token }
function login(req, res) {
  const ip = req.ip;
  const entry = attempts.get(ip) || { count: 0, until: 0 };

  if (entry.until > Date.now()) {
    return res.status(429).json({ message: "Trop de tentatives. Réessayez dans une minute." });
  }

  const password = req.body && req.body.password;
  if (typeof password !== "string" || !sameString(password, ADMIN_PASSWORD)) {
    entry.count += 1;
    if (entry.count >= 5) {
      entry.until = Date.now() + 60 * 1000;
      entry.count = 0;
    }
    attempts.set(ip, entry);
    return res.status(401).json({ message: "Mot de passe incorrect." });
  }

  attempts.delete(ip);
  const token = crypto.randomBytes(32).toString("hex");
  tokens.set(token, Date.now() + TOKEN_LIFETIME);
  console.log("🔑 Connexion patron réussie");
  res.json({ token });
}

// Protège les routes du patron : il faut envoyer  Authorization: Bearer <jeton>
function requireAdmin(req, res, next) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const expires = tokens.get(token);

  if (!expires || expires < Date.now()) {
    tokens.delete(token);
    return res.status(401).json({ message: "Session invalide ou expirée." });
  }
  next();
}

module.exports = { login, requireAdmin };
