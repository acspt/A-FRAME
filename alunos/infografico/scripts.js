// Componente "detetar-marcador"
// Coloca-se no <a-marker>. Quando a câmara vê o marcador, a variável visible
// passa a true: a caixa aparece e são criadas várias esferas na a-scene, em posições aleatórias.
// Quando o perde, visible passa a false, mas a caixa e as esferas continuam visíveis.

// Mostra na consola qual a versão do ficheiro que o browser carregou
console.log('scripts.js versão 6: câmara roda com o giroscópio');

// Variável global: diz se o marcador está a ser visto neste momento
var visible = false;

// Variável global: diz se as esferas já foram criadas (para não as criar de novo
// cada vez que o marcador volta a ser detetado)
var esferasCriadas = false;

// Quantas esferas criar de cada vez
var NUMERO_ESFERAS = 10;

// Devolve um número aleatório entre min e max
function aleatorio(min, max) {
  return min + Math.random() * (max - min);
}

AFRAME.registerComponent('detetar-marcador', {
  init: function () {
    var marcador = this.el;                          // o <a-marker>
    var cena = this.el.sceneEl;                      // a <a-scene>, onde vamos pôr as esferas
    var caixa = document.querySelector('#caixa');    // a caixa a mostrar

    // O AR.js dispara "markerFound" quando deteta o marcador
    marcador.addEventListener('markerFound', function () {
    
      visible = true;
      console.log('Marcador detetado, visible =', visible);
      criarEsferas(cena);   // cria várias esferas na cena

    });

    // O AR.js dispara "markerLost" quando deixa de ver o marcador.
    // Só atualizamos a variável: a caixa e as esferas ficam onde estão.
    marcador.addEventListener('markerLost', function () {
     // visible = false;
    //console.log('Marcador perdido, visible =', visible);
    });
  }
});

// Componente "corrigir-cliques"
// Coloca-se na câmara. O AR.js muda a projeção da câmara (para coincidir com a
// câmara do telemóvel), mas não atualiza a versão "invertida" dessa projeção,
// que é a que o A-Frame usa para saber em que objeto clicámos.
// Sem esta correção, os cliques não acertam nas esferas.
AFRAME.registerComponent('corrigir-cliques', {
  tick: function () {
    var camara = this.el.getObject3D('camera');
    if (camara) {
      camara.projectionMatrixInverse.copy(camara.projectionMatrix).invert();
    }
  }
});

// Cria várias esferas na cena (a-scene), cada uma numa posição e cor aleatórias
function criarEsferas(cena) {
  for (var i = 0; i < NUMERO_ESFERAS; i++) {
    var esfera = document.createElement('a-sphere');

    // Na cena, a câmara está no ponto 0 0 0 a olhar para -z (para a frente).
    // x: esquerda/direita; y: baixo/cima; z negativo: à frente da câmara
    var x = aleatorio(-2, 2);
    var y = aleatorio(-1, 1.5);
    var z = aleatorio(-6, -2);
    esfera.setAttribute('position', x + ' ' + y + ' ' + z);

    esfera.setAttribute('radius', aleatorio(0.1, 0.3));

    // cor aleatória, no formato hsl(tom, saturação, luminosidade)
    esfera.setAttribute('color', 'hsl(' + Math.floor(aleatorio(0, 360)) + ', 80%, 60%)');

    // classe que o raycaster usa para saber o que se pode clicar
    esfera.classList.add('esfera');

    // ao clicar (ou tocar) na esfera, ela é eliminada
    esfera.addEventListener('click', function () {
      this.parentNode.removeChild(this);   // "this" é a esfera clicada
      console.log('Esfera eliminada');
    });

    // adiciona a esfera dentro da <a-scene>, no topo (como primeiro filho, antes da câmara).
    // Não fica dentro da câmara, por isso não roda com ela: fica parada no espaço.
    cena.prepend(esfera);
  }
}
