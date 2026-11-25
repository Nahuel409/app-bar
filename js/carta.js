// =====================================================================
// CARTA: ESTE ES EL ÚNICO ARCHIVO QUE SE EDITA PARA CAMBIAR CONTENIDO.
// (datos del local, categorías, platos, precios, videos, opciones)
// Los datos marcados como EJEMPLO son de prueba hasta tener los reales.
// =====================================================================

// ---------- 1. DATOS DEL LOCAL ----------
const NEGOCIO = {
  nombre: 'Betos Reconquista',        // PENDIENTE: confirmar nombre definitivo (¿"Beto's Bar"?)
  lema: 'Tu lugar para comer rico y pasarla bien',
  dias: 'Martes a domingos',
  direccion: 'Roca 1323',
  whatsapp: '5493482636340',          // sin + ni espacios
  logo: 'assets/img/logo.png'
};

// ---------- 2. ÍCONOS DE CATEGORÍA (estilo emoji, a pedido del cliente) ----------
const ICONOS = {
  pizza: '🍕',
  hamburguesa: '🍔',
  lomito: '<img src="assets/img/lomito.png" alt="" style="width:28px;height:28px;object-fit:contain">',
  empanada: '🥟',
  papas: '🍟',
  bebida: '🥤',
  picada: '🧀',
  sandwich: '🥪',
  sinTac: '🌾',
  triple: '🍔',
  promo: '🏷️',
  alPlato: '🍽️',
  infantil: '🧸',
  ensalada: '🥗'
};

// ---------- 3. CARTA ----------
// Cada plato admite estos campos (todos opcionales salvo nombre, desc y precio):
//   id      -> se genera solo (categoría + nombre). Ponerlo a mano solo si se quiere fijar.
//   video   -> ruta al video, ej: 'assets/videos/clasica.mp4'  (si no existe, se muestra "Video próximamente")
//   img     -> foto de la tarjeta, ej: 'assets/img/clasica.jpg' (si no existe, se muestra el ícono de la categoría)
//   quitar  -> ingredientes que se pueden sacar, ej: ['mayonesa','tomate'] (Sprint 3)
//   extras  -> adicionales con costo, ej: [{ nombre: 'Cheddar extra', precio: 1000 }] (Sprint 3)
// "quitar" y "extras" también se pueden poner en la CATEGORÍA y los heredan todos sus platos.
// Si un plato define los suyos, tienen prioridad sobre los de la categoría.

const CARTA = [
  { id: 'pizzas', nombre: 'Pizzas', icono: ICONOS.pizza, platos: [
    { nombre: 'Italiana Muzza', desc: 'Masa madre, salsa, muzza, morrón, aceitunas, orégano', precio: 16000 },
    { nombre: 'Italiana Especial', desc: 'Masa madre, salsa, muzza, paleta, huevo, rodaja de tomate, morrón, aceitunas, orégano', precio: 17500 },
    { nombre: 'Italiana Fugazza', desc: 'Masa madre, salsa, muzza, cebolla salteada, morrón, aceitunas, orégano', precio: 17000 },
    { nombre: 'Italiana Rúcula', desc: 'Masa madre, salsa, muzza, rúcula, queso parmesano, aceitunas negras, aceite de oliva, orégano', precio: 17000 },
    { nombre: 'Italiana Roquefort', desc: 'Masa madre, salsa, muzza, queso azul, morrón, aceitunas, orégano', precio: 16000 },
    { nombre: 'Italiana Betos', desc: 'Masa madre, salsa, muzza, panceta, huevo, morrón, aceitunas, orégano', precio: 16000 },
    { nombre: 'Italiana Pepperoni', desc: 'Masa madre, salsa, muzza, pepperoni, orégano', precio: 16000 },
    { nombre: 'Muzzarella', desc: 'Salsa, muzzarella y aceitunas', precio: 12000 },
    { nombre: 'Napolitana', desc: 'Salsa, muzzarella, tomate, ajo y orégano', precio: 13500 }
  ]},
  // Hamburguesas: usan un video/foto de PRUEBA. Reemplazar por los reales cuando estén.
  { id: 'hamburguesas', nombre: 'Hamburguesas con papas', icono: ICONOS.hamburguesa,
    // EJEMPLO de opciones por categoría (se usan en el Sprint 3)
    quitar: ['mayonesa', 'tomate', 'lechuga'],
    extras: [{ nombre: 'Cheddar extra', precio: 1000 }, { nombre: 'Panceta extra', precio: 1500 }],
    platos: [
    { nombre: 'Clásica New Model', desc: 'Medallón de carne, lechuga, tomate y aderezo, con papas', precio: 13000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Clásica', desc: 'Medallón de carne, lechuga, tomate y aderezo, con papas', precio: 11000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Cheddar y panceta', desc: 'Medallón, cheddar, panceta crocante y cebolla, con papas', precio: 13000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Betos Burger', desc: 'Doble medallón, doble cheddar, huevo y salsa de la casa, con papas', precio: 15500, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},
  { id: 'lomitos', nombre: 'Lomitos con papas', icono: ICONOS.lomito, platos: [
    { nombre: 'Lomito completo', desc: 'Lomo, jamón, queso, huevo, lechuga y tomate, con papas', precio: 14000 },
    { nombre: 'Lomito simple', desc: 'Lomo, queso y lechuga, con papas', precio: 12000 }
  ]},
  { id: 'empanadas', nombre: 'Empanadas', icono: ICONOS.empanada, platos: [
    { nombre: 'Carne cortada a cuchillo', desc: 'Unidad', precio: 2200 },
    { nombre: 'Jamón y queso', desc: 'Unidad', precio: 2000 },
    { nombre: 'Pollo', desc: 'Unidad', precio: 2000 }
  ]},
  { id: 'papas', nombre: 'Papas', icono: ICONOS.papas, platos: [
    { nombre: 'Papas fritas', desc: 'Porción para compartir', precio: 6000 },
    { nombre: 'Papas con cheddar y panceta', desc: 'Porción para compartir', precio: 9000 }
  ]},
  { id: 'bebidas', nombre: 'Bebidas', icono: ICONOS.bebida, platos: [
    { nombre: 'Gaseosa 500 ml', desc: 'Línea Coca-Cola', precio: 3000 },
    { nombre: 'Cerveza 1 litro', desc: 'Rubia', precio: 6500 },
    { nombre: 'Agua mineral', desc: 'Sin gas o con gas', precio: 2500 }
  ]},
  { id: 'picadas', nombre: 'Picadas', icono: ICONOS.picada, platos: [
    { nombre: 'Picada para dos', desc: 'Fiambres, quesos, aceitunas y papas', precio: 20000 },
    { nombre: 'Picada para cuatro', desc: 'Fiambres, quesos, aceitunas, papas y bastones de muzza', precio: 34000 }
  ]},
  { id: 'sandwiches', nombre: 'Sándwiches con papas', icono: ICONOS.sandwich, platos: [
    { nombre: 'Milanesa completa', desc: 'Milanesa, jamón, queso, lechuga y tomate, con papas', precio: 12500 },
    { nombre: 'Lomito de cerdo', desc: 'Cerdo, queso y lechuga, con papas', precio: 12500 }
  ]},
  { id: 'sin-tac', nombre: 'Sin TAC', icono: ICONOS.sinTac, platos: [
    { nombre: 'Pizza muzza sin TAC', desc: 'Salsa y muzzarella', precio: 14000 },
    { nombre: 'Hamburguesa sin TAC', desc: 'Con pan sin TAC y papas', precio: 13500 }
  ]},
  { id: 'simples-triples', nombre: 'Simples y Triples', icono: ICONOS.triple, platos: [
    { nombre: 'Simple', desc: 'Un medallón, cheddar y aderezo', precio: 9000 },
    { nombre: 'Doble', desc: 'Dos medallones, doble cheddar y aderezo', precio: 12000 },
    { nombre: 'Triple', desc: 'Tres medallones, triple cheddar y aderezo', precio: 15000 }
  ]},
  // Esta categoría se reemplaza por la galería deslizable en el Sprint 7
  { id: 'promos', nombre: 'Promos', icono: ICONOS.promo, platos: [
    { nombre: 'Promo 2 hamburguesas', desc: 'Dos clásicas con papas y gaseosa', precio: 20000 },
    { nombre: 'Promo pizza + cerveza', desc: 'Una italiana a elección y cerveza de 1 litro', precio: 21000 }
  ]},
  // EJEMPLO: platos y precios de demostración
  { id: 'al-plato', nombre: 'Al Plato', icono: ICONOS.alPlato, platos: [
    { nombre: 'Milanesa con papas', desc: 'Milanesa de carne con papas fritas', precio: 11500 },
    { nombre: 'Pollo a la plancha', desc: 'Con ensalada mixta o papas', precio: 11000 }
  ]},
  // EJEMPLO: platos y precios de demostración
  { id: 'menu-infantil', nombre: 'Menú infantil', icono: ICONOS.infantil, platos: [
    { nombre: 'Mini hamburguesa', desc: 'Medallón, queso y papas, con jugo', precio: 8500 },
    { nombre: 'Nuggets con papas', desc: 'Seis nuggets de pollo con papas fritas', precio: 8000 },
    { nombre: 'Mini pizza', desc: 'Salsa y muzzarella, con jugo', precio: 7500 }
  ]},
  // EJEMPLO: platos y precios de demostración
  { id: 'ensaladas', nombre: 'Ensaladas', icono: ICONOS.ensalada, platos: [
    { nombre: 'Ensalada mixta', desc: 'Lechuga, tomate y cebolla', precio: 5500 },
    { nombre: 'Ensalada César', desc: 'Lechuga, pollo grillado, crutones y parmesano', precio: 9500 },
    { nombre: 'Ensalada completa', desc: 'Lechuga, tomate, huevo, zanahoria y atún', precio: 9000 }
  ]}
];

// =====================================================================
// NO TOCAR DE ACÁ PARA ABAJO: completa campos y arma el índice por id.
// =====================================================================
const PLATOS = {}; // { id: plato }, para buscar rápido (modal, carrito, WhatsApp)
CARTA.forEach(function (cat) {
  cat.platos.forEach(function (p) {
    const slug = p.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    p.id = p.id || (cat.id + '-' + slug);
    if (PLATOS[p.id]) console.warn('ID de plato repetido: ' + p.id);
    p.categoria = cat.id;
    p.video = p.video || null;
    p.img = p.img || null;
    p.quitar = p.quitar || cat.quitar || [];
    p.extras = p.extras || cat.extras || [];
    PLATOS[p.id] = p;
  });
});