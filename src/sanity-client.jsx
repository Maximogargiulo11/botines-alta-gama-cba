// ============================================================
// Sanity CMS — cliente HTTP para el frontend (sin build step)
// Docs: https://www.sanity.io/docs/http-query
// ============================================================

// ⚠️  Después de crear tu proyecto en sanity.io:
//    1. Reemplazá SANITY_PROJECT_ID con el ID de tu proyecto
//    2. Ajustá SANITY_DATASET si no usás "production"
// Mientras el ID sea "YOUR_PROJECT_ID", el sitio usa datos locales.

const SANITY_PROJECT_ID = 'YOUR_PROJECT_ID';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

const isSanityConfigured = () => SANITY_PROJECT_ID !== 'YOUR_PROJECT_ID';

// ── Fetch helper ─────────────────────────────────────────────

async function sanityFetch(query, params = {}) {
  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );
  url.searchParams.set('query', query);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(`$${k}`, JSON.stringify(v));
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Sanity HTTP ${res.status}`);
  const data = await res.json();
  return data.result;
}

// ── Image URL builder ─────────────────────────────────────────

function sanityImageUrl(imageField, width) {
  if (!imageField?.asset?._ref) return null;
  const ref = imageField.asset._ref;
  // ref format: "image-{assetId}-{WxH}-{ext}"
  const parts = ref.split('-');
  const ext = parts[parts.length - 1];
  const dimensions = parts[parts.length - 2];
  const assetId = parts[1];
  const filename = `${assetId}-${dimensions}.${ext}`;
  const base = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${filename}`;
  return width ? `${base}?w=${width}&auto=format&fit=crop` : base;
}

// ── Mappers: Sanity doc → formato esperado por el frontend ───

function mapLanzamiento(doc) {
  return {
    slug: doc.slug?.current,
    titulo: doc.titulo,
    marca: doc.marca,
    marcaSlug: doc.marcaSlug,
    modeloSlug: doc.modeloSlug,
    fecha: doc.fecha || '',
    fechaISO: doc.fechaISO || '',
    categoria: doc.categoria || 'Lanzamiento',
    descripcionCorta: doc.descripcionCorta || '',
    imagen: sanityImageUrl(doc.imagen, 1200) || doc.imagen,
    destacado: doc.destacado || false,
    contenido: (doc.contenido || []).filter(Boolean),
    galeria: (doc.galeria || []).map(img => sanityImageUrl(img, 900)).filter(Boolean),
    detallesTecnicos: {
      suela: doc.detallesTecnicos?.suela || '',
      terreno: doc.detallesTecnicos?.terreno || '',
      peso: doc.detallesTecnicos?.peso || '',
      colorways: doc.detallesTecnicos?.colorways || [],
    },
    coleccion: doc.coleccion || '',
  };
}

function mapProducto(doc) {
  return {
    id: doc._id,
    modelo: doc.modelo,
    colorway: doc.colorway || '',
    precio: doc.precio,
    imagen: sanityImageUrl(doc.imagen, 800) || doc.imagen,
    tallesDisponibles: doc.tallesDisponibles || [],
  };
}

// ── Carga principal ───────────────────────────────────────────

async function loadSanityData() {
  if (!isSanityConfigured()) return;

  try {
    const [lanzamientos, productos] = await Promise.all([
      sanityFetch(`*[_type == "lanzamiento"] | order(fechaISO desc)`),
      sanityFetch(`*[_type == "producto"]`),
    ]);

    if (Array.isArray(lanzamientos) && lanzamientos.length > 0) {
      window.ARTICLES = lanzamientos.map(mapLanzamiento);
    }

    if (Array.isArray(productos) && productos.length > 0) {
      const stock = {};
      for (const p of productos) {
        const key = `${p.marcaSlug}/${p.modeloSlug}`;
        if (!stock[key]) stock[key] = [];
        stock[key].push(mapProducto(p));
      }
      window.STOCK = { ...window.STOCK, ...stock };
    }

    window.dispatchEvent(new CustomEvent('sanity-loaded'));
    console.log('[Sanity] Datos cargados desde el CMS');
  } catch (err) {
    console.warn('[Sanity] No se pudo cargar datos del CMS, usando datos locales.', err.message);
  }
}

loadSanityData();
Object.assign(window, { sanityFetch, sanityImageUrl, loadSanityData });
