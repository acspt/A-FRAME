AFRAME.registerComponent("camera-collide", {
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

      let arr = event.target.components["aabb-collider"]["intersectedEls"].map(
        (x) => x
      );
      
     

      arr.forEach((el) => {
        el.setAttribute("color", "#CCCCCC");
        console.log(el);
      });
    });
    this.el.addEventListener("hitend", (event) => {
      console.log("Collision");
      console.log(
        event
      );
    });
  },
});
