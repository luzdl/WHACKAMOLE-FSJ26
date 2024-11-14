document.getElementById(botonEmpezar).onclick = function(){
    document.getElementById("letreroIncio").style.display="block";
}
//función que carga los scripts correspondientes al nivel de dificultad seleccionado
function cargarModo(scriptPath) {
    const script = document.createElement("script");
    script.src = scriptPath;
    script.async = true;  
    document.body.appendChild(script);
}

document.getElementById("botonFacil").onclick = function() {
    cargarModo("modoFacil.js");  // Carga el archivo modoFacil.js
};

document.getElementById("botonNormal").onclick = function() {
    cargarModo("modoNormal.js"); // Carga el archivo modoNormal.js
};

document.getElementById("botonDificil").onclick = function() {
    cargarModo("modoDificil.js"); // Carga el archivo modoDificil.js
};