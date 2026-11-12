"use client";

import Link from "next/link";
import Icono from "../../../componentes/compartidos/Icono.jsx";

export default function PanelDescarga() {
    return (
        <section className="mx-auto max-w-[1200px] px-5 py-10 lg:px-10">
            <article className="flex flex-col gap-6 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[.045] p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
                
                <header>
                    <span className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">Profundiza</span>
                    <h2 className="mt-3 text-2xl font-black">¿Quieres conocer el alcance real del proyecto?</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                        Visita la ficha de producto para revisar funciones, alcance y componentes contemplados por la propuesta.
                    </p>
                </header>

                <Link href="/product#descarga" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#00CCFF] to-[#099DCB] px-6 font-bold text-white transition hover:-translate-y-1">
                    Ver ficha del producto <Icono name="arrow" className="h-5 w-5" />
                </Link>
            </article>
        </section>
    );
}   