// Select the pivot entity
var pivot = document.querySelector("#pivot");
var isOpen = false; // Track whether the door is open

// Function to rotate the pivot, which in turn rotates the door
function rotateDoor() {
  // Determine the new rotation based on the current state
  var newRotationY = isOpen ? 0 : 90; // Rotate to 90 degrees if opening, back to 0 if closing
  // Update the rotation of the pivot
  pivot.setAttribute("rotation", { x: 0, y: newRotationY, z: 0 });
  // Toggle the isOpen state
  isOpen = !isOpen;
}

// Add an event listener for clicks (or taps) on the door
pivot.addEventListener("click", function () {
  rotateDoor();
});
