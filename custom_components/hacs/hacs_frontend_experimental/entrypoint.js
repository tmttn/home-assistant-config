
try {
<<<<<<< HEAD
  new Function("import('/hacsfiles/frontend/main-e6d3fb5e.js')")();
} catch (err) {
  var el = document.createElement('script');
  el.src = '/hacsfiles/frontend/main-e6d3fb5e.js';
=======
  new Function("import('/hacsfiles/frontend/main-73688df5.js')")();
} catch (err) {
  var el = document.createElement('script');
  el.src = '/hacsfiles/frontend/main-73688df5.js';
>>>>>>> 8661dc7bc552e0277cdac0c47816c9100703b232
  el.type = 'module';
  document.body.appendChild(el);
}
  