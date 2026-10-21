document.addEventListener("DOMContentLoaded", function () {
  // Bússola Variáveis e Posições
  const clickable = document.querySelector("#bussola");
  const appear = document.querySelector("#colheita");
  const positions = ["#pos1", "#pos2", "#pos3"];

  clickable.classList.add("disabled");

  // Função que aponta a seta à posição de Deméter
  function pointArrowAt(targetPosition) {
    // Posição da Bússola no espaço 3D
    const arrowPosition = new THREE.Vector3();
    clickable.object3D.getWorldPosition(arrowPosition);

    // Criar um vector a Deméter
    const targetVector = new THREE.Vector3(
      targetPosition.x,
      targetPosition.y,
      targetPosition.z
    );

    // Calcular a direção do vector da bússola a Deméter
    const direction = new THREE.Vector3()
      .subVectors(targetVector, arrowPosition)
      .normalize();

    // Meter a rotação da seta a apontar na direção de Deméter
    const arrowRotation = clickable.object3D.rotation;
    arrowRotation.y = Math.atan2(direction.x, direction.z);
    clickable.object3D.rotation.set(
      arrowRotation.x,
      arrowRotation.y,
      arrowRotation.z
    );
  }

  // Event Listener que espera pela interação do utilizador
  clickable.addEventListener("click", function handleClick() {
    if (!clickable.classList.contains("disabled")) {
      // Selecionar uma das posições predefinidas aleatoriamente
      const randomPosition =
        positions[Math.floor(Math.random() * positions.length)];
      const position = document
        .querySelector(randomPosition)
        .getAttribute("position");

      // Definir a posição de Deméter com a posição resultante do calcúlo anterior e alterar a visibilidade
      appear.setAttribute("position", position);
      appear.setAttribute("visible", true);

      // Adicionar uma animação à seta
      clickable.setAttribute("animation", {
        property: "rotation",
        to: "0 720 0",
        loop: true,
        easings: "easeOutQuad",
        dur: 2000,
      });

      // Definir a posição da seta depois de concluir a animação
      setTimeout(() => {
        pointArrowAt(position);
        clickable.removeAttribute("animation"); // Stop spinning animation
        clickable.removeEventListener("click", handleClick);
      }, 2000);
    }
  });
});