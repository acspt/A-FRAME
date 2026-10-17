// Este código corre quando a página acaba de carregar.
// Segue o passo "Introducing JavaScript" do tutorial, adaptado à LocAR.
$(function () {

  // a câmara com GPS (a entidade que tem o componente locar-camera)
  var camara = $('[locar-camera]');

  // gpsupdate: a câmara avisa sempre que recebe uma nova posição GPS
  camara.on('gpsupdate', novaPosicao);
});

// guarda se a caixa a norte já foi criada (só queremos uma)
var caixaCriada = false;

// Função que corre sempre que chega uma nova posição GPS
function novaPosicao(evento) {

  // a posição vem dentro do evento, em position.coords
  var coords = evento.detail.position.coords;

  // ao arrancar, o locar-camera faz um aviso falso com latitude 0 e longitude 0: ignoramos
  if (coords.latitude === 0 && coords.longitude === 0) {
    return;
  }

  mostrarCoordenadas(coords);

  // na primeira posição verdadeira, criamos a caixa a norte
  if (caixaCriada === false) {
    criarCaixaNorte(coords);
    caixaCriada = true;
  }
}

// Função que escreve as coordenadas GPS no div #gps
function mostrarCoordenadas(coords) {

  // toFixed(6): 6 casas decimais (cerca de 10 cm de precisão)
  // <br> muda de linha no HTML
  var mensagem = 'Latitude: ' + coords.latitude.toFixed(6) + '<br>' +
                 'Longitude: ' + coords.longitude.toFixed(6);

  // a precisão só existe com o GPS real (com a posição simulada é 0)
  if (coords.accuracy) {
    mensagem = mensagem + '<br>' + 'Precisão: ' + Math.round(coords.accuracy) + ' m';
  }

  // mudamos o texto que aparece no ecrã
  $('#gps').html(mensagem);
}

// Função que cria uma caixa vermelha a norte da posição GPS
function criarCaixaNorte(coords) {

  // latitude + 0.001 fica cerca de 111 m para norte
  var latitude = coords.latitude + 0.001;
  var longitude = coords.longitude;

  // criamos a caixa com jQuery e juntamo-la à cena
  var caixa = $('<a-box></a-box>');
  caixa.attr('color', '#ff0000');
  caixa.attr('scale', '20 20 20');
  caixa.attr('locar-entity-place', 'latitude: ' + latitude + '; longitude: ' + longitude);
  $('a-scene').append(caixa);
}
