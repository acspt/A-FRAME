// Criamos um componente novo chamado "desaparecer-ao-clicar".
// No HTML basta escrever desaparecer-ao-clicar dentro de uma entidade para o usar.
AFRAME.registerComponent('desaparecer-ao-clicar', {

  // init corre uma vez, quando a entidade aparece na cena
  init: function () {

    // guardamos a entidade (por exemplo, o a-text) numa variável
    var entidade = $(this.el);

    // quando alguém clicar (ou tocar) na entidade...
    entidade.on('click', function () {

      // ...a entidade fica invisível
      entidade.attr('visible', 'false');

      // ...e deixa de poder ser clicada
      entidade.removeClass('clicavel');
    });
  }
});
