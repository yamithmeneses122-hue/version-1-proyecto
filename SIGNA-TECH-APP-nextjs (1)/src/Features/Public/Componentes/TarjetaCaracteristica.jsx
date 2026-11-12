"use client";

import Icono from "../../../componentes/compartidos/Icono.jsx";

const features = [
    ["brain", "Reconocimiento asistido", "La propuesta incorpora IA dentro del flujo de interpretación, con un alcance centrado en señas básicas."],
    ["message", "Comunicación en tiempo real", "La interfaz organiza entradas y resultados para que la conversación se entienda de un vistazo."],
    ["camera", "Captura visual", "El producto contempla cámara como entrada para el flujo de señas."],
    ["book", "Diccionario LSC", "El ecosistema incluye un espacio para consultar vocabulario y apoyar la validación."],
    ["users", "Panel de intérprete", "La documentación contempla revisión, corrección y consulta de información del diccionario."],
    ["shield", "Accesibilidad", "La experiencia visual prioriza contraste, jerarquía, foco visible y adaptación a distintas pantallas."],
];

export default function TarjetaCaracteristica() {
    return (
        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <header className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Capacidades</span>
                <h2 className="mt-4 text-4xl font-black tracking-[-.03em] sm:text-5xl">
                    Todo empieza por una experiencia fácil de entender.
                </h2>
            </header>

            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {features.map(([icon, title, description], index) => (
                    <li
                        key={title}
                        className={`${index === 0 ? "lg:col-span-2" : ""} ${index === 5 ? "lg:col-span-2" : ""}`}
                    >
                        <article className="h-full rounded-[2rem] border border-white/8 bg-white/[.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25">
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                                <Icono name={icon} className="h-6 w-6" />
                            </span>
                            <h3 className="mt-6 text-xl font-bold">{title}</h3>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">{description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}