"use client";

import { useMemo, useState } from 'react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ClipboardDocumentIcon,
  MicrophoneIcon,
  SignalIcon,
  SparklesIcon,
  StopIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import BarraLateral from '../Componentes/BarraLateral';
import VisualizadorAudio from '../Componentes/VisualizadorAudio';

export default function VistaVozATexto() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [estadoAudio, setEstadoAudio] = useState('Sistema en espera');
  const [transcripcion, setTranscripcion] = useState(
    'La transcripción aparecerá aquí cuando inicies una captura de voz...'
  );
  const [copiado, setCopiado] = useState(false);

  const wordCount = useMemo(() => {
    if (transcripcion.startsWith('La transcripción')) return 0;
    return transcripcion.trim().split(/\s+/).filter(Boolean).length;
  }, [transcripcion]);

  const handleStartCapture = () => {
    setIsCapturing(true);
    setCopiado(false);
    setEstadoAudio('Capturando audio en vivo');
    setTranscripcion(
      'Escuchando... habla con claridad y el sistema convertirá tu voz en texto en tiempo real.'
    );
  };

  const handleStopCapture = () => {
    setIsCapturing(false);
    setEstadoAudio('Captura pausada');
  };

  const handleClearText = () => {
    setTranscripcion('La transcripción aparecerá aquí cuando inicies una captura de voz...');
    setCopiado(false);
    setEstadoAudio('Sistema en espera');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(transcripcion);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      setEstadoAudio('No se pudo copiar el texto');
    }
  };

  return (
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
            <section className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <SignalIcon className="h-3.5 w-3.5" />
                Centro de Control
              </span>
              <section>
                <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                  Voz a Texto
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                  Convierte conversaciones en texto con una experiencia clara, rápida y accesible.
                </p>
              </section>
            </section>

            <section className="flex w-full items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 shadow-[0_0_20px_rgba(34,211,238,0.15)] md:w-auto">
              <section className={`flex h-10 w-10 items-center justify-center rounded-full text-cyan-300 ${isCapturing ? 'bg-cyan-400/30 animate-pulse' : 'bg-cyan-400/20'}`}>
                <MicrophoneIcon className="h-5 w-5" />
              </section>
              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Micrófono</p>
                <p className="font-semibold text-white">{isCapturing ? 'Escuchando' : 'Listo para usar'}</p>
              </section>
            </section>
          </header>

          <section className="grid gap-6 sm:grid-cols-3">
            {[
              { label: 'Estado', value: isCapturing ? 'En vivo' : 'En espera', icon: SignalIcon },
              { label: 'Palabras', value: wordCount, icon: SparklesIcon },
              { label: 'Precisión', value: '98%', icon: ArrowPathIcon },
            ].map((stat) => {
              const Icono = stat.icon;
              return (
                <article key={stat.label} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                  <section className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                    <Icono className="h-5 w-5 text-cyan-300" />
                  </section>
                  <p className="mt-3 text-2xl font-black text-cyan-300">{stat.value}</p>
                </article>
              );
            })}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
            <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 shadow-[0_0_30px_rgba(14,165,233,0.12)]">
              <section className="flex items-start justify-between gap-4">
                <section>
                  <h2 className="text-xl font-bold text-white">Control de captura</h2>
                  <p className="mt-1 text-sm text-slate-400">Activa el micrófono para comenzar la transcripción.</p>
                </section>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${isCapturing ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300' : 'border-slate-700 bg-slate-950/40 text-slate-400'}`}>
                  {isCapturing ? '● EN VIVO' : '● EN ESPERA'}
                </span>
              </section>

              <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
                <section className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 ${isCapturing ? 'border-cyan-300 bg-cyan-400/20 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.45)]' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'} transition-all`}>
                  <MicrophoneIcon className={`h-10 w-10 ${isCapturing ? 'animate-pulse' : ''}`} />
                </section>
                <p className="mt-4 text-center text-sm font-medium text-cyan-300">{estadoAudio}</p>
                <section className={`mt-4 transition-opacity ${isCapturing ? 'opacity-100' : 'opacity-40'}`}>
                  <VisualizadorAudio />
                </section>
              </section>

              <section className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${isCapturing ? 'cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-500' : 'border border-cyan-400 bg-cyan-500 text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.25)] hover:bg-cyan-300'}`}
                  onClick={handleStartCapture}
                  disabled={isCapturing}
                >
                  <MicrophoneIcon className="h-5 w-5" />
                  Iniciar captura
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${!isCapturing ? 'cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-500' : 'border border-rose-400/60 bg-rose-500/90 text-white hover:bg-rose-400'}`}
                  onClick={handleStopCapture}
                  disabled={!isCapturing}
                >
                  <StopIcon className="h-5 w-5" />
                  Detener
                </button>
              </section>
            </article>

            <article className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <section>
                  <h2 className="text-xl font-bold text-white">Transcripción en vivo</h2>
                  <p className="mt-1 text-sm text-slate-400">Revisa, copia o limpia el resultado de la captura.</p>
                </section>
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
                  <span className={`h-2 w-2 rounded-full ${isCapturing ? 'animate-pulse bg-cyan-300' : 'bg-slate-500'}`} />
                  Procesamiento {isCapturing ? 'activo' : 'inactivo'}
                </span>
              </section>

              <section className="mt-6 min-h-[260px] rounded-2xl border border-slate-700 bg-slate-950/80 p-5 font-mono text-sm leading-7 text-slate-300 shadow-inner">
                <section className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-3 text-xs text-slate-500">
                  <span className="text-cyan-400">signa@voice</span>
                  <span>:</span>
                  <span>transcription.log</span>
                </section>
                <p>{transcripcion}</p>
                {isCapturing && <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" />}
              </section>

              <section className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={handleCopyText} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-3 text-sm font-bold text-cyan-200 transition-all hover:bg-cyan-500/20">
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  {copiado ? '¡Texto copiado!' : 'Copiar texto'}
                </button>
                <button type="button" onClick={handleClearText} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-sm font-bold text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-200">
                  <TrashIcon className="h-5 w-5" />
                  Limpiar
                </button>
              </section>
            </article>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              ['Habla con claridad', 'Mantén una distancia constante del micrófono para mejorar el reconocimiento.'],
              ['Revisa el contexto', 'Puedes copiar el resultado y utilizarlo en cualquier módulo del sistema.'],
              ['Control accesible', 'Los botones cambian de estado para que sepas cuándo el sistema está escuchando.'],
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
  );
}
