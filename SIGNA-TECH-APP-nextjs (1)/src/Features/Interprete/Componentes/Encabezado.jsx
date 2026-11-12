"use client";

import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { getProfile } from "../funcionalidades/interpreterStorage";
import { getInitials } from "../funcionalidades/interpreterUtils";

export default function Encabezado({ onMenu, compact = false }) {
  const [notifications, setNotifications] = useState(false);
  const profile = getProfile();

  if (compact) {
    return (
      <header className="fixed left-4 top-4 z-50 md:hidden">
        <button className="rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xl text-cyan-300 shadow-lg backdrop-blur transition-colors hover:border-cyan-400/50 hover:bg-slate-800" type="button" onClick={onMenu} aria-label="Abrir menú">☰</button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 flex min-h-[72px] items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 backdrop-blur-xl md:justify-end sm:px-6 lg:px-8">
      <button className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 text-xl text-cyan-300 transition-colors hover:border-cyan-400/50 hover:bg-slate-800 md:hidden" type="button" onClick={onMenu} aria-label="Abrir menú">☰</button>
      <section className="relative flex items-center gap-3">
        <button className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition-colors hover:bg-slate-800 hover:text-cyan-300" type="button" onClick={() => setNotifications((value) => !value)} aria-label="Notificaciones" aria-expanded={notifications}>
          <BellIcon className="h-5 w-5" aria-hidden="true" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
        </button>
        {notifications && (
          <aside className="absolute right-14 top-12 w-72 rounded-2xl border border-cyan-500/20 bg-slate-900 p-4 text-white shadow-[0_0_24px_rgba(34,211,238,0.12)]" aria-label="Notificaciones">
            <strong className="text-sm">Notificaciones</strong>
            <p className="mt-2 text-sm leading-6 text-slate-400">Hay señas pendientes de validación.</p>
          </aside>
        )}
        <section className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 font-bold text-cyan-300">{getInitials(profile.name)}</span>
          <span className="hidden sm:block">
            <strong className="block text-sm text-slate-100">{profile.name}</strong>
            <small className="text-xs text-slate-400">Usuario activo</small>
          </span>
        </section>
      </section>
    </header>
  );
}
