// =====================================================================
// CARTA: ESTE ES EL ÚNICO ARCHIVO QUE SE EDITA PARA CAMBIAR CONTENIDO.
// (datos del local, categorías, platos, precios, videos, opciones)
// Carga basada en la carta física (foto del 25/11/2026).
// =====================================================================

// ---------- 1. DATOS DEL LOCAL ----------
const NEGOCIO = {
  nombre: 'Betos Reconquista',        // PENDIENTE: confirmar nombre definitivo (¿"Beto’s Bar"?)
  lema: 'Tu lugar para comer rico y pasarla bien',
  dias: 'Martes a domingos',
  direccion: 'Roca 1323',
  whatsapp: '3482270495',          // sin + ni espacios
  logo: 'assets/img/logo.png'
};

// ---------- 2. ÍCONOS DE CATEGORÍA (estilo emoji, a pedido del cliente) ----------
const ICONOS = {
  pizza: '🍕',
  hamburguesa: '🍔',
  lomo: '<img src="assets/img/lomito.png" alt="" style="width:28px;height:28px;object-fit:contain">',
  empanada: '🥟',
  papas: '🍟',
  picada: '🧀',
  sandwich: '🥪',
  triple: '🥪',
  promo: '🏷️',
  alPlato: '🍽️',
  infantil: '🧸'
};

// ---------- 3. CAMPOS DE UN PLATO ----------
// Obligatorios:  nombre, desc, y  precio  (o  variantes  si el precio depende de una elección)
// Opcionales:
//   id        -> se genera solo (categoría + nombre). Ponerlo a mano solo si se quiere fijar.
//   video     -> 'assets/videos/x.mp4'   (si no existe, muestra "Video próximamente")
//   img       -> 'assets/img/x.jpg'      (si no existe, muestra el ícono de la categoría)
//   variantes -> el cliente DEBE elegir una y define el precio: [{ nombre: '...', precio: 1000 }]
//   varTitulo -> título del selector de variantes (ej: 'Tamaño', 'Cantidad')
//   elegir    -> el cliente DEBE elegir una opción: [{ titulo: 'Mayonesa', opciones: ['Casera', 'Natura'] }]
//   cambios   -> reemplazos permitidos: [{ de: 'rúcula', por: 'lechuga' }]
//   quitar    -> ingredientes que se pueden sacar: ['tomate', 'lechuga']
// NO se pueden agregar ingredientes: solo sacar o cambiar. El precio no cambia por las opciones.

// Atajos para no repetir
const MAYO = { titulo: 'Mayonesa', opciones: ['Casera', 'Natura', 'Sin mayonesa'] };
const RUCULA_X_LECHUGA = [{ de: 'rúcula', por: 'lechuga' }];
const pizzaVar = function (c4, c8, mm) {
  return [
    { nombre: 'Casera · 4 porciones', precio: c4 },
    { nombre: 'Casera · 8 porciones', precio: c8 },
    { nombre: 'Masa madre · 8 porciones', precio: mm }
  ];
};
const empVar = [
  { nombre: 'Media docena (6)', precio: 11000 },
  { nombre: 'Docena (12)', precio: 20000 },
  { nombre: 'Por unidad', precio: 2000 }
];

// ---------- 4. CARTA ----------
const CARTA = [
  { id: 'pizzas', nombre: 'Pizzas', icono: ICONOS.pizza, platos: [
    { nombre: 'Muzza', desc: 'Salsa, muzza, morrón, aceitunas, orégano', varTitulo: 'Tamaño', variantes: pizzaVar(10000, 16000, 16500), quitar: ['morrón', 'aceitunas', 'orégano'] },
    { nombre: 'Especial', desc: 'Salsa, muzza, paleta, huevo, morrón, aceitunas, orégano', varTitulo: 'Tamaño', variantes: pizzaVar(10000, 17000, 17500), quitar: ['paleta', 'huevo', 'morrón', 'aceitunas', 'orégano'] },
    { nombre: 'Fugazza', desc: 'Salsa, muzza, cebolla salteada, morrón, aceitunas, orégano', varTitulo: 'Tamaño', variantes: pizzaVar(10000, 17000, 17500), quitar: ['cebolla', 'morrón', 'aceitunas', 'orégano'] },
    { nombre: 'Rúcula', desc: 'Salsa, muzza, rúcula, queso parmesano, aceitunas negras, aceite de oliva, orégano', varTitulo: 'Tamaño', variantes: pizzaVar(10000, 17000, 17500), quitar: ['queso parmesano', 'aceitunas negras', 'aceite de oliva', 'orégano'] },
    { nombre: 'Roquefort', desc: 'Salsa, muzza, queso azul, morrón, aceitunas, orégano', varTitulo: 'Tamaño', variantes: pizzaVar(10000, 18000, 18500), quitar: ['morrón', 'aceitunas', 'orégano'] },
    { nombre: 'Beto’s', desc: 'Salsa, muzza, panceta, huevo, morrón, aceitunas, orégano', varTitulo: 'Tamaño', variantes: pizzaVar(10000, 18000, 18500), quitar: ['panceta', 'huevo', 'morrón', 'aceitunas', 'orégano'] },
    { nombre: 'Pepperoni', desc: 'Salsa, muzza, pepperoni, orégano', varTitulo: 'Tamaño', variantes: pizzaVar(10000, 18000, 18500), quitar: ['orégano'] }
  ]},

  { id: 'papas', nombre: 'Papas fritas', icono: ICONOS.papas, platos: [
    { nombre: 'Clásicas', desc: 'Porción de papas fritas', precio: 10000 },
    { nombre: 'Clásicas con pote de mayonesa casera', desc: 'Porción de papas fritas con pote de mayonesa casera', precio: 11000 },
    { nombre: 'Con cheddar', desc: 'Porción de papas fritas con cheddar', precio: 12000 },
    { nombre: 'Papas Beto’s', desc: 'Gratinadas, huevo frito, panceta, verdeo', precio: 15000, quitar: ['huevo frito', 'panceta', 'verdeo'] }
  ]},

  { id: 'hamburguesas', nombre: 'Hamburguesas con papas', icono: ICONOS.hamburguesa, platos: [
    // Hamburguesas: usan un video/foto de PRUEBA. Reemplazar por los reales cuando estén.
    { nombre: 'Común', desc: 'Pan, bife Friar, queso, lechuga, tomate, mayonesa casera/Natura', precio: 9000, elegir: [MAYO], quitar: ['queso', 'lechuga', 'tomate'], video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Especial', desc: 'Pan, bife Friar, lechuga, tomate, queso, huevo, paleta, mayonesa casera/Natura', precio: 12000, elegir: [MAYO], quitar: ['lechuga', 'tomate', 'queso', 'huevo', 'paleta'], video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Beto’s Doble', desc: 'Pan de papa, doble bife Friar, lechuga, tomate, doble cheddar, huevo, paleta, mayonesa casera/Natura', precio: 15000, elegir: [MAYO], quitar: ['lechuga', 'tomate', 'doble cheddar', 'huevo', 'paleta'], video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'En pan de miga', desc: 'Doble miga, 4 bifes Friar, huevo, paleta, queso, lechuga, tomate, mayonesa casera/Natura', precio: 30000, elegir: [MAYO], quitar: ['huevo', 'paleta', 'queso', 'lechuga', 'tomate'] },
    { nombre: 'Veggie', desc: 'Pan, bife de legumbres o verdura, queso, lechuga, tomate, mayonesa casera/Natura', precio: 8500,
      elegir: [{ titulo: 'Bife', opciones: ['Legumbres', 'Verdura'] }, MAYO], quitar: ['queso', 'lechuga', 'tomate'] }
  ]},

  { id: 'lomos', nombre: 'Lomos con papas', icono: ICONOS.lomo, platos: [
    { nombre: 'Clásico', desc: 'Pan árabe, bife lomo, huevo, paleta, muzza, lechuga, tomate, mayonesa casera/Natura', precio: 20000, elegir: [MAYO], quitar: ['huevo', 'paleta', 'muzza', 'lechuga', 'tomate'] },
    { nombre: 'Premium', desc: 'Pan árabe, bife lomo, huevo, panceta, muzza, rúcula, tomate, mayonesa casera/Natura', precio: 21000, elegir: [MAYO], cambios: RUCULA_X_LECHUGA, quitar: ['huevo', 'panceta', 'muzza', 'rúcula', 'tomate'] },
    { nombre: 'Beto’s', desc: 'Pan de papa, bife lomo, panceta, huevo, muzza, lechuga, tomate, mayonesa casera/Natura', precio: 23000, elegir: [MAYO], quitar: ['panceta', 'huevo', 'muzza', 'lechuga', 'tomate'] },
    { nombre: 'Beto’s Premium', desc: 'Pan de papa, bife lomo, panceta, huevo, doble cheddar, rúcula, tomate, mayonesa casera/Natura', precio: 25000, elegir: [MAYO], cambios: RUCULA_X_LECHUGA, quitar: ['panceta', 'huevo', 'doble cheddar', 'rúcula', 'tomate'] },
    { nombre: 'Lomo pan de miga doble piso', desc: 'Doble miga, bife lomo, lechuga, tomate, huevo, mayonesa casera/Natura', precio: 32000, elegir: [MAYO], quitar: ['lechuga', 'tomate', 'huevo'] }
  ]},

  { id: 'sandwiches', nombre: 'Sándwiches con papas', icono: ICONOS.sandwich, platos: [
    { nombre: 'Mila clásico', desc: 'Pan de papa, milanesa de carne, lechuga, tomate, mayonesa casera/Natura', precio: 18000, elegir: [MAYO], quitar: ['lechuga', 'tomate'] },
    { nombre: 'Mila especial', desc: 'Pan de papa, milanesa de carne, queso, paleta, huevo, lechuga, tomate, mayonesa casera/Natura', precio: 20000, elegir: [MAYO], quitar: ['queso', 'paleta', 'huevo', 'lechuga', 'tomate'] },
    { nombre: 'Mila Beto’s', desc: 'Pan de papa, milanesa de carne, queso, panceta, huevo, rúcula, tomate, mayonesa casera/Natura', precio: 22000, elegir: [MAYO], cambios: RUCULA_X_LECHUGA, quitar: ['queso', 'panceta', 'huevo', 'rúcula', 'tomate'] },
    { nombre: 'Saludable de pollo', desc: 'Pan árabe, bife de pollo, lechuga, tomate, mayonesa casera/Natura', precio: 15000, elegir: [MAYO], quitar: ['lechuga', 'tomate'] }
  ]},

  { id: 'simples-triples', nombre: 'Simples y Triples', icono: ICONOS.triple, platos: [
    { nombre: 'Miga simple tostado', desc: 'Pan de miga, paleta, queso, mayonesa Natura', precio: 7000, quitar: ['paleta', 'queso', 'mayonesa'] },
    { nombre: 'Miga simple frío', desc: 'Pan de miga, paleta, queso, mayonesa Natura', precio: 7000, quitar: ['paleta', 'queso', 'mayonesa'] },
    { nombre: 'Triple verdura', desc: 'Doble miga, lechuga, tomate, huevo, mayonesa Natura', precio: 12000, elegir: [{ titulo: 'Servido', opciones: ['Caliente', 'Frío'] }], quitar: ['lechuga', 'tomate', 'huevo', 'mayonesa'] },
    { nombre: 'Triple pollo', desc: 'Doble miga, lechuga, tomate, huevo, pollo, mayonesa Natura', precio: 15000, elegir: [{ titulo: 'Servido', opciones: ['Caliente', 'Frío'] }], quitar: ['lechuga', 'tomate', 'huevo', 'mayonesa'] },
    { nombre: 'Miganesa de pollo', desc: 'Doble miga, mila de pollo, lechuga, tomate, huevo duro, mayonesa Natura', precio: 30000, quitar: ['lechuga', 'tomate', 'huevo duro', 'mayonesa'] }
  ]},

  { id: 'empanadas', nombre: 'Empanadas', icono: ICONOS.empanada, platos: [
    { nombre: 'Carne al horno', desc: 'Empanadas de carne al horno', varTitulo: 'Cantidad', variantes: empVar },
    { nombre: 'Jamón y queso al horno', desc: 'Empanadas de jamón y queso al horno', varTitulo: 'Cantidad', variantes: empVar },
    { nombre: 'Verdura al horno', desc: 'Empanadas de verdura al horno', varTitulo: 'Cantidad', variantes: empVar },
    { nombre: 'Carne fritas', desc: 'Empanadas de carne fritas', varTitulo: 'Cantidad', variantes: empVar }
  ]},

  { id: 'picadas', nombre: 'Picadas', icono: ICONOS.picada, platos: [
    { nombre: 'Picada Beto’s', desc: 'Milanesa de carne, papas fritas, salamín, queso, aceitunas, mayonesa casera/Natura, pan', varTitulo: 'Para cuántas personas',
      variantes: [{ nombre: '1 persona', precio: 20000 }, { nombre: '2 personas', precio: 32000 }, { nombre: '3 personas', precio: 45000 }],
      elegir: [MAYO], quitar: ['salamín', 'queso', 'aceitunas'] },
    { nombre: 'Picada Beto’s Mixta', desc: 'Milanesa de carne y pollo, papas fritas, mayonesa casera/Natura, pan', varTitulo: 'Para cuántas personas',
      variantes: [{ nombre: '2 personas', precio: 28000 }, { nombre: '3 personas', precio: 40000 }],
      elegir: [MAYO] }
  ]},

  { id: 'al-plato', nombre: 'Al plato', icono: ICONOS.alPlato, platos: [
    { nombre: 'Milanesa con papas fritas', desc: 'Milanesa con papas fritas', precio: 16000 },
    { nombre: 'Milanesa gratinada con papas fritas', desc: 'Milanesa gratinada con papas fritas', precio: 17000 },
    { nombre: 'Milanesa napolitana con papas fritas', desc: 'Milanesa napolitana con papas fritas', precio: 18000 },
    { nombre: 'Milanesa a caballo con papas fritas', desc: 'Milanesa a caballo con papas fritas', precio: 17500 },
    { nombre: 'Lomo con papas fritas', desc: 'Lomo con papas fritas', precio: 18000 },
    { nombre: 'Lomo gratinado con papas fritas', desc: 'Lomo gratinado con papas fritas', precio: 19000 },
    { nombre: 'Mega Napo', desc: 'Milanesa mega napolitana', precio: 45000 }
  ]},

  { id: 'menu-infantil', nombre: 'Menú infantil', icono: ICONOS.infantil, platos: [
    { nombre: 'Patitas de pollo', desc: 'Patitas de pollo con papas fritas y gaseosa 500 cc', precio: 12000 }
  ]}
];

// ---------- 5. PROMOS (galería deslizable arriba de la carta) ----------
// Cada promo usa los mismos campos que un plato (nombre, desc, precio, y opcionalmente elegir, variantes, etc.).
//   img -> imagen de la promo, ej: 'assets/promos/caja-xl.jpg'. Si no existe, se muestra un fondo de color con ícono.
// El orden de esta lista es el orden en la galería. Para sacar una promo, borrar su línea.
const PROMOS = [
  { nombre: 'Caja XL Beto’s', desc: 'Dos sándwiches de milanesa de carne, papas fritas y pote de mayonesa casera', precio: 28000, img: 'assets/promos/caja-xl-betos.jpg' },
  { nombre: 'Dos Burguer con papas fritas', desc: 'Dos hamburguesas con papas fritas', precio: 13000, img: 'assets/promos/dos-burguer.jpg' },
  { nombre: '1/2 Muzza + 1/2 docena de empanadas', desc: 'Media pizza muzza y media docena de empanadas', precio: 15000, img: 'assets/promos/media-muzza-empanadas.jpg', elegir: [{ titulo: 'Empanadas', opciones: ['Carne', 'Jamón y queso'] }] },
  { nombre: 'Sándwich de milanesa de pollo (20 cm)', desc: 'Sándwich de milanesa de pollo de 20 cm', precio: 12000, img: 'assets/promos/sandwich-pollo.jpg' },
  { nombre: 'Picada milanesa de pollo x 2', desc: 'Picada de milanesa de pollo para dos personas', precio: 20000, img: 'assets/promos/picada-pollo.jpg' },
  { nombre: 'Triple de pollo + 1/2 docena de empanadas', desc: 'Triple de pollo y media docena de empanadas', precio: 21000, img: 'assets/promos/triple-pollo-empanadas.jpg' },
  { nombre: 'Caja XXI Burguer', desc: 'Caja de hamburguesas con pan Bimbo', precio: 25000, img: 'assets/promos/caja-xxi-burguer.jpg' }
];

// ---------------------------------------------------------------------
// CATEGORÍAS QUE ESTABAN DE EJEMPLO Y NO FIGURAN EN LA CARTA FÍSICA:
// Bebidas, Sin TAC y Ensaladas. Se sacaron de la carta. Si el local las
// ofrece, hay que pasar los productos y precios reales para volver a sumarlas.
// ---------------------------------------------------------------------

// =====================================================================
// NO TOCAR DE ACÁ PARA ABAJO: completa campos y arma el índice por id.
// =====================================================================
const PLATOS = {}; // { id: plato }, para buscar rápido (modal, carrito, WhatsApp). Incluye las promos.
function registrar(p, catId, catNombre) {
  const slug = p.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  p.id = p.id || (catId + '-' + slug);
  if (PLATOS[p.id]) console.warn('ID de plato repetido: ' + p.id);
  p.categoria = catId;
  p.categoriaNombre = catNombre; // varios platos se llaman igual en distintas categorías (ej: "Premium")
  p.video = p.video || null;
  p.img = p.img || null;
  p.quitar = p.quitar || [];
  p.cambios = p.cambios || [];
  p.elegir = p.elegir || [];
  p.variantes = p.variantes || null;
  // Con variantes, "precio" es el más bajo (se muestra como "Desde")
  if (p.variantes) p.precio = Math.min.apply(null, p.variantes.map(function (v) { return v.precio; }));
  if (typeof p.precio !== 'number') console.warn('Plato sin precio: ' + p.id);
  PLATOS[p.id] = p;
}
CARTA.forEach(function (cat) {
  cat.platos.forEach(function (p) { registrar(p, cat.id, cat.nombre); });
});
PROMOS.forEach(function (p) { registrar(p, 'promos', 'Promos'); });