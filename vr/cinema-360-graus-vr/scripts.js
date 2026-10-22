// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <body>) ----
const guia = document.querySelector("#guia");
const destino = document.querySelector("#destino");

guia.addEventListener("click", () => {
  const destinoPosition = destino.getAttribute("position");
  guiatalk.setAttribute("visible", false);
  guia.setAttribute("animation", {
    property: "position",
    to: destinoPosition,
    dur: 10000,
    easing: "linear",
  });

  guia.setAttribute("rotation", "0 -45 0");
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
    el.addEventListener("click", function () {
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
const guiatalk = document.querySelector("#guiatalk");

const distanciaProximidade4 = 6;

function verificarProximidade4() {
  const camera4 = document.querySelector("a-camera");
  const distancia4 = camera4.object3D.position.distanceTo(
    guiatalk.object3D.position
  );

  if (distancia4 <= distanciaProximidade4) {
    setTimeout(() => {
      guiatalk.setAttribute(
        "value",
        "Eu sou o teu guia. \n Vais passar por duas barracas, aconcelho-te a chegares perto do BIT e do BOT para veres o que eles tem a dizer!\n Carrega em mim para eu te mostar o caminho "
      );
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
const sensor = document.querySelector("#sensor");
const talk = document.querySelector("#talk");

// Distância de proximidade (ajuste conforme necessário)
const distanciaProximidade = 2;

function verificarProximidade() {
  const camera = document.querySelector("a-camera");
  const distancia = camera.object3D.position.distanceTo(
    sensor.object3D.position
  );

  if (distancia <= distanciaProximidade) {
    talk.setAttribute("visible", true); // Exibe o texto
    setTimeout(() => {
      talk.setAttribute(
        "value",
        "Se olhares para o quadro no teu lado direito tens uma charada. \n Se acertares vais poder ter acesso aos videos 360!\n Boa Sorte! "
      );
    }, 4000);
  } else {
    talk.setAttribute("visible", false); // Esconde o texto
  }
}

// Verifica a proximidade a cada quadro (frame)
setInterval(verificarProximidade, 100); // Ajuste o intervalo conforme necessário
      

// ---- bloco 8 (antes no <body>) ----
const sensor2 = document.querySelector("#sensor2");
const talk2 = document.querySelector("#talk2");

// Distância de proximidade (ajuste conforme necessário)
const distanciaProximidade2 = 2;

function verificarProximidade2() {
  const camera2 = document.querySelector("a-camera");
  const distancia2 = camera2.object3D.position.distanceTo(
    sensor2.object3D.position
  );

  if (distancia2 <= distanciaProximidade2) {
    talk2.setAttribute("visible", true); // Exibe o texto
    setTimeout(() => {
      talk2.setAttribute(
        "value",
        "Carrega no botao para validar o acesso aos videos \n A tua esquerda vao aparecer dois videos 360 \n Para saires do video, da um clique"
      );
    }, 4000);
  } else {
    talk2.setAttribute("visible", false); // Esconde o texto
  }
}

// Verifica a proximidade a cada quadro (frame)
setInterval(verificarProximidade2, 100); // Ajuste o intervalo conforme necessário
      

// ---- bloco 9 (antes no <body>) ----
const minhaCaixa = document.querySelector("#minha-caixa");
const acertouTexto = document.querySelector("#acertou");
const val = document.querySelector("#val");
const val2 = document.querySelector("#val2");
const portal1 = document.querySelector("#portal1");
const portal2 = document.querySelector("#portal2");

minhaCaixa.addEventListener("click", () => {
  if (acertouTexto.getAttribute("visible")) {
    val2.setAttribute("visible", false);
    val.setAttribute("visible", true);
    portal1.setAttribute("visible", true);
    portal1.setAttribute("position", "-9 0 -7");
    portal2.setAttribute("visible", true);
    portal2.setAttribute("position", "-5 0 -7");
  } else {
    val2.setAttribute("visible", true);
  }
});
      

// ---- bloco 10 (antes no <body>) ----
// Adiciona event listeners para toques na tela
document.addEventListener("touchstart", iniciarMovimento);
document.addEventListener("touchend", pararMovimento);

var rig = document.getElementById("rig");
var movendo = false;
var direcao = "";

function iniciarMovimento(e) {
  var larguraTela = window.innerWidth;
  var alturaTela = window.innerHeight;
  var toqueX = e.touches[0].clientX;
  var toqueY = e.touches[0].clientY;

  // Define a direção com base na posição do toque
  if (toqueX < larguraTela / 2 && toqueY < alturaTela / 2) {
    direcao = "frente";
  } else if (toqueX >= larguraTela / 2 && toqueY < alturaTela / 2) {
    direcao = "direita";
  } else if (toqueX < larguraTela / 2 && toqueY >= alturaTela / 2) {
    direcao = "esquerda";
  } else if (toqueX >= larguraTela / 2 && toqueY >= alturaTela / 2) {
    direcao = "tras";
  }

  movendo = true;
  mover();
}

function pararMovimento(e) {
  movendo = false;
}

function mover() {
  if (movendo) {
    switch (direcao) {
      case "frente":
        rig.object3D.position.z -= 0.05;
        break;
      case "esquerda":
        rig.object3D.position.x -= 0.05;
        break;
      case "direita":
        rig.object3D.position.x += 0.05;
        break;
      case "tras":
        rig.object3D.position.z += 0.05;
        break;
    }
    requestAnimationFrame(mover);
  }
}
      
