"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowPathIcon,
  Bars3Icon,
  BoltIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  PlayIcon,
  SpeakerWaveIcon,
  StopIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import BarraLateral from '../Componentes/BarraLateral';
import VisualizadorAudio from '../Componentes/VisualizadorAudio';

export default function VistaTextoAVoz() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [texto, setTexto] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [estadoAudio, setEstadoAudio] = useState('Sintetizador en espera');
  const [copiado, setCopiado] = useState(false);
  const [velocidad, setVelocidad] = useState(1);
  const [historial, setHistorial] = useState([]);

  const characterCount = texto.length;
  const wordCount = useMemo(
    () => texto.trim().split(/\s+/).filter(Boolean).length,
    [texto]
  );

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleReproducir = () => {
    const mensaje = texto.trim();
    if (!mensaje) {
      setEstadoAudio('Escribe un mensaje antes de reproducir');
      return;
    }

    window.speechSynthesis?.cancel();
    setIsSynthesizing(true);
    setCopiado(false);
    setEstadoAudio('Reproduciendo audio en vivo');

    const utterance = new SpeechSynthesisUtterance(mensaje);
    utterance.lang = 'es-CO';
    utterance.rate = velocidad;
    utterance.onend = () => {
      setIsSynthesizing(false);
      setEstadoAudio('Reproducción finalizada');
    };
    utterance.onerror = () => {
      setIsSynthesizing(false);
      setEstadoAudio('No se pudo reproducir el audio');
    };
    window.speechSynthesis?.speak(utterance);

    setHistorial((items) => [
      { text: mensaje, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ...items,
    ].slice(0, 4));
  };

  const handleDetener = () => {
    window.speechSynthesis?.cancel();
    setIsSynthesizing(false);
    setEstadoAudio('Sintetizador en espera');
  };

  const handleClear = () => {
    handleDetener();
    setTexto('');
    setCopiado(false);
    setEstadoAudio('Sintetizador en espera');
  };

  const handleCopy = async () => {
    if (!texto.trim()) {
      setEstadoAudio('No hay texto para copiar');
      return;
    }

    try {
      await navigator.clipboard.writeText(texto);
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
          <header className="flex flex-col gap-4 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
            <section className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <BoltIcon className="h-3.5 w-3.5" />
                Centro de Control
              </span>
              <section>
                <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">Texto a Voz</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                  Escribe un mensaje y conviértelo en audio de forma rápida, clara y accesible.
                </p>
              </section>
            </section>

            <section className="flex items-center gap-3 self-start rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <section className={`flex h-10 w-10 items-center justify-center rounded-full ${isSynthesizing ? 'animate-pulse bg-cyan-400/30 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
                <SpeakerWaveIcon className="h-5 w-5" />
              </section>
              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Sintetizador</p>
                <p className="font-semibold text-white">{isSynthesizing ? 'Reproduciendo' : 'Listo para usar'}</p>
              </section>
            </section>
          </header>

          <section className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Caracteres', value: characterCount, icon: ClipboardDocumentIcon },
              { label: 'Palabras', value: wordCount, icon: SpeakerWaveIcon },
              { label: 'Velocidad', value: `${velocidad.toFixed(1)}x`, icon: ArrowPathIcon },
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

          <section className="grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
            <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 shadow-[0_0_30px_rgba(14,165,233,0.12)]">
              <section className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <section>
                  <h2 className="text-xl font-bold text-white">Mensaje a sintetizar</h2>
                  <p className="mt-1 text-sm text-slate-400">El audio se generará usando la voz disponible en tu dispositivo.</p>
                </section>
                <span className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${isSynthesizing ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300' : 'border-slate-700 bg-slate-950/40 text-slate-400'}`}>
                  {isSynthesizing ? '● EN VIVO' : '● EN ESPERA'}
                </span>
              </section>

              <section className="mt-6">
                <label htmlFor="texto-sintesis" className="sr-only">Mensaje a sintetizar</label>
                <textarea
                  id="texto-sintesis"
                  value={texto}
                  onChange={(event) => setTexto(event.target.value)}
                  placeholder="Escribe aquí la frase que deseas escuchar..."
                  maxLength={500}
                  className="min-h-[220px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/80 p-5 text-base leading-7 text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
                <section className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>{wordCount} palabras</span>
                  <span>{characterCount}/500 caracteres</span>
                </section>
              </section>

              <section className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                <section className="flex items-center justify-between gap-4">
                  <section>
                    <p className="text-sm font-semibold text-white">Velocidad de lectura</p>
                    <p className="mt-1 text-xs text-slate-400">Ajusta el ritmo del sintetizador.</p>
                  </section>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-bold text-cyan-300">{velocidad.toFixed(1)}x</span>
                </section>
                <input
                  aria-label="Velocidad de lectura"
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={velocidad}
                  onChange={(event) => setVelocidad(Number(event.target.value))}
                  className="mt-4 w-full accent-cyan-400"
                />
                <section className="mt-1 flex justify-between text-[11px] text-slate-500">
                  <span>Lento</span>
                  <span>Normal</span>
                  <span>Rápido</span>
                </section>
              </section>

              <section className="mt-6 grid gap-3 sm:grid-cols-3">
                <button type="button" onClick={handleReproducir} disabled={isSynthesizing} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all sm:col-span-2 ${isSynthesizing ? 'cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-500' : 'border border-cyan-400 bg-cyan-500 text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.25)] hover:bg-cyan-300'}`}>
                  <PlayIcon className="h-5 w-5" />
                  Reproducir audio
                </button>
                <button type="button" onClick={handleDetener} disabled={!isSynthesizing} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${!isSynthesizing ? 'cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-500' : 'border border-rose-400/60 bg-rose-500/90 text-white hover:bg-rose-400'}`}>
                  <StopIcon className="h-5 w-5" />
                  Detener
                </button>
              </section>

              <section className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={handleCopy} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-3 text-sm font-bold text-cyan-200 transition-all hover:bg-cyan-500/20">
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  {copiado ? '¡Texto copiado!' : 'Copiar texto'}
                </button>
                <button type="button" onClick={handleClear} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-sm font-bold text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-200">
                  <TrashIcon className="h-5 w-5" />
                  Limpiar
                </button>
              </section>
            </article>

            <aside className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <section className="flex items-center justify-between">
                <section>
                  <h2 className="text-xl font-bold text-white">Salida de audio</h2>
                  <p className="mt-1 text-sm text-slate-400">Monitoreo del sintetizador.</p>
                </section>
                <ClockIcon className="h-6 w-6 text-cyan-300" />
              </section>

              <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
                <section className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 ${isSynthesizing ? 'animate-pulse border-cyan-300 bg-cyan-400/20 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.45)]' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'}`}>
                  <SpeakerWaveIcon className="h-10 w-10" />
                </section>
                <p className="mt-4 text-center text-sm font-medium text-cyan-300">{estadoAudio}</p>
                <section className={`mt-4 transition-opacity ${isSynthesizing ? 'opacity-100' : 'opacity-40'}`}>
                  <VisualizadorAudio />
                </section>
              </section>

              <section className="mt-6">
                <h3 className="text-sm font-semibold text-slate-300">Historial reciente</h3>
                <section className="mt-3 space-y-2">
                  {historial.length === 0 ? (
                    <p className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-500">Aún no hay reproducciones.</p>
                  ) : (
                    historial.map((item, index) => (
                      <section key={`${item.time}-${index}`} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                        <p className="line-clamp-2 text-sm text-slate-300">{item.text}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                      </section>
                    ))
                  )}
                </section>
              </section>
            </aside>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              ['Escribe con claridad', 'Usa frases cortas y puntuación para obtener una lectura más natural.'],
              ['Ajusta la velocidad', 'Utiliza el control de ritmo para adaptar el audio a cada situación.'],
              ['Reproduce con control', 'Puedes detener el audio en cualquier momento y limpiar el mensaje.'],
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
