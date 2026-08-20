const correo = document.querySelector("#email");
const contraseña = document.querySelector("#pass");
const boton = document.querySelector(".btn-login");

boton.addEventListener("click", (evento) => {

    // VALIDAR SI LOS DOS CAMPOS ESTÁN VACÍOS
    if (correo.value.trim() === "" && contraseña.value.trim() === "") {

        evento.preventDefault();
        alert("Por favor, llena los campos de correo y contraseña");

    // VALIDAR SI EL CORREO ESTÁ VACÍO
    } else if (correo.value.trim() === "" && contraseña.value.trim() !== "") {

        evento.preventDefault();
        alert("Por favor, llena el campo de correo");

    // VALIDAR SI LA CONTRASEÑA ESTÁ VACÍA
    } else if (correo.value.trim() !== "" && contraseña.value.trim() === "") {

        evento.preventDefault();
        alert("Por favor, llena el campo de contraseña");

    // LOGIN DEL OPERADOR
    } else if (correo.value.trim() === "operador@sena.com" && contraseña.value.trim() === "1234") {

        evento.preventDefault();
        window.location.href = "../html/inicio.html";



    // LOGIN DEL INTÉRPRETE
    } else if (correo.value.trim() === "interprete@sena.com" && contraseña.value.trim() === "5678") {

        evento.preventDefault();
        window.location.href = "../html/Interprete.html";

    // LOGIN DEL ADMINISTRADOR
    } else if (correo.value.trim() === "admin@sena.com" && contraseña.value.trim() === "9012") {

        evento.preventDefault();
        window.location.href = "../html/Inicio_admin.html.html";

    // CORREO O CONTRASEÑA INCORRECTOS
    } else {

        evento.preventDefault();
        alert("Correo o contraseña incorrectos");
    }
});