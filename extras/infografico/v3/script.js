// v3: as esferas são criadas logo no início, mas só estão visíveis
// enquanto o marcador Hiro está a ser detetado.

// Mostra na consola qual a versão do ficheiro que o browser carregou
console.log('v3/script.js versão 1: esferas criadas no início, visíveis só com o marcador');

// Variável global: diz se o marcador está a ser visto neste momento
var visible = false;

// Quantas esferas criar
var NUMERO_ESFERAS = 10;

// Devolve um número aleatório entre min e max
function aleatorio(min, max) {
  return min + Math.random() * (max - min);
}

// Componente "detetar-marcador"
// Coloca-se no <a-marker>.
// - No início (init): cria as esferas dentro do grupo #esferas, que está escondido.
// - Quando a câmara vê o marcador: visible = true, mostra o grupo e deixa clicar.
// - Quando o perde: visible = false, esconde o grupo e deixa de deixar clicar.
AFRAME.registerComponent('detetar-marcador', {
  init: function () {
    var marcador = this.el;                            // o <a-marker>
    var cena = this.el.sceneEl;                        // a <a-scene>
    var grupo = document.querySelector('#esferas');    // o grupo das esferas

    // cria as esferas logo no início (o grupo está escondido, por isso ainda não se veem)
    criarEsferas(grupo);

    // O AR.js dispara "markerFound" quando deteta o marcador
    marcador.addEventListener('markerFound', function () {
      visible = true;
      console.log('Marcador detetado, visible =', visible);

      grupo.setAttribute('visible', visible);              // mostra as esferas
      cena.setAttribute('raycaster', 'enabled', visible);  // passa a ser possível clicar
    });

    // O AR.js dispara "markerLost" quando deixa de ver o marcador
    marcador.addEventListener('markerLost', function () {
      visible = false;
      console.log('Marcador perdido, visible =', visible);

      //grupo.setAttribute('visible', visible);              // esconde as esferas
      //cena.setAttribute('raycaster', 'enabled', visible);  // deixa de ser possível clicar
      // (sem isto, era possível clicar em esferas invisíveis)
    });
  }
});

// Componente "corrigir-cliques"
// Coloca-se na câmara. O AR.js muda a projeção da câmara (para coincidir com a
// câmara do telemóvel), mas não atualiza a versão "invertida" dessa projeção,
// que é a que o A-Frame usa para saber em que objeto está o rato ou o dedo.
// Tem de ser feito em todos os frames (tick), porque o AR.js volta a mudar a
// projeção muitas vezes por segundo.
// Sem esta correção, o raio do clique passa ao lado das esferas.
AFRAME.registerComponent('corrigir-cliques', {
  tick: function () {
    var camara = this.el.getObject3D('camera');
    if (camara) {
      camara.projectionMatrixInverse.copy(camara.projectionMatrix).invert();
    }
  }
});

// Cria várias esferas dentro do grupo, cada uma numa posição e cor aleatórias
function criarEsferas(grupo) {
  for (var i = 0; i < NUMERO_ESFERAS; i++) {
    var esfera = document.createElement('a-sphere');

    // A câmara está no ponto 0 0 0 a olhar para -z (para a frente).
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

    // adiciona a esfera dentro do grupo
    grupo.appendChild(esfera);
  }
}
