// Componente "proximity-trigger": avisa quando o utilizador (a câmara) se aproxima ou afasta de uma entidade.
// Substitui o ficheiro original, que estava em https://aframe-usj.glitch.me/proximity-trigger.js
//
// Uso:  <a-box proximity-trigger="distance: 2"></a-box>
//
// Eventos lançados na entidade:
//   playerenter: o utilizador entrou no raio (ficou a menos de "distance" metros)
//   playerleave: o utilizador saiu do raio
AFRAME.registerComponent('proximity-trigger', {

  schema: {
    // raio, em metros, à volta da entidade
    distance: { type: 'number', default: 1 }
  },

  init: function () {
    // começa fora do raio
    this.dentro = false;

    // vetores reutilizados em cada frame (evita criar objetos novos a toda a hora)
    this.posicaoEntidade = new THREE.Vector3();
    this.posicaoCamara = new THREE.Vector3();
  },

  // tick corre em cada frame
  tick: function () {

    // a câmara ativa da cena é a posição do utilizador
    var camara = this.el.sceneEl.camera;
    if (!camara) {
      return;
    }

    // posições no mundo (contam com os pais da entidade e com o rig da câmara)
    // updateWorldMatrix(true, false): recalcula a posição a partir dos pais antes de a ler
    this.el.object3D.updateWorldMatrix(true, false);
    camara.updateWorldMatrix(true, false);
    this.el.object3D.getWorldPosition(this.posicaoEntidade);
    camara.getWorldPosition(this.posicaoCamara);

    var distancia = this.posicaoEntidade.distanceTo(this.posicaoCamara);

    // entrou no raio
    if (distancia <= this.data.distance && !this.dentro) {
      this.dentro = true;
      this.el.emit('playerenter');
    }

    // saiu do raio
    if (distancia > this.data.distance && this.dentro) {
      this.dentro = false;
      this.el.emit('playerleave');
    }
  }
});
