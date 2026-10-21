AFRAME.registerComponent("walking", {
  schema: {
    speed: { type: "float", default: 1 },
  },
  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, 1000, this);
    this.radians = 0; 
  
  },
  tick: function (time, timeDelta) {
    const position = this.el.getAttribute("position");
    //console.log(position);
    const rotation = this.el.getAttribute("rotation");
    //  console.log(rotation);
    this.radians = this.radians + Math.random() * 2 - 1;
    let z = Math.sin(this.radians) * this.data.speed;
    let x = Math.cos(this.radians) * this.data.speed;
    const newPosition = {
      x: position.x + x,
      y: position.y,
      z: position.z + z,
    };
    this.el.setAttribute('animation', {
          property: 'position',
          to: newPosition,
          dur: 10000,
          easing: 'linear',
          loop: false
        });
    //this.el.setAttribute("position", newPosition);
    let degrees = this.radians / (Math.PI / 180);
    const newRotation = {
      x: 0,
      y: degrees,
      z: 0,
    };
    this.el.setAttribute("rotation", newRotation);
  },
});
