// CARTA. Para cambiar platos, precios o categorías se edita solo este archivo.
// Los platos de "Pizzas Masa Madre" son de la carta real; el resto son de EJEMPLO hasta tener la carta completa.
//
// VISTA 3D / REALIDAD AUMENTADA:
// - Para un plato con su modelo real, agregarle:  modelo: 'models/nombre.glb'
// - Para un plato SIN modelo todavía (muestra "Vista 3D próximamente"), agregarle:  modelo: null
// - Los platos que no tengan la línea "modelo" usan el astronauta de prueba (ver el final de este archivo).
//
// Los íconos son dibujos SVG de línea (viewBox 32x32). Cada categoría usa uno con: icono: ICONOS.nombre

const MODELO_PRUEBA = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';

const ICONOS = {
  pizzaSlice: '<path d="M4.5 9.5Q16 3.5 27.5 9.5"/><path d="M4.5 9.5L16 28.5L27.5 9.5"/><path d="M6.9 13.5Q16 8.5 25.1 13.5"/><circle cx="13" cy="17" r="1.6"/><circle cx="19" cy="17" r="1.6"/><circle cx="16" cy="23" r="1.4"/>',
  pizzaEntera: '<circle cx="16" cy="16" r="12.5"/><circle cx="16" cy="16" r="9.3"/><path d="M16 6.7V25.3M6.7 16H25.3"/><circle cx="11.5" cy="11.5" r="1.2"/><circle cx="20.5" cy="11.5" r="1.2"/><circle cx="11.5" cy="20.5" r="1.2"/><circle cx="20.5" cy="20.5" r="1.2"/>',
  hamburguesa: '<path d="M5 14Q5 6 16 6Q27 6 27 14Z"/><path d="M12 10h.01M16.5 8.5h.01M20.5 10.5h.01"/><path d="M4.5 17q2.9 2.5 5.75 0t5.75 0t5.75 0t5.75 0"/><rect x="5" y="20.5" width="22" height="3.5" rx="1.75"/><path d="M5.5 26.5H26.5Q26.5 29 23.5 29H8.5Q5.5 29 5.5 26.5Z"/>',
  lomito: '<path d="M3.5 16Q3.5 8 16 8Q28.5 8 28.5 16Q28.5 24 16 24Q3.5 24 3.5 16Z"/><path d="M3.5 16q2.5-3 5 0t5 0t5 0t5 0t5 0"/>',
  empanada: '<path d="M3 25A13 14 0 0 1 29 25Z"/><path d="M7 25A9 10 0 0 1 25 25" stroke-dasharray="1.6 2.4"/>',
  papas: '<rect x="9.5" y="7" width="3" height="7.5" rx=".8"/><rect x="13" y="4.5" width="3" height="10" rx=".8"/><rect x="16.5" y="5.5" width="3" height="9" rx=".8"/><rect x="20" y="8" width="3" height="6.5" rx=".8"/><path d="M7 14.5H25L22.8 28.5H9.2Z"/>',
  bebida: '<rect x="8" y="9" width="16" height="3.5" rx="1"/><path d="M9.5 12.5L11 28.5H21L22.5 12.5"/><path d="M17.5 9L19.5 3.5H23.5"/><path d="M10.3 19H21.7"/>',
  picada: '<path d="M4 23V16.5L28 8V23Z"/><circle cx="10" cy="19.5" r="1.4"/><circle cx="17" cy="17.5" r="1.6"/><circle cx="23.5" cy="14" r="1.3"/><circle cx="22.5" cy="19.5" r="1.1"/><path d="M3 26.5H29"/>',
  sandwich: '<path d="M3.5 24.5L16 7.5L28.5 24.5Z"/><path d="M8 19q2 2 4 0t4 0t4 0t4 0"/><path d="M5.4 22H26.6"/>',
  sinTac: '<path d="M16 29V9"/><path d="M16 24Q10 23.5 9 18Q15 18.5 16 24Z"/><path d="M16 24Q22 23.5 23 18Q17 18.5 16 24Z"/><path d="M16 17.5Q10.5 17 9.5 11.5Q15 12 16 17.5Z"/><path d="M16 17.5Q21.5 17 22.5 11.5Q17 12 16 17.5Z"/><path d="M16 11Q13.5 8 16 3.5Q18.5 8 16 11Z"/><path d="M5 5L27 27"/>',
  triple: '<path d="M6 10Q6 4 16 4Q26 4 26 10Z"/><rect x="5" y="12" width="22" height="3" rx="1.5"/><rect x="5" y="17" width="22" height="3" rx="1.5"/><rect x="5" y="22" width="22" height="3" rx="1.5"/><path d="M6 27H26Q26 29.5 23 29.5H9Q6 29.5 6 27Z"/>',
  promo: '<path d="M4 16.8L16.8 4H27Q28 4 28 5V15.2L15.2 28Q14.5 28.7 13.8 28L4 18.2Q3.3 17.5 4 16.8Z"/><circle cx="23" cy="9" r="1.6"/><circle cx="13" cy="15" r="1.2"/><circle cx="17" cy="19.5" r="1.2"/><path d="M17.5 14L12.5 20.5"/>',
  alPlato: '<circle cx="16" cy="16" r="7.5"/><circle cx="16" cy="16" r="4.3"/><path d="M3.5 5V10Q3.5 12.5 5.5 12.5T7.5 10V5"/><path d="M5.5 12.5V27"/><path d="M26.5 27V5Q30 8 30 15H26.5"/>',
  infantil: '<circle cx="8.5" cy="8.5" r="3.5"/><circle cx="23.5" cy="8.5" r="3.5"/><circle cx="16" cy="17.5" r="9.5"/><circle cx="12.5" cy="15" r=".9" fill="currentColor"/><circle cx="19.5" cy="15" r=".9" fill="currentColor"/><ellipse cx="16" cy="20.5" rx="3.5" ry="2.6"/><path d="M14.9 19h2.2"/>',
  ensalada: '<path d="M4 16H28A12 10 0 0 1 4 16Z"/><path d="M11 15Q7.5 11 9 6.5Q14 8 11 15Z"/><path d="M16 15Q12.5 10 16 4.5Q19.5 10 16 15Z"/><path d="M21 15Q24.5 11 23 6.5Q18 8 21 15Z"/><path d="M12 29H20"/>'
};

const CARTA = [
  { id: 'pizzas-masa-madre', nombre: 'Pizzas Masa Madre', icono: ICONOS.pizzaSlice, platos: [
    { nombre: 'Italiana Muzza', desc: 'Masa madre, salsa, muzza, morrón, aceitunas, orégano', precio: 16000 },
    { nombre: 'Italiana Especial', desc: 'Masa madre, salsa, muzza, paleta, huevo, rodaja de tomate, morrón, aceitunas, orégano', precio: 17500 },
    { nombre: 'Italiana Fugazza', desc: 'Masa madre, salsa, muzza, cebolla salteada, morrón, aceitunas, orégano', precio: 17000 },
    { nombre: 'Italiana Rúcula', desc: 'Masa madre, salsa, muzza, rúcula, queso parmesano, aceitunas negras, aceite de oliva, orégano', precio: 17000 },
    { nombre: 'Italiana Roquefort', desc: 'Masa madre, salsa, muzza, queso azul, morrón, aceitunas, orégano', precio: 16000 },
    { nombre: 'Italiana Betos', desc: 'Masa madre, salsa, muzza, panceta, huevo, morrón, aceitunas, orégano', precio: 16000 },
    { nombre: 'Italiana Pepperoni', desc: 'Masa madre, salsa, muzza, pepperoni, orégano', precio: 16000 }
  ]},
  { id: 'pizza-casera', nombre: 'Pizza Casera', icono: ICONOS.pizzaEntera, platos: [
    { nombre: 'Muzzarella', desc: 'Salsa, muzzarella y aceitunas', precio: 12000 },
    { nombre: 'Napolitana', desc: 'Salsa, muzzarella, tomate, ajo y orégano', precio: 13500 }
  ]},
  { id: 'hamburguesas', nombre: 'Hamburguesas con papas', icono: ICONOS.hamburguesa, platos: [
    { nombre: 'Clásica', desc: 'Medallón de carne, lechuga, tomate y aderezo, con papas', precio: 11000 },
    { nombre: 'Cheddar y panceta', desc: 'Medallón, cheddar, panceta crocante y cebolla, con papas', precio: 13000 },
    { nombre: 'Betos Burger', desc: 'Doble medallón, doble cheddar, huevo y salsa de la casa, con papas', precio: 15500 }
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
    // Ejemplo de plato SIN modelo 3D todavía: muestra "Vista 3D próximamente"
    { nombre: 'Agua mineral', desc: 'Sin gas o con gas', precio: 2500, modelo: null }
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
  { id: 'promos', nombre: 'Promos', icono: ICONOS.promo, platos: [
    { nombre: 'Promo 2 hamburguesas', desc: 'Dos clásicas con papas y gaseosa', precio: 20000 },
    { nombre: 'Promo pizza + cerveza', desc: 'Una italiana a elección y cerveza de 1 litro', precio: 21000 }
  ]},
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

// Por ahora, todos los platos que no tienen "modelo" usan el astronauta de prueba.
// Cuando todos tengan su modelo real, este bloque se puede borrar.
CARTA.forEach(function (cat) {
  cat.platos.forEach(function (p) {
    if (p.modelo === undefined) p.modelo = MODELO_PRUEBA;
  });
});