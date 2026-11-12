"use client";

import Icono from "../../../componentes/compartidos/Icono.jsx";

export default function VistaPreviaProducto() {
    return (
        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#10191f] shadow-[0_35px_100px_rgba(0,0,0,.35)]">
                <section className="grid lg:grid-cols-[1.05fr_.95fr]">
                    
                    <figure className="border-b border-white/8 p-7 lg:border-b-0 lg:border-r lg:p-10">
                        <header className="flex items-center justify-between">
                            <hgroup>
                                <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">Vista del producto</p>
                                <h2 className="mt-3 text-3xl font-black">Una interfaz que se explica sola.</h2>
                            </hgroup>
                            <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500 sm:block">Demo visual</span>
                        </header>

                        <figcaption className="mt-8 rounded-3xl border border-white/8 bg-[#0b1115] p-4">
                            <section className="grid gap-4 md:grid-cols-[1.15fr_.85fr]">
                                
                                <article className="rounded-2xl bg-gradient-to-br from-cyan-300/10 to-transparent p-5">
                                    <header className="flex items-center gap-3">
                                        <Icono name="camera" className="h-5 w-5 text-cyan-300" />
                                        <h3 className="text-sm font-bold">Captura visual</h3>
                                    </header>
                                    <figure className="mt-5 grid h-48 place-items-center rounded-2xl border border-dashed border-white/10 bg-black/20">
                                        <span className="grid h-24 w-24 place-items-center rounded-full bg-cyan-300/10 text-cyan-300">
                                            <Icono name="users" className="h-12 w-12" />
                                        </span>
                                    </figure>
                                </article>

                                <article className="rounded-2xl border border-white/8 bg-white/[.025] p-5">
                                    <h3 className="text-xs font-semibold text-slate-500">Resultado</h3>
                                    <section className="mt-5 space-y-3">
                                        <p className="rounded-2xl bg-white/[.04] p-4 text-sm leading-6 text-slate-200">
                                            Hola, mucho gusto.
                                        </p>
                                        <p className="rounded-2xl bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-100">
                                            Mensaje listo para comunicar.
                                        </p>
                                    </section>
                                </article>

                            </section>
                        </figcaption>
                    </figure>

                    <aside className="p-7 lg:p-10">
                        <header>
                            <span className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">Lo importante</span>
                            <h2 className="mt-4 text-3xl font-black">Menos promesas. Más claridad.</h2>
                        </header>
                        
                        <ul className="mt-8 space-y-5">
                            {[
                                "Explica el flujo antes de pedirle algo al usuario.",
                                "Muestra el producto en lugar de depender de una imagen genérica.",
                                "Mantiene el foco en comunicación básica, cotidiana y educativa.",
                                "Deja claro cuándo una función depende de integraciones posteriores.",
                            ].map((text) => (
                                <li key={text} className="flex gap-3 text-sm leading-7 text-slate-400">
                                    <Icono name="check" className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>

                </section>
            </article>
        </section>
    );
}