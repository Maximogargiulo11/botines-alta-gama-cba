// ============================================================
// Backend local/Railway — cliente para el admin server
//
// Prioridad de conexión:
//   1. Localhost (desarrollo local, puerto 3001)
//   2. Railway (producción, RAILWAY_BACKEND_URL)
//   3. Fallback: datos estáticos de articles-data.jsx
// ============================================================

// ── URL del backend en Railway ────────────────────────────────────
// Se actualiza automáticamente con la URL de Railway al deployar.
// En desarrollo local se usa localhost:3001.
const RAILWAY_BACKEND_URL = window.RAILWAY_URL || '';

// ── Detectar la URL correcta según el entorno ─────────────────────
const BACKEND_URL = (() => {
  const h = window.location.hostname;
  const p = window.location.port;

  // Desarrollo local: servidor Express en puerto 3001
  if (h === 'localhost' || h === '127.0.0.1') {
    return `http://${h}:3001`;
  }

  // Acceso por IP local (ej: 192.168.x.x:3001)
  if (p === '3001') {
    return `${window.location.protocol}//${h}:3001`;
  }

  // El admin está siendo servido por Railway mismo (mismo origen)
  if (h.includes('railway.app') || h.includes('up.railway.app')) {
    return window.location.origin;
  }

  // Vercel o cualquier otro CDN → usar Railway URL
  return RAILWAY_BACKEND_URL;
})();

async function checkBackend() {
  if (!BACKEND_URL) return false;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${BACKEND_URL}/api/health`, { signal: controller.signal });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

function mapLanzamientoBackend(item) {
  return {
    slug:             item.slug,
    titulo:           item.titulo,
    marca:            item.marca            || '',
    marcaSlug:        item.marcaSlug        || '',
    modeloSlug:       item.modeloSlug       || '',
    fecha:            item.fecha            || '',
    fechaISO:         item.fechaISO         || '',
    categoria:        item.categoria        || 'Lanzamiento',
    descripcionCorta: item.descripcionCorta || '',
    imagen:           item.imagen           || '',
    destacado:        Boolean(item.destacado),
    contenido:        Array.isArray(item.contenido) ? item.contenido : [],
    // Normaliza galería: preserva {type,url,size,layout} para soporte de video
    galeria: Array.isArray(item.galeria)
      ? item.galeria.map(g => {
          if (typeof g === 'string') return { type: 'image', url: g, size: 'full', layout: 'solo' };
          return { type: g.type || 'image', url: g.url || '', size: g.size || 'full', layout: g.layout || 'solo' };
        }).filter(g => g.url)
      : [],
    videoPortada: item.videoPortada || '',
    detallesTecnicos: {
      suela:     item.detallesTecnicos?.suela     || '',
      terreno:   item.detallesTecnicos?.terreno   || '',
      peso:      item.detallesTecnicos?.peso       || '',
      colorways: Array.isArray(item.detallesTecnicos?.colorways)
        ? item.detallesTecnicos.colorways : [],
    },
    coleccion: item.coleccion || '',
  };
}

function mapProductoBackend(p) {
  const tallesDisponibles = (p.euTalles || []).map(eu => {
    const match = (window.SIZE_TABLE || []).find(t => t.eu === eu);
    return match || { us: '', uk: '', eu, cm: '' };
  });
  return {
    id:       p.id,
    modelo:   p.modelo,
    colorway: p.colorway || '',
    precio:   Number(p.precio) || 0,
    imagen:   p.imagen || '',
    tallesDisponibles,
  };
}

async function loadBackendData() {
  const available = await checkBackend();
  if (!available) return;

  window.BACKEND_ACTIVE = true;
  console.log('[Backend] Servidor detectado en', BACKEND_URL);

  try {
    const [lanzamientos, stock] = await Promise.all([
      fetch(`${BACKEND_URL}/api/lanzamientos`).then(r => r.json()),
      fetch(`${BACKEND_URL}/api/stock`).then(r => r.json()),
    ]);

    if (Array.isArray(lanzamientos) && lanzamientos.length > 0) {
      window.ARTICLES = lanzamientos.map(mapLanzamientoBackend);
    }

    if (stock && Object.keys(stock).length > 0) {
      window.STOCK = {};
      for (const [key, productos] of Object.entries(stock)) {
        window.STOCK[key] = productos.map(mapProductoBackend);
      }
    }

    window.dispatchEvent(new CustomEvent('data-loaded'));
    console.log('[Backend] Datos cargados ✓', {
      articulos: window.ARTICLES?.length,
      modelos:   Object.keys(window.STOCK || {}).length,
    });
  } catch (err) {
    console.warn('[Backend] Error al cargar datos:', err.message);
  }
}

loadBackendData();
Object.assign(window, { loadBackendData, BACKEND_URL, RAILWAY_BACKEND_URL });
