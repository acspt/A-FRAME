// Componente "detetar-marcador"
// Coloca-se no <a-marker>. Quando a câmara vê o marcador, a variável visible
// passa a true: a caixa aparece e são criadas várias esferas em posições aleatórias.
// Quando o perde, visible passa a false: a caixa esconde-se e as esferas são apagadas.

// Variável global: diz se o marcador está a ser visto neste momento
var visible = false;

// Quantas esferas criar de cada vez
var NUMERO_ESFERAS = 10;

// Devolve um número aleatório entre min e max
function aleatorio(min, max) {
  return min + Math.random() * (max - min);
}

AFRAME.registerComponent('detetar-marcador', {
  init: function () {
    var marcador = this.el;                          // o <a-marker>
    var caixa = document.querySelector('#caixa');    // a caixa a mostrar

    // O AR.js dispara "markerFound" quando deteta o marcador
    marcador.addEventListener('markerFound', function () {
      visible = true;
      caixa.setAttribute('visible', visible);
      console.log('Marcador detetado, visible =', visible);

      if (visible == true) {
        criarEsferas(marcador);
      }
    });

    // O AR.js dispara "markerLost" quando deixa de ver o marcador
    marcador.addEventListener('markerLost', function () {
      visible = false;
      caixa.setAttribute('visible', visible);
      console.log('Marcador perdido, visible =', visible);

      apagarEsferas();
    });
  }
});

// Cria várias esferas dentro do marcador, cada uma numa posição e cor aleatórias
function criarEsferas(marcador) {
  for (var i = 0; i < NUMERO_ESFERAS; i++) {
    var esfera = document.createElement('a-sphere');

    // x e z: à volta do marcador; y: acima dele (para não ficarem enterradas)
    var x = aleatorio(-2, 2);
    var y = aleatorio(0.5, 3);
    var z = aleatorio(-2, 2);
    esfera.setAttribute('position', x + ' ' + y + ' ' + z);

    esfera.setAttribute('radius', aleatorio(0.1, 0.3));

    // cor aleatória, no formato hsl(tom, saturação, luminosidade)
    esfera.setAttribute('color', 'hsl(' + Math.floor(aleatorio(0, 360)) + ', 80%, 60%)');

    // classe para as podermos encontrar e apagar depois
    // (é também a classe que o raycaster usa para saber o que se pode clicar)
    esfera.classList.add('esfera');

    // ao clicar (ou tocar) na esfera, ela é eliminada
    esfera.addEventListener('click', function () {
      this.parentNode.removeChild(this);   // "this" é a esfera clicada
      console.log('Esfera eliminada');
    });

    marcador.appendChild(esfera);
  }
}

// Apaga todas as esferas criadas
function apagarEsferas() {
  var esferas = document.querySelectorAll('.esfera');
  esferas.forEach(function (esfera) {
    esfera.parentNode.removeChild(esfera);
  });
}
