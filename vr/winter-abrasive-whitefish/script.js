AFRAME.registerComponent('randomizer', {
  init: function () {
    this.el.setAttribute('position', {
      x: Math.random() * 10 - 5,
      y: Math.random() * 3,
      z: Math.random() * 10 - 5
    });
    this.el.setAttribute('animation', {
      property: 'rotation',
      dur: 2000,
      easing: 'linear',
      loop: true,
      to: '360 360 360'
    });
  }
});
