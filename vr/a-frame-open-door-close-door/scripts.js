// Componente auto-door: quando a câmara se aproxima da porta,
// 1) a porta abre-se;
// 2) o utilizador (o #rig) entra sozinho na casa;
// 3) a porta fecha-se atrás dele.
// Vai na entidade da dobradiça; a porta (filha) roda com ela.
AFRAME.registerComponent('auto-door', {
  schema: {
    // a que distância (em metros) a porta abre
    distance: { default: 3 },
    // ângulo da porta aberta, em graus (positivo = abre para dentro da casa)
    angle: { default: 90 },
    // para onde vai o rig quando entra na casa
    inside: { type: 'vec3', default: { x: 0, y: 0, z: -8.5 } }
  },

  init: function () {
    var el = this.el;
    var data = this.data;
    var self = this;

    this.isOpen = false; // a porta começa fechada
    this.rig = document.querySelector('#rig');
    this.cameraPosition = new THREE.Vector3(); // posição da câmara no mundo
    this.doorPosition = new THREE.Vector3(); // posição da porta no mundo

    // 2) Quando a porta acaba de abrir: o utilizador entra sozinho na casa
    el.addEventListener('animationcomplete__abrir', function () {
      // As teclas W A S D movem a câmara DENTRO do rig.
      // Passamos esse deslocamento para o rig e pomos a câmara no centro do rig:
      // o utilizador não vê nenhum salto, mas agora basta mover o rig.
      var camera = self.el.sceneEl.camera.el;
      var rigPos = self.rig.getAttribute('position');
      var camPos = camera.getAttribute('position');
      self.rig.setAttribute('position', { x: rigPos.x + camPos.x, y: rigPos.y, z: rigPos.z + camPos.z });
      camera.setAttribute('position', { x: 0, y: camPos.y, z: 0 });

      // Ponto no chão 1.5 m à frente do centro da porta (a dobradiça está 1.1 m à esquerda do centro)
      var hinge = el.getAttribute('position');
      var doorFront = (hinge.x + 1.1) + ' 0 ' + (hinge.z + 1.5);

      // Primeiro anda até à frente da porta (1 segundo)...
      self.rig.setAttribute('animation__porta',
        'property: position; to: ' + doorFront + '; dur: 1000; easing: easeInOutQuad');
    });

    // ...depois passa a porta e entra na casa (2 segundos)
    this.rig.addEventListener('animationcomplete__porta', function () {
      var p = data.inside;
      self.rig.setAttribute('animation__entrar',
        'property: position; to: ' + p.x + ' ' + p.y + ' ' + p.z + '; dur: 2000; easing: easeInOutQuad');
    });

    // 3) Quando o utilizador já está dentro: a porta fecha-se
    this.rig.addEventListener('animationcomplete__entrar', function () {
      el.setAttribute('animation__fechar', 'property: rotation; to: 0 0 0; dur: 1000; easing: easeInOutQuad');
    });
  },

  // tick: corre em cada frame (cerca de 60 vezes por segundo)
  tick: function () {
    // a porta só abre uma vez
    if (this.isOpen) {
      return;
    }

    // posição da câmara e da porta no mundo
    this.el.sceneEl.camera.getWorldPosition(this.cameraPosition);
    this.el.object3D.getWorldPosition(this.doorPosition);
    this.doorPosition.x += 1.1; // centro da porta (a dobradiça está na ponta)

    // 1) Se a câmara está perto: abre a porta (1 segundo)
    if (this.cameraPosition.distanceTo(this.doorPosition) < this.data.distance) {
      this.isOpen = true;
      this.el.setAttribute('animation__abrir',
        'property: rotation; to: 0 ' + this.data.angle + ' 0; dur: 1000; easing: easeInOutQuad');
    }
  }
});
