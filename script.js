const buttons = document.querySelectorAll('.button');
const startButton = document.querySelector('.start-btn');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');

let sequence = [];
let playerSequence = [];
let score = 0;
let highscore = 0;

startButton.addEventListener('click', startGame);

buttons.forEach(button => {
    button.addEventListener('click', () => playerClick(button));
});

function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    scoreElement.textContent = score;
    addToSequence();
}

function addToSequence() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const random = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(random);
    playSequence();
}

function enablePlayerInput() {
    buttons.forEach(button => {
        button.style.pointerEvents = 'auto';
    });
}

function playSequence() {
    let i = 0;
    buttons.forEach(button => {
        button.style.pointerEvents = 'none';
    });
    
    const interval = setInterval(() => {
        activateButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                enablePlayerInput();
            }, 1000);
        }
    }, 1000);
}

const sounds = {
    green: document.getElementById('green-sound'),
    red: document.getElementById('red-sound'),
    yellow: document.getElementById('yellow-sound'),
    blue: document.getElementById('blue-sound'),
    wrong: document.getElementById('wrong-sound')
};

function activateButton(color) {
    const button = document.querySelector(`[data-color="${color}"]`);
    button.classList.add('active');
    
    sounds[color].play();
    
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

function playerClick(button) {
    const color = button.getAttribute('data-color');
    activateButton(color);
    playerSequence.push(color);

    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        sounds.wrong.currentTime = 0;
        sounds.wrong.play();
        alert('Game Over! Clique em Start para jogar novamente.');
        if (score > highscore) {
            highscore = score;
            highscoreElement.textContent = highscore;
        }
        buttons.forEach(button => {
            button.style.pointerEvents = 'none';
        });
        return;
    }

    if (playerSequence.length === sequence.length) {
        score++;
        scoreElement.textContent = score;
        playerSequence = []; 
        setTimeout(() => {
            addToSequence();
        }, 1000);
    }
}
