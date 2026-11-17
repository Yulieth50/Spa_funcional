/* Lili Stilo SPA — modo día / modo noche (compartido por todas las páginas).
   La elección se guarda en el navegador y se respeta en inicio, carrito, checkout, admin y trabajadora. */
(function(){
  var CLAVE = 'liliTema';
  function guardado(){ try{ return localStorage.getItem(CLAVE); }catch(e){ return null; } }
  function pintarBotones(t){
    document.querySelectorAll('.tema-btn').forEach(function(b){
      var txt = t === 'dark' ? 'Cambiar a modo día' : 'Cambiar a modo noche';
      b.textContent = t === 'dark' ? '☀️' : '🌙';
      b.title = txt;
      b.setAttribute('aria-label', txt);
    });
  }
  function aplicar(t){
    var h = document.documentElement;
    h.setAttribute('data-theme', t);
    h.setAttribute('data-bs-theme', t); // Bootstrap adapta modales, tablas y formularios
    pintarBotones(t);
  }
  var actual = guardado() === 'dark' ? 'dark' : 'light';
  aplicar(actual);
  window.toggleTema = function(){
    actual = actual === 'dark' ? 'light' : 'dark';
    try{ localStorage.setItem(CLAVE, actual); }catch(e){}
    aplicar(actual);
  };
  document.addEventListener('DOMContentLoaded', function(){ pintarBotones(actual); });
  // Si se cambia en otra pestaña, esta también cambia
  window.addEventListener('storage', function(e){
    if(e.key === CLAVE){ actual = e.newValue === 'dark' ? 'dark' : 'light'; aplicar(actual); }
  });
})();
