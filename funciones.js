// Ver plato: abre una ventana con el detalle del plato.
// Si el plato tiene data-model (archivo .glb), muestra el visor 3D con el botón de realidad aumentada.

const modal = document.getElementById('modal');
const closeBtn = document.getElementById('m-close');
const viewer = document.getElementById('m-viewer');
const stage = document.getElementById('m-stage');
let lastTrigger = null;

function openModal(dish, trigger) {
  document.getElementById('m-emoji').textContent = dish.dataset.emoji;
  document.getElementById('m-name').textContent = dish.dataset.name;
  document.getElementById('m-desc').textContent = dish.dataset.desc;
  document.getElementById('m-price').textContent = dish.dataset.price;

  if (dish.dataset.model) {
    viewer.src = dish.dataset.model;
    viewer.hidden = false;
    stage.hidden = true;
  } else {
    viewer.hidden = true;
    stage.hidden = false;
  }

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

document.querySelectorAll('.ver-plato').forEach(function (btn) {
  btn.addEventListener('click', function () {
    openModal(btn.closest('.dish'), btn);
  });
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', function (e) {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});