"use client";

import InicioSesionComponente from "../Componentes/InicioSesionComponente";
import Link from "next/link";
const fondo = "/images/feactures/fondo1.webp";
const regresar = "/images/feactures/regresar.webp";
const logo = "/images/logo/logoA.webp";

export default function InicioSesionVista() {
    return (
        <>
             <section className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_right,rgba(0,204,255,0.12),transparent_30%),linear-gradient(180deg,rgb(12,18,22),rgb(20,27,31))] font-[Montserrat,Arial,sans-serif]">
      <Link
        className="fixed left-5 top-5 z-10 h-[42px] w-[42px]"
        href="/"
        aria-label="Regresar"
      >
        <img className="h-full w-full" src={regresar} alt="" />
      </Link>

      <main className="flex min-h-screen">
        <section className="relative hidden w-1/2 lg:block" aria-label="Imagen de comunicación inclusiva">
          <img
            className="h-screen w-full object-cover object-center"
            src={fondo}
            alt="Personas comunicándose con lengua de señas"
            style={{
              maskImage: "linear-gradient(to right, #000 0%, #000 76%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 76%, transparent 100%)",
            }}
          />
        </section>

        <section className="flex min-h-screen w-full items-center justify-center px-5 py-6 lg:w-1/2 lg:px-8 lg:py-[4vh]">
          <article className="flex w-full max-w-[530px] flex-col items-center">
            <header className="mb-2 flex flex-col items-center gap-1 text-center sm:mb-3 sm:gap-2">
              <img
                className="h-12 w-auto object-contain shadow-lg shadow-cyan-500/20 sm:h-16"
                src={logo}
                alt="Logotipo de SIGNA-TECH"
              />
              <p className="text-xl font-bold text-cyan-400 sm:text-2xl">SIGNA-TECH-APP</p>
            </header>
            <InicioSesionComponente />
          </article>
        </section>
      </main>
    </section>
        </>
    );
}
