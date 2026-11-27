// Galería de promos: se dibuja a partir de PROMOS (carta.js).
// Tocar la promo abre el modal del plato (opciones, "Agregar al pedido", "Pedir ahora").
// El botón rojo pide la promo directo por WhatsApp; si la promo necesita elegir algo (ej: sabor de empanadas),
// el botón abre el modal para que lo elija.
// Depende de: PROMOS y PLATOS (carta.js), abrirPlato() (funciones.js), enviarWhatsApp() (whatsapp.js), precio() y limpio().
(function () {
  const sec = document.getElementById('promos');
  const riel = document.getElementById('promos-riel');
  const puntos = document.getElementById('promos-puntos');
  const flIzq = document.getElementById('promos-izq');
  const flDer = document.getElementById('promos-der');
  const buscar = document.getElementById('buscar');
  if (!PROMOS.length) return;

  function necesitaElegir(p) { return !!p.variantes || p.elegir.length > 0; }

  riel.innerHTML = PROMOS.map(function (p) {
    return '<article class="promo" data-id="' + p.id + '" tabindex="0" role="button" aria-label="Ver promo ' + p.nombre + '">' +
      '<span class="promo-ico" aria-hidden="true">' + ICONOS.promo + '</span>' +
      (p.img ? '<img src="' + p.img + '" alt="" loading="lazy" onerror="this.remove()">' : '') +
      '<div class="promo-txt"><h3>' + p.nombre + '</h3><p>' + p.desc + '</p>' +
      '<div class="promo-pie"><strong class="promo-precio">' + (p.variantes ? 'Desde ' : '') + precio(p.precio) + '</strong>' +
      '<button type="button" class="promo-btn" data-id="' + p.id + '">' + (necesitaElegir(p) ? 'Elegir y pedir' : 'Pedir por WhatsApp') + '</button></div></div>' +
      '</article>';
  }).join('');

  puntos.innerHTML = PROMOS.map(function (p, i) {
    return '<button type="button" class="punto" data-i="' + i + '" aria-label="Ir a la promo ' + (i + 1) + '"></button>';
  }).join('');
  const hayVarias = PROMOS.length > 1;
  puntos.hidden = !hayVarias;
  sec.hidden = false;

  // Pedido directo de una promo sin opciones obligatorias
  function pedirDirecto(p) {
    enviarWhatsApp([{
      id: p.id, nombre: p.nombre, categoria: p.categoriaNombre, varTitulo: 'Opción', variante: null,
      precio: p.precio, cantidad: 1, elegidas: [], cambios: [], quitar: []
    }]);
  }

  riel.addEventListener('click', function (e) {
    const b = e.target.closest('.promo-btn');
    if (b) {
      const p = PLATOS[b.dataset.id];
      if (!p) return;
      if (necesitaElegir(p)) abrirPlato(p, b); else pedirDirecto(p);
      return;
    }
    const tarjeta = e.target.closest('.promo');
    if (tarjeta && PLATOS[tarjeta.dataset.id]) abrirPlato(PLATOS[tarjeta.dataset.id], tarjeta);
  });
  riel.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const tarjeta = e.target.closest('.promo');
    if (!tarjeta || e.target.closest('.promo-btn')) return;
    e.preventDefault();
    abrirPlato(PLATOS[tarjeta.dataset.id], tarjeta);
  });

  // Puntos y flechas según la posición del deslizador
  function actualizar() {
    const ancho = riel.clientWidth || 1;
    const i = Math.round(riel.scrollLeft / ancho);
    puntos.querySelectorAll('.punto').forEach(function (d, n) { d.classList.toggle('activo', n === i); });
    flIzq.hidden = !hayVarias || riel.scrollLeft <= 4;
    flDer.hidden = !hayVarias || riel.scrollLeft >= riel.scrollWidth - ancho - 4;
  }
  let pendiente = false;
  riel.addEventListener('scroll', function () {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { pendiente = false; actualizar(); });
  }, { passive: true });
  window.addEventListener('resize', actualizar);
  window.addEventListener('load', actualizar);
  flIzq.addEventListener('click', function () { riel.scrollBy({ left: -riel.clientWidth, behavior: 'smooth' }); });
  flDer.addEventListener('click', function () { riel.scrollBy({ left: riel.clientWidth, behavior: 'smooth' }); });
  puntos.addEventListener('click', function (e) {
    const d = e.target.closest('.punto');
    if (d) riel.scrollTo({ left: Number(d.dataset.i) * riel.clientWidth, behavior: 'smooth' });
  });
  actualizar();

  // Mientras se busca un producto, la galería se oculta para no ocupar lugar
  buscar.addEventListener('input', function () { sec.hidden = buscar.value.trim() !== ''; });
})();