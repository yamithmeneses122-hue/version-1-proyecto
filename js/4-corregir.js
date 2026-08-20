// editar y guardar 
const botonesEditar = document.querySelectorAll("td button");
botonesEditar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const fila = boton.parentElement.parentElement;
        const campos = fila.children;

        campos[0].contentEditable = campos[0].contentEditable !== "true";
        campos[1].contentEditable = campos[1].contentEditable !== "true";
        campos[2].contentEditable = campos[2].contentEditable !== "true";
        campos[3].contentEditable = campos[3].contentEditable !== "true";

        boton.textContent = campos[0].contentEditable === "true"
            ? "Guardar"
            : "Editar";

    });

});

// cambio de estado de activo a inactivo 
const estados = document.querySelectorAll("td.activo");

estados.forEach(function (estado) {

    estado.addEventListener("click", function () {

        const cambios = {
            "Activa": ["Inactiva", "red"],
            "Inactiva": ["Activa", "green"]
        };

        const nuevoEstado = cambios[estado.textContent.trim()];

        estado.textContent = nuevoEstado[0];
        estado.style.color = nuevoEstado[1];

    });

});