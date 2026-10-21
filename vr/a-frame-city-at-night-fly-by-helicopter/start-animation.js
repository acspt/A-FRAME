AFRAME.registerComponent("start-animation", {
  schema: {
    targetSelector: { type: "string", default: "#cameraRig;" },
    componentName: { type: "string", default: "animation-alongpath" },
    propertyName: { type: "string", default: "delay" },
    newValue: { type: "number", default: 1000 },
  },

  init: function () {
    const startscreen = document.getElementById("start-screen");
    const playButton = document.getElementById("play-btn");
    var scene = document.getElementById("myScene");

    var data = this.data;

    playButton.addEventListener("click", function () {
      // Find the target object using the selector
      var targetEl = document.querySelector(data.targetSelector);
      var model3D = document.querySelector("#model3D");
      startscreen.style.display = "none";
      scene.style.display = "block";

      // Add the sound component to the entity
      model3D.setAttribute("play-all-model-animations", "");
      if (targetEl) {
        // Access the component
        var component = targetEl.components[data.componentName];

        if (component) {
          // Change the property
          component.data[data.propertyName] = data.newValue;

          // If the component needs to be updated, do so
          if (component.update) {
            component.update();
          }
        } else {
          console.warn("Component not found:", data.componentName);
        }
      } else {
        console.warn("Target element not found:", data.targetSelector);
      }
    });
  },
});
