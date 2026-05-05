// ============================================================
// Datos — F50 Tunit como lanzamiento principal, Hora Dorada secundario
// ============================================================

const BRANDS = [
  {
    id: 'adidas',
    name: 'adidas',
    tagline: 'F50 Tunit · Predator · Copa',
    count: 16,
    accent: '#ffffff',
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
    img: 'assets/tunit-single.jpg',
    price: 529990,
    colorway: 'Solar Yellow / Electric Blue',
    sizes: ['40', '41', '42', '43', '44'],
    units: 80,
    collection: 'adidas Originals · F50 Archive',
    designer: 'adidas Football Innovation Team',
    lead: 'Veintidós años después, adidas vuelve a abrir el archivo del botín que cambió las reglas del juego. El F50 Tunit regresa con su sistema modular intacto: un upper, dos colorways, infinitas combinaciones.',
    description: 'adidas toca el archivo una vez más. El último lanzamiento del icónico F50 Tunit regresa con upper desmontable en solar yellow y placa de carbono, recuperando el sistema modular que definió una era. Cada par viene con dos uppers intercambiables y bolsa de transporte.',
    why: 'Cuando adidas lanzó el F50 Tunit en 2004, planteó una pregunta simple: ¿por qué un botín debe ser una sola cosa? El sistema permitía intercambiar uppers según el clima y la cancha, conectados a una base común mediante un sistema de tornillos. Lo usó Beckham, lo usó Henry, lo usó Robben — hasta que el mercado pidió simplificar y el sistema desapareció. Esta reedición no es nostalgia: es un statement sobre customización en una era donde todo se personaliza menos los botines.',
    facts: [
      ['Sistema', 'Upper desmontable + base común'],
      ['Placa', 'Carbono Carbitex CX6'],
      ['Tacos', '12 SG mixtos + 8 FG'],
      ['Peso', '215g (talle 42)'],
      ['Origen', 'Hecho en Alemania']
    ],
    gallery: ['assets/tunit-card-hero.jpg', 'assets/tunit-single.jpg', 'assets/tunit-closeup.jpg', 'assets/tunit-sole.jpg', 'assets/tunit-detail.jpg', 'assets/tunit-player-holding.jpg']
  },
  {
    id: 'drop-hora-dorada',
    title: 'F50 Hora Dorada',
    brand: 'adidas',
    subtitle: 'Signature Messi',
    date: '18 ABR 2026',
    status: 'POCAS UNIDADES',
    img: 'assets/hora-dorada-boot.jpg',
    price: 489990,
    colorway: 'Solar Gold / Wonder Clay',
    sizes: ['40', '41', '42', '43', '44'],
    units: 120,
    collection: 'adidas × Leo Messi · FW26 Signature',
    designer: 'adidas Football × LM10 Studio',
    lead: 'La hora dorada — ese momento en que la luz se vuelve oro y todo tiene un peso distinto. Messi y adidas la traducen a un botín.',
    description: 'adidas presenta la nueva signature F50 de Messi. Un tributo al momento en que la luz se vuelve oro. Edición limitada de 120 unidades con colorway Solar Gold y acabado metálico único, inspirada en el último partido del 10 con la luz del atardecer.',
    why: 'Toda signature de Messi cuenta una historia. Las Adi-Pure de 2007 hablaban del pibe del PlayStation. Las F50 adiZero de 2010 eran sobre velocidad. Hora Dorada es sobre algo más personal: el final del partido, la luz cayéndose, el campo vacío. El acabado metálico no es un truco visual — es lo que pasa cuando una cámara de televisión captura los últimos minutos del entretiempo. adidas trabajó con el equipo personal de Messi durante 14 meses para llegar a este tono específico de oro.',
    facts: [
      ['Numeración', '120 pares globales'],
      ['Acabado', 'Metálico solar gold'],
      ['Plantilla', 'Bordado #LM10 hilo dorado'],
      ['Caja', 'Edición especial con certificado'],
      ['Drop', '18 ABR 2026 · 09:00 ART']
    ],
    gallery: ['assets/hora-dorada-boot.jpg', 'assets/hora-dorada-closeup.jpg', 'assets/hora-dorada-sole.jpg', 'assets/hora-dorada-messi-standing.jpg', 'assets/hora-dorada-messi-sitting.jpg']
  },
  {
    id: 'drop-united-pack',
    title: "Nike 'United' Pack",
    brand: 'Nike',
    subtitle: 'Chapter 3 · Women\'s Football',
    date: '30 ABR 2026',
    status: 'DISPONIBLE',
    img: 'assets/drop-nike-united.jpg',
    price: 459990,
    colorway: 'White / Pink Blast / Black',
    sizes: ['38', '39', '40', '41', '42'],
    units: 200,
    collection: 'Nike Football · United Pack Chapter 3',
    designer: "Nike Women's Football Studio",
    lead: 'Capítulo 3 de la serie que une a las jugadoras más influyentes del fútbol femenino bajo una sola estética.',
    description: '@nikefootball reúne a algunas de las mejores jugadoras del fútbol femenino y embajadoras de la marca para lanzar el capítulo 3 de esta serie.',
    why: 'En 2023, antes de la Copa del Mundo, Nike lanzó el primer United Pack: una colorway compartida por todas sus embajadoras del juego femenino — Lavelle, Bronze, Hegerberg, Marta. Fue una declaración: el fútbol femenino merecía su propio momento de drop, no un colorway adaptado del masculino. Llegó luego el United Golden, después dos capítulos en 2024. Este Capítulo 3 sigue la tradición: un solo aspecto, todas las siluetas (Mercurial, Phantom, Tiempo), atado a un calendario específicamente de competencias femeninas.',
    facts: [
      ['Capítulo', '3 de la serie United'],
      ['Siluetas', 'Mercurial · Phantom · Tiempo'],
      ['Atletas', 'Lavelle · Bronze · Putellas · Hegerberg'],
      ['Lanzamiento original', '2023, pre-Mundial Femenino'],
      ['Colorway', 'White con detalles en pink blast']
    ],
    gallery: ['assets/drop-nike-united.jpg']
  },
  {
    id: 'drop-blueprint',
    title: 'Blueprint Pack',
    brand: 'Nike',
    subtitle: 'Mercurial · Phantom · Tiempo',
    date: '02 ABR 2026',
    status: 'AGOTADO',
    imgLabel: 'NIKE BLUEPRINT'
  },
  {
    id: 'drop-eclipse',
    title: 'Eclipse Pack',
    brand: 'Puma',
    subtitle: 'Future · Ultra',
    date: '20 MAR 2026',
    status: 'POCAS UNIDADES',
    imgLabel: 'PUMA ECLIPSE'
  },
  {
    id: 'drop-mad-ready',
    title: 'Mad Ready Pack',
    brand: 'Nike',
    subtitle: 'Tiempo Legend 10',
    date: '08 MAR 2026',
    status: 'AGOTADO',
    imgLabel: 'NIKE MAD READY'
  },
  {
    id: 'drop-furon-sterling',
    title: 'Furon V7+ Sterling',
    brand: 'New Balance',
    subtitle: 'Raheem Sterling Edition',
    date: '24 FEB 2026',
    status: 'DISPONIBLE',
    imgLabel: 'NB FURON'
  },
  {
    id: 'drop-supercharge',
    title: 'Supercharge Pack',
    brand: 'Puma',
    subtitle: 'Ultra 5 Ultimate',
    date: '12 FEB 2026',
    status: 'POCAS UNIDADES',
    imgLabel: 'PUMA SUPERCHARGE'
  },
  {
    id: 'drop-haaland',
    title: 'Erling Haaland Pack',
    brand: 'Nike',
    subtitle: 'Phantom GX II Elite',
    date: '28 ENE 2026',
    status: 'AGOTADO',
    imgLabel: 'NIKE PHANTOM HAALAND'
  },
  {
    id: 'drop-king-heritage',
    title: 'King Heritage',
    brand: 'Puma',
    subtitle: 'Black & Gold Classic',
    date: '10 ENE 2026',
    status: 'DISPONIBLE',
    imgLabel: 'PUMA KING'
  },
  {
    id: 'drop-predator-solar',
    title: 'Predator Elite LL',
    brand: 'adidas',
    subtitle: 'Solar Red Edition',
    date: '22 DIC 2025',
    status: 'AGOTADO',
    imgLabel: 'ADIDAS PREDATOR'
  },
  {
    id: 'drop-tekela-lapis',
    title: 'Tekela V4+ Pro',
    brand: 'New Balance',
    subtitle: 'Bright Lapis',
    date: '05 DIC 2025',
    status: 'POCAS UNIDADES',
    imgLabel: 'NB TEKELA'
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
