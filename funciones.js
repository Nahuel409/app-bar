// Dibuja la carta a partir de carta.js, y maneja búsqueda, categorías y "Ver plato" (realidad aumentada).

const carta = document.getElementById('carta');
const cats = document.getElementById('cats');
const flIzq = document.getElementById('cats-izq');
const flDer = document.getElementById('cats-der');
const buscar = document.getElementById('buscar');
const sinRes = document.getElementById('sin-res');
const modal = document.getElementById('modal');
const zonaVisor = document.getElementById('m-zona');
const aviso = document.getElementById('m-aviso');
const cerrar = document.getElementById('m-cerrar');
let visor = null;
let ultimoBoton = null;
let temporizadorAviso = null;

const precio = function (n) {
  return '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const limpio = function (s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

// Dibujo de categorías y platos
CARTA.forEach(function (cat, c) {
  const link = document.createElement('a');
  link.href = '#' + cat.id;
  link.dataset.id = cat.id;
  link.innerHTML =
    '<span class="ico"><svg viewBox="0 0 32 32" aria-hidden="true">' + cat.icono + '</svg></span>' +
    '<span>' + cat.nombre + '</span>';
  cats.appendChild(link);

  const sec = document.createElement('section');
  sec.className = 'cat';
  sec.id = cat.id;
  sec.innerHTML = '<h2>' + cat.nombre + '</h2><div class="grilla"></div>';
  const grilla = sec.querySelector('.grilla');

  cat.platos.forEach(function (p, i) {
    const card = document.createElement('article');
    card.className = 'plato';
    card.dataset.texto = limpio(p.nombre + ' ' + p.desc);
    // Todos los platos tienen "Ver plato" (si no hay modelo 3D, se muestra "próximamente")
    card.innerHTML =
      '<h3>' + p.nombre + '</h3><p>' + p.desc + '</p>' +
      '<div class="pie"><span class="precio">' + precio(p.precio) + '</span>' +
      '<button type="button" class="ver" data-c="' + c + '" data-p="' + i + '">Ver plato</button>' +
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

// Aviso de "celular no compatible": aparece en el centro de la imagen,
// se va solo a los 6 segundos, al tocarlo o con su propia cruz
function mostrarAviso() {
  clearTimeout(temporizadorAviso);
  aviso.hidden = false;
  aviso.classList.remove('alerta');
  void aviso.offsetWidth; // reinicia la animación
  aviso.classList.add('alerta');
  temporizadorAviso = setTimeout(ocultarAviso, 6000);
}
function ocultarAviso() {
  clearTimeout(temporizadorAviso);
  aviso.hidden = true;
  aviso.classList.remove('alerta');
}
aviso.addEventListener('click', ocultarAviso);
document.getElementById('m-aviso-x').addEventListener('click', function (e) {
  e.stopPropagation();
  ocultarAviso();
});

// Crea un visor 3D nuevo cada vez que se abre un plato.
// Así siempre arranca de cero (botón "Ver en mi mesa" incluido),
// aunque se vuelva a abrir el mismo plato sin recargar la página.
function crearVisor(modelo) {
  zonaVisor.innerHTML = '';
  const v = document.createElement('model-viewer');
  v.id = 'm-visor';
  v.setAttribute('camera-controls', '');
  v.setAttribute('ar', '');
  // webxr primero: abre la cámara dentro de Chrome (como modelviewer.dev); si no, Scene Viewer / Quick Look
  v.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
  v.setAttribute('ar-placement', 'floor');
  v.setAttribute('shadow-intensity', '1');
  v.setAttribute('alt', 'Vista 3D del plato');
  v.innerHTML = '<button slot="ar-button" class="ar-btn" type="button">Ver en mi mesa</button>';

  // El aviso aparece solo si falla la AR o si toca "Ver en mi mesa" en un celular no compatible
  v.addEventListener('ar-status', function (e) {
    if (v === visor && e.detail.status === 'failed') mostrarAviso();
  });
  v.querySelector('.ar-btn').addEventListener('click', function () {
    if (!v.canActivateAR) mostrarAviso();
  });

  zonaVisor.appendChild(v);
  v.setAttribute('src', modelo);
  return v;
}

// Cartel para los platos que todavía no tienen modelo 3D
function crearProximamente() {
  zonaVisor.innerHTML =
    '<div class="proximamente">' +
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5Z"/><path d="M4 9.5L16 16L28 9.5"/><path d="M16 16V29"/></svg>' +
      '<strong>Vista 3D próximamente</strong>' +
      '<span>Estamos preparando la vista previa de este plato. El plato ya está disponible para pedir.</span>' +
    '</div>';
  return null;
}

// Ver plato
carta.addEventListener('click', function (e) {
  const btn = e.target.closest('.ver');
  if (!btn) return;
  const plato = CARTA[btn.dataset.c].platos[btn.dataset.p];
  document.getElementById('m-nombre').textContent = plato.nombre;
  document.getElementById('m-desc').textContent = plato.desc;
  document.getElementById('m-precio').textContent = precio(plato.precio);
  ocultarAviso();
  visor = plato.modelo ? crearVisor(plato.modelo) : crearProximamente();
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
  ocultarAviso();
  if (ultimoBoton) ultimoBoton.focus();
  // Se destruye el visor una vez terminada la animación de cierre
  setTimeout(function () {
    if (!modal.classList.contains('abierto')) {
      zonaVisor.innerHTML = '';
      visor = null;
    }
  }, 300);
}
cerrar.addEventListener('click', cerrarModal);
modal.addEventListener('click', function (e) { if (e.target === modal) cerrarModal(); });
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('abierto')) cerrarModal();
});