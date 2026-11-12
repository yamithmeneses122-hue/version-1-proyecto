"use client";

import { useEffect, useRef, useState } from 'react';
import {
  ArrowPathIcon,
  Bars3Icon,
  CameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LinkIcon,
  SignalIcon,
  SpeakerWaveIcon,
  StopIcon,
} from '@heroicons/react/24/outline';
import BarraLateral from '../Componentes/BarraLateral';
import SelectorModoSalida from '../Componentes/SelectorModoSalida';

const initialText = 'Vincula las gafas para iniciar la interpretación automática de gestos...';

export default function VistaDeteccionCamara() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conectado, setConectado] = useState(false);
  const [modoSalida, setModoSalida] = useState('texto');
  const [textoConversion, setTextoConversion] = useState(initialText);
  const [errorCamara, setErrorCamara] = useState('');
  const [fps, setFps] = useState(0);
  const [frames, setFrames] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      const stream = video?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!conectado) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setFps(30);
      setFrames((value) => value + 30);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [conectado]);

  const handleVincular = async () => {
    setErrorCamara('');

    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorCamara('Este navegador no permite acceder a la cámara.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setConectado(true);
      setFrames(0);
      setTextoConversion('Interpretando gestos en tiempo real desde el sensor OV5640...');
    } catch {
      setErrorCamara('No se pudo acceder a la cámara. Revisa los permisos del navegador.');
      setConectado(false);
    }
  };

  const handleDesconectar = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setConectado(false);
    setFrames(0);
    setTextoConversion(initialText);
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
                <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">Detección de Cámara</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                  Conecta el sensor, supervisa la señal visual y selecciona cómo interpretar los gestos.
                </p>
              </section>
            </section>

            <section className="flex w-full items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 shadow-[0_0_20px_rgba(34,211,238,0.15)] md:w-auto">
              <section className={`flex h-10 w-10 items-center justify-center rounded-full text-cyan-300 ${conectado ? 'animate-pulse bg-cyan-400/30' : 'bg-cyan-400/20'}`}>
                <CameraIcon className="h-5 w-5" />
              </section>
              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Sensor</p>
                <p className="font-semibold text-white">{conectado ? 'Conectado' : 'Desconectado'}</p>
              </section>
            </section>
          </header>

          <section className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Estado', value: conectado ? 'Online' : 'Offline', icon: SignalIcon },
              { label: 'Señal', value: conectado ? `${fps} FPS` : '--', icon: CameraIcon },
              { label: 'Frames', value: conectado ? frames : '0', icon: ArrowPathIcon },
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
                  <h2 className="text-xl font-bold text-white">Streaming del sensor LSC</h2>
                  <p className="mt-1 text-sm text-slate-400">Monitoreo visual en vivo de la captura de manos.</p>
                </section>
                <span className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${conectado ? 'animate-pulse border-cyan-400/40 bg-cyan-500/10 text-cyan-300' : 'border-rose-400/30 bg-rose-500/10 text-rose-300'}`}>
                  {conectado ? '● CONECTADO' : '● DESCONECTADO'}
                </span>
              </section>

              <figure className="relative mt-6 aspect-video overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-inner">
                <section className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <section className="absolute bottom-4 left-4 z-20 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">
                  OV5640 • {conectado ? '720p activo' : 'sin señal'}
                </section>
                <video ref={videoRef} autoPlay playsInline muted className={`absolute inset-0 h-full w-full object-cover ${conectado ? 'block' : 'hidden'}`} />
                {!conectado && (
                  <section className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <section className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                      <CameraIcon className="h-10 w-10" />
                    </section>
                    <section>
                      <p className="font-semibold text-white">Esperando señal de cámara</p>
                      <p className="mt-1 text-sm text-slate-500">Vincula el sensor para comenzar el monitoreo.</p>
                    </section>
                  </section>
                )}
                {conectado && <section className="absolute left-1/2 top-1/2 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/70 shadow-[0_0_25px_rgba(34,211,238,0.35)]" />}
              </figure>

              {errorCamara && (
                <section className="mt-4 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">
                  <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-amber-300" />
                  <span>{errorCamara}</span>
                </section>
              )}

              <section className="mt-6 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={handleVincular} disabled={conectado} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${conectado ? 'cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-500' : 'border border-cyan-400 bg-cyan-500 text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.25)] hover:bg-cyan-300'}`}>
                  <LinkIcon className="h-5 w-5" />
                  Vincular gafas
                </button>
                <button type="button" onClick={handleDesconectar} disabled={!conectado} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${!conectado ? 'cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-500' : 'border border-rose-400/60 bg-rose-500/90 text-white hover:bg-rose-400'}`}>
                  <StopIcon className="h-5 w-5" />
                  Desconectar
                </button>
              </section>
            </article>

            <aside className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <section className="flex items-center justify-between">
                <section>
                  <h2 className="text-xl font-bold text-white">Estado del sistema</h2>
                  <p className="mt-1 text-sm text-slate-400">Diagnóstico rápido del periférico.</p>
                </section>
                {conectado ? <CheckCircleIcon className="h-6 w-6 text-cyan-300" /> : <ExclamationTriangleIcon className="h-6 w-6 text-cyan-300" />}
              </section>

              <section className="mt-6 space-y-3">
                {[
                  ['Cámara', conectado ? 'Detectada' : 'Sin conexión', conectado],
                  ['Resolución', conectado ? '1280 × 720' : '--', conectado],
                  ['Permisos', conectado ? 'Concedidos' : 'Pendientes', conectado],
                  ['Procesamiento', conectado ? 'Listo' : 'En espera', conectado],
                ].map(([label, value, active]) => (
                  <section key={label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className={`text-sm font-semibold ${active ? 'text-cyan-300' : 'text-slate-500'}`}>{value}</span>
                  </section>
                ))}
              </section>

              <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recomendación</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Coloca las manos dentro del encuadre y utiliza buena iluminación para mejorar la interpretación.
                </p>
              </section>
            </aside>
          </section>

          <section className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <section className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-white">Modo de interpretación</h2>
              <p className="text-sm text-slate-400">Selecciona cómo quieres recibir el resultado de los gestos detectados.</p>
            </section>

            <section className="mt-5">
              <SelectorModoSalida modoActual={modoSalida} onSelectModo={setModoSalida} />
            </section>

            <section id="panel-salida" className="mt-5 flex min-h-[180px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              {modoSalida === 'texto' && (
                <section className="flex w-full items-start gap-3 font-mono text-sm leading-7 text-slate-300">
                  <span className="text-cyan-400">▶</span>
                  <span>{textoConversion}</span>
                </section>
              )}
              {modoSalida === 'escuchar' && (
                <section className="flex items-center gap-3 text-sm text-cyan-200">
                  <SpeakerWaveIcon className="h-6 w-6 animate-pulse text-cyan-300" />
                  <span>Sintetizador de voz listo para transmitir el gesto interpretado.</span>
                </section>
              )}
            </section>
          </section>
        </section>
      </main>
    </section>
  );
}
