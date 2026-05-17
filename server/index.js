const express = require('express');
const cors = require('cors');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// ── Config ────────────────────────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const DATA_DIR  = path.join(__dirname, 'data');
const LANZ_FILE  = path.join(DATA_DIR, 'lanzamientos.json');
const STOCK_FILE = path.join(DATA_DIR, 'stock.json');

// Init data dir
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(LANZ_FILE))  fs.writeFileSync(LANZ_FILE,  '[]');
if (!fs.existsSync(STOCK_FILE)) fs.writeFileSync(STOCK_FILE, '{}');

// ── Sessions (in-memory) ──────────────────────────────────────
const sessions = new Map();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function requireAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
}

// ── Helpers ───────────────────────────────────────────────────
function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// Serve frontend and admin from project root
app.use(express.static(path.join(__dirname, '..')));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// ── Health ────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, version: '1.0.0' });
});

// ── Auth ──────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  if (usuario === ADMIN_USER && contrasena === ADMIN_PASS) {
    const token = generateToken();
    sessions.set(token, { usuario, loginAt: Date.now() });
    return res.json({ ok: true, token });
  }
  res.status(401).json({ error: 'Credenciales incorrectas' });
});

app.post('/api/logout', requireAuth, (req, res) => {
  sessions.delete(req.headers['x-admin-token']);
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  const data = sessions.get(req.headers['x-admin-token']);
  res.json({ usuario: data.usuario });
});

// ── Lanzamientos CRUD ─────────────────────────────────────────
app.get('/api/lanzamientos', (_req, res) => {
  res.json(readJSON(LANZ_FILE, []));
});

app.post('/api/lanzamientos', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const nuevo = { ...req.body, _id: Date.now().toString() };

  if (!nuevo.slug || !nuevo.titulo) {
    return res.status(400).json({ error: 'slug y titulo son requeridos' });
  }
  if (items.find(l => l.slug === nuevo.slug)) {
    return res.status(409).json({ error: `El slug "${nuevo.slug}" ya existe` });
  }

  // Normalize array fields sent as strings
  if (typeof nuevo.contenido === 'string') {
    nuevo.contenido = nuevo.contenido.split('|||').map(s => s.trim()).filter(Boolean);
  }
  if (typeof nuevo.galeria === 'string') {
    nuevo.galeria = nuevo.galeria.split('|').map(s => s.trim()).filter(Boolean);
  }
  if (nuevo.detallesTecnicos && typeof nuevo.detallesTecnicos.colorways === 'string') {
    nuevo.detallesTecnicos.colorways = nuevo.detallesTecnicos.colorways
      .split('|').map(s => s.trim()).filter(Boolean);
  }

  items.unshift(nuevo);
  writeJSON(LANZ_FILE, items);
  res.status(201).json(nuevo);
});

app.put('/api/lanzamientos/:slug', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const idx = items.findIndex(l => l.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });

  const updated = { ...items[idx], ...req.body, slug: req.params.slug };

  if (typeof updated.contenido === 'string') {
    updated.contenido = updated.contenido.split('|||').map(s => s.trim()).filter(Boolean);
  }
  if (typeof updated.galeria === 'string') {
    updated.galeria = updated.galeria.split('|').map(s => s.trim()).filter(Boolean);
  }
  if (updated.detallesTecnicos && typeof updated.detallesTecnicos.colorways === 'string') {
    updated.detallesTecnicos.colorways = updated.detallesTecnicos.colorways
      .split('|').map(s => s.trim()).filter(Boolean);
  }

  items[idx] = updated;
  writeJSON(LANZ_FILE, items);
  res.json(updated);
});

app.delete('/api/lanzamientos/:slug', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const filtered = items.filter(l => l.slug !== req.params.slug);
  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'No encontrado' });
  }
  writeJSON(LANZ_FILE, filtered);
  res.json({ ok: true });
});

// ── Stock ─────────────────────────────────────────────────────
app.get('/api/stock', (_req, res) => {
  res.json(readJSON(STOCK_FILE, {}));
});

app.post('/api/stock/upload', requireAuth, upload.single('archivo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se recibió ningún archivo' });

  let rows;
  try {
    const wb = XLSX.read(req.file.buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  } catch (err) {
    return res.status(400).json({ error: 'No se pudo leer el Excel: ' + err.message });
  }

  const stock = {};
  for (const row of rows) {
    const marcaSlug  = String(row.marcaSlug  || '').trim();
    const modeloSlug = String(row.modeloSlug || '').trim();
    if (!marcaSlug || !modeloSlug) continue;

    const key = `${marcaSlug}/${modeloSlug}`;
    if (!stock[key]) stock[key] = [];

    const euTalles = String(row.euTalles || '')
      .split(',').map(s => s.trim()).filter(Boolean);

    const rawId = String(row.id || '').trim();
    const id = rawId ||
      `${marcaSlug}-${modeloSlug}-${row.colorway}`
        .toLowerCase().replace(/[^a-z0-9]+/g, '-');

    stock[key].push({
      id,
      modelo:   String(row.modelo   || ''),
      colorway: String(row.colorway || ''),
      precio:   Number(row.precio)  || 0,
      imagen:   String(row.imagen   || ''),
      euTalles,
    });
  }

  writeJSON(STOCK_FILE, stock);

  const totalProductos = Object.values(stock).reduce((s, arr) => s + arr.length, 0);
  res.json({
    ok: true,
    modelos: Object.keys(stock).length,
    productos: totalProductos,
  });
});

app.delete('/api/stock', requireAuth, (_req, res) => {
  writeJSON(STOCK_FILE, {});
  res.json({ ok: true });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Admin backend corriendo en http://localhost:${PORT}`);
  console.log(`  Panel admin:  http://localhost:${PORT}/admin.html`);
  console.log(`  Sitio web:    http://localhost:${PORT}/index.html`);
  console.log(`  Login:        admin / admin123\n`);
});
