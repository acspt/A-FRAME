// Componente rotate-on-gaze: o objeto roda enquanto o cursor (o olhar) está em cima dele.
// Uso no HTML: <a-box rotate-on-gaze="speed: 2"></a-box>
AFRAME.registerComponent('rotate-on-gaze', {
  schema: {
    // velocidade de rotação, em radianos por segundo
    speed: { type: 'number', default: 1.5 }
  },

  init: function () {
    // começa parado
    this.isActive = false;

    // guardar as funções com o "this" do componente, para as poder remover depois
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);

    // o cursor envia "mouseenter" quando entra no objeto e "mouseleave" quando sai
    this.el.addEventListener('mouseenter', this.onEnter);
    this.el.addEventListener('mouseleave', this.onLeave);
  },

  remove: function () {
    // quando o componente é retirado, deixa de ouvir os eventos
    this.el.removeEventListener('mouseenter', this.onEnter);
    this.el.removeEventListener('mouseleave', this.onLeave);
  },

  onEnter: function () {
    this.isActive = true;
  },

  onLeave: function () {
    this.isActive = false;
  },

  // tick corre em cada frame; timeDelta é o tempo (em milissegundos) desde o frame anterior
  tick: function (time, timeDelta) {
    if (this.isActive) {
      // rodar à volta do eixo Y; dividir por 1000 passa de milissegundos para segundos
      this.el.object3D.rotation.y += this.data.speed * timeDelta / 1000;
    }
  }
});
