"use client";

import Icono from "../../../componentes/compartidos/Icono.jsx";

const items = [
    ["brain", "IA como apoyo", "La tecnología acompaña el flujo de comunicación; no reemplaza el contexto humano."],
    ["mic", "Voz y texto", "Entradas y salidas pensadas para conversaciones sencillas y directas."],
    ["camera", "Cámara preparada", "La experiencia contempla captura visual para el flujo de señas básicas."],
    ["shield", "Diseño responsable", "La interfaz evita promesas técnicas que todavía no estén demostradas."],
];

export default function SeccionTecnologia() {
    return (
        <section id="tecnologias" className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <hgroup className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Tecnología</p>
                    <h2 className="mt-4 text-4xl font-black tracking-[-.03em] sm:text-5xl">
                        Tecnología que transforma vidas cuando se entiende.
                    </h2>
                </hgroup>
                <p className="max-w-xl text-sm leading-7 text-slate-400">
                    En lugar de llenar la página de características, mostramos qué aporta cada pieza y cómo se conecta con la experiencia.
                </p>
            </header>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map(([icon, title, description]) => (
                    <li key={title}>
                        <article className="group h-full rounded-3xl border border-white/8 bg-white/[.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[.04]">
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300 transition group-hover:scale-105">
                                <Icono name={icon} className="h-6 w-6" />
                            </span>
                            <h3 className="mt-6 text-lg font-bold">{title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}