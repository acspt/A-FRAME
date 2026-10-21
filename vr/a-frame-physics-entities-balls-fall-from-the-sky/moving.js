AFRAME.registerComponent("moving", {
  schema: {
    axis: { type: "string", default: "x" }, // The axis to move along
    speed: { type: "number", default: 1 }, // The speed of movement
    delay: { type: "number", default: 1000 }, // Delay in milliseconds before movement starts
  },

  init: function () {
    // Initialize the position and timer
    this.position = this.el.object3D.position;
    this.direction = 1; // Direction of movement
    this.elapsedTime = 0; // Time accumulator
    this.movementStarted = false; // Flag to check if movement has started
  this.data.delay +=10000
  },

  tick: function (time, timeDelta) {
    // Accumulate time
    this.elapsedTime += timeDelta;

    // Check if the delay has passed
    if (!this.movementStarted && this.elapsedTime >= this.data.delay) {
      // Start movement
      this.movementStarted = true;
    }

    // Move the object if the movement has started
    if (this.movementStarted) {
      if (this.data.axis === "x") {
        this.position.x +=
          this.data.speed * this.direction * (timeDelta / 1000);
      } else if (this.data.axis === "y") {
        this.position.y +=
          this.data.speed * this.direction * (timeDelta / 1000);
      } else if (this.data.axis === "z") {
        this.position.z +=
          this.data.speed * this.direction * (timeDelta / 1000);
      }
    }
  },
});
