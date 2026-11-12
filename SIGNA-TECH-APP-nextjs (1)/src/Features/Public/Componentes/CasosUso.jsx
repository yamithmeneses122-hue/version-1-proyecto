"use client";

import Icono from "../../../componentes/compartidos/Icono.jsx";

const cases = [
    ["book", "Educación", "Apoyar interacciones básicas dentro de entornos de aprendizaje y demostraciones del proyecto."],
    ["users", "Servicios y atención", "Facilitar intercambios sencillos donde dos personas necesitan una forma común de expresar una idea."],
    ["message", "Vida cotidiana", "Saludos, frases frecuentes y conversaciones básicas que no deberían sentirse complicadas."],
];

export default function CasosUso() {
    return (
        <section id="casos" className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <header className="max-w-3xl">
                <hgroup>
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Casos de uso</p>
                    <h2 className="mt-4 text-4xl font-black tracking-[-.03em] sm:text-5xl">
                        Empieza por situaciones que las personas reconocen.
                    </h2>
                </hgroup>
                <p className="mt-5 text-base leading-8 text-slate-400">
                    La propuesta gana confianza cuando el visitante puede imaginar inmediatamente dónde tendría sentido usarla.
                </p>
            </header>

            <ul className="mt-12 grid gap-5 lg:grid-cols-3">
                {cases.map(([icon, title, description], index) => (
                    <li key={title} className={index === 1 ? "lg:-translate-y-4" : ""}>
                        <article className="h-full rounded-[2rem] border border-white/8 bg-white/[.025] p-7 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/25">
                            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                                <Icono name={icon} className="h-7 w-7" />
                            </span>
                            <h3 className="mt-7 text-2xl font-bold">{title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}