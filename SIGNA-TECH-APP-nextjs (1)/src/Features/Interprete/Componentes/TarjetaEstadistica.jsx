"use client";

const tones = {
  cyan: "text-cyan-300 bg-cyan-400/10 border-cyan-400/15",
  green: "text-emerald-300 bg-emerald-400/10 border-emerald-400/15",
  purple: "text-violet-300 bg-violet-400/10 border-violet-400/15",
  orange: "text-orange-300 bg-orange-400/10 border-orange-400/15"
};

export default function TarjetaEstadistica({ label, value, detail, icon, tone = "cyan" }) {
  return (
    <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[1.03]">
      <header className="flex items-center gap-3 text-sm text-slate-400">
        <span className={`grid h-9 w-9 place-items-center rounded-xl border ${tones[tone] || tones.cyan}`} aria-hidden="true">{icon}</span>
        <span>{label}</span>
      </header>
      <strong className="mt-4 block text-3xl font-black tracking-tight">{value}</strong>
      {detail && <p className="mt-1 text-xs text-slate-400">{detail}</p>}
    </article>
  );
}
