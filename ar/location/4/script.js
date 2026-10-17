// Criamos um componente novo chamado "afastar-ao-colidir".
// No HTML basta escrever afastar-ao-colidir dentro de uma entidade para o usar.
// Quando o utilizador (a câmara) colide com a esfera, a esfera afasta-se.
// A colisão é detetada pela biblioteca de física (aframe-physics-system).
AFRAME.registerComponent('afastar-ao-colidir', {

  // init corre uma vez, quando a entidade aparece na cena
  init: function () {

    // guardamos a entidade (por exemplo, a a-sphere) numa variável
    var entidade = $(this.el);

    // quando o corpo físico da entidade estiver pronto, corre a função semEmpurrar
    entidade.on('body-loaded', semEmpurrar);

    // quando a entidade colidir com outro corpo físico, corre a função onCollide
    entidade.on('collide', onCollide);
  }
});

// Criamos outro componente, chamado "mostrar-gps".
// Usa-se na a-camera: escreve as coordenadas GPS do utilizador no div #gps.
AFRAME.registerComponent('mostrar-gps', {

  init: function () {

    // o gps-new-camera avisa a câmara sempre que recebe uma nova posição GPS
    $(this.el).on('gps-camera-update-position', function (evento) {

      // a posição vem dentro do evento
      var posicao = evento.detail.position;

      // toFixed(6): 6 casas decimais (cerca de 10 cm de precisão)
      // <br> muda de linha no HTML
      var mensagem = 'Latitude: ' + posicao.latitude.toFixed(6) + '<br>' +
                     'Longitude: ' + posicao.longitude.toFixed(6);

      // mudamos o texto que aparece no ecrã
      $('#gps').html(mensagem);
    });
  }
});

// Função que corre quando o corpo físico da entidade fica pronto
function semEmpurrar() {

  // a colisão é detetada, mas a física não empurra a esfera sozinha
  // (somos nós que a movemos, na função onCollide)
  this.body.collisionResponse = false;
}

// Função que corre quando a entidade colide com outro corpo físico
function onCollide() {

  // this é a esfera que colidiu
  var esfera = this;

  // a câmara é a posição do utilizador
  var camara = $('a-camera')[0];

  // vetor que vai da câmara até à esfera: posição da esfera - posição da câmara
  var direcao = new THREE.Vector3();
  direcao.subVectors(esfera.object3D.position, camara.object3D.position);

  // a esfera só se afasta na horizontal: sem isto descia 1,6 m (a altura da câmara)
  direcao.y = 0;

  // normalize deixa o vetor com comprimento 1, ou seja, 1 metro
  //direcao.normalize();

  // a esfera tem corpo físico, por isso movemos o corpo (a física move depois a esfera)
  esfera.body.position.x = esfera.body.position.x + direcao.x;
  esfera.body.position.y = esfera.body.position.y + direcao.y;
  esfera.body.position.z = esfera.body.position.z + direcao.z;
}
