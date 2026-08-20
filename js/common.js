(function () {
    "use strict";

    const storage = {
        get(key, fallback) {
            try {
                const value = localStorage.getItem(key);
                return value === null ? fallback : JSON.parse(value);
            } catch (_) {
                return fallback;
            }
        },
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    window.SignaTech = {
        storage,
        notify(message, type) {
            const notification = document.createElement("div");
            notification.className = "notificacion " + (type || "info");
            notification.textContent = message;
            document.body.appendChild(notification);
            window.setTimeout(() => notification.remove(), 3500);
        },
        applyTheme() {
            document.body.classList.toggle("tema-claro", storage.get("theme", "oscuro") === "claro");
        }
    };

    document.addEventListener("DOMContentLoaded", () => window.SignaTech.applyTheme());
}());
