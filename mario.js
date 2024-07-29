//Selecionando os elementos do jogo

const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const pipe2 = document.querySelector('.pipe2')
const fogo = document.querySelector('.fogo')
const goomba = document.querySelector('.goomba')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

const end = document.querySelector('.end')

audioStart = new Audio('./src/audio/audio_theme.mp3')
audioGameOver = new Audio('./src/audio/audio_gameover.mp3')
audioPulo = new Audio('./src/audio/pulo.mp3')
audioFogo = new Audio('./src/audio/fire-effect.mp3')

let isGameStarted = false;

fogo.style.display = 'none'

//Função para definir como o game vai ser no começo, lembrando que ela foi adcionada
// ao botão start game, lá em cima no HTML
function startGame() {

  isGameStarted = true

	//Modifica a class do elemento cano para rodar a animação
  pipe.classList.add('pipe-animation');
  pipe2.classList.add('pipe2-animation');
  goomba.classList.add('goomba-animation')
  
  //esconde o botão de start
  start.style.display = 'none';
  
  //Começa a musica
  audioStart.play();
  console.log('audio começa')
}

// Função que faz o Mario pular

function jump() {
    //Muda o class do Mario para o css fazer ele pular
    mario.classList.add('jump')
    audioPulo.play();
  
      //Após 8 segundos, remove a class de pulo do mario
    setTimeout(() => {
      mario.classList.remove('jump')
    }, 800)
  }

function fire()
 {
  fogo.style.display = 'flex'
  fogo.classList.add('fogo-animation');
  audioFogo.play();

  setTimeout(() => {
    fogo.classList.remove('fogo-animation');
    fogo.style.display = 'none'
  }, 800)
 }


  // Adiciona um ouvinte de eventos para pressionamento de teclas
document.addEventListener('keypress', e => {
    const tecla = e.key;  // Obtém a tecla pressionada
    if (tecla === ' ') {  // Se a tecla for o espaço (' ')
      jump();  // Chama a função jump para fazer o Mario pular
    }
    if (tecla === 'x') {
      fire();
    }
      
  });


// Função para parar o áudio de início
function stopAudioStart() {
    audioStart.pause();
  }
  
  // Função para parar o áudio de game over
  function stopAudio() {
    audioGameOver.pause();
  }
  

  function finishGame(pipePosition, pipe2Position, marioPosition) {

    isGameStarted = false;

    // Remove a classe '.pipe-animation' do elemento 'pipe' para parar a animação do cano.
    pipe.classList.remove('.pipe-animation');
    pipe2.classList.remove('.pipe-animation');
    goomba.classList.remove('.goomba-animation')
    
    // Define a posição horizontal do 'pipe' de volta para 'pipePosition' em pixels.
    pipe.style.left = `${pipePosition}px`;
    pipe2.style.left = `${pipePosition}px`;
    goomba.style.left = `${pipePosition}px`;
  
    // Remove a classe '.jump' do elemento 'mario' para parar a animação de pulo.
    mario.classList.remove('.jump');
    
    // Define a posição vertical do 'mario' de volta para 'marioPosition' em pixels.
    mario.style.bottom = `${marioPosition}px`;
  
    // Altera a imagem do 'mario' para 'game-over.png'.
    mario.src = './src/img/game-over.png';
    
    // Define o tamanho da largura da imagem do 'mario' como '80px'.
    mario.style.width = '80px';
    
    // Define a margem esquerda da imagem do 'mario' como '50px'.
    mario.style.marginLeft = '50px';
    
    // Chama a função 'stopAudioStart' para parar o áudio de início.
    stopAudioStart();
    
    // Reproduz o áudio 'audioGameOver' indicando o fim do jogo.
    audioGameOver.play();
    
    // Após 7 segundos, chama a função 'stopAudio' para parar o áudio de game over.
    //setTimeout(stopAudio, 7000);


    // Exibe o elemento 'gameOver' alterando seu estilo para 'flex'.
    gameOver.style.display = 'flex';

    //end.style.display = 'flex';
    
    // Limpa o intervalo 'loop' que provavelmente controla o loop principal do jogo.
    clearInterval(loop);


  }
  
    //Função para o jogo recomeçar
    function restartGame() {

      isGameStarted = true

      // Oculta o elemento 'gameOver' definindo seu estilo de exibição para 'none'.
      gameOver.style.display = 'none';
      
      // Remove qualquer valor de posição horizontal esquerda do 'pipe'.

      pipe.style.left = '';
      pipe2.style.left = '';
      goomba.style.left = '';

      // Define a posição horizontal direita do 'pipe' para '0', reiniciando a posição.
      pipe.style.right = '0';
      pipe2.style.right = '0';
      goomba.style.right = '0';



      // Altera a imagem do 'mario' de volta para o GIF animado original.
      mario.src = './src/img/mario.gif';
      
      // Define a largura da imagem do 'mario' de volta para '150px'.
      mario.style.width = '150px';
      
      // Define a posição vertical do 'mario' de volta para o chão ('0').
      mario.style.bottom = '0';
    
      // Oculta o elemento 'start', definindo seu estilo de exibição para 'none'.
      start.style.display = 'none';
    
      // Pausa o áudio de game over.
      audioGameOver.pause();
      console.log('audio parado')
      
      // Reseta o tempo do áudio de game over para o início (0 segundos).
      audioGameOver.currentTime = 0;
    
      // Reproduz o áudio de início do jogo.
      audioStart.play();
      console.log('audio começa')
      
      // Reseta o tempo do áudio de início para o início (0 segundos).
      audioStart.currentTime = 0;

      const scorePoints = document.querySelector('.scorePoints')
      scorePoints.innerText = '0'

    }
  
  //Essa função será rodada em loop
  function game() { 

    pipe.style.display = 'flex';

    // A posição dos elementos
    const pipePosition = parseFloat(pipe.offsetLeft);
    const pipe2Position = pipe2.offsetLeft;
    const goombaPosition = parseFloat(goomba.offsetLeft);

    const fogoW = parseFloat(fogo.width)
    const fogoH = parseFloat(fogo.height)
    const fogoX = parseFloat(fogo.x)
    const fogoY = parseFloat(fogo.y)

    const goombaW = parseFloat(goomba.width)
    const goombaH = parseFloat(goomba.height)
    const goombaX = parseFloat(goomba.x)
    const goombaY = parseFloat(goomba.y)
  
    // A posição do Mario
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));

        // Verifica se há colisão entre fogo e pipe
    if (fogoX + goombaW > goombaX) {

        goomba.style.display = 'none';
        console.log('colisão');

        setTimeout(() => {
          
          goomba.style.display = 'flex';

        }, 3000)

    }
      

    if (isGameStarted) {
      const scorePoints = document.querySelector('.scorePoints');
      const currentScore = parseFloat(scorePoints.innerText);
      const newScore = currentScore + 0.1;
      scorePoints.innerText = newScore.toFixed(1);
    }
  
    // Verifica se há colisão entre Mario e pipe
    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
      // Finaliza o game caso haja colisão (Game over)
      finishGame(pipePosition, pipe2Position, marioPosition);
    }
    else if (goombaPosition <= 100 && goombaPosition > 0 && marioPosition < 80) {
      finishGame(pipePosition, pipe2Position, marioPosition);
    }
  }
  
  // Loop que executará a função game a cada 10 milissegundos
  function loop() {
    setInterval(game, 10);
  }
  
  loop();
  