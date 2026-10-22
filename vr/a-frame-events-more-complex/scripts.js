// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <body>) ----
// Select the plane element
var plane = document.querySelector('#interactive-plane');

// Variable to keep track of the rotation state
var isRotating = false;

// Function to start or stop rotation
function toggleRotation() {
  isRotating = !isRotating;
}

// Event listener for touch events on the plane
plane.addEventListener('click', function () {
  toggleRotation();
});

// Update function to rotate the plane if isRotating is true
function update() {
  if (isRotating) {
    var currentRotation = plane.getAttribute('rotation');
    plane.setAttribute('rotation', {
      x: currentRotation.x,
      y: currentRotation.y + 1, // Increment the y rotation
      z: currentRotation.z
    });
  }
  requestAnimationFrame(update);
}

// Start the update loop
update();
    
