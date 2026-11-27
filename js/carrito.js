// Carrito: estado y persistencia (sin nada de pantalla; la pantalla está en carrito-ui.js).
// Cada ítem: { key, id, nombre, categoria, varTitulo, variante, precio, cantidad, elegidas, cambios, quitar }
// Dos productos con exactamente las mismas opciones se juntan en un solo ítem (cantidad + 1).
// Se guarda en localStorage por 12 horas, así no se pierde si el cliente recarga la página.

// Líneas de detalle de un ítem (las usan el carrito y el mensaje de WhatsApp)
function lineasDetalle(it) {
  const l = [];
  if (it.variante) l.push(it.varTitulo + ': ' + it.variante);
  it.elegidas.forEach(function (e) { l.push(e.titulo + ': ' + e.opcion); });
  it.cambios.forEach(function (c) { l.push('Cambio: ' + c); });
  if (it.quitar.length) l.push('Sin: ' + it.quitar.join(', '));
  return l;
}

const Carrito = (function () {
  const CLAVE = 'betos-carrito-v1';
  const VIDA_MS = 12 * 60 * 60 * 1000;
  const MAX = 99;        // unidades por ítem
  const MAX_ITEMS = 15;  // ítems distintos (mantiene el mensaje de WhatsApp dentro del largo que admite el enlace)
  let items = [];
  const oyentes = [];

  function firmar(it) {
    return [
      it.id,
      it.variante || '',
      it.elegidas.map(function (e) { return e.titulo + '=' + e.opcion; }).join(','),
      it.cambios.join(','),
      it.quitar.slice().sort().join(',')
    ].join('|');
  }

  // Al cargar, se revisa cada ítem contra la carta actual: si un plato o tamaño ya no existe se descarta,
  // y el precio siempre es el vigente (por si se actualizaron los precios).
  function revalidar(it) {
    if (!it || !PLATOS[it.id]) return null;
    if (!Array.isArray(it.elegidas) || !Array.isArray(it.cambios) || !Array.isArray(it.quitar)) return null;
    const p = PLATOS[it.id];
    let pr = p.precio;
    if (p.variantes) {
      const v = p.variantes.filter(function (x) { return x.nombre === it.variante; })[0];
      if (!v) return null;
      pr = v.precio;
    }
    // Las opciones guardadas tienen que seguir existiendo en la carta actual (por si se editó carta.js)
    const okElegidas = p.elegir.every(function (g) {
      return it.elegidas.some(function (e) { return e.titulo === g.titulo && g.opciones.indexOf(e.opcion) !== -1; });
    }) && it.elegidas.length === p.elegir.length;
    const okCambios = it.cambios.every(function (c) {
      return p.cambios.some(function (x) { return x.de + ' → ' + x.por === c; });
    });
    const okQuitar = it.quitar.every(function (q) { return p.quitar.indexOf(q) !== -1; });
    if (!okElegidas || !okCambios || !okQuitar) return null;
    it.nombre = p.nombre;
    it.categoria = p.categoriaNombre;
    it.precio = pr;
    it.cantidad = Math.max(1, Math.min(MAX, parseInt(it.cantidad, 10) || 1));
    it.key = firmar(it);
    return it;
  }

  function cargar() {
    try {
      const d = JSON.parse(localStorage.getItem(CLAVE));
      if (!d || !Array.isArray(d.items) || Date.now() - d.t > VIDA_MS) return;
      items = d.items.map(revalidar).filter(Boolean);
    } catch (e) { items = []; }
  }
  function cambio() {
    try { localStorage.setItem(CLAVE, JSON.stringify({ t: Date.now(), items: items })); } catch (e) {}
    oyentes.forEach(function (f) { f(); });
  }

  function construir(sel, cantidad) {
    const it = {
      id: sel.id, nombre: sel.nombre, categoria: sel.categoria, varTitulo: sel.varTitulo,
      variante: sel.variante, precio: sel.precio, cantidad: cantidad,
      elegidas: sel.elegidas, cambios: sel.cambios, quitar: sel.quitar
    };
    it.key = firmar(it);
    return it;
  }

  cargar();

  return {
    MAX: MAX,
    MAX_ITEMS: MAX_ITEMS,
    lista: function () { return items; },
    cantidad: function () { return items.reduce(function (a, it) { return a + it.cantidad; }, 0); },
    total: function () { return items.reduce(function (a, it) { return a + it.precio * it.cantidad; }, 0); },
    alCambiar: function (f) { oyentes.push(f); },
    // Devuelve false si el carrito ya tiene el máximo de ítems distintos
    agregar: function (sel) {
      const it = construir(sel, 1);
      const igual = items.filter(function (x) { return x.key === it.key; })[0];
      if (igual) igual.cantidad = Math.min(MAX, igual.cantidad + 1);
      else {
        if (items.length >= MAX_ITEMS) return false;
        items.push(it);
      }
      cambio();
      return true;
    },
    // Reemplaza las opciones de un ítem (edición). Conserva la cantidad; si queda igual a otro ítem, se juntan
    reemplazar: function (i, sel) {
      const viejo = items[i];
      if (!viejo) return;
      const nuevo = construir(sel, viejo.cantidad);
      items.splice(i, 1);
      const igual = items.filter(function (x) { return x.key === nuevo.key; })[0];
      if (igual) igual.cantidad = Math.min(MAX, igual.cantidad + nuevo.cantidad);
      else items.splice(i, 0, nuevo);
      cambio();
    },
    // delta +1 / -1. Si llega a 0 se elimina el ítem
    cambiarCantidad: function (i, delta) {
      const it = items[i];
      if (!it) return;
      it.cantidad = Math.min(MAX, it.cantidad + delta);
      if (it.cantidad <= 0) items.splice(i, 1);
      cambio();
    },
    vaciar: function () { items = []; cambio(); }
  };
})();