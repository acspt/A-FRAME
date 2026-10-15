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

// Criamos outro componente, chamado "aumentar-ao-aproximar".
// O texto fica maior quando o utilizador chega perto dele.
AFRAME.registerComponent('aumentar-ao-aproximar', {

  // tick corre muitas vezes por segundo (em cada imagem desenhada)
  tick: function () {

    // a câmara é a posição do utilizador
    var camara = $('a-camera')[0];

    // distância, em metros, entre o utilizador e o texto
    var distancia = camara.object3D.position.distanceTo(this.el.object3D.position);

    // se o utilizador estiver a menos de 5 metros, o texto aumenta
    if (distancia < 5) {
      $(this.el).attr('scale', '12 12 12');
    } else {
      // se estiver longe, o texto volta ao tamanho normal
      $(this.el).attr('scale', '6 6 6');
    }
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
