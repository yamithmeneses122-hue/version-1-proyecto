"use client";

import { useState } from 'react';

export default function SelectorOptimizacionIA() {
  const [modoSeleccionado, setModoSeleccionado] = useState('rapido');
  const [descripcion, setDescripcion] = useState(
    '⚡ Modo Rápido: Optimizado para hardware de bajos recursos. Respuesta instantánea con una tasa de muestreo reducida.'
  );

  const modos = [
    {
      id: 'rapido',
      label: 'Rápido',
      desc: '⚡ Modo Rápido: Optimizado para hardware de bajos recursos. Respuesta instantánea con una tasa de muestreo reducida.',
    },
    {
      id: 'equilibrado',
      label: 'Equilibrado',
      desc: '⚖️ Modo Equilibrado: Balance perfecto entre precisión léxica y consumo de FPS (Recomendado).',
    },
    {
      id: 'precision',
      label: 'Precisión',
      desc: '🎯 Alta Precisión: Carga el modelo completo de redes neuronales profundas. Requiere mayor capacidad de procesamiento.',
    },
  ];

  const handleSelectMode = (modo) => {
    setModoSeleccionado(modo.id);
    setDescripcion(modo.desc);
  };

  return (
    <>
      <nav className="flex flex-col sm:flex-row items-center gap-3">
        {modos.map((modo) => (
          <button
            key={modo.id}
            type="button"
            className={`flex-1 w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md text-center cursor-pointer border ${
              modoSeleccionado === modo.id
                ? 'bg-teal-600 text-white border-teal-500 shadow-teal-500/20'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
            onClick={() => handleSelectMode(modo)}
          >
            {modo.label}
          </button>
        ))}
      </nav>

      <section className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed font-mono" id="txt-descripcion-ia">
        {descripcion}
      </section>
    </>
  );
}