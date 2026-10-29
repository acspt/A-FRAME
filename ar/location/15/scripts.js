// Componente "mexer-ao-acaso": a cada segundo, a caixa salta para um ponto ao acaso
// perto de onde começou (até cerca de 20 m).
AFRAME.registerComponent('mexer-ao-acaso', {

  // init corre uma vez, quando a caixa aparece na cena
  init: function () {
    // guarda a latitude e a longitude iniciais (escritas no HTML)
    var inicio = this.el.getAttribute('gps-new-entity-place');
    this.latitudeInicial = inicio.latitude;
    this.longitudeInicial = inicio.longitude;

    // tempo, em milissegundos, desde o último salto
    this.tempo = 0;
  },

  // tick corre muitas vezes por segundo; delta = milissegundos desde o tick anterior
  tick: function (time, delta) {
    this.tempo = this.tempo + delta;

    // só salta quando já passou 1 segundo
    if (this.tempo < 1000) {
      return;
    }
    this.tempo = 0;

    // 0.0002 graus são cerca de 20 m; Math.random() - 0.5 dá um número entre -0.5 e 0.5
    var latitude = this.latitudeInicial + (Math.random() - 0.5) * 0.0004;
    var longitude = this.longitudeInicial + (Math.random() - 0.5) * 0.0004;

    // muda o sítio da caixa; o AR.js volta a calcular a posição dela
    this.el.setAttribute('gps-new-entity-place', { latitude: latitude, longitude: longitude });
  }
});
