"use client";

import Link from "next/link";
import Icono from "../../../componentes/compartidos/Icono.jsx";

export default function LlamadaAccionFinal() {
    return (
        <section className="px-5 pb-24 lg:px-10 lg:pb-32">
            <article className="mx-auto max-w-[1200px] overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[.12] via-white/[.03] to-transparent p-8 text-center shadow-[0_30px_100px_rgba(0,204,255,.08)] sm:p-12 lg:p-16">
                
                <header>
                    <span className="text-xs font-bold uppercase tracking-[.2em] text-cyan-200">El siguiente paso</span>
                    <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-.03em] sm:text-5xl">
                        Si una conversación puede sentirse más cercana, vale la pena construir el puente.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
                        Conoce el producto, descubre su alcance y comparte la propuesta con alguien que pueda imaginarla en su día a día.
                    </p>
                </header>

                <nav aria-label="Acciones principales" className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/product" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#00CCFF] to-[#099DCB] px-7 font-bold text-white transition hover:-translate-y-1">
                        Conocer el producto <Icono name="arrow" className="h-5 w-5" />
                    </Link>
                    <Link href="/support" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/12 bg-white/[.04] px-7 font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-300/40">
                        Ir a soporte
                    </Link>
                </nav>
            </article>
        </section>
    );
}