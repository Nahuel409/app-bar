// Identificación de mesa por QR.
// El QR de cada mesa apunta a:  https://TU-DOMINIO/?mesa=5
// La mesa se guarda en la pestaña (sessionStorage) para que no se pierda si el cliente recarga la página.
// MESA vale el número de mesa como texto ("5"), o null si no se sabe.
const MESA = (function () {
  let guardada = null;
  let param = null;
  try { param = new URLSearchParams(window.location.search).get('mesa'); } catch (e) {}

  // Solo números de 1 a 3 cifras, mayores a cero (así no se cuela texto raro en el mensaje de WhatsApp)
  if (param !== null && /^\d{1,3}$/.test(param.trim()) && parseInt(param, 10) > 0) {
    const n = String(parseInt(param, 10));
    try { sessionStorage.setItem('mesa', n); } catch (e) {}
    return n;
  }
  try { guardada = sessionStorage.getItem('mesa'); } catch (e) {}
  return guardada && /^\d{1,3}$/.test(guardada) ? guardada : null;
})();