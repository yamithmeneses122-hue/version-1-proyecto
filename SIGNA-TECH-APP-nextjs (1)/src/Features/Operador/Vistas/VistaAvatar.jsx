"use client";

import { useEffect, useRef, useState } from 'react';
import {
  Bars3Icon,
  CheckCircleIcon,
  CpuChipIcon,
  SignalIcon,
  SparklesIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import BarraLateral from '../Componentes/BarraLateral';
import ControlesSenalAvatar from '../Componentes/ControlesSenalAvatar';

const idleMessage = 'Avatar en espera. Listo para recibir flujos...';
const idleLog = '[SISTEMA]: Subsistema cinemático en reposo. Esperando inyección multimodal...';

export default function VistaAvatar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isGesturing, setIsGesturing] = useState(false);
  const [txtRender, setTxtRender] = useState(idleMessage);
  const [consolaLog, setConsolaLog] = useState('[SISTEMA]: Subsistema cinemático mapeado en canal cero. Esperando inyección multimodal...');
  const [bordeLog, setBordeLog] = useState('border-slate-700');
  const timeoutRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const triggerGesticulation = (logMessage, renderMessage) => {
    window.clearTimeout(timeoutRef.current);
    setIsGesturing(true);
    setTxtRender(renderMessage);
    setConsolaLog(`[IA TRADUCTOR]: Mapeando entrada a LSC...\n[CINEMÁTICA]: Ejecutando pista de movimiento.\n${logMessage}`);
    setBordeLog('border-cyan-400/60');

    timeoutRef.current = window.setTimeout(() => {
      setIsGesturing(false);
      setTxtRender(idleMessage);
      setConsolaLog(idleLog);
      setBordeLog('border-slate-700');
    }, 4000);
  };

  const handleTextSubmit = (texto) => {
    triggerGesticulation(
      `[TEXT-INPUT]: Entrada de caracteres -> "${texto}"`,
      `El avatar está representando: "${texto}" con las manos.`
    );
  };

  const handleAudioAction = () => {
    triggerGesticulation(
      '[AUDIO-INPUT]: Canal de voz detectado.',
      'El avatar procesó el audio y lo interpreta con las manos en LSC.'
    );
  };

  const handleVideoAction = () => {
    triggerGesticulation(
      '[VIDEO-INPUT]: Mapeo de imagen activo.',
      'El avatar recibió las señas visuales y responde con las manos en vivo.'
    );
  };

  return (
    <>
      <section className="relative flex min-h-screen overflow-hidden bg-slate-950 text-slate-100">
        <section className="pointer-events-none absolute inset-0">
          <section className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <section className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <section className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </section>

        <BarraLateral isOpen={menuAbierto} onClose={() => setMenuAbierto(false)} />

        <button
          type="button"
          className="fixed left-4 top-4 z-50 rounded-xl border border-cyan-500/30 bg-slate-900/80 p-3 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur md:hidden"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>

        <main className="relative z-10 flex-1 p-5 md:ml-64 md:p-10">
          <section className="mx-auto max-w-7xl space-y-8">
            <header className="flex min-h-[260px] flex-col gap-4 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:min-h-[200px] md:flex-row md:items-center md:justify-between">
              <section>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  <SparklesIcon className="h-3.5 w-3.5" />
                  Laboratorio LSC
                </span>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Avatar 3D</h1>
                <p className="mt-2 text-sm text-slate-300 md:text-base xl:whitespace-nowrap">
                  Visualiza y controla la interpretación de señas mediante señales de texto, audio y video.
                </p>
              </section>
              <aside className="flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-cyan-300 ${isGesturing ? 'animate-pulse bg-cyan-400/30' : 'bg-cyan-400/20'}`}>
                  <SignalIcon className="h-5 w-5" />
                </span>
                <section>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Estado</p>
                  <p className="font-semibold text-white">{isGesturing ? 'Interpretando' : 'Listo para usar'}</p>
                </section>
              </aside>
            </header>

            <section className="grid gap-4 sm:grid-cols-3">
              {[
                ['Estado', isGesturing ? 'En vivo' : 'En espera', SignalIcon],
                ['Modelo', 'LSC v2.4', CpuChipIcon],
                ['Canales', '3 activos', CheckCircleIcon],
              ].map(([label, value, Icono]) => (
                <article key={label} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                  <section className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
                    <Icono className="h-5 w-5 text-cyan-300" />
                  </section>
                  <p className="mt-3 text-2xl font-black text-cyan-300">{value}</p>
                </article>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 shadow-[0_0_30px_rgba(14,165,233,0.12)]">
                <header className="flex items-start justify-between gap-4">
                  <section>
                    <h2 className="text-xl font-bold text-white">Visor de modelado LSC</h2>
                    <p className="mt-1 text-sm text-slate-400">Monitorea la ejecución cinemática del avatar.</p>
                  </section>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${isGesturing ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300 animate-pulse' : 'border-slate-700 bg-slate-950/40 text-slate-400'}`}>
                    {isGesturing ? '● EJECUTANDO' : '● EN ESPERA'}
                  </span>
                </header>

                <figure className={`relative mt-6 flex aspect-video flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border bg-slate-950/80 p-6 shadow-inner transition-colors ${bordeLog}`}>
                  <section className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
                  <section className={`relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-cyan-300/60 bg-cyan-400/10 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all duration-300 ${isGesturing ? 'scale-110 rotate-3 shadow-[0_0_45px_rgba(34,211,238,0.55)]' : ''}`}>
                    <UserCircleIcon className="h-16 w-16" />
                    {isGesturing && <span className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping" />}
                  </section>
                  <figcaption className="relative z-10 max-w-lg text-center text-sm font-medium text-cyan-300">{txtRender}</figcaption>
                </figure>

                <output className={`mt-5 block min-h-24 whitespace-pre-line rounded-2xl border bg-slate-950/80 p-4 font-mono text-xs leading-relaxed text-slate-300 shadow-inner transition-colors ${bordeLog}`}>
                  {consolaLog}
                </output>
              </article>

              <article className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <header className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <CpuChipIcon className="h-7 w-7 text-cyan-300" />
                  <section>
                    <h2 className="text-xl font-bold text-white">Entradas multimodales</h2>
                    <p className="text-sm text-slate-400">Elige una señal para activar el avatar.</p>
                  </section>
                </header>
                <section className="mt-6">
                  <ControlesSenalAvatar
                    onSubmitText={handleTextSubmit}
                    onAudioAction={handleAudioAction}
                    onVideoAction={handleVideoAction}
                  />
                </section>
              </article>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
              {[
                ['Texto a señas', 'Escribe una palabra o frase corta para generar una demostración clara.'],
                ['Audio a señas', 'Usa un micrófono activo y habla cerca de la fuente para mejorar la captura.'],
                ['Video a señas', 'Mantén las manos dentro del encuadre y utiliza iluminación uniforme.'],
              ].map(([title, description], index) => (
                <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-bold text-cyan-300">{index + 1}</span>
                  <h3 className="mt-4 font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
                </article>
              ))}
            </section>
          </section>
        </main>
      </section>
    </>
  );
}
