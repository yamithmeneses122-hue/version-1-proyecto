"use client";

import Link from "next/link";
import Icono from "../../../componentes/compartidos/Icono.jsx";

function MaquetaProducto() {
    return (
        <figure className="relative mx-auto w-full max-w-[620px]">
            <span className="absolute -inset-8 rounded-[3rem] bg-cyan-400/10 blur-3xl" aria-hidden="true" />
            
            <article className="signa-float relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#111a20]/95 p-3 shadow-[0_35px_100px_rgba(0,0,0,.55)]">
                <section className="rounded-[1.5rem] border border-white/10 bg-[#0b1115] p-5">
                    
                    <header className="flex items-center justify-between border-b border-white/8 pb-4">
                        <section className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/10 font-black text-cyan-300">S</span>
                            <hgroup>
                                <p className="text-sm font-bold">Comunicación</p>
                                <p className="text-xs text-slate-500">Sesión activa</p>
                            </hgroup>
                        </section>
                        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-300">En línea</span>
                    </header>

                    <section className="grid gap-4 py-5 sm:grid-cols-[1.1fr_.9fr]">
                        
                        <article className="rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[.08] to-transparent p-4">
                            <header className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-cyan-200">Entrada</span>
                                <Icono name="camera" className="h-4 w-4 text-cyan-300" />
                            </header>
                            <figure className="mt-4 grid h-40 place-items-center rounded-xl border border-dashed border-white/10 bg-black/20">
                                <span className="signa-pulse grid h-20 w-20 place-items-center rounded-full bg-cyan-300/10 text-cyan-300">
                                    <Icono name="users" className="h-10 w-10" />
                                </span>
                            </figure>
                            <footer className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                                <span className="h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />
                                Cámara preparada
                            </footer>
                        </article>

                        <article className="rounded-2xl border border-white/8 bg-white/[.025] p-4">
                            <span className="text-xs font-semibold text-slate-400">Interpretación</span>
                            <section className="mt-4 space-y-3">
                                <p className="rounded-xl bg-white/[.04] p-3 text-sm text-slate-300">Hola, ¿cómo estás?</p>
                                <p className="ml-7 rounded-xl bg-cyan-300/10 p-3 text-sm text-cyan-100">Mensaje listo para comunicar</p>
                            </section>
                            <footer className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                                <Icono name="brain" className="h-4 w-4 text-cyan-300" />
                                Flujo asistido por IA
                            </footer>
                        </article>
                    </section>

                    <footer className="relative overflow-hidden rounded-xl border border-white/8 bg-white/[.025] px-4 py-3 text-xs text-slate-400">
                        <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent signa-signal" aria-hidden="true" />
                        Voz ↔ texto ↔ señas básicas
                    </footer>
                </section>
            </article>

            <aside className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-[#131e24] px-4 py-3 shadow-2xl sm:block">
                <section className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">
                        <Icono name="message" className="h-4 w-4" />
                    </span>
                    <hgroup>
                        <p className="text-xs font-bold">Comunicación clara</p>
                        <p className="text-[11px] text-slate-500">Pensada para situaciones reales</p>
                    </hgroup>
                </section>
            </aside>
        </figure>
    );
}

export default function Portada() {
    return (
        <section className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-28">
            <article>
                <header>
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.06] px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-cyan-200">
                        <span className="h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />
                        Tecnología que traduce inclusión
                    </span>

                    <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.04em] text-white sm:text-6xl lg:text-[5.4rem]">
                        Conecta.
                        <span className="block text-cyan-300">Comprende.</span>
                        <span className="block">Comunica.</span>
                    </h1>
                </header>

                <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                    SIGNA-TECH-APP propone un puente digital entre voz, texto y Lengua de Señas Colombiana
                    para facilitar conversaciones básicas en contextos cotidianos y educativos.
                </p>

                <nav aria-label="Acciones principales" className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/product"
                        className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#00CCFF] to-[#099DCB] px-7 font-bold text-white shadow-[0_18px_45px_rgba(0,204,255,.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,204,255,.3)]"
                    >
                        Explorar el producto
                        <Icono name="arrow" className="h-5 w-5" />
                    </Link>
                    <a
                        href="#demo"
                        className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/12 bg-white/[.035] px-7 font-semibold text-slate-200 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-white"
                    >
                        Ver cómo funciona
                    </a>
                </nav>

                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
                    <li className="flex items-center gap-2"><Icono name="check" className="h-4 w-4 text-cyan-300" />Enfoque educativo y cotidiano</li>
                    <li className="flex items-center gap-2"><Icono name="check" className="h-4 w-4 text-cyan-300" />Experiencia web responsive</li>
                    <li className="flex items-center gap-2"><Icono name="check" className="h-4 w-4 text-cyan-300" />Diseñada para reducir barreras</li>
                </ul>
            </article>

            <MaquetaProducto />
        </section>
    );
}