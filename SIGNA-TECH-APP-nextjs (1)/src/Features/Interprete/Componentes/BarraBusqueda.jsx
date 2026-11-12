"use client";

export default function BarraBusqueda({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-cyan-500/20 bg-slate-950 px-3 focus-within:border-cyan-400">
      <span className="text-lg text-slate-500" aria-hidden="true">⌕</span>
      <input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} />
    </label>
  );
}
