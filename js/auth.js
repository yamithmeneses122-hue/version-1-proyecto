(function () {
    "use strict";
    const ready = (fn) => document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn();
    const notice = (message, type) => window.SignaTech ? SignaTech.notify(message, type) : alert(message);
    const emailOk = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    ready(() => {
        const page = location.pathname.split("/").pop();
        const form = document.querySelector("form");
        if (!form) return;

        if (page === "login.html") {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const email = form.querySelector("[name='email']").value.trim();
                const password = form.querySelector("[name='password']").value;
                if (!emailOk(email) || !password) return notice("Ingresa un correo y una contraseña válidos.", "error");
                const users = SignaTech.storage.get("users", []);
                const user = users.find((item) => item.email === email);
                if (user && user.password !== password) return notice("La contraseña no coincide.", "error");
                SignaTech.storage.set("session", { email, name: user ? user.name : email.split("@")[0] });
                location.href = "./inicio.html";
            });
        }

        if (page === "nv_cuenta.html") {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const name = form.querySelector("[name='name']").value.trim();
                const email = form.querySelector("[name='email']").value.trim();
                const password = form.querySelector("[name='password']").value;
                const confirmation = form.querySelector("[name='confirmation']").value;
                if (!name || !emailOk(email) || password.length < 8) return notice("Completa los datos y usa una contraseña de al menos 8 caracteres.", "error");
                if (password !== confirmation) return notice("Las contraseñas no coinciden.", "error");
                const users = SignaTech.storage.get("users", []);
                if (users.some((item) => item.email === email)) return notice("Ya existe una cuenta con este correo.", "error");
                users.push({ name, email, password });
                SignaTech.storage.set("users", users);
                notice("Cuenta creada. Ahora puedes iniciar sesión.");
                window.setTimeout(() => { location.href = "./login.html"; }, 800);
            });
        }

        if (page === "contrasena.html") {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const email = form.querySelector("[name='email']").value.trim();
                if (!emailOk(email)) return notice("Ingresa un correo válido.", "error");
                notice("Solicitud registrada. La integración de correo requiere un servidor seguro.");
            });
        }
    });
}());
