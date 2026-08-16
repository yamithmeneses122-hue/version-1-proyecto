/* JavaScript exclusivo de soporte.html */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector("[data-support-form]");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        if (!formulario.checkValidity()) {

            formulario.reportValidity();

            return;
        }

        mostrarMensaje(
            "Solicitud recibida. La conexión con correo se habilitará al integrar el backend."
        );

        formulario.reset();
    });

});


function mostrarMensaje(texto) {

    const mensaje = document.createElement("p");

    mensaje.textContent = texto;

    mensaje.setAttribute("role", "status");

    mensaje.style.cssText = `
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 9999;

        margin: 0;
        padding: 12px 16px;

        max-width: 330px;

        border-radius: 8px;

        color: white;
        background: #087f5b;

        box-shadow: 0 4px 16px #0006;

        font-family: Arial, sans-serif;
    `;

    document.body.appendChild(mensaje);

    setTimeout(function () {

        mensaje.remove();

    }, 3500);
}