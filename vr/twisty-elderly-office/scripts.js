// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <body>) ----
// Add event listener for collision detection
document.querySelector('#camera').addEventListener('collide', function (e) {
  console.log('Collision detected with:', e.detail.body.el);
});
    
