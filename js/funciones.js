// Dibuja la carta a partir de carta.js, y maneja búsqueda, categorías y el modal "Ver plato".

const carta = document.getElementById('carta');
const cats = document.getElementById('cats');
const flIzq = document.getElementById('cats-izq');
const flDer = document.getElementById('cats-der');
const buscar = document.getElementById('buscar');
const sinRes = document.getElementById('sin-res');
const modal = document.getElementById('modal');
const zonaMedia = document.getElementById('m-zona');
const cerrar = document.getElementById('m-cerrar');
let ultimoBoton = null;

// $16000 -> "$16.000"
const precio = function (n) {
  return '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
const limpio = function (s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

// Datos del local (cabecera, título, pie): todo sale de NEGOCIO en carta.js
document.title = NEGOCIO.nombre + ' · Carta';
document.getElementById('favicon').href = NEGOCIO.logo;
const logo = document.getElementById('logo');
logo.src = NEGOCIO.logo;
logo.alt = NEGOCIO.nombre;
document.getElementById('negocio-nombre').textContent = NEGOCIO.nombre;
document.getElementById('negocio-lema').textContent = NEGOCIO.lema;
document.getElementById('negocio-dias').textContent = NEGOCIO.dias;
document.getElementById('negocio-dir').textContent = NEGOCIO.direccion;
document.getElementById('negocio-wsp').href = 'https://wa.me/' + NEGOCIO.whatsapp;
document.getElementById('pie').textContent = NEGOCIO.nombre + ' · ' + NEGOCIO.direccion;

// Dibujo de categorías y platos
CARTA.forEach(function (cat) {
  const link = document.createElement('a');
  link.href = '#' + cat.id;
  link.dataset.id = cat.id;
  link.innerHTML = '<span class="ico">' + cat.icono + '</span><span>' + cat.nombre + '</span>';
  cats.appendChild(link);

  const sec = document.createElement('section');
  sec.className = 'cat';
  sec.id = cat.id;
  sec.innerHTML = '<h2>' + cat.nombre + '</h2><div class="grilla"></div>';
  const grilla = sec.querySelector('.grilla');

  cat.platos.forEach(function (p) {
    const card = document.createElement('article');
    card.className = 'plato';
    card.dataset.texto = limpio(p.nombre + ' ' + p.desc);
    // Foto: el ícono de la categoría queda de fondo; si hay imagen y carga bien, se pone encima
    card.innerHTML =
      '<div class="foto" data-id="' + p.id + '">' +
        '<span class="foto-ico" aria-hidden="true">' + cat.icono + '</span>' +
        (p.img ? '<img src="' + p.img + '" alt="" loading="lazy" onerror="this.remove()">' : '') +
        (p.video ? '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5L19 12L8 18.5Z"/></svg></span>' : '') +
      '</div>' +
      '<h3>' + p.nombre + '</h3><p>' + p.desc + '</p>' +
      '<div class="pie"><span class="precio">' + precio(p.precio) + '</span>' +
      '<button type="button" class="ver" data-id="' + p.id + '">Ver plato</button>' +
      '</div>';
    grilla.appendChild(card);
  });
  carta.appendChild(sec);
});

// Flechas de la barra de categorías: se muestran solo si hay más para desplazar
function actualizarFlechas() {
  const max = cats.scrollWidth - cats.clientWidth;
  flIzq.hidden = cats.scrollLeft <= 4;
  flDer.hidden = cats.scrollLeft >= max - 4;
}
cats.addEventListener('scroll', actualizarFlechas, { passive: true });
window.addEventListener('resize', actualizarFlechas);
window.addEventListener('load', actualizarFlechas);
flIzq.addEventListener('click', function () {
  cats.scrollBy({ left: -cats.clientWidth * 0.7, behavior: 'smooth' });
});
flDer.addEventListener('click', function () {
  cats.scrollBy({ left: cats.clientWidth * 0.7, behavior: 'smooth' });
});
actualizarFlechas();

// Pista extra: al cargar, la barra se "asoma" hacia la derecha y vuelve
function asomar() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (cats.scrollWidth <= cats.clientWidth + 4 || cats.scrollLeft > 4) return;
  cats.scrollTo({ left: 70, behavior: 'smooth' });
  setTimeout(function () { cats.scrollTo({ left: 0, behavior: 'smooth' }); }, 700);
}
setTimeout(asomar, 900);

// Búsqueda
buscar.addEventListener('input', function () {
  const q = limpio(buscar.value.trim());
  let hayResultados = false;
  document.querySelectorAll('.cat').forEach(function (sec) {
    let visibles = 0;
    sec.querySelectorAll('.plato').forEach(function (card) {
      const ok = !q || card.dataset.texto.indexOf(q) !== -1;
      card.hidden = !ok;
      if (ok) visibles++;
    });
    sec.hidden = visibles === 0;
    if (visibles) hayResultados = true;
  });
  sinRes.hidden = hayResultados;
});

// Categoría activa según el scroll
const links = cats.querySelectorAll('a');
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (e) {
    if (!e.isIntersecting) return;
    links.forEach(function (l) {
      const activa = l.dataset.id === e.target.id;
      l.classList.toggle('activa', activa);
      if (activa) {
        cats.scrollTo({ left: l.offsetLeft - cats.clientWidth / 2 + l.clientWidth / 2, behavior: 'smooth' });
      }
    });
  });
}, { rootMargin: '-35% 0px -60% 0px' });
document.querySelectorAll('.cat').forEach(function (s) { observador.observe(s); });

// Cartel para los platos que todavía no tienen video
function crearProximamente() {
  zonaMedia.innerHTML =
    '<div class="proximamente">' +
      '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12.5"/><path d="M13 10.5L22 16L13 21.5Z"/></svg>' +
      '<strong>Video próximamente</strong>' +
      '<span>Estamos preparando el video de este plato. El plato ya está disponible para pedir.</span>' +
    '</div>';
}

// Zoom del video: botones + / − / reset, pellizco con dos dedos, rueda del mouse,
// doble toque y arrastre para moverse cuando está ampliado.
function activarZoom(caja, video) {
  const MAX = 4;
  let s = 1, x = 0, y = 0;
  const punteros = new Map();
  let dist0 = 0, s0 = 1, x0 = 0, y0 = 0, px0 = 0, py0 = 0, ultimoToque = 0;

  function aplicar() {
    s = Math.max(1, Math.min(MAX, s));
    const mx = (s - 1) * caja.clientWidth / 2;
    const my = (s - 1) * caja.clientHeight / 2;
    x = s === 1 ? 0 : Math.max(-mx, Math.min(mx, x));
    y = s === 1 ? 0 : Math.max(-my, Math.min(my, y));
    video.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
    caja.classList.toggle('ampliado', s > 1);
  }
  function distancia() {
    const p = Array.from(punteros.values());
    return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
  }
  function reiniciarBase() {
    const p = Array.from(punteros.values())[0];
    if (p) { px0 = p.x; py0 = p.y; x0 = x; y0 = y; }
    if (punteros.size === 2) { dist0 = distancia(); s0 = s; }
  }

  caja.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.zoom-ctrl')) return;
    caja.setPointerCapture(e.pointerId);
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    reiniciarBase();
  });
  caja.addEventListener('pointermove', function (e) {
    if (!punteros.has(e.pointerId)) return;
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (punteros.size === 2) {
      s = s0 * distancia() / dist0;
    } else if (s > 1) {
      x = x0 + (e.clientX - px0);
      y = y0 + (e.clientY - py0);
    }
    aplicar();
  });
  function soltar(e) {
    if (!punteros.has(e.pointerId)) return;
    const movio = Math.hypot(e.clientX - px0, e.clientY - py0) > 8;
    punteros.delete(e.pointerId);
    reiniciarBase();
    // Doble toque: alterna entre normal y 2,5x
    if (e.type === 'pointerup' && punteros.size === 0 && !movio) {
      const ahora = Date.now();
      if (ahora - ultimoToque < 300) { s = s > 1 ? 1 : 2.5; aplicar(); ultimoToque = 0; }
      else ultimoToque = ahora;
    }
  }
  caja.addEventListener('pointerup', soltar);
  caja.addEventListener('pointercancel', soltar);
  caja.addEventListener('wheel', function (e) {
    e.preventDefault();
    s *= e.deltaY < 0 ? 1.15 : 1 / 1.15;
    aplicar();
  }, { passive: false });

  caja.querySelector('.z-mas').addEventListener('click', function () { s *= 1.4; aplicar(); });
  caja.querySelector('.z-menos').addEventListener('click', function () { s /= 1.4; aplicar(); });
  caja.querySelector('.z-reset').addEventListener('click', function () { s = 1; aplicar(); });
  const bPausa = caja.querySelector('.z-pausa');
  bPausa.addEventListener('click', function () {
    if (video.paused) video.play(); else video.pause();
  });
  video.addEventListener('pause', function () { bPausa.classList.add('en-pausa'); bPausa.setAttribute('aria-label', 'Reproducir'); });
  video.addEventListener('play', function () { bPausa.classList.remove('en-pausa'); bPausa.setAttribute('aria-label', 'Pausar'); });
}

// Muestra el video del plato; si no tiene o el archivo no existe, "Video próximamente"
function mostrarMedia(plato) {
  if (!plato.video) { crearProximamente(); return; }
  zonaMedia.innerHTML =
    '<div class="zoom-caja">' +
      '<video muted loop playsinline autoplay preload="auto" aria-label="Video de ' + plato.nombre + '"></video>' +
      '<div class="zoom-ctrl">' +
        '<button type="button" class="z-pausa" aria-label="Pausar"><svg viewBox="0 0 24 24"><path class="i-pausa" d="M8 5v14M16 5v14"/><path class="i-play" d="M8 5.5L19 12L8 18.5Z"/></svg></button>' +
        '<span class="z-sep"></span>' +
        '<button type="button" class="z-menos" aria-label="Alejar"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>' +
        '<button type="button" class="z-mas" aria-label="Acercar"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg></button>' +
        '<button type="button" class="z-reset" aria-label="Restablecer zoom"><svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5"/></svg></button>' +
      '</div>' +
    '</div>';
  const caja = zonaMedia.querySelector('.zoom-caja');
  const video = caja.querySelector('video');
  if (plato.img) video.poster = plato.img;
  video.addEventListener('error', crearProximamente);
  video.src = plato.video;
  activarZoom(caja, video);
  const r = video.play();
  if (r && typeof r.catch === 'function') r.catch(function () {});
}

// Ver plato
carta.addEventListener('click', function (e) {
  const clic = e.target.closest('.ver, .foto');
  if (!clic) return;
  const btn = clic.closest('.plato').querySelector('.ver');
  const plato = PLATOS[clic.dataset.id];
  if (!plato) return;
  document.getElementById('m-nombre').textContent = plato.nombre;
  document.getElementById('m-desc').textContent = plato.desc;
  document.getElementById('m-precio').textContent = precio(plato.precio);
  mostrarMedia(plato);
  ultimoBoton = btn;
  modal.classList.add('abierto');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  cerrar.focus();
});

function cerrarModal() {
  modal.classList.remove('abierto');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (ultimoBoton) ultimoBoton.focus();
  // Se vacía la zona de media una vez terminada la animación de cierre (también frena videos)
  setTimeout(function () {
    if (modal.classList.contains('abierto')) return;
    const v = zonaMedia.querySelector('video');
    if (v) { v.pause(); v.removeAttribute('src'); v.load(); }
    zonaMedia.innerHTML = '';
  }, 300);
}
cerrar.addEventListener('click', cerrarModal);
modal.addEventListener('click', function (e) { if (e.target === modal) cerrarModal(); });
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('abierto')) cerrarModal();
});