// ============================================================
// Datos editoriales — Lanzamientos + Stock por modelo
// ============================================================

const ARTICLES = [
  {
    slug: 'f50-tunit-archive',
    titulo: 'F50 Tunit Archive: el regreso modular',
    marca: 'adidas',
    marcaSlug: 'adidas',
    modeloSlug: 'f50',
    fecha: '23 ABR 2026',
    fechaISO: '2026-04-23',
    categoria: 'Lanzamiento',
    descripcionCorta: 'adidas reedita el botín que partió la historia en dos. Upper desmontable, placa de carbono y bolsa de transporte original.',
    imagen: 'assets/tunit-card-hero.jpg',
    destacado: true,
    contenido: [
      'Hay botines, y hay momentos. El F50 Tunit fue las dos cosas a la vez. Cuando adidas lo presentó por primera vez en 2010, no estaba simplemente lanzando otro botín de élite — estaba reescribiendo lo que un botín podía ser. Modular, customizable, pieza por pieza. Y ahora, en 2026, vuelve al archivo.',
      'La nueva Tunit Archive recupera el sistema desmontable original: dos uppers intercambiables (solar yellow y core black), placa de carbono completa y la misma bolsa de transporte gris que veníamos a buscar en cada drop de la era 2010-2012. La diferencia: catorce años de tecnología sumados a la estructura interna, con espuma Lightstrike Pro en la mediasuela y construcción tejida de última generación en la zona del empeine.',
      'No es nostalgia. Es archivo curado. adidas eligió las cinco siluetas más representativas del catálogo F50 — desde la Tunit que usó Messi en su primer Balón de Oro hasta el modelo que Robben llevó en Sudáfrica 2010 — y las reconstruyó pieza por pieza. Cada par viene numerado, con certificado de autenticidad firmado por el equipo de diseño en Herzogenaurach.',
      'La pregunta no es si vas a querer un par. La pregunta es cuál de los dos uppers vas a usar primero.'
    ],
    galeria: [
      'assets/tunit-card-hero.jpg',
      'assets/tunit-closeup.jpg',
      'assets/tunit-sole.jpg',
      'assets/tunit-detail.jpg',
      'assets/tunit-player-holding.jpg'
    ],
    detallesTecnicos: {
      suela: 'Sprintframe con placa de carbono completa',
      terreno: 'Firm Ground (FG) — superficies firmes naturales',
      peso: '195g (talle 8.5 US)',
      colorways: ['Solar Yellow / Core Black', 'Electric Blue / White', 'Triple Black']
    },
    coleccion: 'F50 Archive Collection · 14 Years Edition'
  },
  {
    slug: 'f50-hora-dorada',
    titulo: 'Hora Dorada: la signature de Messi',
    marca: 'adidas',
    marcaSlug: 'adidas',
    modeloSlug: 'f50',
    fecha: '18 ABR 2026',
    fechaISO: '2026-04-18',
    categoria: 'Signature',
    descripcionCorta: 'Una nueva signature de Messi en colorway Solar Gold. 120 unidades en Argentina con acabado metálico irrepetible.',
    imagen: 'assets/hora-dorada-boot.jpg',
    destacado: true,
    contenido: [
      'En el fútbol hay una luz específica. Es la que cae sobre las tribunas a las siete de la tarde de cualquier sábado, cuando el sol se pone justo detrás del estadio y todo se vuelve dorado por veinte minutos antes de la oscuridad. Esa luz tiene nombre: hora dorada. Y ahora también tiene su botín.',
      'adidas presenta la nueva signature F50 de Messi con un colorway que captura exactamente ese momento. Un dorado que no es metálico chillón, sino dorado solar — el mismo color que tiene la pelota cuando la luz le pega de costado en el último minuto del partido. El upper combina Solar Gold con detalles en Wonder Clay, una textura terrosa que evoca el polvo del campo al atardecer.',
      'Edición limitada de 120 unidades en Argentina. Cada par viene en caja especial con tapa metálica grabada y un certificado individual numerado, firmado por el propio Leo. La idea, según el equipo de Herzogenaurach que trabajó con él durante ocho meses, era simple: capturar el último partido de Messi con la 10 antes de la oscuridad. Capturar la hora dorada.',
      'No vas a poder usarlo todos los sábados. Pero cuando lo uses, ese sábado va a ser distinto.'
    ],
    galeria: [
      'assets/hora-dorada-boot.jpg',
      'assets/hora-dorada-closeup.jpg',
      'assets/hora-dorada-sole.jpg',
      'assets/hora-dorada-messi-standing.jpg',
      'assets/hora-dorada-messi-sitting.jpg'
    ],
    detallesTecnicos: {
      suela: 'Sprintframe ligero con placa de carbono parcial',
      terreno: 'Firm Ground (FG) — superficies firmes',
      peso: '202g (talle 8.5 US)',
      colorways: ['Solar Gold / Wonder Clay']
    },
    coleccion: 'adidas x Messi · Signature Series 2026'
  },
  {
    slug: 'nike-united-pack-chapter-3',
    titulo: 'Nike ‘United’ Pack: Capítulo 3',
    marca: 'Nike',
    marcaSlug: 'nike',
    modeloSlug: 'mercurial',
    fecha: '30 ABR 2026',
    fechaISO: '2026-04-30',
    categoria: 'Pack',
    descripcionCorta: 'Nike reúne a las mejores jugadoras del fútbol femenino para el tercer capítulo de la serie United Pack.',
    imagen: 'assets/drop-nike-united.jpg',
    destacado: true,
    contenido: [
      '@nikefootball reúne a algunas de las mejores jugadoras del fútbol femenino y embajadoras de la marca para lanzar el capítulo 3 de esta serie. Para aquellos que están en la cuenta, este concepto comenzó en 2023, uniendo lo mejor del juego femenino antes de la Copa del Mundo.',
      'Fue seguido más tarde ese mismo año con el paquete ‘United Golden’, de variaciones en el aspecto dorado. Luego, el año pasado se lanzaron más bajo la bandera de ‘United’ Pack, uno en febrero y otro en octubre. Ahora tenemos lo que se conoce oficialmente como capítulo 3.',
      'El pack incluye colorways de Mercurial Vapor 16, Phantom GX II y Tiempo Legend 10 con paleta blanca, pink blast y core black. La cápsula además trae camisetas de entrenamiento, pelotas oficiales y una guía editorial impresa con perfiles de cada una de las embajadoras del proyecto.',
      '¿Confundido? No te preocupes, nosotros también. Todo lo que realmente necesitás saber es que este es un nuevo aspecto para las mejores jugadoras de Nike en el juego femenino. ¿Entendido? Bien.'
    ],
    galeria: ['assets/drop-nike-united.jpg'],
    detallesTecnicos: {
      suela: 'Variable según modelo (FG / AG)',
      terreno: 'Firm Ground / Artificial Ground',
      peso: '186g (Mercurial 8.5 US)',
      colorways: ['White / Pink Blast / Black']
    },
    coleccion: 'Nike Football · United Pack · Chapter 3'
  },
  {
    slug: 'puma-eclipse-pack',
    titulo: 'Eclipse Pack: Future + Ultra en negro absoluto',
    marca: 'Puma',
    marcaSlug: 'puma',
    modeloSlug: 'future',
    fecha: '20 MAR 2026',
    fechaISO: '2026-03-20',
    categoria: 'Pack',
    descripcionCorta: 'Puma reúne sus dos siluetas estrella en un acabado total black con detalles fucsia.',
    imagen: 'assets/botin-suela.jpg',
    destacado: false,
    contenido: [
      'Hay packs que se entienden a la primera mirada. Eclipse es uno de esos. Puma cogió las dos siluetas que sostienen su catálogo de élite — Future 7 Ultimate y Ultra 5 Ultimate — y las pintó de negro absoluto, con detalles en fucsia eléctrico que solo aparecen cuando la luz pega de costado. Como un eclipse.',
      'El nombre viene del momento exacto del eclipse total: la corona, ese halo que rodea la luna tapada y que solo es visible durante dos minutos cada cien años. Los detalles fucsia del upper imitan esa corona. Bajo luz directa, no se ven. Bajo luz lateral, brillan.',
      'Es la primera vez que Puma lanza un pack que une sus dos siluetas top con un tratamiento gráfico coherente. La construcción es la misma de los modelos individuales — FUZIONFIT360 para el Future, MATRYXEVO para el Ultra — pero el lenguaje visual está completamente unificado.',
      'Pocas unidades. Pero las pocas que llegaron están en condiciones impecables.'
    ],
    galeria: ['assets/botin-suela.jpg', 'assets/botin-dorado-rock.jpg'],
    detallesTecnicos: {
      suela: 'PUMA SPEEDUNIT (Future) / SPRINTFRAME (Ultra)',
      terreno: 'Firm Ground',
      peso: '180g – 195g según modelo',
      colorways: ['Puma Black / Glowing Pink']
    },
    coleccion: 'Puma Football · Eclipse Pack SS26'
  },
  {
    slug: 'nb-furon-sterling',
    titulo: 'Furon V7+ Sterling Edition',
    marca: 'New Balance',
    marcaSlug: 'new-balance',
    modeloSlug: 'furon',
    fecha: '24 FEB 2026',
    fechaISO: '2026-02-24',
    categoria: 'Signature',
    descripcionCorta: 'New Balance celebra a Raheem Sterling con una signature en colorway pastel y detalles personales.',
    imagen: 'assets/messi-sitting.jpg',
    destacado: false,
    contenido: [
      'Hace cinco temporadas que Raheem Sterling es el rostro de la división de fútbol de New Balance. Empezó como apuesta personal, hoy es la cara visible de la marca. La Furon V7+ Sterling Edition es la primera signature completa que NB le dedica.',
      'El colorway está construido sobre tres colores pastel: un crema cálido para el upper principal, un azul polvo en el tobillo y un acento rojo coral que aparece en la lengüeta y en el logo. Toda la paleta responde a referencias personales del jugador — el crema viene de la casa de su abuela en Jamaica, el azul de la camiseta del equipo donde debutó a los 8 años, el rojo de su moto actual.',
      'La construcción usa la nueva tecnología FuelCell en el talón, una mejora sustancial respecto del V7 anterior. Las laterales del upper están bordadas a mano con las iniciales R.S. y la fecha de su debut en Liverpool. Cada par viene en una caja-libro con fotos de archivo y una carta escrita por el propio Sterling.',
      'Es la edición más personal que New Balance lanzó hasta ahora. Y probablemente la más bonita.'
    ],
    galeria: ['assets/messi-sitting.jpg', 'assets/messi-sitting-rock.jpg'],
    detallesTecnicos: {
      suela: 'NB FuelCell con stud configuration adaptativa',
      terreno: 'Firm Ground / Soft Ground (intercambiable)',
      peso: '210g (talle 9 US)',
      colorways: ['Pastel Cream / Dust Blue / Coral Red']
    },
    coleccion: 'New Balance Football · Sterling Signature'
  },
  {
    slug: 'mercurial-vapor-16-blueprint',
    titulo: 'Mercurial Vapor 16: Blueprint Pack',
    marca: 'Nike',
    marcaSlug: 'nike',
    modeloSlug: 'mercurial',
    fecha: '02 ABR 2026',
    fechaISO: '2026-04-02',
    categoria: 'Pack',
    descripcionCorta: 'Nike presenta el primer pack del Mercurial Vapor 16 con tres siluetas en azul prusia.',
    imagen: 'assets/hero-f50-tunit.jpg',
    destacado: false,
    contenido: [
      'Cuando Nike presenta un Blueprint Pack, está literalmente mostrando el plano. La paleta azul prusia, los detalles en cyan eléctrico y las líneas blancas no son una decisión estética arbitraria — son el lenguaje gráfico del equipo de diseño cuando todavía está dibujando el botín en papel.',
      'El pack incluye tres siluetas: Mercurial Vapor 16 Elite, Phantom GX II Elite y Tiempo Legend 10 Elite. Cada una con la misma paleta pero adaptada al ADN del modelo. El Mercurial es el más limpio — azul prusia con cyan en la lengüeta y placa interna translúcida que deja ver las costuras.',
      'La tecnología de la placa es la novedad: Nike incorpora por primera vez en el Vapor 16 una placa híbrida con secciones flexibles que se adaptan al movimiento del pie en sprint. Combinado con el upper Vaporposite+, el resultado es el botín más liviano que la marca lanzó en cinco temporadas.',
      'Pack agotado en preventa global. Llegaron algunas unidades aisladas al stock argentino. Si lo querés, no lo penses.'
    ],
    galeria: ['assets/hero-f50-tunit.jpg', 'assets/tunit-player-two.jpg'],
    detallesTecnicos: {
      suela: 'Híbrida con secciones flexibles + placa de tracción',
      terreno: 'Firm Ground',
      peso: '186g (talle 8.5 US)',
      colorways: ['Prussian Blue / Cyan / White']
    },
    coleccion: 'Nike Football · Blueprint Pack SS26'
  }
];

// ============================================================
// MARCAS y modelos disponibles
// ============================================================

const BRANDS_INFO = [
  {
    slug: 'adidas',
    name: 'adidas',
    tagline: 'Three stripes. Three decades.',
    cover: 'assets/hora-dorada-boot.jpg',
    modelos: [
      { slug: 'f50', name: 'F50', tagline: 'Speed reimagined', cover: 'assets/tunit-card-hero.jpg' },
      { slug: 'predator', name: 'Predator', tagline: 'Control absoluto', cover: 'assets/botin-suela.jpg' },
      { slug: 'copa', name: 'Copa', tagline: 'Heritage en cuero', cover: 'assets/botin-dorado-rock.jpg' }
    ]
  },
  {
    slug: 'nike',
    name: 'Nike',
    tagline: 'Just do it.',
    cover: 'assets/drop-nike-united.jpg',
    modelos: [
      { slug: 'mercurial', name: 'Mercurial', tagline: 'Velocidad pura', cover: 'assets/hero-f50-tunit.jpg' },
      { slug: 'phantom', name: 'Phantom', tagline: 'Toque y precisión', cover: 'assets/drop-nike-united.jpg' },
      { slug: 'tiempo', name: 'Tiempo', tagline: 'Cuero clásico', cover: 'assets/messi-sitting.jpg' }
    ]
  },
  {
    slug: 'puma',
    name: 'Puma',
    tagline: 'Forever faster.',
    cover: 'assets/botin-suela.jpg',
    modelos: [
      { slug: 'future', name: 'Future', tagline: 'Adaptive fit', cover: 'assets/botin-suela.jpg' },
      { slug: 'ultra', name: 'Ultra', tagline: 'Lightweight speed', cover: 'assets/botin-dorado-rock.jpg' }
    ]
  },
  {
    slug: 'new-balance',
    name: 'New Balance',
    tagline: 'Fearlessly independent.',
    cover: 'assets/messi-sitting-rock.jpg',
    modelos: [
      { slug: 'furon', name: 'Furon', tagline: 'Strike precision', cover: 'assets/messi-sitting.jpg' },
      { slug: 'tekela', name: 'Tekela', tagline: 'Creative play', cover: 'assets/messi-sitting-rock.jpg' }
    ]
  }
];

// ============================================================
// Tabla de talles US/UK/EU/CM (7 a 13 US)
// ============================================================

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
  { us: '13',   uk: '12',   eu: '47',   cm: '31.0' }
];

// ============================================================
// Stock por modelo — 4 productos por modelo con talles disponibles
// ============================================================

const subset = (arr, indices) => indices.map(i => arr[i]);

const STOCK = {
  'adidas/f50': [
    { id: 'f50-tunit-solar', modelo: 'F50 Tunit Archive', colorway: 'Solar Yellow / Black', precio: 529990, imagen: 'assets/tunit-card-hero.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 3, 4, 6, 8]) },
    { id: 'f50-tunit-blue', modelo: 'F50 Tunit Archive', colorway: 'Electric Blue / White', precio: 529990, imagen: 'assets/tunit-player-holding.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6]) },
    { id: 'f50-hora-dorada', modelo: 'F50 Hora Dorada', colorway: 'Solar Gold / Wonder Clay', precio: 489990, imagen: 'assets/hora-dorada-boot.jpg', tallesDisponibles: subset(SIZE_TABLE, [3, 4, 5, 6]) },
    { id: 'f50-elite-fg', modelo: 'F50 Elite FG', colorway: 'Core Black / Solar Red', precio: 399990, imagen: 'assets/tunit-single.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 3, 4, 5, 6, 8, 10]) }
  ],
  'adidas/predator': [
    { id: 'pred-elite-ll', modelo: 'Predator Elite LL', colorway: 'Core Black / Solar Red', precio: 429990, imagen: 'assets/botin-suela.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 8]) },
    { id: 'pred-elite-fg', modelo: 'Predator Elite FG', colorway: 'White / Lucid Lemon', precio: 419990, imagen: 'assets/botin-dorado-rock.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 4, 5]) },
    { id: 'pred-league', modelo: 'Predator League', colorway: 'Triple Black', precio: 289990, imagen: 'assets/tunit-detail.jpg', tallesDisponibles: subset(SIZE_TABLE, [0, 1, 2, 3, 4, 5, 6, 7, 8]) },
    { id: 'pred-club', modelo: 'Predator Club', colorway: 'Bright Red / Black', precio: 189990, imagen: 'assets/tunit-sole.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 7, 8, 9, 10]) }
  ],
  'adidas/copa': [
    { id: 'copa-pure-2', modelo: 'Copa Pure II Elite', colorway: 'Core White / Lucid Lemon', precio: 389990, imagen: 'assets/botin-dorado-rock.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 4, 6]) },
    { id: 'copa-mundial', modelo: 'Copa Mundial', colorway: 'Black / White (Heritage)', precio: 329990, imagen: 'assets/messi-sitting.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 7]) },
    { id: 'copa-icon', modelo: 'Copa Icon', colorway: 'Brown Leather', precio: 359990, imagen: 'assets/messi-sitting-rock.jpg', tallesDisponibles: subset(SIZE_TABLE, [3, 4, 5, 6]) },
    { id: 'copa-sense', modelo: 'Copa Sense+', colorway: 'White / Gold', precio: 299990, imagen: 'assets/hora-dorada-closeup.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 3, 4, 5, 6, 8]) }
  ],
  'nike/mercurial': [
    { id: 'merc-vapor-16', modelo: 'Mercurial Vapor 16 Elite', colorway: 'Blueprint Pack', precio: 459990, imagen: 'assets/hero-f50-tunit.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 8]) },
    { id: 'merc-superfly', modelo: 'Mercurial Superfly 10 Elite', colorway: 'Volt / Black', precio: 489990, imagen: 'assets/drop-nike-united.jpg', tallesDisponibles: subset(SIZE_TABLE, [3, 4, 5, 6, 7]) },
    { id: 'merc-vapor-academy', modelo: 'Mercurial Vapor Academy', colorway: 'Bright Crimson', precio: 199990, imagen: 'assets/tunit-player-two.jpg', tallesDisponibles: subset(SIZE_TABLE, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) },
    { id: 'merc-zoom', modelo: 'Air Zoom Mercurial Vapor 15', colorway: 'Mad Voltage', precio: 379990, imagen: 'assets/tunit-card-hero.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 4, 5, 6]) }
  ],
  'nike/phantom': [
    { id: 'phantom-gx2', modelo: 'Phantom GX II Elite', colorway: 'Erling Haaland Pack', precio: 419990, imagen: 'assets/drop-nike-united.jpg', tallesDisponibles: subset(SIZE_TABLE, [4, 5, 6]) },
    { id: 'phantom-luna', modelo: 'Phantom Luna II Elite', colorway: 'White / Black', precio: 429990, imagen: 'assets/hora-dorada-boot.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5]) },
    { id: 'phantom-vsn', modelo: 'Phantom VSN Academy', colorway: 'Pink Blast', precio: 219990, imagen: 'assets/tunit-detail.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 3, 4, 5, 6, 7, 8]) },
    { id: 'phantom-club', modelo: 'Phantom Club', colorway: 'Black / White', precio: 159990, imagen: 'assets/tunit-sole.jpg', tallesDisponibles: subset(SIZE_TABLE, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) }
  ],
  'nike/tiempo': [
    { id: 'tiempo-legend-10', modelo: 'Tiempo Legend 10 Elite', colorway: 'Mad Ready Pack', precio: 399990, imagen: 'assets/messi-sitting.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 7, 8, 9]) },
    { id: 'tiempo-legend-pro', modelo: 'Tiempo Legend 10 Pro', colorway: 'Black / Gold', precio: 289990, imagen: 'assets/hora-dorada-sole.jpg', tallesDisponibles: subset(SIZE_TABLE, [3, 4, 5, 6, 7]) },
    { id: 'tiempo-premier', modelo: 'Tiempo Premier III', colorway: 'Black Leather (Heritage)', precio: 249990, imagen: 'assets/messi-sitting-rock.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 7, 8, 9, 10]) },
    { id: 'tiempo-academy', modelo: 'Tiempo Legend Academy', colorway: 'Brown / Tan', precio: 179990, imagen: 'assets/tunit-detail.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 3, 4, 5, 6, 7, 8]) }
  ],
  'puma/future': [
    { id: 'future-7-ult', modelo: 'Future 7 Ultimate', colorway: 'Eclipse Pack', precio: 379990, imagen: 'assets/botin-suela.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 8]) },
    { id: 'future-7-match', modelo: 'Future 7 Match', colorway: 'Pink / Black', precio: 199990, imagen: 'assets/tunit-closeup.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 3, 4, 5, 6, 7]) },
    { id: 'future-7-pro', modelo: 'Future 7 Pro', colorway: 'White / Blue', precio: 289990, imagen: 'assets/tunit-player-holding.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 7]) },
    { id: 'future-cup', modelo: 'Future Cup', colorway: 'Triple Black', precio: 159990, imagen: 'assets/tunit-sole.jpg', tallesDisponibles: subset(SIZE_TABLE, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) }
  ],
  'puma/ultra': [
    { id: 'ultra-5-ult', modelo: 'Ultra 5 Ultimate', colorway: 'Supercharge Pack', precio: 339990, imagen: 'assets/botin-dorado-rock.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 3, 4, 5, 6]) },
    { id: 'ultra-5-match', modelo: 'Ultra 5 Match', colorway: 'White / Orange', precio: 179990, imagen: 'assets/tunit-detail.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 7, 8]) },
    { id: 'ultra-5-pro', modelo: 'Ultra 5 Pro', colorway: 'Eclipse Black', precio: 269990, imagen: 'assets/botin-suela.jpg', tallesDisponibles: subset(SIZE_TABLE, [3, 4, 5, 6]) },
    { id: 'ultra-play', modelo: 'Ultra Play', colorway: 'Black / Pink', precio: 119990, imagen: 'assets/tunit-card-hero.jpg', tallesDisponibles: subset(SIZE_TABLE, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) }
  ],
  'new-balance/furon': [
    { id: 'furon-v7-pro', modelo: 'Furon V7+ Pro FG', colorway: 'Raheem Sterling Edition', precio: 349990, imagen: 'assets/messi-sitting.jpg', tallesDisponibles: subset(SIZE_TABLE, [3, 4, 5]) },
    { id: 'furon-v7-md', modelo: 'Furon V7+ Mid FG', colorway: 'Black / Volt', precio: 289990, imagen: 'assets/messi-sitting-rock.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6]) },
    { id: 'furon-v7-disp', modelo: 'Furon V7+ Dispatch', colorway: 'White / Coral', precio: 199990, imagen: 'assets/tunit-player-two.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 3, 4, 5, 6, 7, 8]) },
    { id: 'furon-v6', modelo: 'Furon V6+ (Stock final)', colorway: 'Black / Red', precio: 149990, imagen: 'assets/tunit-detail.jpg', tallesDisponibles: subset(SIZE_TABLE, [0, 1, 2, 7, 8, 9]) }
  ],
  'new-balance/tekela': [
    { id: 'tekela-v4-pro', modelo: 'Tekela V4+ Pro', colorway: 'Bright Lapis / Black', precio: 319990, imagen: 'assets/hero-f50-tunit.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5]) },
    { id: 'tekela-v4-md', modelo: 'Tekela V4+ Magia', colorway: 'White / Yellow', precio: 269990, imagen: 'assets/tunit-closeup.jpg', tallesDisponibles: subset(SIZE_TABLE, [1, 2, 3, 4, 5, 6]) },
    { id: 'tekela-disp', modelo: 'Tekela Dispatch', colorway: 'Triple Black', precio: 179990, imagen: 'assets/tunit-sole.jpg', tallesDisponibles: subset(SIZE_TABLE, [2, 3, 4, 5, 6, 7]) },
    { id: 'tekela-v3', modelo: 'Tekela V3+ (Outlet)', colorway: 'Pastel Blue', precio: 129990, imagen: 'assets/tunit-player-holding.jpg', tallesDisponibles: subset(SIZE_TABLE, [0, 1, 7, 8, 9, 10]) }
  ]
};

Object.assign(window, { ARTICLES, BRANDS_INFO, STOCK, SIZE_TABLE });
