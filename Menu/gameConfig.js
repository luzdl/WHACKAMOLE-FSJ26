//en teoría este archivo se encarga de llamar a la función de dificultad correspondiente dependiendo del botón que selecciona el usuario en el menú

function modoFacil() {
    document.getElementById("dificultadFacil").addEventListener("click", () => {
        window.location.href = "game.html";
        //creo que aquí se llama a la función que configura el modo 
    });
}

function modoNormal() {
    document.getElementById("dificultadNormal").addEventListener("click", () => {
        window.location.href = "game.html";
        //creo que aquí se llama a la función que configura el modo 
    });
}

function modoDificil() {
    document.getElementById("dificultadDificil").addEventListener("click", () => {
        window.location.href = "game.html";
        //creo que aquí se llama a la función que configura el modo 
    });
}
