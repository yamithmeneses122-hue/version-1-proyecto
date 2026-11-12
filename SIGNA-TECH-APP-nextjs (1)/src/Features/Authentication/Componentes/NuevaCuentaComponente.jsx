"use client";

import Link from "next/link";
export default function NuevaCuentaComponente() {
    return (
        <>
           <article className="relative z-10 w-full max-w-[600px] rounded-3xl border border-cyan-300/80 bg-slate-800/90 p-5 shadow-[0_0_30px_rgba(34,211,238,0.25)] backdrop-blur-sm sm:p-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-wide text-sky-300 sm:text-3xl">SIGNA-TECH-APP</h1>
        <p className="mt-2 text-base text-slate-200">Crear nueva cuenta</p>
      </header>

      <form className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        <fieldset className="relative">
          <label className="text-sm text-slate-100" htmlFor="name">
            Nombre completo
          </label>
          <input
            className="mt-1 w-full rounded-[10px] border border-slate-600 bg-slate-700 py-2.5 pl-11 pr-3 text-white placeholder:text-slate-100 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
            id="name"
            name="name"
            type="text"
            placeholder="Angela Garces"
            required
          />
          <svg className="pointer-events-none absolute bottom-2.5 left-3 h-5 w-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </fieldset>

        <fieldset className="relative">
          <label className="text-sm text-slate-100" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="mt-1 w-full rounded-[10px] border border-slate-600 bg-slate-700 py-2.5 pl-11 pr-3 text-white placeholder:text-slate-100 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
            id="email"
            name="email"
            type="email"
            placeholder="tu@gmail.com"
            required
          />
          <svg className="pointer-events-none absolute bottom-2.5 left-3 h-5 w-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </fieldset>

        <fieldset className="relative">
          <label className="text-sm text-slate-100" htmlFor="password">
            Contraseña
          </label>
          <input
            className="mt-1 w-full rounded-[10px] border border-slate-600 bg-slate-700 py-2.5 pl-11 pr-3 text-white placeholder:text-slate-100 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            minLength="8"
            required
          />
          <svg className="pointer-events-none absolute bottom-2.5 left-3 h-5 w-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="8" cy="15" r="3" />
            <path d="m10.2 12.8 7.4-7.4a2.1 2.1 0 0 1 3 3l-7.4 7.4" />
            <path d="m16 8 2 2M14 10l2 2" />
          </svg>
        </fieldset>

        <fieldset className="relative">
          <label className="text-sm text-slate-100" htmlFor="passwordConfirmation">
            Confirmar contraseña
          </label>
          <input
            className="mt-1 w-full rounded-[10px] border border-slate-600 bg-slate-700 py-2.5 pl-11 pr-3 text-white placeholder:text-slate-100 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="••••••••••••"
            minLength="8"
            required
          />
          <svg className="pointer-events-none absolute bottom-2.5 left-3 h-5 w-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="8" cy="15" r="3" />
            <path d="m10.2 12.8 7.4-7.4a2.1 2.1 0 0 1 3 3l-7.4 7.4" />
            <path d="m16 8 2 2M14 10l2 2" />
          </svg>
        </fieldset>

        <button
          className="w-full rounded-[8px] bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 px-3 py-2.5 text-base font-medium text-white shadow-[0_4px_10px_rgba(0,0,0,0.35)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:col-span-2"
          type="submit"
        >
          Crear cuenta
        </button>

        <Link className="mx-auto text-center text-sm text-slate-100 hover:text-cyan-300 hover:underline sm:col-span-2" href="/login">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </form>
    </article>
        </>
    );
}
