/* Lili Stilo SPA — utilidades compartidas del carrito (carrito.html y checkout.html).
   El carrito vive en el navegador (localStorage "carritoLili") y es el mismo que llena inicio.html. */
const CLAVE_CARRITO = 'carritoLili';
const WA_TIENDA = '573217464430'; // +57 321 746 4430

// Productos de la tienda (mismos nombres y fotos que inicio.html)
const CATALOGO_TIENDA = [
  { nombre:'Shampoo Keratina TIGI',      precio:38000, imagen:'img/Productos/Shampoo.png' },
  { nombre:'Mascarilla Schwarzkopf',     precio:57000, imagen:'img/Productos/Mascarilla.png' },
  { nombre:'Sérum Redken Anti-frizz',    precio:40000, imagen:'img/Productos/Serumn.png' },
  { nombre:'Esmalte Gel OPI',            precio:23000, imagen:'img/Productos/Esmalte.png' },
  { nombre:'Aceite Moroccanoil',         precio:62000, imagen:'img/Productos/Aceite.png' },
  { nombre:'Crema La Roche-Posay SPF50', precio:78000, imagen:'img/Productos/Crema.png' },
  { nombre:'Tónico Kérastase',           precio:85000, imagen:'img/Productos/Tonico.png' },
  { nombre:'Kit Manicure Essie',         precio:95000, imagen:'img/Productos/Set-Pedicure.png' }
];

function sinTildes(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); }
function imagenProducto(nombre){
  const n = sinTildes(nombre);
  const p = CATALOGO_TIENDA.find(x => sinTildes(x.nombre) === n) || CATALOGO_TIENDA.find(x => sinTildes(x.nombre).split(' ')[0] === n.split(' ')[0]);
  return p ? p.imagen : '';
}
function leerCarrito(){
  try{
    const a = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || '[]');
    if(!Array.isArray(a)) return [];
    return a.filter(p => p && (p.nombre || p.name)).map(p => {
      const nombre = p.nombre || p.name;
      return {
        nombre,
        precio: Number(p.precio ?? p.price) || 0,
        precioOriginal: Number(p.precioOriginal) || 0,
        cantidad: Math.max(1, parseInt(p.cantidad, 10) || 1),
        imagen: p.imagen || imagenProducto(nombre),
        seleccionado: p.seleccionado !== false
      };
    });
  }catch(e){ return []; }
}
function guardarCarrito(c){ try{ localStorage.setItem(CLAVE_CARRITO, JSON.stringify(c)); }catch(e){} }
function pesos(n){ return '$' + Math.round(Number(n) || 0).toLocaleString('es-CO'); }
function esc(s){ const d = document.createElement('div'); d.textContent = s === null || s === undefined ? '' : String(s); return d.innerHTML; }
function enlaceWhatsApp(mensaje){ return 'https://wa.me/' + WA_TIENDA + '?text=' + encodeURIComponent(mensaje); }

// Aviso breve en pantalla (reemplaza a alert, que bloquea la página)
let _avisoTimer;
function aviso(msg){
  let t = document.getElementById('aviso-tienda');
  if(!t){ t = document.createElement('div'); t.id = 'aviso-tienda'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('ver');
  clearTimeout(_avisoTimer);
  _avisoTimer = setTimeout(() => t.classList.remove('ver'), 3200);
}
