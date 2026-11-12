"use client";

import Link from "next/link";
import Logotipo from "./Logotipo.jsx";

export default function EncabezadoProducto() {
    return (
        <header className="fixed left-0 top-0 z-50 w-full border-b border-white/8 bg-[#0c1216]/75 px-5 py-3 backdrop-blur-2xl lg:px-10">
            <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-5">
                <Logotipo />

                <ul className="hidden items-center gap-7 lg:flex">
                    <li><Link href="/" className="text-sm text-slate-300 transition hover:text-cyan-300">Inicio</Link></li>
                    <li><Link href="/product" className="text-sm font-semibold text-cyan-300">Producto</Link></li>
                    <li><Link href="/support" className="text-sm text-slate-300 transition hover:text-cyan-300">Soporte</Link></li>
                </ul>

                <Link
                    href="/login"
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-white/[.04] px-5 text-sm font-bold text-white transition hover:-translate-y-1 hover:border-cyan-300/60"
                >
                    Iniciar sesión
                </Link>
            </nav>
        </header>
    );
}