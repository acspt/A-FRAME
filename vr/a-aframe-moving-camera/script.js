// Roda a câmara suavemente, durante "duracao" milissegundos, até à direção pedida.
// x_destino: rotação para cima/baixo (pitch), em radianos
// y_destino: rotação para os lados (yaw), em radianos
// Com o look-controls, a rotação da câmara está guardada no pitchObject e no yawObject.

var duracao = 1000;
var inicio, x_inicio, y_inicio, x_rotacao, y_rotacao;

function moveCamera(x_destino, y_destino) {
  var look = document.querySelector('a-camera').components['look-controls'];

  inicio = null;
  x_inicio = look.pitchObject.rotation.x;
  y_inicio = look.yawObject.rotation.y;

  // quanto falta rodar em cada eixo
  x_rotacao = x_destino - x_inicio;
  y_rotacao = y_destino - y_inicio;

  requestAnimationFrame(passo);
}

// Corre em cada frame até passar o tempo da animação
function passo(tempo) {
  var look = document.querySelector('a-camera').components['look-controls'];

  if (inicio === null) {
    inicio = tempo;
  }

  // progresso vai de 0 (início) a 1 (fim)
  var progresso = Math.min((tempo - inicio) / duracao, 1);

  look.pitchObject.rotation.x = x_inicio + x_rotacao * progresso;
  look.yawObject.rotation.y = y_inicio + y_rotacao * progresso;

  if (progresso < 1) {
    requestAnimationFrame(passo);
  }
}
