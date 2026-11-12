"use client";

import Icono from "../../../componentes/compartidos/Icono.jsx";

export default function SeccionConfianza() {
    return (
        <section className="border-y border-white/8 bg-white/[.018]">
            <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-24">
                <header>
                    <hgroup>
                        <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Confianza</p>
                        <h2 className="mt-4 text-4xl font-black tracking-[-.03em] sm:text-5xl">
                            La confianza también se diseña.
                        </h2>
                    </hgroup>
                    <p className="mt-5 text-base leading-8 text-slate-400">
                        Por eso la nueva landing diferencia claramente la propuesta del prototipo de las capacidades que todavía requieren integración o validación.
                    </p>
                </header>

                <ul className="grid gap-4 sm:grid-cols-2">
                    <li>
                        <article className="h-full rounded-3xl border border-white/8 bg-[#111a20] p-6">
                            <Icono name="shield" className="h-6 w-6 text-cyan-300" />
                            <h3 className="mt-5 font-bold">Alcance explícito</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-400">Comunicación básica, cotidiana y educativa como foco del prototipo.</p>
                        </article>
                    </li>
                    <li>
                        <article className="h-full rounded-3xl border border-white/8 bg-[#111a20] p-6">
                            <Icono name="brain" className="h-6 w-6 text-cyan-300" />
                            <h3 className="mt-5 font-bold">Tecnología con propósito</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-400">IA y captura visual aparecen dentro de un flujo entendible, no como decoración.</p>
                        </article>
                    </li>
                    <li>
                        <article className="h-full rounded-3xl border border-white/8 bg-[#111a20] p-6">
                            <Icono name="check" className="h-6 w-6 text-cyan-300" />
                            <h3 className="mt-5 font-bold">Sin métricas inventadas</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-400">Se retiraron cifras promocionales que no estaban verificadas dentro del proyecto.</p>
                        </article>
                    </li>
                    <li>
                        <article className="h-full rounded-3xl border border-white/8 bg-[#111a20] p-6">
                            <Icono name="users" className="h-6 w-6 text-cyan-300" />
                            <h3 className="mt-5 font-bold">Personas primero</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-400">Cada sección responde una pregunta del visitante: qué es, cómo funciona y para qué sirve.</p>
                        </article>
                    </li>
                </ul>
            </section>
        </section>
    );
}