"use client";

import ContraseñaComponent from "../Componentes/ContrasenaComponente.jsx";
import Link from "next/link";
const fondo = "/images/feactures/fondo2.jpeg";
const regresar = "/images/feactures/regresar.png";

export default function ContraseñaView() {
    return (
        <>
            <section className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-black/75 px-4 py-20 font-[Montserrat,Arial,sans-serif]">
        <img
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-55"
          src={fondo}
          alt=""
          aria-hidden="true"
      />

      <Link className="fixed left-5 top-5 z-10 h-[42px] w-[42px]" href="/login" aria-label="Regresar al inicio de sesión">
        <img className="h-full w-full" src={regresar} alt="" />
      </Link>

      <ContraseñaComponent/>
    </section>
        </>
    );
}
