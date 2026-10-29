// Componente "mostrar-distancia": vai num a-text e mostra a distância, em metros,
// entre o utilizador e a entidade indicada em "alvo".
AFRAME.registerComponent('mostrar-distancia', {
  schema: {
    // a entidade com gps-entity-place (por exemplo #terra-gps)
    alvo: { type: 'selector' }
  },

  // tick corre muitas vezes por segundo
  tick: function () {
    // o AR.js guarda a distância no atributo "distance" da entidade
    var distancia = this.data.alvo.getAttribute('distance');

    // enquanto o AR.js ainda não calculou a distância, não faz nada
    if (!distancia) {
      return;
    }

    // arredonda para metros e escreve no texto
    this.el.setAttribute('value', 'Distancia: ' + Math.round(distancia) + ' m');
  }
});
