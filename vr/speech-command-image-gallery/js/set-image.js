/* global AFRAME */

/**
 * Componente que, ao receber um evento (por exemplo "click"), escurece a imagem 360,
 * troca a textura e volta a clareá-la.
 * Adaptado de aframe-speech-command-component (MIT, Leonardo Malave) para o A-Frame 1.x.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: { type: 'string' },
    target: { type: 'selector' },
    src: { type: 'string' },
    dur: { type: 'number', default: 300 }
  },

  init: function () {
    var data = this.data;

    this.setupFadeAnimation();

    this.el.addEventListener(data.on, function () {
      // escurece a imagem
      data.target.emit('set-image-fade');
      // quando já está escura, troca a imagem
      setTimeout(function () {
        data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  },

  // Cria as duas animações (escurecer e clarear) na imagem 360, só uma vez
  setupFadeAnimation: function () {
    var data = this.data;
    var alvo = data.target;

    if (alvo.dataset.setImageFadeSetup) { return; }
    alvo.dataset.setImageFadeSetup = true;

    // escurecer: de branco para preto
    alvo.setAttribute('animation__fade', {
      property: 'components.material.material.color',
      type: 'color',
      from: '#FFF',
      to: '#000',
      dur: data.dur,
      startEvents: 'set-image-fade'
    });

    // clarear: começa quando a animação de escurecer termina
    alvo.setAttribute('animation__fadeback', {
      property: 'components.material.material.color',
      type: 'color',
      from: '#000',
      to: '#FFF',
      dur: data.dur,
      startEvents: 'animationcomplete__fade'
    });
  }
});
