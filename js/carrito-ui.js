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
const cPago = document.getElementById('c-pago');
const cTransf = document.getElementById('c-transf');
const cErrorPago = document.getElementById('c-error-pago');
const avisoPago = document.getElementById('pago-aviso');
let formaPago = null; // 'efectivo' | 'transferencia'

document.getElementById('c-alias').textContent = NEGOCIO.pago.alias;
document.getElementById('c-titular').textContent = NEGOCIO.pago.titular;

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
  cPago.hidden = items.length === 0;
  document.getElementById('c-monto').textContent = precio(Carrito.total());
  cPie.hidden = items.length === 0;
  cLista.innerHTML = items.map(function (it, i) {
    const det = lineasDetalle(it).map(function (d) { return '<li>' + d + '</li>'; }).join('');
    const pl = PLATOS[it.id];
    const editable = pl && (pl.variantes || pl.elegir.length || pl.cambios.length || pl.quitar.length);
    const menos = it.cantidad === 1
      ? '<button type="button" class="c-btn c-borrar" data-i="' + i + '" data-d="-1" aria-label="Quitar ' + it.nombre + '"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg></button>'
      : '<button type="button" class="c-btn" data-i="' + i + '" data-d="-1" aria-label="Menos ' + it.nombre + '"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>';
    return '<li class="c-item">' +
      '<div class="c-info"><strong>' + it.nombre + '</strong><span class="c-cat">' + it.categoria + '</span>' +
        (det ? '<ul class="c-det">' + det + '</ul>' : '') +
        (editable ? '<button type="button" class="c-editar" data-i="' + i + '">Editar</button>' : '') + '</div>' +
      '<div class="c-der"><span class="c-precio">' + precio(it.precio * it.cantidad) + '</span>' +
        '<div class="c-cant">' + menos + '<span class="c-n">' + it.cantidad + '</span>' +
        '<button type="button" class="c-btn" data-i="' + i + '" data-d="1"' + (it.cantidad >= Carrito.MAX ? ' disabled' : '') + ' aria-label="Más ' + it.nombre + '"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg></button>' +
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
  const ed = e.target.closest('.c-editar');
  if (ed) {
    const i = Number(ed.dataset.i);
    cerrarCarrito();
    editarPlato(Carrito.lista()[i], i);
    return;
  }
  const b = e.target.closest('.c-btn');
  if (!b) return;
  Carrito.cambiarCantidad(Number(b.dataset.i), Number(b.dataset.d));
});
// Forma de pago
cPago.addEventListener('change', function (e) {
  if (e.target.name !== 'o-pago') return;
  formaPago = e.target.value;
  cTransf.hidden = formaPago !== 'transferencia';
  cErrorPago.hidden = true;
  cPago.classList.remove('falta');
});

// Copiar alias / monto (el monto se copia sin puntos ni símbolo, para pegarlo directo en la app del banco)
function copiarTexto(texto, boton) {
  function listo() {
    const antes = boton.textContent;
    boton.textContent = '¡Copiado!';
    setTimeout(function () { boton.textContent = antes; }, 1500);
  }
  function respaldo() {
    const t = document.createElement('textarea');
    t.value = texto;
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); listo(); } catch (e) {}
    t.remove();
  }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(listo, respaldo);
  else respaldo();
}
document.getElementById('c-copiar-alias').addEventListener('click', function (e) { copiarTexto(NEGOCIO.pago.alias, e.currentTarget); });
document.getElementById('c-copiar-monto').addEventListener('click', function (e) { copiarTexto(String(Carrito.total()), e.currentTarget); });

// Enviar: exige elegir la forma de pago
document.getElementById('c-enviar').addEventListener('click', function () {
  if (!Carrito.lista().length) return;
  if (!formaPago) {
    cErrorPago.textContent = 'Elegí cómo vas a pagar para enviar el pedido.';
    cErrorPago.hidden = false;
    cPago.classList.add('falta');
    cPago.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  enviarWhatsApp(Carrito.lista(), formaPago);
  if (formaPago === 'transferencia') {
    avisoPago.classList.add('abierto');
    avisoPago.setAttribute('aria-hidden', 'false');
  }
});
document.getElementById('pago-aviso-ok').addEventListener('click', function () {
  avisoPago.classList.remove('abierto');
  avisoPago.setAttribute('aria-hidden', 'true');
});
document.getElementById('c-vaciar').addEventListener('click', function () {
  if (!window.confirm('¿Querés vaciar todo el pedido?')) return;
  Carrito.vaciar();
  formaPago = null;
  cTransf.hidden = true;
  cPago.querySelectorAll('input').forEach(function (i) { i.checked = false; });
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
