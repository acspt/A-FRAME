AFRAME.registerComponent("physical-entity", {
  init: function () {
    this.el.addEventListener("hitstart", (event) => {
      console.log("Collision");
      console.log(
        event.target.id,
        " collided with",
        event.target.components["aabb-collider"]["intersectedEls"].map(
          (x) => x.id
        )
      );
   });
    this.el.addEventListener("hitend", (event) => {
      console.log("Collision");
      console.log(
        event
      );
    });
  },
});
