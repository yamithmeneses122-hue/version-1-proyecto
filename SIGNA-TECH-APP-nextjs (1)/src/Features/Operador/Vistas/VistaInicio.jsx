"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  BoltIcon,
  BookOpenIcon,
  CameraIcon,
  Cog6ToothIcon,
  MicrophoneIcon,
  SignalIcon,
  SpeakerWaveIcon,
  UserCircleIcon,
  Bars3Icon,
  ChartBarSquareIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import BarraLateral from '../Componentes/BarraLateral';

// Small inline sparkline component (SVG) to avoid extra deps
function GraficoTendencia({ data = [], stroke = '#00f7ff' }) {
  const points = useMemo(() => {
    if (!data || data.length === 0) return '';
    const w = 120;
    const h = 28;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    return data
      .map((d, i) => {
        const x = (i / (data.length - 1 || 1)) * w;
        const y = h - ((d - min) / range) * h;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
  }, [data]);

  return (
    <svg width="120" height="28" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={points} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VistaInicio() {
  const router = useRouter();
  const navigate = (ruta) => router.push(ruta);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Simulated metrics data (would come from API in real app)
  const [metrics, setMetrics] = useState({
    connectivity: 97,
    processes: 12,
    sessionMinutes: 8 * 60 + 42,
    cpuSeries: [12, 18, 22, 20, 26, 30, 28, 34, 31],
    activitySeries: [2, 4, 6, 5, 8, 7, 9, 11, 8],
  });

  // Activity log simulation
  const [logs, setLogs] = useState([
    '[09:00] Sistema iniciado',
    '[09:05] Cámara conectada',
    '[09:12] Usuario ingresó: Edwin',
    '[09:30] Sesión Texto a Voz iniciada',
  ]);

  useEffect(() => {
    // Simulate live updates every 6s
    const t = setInterval(() => {
      setMetrics((m) => ({
        ...m,
        cpuSeries: [...m.cpuSeries.slice(1), Math.max(6, Math.min(40, Math.round(m.cpuSeries[m.cpuSeries.length - 1] + (Math.random() * 8 - 4))))],
        activitySeries: [...m.activitySeries.slice(1), Math.max(1, Math.min(12, Math.round(m.activitySeries[m.activitySeries.length - 1] + (Math.random() * 4 - 2))))],
      }));

      setLogs((l) => {
        const next = l.slice(-6);
        const now = new Date();
        const time = now.toTimeString().slice(0, 5);
        const events = ['Reconocimiento OK', 'Audio sintetizado', 'Cámara calibrada', 'Transcripción guardada'];
        return [...next, `[${time}] ${events[Math.floor(Math.random() * events.length)]}`];
      });
    }, 6000);

    return () => clearInterval(t);
  }, []);

  const modules = [
    { title: 'Texto a Voz', description: 'Genera mensajes en audio con voz clara y velocidad ajustable.', route: '/texto-voz', accent: 'cyan', icon: SpeakerWaveIcon, status: 'Activo' },
    { title: 'Voz a Texto', description: 'Transcribe frases en tiempo real con precisión para revisión.', route: '/voz-a-texto', accent: 'sky', icon: MicrophoneIcon, status: 'En línea' },
    { title: 'Detección Cámara', description: 'Monitorea la cámara y valida la captura del entorno visual.', route: '/camara', accent: 'cyan', icon: CameraIcon, status: 'Listo' },
    { title: 'Avatar', description: 'Visualiza y controla la representación digital del sistema.', route: '/avatar', accent: 'blue', icon: UserCircleIcon, status: 'Preparado' },
    { title: 'Diccionario LSC', description: 'Consulta palabras y gestos con recursos visuales y multimodales.', route: '/diccionario', accent: 'cyan', icon: BookOpenIcon, status: 'Actualizado' },
    { title: 'Configuración', description: 'Ajusta preferencias de sistema, apariencia y accesibilidad.', route: '/configuracion', accent: 'blue', icon: Cog6ToothIcon, status: 'Personalizable' },
  ];

  const quickActions = [
    { id: 'start-session', label: 'Iniciar sesión rápida', action: () => alert('Sesión rápida iniciada'), icon: BoltIcon },
    { id: 'calibrate-camera', label: 'Calibrar cámara', action: () => navigate('/camara'), icon: CameraIcon },
    { id: 'run-diagnostics', label: 'Diagnósticos', action: () => alert('Diagnósticos ejecutados'), icon: ChartBarSquareIcon },
  ];

  const smartTips = [
    'Usa texto a voz para pruebas rápidas de mensaje.',
    'Revisa la cámara antes de iniciar una sesión en vivo.',
    'Ajusta el tema y la accesibilidad desde configuración.',
  ];

  const quickStats = [
    { label: 'Conectividad', value: `${metrics.connectivity}%`, hint: 'Estable' },
    { label: 'Procesos', value: `${metrics.processes}`, hint: 'Activos' },
    { label: 'Sesión', value: `${Math.floor(metrics.sessionMinutes / 60)}:${String(metrics.sessionMinutes % 60).padStart(2, '0')}`, hint: 'Hoy' },
  ];

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background neon blobs */}
      <section className="pointer-events-none absolute inset-0">
        <section className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <section className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <section className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </section>

      <BarraLateral isOpen={menuAbierto} onClose={() => setMenuAbierto(false)} />

      <button type="button" className="fixed left-4 top-4 z-50 rounded-xl border border-cyan-500/30 bg-slate-900/80 p-3 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur md:hidden" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menú">
        <Bars3Icon className="h-5 w-5" />
      </button>

      <main className="relative z-10 flex-1 p-5 md:ml-64 md:p-10">
        <section className="mx-auto max-w-7xl space-y-8">
          {/* Encabezado */}
          <header className="flex flex-col gap-4 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
            <section className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <SignalIcon className="h-3.5 w-3.5" />
                Centro de Control
              </span>

              <section>
                <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">¡Hola, Edwin! <span className="animate-pulse">👋</span></h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">Panel de control interactivo — accesos rápidos, métricas y actividad en tiempo real.</p>
              </section>
            </section>

            <section className="flex items-center gap-3 self-start rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <section className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                <BoltIcon className="h-5 w-5" />
              </section>
              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Estado</p>
                <p className="font-semibold text-white">Operación online</p>
              </section>
            </section>
          </header>

          {/* Top grid: metrics + activity */}
          <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <section className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 shadow-[0_0_30px_rgba(14,165,233,0.12)]">
              <section className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Resumen en vivo</h2>
                <section className="flex items-center gap-3">
                  <section className="flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">Conexión <span className="ml-2 font-bold text-cyan-300">{metrics.connectivity}%</span></section>
                  <section className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-300">Live</section>
                </section>
              </section>

              <section className="grid gap-4 sm:grid-cols-3">
                {quickStats.map((stat) => (
                  <section key={stat.label} className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                    <p className="mt-3 text-2xl font-black text-cyan-300">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{stat.hint}</p>
                  </section>
                ))}
              </section>

              <section className="mt-6 grid gap-4 md:grid-cols-2">
                <section className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                  <section className="flex items-center justify-between">
                    <p className="text-sm text-slate-300">Uso CPU</p>
                    <p className="text-xs font-semibold text-slate-400">{metrics.cpuSeries[metrics.cpuSeries.length - 1]}%</p>
                  </section>
                  <section className="mt-3"><GraficoTendencia data={metrics.cpuSeries} stroke="#06b6d4" /></section>
                </section>

                <section className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                  <section className="flex items-center justify-between">
                    <p className="text-sm text-slate-300">Actividad</p>
                    <p className="text-xs font-semibold text-slate-400">Últimos eventos</p>
                  </section>
                  <section className="mt-3"><GraficoTendencia data={metrics.activitySeries} stroke="#7dd3fc" /></section>
                </section>
              </section>

              <section className="mt-6 flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-slate-300">Acciones rápidas</h3>
                <section className="flex flex-wrap gap-3 pt-2">
                  {quickActions.map((a) => {
                    const Icono = a.icon;
                    return (
                      <button key={a.id} onClick={a.action} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-gradient-to-r from-cyan-600/10 to-cyan-600/5 px-4 py-2 text-sm text-cyan-200 hover:scale-105 transition-transform shadow-md">
                        <Icono className="h-4 w-4 text-cyan-300" />
                        <span>{a.label}</span>
                      </button>
                    );
                  })}
                </section>
              </section>
            </section>

            {/* Activity / Logs + Widgets */}
            <aside className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
              <h2 className="text-xl font-bold text-white">Actividad reciente</h2>
              <section className="mt-4 max-h-56 space-y-2 overflow-auto rounded-md bg-black/10 p-3 font-mono text-sm text-slate-300">
                {logs.slice().reverse().map((l, i) => (
                  <section key={i} className="whitespace-pre">{l}</section>
                ))}
              </section>

              <section className="mt-6 grid gap-3">
                <section className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                  <section className="flex items-center gap-3">
                    <section className="rounded-full bg-cyan-500/10 p-2 text-cyan-300"><CameraIcon className="h-5 w-5" /></section>
                    <section>
                      <p className="text-sm font-semibold text-white">Cámara</p>
                      <p className="text-xs text-slate-400">Conectada • 720p</p>
                    </section>
                  </section>
                  <section className="text-sm font-semibold text-cyan-300">Online</section>
                </section>

                <section className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                  <section className="flex items-center gap-3">
                    <section className="rounded-full bg-cyan-500/10 p-2 text-cyan-300"><SpeakerWaveIcon className="h-5 w-5" /></section>
                    <section>
                      <p className="text-sm font-semibold text-white">Volumen</p>
                      <p className="text-xs text-slate-400">Nivel medio</p>
                    </section>
                  </section>
                  <section className="text-sm font-semibold text-cyan-300">57%</section>
                </section>

                <section className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                  <section className="flex items-center gap-3">
                    <section className="rounded-full bg-cyan-500/10 p-2 text-cyan-300"><FireIcon className="h-5 w-5" /></section>
                    <section>
                      <p className="text-sm font-semibold text-white">Temperatura</p>
                      <p className="text-xs text-slate-400">Unidad interna</p>
                    </section>
                  </section>
                  <section className="text-sm font-semibold text-cyan-300">36°C</section>
                </section>
              </section>

              <section className="mt-6">
                <h3 className="text-sm font-semibold text-slate-300">Consejos inteligentes</h3>
                <ul className="mt-3 space-y-2">
                  {smartTips.map((t) => (
                    <li key={t} className="rounded-xl border border-slate-800 bg-slate-950/40 p-2 text-sm text-slate-300">• {t}</li>
                  ))}
                </ul>
              </section>
            </aside>
          </section>

          {/* Modules area (big cards) */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icono = module.icon;
              const accentStyle = {
                cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-400/30 hover:border-cyan-400/60',
                sky: 'from-sky-500/20 to-sky-500/5 border-sky-400/30 hover:border-sky-400/60',
                blue: 'from-blue-500/20 to-blue-500/5 border-blue-400/30 hover:border-blue-400/60',
              }[module.accent];

              return (
                <button key={module.title} type="button" onClick={() => navigate(module.route)} className={`group flex h-full flex-col justify-between rounded-3xl border bg-gradient-to-br p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] ${accentStyle}`}>
                  <section className="space-y-4">
                    <section className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-slate-950/60 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.12)]">
                        <Icono className="h-6 w-6" />
                      </span>
                      <span className="rounded-full border border-slate-700 bg-slate-950/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">{module.status}</span>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300">{module.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{module.description}</p>
                    </section>
                  </section>

                  <section className="mt-6 flex items-center justify-between border-t border-slate-700/80 pt-4">
                    <span className="text-sm font-medium text-cyan-300">Abrir módulo</span>
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-300 transition-transform group-hover:translate-x-1"><ArrowRightIcon className="h-4 w-4" /></span>
                  </section>
                </button>
              );
            })}
          </section>
        </section>
      </main>
    </section>
  );
}