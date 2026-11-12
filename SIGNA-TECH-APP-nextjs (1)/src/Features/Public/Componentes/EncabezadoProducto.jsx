"use client";

import Link from "next/link";
import Icono from "../../../componentes/compartidos/Icono.jsx";

export default function EncabezadoProducto() {
    return (
        <header className="mx-auto max-w-[1400px] px-5 py-20 text-center lg:px-10 lg:py-28">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Producto</span>
            <h1 className="mx-auto mt-4 max-w-5xl text-5xl font-black tracking-[-.04em] sm:text-6xl lg:text-7xl">
                Comunicación accesible, diseñada para la vida real.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
                SIGNA-TECH-APP conecta voz, texto y Lengua de Señas Colombiana dentro de un prototipo pensado para usuarios, intérpretes y escenarios educativos o cotidianos.
            </p>
            
            <nav aria-label="Acciones del producto" className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/#demo" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#00CCFF] to-[#099DCB] px-6 font-bold">
                    Ver el flujo <Icono name="arrow" className="h-5 w-5" />
                </Link>
                <Link href="/support" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[.04] px-6 font-semibold hover:border-cyan-300/40">
                    Hablar con soporte
                </Link>
            </nav>
        </header>
    );
}