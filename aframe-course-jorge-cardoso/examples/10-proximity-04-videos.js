// Componente "proximity-autoplay": o vídeo toca quando o utilizador (a câmara) está perto
// e para quando se afasta.
// Uso:  <a-video src="#video1" proximity-autoplay="distance: 2"></a-video>
AFRAME.registerComponent('proximity-autoplay', {

  schema: {
    // distância, em metros, a partir da qual o vídeo começa a tocar
    distance: { type: 'number', default: 2 }
  },

  init: function () {
    // o elemento <video> que está nos assets (o src do a-video é "#videoN")
    this.video = document.querySelector(this.el.getAttribute('src'));

    // vetores reutilizados em cada frame
    this.posicaoVideo = new THREE.Vector3();
    this.posicaoCamara = new THREE.Vector3();
  },

  // tick corre em cada frame
  tick: function () {
    var camara = this.el.sceneEl.camera;
    if (!camara || !this.video) {
      return;
    }

    // posições no mundo do ecrã de vídeo e da câmara
    this.el.object3D.getWorldPosition(this.posicaoVideo);
    camara.getWorldPosition(this.posicaoCamara);
    var distancia = this.posicaoVideo.distanceTo(this.posicaoCamara);

    if (distancia < this.data.distance) {
      // perto: toca e liga o som
      if (this.video.paused) {
        // play() devolve uma promessa; o catch evita erros na consola se o browser não deixar tocar
        this.video.play().catch(function () {});
      }
      this.video.muted = false;
    } else {
      // longe: pára e tira o som
      if (!this.video.paused) {
        this.video.pause();
      }
      this.video.muted = true;
    }
  }
});

// Distância, em metros, a que o teletransporte coloca o utilizador à frente do vídeo
var DISTANCIA_AO_VIDEO = 1.5;

// Teletransporta a câmara para a frente do vídeo n.º "numero" (0 = posição inicial)
function teleportar(numero, link) {
  var camara = document.querySelector('#camera');

  if (numero === 0) {
    camara.setAttribute('position', { x: 0, y: 1.6, z: 0 });
  } else {
    // posição do ecrã de vídeo correspondente
    var ecra = document.querySelector('#ecra' + numero);
    var p = ecra.object3D.position;

    // fica DISTANCIA_AO_VIDEO metros à frente do vídeo (os vídeos estão virados para +z)
    camara.setAttribute('position', { x: p.x, y: 1.6, z: p.z + DISTANCIA_AO_VIDEO });
  }

  // olhar em frente: com o look-controls não basta mudar a rotation da câmara,
  // é preciso repor a rotação guardada pelo próprio look-controls
  var look = camara.components['look-controls'];
  if (look) {
    look.yawObject.rotation.y = 0;
    look.pitchObject.rotation.x = 0;
  }

  marcarLinkAtivo(link);
}

// Marca o link clicado com a classe "active" (fica laranja)
function marcarLinkAtivo(link) {
  var links = document.querySelectorAll('#teleportLinks a');
  links.forEach(function (l) {
    l.classList.remove('active');
  });
  link.classList.add('active');
}
