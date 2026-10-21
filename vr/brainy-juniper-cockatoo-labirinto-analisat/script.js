AFRAME.registerComponent('click-change-light', {
        init: function () {
          this.el.addEventListener('click', () => {
            var light = document.querySelector('#dynamicLight');
            var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            light.setAttribute('color', randomColor);
          });
        }
      });



// Obtendo a luz e o cubo que representam a luz
        const light = document.getElementById('toggleLight');
        const lightBox = document.getElementById('lightBox');

        // Função para alternar a cor da luz entre preto e branco
        function toggleLightColor() {
          if (light.getAttribute('color') === '#000000') {
            light.setAttribute('color', '#FFFFFF');
            lightBox.setAttribute('color', '#FFFFFF');
          } else {
            light.setAttribute('color', '#000000');
            lightBox.setAttribute('color', '#000000');
          }
        }
