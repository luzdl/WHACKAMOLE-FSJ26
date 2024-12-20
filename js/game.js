import { GAME_MODES, BOARD_SIZE, MOLE_APPEAR_TIME, ASSETS } from './config.js';
import { gameState, resetGameState } from './gameState.js';
import { saveScore, getHighScore } from './scoreManager.js';

function createBoard() {
    const board = document.getElementById('board');
    if (!board) return;
    
    board.innerHTML = '';
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.index = i;
        
        const moleDown = document.createElement('img');
        moleDown.src = ASSETS.MOLE_DOWN;
        moleDown.alt = 'Mole hole';
        moleDown.className = 'mole-down';
        tile.appendChild(moleDown);
        
        board.appendChild(tile);
    }
}

function createMole() {
    if (gameState.gameOver || gameState.paused || 
        gameState.currentMoles.length >= gameState.config.maxMoles) return;

    const tiles = [...document.getElementsByClassName('tile')];
    const emptyTiles = tiles.filter(tile => !tile.querySelector('.mole-up'));
    
    if (emptyTiles.length === 0) return;

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const mole = document.createElement('img');
    mole.src = ASSETS.MOLE_UP;
    mole.alt = 'Mole';
    mole.className = 'mole-up';
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
    
    mole.src = ASSETS.MOLE_HIT;
    mole.style.pointerEvents = 'none';
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

function startGame() {
    const mode = localStorage.getItem('gameMode') || 'normal';
    const config = Object.values(GAME_MODES).find(config => config.name === mode);
    
    if (!config) {
        console.error('Invalid game mode:', mode);
        window.location.href = 'index.html';
        return;
    }

    resetGameState(config);
    createBoard();
    updateDisplay();
    
    gameState.moleInterval = setInterval(createMole, config.moleInterval);
    gameState.timerInterval = setInterval(updateTimer, 1000);
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
        pauseButton.addEventListener('click', () => {
            gameState.paused = !gameState.paused;
            pauseButton.textContent = gameState.paused ? 'Reanudar' : 'Pausa';
        });
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

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    startGame();
    setupEventListeners();
});