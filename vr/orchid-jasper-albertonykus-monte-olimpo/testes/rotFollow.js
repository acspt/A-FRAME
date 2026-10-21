AFRAME.registerComponent("toggle-spin", {
  init: function () {
    // This will be called when the component is initialized
    this.isOpen = false; // Track whether the door is open or closed
    this.el.addEventListener("click", () => {
      // Calculate new rotation
      let newRotation = this.isOpen
        ? { x: 0, y: 0, z: 0 }
        : { x: 0, y: 60, z: 0 };
      // Apply new rotation to the door entity
      //this.el.setAttribute("rotation", newRotation);
      // Toggle the state
      let anOpen="property: rotation; to: 0 60 0; loop: flase; dur: 500; easing: linear;"
      let anClose="property: rotation; to: 0 0 0; loop: flase; dur: 1000; easing: linear;"
      let an = this.isOpen
        ? anClose
        : anOpen;
      
      this.el.setAttribute("animation", an);
      this.isOpen = !this.isOpen;
    });
  },
});