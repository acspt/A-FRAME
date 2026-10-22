// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <body>) ----
const guia = document.querySelector("#guia");
const destino = document.querySelector("#destino");

guia.addEventListener('mouseenter', () => {
  const destinoPosition = destino.getAttribute("position");
  guiatalk.setAttribute('visible', false);
  guia.setAttribute("animation", {
    property: "position",
    to: destinoPosition,
    dur: 10000,
    easing: "linear",
  });
  
  
    guia.setAttribute("rotation", "0 -45 0")
  
});
      

// ---- bloco 2 (antes no <body>) ----
AFRAME.registerComponent("cursor-listener", {
  init: function () {
    const el = this.el;
    el.addEventListener("mouseenter", function () {
      // Exibe a charada quando o cursor aponta para o objeto principal
      document
        .querySelector("#charada a-text")
        .setAttribute("visible", true);
    });
    el.addEventListener("mouseleave", function () {
      // Oculta a charada quando o cursor sai do objeto principal
      document
        .querySelector("#charada a-text")
        .setAttribute("visible", false);
    });
    el.addEventListener("mouseenter", function () {
      // Verifica se o objeto clicado é uma resposta
      if (el.id.startsWith("resposta")) {
        if (el.id === "resposta1") {
          document
            .querySelector("#acertou")
            .setAttribute("visible", true);
        } else {
          document.querySelector("#erro").setAttribute("visible", true);

          setTimeout(function () {
            document
              .querySelector("#erro")
              .setAttribute("visible", false);
          }, 2000);
        }
      }
    });
  },
});
      

// ---- bloco 3 (antes no <body>) ----
  
const guiatalk = document.querySelector('#guiatalk');

const distanciaProximidade4 = 6;

function verificarProximidade4() {
    const camera4 = document.querySelector('a-camera');
    const distancia4 = camera4.object3D.position.distanceTo(guiatalk.object3D.position);

    if (distancia4 <= distanciaProximidade4) {
        setTimeout(() => {
            guiatalk.setAttribute('value', 'Vais passar por duas barracas, aconcelho-te a chegares perto do BIT e do BOT para veres o que eles tem a dizer!\n Do teu lado esquerdo esta um robo guia, assim como tudo neste mundo basta apontares com o cursor para interagir com ele \n Ele vai-te mostrar o caminho que deves seguir \n Para andares para a frente inclina-te ligeiramente para baixo');

            }, 4000);
      

    } 
}

// Verifica a proximidade a cada quadro (frame)
setInterval(verificarProximidade4, 100); 
      


// ---- bloco 4 (antes no <body>) ----
const meuObjeto = document.querySelector("#anima");
let subindo = true;
let angulo = 0;

function atualizarAnimacao() {
  if (subindo) {
    meuObjeto.object3D.position.y += 0.01;
    if (meuObjeto.object3D.position.y >= 1.5) {
      subindo = false;
    }
  } else {
    meuObjeto.object3D.position.y -= 0.01;
    if (meuObjeto.object3D.position.y <= 1) {
      subindo = true;
    }
  }

  requestAnimationFrame(atualizarAnimacao);
}

       
atualizarAnimacao();

      

// ---- bloco 5 (antes no <body>) ----
const meuObjeto3 = document.querySelector("#guia");
let subindo3 = true;
let angulo3 = 0;

function atualizarAnimacao3() {
  if (subindo3) {
    meuObjeto3.object3D.position.y += 0.005;
    if (meuObjeto3.object3D.position.y >= 0.7) {
      subindo3 = false;
    }
  } else {
    meuObjeto3.object3D.position.y -= 0.005;
    if (meuObjeto3.object3D.position.y <= 0.3) {
      subindo3 = true;
    }
  }

  requestAnimationFrame(atualizarAnimacao3);
}

       
atualizarAnimacao3();

      

// ---- bloco 6 (antes no <body>) ----
const meuObjeto2 = document.querySelector("#anima2");
let subindo2 = true;
let angulo2 = 0;

function atualizarAnimacao2() {
  if (subindo2) {
    meuObjeto2.object3D.position.y += 0.01;
    if (meuObjeto2.object3D.position.y >= 1.5) {
      subindo2 = false;
    }
  } else {
    meuObjeto2.object3D.position.y -= 0.01;
    if (meuObjeto2.object3D.position.y <= 1) {
      subindo2 = true;
    }
  }

  requestAnimationFrame(atualizarAnimacao2);
}

atualizarAnimacao2();
      

// ---- bloco 7 (antes no <body>) ----
const sensor = document.querySelector('#sensor');
const talk = document.querySelector('#talk');

// Distância de proximidade (ajuste conforme necessário)
const distanciaProximidade = 2;

function verificarProximidade() {
    const camera = document.querySelector('a-camera');
    const distancia = camera.object3D.position.distanceTo(sensor.object3D.position);

    if (distancia <= distanciaProximidade) {
        talk.setAttribute('visible', true); // Exibe o texto
        setTimeout(() => {
            talk.setAttribute('value', 'Se olhares para o quadro no teu lado direito tens uma charada. \n Se acertares vais poder ter acesso aos videos 360!\n Boa Sorte! ');
 
              
            }, 4000);
      

    } else {
        talk.setAttribute('visible', false); // Esconde o texto
    }
}

// Verifica a proximidade a cada quadro (frame)
setInterval(verificarProximidade, 100); // Ajuste o intervalo conforme necessário
      


// ---- bloco 8 (antes no <body>) ----
const sensor2 = document.querySelector('#sensor2');
const talk2 = document.querySelector('#talk2');

// Distância de proximidade (ajuste conforme necessário)
const distanciaProximidade2 = 2;

function verificarProximidade2() {
    const camera2 = document.querySelector('a-camera');
    const distancia2 = camera2.object3D.position.distanceTo(sensor2.object3D.position);

    if (distancia2 <= distanciaProximidade2) {
        talk2.setAttribute('visible', true); // Exibe o texto
        setTimeout(() => {
            talk2.setAttribute('value', 'Carrega no botao para validar o acesso aos videos \n A tua esquerda vao aparecer dois videos 360 \n Para saires do video, da um clique');


            }, 4000);


    } else {
        talk2.setAttribute('visible', false); // Esconde o texto
    }
}

// Verifica a proximidade a cada quadro (frame)
setInterval(verificarProximidade2, 100); // Ajuste o intervalo conforme necessário



// ---- bloco 9 (antes no <body>) ----
const minhaCaixa = document.querySelector('#minha-caixa');
const acertouTexto = document.querySelector('#acertou');
const val = document.querySelector('#val');
const val2 = document.querySelector('#val2');
const portal1 = document.querySelector('#portal1');
const portal2 = document.querySelector('#portal2');



minhaCaixa.addEventListener('mouseenter', () => {
    if (acertouTexto.getAttribute('visible')) {
        val2.setAttribute('visible', false);
        val.setAttribute('visible', true);
        portal1.setAttribute('visible', true);
        portal1.setAttribute('position', '-9 0 -7');
        portal2.setAttribute('visible', true);
        portal2.setAttribute('position', '-5 0 -7');
        
    } else {
        val2.setAttribute('visible', true);
    }
});
        

// ---- bloco 10 (antes no <body>) ----
document.querySelector(".camera").setAttribute("move-camera", "");
  

 AFRAME.registerComponent("move-camera", {
  schema: {
    speed: { type: "number", default: -0.03 },
  },
  init: function () {
    this.direction = new THREE.Vector3();
  },
  tick: function () {
    // Get the camera's world direction
    this.el.object3D.getWorldDirection(this.direction);

    // Check if the camera is looking downward (rotation around X-axis)
    let angle = radians_to_degrees(this.el.object3D.rotation.x);
    if (angle < -10) {
      // Update the camera's position along the desired axes (e.g., X and Z)
      this.el.object3D.position.x += this.direction.x * this.data.speed;
      this.el.object3D.position.z += this.direction.z * this.data.speed;
    }

    // Optional: Log the camera's rotation in degrees
    console.log(angle);
  },
});

function radians_to_degrees(radians) {
  // Store the value of pi.
  var pi = Math.PI;
  // Multiply radians by 180 divided by pi to convert to degrees.
  return radians * (180 / pi);
}


    

// ---- bloco 11 (antes no <body>) ----
const linkEl = document.querySelector('#meu-link');

linkEl.addEventListener('mouseenter', () => {
  window.location.href = '/vid/01.html';
});
      

// ---- bloco 12 (antes no <body>) ----
const linkEl2 = document.querySelector('#meu-link2');

linkEl2.addEventListener('mouseenter', () => {
  window.location.href = '/vid/02.html';
});
      
