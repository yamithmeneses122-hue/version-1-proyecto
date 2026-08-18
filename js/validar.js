document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTOS
    // ==========================================

    const buscador = document.getElementById("buscarSena");
    const items = document.querySelectorAll(".panel .item");
    const botonValidar = document.querySelector(".validar");
    const botonRechazar = document.querySelector(".rechazar");
    const contador = document.getElementById("contadorSenas");


    // ==========================================
    // CONTADOR DE SEÑAS
    // ==========================================

    function actualizarContador() {

        const cantidad = document.querySelectorAll(".panel .item").length;

        if (contador) {
            contador.textContent = cantidad;
        }

    }


    // ==========================================
    // BUSCADOR
    // ==========================================

    if (buscador) {

        buscador.addEventListener("input", function () {

            const texto = buscador.value
                .toLowerCase()
                .trim();

            document.querySelectorAll(".panel .item").forEach(function (item) {

                const palabra = item
                    .querySelector("h4")
                    .textContent
                    .toLowerCase();

                if (palabra.includes(texto)) {

                    item.style.display = "flex";

                } else {

                    item.style.display = "none";

                }

            });

        });

    }


    // ==========================================
    // SELECCIONAR UNA SEÑA
    // ==========================================

    document.querySelectorAll(".panel .item").forEach(function (item) {

        item.addEventListener("click", function () {

            // Quitar selección de todas
            document.querySelectorAll(".panel .item").forEach(function (elemento) {

                elemento.classList.remove("activo");

            });


            // Seleccionar la que recibió el click
            item.classList.add("activo");


            // Obtener información de la seña
            const palabra = item.querySelector("h4").textContent;


            console.log("Seña seleccionada:", palabra);

        });

    });


    // ==========================================
    // BOTÓN VALIDAR
    // ==========================================

    if (botonValidar) {

        botonValidar.addEventListener("click", function () {

            // Buscar la seña seleccionada
            const senaActiva = document.querySelector(".panel .item.activo");


            // Si no hay ninguna seleccionada
            if (!senaActiva) {

                alert("Primero debes seleccionar una seña.");

                return;

            }


            // Obtener nombre de la seña
            const palabra = senaActiva.querySelector("h4").textContent;


            // Mensaje
            alert("La seña '" + palabra + "' fue validada correctamente.");


            // Eliminar de la lista
            senaActiva.remove();


            // Actualizar contador
            actualizarContador();

        });

    }


    // ==========================================
    // BOTÓN RECHAZAR
    // ==========================================

    if (botonRechazar) {

        botonRechazar.addEventListener("click", function () {

            const senaActiva = document.querySelector(".panel .item.activo");


            if (!senaActiva) {

                alert("Primero debes seleccionar una seña.");

                return;

            }


            const palabra = senaActiva.querySelector("h4").textContent;


            alert("La seña '" + palabra + "' fue marcada para corrección.");

        });

    }


    // ==========================================
    // CONTADOR INICIAL
    // ==========================================

    actualizarContador();

});