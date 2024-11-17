import { showGameOverScreen } from "../Menu/highScoresController";

let currMoleTiles = []; // Array para manejar múltiples topos
let score = 0;
let gameOver = false;
let timeLeft = 30; // Tiempo de 30 segundos para nivel fácil
let moleInterval = 1000; // Intervalo de 1000ms para los topos
let maxMoles = 1; // Solo 1 topo a la vez

export function initializeModoFacil() {
    setGame();
    startTimer();
}

function setGame() {
    for (let i = 0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, moleInterval); // Los topos aparecerán cada 1000ms
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTiles.length < maxMoles) {
        let num = getRandomTile();
        let tile = document.getElementById(num);

        if (!tile.querySelector("img")) {
            let mole = document.createElement("img");
            mole.src = "./moleUp.png"; // Imagen inicial del topo
            mole.addEventListener("click", hitMole);
            tile.appendChild(mole);
            currMoleTiles.push(tile); 
        }
    }
}

function selectTile() {
    if (gameOver) return;
}

function hitMole(event) {
    if (gameOver) return;

    let mole = event.target;
    mole.src = "./moleAuch.png"; // Imagen del topo golpeado
    score += 3;
    document.getElementById("score").innerText = score.toString();

    let tile = mole.parentElement;
    currMoleTiles = currMoleTiles.filter(t => t !== tile);
    tile.innerHTML = ""; // Limpiar el tile
}

function startTimer() {
    let timerInterval = setInterval(function() {
        if (gameOver) {
            clearInterval(timerInterval);
            return;
        }
        if (timeLeft <= 0) {
            gameOver = true;
            document.getElementById("gameOverMessage").style.display = "block";
            document.getElementById("score").innerText = "Final Score: " + score;
            clearInterval(timerInterval);
            showGameOverScreen(score);
        } else {
            timeLeft -= 1;
            document.getElementById("timer").innerText = timeLeft + "s";
        }
    }, 1000);
}
