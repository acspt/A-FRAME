// Componente "webgazer-olhar": liga a webcam com o WebGazer e envia a posicao do olhar
// para o gaze-control (evento "gazemove" no canvas da cena).
AFRAME.registerComponent('webgazer-olhar', {
  init: function () {
    var cena = this.el.sceneEl;

    webgazer.setGazeListener(function (dados) {
      // dados tem x e y do ponto do ecra para onde se esta a olhar (ou null)
      if (dados == null) {
        return;
      }
      var evento = new CustomEvent('gazemove', {
        detail: { x: dados.x, y: dados.y },
        bubbles: true
      });
      cena.canvas.dispatchEvent(evento);
    });

    // Arranca a webcam e o eye tracking
    webgazer.begin();
  }
});
