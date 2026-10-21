document.addEventListener("DOMContentLoaded", function () {
  // Deméter Colheita Variáveis e Constantes
  const caixas = document.querySelectorAll(".colheita");
  const demeter = document.querySelector("#demeter");
  const player = document.querySelector("#rig");
  const ending = document.querySelector("#ending");
  let caixasClicked = 0;

  // Inicialização Deméter
  demeter.classList.add("disabled");

  // For Loop que adiciona um Event Listener a todas as caixas
  caixas.forEach((caixa) => {
    caixa.addEventListener("click", function () {
      if (!caixa.classList.contains("clicked")) {
        caixa.setAttribute("color", "green");
        caixa.classList.add("clicked");
        caixasClicked++;

        if (caixasClicked === 9) {
          demeter.classList.remove("disabled");
          demeter.setAttribute("material", "opacity", "1");
          document.querySelector("#demeter-text").setAttribute("visible", "false");
          document.querySelector("#demeter-light").setAttribute("visible", "true");
          document.querySelector("#colheita-light").setAttribute("visible", "false");
        }
      }
    });
  });

  demeter.addEventListener("click", function () {
    if (!demeter.classList.contains("disabled")) {
      demeter.setAttribute("color", "#00FF00");

      player.setAttribute("movement-controls", { enabled: false });

      const playerPos = player.getAttribute("position");

      ending.setAttribute("position", playerPos);
      ending.setAttribute("visible", "true");

      document.querySelector("#colheita").setAttribute("visible", "false");
    }
  });
});