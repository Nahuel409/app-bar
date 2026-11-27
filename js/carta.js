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
  whatsapp: '5493482270495',          // sin + ni espacios
  logo: 'assets/img/logo.png',
  // PENDIENTE: datos reales de la cuenta para transferencias / Mercado Pago
  pago: { alias: 'ALIAS.A.CONFIRMAR', titular: 'Titular a confirmar' }
};

// ---------- VIDEOS E IMÁGENES ----------
// Cada plato tiene escritos sus campos  video  e  img. HOY TODOS APUNTAN A LOS ARCHIVOS DE PRUEBA
// (hamburguesa-prueba). Para poner el real, reemplazar la ruta del plato por la del archivo, por ejemplo:
//   video: 'assets/videos/comun.mp4', img: 'assets/img/comun.jpg'
// Las pizzas tienen un video e img POR VARIANTE: casera (4 y 8 porciones) y masa madre.
// Las promos tienen  video  e  img  (la foto es la de la galería de promos, ej: 'assets/promos/caja-xl.jpg').

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
//                Cada variante puede tener su propio  video  e  img  (ej: pizza casera vs masa madre);
//                si no los tiene, usa los del plato. Mientras no elige, se muestra el de la primera variante.
//   varTitulo -> título del selector de variantes (ej: 'Tamaño', 'Cantidad')
//   elegir    -> el cliente DEBE elegir una opción: [{ titulo: 'Mayonesa', opciones: ['Casera', 'Natura'] }]
//   cambios   -> reemplazos permitidos: [{ de: 'rúcula', por: 'lechuga' }]
//   quitar    -> ingredientes que se pueden sacar: ['tomate', 'lechuga']
// NO se pueden agregar ingredientes: solo sacar o cambiar. El precio no cambia por las opciones.

// Atajos para no repetir
const MAYO = { titulo: 'Mayonesa', opciones: ['Casera', 'Natura', 'Sin mayonesa'] };
const RUCULA_X_LECHUGA = [{ de: 'rúcula', por: 'lechuga' }];
const empVar = [
  { nombre: 'Media docena (6)', precio: 11000 },
  { nombre: 'Docena (12)', precio: 20000 },
  { nombre: 'Por unidad', precio: 2000 }
];

// ---------- 4. CARTA ----------
const CARTA = [
  { id: 'pizzas', nombre: 'Pizzas', icono: ICONOS.pizza, platos: [
    { nombre: 'Muzza', desc: 'Salsa, muzza, morrón, aceitunas, orégano', varTitulo: 'Tamaño', quitar: ['morrón', 'aceitunas', 'orégano'],
      variantes: [
        { nombre: 'Casera · 4 porciones', precio: 10000, video: 'assets/videos/pizzas/muzzaCasera.mp4', img: 'assets/img/muzzaMM.jpg' },
        { nombre: 'Casera · 8 porciones', precio: 16000, video: 'assets/videos/pizzas/muzzaCasera.mp4', img: 'assets/img/muzzaMM.jpg' },
        { nombre: 'Masa madre · 8 porciones', precio: 16500, video: 'assets/videos/pizzas/muzzaMM.mp4', img: 'assets/img/muzzaMM.jpg' }
      ] },
    { nombre: 'Especial', desc: 'Salsa, muzza, paleta, huevo, morrón, aceitunas, orégano', varTitulo: 'Tamaño', quitar: ['paleta', 'huevo', 'morrón', 'aceitunas', 'orégano'],
      variantes: [
        { nombre: 'Casera · 4 porciones', precio: 10000, video: 'assets/videos/pizzas/especialCasera.mp4', img: 'assets/img/especialCasera.jpg' },
        { nombre: 'Casera · 8 porciones', precio: 17000, video: 'assets/videos/pizzas/especialCasera.mp4', img: 'assets/img/especialCasera.jpg' },
        { nombre: 'Masa madre · 8 porciones', precio: 17500, video: 'assets/videos/pizzas/especialMM.mp4', img: 'assets/img/especialMM.jpg' }
      ] },
    { nombre: 'Fugazza', desc: 'Salsa, muzza, cebolla salteada, morrón, aceitunas, orégano', varTitulo: 'Tamaño', quitar: ['cebolla', 'morrón', 'aceitunas', 'orégano'],
      variantes: [
        { nombre: 'Casera · 4 porciones', precio: 10000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Casera · 8 porciones', precio: 17000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Masa madre · 8 porciones', precio: 17500, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
      ] },
    { nombre: 'Rúcula', desc: 'Salsa, muzza, rúcula, queso parmesano, aceitunas negras, aceite de oliva, orégano', varTitulo: 'Tamaño', quitar: ['queso parmesano', 'aceitunas negras', 'aceite de oliva', 'orégano'],
      variantes: [
        { nombre: 'Casera · 4 porciones', precio: 10000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Casera · 8 porciones', precio: 17000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Masa madre · 8 porciones', precio: 17500, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
      ] },
    { nombre: 'Roquefort', desc: 'Salsa, muzza, queso azul, morrón, aceitunas, orégano', varTitulo: 'Tamaño', quitar: ['morrón', 'aceitunas', 'orégano'],
      variantes: [
        { nombre: 'Casera · 4 porciones', precio: 10000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Casera · 8 porciones', precio: 18000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Masa madre · 8 porciones', precio: 18500, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
      ] },
    { nombre: 'Beto’s', desc: 'Salsa, muzza, panceta, huevo, morrón, aceitunas, orégano', varTitulo: 'Tamaño', quitar: ['panceta', 'huevo', 'morrón', 'aceitunas', 'orégano'],
      variantes: [
        { nombre: 'Casera · 4 porciones', precio: 10000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Casera · 8 porciones', precio: 18000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
        { nombre: 'Masa madre · 8 porciones', precio: 18500, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
      ] },
    { nombre: 'Pepperoni', desc: 'Salsa, muzza, pepperoni, orégano', varTitulo: 'Tamaño', quitar: ['orégano'],
      variantes: [
        { nombre: 'Casera · 4 porciones', precio: 10000, video: 'assets/videos/pizzas/pepperoniCasera.mp4', img: 'assets/img/pepperoniMM.jpg' },
        { nombre: 'Casera · 8 porciones', precio: 18000, video: 'assets/videos/pizzas/pepperoniCasera.mp4', img: 'assets/img/pepperoniMM.jpg' },
        { nombre: 'Masa madre · 8 porciones', precio: 18500, video: 'assets/videos/pizzas/pepperoniMM.mp4', img: 'assets/img/pepperoniMM.jpg' }
      ] }
  ]},

  { id: 'papas', nombre: 'Papas fritas', icono: ICONOS.papas, platos: [
    { nombre: 'Clásicas', desc: 'Porción de papas fritas', precio: 10000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Clásicas con pote de mayonesa casera', desc: 'Porción de papas fritas con pote de mayonesa casera', precio: 11000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Con cheddar', desc: 'Porción de papas fritas con cheddar', precio: 12000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Papas Beto’s', desc: 'Gratinadas, huevo frito, panceta, verdeo', precio: 15000, quitar: ['huevo frito', 'panceta', 'verdeo'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'hamburguesas', nombre: 'Hamburguesas con papas', icono: ICONOS.hamburguesa, platos: [
    { nombre: 'Común', desc: 'Pan, bife Friar, queso, lechuga, tomate, mayonesa casera/Natura', precio: 9000, elegir: [MAYO], quitar: ['queso', 'lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Especial', desc: 'Pan, bife Friar, lechuga, tomate, queso, huevo, paleta, mayonesa casera/Natura', precio: 12000, elegir: [MAYO], quitar: ['lechuga', 'tomate', 'queso', 'huevo', 'paleta'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Beto’s Doble', desc: 'Pan de papa, doble bife Friar, lechuga, tomate, doble cheddar, huevo, paleta, mayonesa casera/Natura', precio: 15000, elegir: [MAYO], quitar: ['lechuga', 'tomate', 'doble cheddar', 'huevo', 'paleta'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'En pan de miga', desc: 'Doble miga, 4 bifes Friar, huevo, paleta, queso, lechuga, tomate, mayonesa casera/Natura', precio: 30000, elegir: [MAYO], quitar: ['huevo', 'paleta', 'queso', 'lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Veggie', desc: 'Pan, bife de legumbres o verdura, queso, lechuga, tomate, mayonesa casera/Natura', precio: 8500,
      elegir: [{ titulo: 'Bife', opciones: ['Legumbres', 'Verdura'] }, MAYO], quitar: ['queso', 'lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'lomos', nombre: 'Lomos con papas', icono: ICONOS.lomo, platos: [
    { nombre: 'Clásico', desc: 'Pan árabe, bife lomo, huevo, paleta, muzza, lechuga, tomate, mayonesa casera/Natura', precio: 20000, elegir: [MAYO], quitar: ['huevo', 'paleta', 'muzza', 'lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Premium', desc: 'Pan árabe, bife lomo, huevo, panceta, muzza, rúcula, tomate, mayonesa casera/Natura', precio: 21000, elegir: [MAYO], cambios: RUCULA_X_LECHUGA, quitar: ['huevo', 'panceta', 'muzza', 'rúcula', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Beto’s', desc: 'Pan de papa, bife lomo, panceta, huevo, muzza, lechuga, tomate, mayonesa casera/Natura', precio: 23000, elegir: [MAYO], quitar: ['panceta', 'huevo', 'muzza', 'lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Beto’s Premium', desc: 'Pan de papa, bife lomo, panceta, huevo, doble cheddar, rúcula, tomate, mayonesa casera/Natura', precio: 25000, elegir: [MAYO], cambios: RUCULA_X_LECHUGA, quitar: ['panceta', 'huevo', 'doble cheddar', 'rúcula', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Lomo pan de miga doble piso', desc: 'Doble miga, bife lomo, lechuga, tomate, huevo, mayonesa casera/Natura', precio: 32000, elegir: [MAYO], quitar: ['lechuga', 'tomate', 'huevo'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'sandwiches', nombre: 'Sándwiches con papas', icono: ICONOS.sandwich, platos: [
    { nombre: 'Mila clásico', desc: 'Pan de papa, milanesa de carne, lechuga, tomate, mayonesa casera/Natura', precio: 18000, elegir: [MAYO], quitar: ['lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Mila especial', desc: 'Pan de papa, milanesa de carne, queso, paleta, huevo, lechuga, tomate, mayonesa casera/Natura', precio: 20000, elegir: [MAYO], quitar: ['queso', 'paleta', 'huevo', 'lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Mila Beto’s', desc: 'Pan de papa, milanesa de carne, queso, panceta, huevo, rúcula, tomate, mayonesa casera/Natura', precio: 22000, elegir: [MAYO], cambios: RUCULA_X_LECHUGA, quitar: ['queso', 'panceta', 'huevo', 'rúcula', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Saludable de pollo', desc: 'Pan árabe, bife de pollo, lechuga, tomate, mayonesa casera/Natura', precio: 15000, elegir: [MAYO], quitar: ['lechuga', 'tomate'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'simples-triples', nombre: 'Simples y Triples', icono: ICONOS.triple, platos: [
    { nombre: 'Miga simple tostado', desc: 'Pan de miga, paleta, queso, mayonesa Natura', precio: 7000, quitar: ['paleta', 'queso', 'mayonesa'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Miga simple frío', desc: 'Pan de miga, paleta, queso, mayonesa Natura', precio: 7000, quitar: ['paleta', 'queso', 'mayonesa'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Triple verdura', desc: 'Doble miga, lechuga, tomate, huevo, mayonesa Natura', precio: 12000, elegir: [{ titulo: 'Servido', opciones: ['Caliente', 'Frío'] }], quitar: ['lechuga', 'tomate', 'huevo', 'mayonesa'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Triple pollo', desc: 'Doble miga, lechuga, tomate, huevo, pollo, mayonesa Natura', precio: 15000, elegir: [{ titulo: 'Servido', opciones: ['Caliente', 'Frío'] }], quitar: ['lechuga', 'tomate', 'huevo', 'mayonesa'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Miganesa de pollo', desc: 'Doble miga, mila de pollo, lechuga, tomate, huevo duro, mayonesa Natura', precio: 30000, quitar: ['lechuga', 'tomate', 'huevo duro', 'mayonesa'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'empanadas', nombre: 'Empanadas', icono: ICONOS.empanada, platos: [
    { nombre: 'Carne al horno', desc: 'Empanadas de carne al horno', varTitulo: 'Cantidad', variantes: empVar,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Jamón y queso al horno', desc: 'Empanadas de jamón y queso al horno', varTitulo: 'Cantidad', variantes: empVar,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Verdura al horno', desc: 'Empanadas de verdura al horno', varTitulo: 'Cantidad', variantes: empVar,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Carne fritas', desc: 'Empanadas de carne fritas', varTitulo: 'Cantidad', variantes: empVar,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'picadas', nombre: 'Picadas', icono: ICONOS.picada, platos: [
    { nombre: 'Picada Beto’s', desc: 'Milanesa de carne, papas fritas, salamín, queso, aceitunas, mayonesa casera/Natura, pan', varTitulo: 'Para cuántas personas',
      variantes: [{ nombre: '1 persona', precio: 20000 }, { nombre: '2 personas', precio: 32000 }, { nombre: '3 personas', precio: 45000 }],
      elegir: [MAYO], quitar: ['salamín', 'queso', 'aceitunas'],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Picada Beto’s Mixta', desc: 'Milanesa de carne y pollo, papas fritas, mayonesa casera/Natura, pan', varTitulo: 'Para cuántas personas',
      variantes: [{ nombre: '2 personas', precio: 28000 }, { nombre: '3 personas', precio: 40000 }],
      elegir: [MAYO],
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'al-plato', nombre: 'Al plato', icono: ICONOS.alPlato, platos: [
    { nombre: 'Milanesa con papas fritas', desc: 'Milanesa con papas fritas', precio: 16000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Milanesa gratinada con papas fritas', desc: 'Milanesa gratinada con papas fritas', precio: 17000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Milanesa napolitana con papas fritas', desc: 'Milanesa napolitana con papas fritas', precio: 18000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Milanesa a caballo con papas fritas', desc: 'Milanesa a caballo con papas fritas', precio: 17500,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Lomo con papas fritas', desc: 'Lomo con papas fritas', precio: 18000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Lomo gratinado con papas fritas', desc: 'Lomo gratinado con papas fritas', precio: 19000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
    { nombre: 'Mega Napo', desc: 'Milanesa mega napolitana', precio: 45000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]},

  { id: 'menu-infantil', nombre: 'Menú infantil', icono: ICONOS.infantil, platos: [
    { nombre: 'Patitas de pollo', desc: 'Patitas de pollo con papas fritas y gaseosa 500 cc', precio: 12000,
      video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
  ]}
];

// ---------- 5. PROMOS (galería deslizable arriba de la carta) ----------
// Cada promo usa los mismos campos que un plato (nombre, desc, precio, y opcionalmente elegir, variantes, etc.).
//   img -> imagen de la promo, ej: 'assets/promos/caja-xl.jpg'. Si no existe, se muestra un fondo de color con ícono.
// El orden de esta lista es el orden en la galería. Para sacar una promo, borrar su línea.
const PROMOS = [
  { nombre: 'Caja XL Beto’s', desc: 'Dos sándwiches de milanesa de carne, papas fritas y pote de mayonesa casera', precio: 28000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
  { nombre: 'Dos Burguer con papas fritas', desc: 'Dos hamburguesas con papas fritas', precio: 13000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
  { nombre: '1/2 Muzza + 1/2 docena de empanadas', desc: 'Media pizza muzza y media docena de empanadas', precio: 15000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg', elegir: [{ titulo: 'Empanadas', opciones: ['Carne', 'Jamón y queso'] }] },
  { nombre: 'Sándwich de milanesa de pollo (20 cm)', desc: 'Sándwich de milanesa de pollo de 20 cm', precio: 12000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
  { nombre: 'Picada milanesa de pollo x 2', desc: 'Picada de milanesa de pollo para dos personas', precio: 20000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
  { nombre: 'Triple de pollo + 1/2 docena de empanadas', desc: 'Triple de pollo y media docena de empanadas', precio: 21000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' },
  { nombre: 'Caja XXI Burguer', desc: 'Caja de hamburguesas con pan Bimbo', precio: 25000, video: 'assets/videos/hamburguesa-prueba.mp4', img: 'assets/img/hamburguesa-prueba.jpg' }
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
  const v0 = p.variantes && p.variantes[0];
  p.video = p.video || (v0 && v0.video) || null;
  p.img = p.img || (v0 && v0.img) || null;
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