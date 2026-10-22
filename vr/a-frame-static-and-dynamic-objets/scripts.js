// Componente "collision-wire": a entidade passa a arame (wireframe) enquanto
// estiver a tocar noutra entidade, indicada pelo id.
// Uso:  <a-cylinder collision-wire="element: cam"></a-cylinder>
// Precisa da física (aframe-physics-system com ammo) e de emitCollisionEvents: true no ammo-body.
AFRAME.registerComponent('collision-wire', {
  schema: {
    // id da entidade com que se verifica a colisão (por exemplo a câmara: "cam")
    element: { type: 'string' }
  },

  init: function () {
    var el = this.el;
    var element = this.data.element;

    // começou a colisão: se for com a entidade indicada, mostra em arame
    el.addEventListener('collidestart', function (event) {
      if (event.detail.targetEl.id === element) {
        el.setAttribute('material', { wireframe: true });
      }
    });

    // terminou a colisão: volta ao normal
    el.addEventListener('collideend', function (event) {
      if (event.detail.targetEl.id === element) {
        el.setAttribute('material', { wireframe: false });
      }
    });
  }
});
