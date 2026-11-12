"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import EncabezadoPagina from "./EncabezadoPagina";
import BarraBusqueda from "./BarraBusqueda";
import Filtro from "./Filtro";
import TarjetaSena from "./TarjetaSena";
import InsigniaEstado from "./InsigniaEstado";
import { categoryOptions } from "../data/interpreterData";
import { getSigns } from "../funcionalidades/interpreterStorage";
import { changeSignStatus } from "../funcionalidades/interpreterActions";
import { filterSigns } from "../funcionalidades/interpreterUtils";

const panelClass = "rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)]";

function RecursoSena({ sign }) {
  if (sign.attachment?.type === "video/mp4") {
    return <video className="max-h-72 w-full rounded-xl object-contain" controls src={sign.attachment.data}>{sign.attachment.name}</video>;
  }
  if (sign.attachment?.type?.startsWith("image/")) {
    return <img className="max-h-72 w-full rounded-xl object-contain" src={sign.attachment.data} alt={`Recurso visual para ${sign.word}`} />;
  }
  return <span className="text-7xl" aria-hidden="true">✋</span>;
}

export default function ContenidoValidacion() {
  const [signs, setSigns] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [status, setStatus] = useState("Pendiente");
  const [selected, setSelected] = useState(null);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => { setSigns(getSigns()); }, []);

  const filtered = useMemo(() => filterSigns(signs, query, category, status), [signs, query, category, status]);
  const pendingCount = signs.filter((sign) => sign.status === "Pendiente").length;

  function updateStatus(newStatus, rejectionReason = "") {
    if (!selected) return;
    const updated = changeSignStatus(selected.id, newStatus, "Intérprete", rejectionReason);
    if (!updated) {
      setFeedback("No se pudo actualizar la seña. Recarga la vista e inténtalo de nuevo.");
      return;
    }

    const nextPending = filterSigns(updated, query, category, "Pendiente")
      .find((sign) => sign.id !== selected.id);
    setSigns(updated);
    setSelected(nextPending || null);
    setFeedback(
      nextPending
        ? `"${selected.word}" ${newStatus === "Validada" ? "validada" : "rechazada"}. Se seleccionó la siguiente pendiente.`
        : `"${selected.word}" ${newStatus === "Validada" ? "validada" : "rechazada"}. No quedan más señas pendientes con estos filtros.`
    );
    setRejecting(false);
    setReason("");
  }

  function submitRejection(event) {
    event.preventDefault();
    if (!reason.trim()) {
      setReasonError("Escribe un motivo para registrar el rechazo.");
      return;
    }
    updateStatus("Rechazada", reason);
  }

  return (
    <>
      <EncabezadoPagina title="Validar señas" description="Revisa las nuevas señas y decide si deben formar parte del diccionario." />
      <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4 lg:flex-row lg:items-end" aria-label="Filtros de validación">
        <BarraBusqueda value={query} onChange={setQuery} placeholder="Buscar por palabra..." />
        <Filtro label="Categoría" value={category} onChange={setCategory} options={categoryOptions} />
        <Filtro label="Estado" value={status} onChange={setStatus} options={[{ value: "Pendiente", label: "Pendiente" }, { value: "Todos", label: "Todos" }, { value: "Validada", label: "Validada" }, { value: "Rechazada", label: "Rechazada" }, { value: "Corregida", label: "Corregida" }]} />
      </section>
      {feedback && <p className="mb-4 text-sm text-cyan-200" role="status">{feedback}</p>}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]" aria-label="Validación de señas">
        <article className={panelClass}>
          <header className="mb-5 flex items-center justify-between">
            <section>
              <h2 className="text-lg font-bold">Señas</h2>
              <p className="mt-1 text-xs text-slate-400">{filtered.length} resultado(s).</p>
            </section>
            <strong className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300" aria-label={`${pendingCount} señas pendientes`}>{pendingCount}</strong>
          </header>
          <ul className="space-y-2">
            {filtered.map((sign) => <li key={sign.id}><TarjetaSena sign={sign} selected={selected?.id === sign.id} onSelect={setSelected} /></li>)}
            {!filtered.length && <li className="py-10 text-center text-sm text-slate-500">No hay señas que coincidan con los filtros.</li>}
          </ul>
        </article>
        <article className={panelClass}>
          <header className="mb-5">
            <h2 className="text-lg font-bold">Vista previa</h2>
            <p className="mt-1 text-xs text-slate-400">Información de la seña seleccionada.</p>
          </header>
          {selected ? (
            <>
              <figure className="grid min-h-52 place-items-center overflow-hidden rounded-2xl border border-dashed border-cyan-400/30 bg-slate-900/90 p-3">
                <RecursoSena sign={selected} />
              </figure>
              <section className="mt-5">
                <header className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold">{selected.word}</h2>
                  <InsigniaEstado status={selected.status} />
                </header>
                <dl className="mt-3 grid grid-cols-[110px_1fr] text-sm">
                  <dt className="border-b border-cyan-500/20 py-3 text-slate-500">Categoría</dt><dd className="border-b border-cyan-500/20 py-3">{selected.category}</dd>
                  <dt className="border-b border-cyan-500/20 py-3 text-slate-500">Significado</dt><dd className="border-b border-cyan-500/20 py-3">{selected.meaning}</dd>
                  <dt className="py-3 text-slate-500">Descripción</dt><dd className="py-3 leading-6">{selected.description || "Sin descripción."}</dd>
                </dl>
              </section>
              {selected.status === "Pendiente" && (
                <footer className="mt-5 flex flex-wrap justify-end gap-2">
                  <button className="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-400" type="button" onClick={() => setRejecting(true)}>Rechazar</button>
                  <button className="rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300" type="button" onClick={() => updateStatus("Validada")}>Validar seña</button>
                </footer>
              )}
            </>
          ) : (
            <p className="py-16 text-center text-sm text-slate-500">
              {status === "Pendiente" && pendingCount === 0 ? "No hay señas pendientes por validar." : "Selecciona una seña para ver sus detalles."}
            </p>
          )}
          <Link className="mt-5 inline-block text-xs text-cyan-300 hover:underline" href="/interprete">← Volver al inicio</Link>
        </article>
      </section>
      {rejecting && selected && (
        <dialog className="fixed left-1/2 top-1/2 z-50 w-[min(520px,calc(100%-30px))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-400/30 bg-slate-900 p-6 text-white shadow-2xl backdrop:bg-black/70" open aria-labelledby="rejection-title">
          <form className="grid gap-4" onSubmit={submitRejection}>
            <header>
              <h2 className="text-lg font-bold" id="rejection-title">Indica el motivo del rechazo</h2>
              <p className="mt-1 text-sm text-slate-400">El motivo quedará registrado en el historial de “{selected.word}”.</p>
            </header>
            <label className="grid gap-2 text-xs text-slate-400">
              Motivo
              <textarea className="min-h-28 rounded-xl border border-cyan-500/20 bg-slate-950 p-3 text-sm text-white outline-none focus:border-cyan-400" value={reason} onChange={(event) => { setReason(event.target.value); setReasonError(""); }} required maxLength={500} autoFocus />
              {reasonError && <span className="text-xs text-rose-300" role="alert">{reasonError}</span>}
            </label>
            <footer className="flex justify-end gap-2">
              <button className="rounded-xl border border-cyan-500/20 px-4 py-2.5 text-sm" type="button" onClick={() => { setRejecting(false); setReason(""); setReasonError(""); }}>Cancelar</button>
              <button className="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-400" type="submit">Confirmar rechazo</button>
            </footer>
          </form>
        </dialog>
      )}
    </>
  );
}
