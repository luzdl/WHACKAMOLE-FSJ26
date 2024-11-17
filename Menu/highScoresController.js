import { highscores } from "../main";

document.addEventListener("DOMContentLoaded", function() {
    const storedScores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(...storedScores); // Carga los puntajes al array
    updateHighscoresDisplay();
});

export function sendScoreToMain(score) {
    // Agrega el nuevo puntaje a la lista de highscores
    highscores.push(score);
    
    // Ordena los puntajes de mayor a menor
    highscores.sort((a, b) => b - a);
    
    // Mantiene solo los 10 mejores puntajes
    if (highscores.length > 10) {
        highscores.pop();  // Elimina el puntaje más bajo si hay más de 10
    }
    
    // Llama a la función que muestra los puntajes en pantalla
    localStorage.setItem("highscores", JSON.stringify(highscores)); // Guarda los puntajes
    updateHighscoresDisplay();
}

export function updateHighscoresDisplay() {
    // Encuentra el elemento HTML donde se mostrarán los puntajes
    let highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";  // Limpia la lista actual de puntajes

    // Crea y añade cada puntaje a la lista en el HTML
    highscores.forEach((highScore, index) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${index + 1}: ${highScore}`;
        highScoresList.appendChild(listItem);
    });
}

// Muestra los puntajes al finalizar el juego
export function showGameOverScreen(score) {
    sendScoreToMain(score); // Actualiza los puntajes
    document.getElementById("gameOverMessage").style.display = "block";
    document.getElementById("score").innerText = "Final Score: " + score;

    // Actualiza la lista de highscores en el div de Game Over
    updateHighscoresDisplay();
}
