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
