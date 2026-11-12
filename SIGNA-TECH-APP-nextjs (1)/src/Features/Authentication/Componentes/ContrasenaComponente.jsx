"use client";

import Link from "next/link";
export default function ContraseñaComponent() {
  return (
    <article className="relative z-10 w-full max-w-[560px] rounded-[22px] border border-cyan-300/80 bg-slate-800/90 p-7 text-white shadow-[0_0_30px_rgba(34,211,238,0.25)] backdrop-blur-sm sm:p-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-wide text-sky-300 sm:text-4xl">SIGNA-TECH-APP</h1>
        <p className="mt-4 text-lg text-slate-200">Recuperar contraseña</p>
      </header>

      <form className="mt-5 flex flex-col gap-5">
        <fieldset>
          <label className="text-base text-slate-100" htmlFor="recoveryEmail">
            Correo electrónico
          </label>
          <input
            className="mt-1 w-full rounded-[10px] border border-slate-600 bg-slate-700 px-3 py-3 text-white placeholder:text-slate-100 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
            id="recoveryEmail"
            name="email"
            type="email"
            placeholder="tu@gmail.com"
            required
          />
        </fieldset>

        <p className="text-base text-slate-100">Te enviaremos un enlace para restablecer tu contraseña.</p>

        <button
          className="w-full rounded-[8px] bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 px-3 py-3 text-base text-white shadow-[0_4px_10px_rgba(0,0,0,0.35)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          type="submit"
        >
          Enviar enlace de recuperación
        </button>

        <Link className="mx-auto mt-2 text-center text-base text-slate-100 hover:text-cyan-300 hover:underline" href="/login">
          Volver al inicio de sesión
        </Link>
      </form>
    </article>
  );
}
