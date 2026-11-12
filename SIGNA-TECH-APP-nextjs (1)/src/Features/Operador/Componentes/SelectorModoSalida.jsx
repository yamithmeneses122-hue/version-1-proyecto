"use client";

import {
  Bars3BottomLeftIcon,
  LanguageIcon,
  SpeakerWaveIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function SelectorModoSalida({ modoActual, onSelectModo }) {
  const modos = [
    { id: 'texto', label: 'Texto', icon: Bars3BottomLeftIcon },
    { id: 'escuchar', label: 'Escuchar', icon: SpeakerWaveIcon },
    { id: 'avatar', label: 'Avatar', icon: UserCircleIcon },
  ];

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-200">
        <LanguageIcon className="h-5 w-5 text-cyan-300" />
        Modos de salida
      </h4>
      <nav className="flex flex-wrap items-center gap-2" aria-label="Modos de salida">
        {modos.map((modo) => {
          const Icono = modo.icon;
          const active = modoActual === modo.id;

          return (
            <button
              key={modo.id}
              type="button"
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                active
                  ? 'border-cyan-400 bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
                  : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-200'
              }`}
              onClick={() => onSelectModo(modo.id)}
              aria-pressed={active}
            >
              <Icono className="h-4 w-4" />
              {modo.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
