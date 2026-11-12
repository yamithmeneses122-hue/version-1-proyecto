"use client";

import NuevaCuentaComponente from "../Componentes/NuevaCuentaComponente";
import Link from "next/link";
const fondo = "/images/feactures/fondo2.jpeg";
const regresar = "/images/feactures/regresar.png";

export default function NuevaCuentaVista() {
    return (
        <>
          <section className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-black/75 px-4 py-3 font-[Montserrat,Arial,sans-serif] sm:px-6 sm:py-5">
      <img
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-55"
        src={fondo}
        alt=""
        aria-hidden="true"
      />

      <Link className="fixed left-5 top-5 z-10 h-[42px] w-[42px]" href="/login" aria-label="Regresar al inicio de sesión">
        <img className="h-full w-full" src={regresar} alt="" />
      </Link>

      <NuevaCuentaComponente />
    </section>
        </>
    );
}
