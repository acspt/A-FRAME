// Componente "agarrar": toca na caixa para a agarrar e ela segue o telemóvel.
// Toca outra vez para a largar onde está.
AFRAME.registerComponent('agarrar', {

  // init corre uma vez, quando a caixa aparece na cena
  init: function () {
    var caixa = this.el;
    var componente = this;

    // a caixa começa largada
    componente.agarrada = false;

    // cada toque troca entre agarrada e largada
    caixa.addEventListener('click', function () {
      componente.agarrada = !componente.agarrada;

      // verde = agarrada, vermelho = largada
      if (componente.agarrada) {
        caixa.setAttribute('color', 'green');
      } else {
        caixa.setAttribute('color', 'tomato');
      }
    });
  },

  // tick corre muitas vezes por segundo
  tick: function () {
    // se a caixa estiver largada, não faz nada
    if (!this.agarrada) {
      return;
    }

    // ponto 1.5 m à frente da câmara e um pouco abaixo do centro do ecrã
    var ponto = new THREE.Vector3(0, -0.3, -1.5);

    // passa o ponto das coordenadas da câmara para as coordenadas do mundo
    this.el.sceneEl.camera.localToWorld(ponto);

    // a caixa vai para esse ponto
    this.el.object3D.position.copy(ponto);
  }
});
