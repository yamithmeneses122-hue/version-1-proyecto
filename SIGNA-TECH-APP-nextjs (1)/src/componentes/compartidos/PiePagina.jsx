"use client";

import Link from "next/link";
import Icono from "./Icono.jsx";

export default function PiePagina() {
    return (
        <footer className="border-t border-white/8 bg-black/20 px-5 py-14 text-white lg:px-10">
            <section className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
                <article>
                    <section className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">S</span>
                        <span className="font-extrabold tracking-[.16em]">SIGNA-TECH-APP</span>
                    </section>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
                        Tecnología que traduce inclusión. Una propuesta para conectar voz,
                        texto y Lengua de Señas Colombiana en situaciones cotidianas y educativas.
                    </p>
                </article>

                <article>
                    <h2 className="font-bold">Explora</h2>
                    <ul className="mt-4 space-y-3 text-sm text-slate-400">
                        <li><Link href="/" className="transition hover:text-cyan-300">Inicio</Link></li>
                        <li><Link href="/product" className="transition hover:text-cyan-300">Producto</Link></li>
                        <li><Link href="/support" className="transition hover:text-cyan-300">Soporte</Link></li>
                    </ul>
                </article>

                <article>
                    <h2 className="font-bold">La idea</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-400">
                        Reducir barreras de comunicación mediante una experiencia digital clara,
                        accesible y pensada para personas reales.
                    </p>
                </article>
            </section>

            <section className="mx-auto mt-10 flex max-w-[1400px] items-center gap-2 border-t border-white/8 pt-6 text-xs text-slate-500" aria-label="Información del proyecto">
                <Icono name="shield" className="h-4 w-4" />
                <span>Prototipo académico de SIGNA-TECH-APP.</span>
            </section>
        </footer>
    );
}