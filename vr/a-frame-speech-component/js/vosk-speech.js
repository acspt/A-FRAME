/* global AFRAME, Vosk */

// Comandos de voz em inglês com o Vosk (vosk-browser): reconhecimento de fala que corre
// todo no browser (WebAssembly), sem internet depois de carregar o modelo, em qualquer browser moderno.
// https://ccoreilly.github.io/vosk-browser/
//
// O reconhecedor usa uma gramática fechada: só "ouve" as frases dos comandos,
// o que o torna muito mais preciso do que um reconhecedor de texto livre.

// Normaliza um texto: minúsculas e sem pontuação
function normalizar(texto) {
  return texto.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Sistema: guarda todos os componentes voice-command da cena
AFRAME.registerSystem('voice-command', {
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
  // todas as frases que o reconhecedor deve conhecer (a gramática)
  gramatica: function () {
    var frases = [];
    this.entities.forEach(function (c) { frases = frases.concat(c.frases); });
    return frases;
  },
  // devolve o comando que tem esta frase
  procura: function (texto) {
    var t = normalizar(texto.replace(/\[unk\]/g, ' '));
    var i;
    // 1) frase exatamente igual a uma das frases de um comando
    for (i = 0; i < this.entities.length; i++) {
      if (this.entities[i].frases.indexOf(t) >= 0) { return this.entities[i]; }
    }
    // 2) se não houver, um comando cujas palavras estejam todas no que foi ouvido
    //    (por exemplo "[unk] menu", quando o verbo foi mal ouvido, ativa o comando "menu")
    var palavras = t.split(' ');
    var melhor = null, tamanho = 0;
    for (i = 0; i < this.entities.length; i++) {
      var comp = this.entities[i];
      comp.frases.forEach(function (f) {
        var todas = f.split(' ').every(function (p) { return palavras.indexOf(p) >= 0; });
        if (todas && f.length > tamanho) { melhor = comp; tamanho = f.length; }
      });
    }
    return melhor;
  }
});

// Um comando de voz.
// command:  frase principal (em inglês)
// keywords: outras frases que fazem o mesmo, separadas por vírgulas
// type: "attribute" muda um atributo do targetElement para "value"
//       "toggle" troca um atributo verdadeiro/falso (por exemplo visible)
AFRAME.registerComponent('voice-command', {
  multiple: true,
  schema: {
    command: { type: 'string' },
    keywords: { type: 'string', default: '' },
    type: { type: 'string', default: 'attribute' },
    targetElement: { type: 'selector' },
    attribute: { type: 'string' },
    value: { type: 'string' }
  },

  init: function () {
    this.system.registerMe(this);
    if (!this.data.targetElement) {
      this.data.targetElement = this.el;
    }
  },

  update: function () {
    var lista = [this.data.command].concat(this.data.keywords.split(','));
    this.frases = lista.map(normalizar).filter(function (f) { return f.length > 0; });
  },

  remove: function () {
    this.system.unregisterMe(this);
  },

  executeCommand: function () {
    var alvo = this.data.targetElement;
    if (this.data.type === 'attribute') {
      alvo.setAttribute(this.data.attribute, this.data.value);
    } else if (this.data.type === 'toggle') {
      alvo.setAttribute(this.data.attribute, !alvo.getAttribute(this.data.attribute));
    }
  }
});

// Liga o microfone e o Vosk aos comandos da cena.
// modelo: endereço do modelo de inglês (ficheiro .tar.gz)
// botao:  botão que liga/desliga o microfone
// estado: elemento onde se escreve o que está a acontecer
AFRAME.registerComponent('vosk-recognition', {
  schema: {
    modelo: { type: 'string', default: 'model/vosk-model-small-en-us-0.15.tar.gz' },
    botao: { type: 'selector', default: '#voz-botao' },
    estado: { type: 'selector', default: '#voz-estado' }
  },

  init: function () {
    var self = this;
    this.ativo = false;
    this.modelo = null;

    if (typeof Vosk === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.mostra('Este browser não deixa usar o microfone. A página tem de estar em https.', 'erro');
      if (this.data.botao) { this.data.botao.disabled = true; }
      return;
    }

    this.data.botao.addEventListener('click', function () {
      if (self.ativo) { self.para(); } else { self.arranca(); }
    });
  },

  // Carrega o modelo (só da primeira vez), liga o microfone e começa a reconhecer
  arranca: async function () {
    var self = this;
    var botao = this.data.botao;
    botao.disabled = true;
    try {
      if (!this.modelo) {
        this.mostra('A carregar o modelo de inglês (41 MB, só da primeira vez)…', 'aviso');
        // o Vosk carrega o modelo num Web Worker, onde os caminhos relativos não funcionam:
        // por isso converte-se "model/..." num endereço completo (https://.../model/...)
        var urlModelo = new URL(this.data.modelo, location.href).href;
        this.modelo = await Vosk.createModel(urlModelo);
      }

      this.mostra('A ligar o microfone…', 'aviso');
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 }
      });
      this.contexto = new AudioContext();

      // gramática: só as frases dos comandos; "[unk]" apanha tudo o resto (palavras desconhecidas)
      var frases = this.el.sceneEl.systems['voice-command'].gramatica();
      this.reconhecedor = new this.modelo.KaldiRecognizer(this.contexto.sampleRate, JSON.stringify(frases.concat(['[unk]'])));

      // frase completa reconhecida (depois de uma pequena pausa na fala)
      this.reconhecedor.on('result', function (mensagem) {
        var texto = mensagem.result.text;
        if (!texto) { return; }
        console.log('[voz] ouvi:', texto);
        // [unk] = palavra que não faz parte dos comandos; no ecrã aparece como …
        var legivel = texto.replace(/\[unk\]/g, '…');
        var comp = self.el.sceneEl.systems['voice-command'].procura(texto);
        if (comp) {
          comp.executeCommand();
          self.mostra('Ouvi: "' + legivel + '"  →  ' + comp.data.command, 'ok');
        } else {
          self.mostra('Ouvi: "' + legivel + '"  →  não é um comando', 'aviso');
        }
      });
      // o que está a ser dito, enquanto se fala
      this.reconhecedor.on('partialresult', function (mensagem) {
        var parcial = mensagem.result.partial;
        if (parcial && parcial !== '[unk]') { self.mostra('🎤 … ' + parcial, 'ok'); }
      });

      // envia o som do microfone para o reconhecedor, em blocos de 4096 amostras
      var fonte = this.contexto.createMediaStreamSource(this.stream);
      this.processador = this.contexto.createScriptProcessor(4096, 1, 1);
      this.processador.onaudioprocess = function (evento) {
        try { self.reconhecedor.acceptWaveform(evento.inputBuffer); } catch (e) { console.log('[voz] erro:', e); }
      };
      fonte.connect(this.processador);
      this.processador.connect(this.contexto.destination);

      this.ativo = true;
      this.mostra('🎤 A ouvir… diga um comando em inglês.', 'ok');
    } catch (e) {
      console.log('[voz] erro:', e);
      if (e && e.name === 'NotAllowedError') {
        this.mostra('O acesso ao microfone foi recusado. Autorize-o nas definições do site.', 'erro');
      } else if (e && e.name === 'NotFoundError') {
        this.mostra('Não foi encontrado nenhum microfone.', 'erro');
      } else {
        this.mostra('Não foi possível arrancar: ' + (e && e.message ? e.message : e), 'erro');
      }
    }
    botao.disabled = false;
    this.atualizaBotao();
  },

  // Desliga o microfone (o modelo fica carregado para a próxima vez)
  para: function () {
    this.ativo = false;
    if (this.processador) { this.processador.disconnect(); this.processador = null; }
    if (this.stream) { this.stream.getTracks().forEach(function (t) { t.stop(); }); this.stream = null; }
    if (this.contexto) { this.contexto.close(); this.contexto = null; }
    if (this.reconhecedor) { this.reconhecedor.remove(); this.reconhecedor = null; }
    this.mostra('Microfone desligado.', 'aviso');
    this.atualizaBotao();
  },

  atualizaBotao: function () {
    this.data.botao.textContent = this.ativo ? '⏹ Desligar voz' : '🎤 Ativar voz';
  },

  // escreve uma mensagem na caixa de estado (tipo: ok, aviso ou erro)
  mostra: function (texto, tipo) {
    if (this.data.estado) {
      this.data.estado.textContent = texto;
      this.data.estado.className = tipo || '';
    }
  },

  remove: function () {
    if (this.ativo) { this.para(); }
  }
});
