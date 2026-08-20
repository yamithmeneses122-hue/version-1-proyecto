const correo = document.querySelector("#email");
const boton = document.querySelector(".btn-contraseña");

boton.addEventListener("click", (evento) => {
    correo.value.trim() === "" &&
    (evento.preventDefault(), alert("Por favor, llena el campo del correo electrónico"));
});