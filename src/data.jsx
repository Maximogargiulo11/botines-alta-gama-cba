// ============================================================
// Datos — F50 Tunit como lanzamiento principal, Hora Dorada secundario
// ============================================================

const BRANDS = [
  {
    id: 'adidas',
    name: 'adidas',
    tagline: 'F50 Tunit · Predator · Copa',
    count: 16,
    accent: '#ccff33',
    models: ['F50 Tunit', 'F50 Hora Dorada', 'Predator', 'Copa Pure']
  },
  {
    id: 'nike',
    name: 'Nike',
    tagline: 'Mercurial · Phantom · Tiempo',
    count: 18,
    accent: '#d4d4d4',
    models: ['Mercurial', 'Phantom', 'Tiempo', 'Air Zoom']
  },
  {
    id: 'puma',
    name: 'Puma',
    tagline: 'Future · Ultra · King',
    count: 9,
    accent: '#a89878',
    models: ['Future', 'Ultra', 'King']
  },
  {
    id: 'newbalance',
    name: 'New Balance',
    tagline: 'Furon · Tekela',
    count: 6,
    accent: '#b8a080',
    models: ['Furon V7+', 'Tekela V4+', '442 Pro']
  }
];

const ALL_SIZES = ['39', '40', '41', '42', '43', '44', '45'];

const PRODUCTS = [
  {
    id: 'f50-tunit',
    name: 'F50 Tunit Archive',
    brand: 'adidas',
    line: 'F50 Tunit · Reedición',
    price: 529990,
    badge: 'Nuevo Drop',
    featured: true,
    colorway: 'Solar Yellow / Electric Blue',
    sizes: ['40', '41', '42', '43', '44'],
    img: 'assets/tunit-single.jpg',
    imgFit: 'cover'
  },
  {
    id: 'f50-hora-dorada',
    name: 'F50 Hora Dorada Elite',
    brand: 'adidas',
    line: 'Signature Messi',
    price: 489990,
    badge: 'Edición Limitada',
    colorway: 'Solar Gold / Wonder Clay',
    sizes: ['40', '41', '42', '43', '44'],
    img: 'assets/hora-dorada-boot.jpg',
    imgFit: 'cover'
  },
  {
    id: 'mercurial-vapor-16',
    name: 'Mercurial Vapor 16 Elite',
    brand: 'nike',
    line: 'Air Zoom Mercurial',
    price: 459990,
    badge: 'Nuevo',
    colorway: 'Blueprint Pack',
    sizes: ['41', '42', '43', '44', '45'],
    imgLabel: 'NIKE MERCURIAL'
  },
  {
    id: 'predator-elite-ll',
    name: 'Predator Elite LL',
    brand: 'adidas',
    line: 'Predator 24',
    price: 429990,
    colorway: 'Core Black / Solar Red',
    sizes: ['40', '41', '42', '43'],
    imgLabel: 'ADIDAS PREDATOR'
  },
  {
    id: 'phantom-gx-2',
    name: 'Phantom GX II Elite',
    brand: 'nike',
    line: 'Phantom',
    price: 419990,
    badge: 'Restock',
    colorway: 'Erling Haaland Pack',
    sizes: ['42', '43', '44'],
    imgLabel: 'NIKE PHANTOM'
  },
  {
    id: 'future-ultimate-1',
    name: 'Future 7 Ultimate',
    brand: 'puma',
    line: 'Future',
    price: 379990,
    colorway: 'Eclipse Pack',
    sizes: ['40', '41', '42', '43', '44'],
    imgLabel: 'PUMA FUTURE'
  },
  {
    id: 'furon-v7-pro',
    name: 'Furon V7+ Pro FG',
    brand: 'newbalance',
    line: 'Furon',
    price: 349990,
    colorway: 'Raheem Sterling',
    sizes: ['41', '42', '43'],
    imgLabel: 'NB FURON'
  },
  {
    id: 'copa-pure-2',
    name: 'Copa Pure II Elite',
    brand: 'adidas',
    line: 'Copa',
    price: 389990,
    badge: 'Pocas unidades',
    colorway: 'Core White / Lucid Lemon',
    sizes: ['40', '41', '43'],
    imgLabel: 'ADIDAS COPA PURE'
  },
  {
    id: 'tiempo-legend-10',
    name: 'Tiempo Legend 10 Elite',
    brand: 'nike',
    line: 'Tiempo',
    price: 399990,
    colorway: 'Mad Ready Pack',
    sizes: ['40', '41', '42', '43', '44', '45'],
    imgLabel: 'NIKE TIEMPO'
  },
  {
    id: 'x-crazyfast-1',
    name: 'X Crazyfast.1 FG',
    brand: 'adidas',
    line: 'X Crazyfast',
    price: 369990,
    colorway: 'Lucid Pink / Core Black',
    sizes: ['41', '42', '44'],
    imgLabel: 'ADIDAS X'
  },
  {
    id: 'ultra-ultimate',
    name: 'Ultra 5 Ultimate',
    brand: 'puma',
    line: 'Ultra',
    price: 339990,
    colorway: 'Supercharge Pack',
    sizes: ['40', '42', '43', '44'],
    imgLabel: 'PUMA ULTRA'
  },
  {
    id: 'tekela-v4',
    name: 'Tekela V4+ Pro',
    brand: 'newbalance',
    line: 'Tekela',
    price: 319990,
    colorway: 'Bright Lapis / Black',
    sizes: ['41', '42', '43', '44'],
    imgLabel: 'NB TEKELA'
  }
];

const NEXT_DROP = {
  name: 'Nike Mercurial Superfly 10 — "Air Max"',
  brand: 'Nike',
  dateISO: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
  description: 'El nuevo capítulo del Mercurial llega con espuma Air Max en la mediasuela y una silueta completamente rediseñada. 150 unidades en Argentina.',
  units: 150,
  price: 549990
};

const PAST_DROPS = [
  {
    id: 'drop-tunit',
    title: 'F50 Tunit Archive',
    brand: 'adidas',
    subtitle: 'Reedición 2026',
    date: '23 ABR 2026',
    status: 'DISPONIBLE',
    img: 'assets/tunit-single.jpg'
  },
  {
    id: 'drop-hora-dorada',
    title: 'F50 Hora Dorada',
    brand: 'adidas',
    subtitle: 'Signature Messi',
    date: '18 ABR 2026',
    status: 'POCAS UNIDADES',
    img: 'assets/hora-dorada-boot.jpg'
  },
  {
    id: 'drop-blueprint',
    title: 'Blueprint Pack',
    brand: 'Nike',
    subtitle: 'Mercurial · Phantom · Tiempo',
    date: '02 ABR 2026',
    status: 'AGOTADO',
    imgLabel: 'NIKE BLUEPRINT'
  }
];

const TESTIMONIALS = [
  { name: 'Mateo S.', role: 'Club Atlético Belgrano', text: 'Llegaron antes de tiempo y en caja original. El F50 Tunit es otro nivel — el amarillo se ve aún más vivo en vivo.' },
  { name: 'Nicolás R.', role: 'Liga Cordobesa', text: 'Es la tercera vez que compro. El asesoramiento por talle es clave.' },
  { name: 'Franco M.', role: 'Futsal Profesional', text: 'Tengo los Phantom que acá en Córdoba no conseguís en ningún otro lado.' }
];

Object.assign(window, {
  BRANDS, PRODUCTS, NEXT_DROP, PAST_DROPS, TESTIMONIALS, ALL_SIZES
});
