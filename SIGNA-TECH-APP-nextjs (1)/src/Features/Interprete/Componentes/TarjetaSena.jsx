"use client";

import InsigniaEstado from "./InsigniaEstado";

export default function TarjetaSena({ sign, onSelect, selected }) {
  return (
    <article className={`grid grid-cols-[auto_1fr] gap-3 rounded-2xl border p-3 transition ${selected ? "border-cyan-400/40 bg-cyan-400/5" : "border-cyan-500/20 hover:border-cyan-400/30"}`}>
      <figure className="grid h-16 w-16 place-items-center rounded-xl border border-cyan-500/20 bg-slate-950/80 text-2xl" aria-label={`Vista previa de ${sign.word}`}>
        ✋
      </figure>
      <section className="min-w-0">
        <header className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-bold">{sign.word}</h3>
          <InsigniaEstado status={sign.status} />
        </header>
        <p className="mt-1 text-xs text-slate-400">{sign.category}</p>
        <time className="mt-1 block text-[11px] text-slate-500">{sign.date}</time>
      </section>
      <footer className="col-span-full flex justify-end">
        <button className="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-400/10" type="button" onClick={() => onSelect(sign)} aria-pressed={selected}>{selected ? "Seleccionada" : "Seleccionar"}</button>
      </footer>
    </article>
  );
}
