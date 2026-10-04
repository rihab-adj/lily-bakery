// Stockage des commandes.
// - Si DATABASE_URL existe (en ligne, base Neon) : les commandes vont dans une vraie base PostgreSQL.
// - Sinon (sur ton ordinateur) : elles vont dans le fichier data/orders.json, comme avant.
const fs = require("fs");
const path = require("path");

const DATABASE_URL = process.env.DATABASE_URL;
let pool = null;
let ready = null;

function getPool() {
  if (!DATABASE_URL) return null;
  if (!pool) {
    const { Pool } = require("pg");
    pool = new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 5 });
    pool.on("error", (err) => console.error("⚠️  Base de données :", err.message));
  }
  return pool;
}

// crée la table au premier démarrage (rien à faire à la main)
function init() {
  const p = getPool();
  if (!p) return Promise.resolve();
  if (!ready) {
    ready = p
      .query(
        `CREATE TABLE IF NOT EXISTS orders (
          id BIGINT PRIMARY KEY,
          customer_name TEXT NOT NULL,
          phone TEXT NOT NULL,
          address TEXT NOT NULL DEFAULT '',
          note TEXT NOT NULL DEFAULT '',
          items JSONB NOT NULL,
          total INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT 'nouvelle',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`
      )
      .then(() => console.log("🗄️  Base de données connectée (table orders prête)"))
      .catch((err) => {
        ready = null;
        throw err;
      });
  }
  return ready;
}

function rowToOrder(r) {
  return {
    id: Number(r.id),
    customerName: r.customer_name,
    phone: r.phone,
    address: r.address,
    note: r.note,
    items: r.items,
    total: r.total,
    status: r.status,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

// ───── Version fichier JSON (ordinateur) ─────
const FILE = path.join(__dirname, "data/orders.json");
function readFile() {
  try {
    if (!fs.existsSync(FILE)) return [];
    const c = fs.readFileSync(FILE, "utf-8").trim();
    const d = c ? JSON.parse(c) : [];
    return Array.isArray(d) ? d : [];
  } catch (err) {
    console.error("⚠️  orders.json illisible :", err.message);
    return [];
  }
}
function writeFile(orders) {
  const tmp = FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(orders, null, 2));
  fs.renameSync(tmp, FILE);
}

// ───── Fonctions utilisées par les routes ─────
async function listOrders() {
  const p = getPool();
  if (!p) return readFile().slice().reverse();
  await init();
  const { rows } = await p.query("SELECT * FROM orders ORDER BY created_at DESC, id DESC");
  return rows.map(rowToOrder);
}

async function addOrder(o) {
  const p = getPool();
  if (!p) {
    const orders = readFile();
    orders.push(o);
    writeFile(orders);
    return o;
  }
  await init();
  await p.query(
    `INSERT INTO orders (id, customer_name, phone, address, note, items, total, status, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [o.id, o.customerName, o.phone, o.address, o.note, JSON.stringify(o.items), o.total, o.status, o.createdAt]
  );
  return o;
}

// bascule nouvelle <-> traitée ; renvoie la commande, ou null si introuvable
async function toggleOrder(id) {
  const p = getPool();
  if (!p) {
    const orders = readFile();
    const order = orders.find((x) => x.id === id);
    if (!order) return null;
    order.status = order.status === "nouvelle" ? "traitée" : "nouvelle";
    writeFile(orders);
    return order;
  }
  await init();
  const { rows } = await p.query(
    `UPDATE orders SET status = CASE WHEN status = 'nouvelle' THEN 'traitée' ELSE 'nouvelle' END
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0] ? rowToOrder(rows[0]) : null;
}

module.exports = { init, listOrders, addOrder, toggleOrder, usingDatabase: !!DATABASE_URL };
