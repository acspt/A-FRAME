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

// Função que corre quando se clica na entidade
function onClick() {

  // this é a entidade em que se clicou
  var entidade = $(this);

  // a entidade fica invisível
  entidade.attr('visible', 'false');

  // e deixa de poder ser clicada
  entidade.removeClass('clicavel');
}
