"use client";

import { useMemo, useState } from "react";
import EncabezadoPagina from "./EncabezadoPagina";
import Paginacion from "./Paginacion";
import BarraBusqueda from "./BarraBusqueda";
import Filtro from "./Filtro";
import InsigniaEstado from "./InsigniaEstado";
import { getHistory } from "../funcionalidades/interpreterStorage";
import { normalizeText } from "../funcionalidades/interpreterUtils";

export default function ContenidoHistorial() {
  const [query, setQuery] = useState("");
  const [action, setAction] = useState("Todas");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const history = getHistory();
  const filtered = useMemo(() => {
    const text = normalizeText(query);
    return history.filter((item) => {
      const matchesAction = action === "Todas" || item.action === action;
      const searchable = [item.word, item.action, item.user, item.reason, item.changes]
        .map((value) => normalizeText(value))
        .join(" ");
      return matchesAction && (!text || searchable.includes(text));
    });
  }, [history, query, action]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function updateQuery(value) {
    setQuery(value);
    setPage(1);
  }

  function updateAction(value) {
    setAction(value);
    setPage(1);
  }

  return (
    <>
      <EncabezadoPagina title="Historial" description="Consulta las acciones realizadas sobre las señas del sistema." />
      <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4 lg:flex-row lg:items-end">
        <BarraBusqueda value={query} onChange={updateQuery} placeholder="Buscar en historial..." />
        <Filtro label="Acción" value={action} onChange={updateAction} options={[{ value: "Todas", label: "Todas" }, { value: "Validación", label: "Validación" }, { value: "Corrección", label: "Corrección" }, { value: "Revisión", label: "Revisión" }]} />
      </section>
      <section className="overflow-x-auto rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <caption className="mb-3 text-left text-xs text-slate-500">Registro de actividad y motivos registrados</caption>
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-slate-500">
              <th className="border-b border-cyan-500/20 px-3 py-3">Seña</th>
              <th className="border-b border-cyan-500/20 px-3 py-3">Acción</th>
              <th className="border-b border-cyan-500/20 px-3 py-3">Usuario</th>
              <th className="border-b border-cyan-500/20 px-3 py-3">Estado</th>
              <th className="border-b border-cyan-500/20 px-3 py-3">Detalle</th>
              <th className="border-b border-cyan-500/20 px-3 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <th className="border-b border-cyan-500/20 px-3 py-3">{item.word}</th>
                <td className="border-b border-cyan-500/20 px-3 py-3 text-slate-400">{item.action}</td>
                <td className="border-b border-cyan-500/20 px-3 py-3 text-slate-400">{item.user}</td>
                <td className="border-b border-cyan-500/20 px-3 py-3"><InsigniaEstado status={item.status} /></td>
                <td className="max-w-sm border-b border-cyan-500/20 px-3 py-3 text-slate-400">{item.reason || item.changes || "—"}</td>
                <td className="border-b border-cyan-500/20 px-3 py-3 text-slate-400">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="py-8 text-center text-sm text-slate-500">No hay registros para los filtros seleccionados.</p>}
        <Paginacion page={page} totalPages={totalPages} onChange={setPage} />
      </section>
    </>
  );
}
