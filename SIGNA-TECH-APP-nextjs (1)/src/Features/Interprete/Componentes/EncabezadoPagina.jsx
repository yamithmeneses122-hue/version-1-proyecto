"use client";

export default function EncabezadoPagina({ title, description, action, compact = false }) {
  const spacing = compact ? "mb-4 gap-2 p-4" : "mb-7 gap-4 p-6";
  const titleSize = compact ? "mt-1 text-2xl md:text-3xl" : "mt-2 text-3xl md:text-5xl";
  const descriptionSize = compact ? "mt-1 text-xs md:text-sm" : "mt-2 text-sm md:text-base";
  return (
    <header className={`${spacing} flex flex-col items-start justify-between rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between`}>
      <section className="max-w-3xl">
        <p className="text-[11px] font-extrabold tracking-[0.18em] text-cyan-400">MÓDULO INTÉRPRETE</p>
        <h1 className={`${titleSize} font-black tracking-tight text-white`}>{title}</h1>
        {description && <p className={`${descriptionSize} max-w-2xl text-slate-300`}>{description}</p>}
      </section>
      {action && <section className="flex gap-2">{action}</section>}
    </header>
  );
}
