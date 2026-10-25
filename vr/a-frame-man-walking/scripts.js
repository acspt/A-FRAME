// Componente walking: a entidade caminha ao acaso pelo chão.
// De X em X segundos escolhe uma nova direção (um pouco diferente da anterior),
// vira-se para essa direção e anda até ao ponto seguinte com o componente animation.
// Uso no HTML: <a-entity walking="speed: 1; interval: 2000; limit: 6"></a-entity>
AFRAME.registerComponent('walking', {
  schema: {
    speed: { type: 'number', default: 1 },        // metros por segundo
    interval: { type: 'number', default: 2000 },  // milissegundos entre mudanças de direção
    limit: { type: 'number', default: 6 }         // distância máxima ao ponto de partida, em metros
  },

  init: function () {
    // ponto de partida (para não se afastar demasiado)
    this.start = this.el.object3D.position.clone();
    // direção inicial ao acaso, em radianos
    this.angle = Math.random() * Math.PI * 2;
    // tick passa a correr só de "interval" em "interval" milissegundos
    this.tick = AFRAME.utils.throttleTick(this.tick, this.data.interval, this);
    this.step();
  },

  tick: function () {
    this.step();
  },

  step: function () {
    var position = this.el.object3D.position;

    // muda a direção um pouco, ao acaso (entre -0,5 e +0,5 radianos)
    this.angle += Math.random() - 0.5;

    // se está longe do ponto de partida, vira-se para ele
    var dx = this.start.x - position.x;
    var dz = this.start.z - position.z;
    if (Math.sqrt(dx * dx + dz * dz) > this.data.limit) {
      this.angle = Math.atan2(dx, dz);
    }

    // distância a andar até à próxima mudança de direção
    var distance = this.data.speed * this.data.interval / 1000;
    var target = {
      x: position.x + Math.sin(this.angle) * distance,
      y: position.y,
      z: position.z + Math.cos(this.angle) * distance
    };

    // o modelo está virado para +Z; rodar no eixo Y para ficar virado para onde vai
    this.el.setAttribute('rotation', { x: 0, y: THREE.MathUtils.radToDeg(this.angle), z: 0 });

    // andar até ao ponto seguinte; a animação dura o mesmo que o intervalo, por isso não para
    this.el.setAttribute('animation', {
      property: 'position',
      to: target,
      dur: this.data.interval,
      easing: 'linear'
    });
  }
});
