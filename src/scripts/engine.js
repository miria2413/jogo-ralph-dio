const state = {
    view: {
      squares: document.querySelectorAll(".quadrado"),
      enemy: document.querySelector(".inimigo"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
    },

    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
    },

    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
};
  
function countDown() {
    state.values.curretTime--; /* Subtrai 1 unidade do tempo restante a cada chamada da função, simulando a contagem regressiva. */
    state.view.timeLeft.textContent = state.values.curretTime; /* mostra o tempo em contagem regressiva. */
  
    if (state.values.curretTime <= 0) /* Verifica se o tempo chegou a zero */{
      clearInterval(state.actions.countDownTimerId); /*  intervalos regulares */
      clearInterval(state.actions.timerId);
      alert("Game Over! O seu resultado foi: " + state.values.result); /*  informando que o jogo acabou e exibindo o resultado final armazenado */
    }
}
  
function playSound(audioName) /*  nome do arquivo de áudio */{
    let audio = new Audio(`./src/audios/${audioName}.m4a`); /* define o caminho para o arquivo de áudio */
    audio.volume = 0.2; /* Define o volume inicial do som */
    audio.play(); /* Inicia a reprodução do arquivo de áudio especificado em audioName. */
}
  
function randomSquare() {
    state.view.squares.forEach((square) /* forEach para iterar sobre todos os elementos da lista state.view.squares */ => {
      square.classList.remove("inimigo"); /* square (que representa um quadrado na interface), a função classList.remove("enemy") remove a classe CSS "enemy" daquele quadrado. */
    });
  
    let randomNumber = Math.floor(Math.random() * 9); /* gera um número aleatório entre 0 e 8 */
    /* Math.random() gera um número decimal entre 0 (inclusive) e 1 (exclusive), Multiplicando por 9 e usando Math.floor() arredonda o resultado para baixo, resultando em um número inteiro entre 0 e 8. */
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("inimigo");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("audio");
        }
      });
    });
}
  
function initialize() {
    addListenerHitBox();
}
  
initialize();