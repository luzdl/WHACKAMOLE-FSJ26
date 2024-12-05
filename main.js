// Import game modes
import { initializeModoFacil } from "./Juego/modoFacil.js";
import { initializeModoNormal } from "./Juego/modoNormal.js";
import { initializeModoModoDificil } from "./Juego/modoDificil.js";

export let highscores = [];

// Initialize menu controls
function initializeMenu() {
    const startButton = document.getElementById("botonEmpezar");
    const difficultySection = document.getElementById("letreroInicio");
    
    if (startButton) {
        startButton.addEventListener("click", function() {
            difficultySection.style.display = "block";
            startButton.style.display = "none";
        });
    }

    // Difficulty buttons
    const easyButton = document.getElementById("botonFacil");
    const normalButton = document.getElementById("botonNormal");
    const hardButton = document.getElementById("botonDificil");

    if (easyButton) {
        easyButton.addEventListener("click", initializeModoFacil);
    }
    if (normalButton) {
        normalButton.addEventListener("click", initializeModoNormal);
    }
    if (hardButton) {
        hardButton.addEventListener("click", initializeModoDificil);
    }
}

// Initialize game controls
function initializeGame() {
    const board = document.getElementById("board");
    const scoreElement = document.getElementById("score");
    
    if (board) {
        // We're on the game page
        return true;
    }
    return false;
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
    // Check which page we're on and initialize accordingly
    if (document.getElementById("letreroInicio")) {
        initializeMenu();
    } else if (document.getElementById("board")) {
        initializeGame();
    }
});