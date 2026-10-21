AFRAME.registerComponent('random-movement', {
  schema: {
    speed: {type: 'number', default: 0.001}
  },
  init: function () {
    this.direction = new THREE.Vector3(
      Math.random() * .2 - .1,
      Math.random() * .2 - .1,
      Math.random() * .2 - .1
    ).normalize();
  },
  tick: function (time, timeDelta) {
    const position = this.el.object3D.position;
    this.direction = new THREE.Vector3(
      this.direction.x + Math.random() * 0.2 - .1,
      this.direction.y + Math.random() * 0.2 - .1,
      this.direction.z + Math.random() * 0.2 - .1
    ).normalize();
    position.add(this.direction.clone().multiplyScalar(this.data.speed * timeDelta));
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const numSpheres = 1000;
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
  // Function to create a random position within a certain range
  function getRandomPosition() {
    return {
      x: Math.random() * 1 - .5,
      y: Math.random() * 1 - .5,
      z: Math.random() * 1 - .5
    };
  }

  // Create spheres
  for (let i = 0; i < numSpheres; i++) {
    const position = getRandomPosition();
    const sphere = document.createElement('a-sphere');
     const color = getRandomColor();
    sphere.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
    sphere.setAttribute('radius', '0.5');
    sphere.setAttribute('color', color);
    sphere.setAttribute('random-movement', '');
    container.appendChild(sphere);
  }
});