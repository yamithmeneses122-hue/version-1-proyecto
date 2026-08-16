(function () {
    "use strict";
    const ready = (fn) => document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn();
    const notice = (message, type) => window.SignaTech ? SignaTech.notify(message, type) : alert(message);

    function textToSpeech() {
        const input = document.getElementById("texto-sintesis");
        const play = document.getElementById("btn-reproducir");
        const stop = document.getElementById("btn-detener");
        const status = document.getElementById("txt-estado-audio");
        if (!input || !play || !stop) return;
        const setState = (text, speaking) => {
            status.textContent = text;
            play.disabled = speaking;
            stop.disabled = !speaking;
            document.getElementById("onda-sonido")?.classList.toggle("activo", speaking);
        };
        play.addEventListener("click", () => {
            const text = input.value.trim();
            if (!text) return notice("Escribe un mensaje para reproducir.", "error");
            if (!("speechSynthesis" in window)) return notice("Este navegador no permite sintetizar voz.", "error");
            window.speechSynthesis.cancel();
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = "es-CO";
            speech.rate = Number(SignaTech.storage.get("speechRate", 1));
            speech.onend = () => setState("Sintetizador en espera...", false);
            speech.onerror = () => { setState("No fue posible reproducir el audio.", false); notice("No fue posible reproducir el audio.", "error"); };
            setState("Reproduciendo audio...", true);
            window.speechSynthesis.speak(speech);
        });
        stop.addEventListener("click", () => { window.speechSynthesis?.cancel(); setState("Reproducción detenida.", false); });
    }

    function speechToText() {
        const start = document.getElementById("btn-escuchar");
        const stop = document.getElementById("btn-detener");
        const output = document.getElementById("txt-transcripcion-vivo");
        const status = document.getElementById("txt-estado-audio");
        if (!start || !stop || !output || !status) return;
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition;
        const idle = (message) => { status.textContent = message; start.disabled = false; stop.disabled = true; };
        start.addEventListener("click", () => {
            if (!Recognition) return notice("El reconocimiento de voz no está disponible en este navegador.", "error");
            recognition = new Recognition(); recognition.lang = "es-CO"; recognition.continuous = true; recognition.interimResults = true;
            recognition.onstart = () => { status.textContent = "Escuchando..."; start.disabled = true; stop.disabled = false; };
            recognition.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i += 1) transcript += event.results[i][0].transcript;
                output.textContent = transcript || "Escuchando señales de audio...";
            };
            recognition.onerror = () => idle("No fue posible capturar audio.");
            recognition.onend = () => idle("Sistema en espera...");
            recognition.start();
        });
        stop.addEventListener("click", () => recognition?.stop());
        document.getElementById("btn-copiar")?.addEventListener("click", async () => {
            try { await navigator.clipboard.writeText(output.textContent); notice("Transcripción copiada."); }
            catch (_) { notice("No se pudo copiar el texto.", "error"); }
        });
    }

    function camera() {
        const connect = document.getElementById("btn-vincular");
        const disconnect = document.getElementById("btn-desconectar");
        const video = document.getElementById("video-feed");
        const badge = document.getElementById("live-badge");
        const state = document.getElementById("txt-estado-feed");
        const conversion = document.getElementById("texto-conversion-vivo");
        if (!connect || !disconnect || !video) return;
        let stream;
        const off = () => {
            stream?.getTracks().forEach((track) => track.stop()); stream = undefined; video.srcObject = null;
            badge.textContent = "● DESCONECTADO"; state.textContent = "Esperando vinculación del hardware periférico...";
            connect.disabled = false; disconnect.disabled = true;
            if (conversion) conversion.textContent = "El sistema está apagado. Vincule las gafas para iniciar la interpretación automática de gestos...";
        };
        connect.addEventListener("click", async () => {
            if (!navigator.mediaDevices?.getUserMedia) return notice("La cámara no está disponible en este navegador.", "error");
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                video.srcObject = stream; badge.textContent = "● EN VIVO"; state.textContent = "Cámara vinculada. La detección LSC requiere el modelo de IA del servidor.";
                connect.disabled = true; disconnect.disabled = false;
                if (conversion) conversion.textContent = "Cámara activa. Esperando modelo de reconocimiento LSC...";
            } catch (_) { notice("No fue posible acceder a la cámara. Revisa los permisos.", "error"); }
        });
        disconnect.addEventListener("click", off);
        window.addEventListener("pagehide", off);
        document.querySelectorAll(".btn-modo").forEach((button) => button.addEventListener("click", () => {
            document.querySelectorAll(".btn-modo").forEach((item) => item.classList.remove("active")); button.classList.add("active");
            document.getElementById("panel-salida-texto")?.classList.toggle("modo-oculto", button.id !== "btn-modo-texto");
            document.getElementById("panel-salida-avatar")?.classList.toggle("modo-oculto", button.id !== "btn-modo-avatar");
            if (button.id === "btn-modo-escuchar") window.speechSynthesis?.speak(new SpeechSynthesisUtterance(conversion?.textContent || ""));
        }));
    }

    function dictionary() {
        const input = document.getElementById("input-buscar-seña");
        if (!input) return;
        const cards = Array.from(document.querySelectorAll(".tarjeta-seña, .card-seña, [data-palabra]"));
        input.addEventListener("input", () => {
            const query = input.value.trim().toLocaleLowerCase("es");
            cards.forEach((card) => { card.hidden = Boolean(query) && !card.textContent.toLocaleLowerCase("es").includes(query); });
        });
    }

    function avatar() {
        const form = document.getElementById("form-control-avatar");
        if (!form) return;
        const input = document.getElementById("input-texto-avatar");
        const render = document.getElementById("txt-render-avatar");
        const logs = document.getElementById("consola-logs-avatar");
        const animate = (message) => {
            document.getElementById("ondas-animacion")?.classList.add("activo");
            if (render) render.textContent = "Avatar procesando: “" + message + "”.";
            if (logs) logs.textContent = "[SIMULACIÓN]: Preparando interpretación LSC para: " + message;
            window.setTimeout(() => document.getElementById("ondas-animacion")?.classList.remove("activo"), 4000);
        };
        form.addEventListener("submit", (event) => { event.preventDefault(); const text = input.value.trim(); if (text) { animate(text); input.value = ""; } });
        document.getElementById("btn-audio-avatar")?.addEventListener("click", () => animate("entrada de audio"));
        document.getElementById("btn-video-avatar")?.addEventListener("click", () => animate("entrada de cámara"));
    }

    function settings() {
        const themeForm = document.getElementById("form-selector-tema");
        const selector = document.getElementById("selector-tema-global");
        if (selector) selector.value = SignaTech.storage.get("theme", "oscuro");
        themeForm?.addEventListener("submit", (event) => { event.preventDefault(); SignaTech.storage.set("theme", selector.value); SignaTech.applyTheme(); notice("Apariencia guardada."); });
        document.querySelectorAll(".tarjeta-opcion-ia").forEach((option) => option.addEventListener("click", () => {
            document.querySelectorAll(".tarjeta-opcion-ia").forEach((item) => item.classList.remove("activa")); option.classList.add("activa");
            document.getElementById("txt-descripcion-ia").textContent = option.dataset.desc || ""; SignaTech.storage.set("aiMode", option.dataset.modo);
        }));
        document.querySelectorAll(".formulario-interno-config").forEach((form) => form.addEventListener("submit", (event) => { if (form !== themeForm) { event.preventDefault(); if (form.checkValidity()) notice("Configuración guardada localmente."); } }));
    }

    ready(() => { textToSpeech(); speechToText(); camera(); dictionary(); avatar(); settings(); });
}());
