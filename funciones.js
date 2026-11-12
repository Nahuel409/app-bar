// Ver plato: ventana con el detalle del plato.
// Si el plato tiene data-model (.glb) muestra el visor 3D con dos opciones de realidad aumentada:
//   Opción 1: AR directa en la mesa (model-viewer, necesita celular compatible).
//   Opción 2: AR con cartel/imagen de la mesa (MindAR, funciona en más celulares).

// Archivo .mind generado a partir de la imagen del cartel. Cambiar por el del bar (ver instrucciones).
const MARCADOR = 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind';

const modal = document.getElementById('modal');
const closeBtn = document.getElementById('m-close');
const viewer = document.getElementById('m-viewer');
const stage = document.getElementById('m-stage');
const opciones = document.getElementById('m-opciones');
const mindBtn = document.getElementById('m-mind');
const mind = document.getElementById('mind');
const mindView = document.getElementById('mind-view');
const mindHint = document.getElementById('mind-hint');
const mindClose = document.getElementById('mind-close');
let lastTrigger = null;
let platoActual = null;
let mindMod = null;

function openModal(dish, trigger) {
  platoActual = dish;
  document.getElementById('m-emoji').textContent = dish.dataset.emoji;
  document.getElementById('m-name').textContent = dish.dataset.name;
  document.getElementById('m-desc').textContent = dish.dataset.desc;
  document.getElementById('m-price').textContent = dish.dataset.price;

  const tieneModelo = Boolean(dish.dataset.model);
  viewer.hidden = !tieneModelo;
  stage.hidden = tieneModelo;
  opciones.hidden = !tieneModelo;
  if (tieneModelo) viewer.src = dish.dataset.model;

  lastTrigger = trigger;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastTrigger) lastTrigger.focus();
}

// Opción 2: se carga MindAR recién cuando se toca el botón (para no hacer lenta la web)
async function abrirMind() {
  mind.hidden = false;
  mindHint.textContent = 'Iniciando la cámara...';
  try {
    mindMod = await import('./mindar.js');
    await mindMod.iniciarMindAR(mindView, platoActual.dataset.model, MARCADOR, {
      alEncontrar: function () { mindHint.textContent = ''; },
      alPerder: function () { mindHint.textContent = 'Apuntá la cámara al cartel de la mesa'; }
    });
    mindHint.textContent = 'Apuntá la cámara al cartel de la mesa';
  } catch (err) {
    console.error(err);
    mindHint.textContent = 'No pudimos abrir la cámara. Revisá los permisos del navegador.';
  }
}

async function cerrarMind() {
  try { if (mindMod) await mindMod.detenerMindAR(); } catch (err) { console.error(err); }
  mindView.innerHTML = '';
  mind.hidden = true;
}

document.querySelectorAll('.ver-plato').forEach(function (btn) {
  btn.addEventListener('click', function () {
    openModal(btn.closest('.dish'), btn);
  });
});

mindBtn.addEventListener('click', abrirMind);
mindClose.addEventListener('click', cerrarMind);
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', function (e) {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  if (!mind.hidden) cerrarMind();
  else if (modal.classList.contains('open')) closeModal();
});