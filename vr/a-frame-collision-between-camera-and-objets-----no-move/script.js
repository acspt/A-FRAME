AFRAME.registerComponent("camera-collide", {
  init: function () {
    
    this.direction = new THREE.Vector3();
    
    this.el.addEventListener("hitstart", (event) => {
      console.log("Collision");
      console.log(
        event.target.id,
        " collided with",
        event.target.components["aabb-collider"]["intersectedEls"].map(
          (x) => x.id
        )
      );
      this.el.object3D.getWorldDirection(this.direction);
      this.el.object3D.position.addScaledVector(this.direction, 1);
     
    });
   
  },
});
