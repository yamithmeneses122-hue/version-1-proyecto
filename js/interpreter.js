(function () {
    "use strict";
    const ready = (fn) => document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn();
    const notice = (message, type) => window.SignaTech ? SignaTech.notify(message, type) : alert(message);
    ready(() => {
        const search = document.querySelector(".buscador input, .filtros input[type='text']");
        if (search) search.addEventListener("input", () => {
            const query = search.value.toLocaleLowerCase("es");
            document.querySelectorAll(".item, tbody tr, .lista-usuarios").forEach((item) => { item.hidden = !item.textContent.toLocaleLowerCase("es").includes(query); });
        });
        document.querySelectorAll(".panel .item").forEach((item) => item.addEventListener("click", () => {
            document.querySelectorAll(".panel .item").forEach((entry) => entry.classList.remove("activo")); item.classList.add("activo");
            const word = item.querySelector("h4")?.textContent; const target = document.querySelector(".informacion strong");
            if (word && target) target.parentNode.lastChild.textContent = " " + word;
        }));
        document.querySelectorAll(".validar, .rechazar").forEach((button) => button.addEventListener("click", () => {
            const approved = button.classList.contains("validar"); notice(approved ? "Seña validada para revisión." : "Seña marcada para corrección.");
        }));
        document.querySelectorAll(".limpiar").forEach((button) => button.addEventListener("click", () => button.closest("form, .formulario")?.querySelectorAll("input, textarea").forEach((input) => { if (input.type !== "file") input.value = ""; })));
        document.querySelectorAll(".guardar").forEach((button) => button.addEventListener("click", (event) => { event.preventDefault(); notice("Registro guardado para validación."); }));
        document.querySelectorAll(".tabla-señas button").forEach((button) => button.addEventListener("click", () => notice("La edición de la seña se conectará al servicio del diccionario.")));
        document.querySelectorAll(".paginacion button").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll(".paginacion button").forEach((item) => item.classList.remove("activa", "pagina-activa")); button.classList.add("activa", "pagina-activa"); }));
    });
}());
//link para que carguen segun el tipo de necesidad 
var cajita1 = document.querySelector(".cajita-numero")
cajita1.addEventListener("click",()=>{
    window.location.href = "5-historial.html";
})
var cajita4 = document.querySelector(".cajita-numero1")
cajita4.addEventListener("click",()=>{
    window.location.href = "4-corregir.html";
})
var cajita2 = document.querySelector(".cajita-numero.green")
cajita2.addEventListener("click",()=>{
    window.location.href = "5-historial.html";
})
var cajita3 = document.querySelector(".cajita-numero.rojo")
cajita3.addEventListener("click",()=>{
    window.location.href = "2-validar.html";
})

//animacion para las la grafica de barras
document.addEventListener("DOMContentLoaded", function () {

    const barras = document.querySelectorAll(".barra");

    barras.forEach(function (barra, indice) {

        // Guardar la altura original de cada barra
        const altura = getComputedStyle(barra).height;

        // Estado inicial
        barra.style.height = "0px";
        barra.style.opacity = "0";
        barra.style.transform = "scaleY(0)";

        // Animar una por una
        setTimeout(function () {

            barra.style.height = altura;
            barra.style.opacity = "1";
            barra.style.transform = "scaleY(1)";

        }, indice * 150);

    });

});


