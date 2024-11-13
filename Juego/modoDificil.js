let currMoleTiles = []; // Array para manejar múltiples topos
let score = 0;
let gameOver = false;
let timeLeft = 10; // Tiempo de 10 segundos para nivel difícil
let moleInterval = 300; // Intervalo de 300ms para los topos
let maxMoles = 3; // Hasta 3 topos simultáneos

window.onload = function() {
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
    setInterval(setMole, moleInterval); // Los topos aparecerán cada 300ms
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
        } else {
            timeLeft -= 1;
            document.getElementById("timer").innerText = timeLeft + "s";
        }
    }, 1000);
}

