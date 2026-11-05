// Componente "log-ao-clicar": ao clicar escreve a mensagem no painel a-log.
AFRAME.registerComponent('log-ao-clicar', {
  schema: {
    mensagem: { type: 'string' }
  },
  init: function () {
    var componente = this;

    this.el.addEventListener('click', function () {
      // AFRAME.log e criado pelo componente log
      AFRAME.log(componente.data.mensagem);
    });
  }
});
