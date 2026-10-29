// Componente toggle-door: a cada clique, abre ou fecha a porta.
// Vai na entidade da dobradiça; a porta (filha) roda com ela.
AFRAME.registerComponent('toggle-door', {
  schema: {
    // ângulo da porta aberta, em graus
    angle: { default: -90 }
  },

  init: function () {
    var el = this.el;
    var data = this.data;
    var isOpen = false; // a porta começa fechada

    // O clique chega da porta (filha) até à dobradiça
    el.addEventListener('click', function () {
      if (isOpen) {
        // fechar: volta a 0 graus
        el.setAttribute('animation', 'property: rotation; to: 0 0 0; dur: 1000; easing: easeInOutQuad');
      } else {
        // abrir: roda até ao ângulo do schema
        el.setAttribute('animation', 'property: rotation; to: 0 ' + data.angle + ' 0; dur: 500; easing: easeInOutQuad');
      }
      isOpen = !isOpen;
    });
  }
});
