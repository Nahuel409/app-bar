// Armado y envío del pedido por WhatsApp.
// Depende de: NEGOCIO (carta.js), MESA (mesa.js), lineasDetalle() (carrito.js) y precio() (funciones.js).
// Los ítems tienen la forma de Carrito (o de obtenerSeleccion() + "cantidad").
// El precio aparece solo en el total.

const PAGOS = {
  efectivo: 'Efectivo',
  transferencia: 'Transferencia- SE ESPERA COMPROBANTE'
};

function armarMensaje(items, mesa, pago) {
  const L = [];
  L.push('*Pedido · ' + NEGOCIO.nombre + '*');
  L.push(mesa ? 'Mesa: ' + mesa : 'Mesa: sin indicar');
  if (pago && PAGOS[pago]) L.push('Pago: ' + PAGOS[pago]);
  L.push('');

  let total = 0;
  items.forEach(function (it) {
    const cant = it.cantidad || 1;
    total += it.precio * cant;
    L.push(cant + 'x *' + it.nombre + '* (' + it.categoria + ')');
    lineasDetalle(it).forEach(function (d) { L.push('   - ' + d); });
    L.push('');
  });

  L.push('*Total: ' + precio(total) + '*');
  return L.join('\n');
}

function enviarWhatsApp(items, pago) {
  const url = 'https://wa.me/' + NEGOCIO.whatsapp + '?text=' + encodeURIComponent(armarMensaje(items, MESA, pago));
  // Los enlaces muy largos fallan en algunos celulares. El carrito ya limita los ítems, esto es una red de seguridad.
  if (url.length > 7500) {
    window.alert('El pedido es demasiado largo para enviarlo de una sola vez. Sacá algunos productos o hacelo en dos pedidos.');
    return;
  }
  const w = window.open(url, '_blank');
  if (!w) window.location.href = url; // si el navegador bloquea la pestaña nueva
}
