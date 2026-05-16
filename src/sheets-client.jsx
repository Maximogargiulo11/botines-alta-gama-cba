// ============================================================
// Google Sheets — cliente de datos para el frontend
//
// Sin build step. La hoja debe estar compartida como
// "Cualquiera con el enlace puede ver".
//
// Pestañas requeridas:  lanzamientos  |  stock
// Setup completo en:   GOOGLE_SHEETS_SETUP.md
// ============================================================

// ⚠️  Reemplazá con el ID de tu Google Spreadsheet.
// Lo encontrás en la URL de la hoja:
//   docs.google.com/spreadsheets/d/  →ESTE_VALOR←  /edit
const SHEET_ID = 'YOUR_SPREADSHEET_ID';

const isSheetsConfigured = () => SHEET_ID !== 'YOUR_SPREADSHEET_ID';

// ── CSV parser (maneja campos con comas y comillas) ──────────

function parseCSV(text) {
  const rows = [];
  for (const line of text.trim().split('\n')) {
    const row = [];
    let field = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') { field += '"'; i++; }
        else inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) {
        row.push(field.trim());
        field = '';
      } else {
        field += ch;
      }
    }
    row.push(field.trim());
    rows.push(row);
  }
  return rows;
}

function rowsToObjects(rows) {
  const [headerRow, ...data] = rows;
  const headers = headerRow.map(h => h.replace(/^"|"$/g, '').trim());
  return data
    .filter(row => row.some(f => f !== ''))
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = (row[i] || '').replace(/^"|"$/g, '').trim();
      });
      return obj;
    });
}

async function fetchSheet(sheetName) {
  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}` +
    `/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet "${sheetName}": HTTP ${res.status}`);
  return rowsToObjects(parseCSV(await res.text()));
}

// ── Mapper: fila "lanzamientos" → objeto ARTICLES ────────────

function mapLanzamiento(row) {
  return {
    slug:             row.slug,
    titulo:           row.titulo,
    marca:            row.marca,
    marcaSlug:        row.marcaSlug,
    modeloSlug:       row.modeloSlug,
    fecha:            row.fecha || '',
    fechaISO:         row.fechaISO || '',
    categoria:        row.categoria || 'Lanzamiento',
    descripcionCorta: row.descripcionCorta || '',
    imagen:           row.imagen || '',
    destacado:        row.destacado === 'TRUE' || row.destacado === '1',
    // Párrafos separados por |||  (ej: "Párrafo 1|||Párrafo 2")
    contenido: row.contenido
      ? row.contenido.split('|||').map(s => s.trim()).filter(Boolean)
      : [],
    // URLs separadas por |
    galeria: row.galeria
      ? row.galeria.split('|').map(s => s.trim()).filter(Boolean)
      : [],
    detallesTecnicos: {
      suela:     row.suela     || '',
      terreno:   row.terreno   || '',
      peso:      row.peso      || '',
      colorways: row.colorways
        ? row.colorways.split('|').map(s => s.trim()).filter(Boolean)
        : [],
    },
    coleccion: row.coleccion || '',
  };
}

// ── Mapper: fila "stock" → objeto STOCK ──────────────────────

function mapProducto(row) {
  // euTalles: talles EU separados por coma, ej: "40,41,42,43,44"
  const euList = row.euTalles
    ? row.euTalles.split(',').map(s => s.trim()).filter(Boolean)
    : [];
  const tallesDisponibles = euList.map(eu => {
    const match = (window.SIZE_TABLE || []).find(t => t.eu === eu);
    return match || { us: '', uk: '', eu, cm: '' };
  });
  return {
    id:       row.id || `${row.marcaSlug}-${row.modeloSlug}-${row.colorway}`
                          .toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    modelo:   row.modelo,
    colorway: row.colorway || '',
    precio:   Number(row.precio) || 0,
    imagen:   row.imagen || '',
    tallesDisponibles,
  };
}

// ── Carga principal ───────────────────────────────────────────

async function loadSheetsData() {
  if (!isSheetsConfigured()) return;

  try {
    const [lanzRows, stockRows] = await Promise.all([
      fetchSheet('lanzamientos'),
      fetchSheet('stock'),
    ]);

    if (lanzRows.length > 0) {
      window.ARTICLES = lanzRows
        .filter(r => r.slug && r.titulo)
        .map(mapLanzamiento);
    }

    if (stockRows.length > 0) {
      const stock = {};
      for (const r of stockRows.filter(r => r.marcaSlug && r.modeloSlug)) {
        const key = `${r.marcaSlug}/${r.modeloSlug}`;
        if (!stock[key]) stock[key] = [];
        stock[key].push(mapProducto(r));
      }
      window.STOCK = stock;
    }

    window.dispatchEvent(new CustomEvent('data-loaded'));
    console.log('[Sheets] Datos cargados desde Google Sheets ✓');
  } catch (err) {
    console.warn('[Sheets] Usando datos locales.', err.message);
  }
}

loadSheetsData();
Object.assign(window, { loadSheetsData });
