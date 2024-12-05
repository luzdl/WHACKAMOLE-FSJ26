import { initializeModoDificil } from "./Juego/modoDificil.js";
import { initializeModoFacil } from "./Juego/modoFacil.js";
import { initializeModoNormal } from "./Juego/modoNormal.js";
//import { updateHighscoresDisplay } from "./Menu/highScoresController.js";


export let highscores = [];
/*
const storedScores = JSON.parse(localStorage.getItem("highscores")) || [];
highscores.push(...storedScores); // Carga los puntajes al array
updateHighscoresDisplay();
*/

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("botonEmpezar").addEventListener("click", function() {
        document.getElementById("letreroInicio").style.display = "block";
        document.getElementById("botonEmpezar").style.display = "none";
    });

document.getElementById("botonFacil").onclick = function() {
    initializeModoFacil();
};

document.getElementById("botonNormal").onclick = function() {
    initializeModoNormal();
};

document.getElementById("botonDificil").onclick = function() {
    initializeModoDificil(); 
};

});