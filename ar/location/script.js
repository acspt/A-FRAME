// Criamos um componente novo chamado "desaparecer-ao-clicar".
// No HTML basta escrever desaparecer-ao-clicar dentro de uma entidade para o usar.
AFRAME.registerComponent('desaparecer-ao-clicar', {

  // init corre uma vez, quando a entidade aparece na cena
  init: function () {

    // guardamos a entidade (por exemplo, o a-text) numa variável
    var entidade = $(this.el);

    // quando alguém clicar (ou tocar) na entidade, corre a função onClick
    entidade.on('click', onClick);
  }
});

// Criamos outro componente, chamado "aumentar-ao-colidir".
// O texto fica maior quando o utilizador (a câmara) colide com ele.
// A colisão é detetada pela biblioteca de física (aframe-physics-system).
AFRAME.registerComponent('aumentar-ao-colidir', {

  init: function () {

    var entidade = $(this.el);

    // quando o corpo físico da entidade estiver pronto, corre a função semEmpurrar
    entidade.on('body-loaded', semEmpurrar);

    // quando a entidade colidir com outro corpo físico, corre a função onCollide
    entidade.on('collide', onCollide);
  }
});

// Função que corre quando se clica na entidade
function onClick() {

  // this é a entidade em que se clicou
  var entidade = $(this);

  // a entidade fica invisível
  entidade.attr('visible', 'false');

  // e deixa de poder ser clicada
  entidade.removeClass('clicavel');
}

// Função que corre quando o corpo físico da entidade fica pronto
function semEmpurrar() {

  // a colisão é detetada, mas o texto não é empurrado nem sai do sítio
  this.body.collisionResponse = false;
}

// Função que corre quando a entidade colide com outro corpo físico
function onCollide() {

  // this é a entidade que colidiu
  var entidade = $(this);

  // o texto fica com o dobro do tamanho
  entidade.attr('scale', '12 12 12');
}
