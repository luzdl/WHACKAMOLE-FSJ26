import { GAME_MODES, BOARD_SIZE, MOLE_APPEAR_TIME } from './config.js';
import { saveScore, getHighScore } from '../Menu/scoreManager.js';

let gameState = {
    score: 0,
    timeLeft: 0,
    gameOver: false,
    paused: false,
    currentMoles: [],
    moleInterval: null,
    timerInterval: null,
    config: null
};

document.addEventListener('DOMContentLoaded', () => {
    const mode = localStorage.getItem('gameMode') || 'normal'; // Default to normal if no mode is set
    console.log('Current game mode:', mode); // Debug log
    
    gameState.config = Object.values(GAME_MODES).find(config => config.name === mode);
    
    if (!gameState.config) {
        console.error('Invalid game mode:', mode);
        window.location.href = 'index.html';
        return;
    }

    console.log('Game config:', gameState.config); // Debug log
    initializeGame();
    setupEventListeners();
});

function initializeGame() {
    gameState.timeLeft = gameState.config.timeLimit;
    createBoard();
    updateDisplay();
    startGame();
}

function createBoard() {
    const board = document.getElementById('board');
    if (!board) {
        console.error('Game board not found');
        return;
    }
    
    board.innerHTML = '';
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.index = i;
        board.appendChild(tile);
    }
}

function startGame() {
    if (gameState.moleInterval) clearInterval(gameState.moleInterval);
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    
    gameState.moleInterval = setInterval(createMole, gameState.config.moleInterval);
    gameState.timerInterval = setInterval(updateTimer, 1000);
}

function createMole() {
    if (gameState.gameOver || gameState.paused || 
        gameState.currentMoles.length >= gameState.config.maxMoles) return;

    const emptyTiles = [...document.getElementsByClassName('tile')]
        .filter(tile => !tile.hasChildNodes());
    
    if (emptyTiles.length === 0) return;

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const mole = document.createElement('img');
    mole.src = "./assets/img/moleUp.png";
    mole.className = 'mole';
    mole.addEventListener('click', hitMole);

    randomTile.appendChild(mole);
    gameState.currentMoles.push(randomTile);

    setTimeout(() => {
        if (mole.parentNode === randomTile) {
            randomTile.removeChild(mole);
            gameState.currentMoles = gameState.currentMoles.filter(tile => tile !== randomTile);
        }
    }, MOLE_APPEAR_TIME);
}

function hitMole(event) {
    if (gameState.gameOver || gameState.paused) return;

    const mole = event.target;
    const tile = mole.parentNode;
    
    mole.src = "./assets/img/moleAuch.png";
    gameState.score += gameState.config.pointsPerHit;
    updateDisplay();

    setTimeout(() => {
        if (mole.parentNode === tile) {
            tile.removeChild(mole);
            gameState.currentMoles = gameState.currentMoles.filter(t => t !== tile);
        }
    }, 200);
}

function updateTimer() {
    if (gameState.gameOver || gameState.paused) return;

    gameState.timeLeft--;
    updateDisplay();

    if (gameState.timeLeft <= 0) {
        endGame();
    }
}

function updateDisplay() {
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const highScoreElement = document.getElementById('highScore');
    
    if (scoreElement) scoreElement.textContent = gameState.score;
    if (timerElement) timerElement.textContent = `${gameState.timeLeft}s`;
    if (highScoreElement) highScoreElement.textContent = getHighScore();
}

function endGame() {
    gameState.gameOver = true;
    clearInterval(gameState.moleInterval);
    clearInterval(gameState.timerInterval);
    
    const finalScoreElement = document.getElementById('finalScore');
    const gameOverMessage = document.getElementById('gameOverMessage');
    
    if (finalScoreElement) finalScoreElement.textContent = gameState.score;
    if (gameOverMessage) gameOverMessage.style.display = 'block';
    
    saveScore(gameState.score);
}

function setupEventListeners() {
    const pauseButton = document.getElementById('pauseButton');
    const playAgainButton = document.getElementById('playAgain');
    const backToMenuButton = document.getElementById('backToMenu');
    
    if (pauseButton) {
        pauseButton.addEventListener('click', togglePause);
    }
    
    if (playAgainButton) {
        playAgainButton.addEventListener('click', () => {
            window.location.reload();
        });
    }
    
    if (backToMenuButton) {
        backToMenuButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

function togglePause() {
    gameState.paused = !gameState.paused;
    const pauseButton = document.getElementById('pauseButton');
    if (pauseButton) {
        pauseButton.textContent = gameState.paused ? 'Reanudar' : 'Pausa';
    }
}