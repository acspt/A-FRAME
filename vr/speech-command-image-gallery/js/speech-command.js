/* global AFRAME, annyang */

// Componentes speech-command e annyang-speech-recognition.
// Baseado em aframe-speech-command-component (licença MIT, Leonardo Malave):
// https://github.com/lmalave/aframe-speech-command-component
// Adaptado para:
//  - reconhecer palavras-chave dentro da frase (não é preciso dizer a frase exata);
//  - comparar todas as alternativas que o reconhecedor propõe;
//  - funcionar em português e em inglês;
//  - mostrar no ecrã o que foi ouvido e o comando executado.

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

// Normaliza um texto: minúsculas, sem acentos e sem pontuação ("Ir para a Cidade!" -> "ir para a cidade")
function normalizar(texto) {
  return texto.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Sistema: guarda todos os componentes speech-command da cena
AFRAME.registerSystem('speech-command', {
  init: function () {
    this.entities = [];
  },
  registerMe: function (comp) {
    this.entities.push(comp);
  },
  unregisterMe: function (comp) {
    var index = this.entities.indexOf(comp);
    if (index >= 0) { this.entities.splice(index, 1); }
  },

  // Procura o comando que corresponde a uma das frases ouvidas.
  // Uma palavra-chave serve se todas as palavras dela estiverem na frase, por qualquer ordem
  // (assim "mostra o menu" corresponde a "mostra menu").
  // Ganha a palavra-chave mais comprida encontrada (assim "esconder menu" ganha a "menu").
  procura: function (frases) {
    var melhor = null;
    var tamanho = 0;
    for (var f = 0; f < frases.length; f++) {
      var palavrasFrase = normalizar(frases[f]).split(' ');
      for (var i = 0; i < this.entities.length; i++) {
        var comp = this.entities[i];
        var chaves = comp.palavrasChave;
        for (var k = 0; k < chaves.length; k++) {
          var todas = chaves[k].split(' ').every(function (p) { return palavrasFrase.indexOf(p) >= 0; });
          if (todas && chaves[k].length > tamanho) {
            melhor = { comp: comp, frase: frases[f], chave: chaves[k] };
            tamanho = chaves[k].length;
          }
        }
      }
      // se a alternativa mais provável já deu resultado, não é preciso ver as outras
      if (melhor) { break; }
    }
    return melhor;
  }
});

// Um comando de voz.
// command:  nome do comando (também serve de palavra-chave)
// keywords: outras palavras ou frases que ativam o comando, separadas por vírgulas
AFRAME.registerComponent('speech-command', {
  multiple: true,
  schema: {
    command: { type: 'string' },
    keywords: { type: 'string', default: '' },
    type: { type: 'string' },
    targetElement: { type: 'selector' },
    targetComponent: { type: 'string' },
    function: { type: 'string' },
    attribute: { type: 'string' },
    value: { type: 'string' },
    keyCode: { type: 'string' }
  },

  init: function () {
    this.system.registerMe(this);
    if (!this.data.targetElement) {
      this.data.targetElement = this.el;
    }
    if (this.data.keyCode) {
      window.addEventListener('keyup', this.onKeyup.bind(this));
    }
  },

  update: function () {
    // lista de palavras-chave já normalizadas: o comando + as keywords
    var lista = [this.data.command].concat(this.data.keywords.split(','));
    this.palavrasChave = lista.map(normalizar).filter(function (p) { return p.length > 0; });
  },

  remove: function () {
    this.system.unregisterMe(this);
  },

  executeCommand: function () {
    var targetElement = this.data.targetElement;
    if (this.data.type === 'attribute') {
      targetElement.setAttribute(this.data.attribute, this.data.value);
    } else if (this.data.type === 'function') {
      var targetComponent = targetElement.components[this.data.targetComponent];
      targetComponent[this.data.function]();
    }
  },

  onKeyup: function (evt) {
    if (evt.keyCode == this.data.keyCode) {
      this.executeCommand();
    }
  }
});

// Liga o reconhecimento de voz (annyang) aos comandos da cena.
// lang:   língua inicial do reconhecedor ("pt-PT" ou "en-US")
// botao:  botão que liga/desliga o microfone (o Chrome exige um clique do utilizador)
// idioma: <select> para mudar a língua
// estado: elemento onde se escreve o que está a acontecer
AFRAME.registerComponent('annyang-speech-recognition', {
  schema: {
    lang: { type: 'string', default: 'pt-PT' },
    botao: { type: 'selector', default: '#voz-botao' },
    idioma: { type: 'selector', default: '#voz-idioma' },
    estado: { type: 'selector', default: '#voz-estado' }
  },

  init: function () {
    var self = this;
    this.aOuvir = false;

    // browser sem reconhecimento de voz (por exemplo Firefox)
    if (typeof annyang === 'undefined' || !annyang) {
      this.mostra('Este browser não suporta reconhecimento de voz. Use o Chrome (ou Edge).', 'erro');
      if (this.data.botao) { this.data.botao.disabled = true; }
      return;
    }

    annyang.setLanguage(this.data.lang);
    if (this.data.idioma) { this.data.idioma.value = this.data.lang; }

    // result: recebe todas as alternativas que o reconhecedor propõe (a mais provável primeiro)
    annyang.addCallback('result', function (frases) {
      var r = self.el.sceneEl.systems['speech-command'].procura(frases);
      if (r) {
        r.comp.executeCommand();
        self.mostra('Ouvi: "' + r.frase + '"  →  ' + r.comp.data.command, 'ok');
      } else {
        self.mostra('Ouvi: "' + frases[0] + '"  →  não percebi o comando', 'aviso');
      }
    });

    annyang.addCallback('start', function () {
      self.mostra('🎤 A ouvir… (' + self.data.idioma.value + ')', 'ok');
    });
    annyang.addCallback('errorPermissionDenied', function () {
      self.aOuvir = false; self.atualizaBotao();
      self.mostra('O acesso ao microfone foi recusado. Autorize-o nas definições do site e tente de novo.', 'erro');
    });
    annyang.addCallback('errorPermissionBlocked', function () {
      self.aOuvir = false; self.atualizaBotao();
      self.mostra('O browser bloqueou o microfone. A página tem de estar em https.', 'erro');
    });
    annyang.addCallback('errorNetwork', function () {
      self.mostra('Erro de rede: o reconhecimento de voz do Chrome precisa de internet.', 'erro');
    });

    // botão: liga e desliga o microfone
    if (this.data.botao) {
      this.data.botao.addEventListener('click', function () {
        if (self.aOuvir) {
          annyang.abort();
          self.aOuvir = false;
          self.mostra('Microfone desligado.', 'aviso');
        } else {
          // autoRestart: volta a ouvir sozinho quando o reconhecedor pára
          // continuous: false funciona melhor no Android e dá respostas mais rápidas
          annyang.start({ autoRestart: true, continuous: false });
          self.aOuvir = true;
        }
        self.atualizaBotao();
      });
    }

    // mudar a língua (pt-PT / en-US)
    if (this.data.idioma) {
      this.data.idioma.addEventListener('change', function () {
        annyang.setLanguage(self.data.idioma.value);
        if (self.aOuvir) {
          // reinicia para a nova língua ter efeito
          annyang.abort();
          annyang.start({ autoRestart: true, continuous: false });
        }
      });
    }

    this.atualizaBotao();
  },

  atualizaBotao: function () {
    if (this.data.botao) {
      this.data.botao.textContent = this.aOuvir ? '⏹ Desligar voz' : '🎤 Ativar voz';
    }
  },

  // escreve uma mensagem na caixa de estado (tipo: ok, aviso ou erro)
  mostra: function (texto, tipo) {
    if (this.data.estado) {
      this.data.estado.textContent = texto;
      this.data.estado.className = tipo || '';
    }
  },

  remove: function () {
    if (typeof annyang !== 'undefined' && annyang) { annyang.abort(); }
  }
});
