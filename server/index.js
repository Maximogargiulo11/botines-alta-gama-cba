const express  = require('express');
const cors     = require('cors');
const multer   = require('multer');
const XLSX     = require('xlsx');
const fs       = require('fs');
const path     = require('path');
const crypto   = require('crypto');
const os       = require('os');
const { execSync } = require('child_process');

const app  = express();

// ── Puerto: Railway inyecta process.env.PORT, localmente usa 3001 ──
const PORT = process.env.PORT || 3001;

// ── Credenciales desde variables de entorno (o valores por defecto) ──
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// ── GitHub: para publicar desde Railway sin git local ─────────────
const GITHUB_TOKEN  = process.env.GITHUB_TOKEN  || '';
const GITHUB_REPO   = process.env.GITHUB_REPO   || 'Maximogargiulo11/botines-alta-gama-cba';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

// ── Rutas de datos ─────────────────────────────────────────────────
const ROOT         = path.join(__dirname, '..');
const DATA_DIR     = path.join(__dirname, 'data');
const LANZ_FILE    = path.join(DATA_DIR, 'lanzamientos.json');
const STOCK_FILE   = path.join(DATA_DIR, 'stock.json');
const ARTICLES_JSX = path.join(ROOT, 'src', 'articles-data.jsx');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(LANZ_FILE))  fs.writeFileSync(LANZ_FILE,  '[]',  'utf8');
if (!fs.existsSync(STOCK_FILE)) fs.writeFileSync(STOCK_FILE, '{}',  'utf8');

// ── Auth: tokens firmados con HMAC (sin estado en servidor) ───────
// Secret derivado de ADMIN_PASS → estable entre reinicios de Railway.
// Se puede sobreescribir con la variable de entorno SESSION_SECRET.
const SESSION_SECRET = process.env.SESSION_SECRET ||
  crypto.createHash('sha256').update('botines-alta-gama-cba-' + ADMIN_PASS).digest('hex');

const TOKEN_TTL = 30 * 24 * 60 * 60 * 1000; // 30 días

function createToken(usuario) {
  const expires = Date.now() + TOKEN_TTL;
  const payload = `${usuario}:${expires}`;
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

function verifyToken(rawToken) {
  try {
    const decoded  = Buffer.from(rawToken, 'base64url').toString('utf8');
    const lastColon = decoded.lastIndexOf(':');
    const payload  = decoded.slice(0, lastColon);
    const sig      = decoded.slice(lastColon + 1);
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    // comparación en tiempo constante para evitar timing attacks
    if (sig.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return null;
    const colonIdx = payload.indexOf(':');
    const usuario  = payload.slice(0, colonIdx);
    const expires  = Number(payload.slice(colonIdx + 1));
    if (!usuario || isNaN(expires) || Date.now() > expires) return null;
    return { usuario };
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
}

// ── Helpers JSON ───────────────────────────────────────────────────
function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ── Normalizar lanzamiento ─────────────────────────────────────────
function normalizeLanzamiento(raw) {
  const contenido = typeof raw.contenido === 'string'
    ? raw.contenido.split('|||').map(s => s.trim()).filter(Boolean)
    : (Array.isArray(raw.contenido) ? raw.contenido : []);

  const colorways = typeof raw.detallesTecnicos?.colorways === 'string'
    ? raw.detallesTecnicos.colorways.split('|').map(s => s.trim()).filter(Boolean)
    : (Array.isArray(raw.detallesTecnicos?.colorways) ? raw.detallesTecnicos.colorways : []);

  // Galería: aceptar strings o {type,url,size,layout}; guardar como objetos internamente
  const galeria = Array.isArray(raw.galeria)
    ? raw.galeria.map(g => typeof g === 'string'
        ? { type: 'image', url: g, size: 'full', layout: 'solo' }
        : { type: g.type || 'image', url: g.url || '', size: g.size || 'full', layout: g.layout || 'solo' })
      .filter(g => g.url)
    : [];

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
    visible:          raw.visible !== false,
    contenido,
    galeria,
    videoPortada:          raw.videoPortada          || '',
    urlInstagram:          raw.urlInstagram          || '',
    instagramHandle:       raw.instagramHandle       || '',
    productoRelacionadoId: raw.productoRelacionadoId || '',
    detallesTecnicos: {
      suela:     raw.detallesTecnicos?.suela     || '',
      terreno:   raw.detallesTecnicos?.terreno   || '',
      peso:      raw.detallesTecnicos?.peso       || '',
      colorways,
    },
    coleccion: raw.coleccion || '',
  };
}

// ── Tabla de talles ────────────────────────────────────────────────
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

// ── Marcas estáticas ───────────────────────────────────────────────
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

// ── Generar src/articles-data.jsx ─────────────────────────────────
function generateArticlesDataJS(lanzamientos, stockRaw) {
  const ts = new Date().toISOString();

  // Solo publicar artículos visibles (visible !== false)
  const visibles = lanzamientos.filter(l => l.visible !== false);

  // Limpiar campos internos y normalizar galería → preservar {type,url,size,layout} para video
  const articles = visibles.map(l => {
    const { _id, ...rest } = l;
    rest.galeria = Array.isArray(rest.galeria)
      ? rest.galeria.map(g => {
          if (typeof g === 'string') return { type: 'image', url: g, size: 'full', layout: 'solo' };
          return { type: g.type || 'image', url: g.url || '', size: g.size || 'full', layout: g.layout || 'solo' };
        }).filter(g => g.url)
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

  const articlesJSON = JSON.stringify(articles,   null, 2);
  const brandsJSON   = JSON.stringify(BRANDS_INFO, null, 2);
  const sizeJSON     = JSON.stringify(SIZE_TABLE,  null, 2);
  const stockJSON    = JSON.stringify(stock,       null, 2);

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

// ══════════════════════════════════════════════════════════════════
//  PUBLICAR VÍA GITHUB API (modo producción / Railway)
//  Crea un commit atómico con los 3 archivos actualizados.
// ══════════════════════════════════════════════════════════════════
async function pushToGitHubAPI(lanzamientos, stock, jsContent) {
  const apiBase = `https://api.github.com/repos/${GITHUB_REPO}`;
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept':        'application/vnd.github.v3+json',
    'Content-Type':  'application/json',
    'User-Agent':    'botines-alta-gama-admin/1.0',
  };

  async function ghFetch(endpoint, options = {}) {
    const res = await fetch(`${apiBase}${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options.headers || {}) },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`GitHub API [${endpoint}]: ${err.message || res.status}`);
    }
    return res.json();
  }

  // 1. Obtener SHA del último commit en la rama
  const refData    = await ghFetch(`/git/ref/heads/${GITHUB_BRANCH}`);
  const parentSha  = refData.object.sha;

  // 2. Obtener el árbol (tree) del commit padre
  const commitData = await ghFetch(`/git/commits/${parentSha}`);
  const treeSha    = commitData.tree.sha;

  // 3. Preparar los archivos a commitear
  const ts = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const filesToCommit = [
    { path: 'src/articles-data.jsx',          content: jsContent },
    { path: 'server/data/lanzamientos.json',   content: JSON.stringify(lanzamientos, null, 2) },
    { path: 'server/data/stock.json',          content: JSON.stringify(stock, null, 2) },
  ];

  // 4. Crear blobs para cada archivo
  const treeItems = await Promise.all(filesToCommit.map(async (f) => {
    const blob = await ghFetch('/git/blobs', {
      method: 'POST',
      body: JSON.stringify({ content: f.content, encoding: 'utf-8' }),
    });
    return { path: f.path, mode: '100644', type: 'blob', sha: blob.sha };
  }));

  // 5. Crear nuevo tree
  const newTree = await ghFetch('/git/trees', {
    method: 'POST',
    body: JSON.stringify({ base_tree: treeSha, tree: treeItems }),
  });

  // 6. Crear commit
  const newCommit = await ghFetch('/git/commits', {
    method: 'POST',
    body: JSON.stringify({
      message: `Admin: publicar ${lanzamientos.length} lanzamientos — ${ts}`,
      tree:    newTree.sha,
      parents: [parentSha],
    }),
  });

  // 7. Avanzar la referencia de la rama
  await ghFetch(`/git/refs/heads/${GITHUB_BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: newCommit.sha, force: false }),
  });

  return newCommit.sha;
}

// ══════════════════════════════════════════════════════════════════
//  PUBLICAR VÍA GIT LOCAL (modo desarrollo)
// ══════════════════════════════════════════════════════════════════
function pushViaLocalGit(lanzamientos, jsContent) {
  // Asegurar configuración de usuario git
  try { execSync('git config user.email "admin@botinesaltagamacba.com"', { cwd: ROOT, stdio: 'pipe' }); } catch {}
  try { execSync('git config user.name "Botines Alta Gama Admin"',      { cwd: ROOT, stdio: 'pipe' }); } catch {}

  const ts  = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const msg = `Admin: publicar ${lanzamientos.length} lanzamientos — ${ts}`;

  execSync('git add src/articles-data.jsx', { cwd: ROOT, stdio: 'pipe' });

  try {
    execSync(`git commit -m "${msg}"`, { cwd: ROOT, stdio: 'pipe' });
  } catch (e) {
    const out = (e.stdout || '').toString() + (e.stderr || '').toString();
    if (!out.includes('nothing to commit') && !out.includes('nothing added')) throw e;
  }

  execSync('git push origin main', { cwd: ROOT, stdio: 'pipe' });
}

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(ROOT));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// ══════════════════════════════════════════════════════════════════
//  RUTAS
// ══════════════════════════════════════════════════════════════════

// ── Health ─────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    ok:      true,
    version: '3.0.0',
    mode:    GITHUB_TOKEN ? 'railway' : 'local',
    env:     process.env.NODE_ENV || 'development',
  });
});

// ── Auth ────────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body || {};
  if (usuario !== ADMIN_USER || contrasena !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
  const token = createToken(usuario);
  res.json({ ok: true, token });
});

app.post('/api/logout', requireAuth, (_req, res) => {
  // Con tokens firmados no hay estado en servidor; el cliente solo borra el token local.
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  const { usuario } = verifyToken(req.headers['x-admin-token']);
  res.json({ usuario });
});

// ── Lanzamientos CRUD ───────────────────────────────────────────────
app.get('/api/lanzamientos', (req, res) => {
  const all = readJSON(LANZ_FILE, []);
  // Admin (con token válido) ve todos; el público solo los visibles
  const isAdmin = req.headers['x-admin-token'] && verifyToken(req.headers['x-admin-token']);
  res.json(isAdmin ? all : all.filter(l => l.visible !== false));
});

app.post('/api/lanzamientos', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const nuevo = normalizeLanzamiento(req.body);
  nuevo._id   = Date.now().toString();

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

// Toggle rápido de campos booleanos (visible / destacado) sin PUT completo
app.patch('/api/lanzamientos/:slug', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const idx   = items.findIndex(l => l.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const allowed = ['visible', 'destacado'];
  for (const key of allowed) {
    if (key in req.body) items[idx][key] = Boolean(req.body[key]);
  }
  writeJSON(LANZ_FILE, items);
  res.json(items[idx]);
});

app.put('/api/lanzamientos/:slug', requireAuth, (req, res) => {
  const items = readJSON(LANZ_FILE, []);
  const idx   = items.findIndex(l => l.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: 'Lanzamiento no encontrado' });

  const updated  = normalizeLanzamiento({ ...req.body, slug: req.params.slug });
  updated._id    = items[idx]._id || Date.now().toString();
  items[idx]     = updated;
  writeJSON(LANZ_FILE, items);
  res.json(updated);
});

app.delete('/api/lanzamientos/:slug', requireAuth, (req, res) => {
  const items    = readJSON(LANZ_FILE, []);
  const filtered = items.filter(l => l.slug !== req.params.slug);
  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Lanzamiento no encontrado' });
  }
  writeJSON(LANZ_FILE, filtered);
  res.json({ ok: true });
});

// ── Stock ────────────────────────────────────────────────────────────
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

    const euTalles = String(row.euTalles || '')
      .split(/[,|;]/).map(s => s.trim()).filter(Boolean);

    const rawId = String(row.id || '').trim();
    const id    = rawId ||
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

// ── PUBLICAR EN VIVO ─────────────────────────────────────────────────
// Modo Railway: GitHub API (commit atómico, sin git local)
// Modo local:   git local commit + push
app.post('/api/publish', requireAuth, async (req, res) => {
  try {
    const lanzamientos = readJSON(LANZ_FILE, []);
    const stock        = readJSON(STOCK_FILE, {});
    const jsContent    = generateArticlesDataJS(lanzamientos, stock);

    let commitSha = null;
    let mode      = 'local';

    if (GITHUB_TOKEN) {
      // ── Producción (Railway): GitHub API ──────────────────────────
      commitSha = await pushToGitHubAPI(lanzamientos, stock, jsContent);
      mode      = 'github-api';
    } else {
      // ── Desarrollo (local): git local ─────────────────────────────
      fs.writeFileSync(ARTICLES_JSX, jsContent, 'utf8');
      pushViaLocalGit(lanzamientos, jsContent);
      mode = 'git-local';
    }

    res.json({
      ok:           true,
      lanzamientos: lanzamientos.filter(l => l.visible !== false).length,
      modelos:      Object.keys(stock).length,
      timestamp:    new Date().toISOString(),
      mode,
      commit:       commitSha,
    });
  } catch (err) {
    console.error('[publish]', err.message);
    res.status(500).json({
      error: err.message,
      hint: GITHUB_TOKEN
        ? 'Verificá que GITHUB_TOKEN tenga permisos de escritura en el repositorio.'
        : 'Verificá que git esté configurado y tengas acceso a internet.',
    });
  }
});

// ── Start ─────────────────────────────────────────────────────────────
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
  const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.PORT);
  const localIP   = getLocalIP();

  if (isRailway) {
    console.log(`
  ✅  Servidor corriendo en Railway
  ─────────────────────────────────────────────
  📰  Panel admin  → https://<tu-dominio>.railway.app/admin.html
  🔑  Login        → ${ADMIN_USER} / [ver env vars]
  📦  Modo publish → GitHub API
  ─────────────────────────────────────────────
    `);
  } else {
    console.log(`
  ✅  Servidor admin local — puerto ${PORT}
  ─────────────────────────────────────────────
  💻  Este equipo
      📰  Admin  → http://localhost:${PORT}/admin.html
      🌐  Sitio  → http://localhost:${PORT}/index.html

  📱  Otros dispositivos (misma red Wi-Fi)
      📰  Admin  → http://${localIP}:${PORT}/admin.html
      🌐  Sitio  → http://${localIP}:${PORT}/index.html

  🔑  Login  →  ${ADMIN_USER} / ${ADMIN_PASS}
  ─────────────────────────────────────────────
    `);
  }
});
