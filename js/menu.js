import { GAME_MODES } from './config.js';
import { loadHighScores, updateHighScoresDisplay } from './scoreManager.js';

function initializeMenu() {
    const startButton = document.getElementById('botonEmpezar');
    const difficultySection = document.getElementById('letreroInicio');
    
    if (startButton && difficultySection) {
        startButton.addEventListener('click', () => {
            difficultySection.style.display = 'block';
            startButton.style.display = 'none';
        });
    }

    // Initialize difficulty buttons
    const difficultyButtons = {
        'EASY': document.getElementById('botonFacil'),
        'NORMAL': document.getElementById('botonNormal'),
        'HARD': document.getElementById('botonDificil')
    };

    Object.entries(difficultyButtons).forEach(([mode, button]) => {
        if (button) {
            button.addEventListener('click', () => {
                const gameMode = GAME_MODES[mode].name;
                localStorage.setItem('gameMode', gameMode);
                window.location.href = 'game.html';
            });
        }
    });

    // Load and display high scores
    loadHighScores();
    updateHighScoresDisplay();
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMenu);