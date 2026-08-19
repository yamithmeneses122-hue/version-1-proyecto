const formulario = document.querySelector("form");
const botonCrear = document.querySelector(".crear");

const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#email");
const contraseña = document.querySelector("#pass");
const confirmar = document.querySelector("#confirmation");


botonCrear.addEventListener("click", function () {

    const campos = [
        nombre,
        correo,
        contraseña,
        confirmar
    ];

    const mensajes = {
        nombre: "⚠️ Completa el nombre completo",
        email: "⚠️ Completa el correo electrónico",
        pass: "⚠️ Completa la contraseña",
        confirmation: "⚠️ Confirma la contraseña"
    };

    const campoVacio = campos.find(function (campo) {
        return campo.value.trim() === "";
    });

    alert(mensajes[campoVacio?.id] || "Cuenta creada correctamente");
});