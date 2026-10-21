AFRAME.registerComponent("move-camera", {
  schema: {
    speed: { type: "number", default: -0.01 },
  },
  init: function () {
    this.direction = new THREE.Vector3();
  },
  tick: function () {
    // Get the camera's world direction
    this.el.object3D.getWorldDirection(this.direction);
    console.log(radians_to_degrees(this.el.object3D.rotation.x));
    // Update the camera's position
    let angle = radians_to_degrees(this.el.object3D.rotation.x);
    if(angle < -10)
      this.el.object3D.position.addScaledVector(this.direction, this.data.speed);
  },
});

function radians_to_degrees(radians)
{
  // Store the value of pi.
  var pi = Math.PI;
  // Multiply radians by 180 divided by pi to convert to degrees.
  return radians * (180/pi);
}

function degrees_to_radians(degrees)
{
  // Store the value of pi.
  var pi = Math.PI;
  return degrees/(180/pi);
}

