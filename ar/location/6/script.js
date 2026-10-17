// Criamos um componente novo chamado "clicker".
// No HTML basta escrever clicker dentro de uma entidade para o usar.
// Quando o utilizador clica (ou toca) na entidade, aparece uma mensagem.
AFRAME.registerComponent('clicker', {

  // init corre uma vez, quando a entidade aparece na cena
  init: function () {

    // quando a entidade receber um clique, mostra a mensagem
    this.el.addEventListener('click', function () {
      alert('Box clicked!');
    });
  }
});
