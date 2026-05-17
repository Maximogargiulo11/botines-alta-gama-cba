// ============================================================
// Backend local — cliente para el admin server (puerto 3001)
//
// Solo activo cuando node server/index.js está corriendo.
// Tiene prioridad sobre Sanity y Google Sheets.
// ============================================================

const BACKEND_URL = 'http://localhost:3001';

async function checkBackend() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
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
    galeria:          Array.isArray(item.galeria)   ? item.galeria   : [],
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
  console.log('[Backend] Servidor local detectado, usando datos del admin.');

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
    console.log('[Backend] Datos cargados desde servidor local ✓');
  } catch (err) {
    console.warn('[Backend] Error al cargar datos:', err.message);
  }
}

loadBackendData();
Object.assign(window, { loadBackendData, BACKEND_URL });
