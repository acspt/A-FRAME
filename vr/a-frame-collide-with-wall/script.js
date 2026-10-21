AFRAME.registerComponent("movement", {
  schema: {
    speed: { type: "number", default: -0.05 },
  },
  init: function () {
    this.el.addEventListener("collide", this.onCollide.bind(this));
  },
  tick: function (time, timeDelta) {
    const position = this.el.object3D.position;
    position.z += this.data.speed;

    this.el.object3D.position.copy(position);
  },
  onCollide: function (e) {
    if (e.detail.body.el.id === "stationary") {
      this.reverseDirection();
    }
  },
  reverseDirection: function () {
    // this.direction.negate();
    this.data.speed = -this.data.speed;
    setTimeout(() => {
      this.data.speed = -this.data.speed;
    }, 2150);
  },
});

AFRAME.registerComponent("collider-check", {
  dependencies: ["movement"],
  tick: function () {
    const movingEl = this.el;
    const stationaryEl = document.querySelector("#stationary");
    const movingBox = new THREE.Box3().setFromObject(movingEl.object3D);
    const stationaryBox = new THREE.Box3().setFromObject(stationaryEl.object3D);

    if (movingBox.intersectsBox(stationaryBox)) {
      movingEl.emit("collide", { body: { el: stationaryEl } });
    }
  },
});
