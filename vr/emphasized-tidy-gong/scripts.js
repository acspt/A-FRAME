// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <head>) ----
AFRAME.registerComponent('collision-wire', {
  schema: {
    element: {type: 'string'}
  },
  init: function() {
    let el = this.el;
    let element = this.data.element;

    el.addEventListener("collidestart", function (event) {
      if ( event.detail.targetEl.id === element) {
        el.setAttribute('material', {'wireframe': true});
      };
    });
    el.addEventListener("collideend", function (event) {
      if ( event.detail.targetEl.id === element) {
        el.setAttribute('material', {'wireframe': false});
      };
    });
  }
});
    
