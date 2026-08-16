/* JavaScript exclusivo de producto.html */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // Botones de navegación
    const botones = document.querySelectorAll(".btn-publico");

    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            console.log("Botón seleccionado:", boton.textContent.trim());

        });

    });

});