"use client";

import Icono from "../../../componentes/compartidos/Icono.jsx";

const items = [
    ["book", "Enfoque", "Educativo y cotidiano"],
    ["message", "Canales", "Voz, texto y señas básicas"],
    ["users", "Diseño", "Pensado para distintas formas de comunicar"],
];

export default function Estadisticas() {
    return (
        <section className="mx-auto max-w-[1400px] px-5 pb-8 lg:px-10">
            <ul className="grid gap-3 md:grid-cols-3">
                {items.map(([icon, label, value]) => (
                    <li key={label}>
                        <article className="flex h-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[.025] px-5 py-4">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">
                                <Icono name={icon} className="h-5 w-5" />
                            </span>
                            <hgroup>
                                <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-500">{label}</p>
                                <p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
                            </hgroup>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}