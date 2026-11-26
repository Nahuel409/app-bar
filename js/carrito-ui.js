// Pantalla del carrito: botón fijo con burbuja, panel "Tu pedido" y aviso de "agregado".
// Depende de: Carrito (carrito.js), precio() (funciones.js), enviarWhatsApp() (whatsapp.js), MESA (mesa.js).

const fab = document.getElementById('cart-fab');
const burbuja = document.getElementById('cart-burbuja');
const panel = document.getElementById('carrito');
const cLista = document.getElementById('c-lista');
const cVacio = document.getElementById('c-vacio');
const cPie = document.getElementById('c-pie');
const cTotal = document.getElementById('c-total');
const cMesa = document.getElementById('c-mesa');
const aviso = document.getElementById('toast');
let temporizadorAviso = null;

if (MESA) { cMesa.textContent = 'Mesa ' + MESA; cMesa.hidden = false; }

function pintarBoton() {
  const n = Carrito.cantidad();
  burbuja.textContent = n > 99 ? '99+' : String(n);
  burbuja.hidden = n === 0;
  fab.setAttribute('aria-label', n ? 'Ver mi pedido (' + n + ')' : 'Ver mi pedido');
}

function pintarPanel() {
  const items = Carrito.lista();
  cVacio.hidden = items.length > 0;
  cPie.hidden = items.length === 0;
  cLista.innerHTML = items.map(function (it, i) {
    const det = lineasDetalle(it).map(function (d) { return '<li>' + d + '</li>'; }).join('');
    const menos = it.cantidad === 1
      ? '<button type="button" class="c-btn c-borrar" data-i="' + i + '" data-d="-1" aria-label="Quitar ' + it.nombre + '"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg></button>'
      : '<button type="button" class="c-btn" data-i="' + i + '" data-d="-1" aria-label="Menos ' + it.nombre + '"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>';
    return '<li class="c-item">' +
      '<div class="c-info"><strong>' + it.nombre + '</strong><span class="c-cat">' + it.categoria + '</span>' +
        (det ? '<ul class="c-det">' + det + '</ul>' : '') + '</div>' +
      '<div class="c-der"><span class="c-precio">' + precio(it.precio * it.cantidad) + '</span>' +
        '<div class="c-cant">' + menos + '<span class="c-n">' + it.cantidad + '</span>' +
        '<button type="button" class="c-btn" data-i="' + i + '" data-d="1" aria-label="Más ' + it.nombre + '"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg></button>' +
        '</div></div></li>';
  }).join('');
  cTotal.textContent = precio(Carrito.total());
}

Carrito.alCambiar(function () { pintarBoton(); pintarPanel(); });
pintarBoton();
pintarPanel();

// Abrir / cerrar el panel
function abrirCarrito() {
  panel.classList.add('abierto');
  panel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('c-cerrar').focus();
}
function cerrarCarrito() {
  panel.classList.remove('abierto');
  panel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  fab.focus();
}
fab.addEventListener('click', abrirCarrito);
document.getElementById('c-cerrar').addEventListener('click', cerrarCarrito);
panel.addEventListener('click', function (e) { if (e.target === panel) cerrarCarrito(); });
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && panel.classList.contains('abierto')) cerrarCarrito();
});

// + y − (con 1 unidad el − elimina el producto)
cLista.addEventListener('click', function (e) {
  const b = e.target.closest('.c-btn');
  if (!b) return;
  Carrito.cambiarCantidad(Number(b.dataset.i), Number(b.dataset.d));
});
document.getElementById('c-enviar').addEventListener('click', function () {
  if (Carrito.lista().length) enviarWhatsApp(Carrito.lista());
});
document.getElementById('c-vaciar').addEventListener('click', function () {
  if (window.confirm('¿Querés vaciar todo el pedido?')) Carrito.vaciar();
});

// Aviso "agregado al pedido" + la burbuja del botón rebota
function avisarAgregado(nombre) {
  aviso.textContent = '✓ ' + nombre + ' agregado al pedido';
  aviso.hidden = false;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(function () { aviso.hidden = true; }, 2200);
  fab.classList.remove('rebote');
  void fab.offsetWidth; // reinicia la animación
  fab.classList.add('rebote');
}
