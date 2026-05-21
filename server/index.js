const express  = require('express');
const cors     = require('cors');
const multer   = require('multer');
const XLSX     = require('xlsx');
const fs       = require('fs');
const path     = require('path');
const crypto   = require('crypto');
const { execSync } = require('child_process');

const app  = express();
const PORT = 3001;

// ── Credenciales (hardcodeadas) ────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// ── Rutas de datos ─────────────────────────────────────────────
const ROOT       = path.join(__dirname, '..');
const DATA_DIR   = path.join(__dirname, 'data');
const LANZ_FILE  = path.join(DATA_DIR, 'lanzamientos.json');
const STOCK_FILE = path.join(DATA_DIR, 'stock.json');
const ARTICLES_JSX = path.join(ROOT, 'src', 'articles-data.jsx');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(LANZ_FILE))  fs.writeFileSync(LANZ_FILE,  '[]',  'utf8');
if (!fs.existsSync(STOCK_FILE)) fs.writeFileSync(STOCK_FILE, '{}',  'utf8');

// ── Sesiones en memoria ────────────────────────────────────────
const sessions = new Map();

function requireAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
}

// ── Helpers JSON ───────────────────────────────────────────────
function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ── Normalizar lanzamiento ─────────────────────────────────────
function normalizeLanzamiento(raw) {
  // contenido: "p1|||p2" → ["p1","p2"]
  const contenido = typeof raw.contenido === 'string'
    ? raw.contenido.split('|||').map(s => s.trim()).filter(Boolean)
    : (Array.isArray(raw.contenido) ? raw.contenido : []);

  // colorways: "col1|col2" → ["col1","col2"]
  const colorways = typeof raw.detallesTecnicos?.colorways === 'string'
    ? raw.detallesTecnicos.colorways.split('|').map(s => s.trim()).filter(Boolean)
    : (Array.isArray(raw.detallesTecnicos?.colorways) ? raw.detallesTecnicos.colorways : []);

  // galería
  const galeria = Array.isArray(raw.galeria) ? raw.galeria : [];

  return {
    slug:             raw.slug            || '',
    titulo:           raw.titulo          || '',
    marca:            raw.marca           || '',
    marcaSlug:        raw.marcaSlug       || '',
    modeloSlug:       raw.modeloSlug      || '',
    fecha:            raw.fecha           || '',
    fechaISO:         raw.fechaISO        || '',
    categoria:        raw.categoria       || 'Lanzamiento',
    descripcionCorta: raw.descripcionCorta|| '',
    imagen:           raw.imagen          || '',
    destacado:        Boolean(raw.destacado),
    contenido,
    galeria,
    detallesTecnicos: {
      suela:     raw.detallesTecnicos?.suela     || '',
      terreno:   raw.detallesTecnicos?.terreno   || '',
      peso:      raw.detallesTecnicos?.peso       || '',
      colorways,
    },
    coleccion: raw.coleccion || '',
  };
}

// ── Tabla de talles (para convertir euTalles → tallesDisponibles) ─
const SIZE_TABLE = [
  { us: '7',    uk: '6',    eu: '40',   cm: '25.0' },
  { us: '7.5',  uk: '6.5',  eu: '40.5', cm: '25.5' },
  { us: '8',    uk: '7',    eu: '41',   cm: '26.0' },
  { us: '8.5',  uk: '7.5',  eu: '42',   cm: '26.5' },
  { us: '9',    uk: '8',    eu: '42.5', cm: '27.0' },
  { us: '9.5',  uk: '8.5',  eu: '43',   cm: '27.5' },
  { us: '10',   uk: '9',    eu: '44',   cm: '28.0' },
  { us: '10.5', uk: '9.5',  eu: '44.5', cm: '28.5' },
  { us: '11',   uk: '10',   eu: '45',   cm: '29.0' },
  { us: '11.5', uk: '10.5', eu: '45.5', cm: '29.5' },
  { us: '12',   uk: '11',   eu: '46',   cm: '30.0' },
  { us: '12.5', uk: '11.5', eu: '46.5', cm: '30.5' },
  { us: '13',   uk: '12',   eu: '47',   cm: '31.0' },
];

function euTallesToDisponibles(euTalles) {
  return (euTalles || []).map(eu => {
    const match = SIZE_TABLE.find(t => String(t.eu) === String(eu));
    return match || { eu: String(eu), us: '', uk: '', cm: '' };
  });
}

// ── Marcas estáticas ───────────────────────────────────────────
const BRANDS_INFO = [
  {
    slug: 'adidas', name: 'adidas', tagline: 'Three stripes. Three decades.',
    cover: 'assets/brand-adidas.jpg',
    modelos: [
      { slug: 'f50',       name: 'F50',      tagline: 'Speed reimagined',    cover: 'assets/model-adidas-f50.avif'      },
      { slug: 'predator',  name: 'Predator', tagline: 'Control absoluto',    cover: 'assets/model-adidas-predator.avif' },
      { slug: 'copa',      name: 'Copa',     tagline: 'Heritage en cuero',   cover: 'assets/model-adidas-copa.avif'     },
    ],
  },
  {
    slug: 'nike', name: 'Nike', tagline: 'Just do it.',
    cover: 'assets/brand-nike.jpg',
    modelos: [
      { slug: 'mercurial', name: 'Mercurial', tagline: 'Velocidad pura',     cover: 'assets/model-nike-mercurial.webp'  },
      { slug: 'phantom',   name: 'Phantom',   tagline: 'Toque y precisión',  cover: 'assets/model-nike-phantom.webp'   },
      { slug: 'tiempo',    name: 'Tiempo',    tagline: 'Cuero clásico',      cover: 'assets/model-nike-tiempo.avif'    },
    ],
  },
  {
    slug: 'puma', name: 'Puma', tagline: 'Forever faster.',
    cover: 'assets/brand-puma.jpg',
    modelos: [
      { slug: 'future',    name: 'Future',    tagline: 'Adaptive fit',       cover: 'assets/model-puma-future.avif'    },
      { slug: 'ultra',     name: 'Ultra',     tagline: 'Lightweight speed',  cover: 'assets/model-puma-ultra.jpg'      },
    ],
  },
  {
    slug: 'new-balance', name: 'New Balance', tagline: 'Fearlessly independent.',
    cover: 'assets/brand-newbalance.jpg',
    modelos: [
      { slug: 'furon',     name: 'Furon',     tagline: 'Strike precision',   cover: 'assets/model-nb-furon.webp'       },
      { slug: 'tekela',    name: 'Tekela',    tagline: 'Creative play',      cover: 'assets/model-nb-tekela.webp'      },
    ],
  },
];

// ── Generar src/articles-data.jsx ─────────────────────────────
function generateArticlesDataJS(lanzamientos, stockRaw) {
  const ts = new Date().toISOString();

  // Limpiar campos internos y normalizar galería → array de strings
  const articles = lanzamientos.map(l => {
    const { _id, ...rest } = l;
    // Galería: el admin guarda {url,size,layout}; el frontend espera strings
    rest.galeria = Array.isArray(rest.galeria)
      ? rest.galeria.map(g => typeof g === 'string' ? g : (g?.url || '')).filter(Boolean)
      : [];
    return rest;
  });

  // Convertir stock: euTalles → tallesDisponibles
  const stock = {};
  for (const [key, productos] of Object.entries(stockRaw)) {
    stock[key] = productos.map(p => ({
      id:       p.id,
      modelo:   p.modelo,
      colorway: p.colorway || '',
      precio:   p.precio   || 0,
      imagen:   p.imagen   || '',
      tallesDisponibles: euTallesToDisponibles(p.euTalles || []),
    }));
  }

  const articlesJSON  = JSON.stringify(articles,   null, 2);
  const brandsJSON    = JSON.stringify(BRANDS_INFO, null, 2);
  const sizeJSON      = JSON.stringify(SIZE_TABLE,  null, 2);
  const stockJSON     = JSON.stringify(stock,       null, 2);

  return `// ============================================================
// Datos editoriales — GENERADO AUTOMÁTICAMENTE
// Última publicación: ${ts}
// No editar manualmente. Usar el panel de administración.
// ============================================================

const ARTICLES = ${articlesJSON};

// ============================================================
// MARCAS y modelos disponibles (estático)
// ============================================================

const BRANDS_INFO = ${brandsJSON};

// ============================================================
// Tabla de talles US/UK/EU/CM
// ============================================================

const SIZE_TABLE = ${sizeJSON};

// ============================================================
// Stock por modelo
// ============================================================

const STOCK = ${stockJSON};

Object.assign(window, { ARTICLES, BRANDS_INFO, STOCK, SIZE_TABLE });
`;
}

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// Servir frontend y admin desde la raíz del proyecto
app.use(express.static(ROOT));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// ══════════════════════════════════════════════════════════════
//  RUTAS
// ══════════════════════════════════════════════════════════════

// ── Health ────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, version: '2.0.0' });
});

// ── Auth ──────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body || {};
  if (usuario !== ADMIN_USER || contrasena !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { usuario, loginAt: Date.now() });
  res.json({ ok: true, token });
});

app.post('/api/logout', requireAuth, (req, res) => {
  sessions.delete(req.headers['x-admin-token']);
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  const { usuario } = sessions.get(req.headers['x-admin-token']);
  res.json({ usuario });
});

// ── Lanzamientos CRUD ─────────────────────────────────────────
app.get('/api/lanzamientos', (_req, res) => {
  res.json(readJSON(LANZ_FILE, []));
});

app.post('/api/lanzamientos', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const nuevo = normalizeLanzamiento(req.body);
  nuevo._id = Date.now().toString();

  if (!nuevo.slug || !nuevo.titulo) {
    return res.status(400).json({ error: 'slug y titulo son requeridos' });
  }
  if (items.find(l => l.slug === nuevo.slug)) {
    return res.status(409).json({ error: `El slug "${nuevo.slug}" ya existe` });
  }

  items.unshift(nuevo);
  writeJSON(LANZ_FILE, items);
  res.status(201).json(nuevo);
});

app.put('/api/lanzamientos/:slug', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const idx = items.findIndex(l => l.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: 'Lanzamiento no encontrado' });

  const updated = normalizeLanzamiento({ ...req.body, slug: req.params.slug });
  updated._id = items[idx]._id || Date.now().toString();
  items[idx] = updated;
  writeJSON(LANZ_FILE, items);
  res.json(updated);
});

app.delete('/api/lanzamientos/:slug', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const filtered = items.filter(l => l.slug !== req.params.slug);
  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Lanzamiento no encontrado' });
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
    return res.status(400).json({ error: 'No se pudo leer el archivo: ' + err.message });
  }

  if (!rows.length) return res.status(400).json({ error: 'El archivo está vacío' });

  const stock = {};
  for (const row of rows) {
    const marcaSlug  = String(row.marcaSlug  || '').trim();
    const modeloSlug = String(row.modeloSlug || '').trim();
    if (!marcaSlug || !modeloSlug) continue;

    const key = `${marcaSlug}/${modeloSlug}`;
    if (!stock[key]) stock[key] = [];

    // euTalles: "40,41,42" o "40|41|42"
    const euTalles = String(row.euTalles || '')
      .split(/[,|;]/).map(s => s.trim()).filter(Boolean);

    const rawId = String(row.id || '').trim();
    const id = rawId ||
      `${marcaSlug}-${modeloSlug}-${String(row.colorway || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    stock[key].push({
      id,
      modelo:   String(row.modelo   || '').trim(),
      colorway: String(row.colorway || '').trim(),
      precio:   Number(row.precio)  || 0,
      imagen:   String(row.imagen   || '').trim(),
      euTalles,
    });
  }

  writeJSON(STOCK_FILE, stock);

  const totalProductos = Object.values(stock).reduce((s, a) => s + a.length, 0);
  res.json({ ok: true, modelos: Object.keys(stock).length, productos: totalProductos });
});

app.delete('/api/stock', requireAuth, (_req, res) => {
  writeJSON(STOCK_FILE, {});
  res.json({ ok: true });
});

// ── PUBLICAR EN VIVO ──────────────────────────────────────────
// Genera articles-data.jsx, commitea y pushea a GitHub.
// Vercel lo despliega automáticamente vía GitHub Actions.
app.post('/api/publish', requireAuth, (req, res) => {
  try {
    const lanzamientos = readJSON(LANZ_FILE, []);
    const stock        = readJSON(STOCK_FILE, {});

    // Generar el JSX
    const jsContent = generateArticlesDataJS(lanzamientos, stock);
    fs.writeFileSync(ARTICLES_JSX, jsContent, 'utf8');

    // Git: asegurar user config (necesario si git no está configurado globalmente)
    try { execSync('git config user.email "admin@botinesaltagamacba.com"', { cwd: ROOT, stdio: 'pipe' }); } catch {}
    try { execSync('git config user.name "Botines Alta Gama Admin"', { cwd: ROOT, stdio: 'pipe' }); } catch {}

    // Git: add → commit → push
    const ts = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const msg = `Admin: publicar ${lanzamientos.length} lanzamientos — ${ts}`;

    execSync('git add src/articles-data.jsx', { cwd: ROOT, stdio: 'pipe' });

    // Si no hay cambios staged, no commitear
    try {
      execSync(`git commit -m "${msg}"`, { cwd: ROOT, stdio: 'pipe' });
    } catch (e) {
      const out = (e.stdout || '').toString() + (e.stderr || '').toString();
      // "nothing to commit" es OK
      if (!out.includes('nothing to commit') && !out.includes('nothing added')) throw e;
    }

    execSync('git push origin main', { cwd: ROOT, stdio: 'pipe' });

    res.json({
      ok: true,
      lanzamientos: lanzamientos.length,
      modelos:      Object.keys(stock).length,
      timestamp:    new Date().toISOString(),
    });
  } catch (err) {
    console.error('[publish]', err.message);
    res.status(500).json({
      error: err.message,
      hint: 'Verificá que git esté configurado y tengas acceso a internet.',
    });
  }
});

// ── Start ─────────────────────────────────────────────────────
const os = require('os');

function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log(`
  ✅  Servidor admin arriba
  ─────────────────────────────────────────────
  💻  Este equipo
      📰  Admin  → http://localhost:${PORT}/admin.html
      🌐  Sitio  → http://localhost:${PORT}/index.html

  📱  Otros dispositivos (misma red Wi-Fi)
      📰  Admin  → http://${localIP}:${PORT}/admin.html
      🌐  Sitio  → http://${localIP}:${PORT}/index.html

  🔑  Login  →  admin / admin123
  ─────────────────────────────────────────────
  `);
});
