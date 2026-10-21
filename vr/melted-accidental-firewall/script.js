  AFRAME.registerComponent("goto-scene2", {
        init: function() {
        
          this.el.addEventListener("click", this.click);
        },

        click: function() {
          
          const toScene2 = document.getElementById("toScene2");
          const toScene1 = document.getElementById("toScene1");
      
          scene1.setAttribute("visible", "false");
          scene2.setAttribute("visible", "true");
          console.log("to scene 2");
        }
      });

    