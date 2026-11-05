// Componente "tocar-ao-clicar": ao clicar na entidade, toca o audio do audioanalyser.
AFRAME.registerComponent('tocar-ao-clicar', {
  init: function () {
    var el = this.el;

    el.addEventListener('click', function () {
      var analisador = el.components.audioanalyser;
      var audio = document.querySelector('#musica');

      // O browser so deixa tocar som depois de um clique
      analisador.resumeContext();

      // Se esta parado toca, se esta a tocar pausa
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }
});
