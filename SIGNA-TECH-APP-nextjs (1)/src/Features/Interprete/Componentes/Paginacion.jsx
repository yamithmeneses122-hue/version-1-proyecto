"use client";

export default function Paginacion({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-5 flex justify-end" aria-label="Paginación">
      <ul className="flex flex-wrap gap-1.5">
        <li><button className="rounded-lg border border-cyan-500/20 bg-slate-950/50 px-3 py-2 text-xs text-slate-300 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-cyan-500/10" type="button" disabled={page === 1} onClick={() => onChange(page - 1)}>Anterior</button></li>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <li key={number}><button className={`min-w-9 rounded-lg border px-3 py-2 text-xs ${page === number ? "border-cyan-400 text-cyan-300" : "border-cyan-500/20 bg-slate-950/50 text-slate-300 hover:bg-cyan-500/10"}`} type="button" onClick={() => onChange(number)} aria-current={page === number ? "page" : undefined}>{number}</button></li>
        ))}
        <li><button className="rounded-lg border border-cyan-500/20 bg-slate-950/50 px-3 py-2 text-xs text-slate-300 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-cyan-500/10" type="button" disabled={page === totalPages} onClick={() => onChange(page + 1)}>Siguiente</button></li>
      </ul>
    </nav>
  );
}
