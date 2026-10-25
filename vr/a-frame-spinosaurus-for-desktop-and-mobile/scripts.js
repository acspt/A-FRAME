// Botões de tamanho: mudam a escala da entidade #dino
function setSize(scale) {
  document.getElementById('dino').setAttribute('scale', { x: scale, y: scale, z: scale });
}

document.getElementById('btn_full').onclick = function () { setSize(1); };
document.getElementById('btn_half').onclick = function () { setSize(0.5); };
document.getElementById('btn_quarter').onclick = function () { setSize(0.25); };
