// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <head>) ----
function changeLightColor() {
  var light = document.querySelector("#dynamicLight");
  var colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];
  setInterval(() => {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    light.setAttribute("color", randomColor);
  }, 2000);
}
document.addEventListener("DOMContentLoaded", () => {
  let count = 0;
  const counterText = document.querySelector("#counterText");
  const clickableBoxes = document.querySelectorAll(".clickable");

  clickableBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      count++;
      counterText.setAttribute("value", "Pontos: " + count);
      box.setAttribute("visible", "false"); // Faz a caixa desaparecer
    });
  });
});
// Espera a cena carregar para começar a mudar as cores
document.addEventListener("DOMContentLoaded", () => {
  changeLightColor();
});
    
