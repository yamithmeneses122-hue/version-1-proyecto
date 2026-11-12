"use client";

import { useState } from 'react';

export default function SelectorOptimizacionIA() {
  const [modoSeleccionado, setModoSeleccionado] = useState('rapido');

  const modos = [
    {
      id: 'rapido',
      label: 'Rápido',
      resumen: 'Menor consumo',
      desc: '⚡ Modo Rápido: Optimizado para hardware de bajos recursos. Respuesta instantánea con una tasa de muestreo reducida.',
    },
    {
      id: 'equilibrado',
      label: 'Equilibrado',
      resumen: 'Recomendado',
      desc: '⚖️ Modo Equilibrado: Balance perfecto entre precisión léxica y consumo de FPS (Recomendado).',
    },
    {
      id: 'precision',
      label: 'Precisión',
      resumen: 'Mayor detalle',
      desc: '🎯 Alta Precisión: Carga el modelo completo de redes neuronales profundas. Requiere mayor capacidad de procesamiento.',
    },
  ];

  const modoActual = modos.find((modo) => modo.id === modoSeleccionado) || modos[0];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="group" aria-label="Modo de optimización de IA">
        {modos.map((modo) => (
          <button
            key={modo.id}
            type="button"
            aria-pressed={modoSeleccionado === modo.id}
            className={`flex min-h-20 w-full flex-col items-start justify-center gap-1 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
              modoSeleccionado === modo.id
                ? 'border-cyan-400 bg-cyan-600 text-white shadow-[0_0_18px_rgba(34,211,238,0.2)] theme-light:border-cyan-300 theme-light:bg-cyan-50 theme-light:text-cyan-800 theme-light:shadow-[0_0_12px_rgba(6,182,212,0.12)]'
                : 'border-slate-700 bg-slate-950/60 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white theme-light:border-slate-200 theme-light:bg-white theme-light:text-slate-700 theme-light:hover:border-cyan-300 theme-light:hover:bg-cyan-50 theme-light:hover:text-cyan-800'
            }`}
            onClick={() => setModoSeleccionado(modo.id)}
          >
            <span className="text-sm font-bold">{modo.label}</span>
            <span className={`text-xs ${modoSeleccionado === modo.id ? 'text-cyan-100 theme-light:text-cyan-700' : 'text-slate-400 theme-light:text-slate-500'}`}>
              {modo.resumen}
            </span>
          </button>
        ))}
      </div>

      <section
        className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-300 theme-light:border-cyan-200 theme-light:bg-cyan-50 theme-light:text-slate-700"
        id="txt-descripcion-ia"
        aria-live="polite"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-300 theme-light:text-cyan-700">
          Modo seleccionado: {modoActual.label}
        </p>
        <p>{modoActual.desc}</p>
      </section>
    </section>
  );
}