// Criamos um componente novo chamado "afastar-ao-colidir".
// No HTML basta escrever afastar-ao-colidir dentro de uma entidade para o usar.
// Quando o utilizador (a câmara) colide com a esfera, a esfera afasta-se 1 metro.
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

  // normalize deixa o vetor com comprimento 1, ou seja, 1 metro
  //direcao.normalize();

  // a esfera tem corpo físico, por isso movemos o corpo (a física move depois a esfera)
  esfera.body.position.x = esfera.body.position.x + direcao.x;
  esfera.body.position.y = esfera.body.position.y + direcao.y;
  esfera.body.position.z = esfera.body.position.z + direcao.z;
}
