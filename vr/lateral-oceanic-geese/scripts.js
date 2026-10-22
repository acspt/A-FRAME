// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <head>) ----
// WebXR requires https: to work so ensure redirected if needed.
if (location.hostname !== 'localhost' && window.location.protocol === 'http:') window.location.protocol = 'https:';
  

// ---- bloco 2 (antes no <body>) ----
let movementType = 'teleport';
function toggleThumbstick(detail) {
  const rayPointers = ['[data-right="ray"]', '[data-left="ray"]'].map(s => document.querySelector(s));
  const type = detail.value;
  movementType = type;
  if (type === 'move') {
    cameraRig.setAttribute('movement-controls', 'enabled', true);
    for (const p of rayPointers) p.removeAttribute('mixin');
  }
  if (type === 'teleport') {
    cameraRig.setAttribute('movement-controls', 'enabled', false);
    for (const p of rayPointers) p.setAttribute('mixin', 'blink');
  }
}
// If the user is teleporting disable movement-controls in XR
const sceneEl = document.querySelector("a-scene");
sceneEl.addEventListener("enter-vr", function() {
  if (movementType === 'teleport') {
    cameraRig.setAttribute('movement-controls', 'enabled', false);
  }
});
sceneEl.addEventListener("exit-vr", function() {
  cameraRig.setAttribute('movement-controls', 'enabled', true);
});
      
