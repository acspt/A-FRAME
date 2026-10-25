AFRAME.registerComponent('rotate-on-gaze', {
  schema: {
    speed: { type: 'number', default: 1.5 }
  },

  init: function () {
    this.isActive = false;
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.el.addEventListener('mouseenter', this.onEnter);
    this.el.addEventListener('mouseleave', this.onLeave);
  },

  remove: function () {
    this.el.removeEventListener('mouseenter', this.onEnter);
    this.el.removeEventListener('mouseleave', this.onLeave);
  },

  onEnter: function () {
    this.isActive = true;
  },

  onLeave: function () {
    this.isActive = false;
  },

  tick: function (time, timeDelta) {
    if (this.isActive) {
      this.el.object3D.rotation.y += this.data.speed * timeDelta / 1000;
    }
  }
});
