// animación de las barras de la gráfica
const grafica = document.querySelector(".grafica");
const barras = grafica.querySelectorAll(".barras li");

// Movimiento de las barras al entrar al cuadro
grafica.addEventListener("mouseenter", function () {

    barras.forEach(function (barra) {

        barra.style.transition = "transform 0.4s ease";
        barra.style.transform = "translateY(-8px)";

    });

});

// Regresar las barras al salir del cuadro
grafica.addEventListener("mouseleave", function () {

    barras.forEach(function (barra) {

        barra.style.transform = "translateY(0)";

    });

});

// Movimiento individual 
barras.forEach(function (barra) {

    barra.addEventListener("mouseenter", function () {

        barra.style.transform = "translateY(-15px) scale(1.08)";
        barra.style.boxShadow = "0 0 15px #2563eb";

    });

    barra.addEventListener("mouseleave", function () {

        barra.style.transform = "translateY(-8px)";
        barra.style.boxShadow = "none";

    });

});