// Componente ar-shadows: em AR, troca o material do plano por um material
// transparente que só mostra as sombras. Assim o dinossauro parece fazer
// sombra no chão real. Fora de AR, o plano volta ao material e à visibilidade anteriores.
AFRAME.registerComponent('ar-shadows', {
  schema: {
    // quão escura é a sombra (0 = invisível, 1 = preta)
    opacity: { default: 0.3 }
  },

  init: function () {
    var el = this.el;
    var self = this;

    // enter-vr: a cena entrou em VR ou em AR
    el.sceneEl.addEventListener('enter-vr', function () {
      self.wasVisible = el.getAttribute('visible');
      if (el.sceneEl.is('ar-mode')) {
        var mesh = el.getObject3D('mesh');
        self.savedMaterial = mesh.material;
        mesh.material = new THREE.ShadowMaterial({ opacity: self.data.opacity });
        el.setAttribute('visible', true);
      }
    });

    // exit-vr: a cena saiu de VR ou de AR
    el.sceneEl.addEventListener('exit-vr', function () {
      if (self.savedMaterial) {
        el.getObject3D('mesh').material = self.savedMaterial;
        self.savedMaterial = null;
      }
      if (!self.wasVisible) {
        el.setAttribute('visible', false);
      }
    });
  }
});

// Botões de tamanho: mudam a escala da entidade #dino
function setSize(scale) {
  document.getElementById('dino').setAttribute('scale', { x: scale, y: scale, z: scale });
}

document.getElementById('btn_full').onclick = function () { setSize(1); };
document.getElementById('btn_half').onclick = function () { setSize(0.5); };
document.getElementById('btn_quarter').onclick = function () { setSize(0.25); };
