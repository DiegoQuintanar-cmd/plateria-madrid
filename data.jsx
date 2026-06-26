/* ============================================================
   Platería Madrid — Catálogo de datos
   ============================================================ */

// Categorías principales — el orden define el menú
const CATEGORIES = [
  { id: "argollas",     name: "Argollas",     blurb: "Argollas de matrimonio y compromiso",     group: "matrimonio" },
  { id: "anillos",      name: "Anillos",      blurb: "Solitarios, eternidad y diseño",         group: "joyeria"   },
  { id: "aretes",       name: "Aretes",       blurb: "Studs, arracadas y candongas",           group: "joyeria"   },
  { id: "pulseras",     name: "Pulseras",     blurb: "Tejidos finos en plata 925",             group: "joyeria"   },
  { id: "brazaletes",   name: "Brazaletes",   blurb: "Pieza sólida, presencia rotunda",        group: "joyeria"   },
  { id: "cadenas",      name: "Cadenas",      blurb: "Tejidos clásicos y contemporáneos",      group: "joyeria"   },
  { id: "dijes",        name: "Dijes",        blurb: "Detalles que cuentan historia",          group: "joyeria"   },
  { id: "esclavas",     name: "Esclavas",     blurb: "Identificación grabada al detalle",      group: "joyeria"   },
  { id: "relojes",      name: "Relojes",      blurb: "Mecánica fina y diseño atemporal",       group: "joyeria"   },
  { id: "rosarios",     name: "Rosarios",     blurb: "Devoción tejida en plata",               group: "religioso" },
  { id: "religiosos",   name: "Artículos religiosos", blurb: "Cristianismo, católica, masónica y más", group: "religioso" },
  { id: "relicarios",   name: "Relicarios",   blurb: "Memoria que se guarda al pecho",         group: "religioso" },
  { id: "lazos",        name: "Lazos matrimoniales", blurb: "Para la ceremonia",                group: "matrimonio" },
  { id: "arras",        name: "Arras matrimoniales", blurb: "13 monedas, una promesa",          group: "matrimonio" },
];

// Grupos del menú principal
const NAV_GROUPS = [
  {
    id: "dama", label: "Para dama",
    items: ["anillos", "aretes", "pulseras", "brazaletes", "cadenas", "dijes", "esclavas", "relojes"],
  },
  {
    id: "caballero", label: "Para caballero",
    items: ["anillos", "pulseras", "brazaletes", "cadenas", "dijes", "esclavas", "relojes"],
  },
  {
    id: "matrimonio", label: "Para matrimonio",
    items: ["argollas", "lazos", "arras"],
    note: "Todo lo relativo a la ceremonia",
  },
  {
    id: "religioso", label: "Religioso",
    items: ["rosarios", "religiosos", "relicarios"],
  },
  {
    id: "novedades", label: "Novedades",
    items: [],
  },
];

// Filtros religiosos (sub-tradición)
const RELIGIOUS_TRADITIONS = [
  { id: "catolica",      name: "Católica" },
  { id: "cristiana",     name: "Cristiana" },
  { id: "ortodoxa",      name: "Ortodoxa" },
  { id: "masonica",      name: "Masónica" },
  { id: "judaica",       name: "Judaica" },
  { id: "santa-muerte",  name: "Sta. Muerte" },
  { id: "guadalupana",   name: "Guadalupana" },
  { id: "sagrado-corazon", name: "Sagrado Corazón" },
  { id: "san-judas",     name: "San Judas Tadeo" },
];

// Materiales y acabados
const MATERIALS = [
  "Plata .925", "Plata .950", "Plata con baño de oro", "Plata oxidada", "Plata con piedra",
];
const FINISHES = ["Pulido espejo", "Mate satinado", "Texturizado", "Envejecido"];

// Helper para formato de precio MXN
function formatMXN(n) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency", currency: "MXN", minimumFractionDigits: 0,
  }).format(n);
}

// Productos — semilla amplia. cat = id de categoría, aud = 'dama' | 'caballero' | 'unisex'
const PRODUCTS = [
  // ARGOLLAS (matrimonio)
  { id: "ar-001", cat: "argollas", aud: "dama",      name: "Argolla Clásica Florencia", price: 3890, was: 4290, tag: "Best-seller", material: "Plata .925", finish: "Pulido espejo" },
  { id: "ar-002", cat: "argollas", aud: "caballero", name: "Argolla Clásica Florencia", price: 4290, material: "Plata .925", finish: "Pulido espejo" },
  { id: "ar-003", cat: "argollas", aud: "dama",      name: "Argolla Catedral Mate", price: 3690, material: "Plata .925", finish: "Mate satinado" },
  { id: "ar-004", cat: "argollas", aud: "caballero", name: "Argolla Catedral Mate", price: 3990, material: "Plata .925", finish: "Mate satinado" },
  { id: "ar-005", cat: "argollas", aud: "dama",      name: "Argolla Eterna Diamante", price: 6490, was: 6990, tag: "Nuevo", material: "Plata con piedra", finish: "Pulido espejo" },
  { id: "ar-006", cat: "argollas", aud: "caballero", name: "Argolla Confort Plana", price: 3490, material: "Plata .925", finish: "Mate satinado" },

  // ANILLOS
  { id: "an-001", cat: "anillos", aud: "dama",      name: "Solitario Aurora", price: 2890, material: "Plata con piedra", finish: "Pulido espejo", tag: "Best-seller" },
  { id: "an-002", cat: "anillos", aud: "dama",      name: "Anillo Eternidad Trio", price: 3490, material: "Plata con piedra" },
  { id: "an-003", cat: "anillos", aud: "caballero", name: "Sello Caballero Onix", price: 4290, material: "Plata .925", finish: "Mate satinado" },
  { id: "an-004", cat: "anillos", aud: "caballero", name: "Anillo Tejido Cordón", price: 2790, material: "Plata .925" },
  { id: "an-005", cat: "anillos", aud: "dama",      name: "Anillo Hoja Olivo", price: 2190, material: "Plata .925", finish: "Texturizado" },
  { id: "an-006", cat: "anillos", aud: "dama",      name: "Anillo Pavé Cielo", price: 3990, was: 4490, material: "Plata con piedra" },
  { id: "an-007", cat: "anillos", aud: "caballero", name: "Sello Masónico Esmaltado", price: 5290, material: "Plata .925", finish: "Pulido espejo" },
  { id: "an-008", cat: "anillos", aud: "dama",      name: "Anillo Media Caña", price: 1490, material: "Plata .925" },

  // ARETES
  { id: "ae-001", cat: "aretes", aud: "dama", name: "Studs Brillante 4mm", price: 990,  material: "Plata con piedra", tag: "Best-seller" },
  { id: "ae-002", cat: "aretes", aud: "dama", name: "Arracadas Huggie", price: 1490, material: "Plata .925" },
  { id: "ae-003", cat: "aretes", aud: "dama", name: "Candongas Tubo Pulido", price: 1890, material: "Plata .925", finish: "Pulido espejo" },
  { id: "ae-004", cat: "aretes", aud: "dama", name: "Aretes Gota Perla", price: 2290, material: "Plata con piedra" },
  { id: "ae-005", cat: "aretes", aud: "caballero", name: "Stud Onyx Caballero", price: 1190, material: "Plata con piedra" },
  { id: "ae-006", cat: "aretes", aud: "dama", name: "Aretes Cascada", price: 3490, was: 3890, material: "Plata .925", tag: "Nuevo" },

  // PULSERAS
  { id: "pu-001", cat: "pulseras", aud: "dama",      name: "Pulsera Tennis Cristal", price: 3290, material: "Plata con piedra" },
  { id: "pu-002", cat: "pulseras", aud: "dama",      name: "Pulsera Espiga Fina", price: 1890, material: "Plata .925" },
  { id: "pu-003", cat: "pulseras", aud: "caballero", name: "Pulsera Cordón Marinero", price: 2490, material: "Plata .925", tag: "Best-seller" },
  { id: "pu-004", cat: "pulseras", aud: "caballero", name: "Pulsera Eslabón Cubano", price: 3490, material: "Plata .925", finish: "Pulido espejo" },
  { id: "pu-005", cat: "pulseras", aud: "dama",      name: "Pulsera Charm Corazón", price: 1690, material: "Plata .925" },

  // BRAZALETES
  { id: "br-001", cat: "brazaletes", aud: "dama",      name: "Brazalete Ágata Onix", price: 4290, material: "Plata con piedra" },
  { id: "br-002", cat: "brazaletes", aud: "caballero", name: "Brazalete Forjado Plano", price: 5290, material: "Plata .925", finish: "Mate satinado", tag: "Nuevo" },
  { id: "br-003", cat: "brazaletes", aud: "dama",      name: "Brazalete Aro Pulido", price: 3190, material: "Plata .925", finish: "Pulido espejo" },
  { id: "br-004", cat: "brazaletes", aud: "caballero", name: "Brazalete Cuero & Plata", price: 2790, material: "Plata .925" },

  // CADENAS
  { id: "ca-001", cat: "cadenas", aud: "dama",      name: "Cadena Veneciana 1.2mm", price: 1290, material: "Plata .925" },
  { id: "ca-002", cat: "cadenas", aud: "caballero", name: "Cadena Cubana 5mm", price: 3490, material: "Plata .925", tag: "Best-seller" },
  { id: "ca-003", cat: "cadenas", aud: "caballero", name: "Cadena Barbada 4mm", price: 2890, material: "Plata .925" },
  { id: "ca-004", cat: "cadenas", aud: "dama",      name: "Cadena Bizantina 2mm", price: 1990, material: "Plata .925" },
  { id: "ca-005", cat: "cadenas", aud: "caballero", name: "Cadena Cuerda 3mm", price: 2390, material: "Plata .925", finish: "Pulido espejo" },

  // DIJES
  { id: "di-001", cat: "dijes", aud: "dama",      name: "Dije Inicial Letra", price: 690, material: "Plata .925" },
  { id: "di-002", cat: "dijes", aud: "dama",      name: "Dije Corazón Esmaltado", price: 890, material: "Plata .925" },
  { id: "di-003", cat: "dijes", aud: "caballero", name: "Dije Ancla Marinera", price: 1190, material: "Plata .925" },
  { id: "di-004", cat: "dijes", aud: "caballero", name: "Dije Espada Templaria", price: 1390, material: "Plata .925" },
  { id: "di-005", cat: "dijes", aud: "dama",      name: "Dije Árbol de la Vida", price: 990, material: "Plata .925" },

  // ESCLAVAS
  { id: "es-001", cat: "esclavas", aud: "caballero", name: "Esclava Identificación Plana", price: 3290, material: "Plata .925", tag: "Best-seller" },
  { id: "es-002", cat: "esclavas", aud: "dama",      name: "Esclava Grabada Finita", price: 1990, material: "Plata .925" },
  { id: "es-003", cat: "esclavas", aud: "caballero", name: "Esclava Eslabón Cuadrado", price: 4190, material: "Plata .925", finish: "Mate satinado" },
  { id: "es-004", cat: "esclavas", aud: "dama",      name: "Esclava Cordón con Placa", price: 2390, material: "Plata .925" },

  // RELOJES
  { id: "re-001", cat: "relojes", aud: "dama",      name: "Reloj Margot Esfera Madreperla", price: 8990, material: "Plata .925", tag: "Nuevo" },
  { id: "re-002", cat: "relojes", aud: "caballero", name: "Reloj Tarragona Automático", price: 14900, material: "Plata .925", finish: "Pulido espejo" },
  { id: "re-003", cat: "relojes", aud: "dama",      name: "Reloj Sevilla Bisel Plata", price: 6490, material: "Plata .925" },
  { id: "re-004", cat: "relojes", aud: "caballero", name: "Reloj Catedral Esfera Negra", price: 11900, was: 12900, material: "Plata .925" },

  // ROSARIOS (religioso)
  { id: "ro-001", cat: "rosarios", aud: "unisex", name: "Rosario Cuenta Bizantina", price: 1890, tradition: "catolica", material: "Plata .925", tag: "Best-seller" },
  { id: "ro-002", cat: "rosarios", aud: "unisex", name: "Rosario Cuenta de Hueso", price: 2290, tradition: "catolica", material: "Plata .925" },
  { id: "ro-003", cat: "rosarios", aud: "unisex", name: "Rosario Guadalupano", price: 2490, tradition: "guadalupana", material: "Plata .925" },
  { id: "ro-004", cat: "rosarios", aud: "dama",   name: "Rosario Pulsera Diez Aves", price: 990, tradition: "catolica", material: "Plata .925" },
  { id: "ro-005", cat: "rosarios", aud: "caballero", name: "Rosario Negro Mate", price: 2790, tradition: "catolica", material: "Plata oxidada", finish: "Mate satinado" },

  // ARTÍCULOS RELIGIOSOS
  { id: "rg-001", cat: "religiosos", aud: "unisex",   name: "Crucifijo San Benito", price: 1290, tradition: "catolica", material: "Plata .925" },
  { id: "rg-002", cat: "religiosos", aud: "unisex",   name: "Medalla Virgen de Guadalupe", price: 990, tradition: "guadalupana", material: "Plata .925", tag: "Best-seller" },
  { id: "rg-003", cat: "religiosos", aud: "caballero", name: "Anillo Sello Masónico G", price: 4290, tradition: "masonica", material: "Plata .925" },
  { id: "rg-004", cat: "religiosos", aud: "dama",     name: "Medalla Cristo Resucitado", price: 890, tradition: "cristiana", material: "Plata .925" },
  { id: "rg-005", cat: "religiosos", aud: "unisex",   name: "Cruz Ortodoxa Tres Brazos", price: 1690, tradition: "ortodoxa", material: "Plata .925" },
  { id: "rg-006", cat: "religiosos", aud: "unisex",   name: "Estrella de David Calada", price: 1190, tradition: "judaica", material: "Plata .925" },
  { id: "rg-007", cat: "religiosos", aud: "unisex",   name: "Medalla Sagrado Corazón", price: 1090, tradition: "sagrado-corazon", material: "Plata .925" },
  { id: "rg-008", cat: "religiosos", aud: "unisex",   name: "Medalla San Judas Tadeo", price: 990, tradition: "san-judas", material: "Plata .925" },
  { id: "rg-009", cat: "religiosos", aud: "unisex",   name: "Medalla Santa Muerte", price: 1190, tradition: "santa-muerte", material: "Plata oxidada" },
  { id: "rg-010", cat: "religiosos", aud: "caballero", name: "Anillo Caballero Templario", price: 3890, tradition: "cristiana", material: "Plata .925" },
  { id: "rg-011", cat: "religiosos", aud: "caballero", name: "Llavero Compás Masónico", price: 1490, tradition: "masonica", material: "Plata .925" },
  { id: "rg-012", cat: "religiosos", aud: "dama",     name: "Pulsera Hamsa", price: 1390, tradition: "judaica", material: "Plata .925" },

  // RELICARIOS
  { id: "rl-001", cat: "relicarios", aud: "dama", name: "Relicario Óvalo Grabado", price: 2190, material: "Plata .925", tag: "Best-seller" },
  { id: "rl-002", cat: "relicarios", aud: "dama", name: "Relicario Corazón Vintage", price: 2490, material: "Plata .925", finish: "Envejecido" },
  { id: "rl-003", cat: "relicarios", aud: "caballero", name: "Relicario Caballero Plano", price: 2890, material: "Plata .925" },
  { id: "rl-004", cat: "relicarios", aud: "dama", name: "Relicario Circular Pulido", price: 1990, material: "Plata .925", finish: "Pulido espejo" },

  // LAZOS MATRIMONIALES
  { id: "lz-001", cat: "lazos", aud: "unisex", name: "Lazo Cordón de Plata Trenzado", price: 3490, material: "Plata .925", tag: "Nuevo" },
  { id: "lz-002", cat: "lazos", aud: "unisex", name: "Lazo Rosario Doble", price: 4290, material: "Plata .925", tradition: "catolica" },
  { id: "lz-003", cat: "lazos", aud: "unisex", name: "Lazo Cordón con Cruz", price: 3990, material: "Plata .925" },

  // ARRAS MATRIMONIALES
  { id: "ax-001", cat: "arras", aud: "unisex", name: "Arras 13 Monedas Plata Pulida", price: 2990, material: "Plata .925", tag: "Best-seller" },
  { id: "ax-002", cat: "arras", aud: "unisex", name: "Arras Cofre Tallado", price: 3990, material: "Plata .925", finish: "Envejecido" },
  { id: "ax-003", cat: "arras", aud: "unisex", name: "Arras Cofre Florentino", price: 4490, material: "Plata .925" },
];

// Helpers
function findCategory(id) { return CATEGORIES.find(c => c.id === id); }
function findProduct(id)  { return PRODUCTS.find(p => p.id === id); }
function productsByCat(catId) { return PRODUCTS.filter(p => p.cat === catId); }
function featuredProducts(n = 8) {
  const tagged = PRODUCTS.filter(p => p.tag === "Best-seller" || p.tag === "Nuevo");
  return tagged.slice(0, n);
}

window.PLATERIA = {
  CATEGORIES, NAV_GROUPS, RELIGIOUS_TRADITIONS, MATERIALS, FINISHES, PRODUCTS,
  formatMXN, findCategory, findProduct, productsByCat, featuredProducts,
};
