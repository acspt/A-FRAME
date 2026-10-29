// Componente "tocar-video": toca no ecrã para reproduzir o vídeo; toca outra vez para o pausar.
AFRAME.registerComponent('tocar-video', {

  // init corre uma vez, quando o ecrã aparece na cena
  init: function () {
    var ecra = this.el;

    ecra.addEventListener('click', function () {
      // o elemento <video> que está na textura (material src) deste ecrã
      var video = ecra.getAttribute('material').src;

      // se está parado, reproduz; se está a tocar, pausa
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
});
