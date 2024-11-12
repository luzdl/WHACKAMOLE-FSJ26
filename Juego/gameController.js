let currMoleTile;
let currPlanTile
let score = o;
let gameOver = false;


window.onload = function() {
    setGame()
}

function setGame() {
    for (let i = 0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id + i.toString();
        tile.addEventListener("click", selectTile)
        document.getElementById("board"). appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPLant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){
    if (gameOver){
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML == "";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlanTile && currMoleTile.id == num){
        return;
    }


    currMoleTile = document.getElementsById(num);
    currMoleTile.appendChild(mole);
}

function setPLant() {
    if (gameOver){
        return;
    }

    if (currPlanTile){
        currPlanTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png"

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num){
        return;
    }
    currPlanTile = document.getElementById(num);
    currPlanTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }

    if (this ==currMoleTile){
        score += 10;
        document.getElementsById("score").innerText = score.toString
    }
    else if (this == currPlanTile) {
        document.getElementById("score").innerText = "Game Over: " + score.toString();
        gameOver = true;
    }
}