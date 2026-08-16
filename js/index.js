/* JavaScript exclusivo de index.html */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MENÚ / HAMBURGUESA
       ===================================================== */

    const botonMenu = document.getElementById("comp-hamburguesa");
    const menu = document.querySelector(".menu-lado");

    if (botonMenu && menu) {

        botonMenu.addEventListener("click", function (evento) {

            evento.stopPropagation();

            menu.classList.toggle("menu-abierto");
            botonMenu.classList.toggle("X-activa");

            const abierto = menu.classList.contains("menu-abierto");

            botonMenu.setAttribute(
                "aria-expanded",
                abierto
            );
        });


        document.addEventListener("click", function (evento) {

            if (
                !menu.contains(evento.target) &&
                !botonMenu.contains(evento.target)
            ) {

                menu.classList.remove("menu-abierto");
                botonMenu.classList.remove("X-activa");

                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }


    /* =====================================================
       CERRAR SESIÓN
       ===================================================== */

    const botonCerrarSesion =
        document.getElementById("btn-logout");

    if (botonCerrarSesion) {

        botonCerrarSesion.addEventListener(
            "click",
            function (evento) {

                const confirmar = confirm(
                    "¿Desea cerrar la sesión operativa?"
                );

                if (!confirmar) {

                    evento.preventDefault();

                } else {

                    localStorage.removeItem(
                        "signa-tech-session"
                    );
                }
            }
        );
    }


    /* =====================================================
       TEMA
       ===================================================== */

    const temaGuardado =
        localStorage.getItem("signa-tech-theme");

    if (temaGuardado === "claro") {

        document.body.classList.add("tema-claro");

    } else {

        document.body.classList.remove("tema-claro");
    }

});