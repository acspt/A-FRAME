AFRAME.registerComponent('continuous-rotation', {
  tick: tick
});

var clickableObjects = document.querySelectorAll('.clickable');
clickableObjects.forEach(function (object) {
   object.addEventListener('click', function () {
    console.log('click on:', this.id);
    this.flagRotation = 1;
  });

  object.addEventListener('mouseenter', function () {
    console.log('enter on:', this.id);
    this.flagRotation = 1; 
  });
    object.addEventListener('mouseleave', function () {
    console.log('leave on:', this.id);
    this.flagRotation = 0; 
  });
});

var rotationSpeed = 0.1; // Adjust this value to change the rotation speed

// Continuously rotate the object while fusing
function tick(time, timeDelta) {

  var clickableObjects = document.querySelectorAll('.clickable');
  clickableObjects.forEach(function (obj) {
    if(obj.flagRotation == 1)
      obj.object3D.rotation.y += rotationSpeed;

  });
}

