/* global AFRAME */

/**
 * Pede ao raycaster do cursor que volte a procurar os objetos clicáveis (.link).
 * Adaptado de aframe-speech-command-component (MIT, Leonardo Malave).
 */
AFRAME.registerComponent('update-raycaster', {
  schema: { type: 'selector' },

  init: function () {
    var cursor = this.data;
    // o raycaster do cursor pode ainda não estar criado; nesse caso o A-Frame 1.x atualiza-o sozinho
    if (cursor && cursor.components.raycaster) {
      cursor.components.raycaster.refreshObjects();
    }
  }
});
