let hihgscore = any; // Variables para el temporizador y niveles de dificultad

// Función para guardar el puntaje en el sistema de high scores
function saveHighScore(finalScore) {
    // Suponiendo que highScores es un array almacenado en localStorage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(finalScore);
    highScores.sort((a, b) => b - a); // Ordena de mayor a menor
    highScores = highScores.slice(0, 3); // Mantiene los 3 mejores puntajes
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
