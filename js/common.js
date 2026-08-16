/* Funciones compartidas de SIGNA-TECH para las pantallas estáticas. */
(function () {
    "use strict";
    const isInnerPage = /\/html\//.test(location.pathname.replace(/\\/g, "/"));
    const responsivePath = isInnerPage ? "../carpeta-css/responsive.css" : "./carpeta-css/responsive.css";
    if (!document.querySelector("link[href$='responsive.css']")) {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = responsivePath;
        document.head.appendChild(stylesheet);
    }

    const STORAGE_PREFIX = "signa-tech-";
    const storage = {
        get(key, fallback) {
            try {
                const value = localStorage.getItem(STORAGE_PREFIX + key);
                return value === null ? fallback : JSON.parse(value);
            } catch (_) {
                return fallback;
            }
        },
        set(key, value) {
            try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch (_) { /* almacenamiento no disponible */ }
        },
        remove(key) {
            try { localStorage.removeItem(STORAGE_PREFIX + key); } catch (_) { /* almacenamiento no disponible */ }
        }
    };

    function notify(message, type) {
        let region = document.getElementById("signa-tech-notifications");
        if (!region) {
            region = document.createElement("section");
            region.id = "signa-tech-notifications";
            region.setAttribute("aria-live", "polite");
            region.style.cssText = "position:fixed;right:20px;bottom:20px;z-index:9999;max-width:330px;";
            document.body.appendChild(region);
        }
        const item = document.createElement("p");
        item.textContent = message;
        item.style.cssText = "margin:8px 0;padding:12px 16px;border-radius:8px;color:#fff;background:" + (type === "error" ? "#b42318" : "#087f5b") + ";box-shadow:0 4px 16px #0006;font-family:Arial,sans-serif;";
        region.appendChild(item);
        window.setTimeout(() => item.remove(), 3500);
    }

    function applyTheme() {
        const theme = storage.get("theme", "oscuro");
        document.body.classList.toggle("tema-claro", theme === "claro");
    }

    function setupSidebar() {
        const button = document.getElementById("comp-hamburguesa");
        const sidebar = document.querySelector(".menu-lado");
        if (!button || !sidebar) return;
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            sidebar.classList.toggle("menu-abierto");
            button.classList.toggle("X-activa");
            button.setAttribute("aria-expanded", String(sidebar.classList.contains("menu-abierto")));
        });
        document.addEventListener("click", (event) => {
            if (!sidebar.contains(event.target) && !button.contains(event.target)) {
                sidebar.classList.remove("menu-abierto");
                button.classList.remove("X-activa");
                button.setAttribute("aria-expanded", "false");
            }
        });
    }

    function setupLogout() {
        const logout = document.getElementById("btn-logout");
        if (!logout) return;
        logout.addEventListener("click", (event) => {
            if (!window.confirm("¿Desea cerrar la sesión operativa?")) event.preventDefault();
            else storage.remove("session");
        });
    }

    function setupSupportForm() {
        const form = document.querySelector("[data-support-form]");
        if (!form) return;
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.checkValidity()) return form.reportValidity();
            notify("Solicitud recibida. La conexión con correo se habilitará al integrar el backend.");
            form.reset();
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        applyTheme();
        setupSidebar();
        setupLogout();
        setupSupportForm();
    });

    window.SignaTech = { storage, notify, applyTheme };
}());
