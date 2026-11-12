"use client";

export default function Filtro({ label, value, onChange, options }) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className="text-[11px] font-semibold text-slate-400">{label}</span>
      <select className="h-11 rounded-xl border border-cyan-500/20 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:border-cyan-400" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
