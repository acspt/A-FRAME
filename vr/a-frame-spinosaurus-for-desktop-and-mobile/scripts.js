// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <body>) ----
function setSize(scale) {
  document
    .getElementById("dino")
    .setAttribute("scale", { x: scale, y: scale, z: scale });
}
document.getElementById("btn_full").onclick = setSize.bind(this, 1);
document.getElementById("btn_half").onclick = setSize.bind(this, 0.5);
document.getElementById("btn_quarter").onclick = setSize.bind(this, 0.25);
    
