"use client";

const styles = {
  Validada: "bg-emerald-400/10 text-emerald-300",
  Pendiente: "bg-orange-400/10 text-orange-300",
  Rechazada: "bg-rose-400/10 text-rose-300",
  Corregida: "bg-violet-400/10 text-violet-300"
};

export default function InsigniaEstado({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status] || "bg-white/10 text-slate-300"}`}>{status}</span>;
}
