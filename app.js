let listaNumerosSorteados = [];
let quantidadeNumerosSorteados = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// let titulo = document.querySelector('h1');
// let paragrafo = document.querySelector('p');

// titulo.innerHTML = 'Jogo do número secreto';
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10.'

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicia() {
  exibirTextoNaTela('h1', 'Jogo do número secreto.');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${quantidadeNumerosSorteados}.`);
}

exibirMensagemInicia();


function verificarChute(){
  let chute = document.querySelector('input').value;
  // console.log(chute == numeroSecreto);
  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Parabéns :)');

    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tenativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}.`

    exibirTextoNaTela('p', mensagemTentativas)

    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor.');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior.');
    }

    tentativas++;
    limparCampo();
  }
};

function gerarNumeroAleatorio() {
  let numeroEscolhido =  parseInt(Math.random() * quantidadeNumerosSorteados + 1);
  let quantidadeDeElementosNalista = listaNumerosSorteados.length;

  if(quantidadeDeElementosNalista == quantidadeNumerosSorteados) {
    listaNumerosSorteados = []
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicia();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
