import { GAME_MODES } from '../Juego/config.js';
import { loadHighScores, updateHighScoresDisplay } from './scoreManager.js';

document.addEventListener('DOMContentLoaded', () => {
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
        'EASY': 'botonFacil',
        'NORMAL': 'botonNormal',
        'HARD': 'botonDificil'
    };

    Object.entries(difficultyButtons).forEach(([mode, buttonId]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                const gameMode = GAME_MODES[mode].name;
                console.log('Starting game with mode:', gameMode); // Debug log
                localStorage.setItem('gameMode', gameMode);
                window.location.href = 'game.html';
            });
        }
    });

    // Load and display high scores
    loadHighScores();
    updateHighScoresDisplay();
});