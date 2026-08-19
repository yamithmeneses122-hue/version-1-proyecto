const correo = document.querySelector("#email");
const contraseña = document.querySelector("#pass");
const boton = document.querySelector(".btn-login");

boton.addEventListener("click", (evento) => {

    correo.value.trim() === "" &&
    contraseña.value.trim() === "" &&
    (evento.preventDefault(),
    alert("Por favor, llena los campos de correo y contraseña"));

    correo.value.trim() === "" &&
    contraseña.value.trim() !== "" &&
    (evento.preventDefault(),
    alert("Por favor, llena el campo de correo"));

    correo.value.trim() !== "" &&
    contraseña.value.trim() === "" &&
    (evento.preventDefault(),
    alert("Por favor, llena el campo de contraseña"));
});