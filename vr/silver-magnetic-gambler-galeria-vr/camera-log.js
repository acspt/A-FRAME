// camera-log.js
AFRAME.registerComponent("camera-log", {
  tick: function () {
    const camera = this.el;
    var p = camera.getAttribute("position");
    var str = p.x.toFixed(0) + " " + p.y.toFixed(0) + " " + p.z.toFixed(0);
    console.log("Camera Position:", str);
  },
});
