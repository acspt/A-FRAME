  AFRAME.registerComponent("grow-on-click", {
        schema: {
          originalScale: { type: "string", default: "1 1 1" },
          scaleFactor: { type: "number", default: 1.5 },
          duration: { type: "number", default: 5000 },
        },

        init: function () {
          var el = this.el;
          var data = this.data;
          var isAnimating = false;

          el.addEventListener("click", function () {
            if (isAnimating) return;

            var currentScale = el.getAttribute("scale");
            var newScale = {
              x: currentScale.x * data.scaleFactor,
              y: currentScale.y * data.scaleFactor,
              z: currentScale.z * data.scaleFactor,
            };

            el.setAttribute("scale", newScale);
            isAnimating = true;

            setTimeout(function () {
              el.setAttribute("scale", data.originalScale);
              isAnimating = false;
            }, data.duration);
          });
        },
      });
      AFRAME.registerComponent("show-text-on-click", {
        schema: {
          text: { type: "string", default: "Texto ao clicar" },
        },
        init: function () {
          var el = this.el;
          var data = this.data;
          var textEl = document.createElement("a-text");
          textEl.setAttribute("value", data.text);
          textEl.setAttribute("position", { x: -1.3, y: 0.5, z: 0 });
          textEl.setAttribute("visible", false);
          el.appendChild(textEl);

          el.addEventListener("click", function () {
            textEl.setAttribute("visible", true);
            setTimeout(function () {
              textEl.setAttribute("visible", false);
            }, 10000);
          });
        },
      });
    