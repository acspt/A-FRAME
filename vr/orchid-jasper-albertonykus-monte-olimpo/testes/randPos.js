document.addEventListener("DOMContentLoaded", function () {
  
  const clickableBox = document.querySelector("#clickable-box");
  const appearSphere = document.querySelector("#appear-sphere");
  const positions = ["#pos1", "#pos2", "#pos3"];

  clickableBox.addEventListener("click", function () {
    // Select a random position
    const randomPosition =
      positions[Math.floor(Math.random() * positions.length)];
    const position = document
      .querySelector(randomPosition)
      .getAttribute("position");

    // Set the sphere's position and make it visible
    appearSphere.setAttribute("position", position);
    appearSphere.setAttribute("visible", true);
  });
});
