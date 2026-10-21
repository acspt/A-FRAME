AFRAME.registerComponent("intro", {
  init: function () {
    let currentIndex = 0;
    const objects = [
      document.querySelector("#object1"),
      document.querySelector("#object2"),
      document.querySelector("#object3"),
    ];

    this.el.addEventListener("click", function () {
      objects[currentIndex].setAttribute("visible", "false");

      currentIndex++;

      if (currentIndex >= objects.length) {
        document.querySelector("#text-bubble").setAttribute("visible", "false");
        document
          .querySelector("#rig")
          .setAttribute("movement-controls", { enabled: true });
        currentIndex = 0;
      } else {
        objects[currentIndex].setAttribute("visible", "true");
      }
    });
  },
});
document.querySelector("#initialObject").setAttribute("intro", "");