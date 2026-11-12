"use client";

export default function EncabezadoPagina({ title, description, action }) {
  return (
    <header className="mb-7 flex flex-col items-start justify-between gap-4 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
      <section className="max-w-3xl">
        <p className="text-[11px] font-extrabold tracking-[0.18em] text-cyan-400">MÓDULO INTÉRPRETE</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">{description}</p>}
      </section>
      {action && <section className="flex gap-2">{action}</section>}
    </header>
  );
}
