let hihgscore =// Variables para el temporizador y niveles de dificultad
let timeLeft ;
let difficulty = "easy"; // Valores posibles: "easy", "normal", "hard"

// Inicializa el juego con el nivel de dificultad seleccionado
function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();

    switch (difficulty) {
        case "easy":
            timeLeft = 60; // 60 segundos para el modo fácil
            break;
        case "normal":
            timeLeft = 45; // 45 segundos para el modo normal
            break;
        case "hard":
            timeLeft = 30; // 30 segundos para el modo difícil
            break;
    }
    document.getElementById("timer").innerText = timeLeft.toString();
    setGame();
    startTimer();
}

// Temporizador que disminuye el tiempo y finaliza el juego cuando llega a cero
function startTimer() {
    let timerInterval = setInterval(() => {
        if (gameOver || timeLeft <= 0) {
            clearInterval(timerInterval);
            if (timeLeft <= 0) {
                document.getElementById("score").innerText = "Game Over: " + score.toString();
                saveHighScore(score);
            }
            gameOver = true;
        } else {
            timeLeft--;
            document.getElementById("timer").innerText = timeLeft.toString();
        }
    }, 1000);
}

// Modifica los puntos por golpe según el nivel de dificultad
function selectTile() {
    if (gameOver) {
        return;
    }

    if (this === currMoleTile) {
        switch (difficulty) {
            case "easy":
                score += 1;
                break;
            case "normal":
                score += 2;
                break;
            case "hard":
                score += 3;
                break;
        }
        document.getElementById("score").innerText = score.toString();
    } else if (this === currPlanTile) {
        document.getElementById("score").innerText = "Game Over: " + score.toString();
        saveHighScore(score);
        gameOver = true;
    }
}

// Función para guardar el puntaje en el sistema de high scores
function saveHighScore(finalScore) {
    // Suponiendo que highScores es un array almacenado en localStorage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(finalScore);
    highScores.sort((a, b) => b - a); // Ordena de mayor a menor
    highScores = highScores.slice(0, 3); // Mantiene los 3 mejores puntajes
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
