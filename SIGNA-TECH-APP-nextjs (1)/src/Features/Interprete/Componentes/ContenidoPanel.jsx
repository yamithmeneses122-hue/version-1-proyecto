"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EncabezadoPagina from "./EncabezadoPagina";
import TarjetaEstadistica from "./TarjetaEstadistica";
import InsigniaEstado from "./InsigniaEstado";
import { activityMonthNames, signCategories } from "../data/interpreterData";
import { getHistory, getSigns } from "../funcionalidades/interpreterStorage";

function parseHistoryDate(value) {
  const parts = String(value || "").split("/");
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getMonthlyActivity(history) {
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), index, 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: activityMonthNames[date.getMonth()],
      year: date.getFullYear(),
      count: 0
    };
  });
  const monthsByKey = new Map(months.map((month) => [month.key, month]));

  history.forEach((record) => {
    const date = parseHistoryDate(record.date);
    const month = date && monthsByKey.get(`${date.getFullYear()}-${date.getMonth()}`);
    if (month) month.count += 1;
  });

  return months;
}

export default function ContenidoPanel() {
  const signs = getSigns();
  const history = getHistory();
  const pending = signs.filter((sign) => sign.status === "Pendiente").length;
  const validated = signs.filter((sign) => sign.status === "Validada").length;
  const corrected = signs.filter((sign) => sign.status === "Corregida").length;
  const stats = [
    { label: "Señas registradas", value: signs.length, detail: "En el diccionario", icon: "+", tone: "cyan" },
    { label: "Señas validadas", value: validated, detail: "Aprobadas", icon: "✓", tone: "green" },
    { label: "Corregidas", value: corrected, detail: "Con ajustes aplicados", icon: "✎", tone: "purple" },
    { label: "Pendientes", value: pending, detail: "Requieren revisión", icon: "!", tone: "orange" }
  ];
  const monthlyActivity = getMonthlyActivity(history);
  const maxActivity = Math.max(1, ...monthlyActivity.map((month) => month.count));
  const [animatedCounts, setAnimatedCounts] = useState(() => monthlyActivity.map(() => 0));
  const categoryCounts = signCategories.map((category) => [
    category,
    signs.filter((sign) => sign.category === category).length
  ]);
  const latestActivity = history.slice(0, 5);

  useEffect(() => {
    const targetCounts = monthlyActivity.map((month) => month.count);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimatedCounts(targetCounts);
      return undefined;
    }

    const duration = 1000;
    let frameId;
    const startAnimation = (startTime) => {
      const animate = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        setAnimatedCounts(targetCounts.map((count) => Math.round(count * easedProgress)));
        if (progress < 1) frameId = window.requestAnimationFrame(animate);
      };
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(startAnimation);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <EncabezadoPagina title="Inicio" description="Resumen de la actividad y las tareas pendientes del módulo de intérprete." />
      {pending > 0 && (
        <Link
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.06] px-5 py-4 transition-colors hover:border-cyan-300/60 hover:bg-cyan-400/10"
          href="/interprete/validar"
        >
          <span>
            <strong className="block text-sm text-cyan-200">
              Tienes {pending} {pending === 1 ? "seña pendiente" : "señas pendientes"} de validación
            </strong>
            <small className="mt-1 block text-xs text-slate-400">Abre la cola para revisarlas.</small>
          </span>
          <span className="text-sm font-bold text-cyan-300">Revisar señas →</span>
        </Link>
      )}
      <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen del módulo">
        {stats.map((stat) => <TarjetaEstadistica key={stat.label} {...stat} />)}
      </section>
      <section className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]" aria-label="Indicadores de actividad">
        <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
          <header className="mb-5">
            <h2 className="text-lg font-bold">Actividad mensual</h2>
            <p className="mt-1 text-xs text-slate-400">Señas gestionadas durante los últimos doce meses.</p>
          </header>
          <section className="overflow-x-auto pb-1" aria-label="Gráfico de actividad mensual">
            <section className="flex min-w-[540px] items-end gap-2 sm:gap-3" aria-label="Barras de actividad por mes">
              {monthlyActivity.map((month, index) => {
                const count = animatedCounts[index] ?? 0;
                const barHeight = month.count ? Math.max((count / maxActivity) * 100, count ? 2 : 0) : 0;
                return (
                  <figure className="flex h-64 min-w-0 flex-1 flex-col items-center justify-end gap-2" key={month.key}>
                    <span className="text-[10px] font-semibold tabular-nums text-cyan-200" aria-hidden="true">
                      {count}
                    </span>
                    <span
                      className="min-h-0 w-full max-w-12 origin-bottom rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-300 shadow-lg shadow-cyan-400/10 transition-transform duration-200 ease-out hover:scale-110 active:scale-110"
                      style={{ height: `${barHeight}%` }}
                      role="img"
                      aria-label={`${month.label} ${month.year}: ${month.count} señas gestionadas`}
                      title={`${month.label} ${month.year}: ${month.count} señas gestionadas`}
                    />
                    <figcaption className="text-[11px] text-slate-500">{month.label}</figcaption>
                  </figure>
                );
              })}
            </section>
          </section>
        </article>
        <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
          <header className="mb-5">
            <h2 className="text-lg font-bold">Categorías</h2>
            <p className="mt-1 text-xs text-slate-400">Distribución de señas registradas.</p>
          </header>
          {signs.length ? (
            <ul className="divide-y divide-slate-800">
              {categoryCounts.map(([category, count]) => (
                <li className="flex justify-between py-3 text-sm text-slate-400" key={category}>
                  <span>{category}</span>
                  <strong className="text-cyan-300">{count} ({Math.round((count / signs.length) * 100)}%)</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-slate-500">Aún no hay señas registradas.</p>
          )}
        </article>
      </section>
      <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
        <header className="mb-5 flex items-center justify-between gap-4">
          <section>
            <h2 className="text-lg font-bold">Últimas modificaciones</h2>
            <p className="mt-1 text-xs text-slate-400">Actividad reciente en el diccionario.</p>
          </section>
          <Link className="text-xs font-semibold text-cyan-300 hover:underline" href="/interprete/historial">Ver historial</Link>
        </header>
        {latestActivity.length ? (
          <ul className="divide-y divide-slate-800">
            {latestActivity.map((item) => {
              const sign = signs.find((record) => record.word === item.word);
              return (
                <li className="grid grid-cols-[auto_1fr] items-center gap-3 py-3 sm:grid-cols-[auto_1fr_auto_auto]" key={item.id}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/5" aria-hidden="true">✋</span>
                  <section>
                    <strong className="block text-sm">{item.word}</strong>
                    <small className="text-[11px] text-slate-500">{sign?.category || item.action}</small>
                  </section>
                  <InsigniaEstado status={item.status} />
                  <time className="text-[11px] text-slate-500">{item.date}</time>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-slate-500">Las acciones que realices aparecerán aquí.</p>
        )}
      </article>
    </>
  );
}
