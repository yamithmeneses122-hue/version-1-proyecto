"use client";

import { useEffect, useState } from 'react';
import {
  ArrowPathIcon,
  Bars3Icon,
  BellAlertIcon,
  CameraIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  LockClosedIcon,
  MicrophoneIcon,
  MoonIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import BarraLateral from '../Componentes/BarraLateral';
import SelectorOptimizacionIA from '../Componentes/SelectorOptimizacionIA';

export default function VistaConfiguracion() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [tema, setTema] = useState('oscuro');
  const [nombre, setNombre] = useState('Edwin Alexis Silva Sandoval');
  const [correo, setCorreo] = useState('edwin.silva@sena.edu.co');
  const [notificaciones, setNotificaciones] = useState(true);
  const [accesibilidad, setAccesibilidad] = useState(true);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    setTema(localStorage.getItem('tema-sinatex-glasses') || 'oscuro');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'oscuro');
  }, [tema]);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    window.setTimeout(() => setMensaje(''), 2500);
  };

  const guardarPerfil = (event) => {
    event.preventDefault();
    mostrarMensaje('Perfil actualizado correctamente');
  };

  const guardarTema = (event) => {
    event.preventDefault();
    localStorage.setItem('tema-sinatex-glasses', tema);
    mostrarMensaje('Apariencia guardada correctamente');
  };

  const cambiarContrasena = (event) => {
    event.preventDefault();
    mostrarMensaje('Solicitud de cambio de contraseña enviada');
  };

  const sectionClass = 'rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_25px_rgba(34,211,238,0.08)]';
  const inputClass = 'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';

  return (
    <>
      <section className="relative flex min-h-screen overflow-hidden bg-slate-950 text-slate-100">
        <section className="pointer-events-none absolute inset-0">
          <section className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <section className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
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
            <header className="flex flex-col gap-5 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
              <section className="flex items-center gap-4">
                <figure className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                  <UserCircleIcon className="h-10 w-10" />
                </figure>
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Perfil del operador</p>
                  <h1 className="mt-1 text-3xl font-black tracking-tight text-white md:text-5xl">Configuración</h1>
                  <p className="mt-2 text-sm text-slate-300">Administra tu identidad, seguridad y experiencia de trabajo.</p>
                </section>
              </section>
              <aside className="flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
                <CheckCircleIcon className="h-6 w-6 text-cyan-300" />
                <section>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Estado de cuenta</p>
                  <p className="font-semibold text-white">Perfil protegido</p>
                </section>
              </aside>
            </header>

            {mensaje && (
              <output className="flex items-center gap-3 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 p-4 text-sm font-semibold text-cyan-200" role="status">
                <CheckCircleIcon className="h-5 w-5" />
                {mensaje}
              </output>
            )}

            <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              <article className={sectionClass}>
                <header className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <UserCircleIcon className="h-7 w-7 text-cyan-300" />
                  <section>
                    <h2 className="text-xl font-bold text-white">Información personal</h2>
                    <p className="text-sm text-slate-400">Estos datos identifican tu perfil dentro del sistema.</p>
                  </section>
                </header>

                <form className="mt-6 space-y-5" onSubmit={guardarPerfil}>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-semibold text-slate-300">Nombre completo</legend>
                    <input className={inputClass} value={nombre} onChange={(event) => setNombre(event.target.value)} required />
                  </fieldset>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-semibold text-slate-300">Correo electrónico</legend>
                    <input className={inputClass} type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} required />
                  </fieldset>
                  <section className="grid gap-4 md:grid-cols-2">
                    <fieldset className="space-y-2">
                      <legend className="text-sm font-semibold text-slate-300">Rol</legend>
                      <input className={`${inputClass} cursor-not-allowed text-slate-500`} value="Operador LSC" readOnly />
                    </fieldset>
                    <fieldset className="space-y-2">
                      <legend className="text-sm font-semibold text-slate-300">Estado</legend>
                      <output className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                        Activo
                      </output>
                    </fieldset>
                  </section>
                  <button type="submit" className="rounded-xl border border-cyan-400 bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-colors hover:bg-cyan-300">
                    Guardar perfil
                  </button>
                </form>
              </article>

              <aside className={sectionClass}>
                <header className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <ShieldCheckIcon className="h-7 w-7 text-cyan-300" />
                  <section>
                    <h2 className="text-xl font-bold text-white">Resumen de seguridad</h2>
                    <p className="text-sm text-slate-400">Revisa el estado de tu cuenta.</p>
                  </section>
                </header>
                <ul className="mt-6 space-y-3">
                  {['Correo verificado', 'Sesión protegida', 'Última actividad: hoy'].map((item) => (
                    <li key={item} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-300">
                      <CheckCircleIcon className="h-5 w-5 text-cyan-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-slate-500">Nunca compartas tu contraseña ni autorices dispositivos que no reconozcas.</p>
              </aside>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article className={sectionClass}>
                <header className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <LockClosedIcon className="h-7 w-7 text-cyan-300" />
                  <section>
                    <h2 className="text-xl font-bold text-white">Seguridad y acceso</h2>
                    <p className="text-sm text-slate-400">Actualiza tus credenciales de acceso.</p>
                  </section>
                </header>
                <form className="mt-6 space-y-4" onSubmit={cambiarContrasena}>
                  <input className={inputClass} type="password" placeholder="Contraseña actual" required />
                  <input className={inputClass} type="password" placeholder="Nueva contraseña (mínimo 8 caracteres)" minLength={8} required />
                  <input className={inputClass} type="password" placeholder="Confirmar nueva contraseña" minLength={8} required />
                  <button type="submit" className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-sm font-bold text-cyan-200 transition-colors hover:bg-cyan-500/20">
                    Cambiar contraseña
                  </button>
                </form>
              </article>

              <article className={sectionClass}>
                <header className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <CpuChipIcon className="h-7 w-7 text-cyan-300" />
                  <section>
                    <h2 className="text-xl font-bold text-white">Optimización de IA</h2>
                    <p className="text-sm text-slate-400">Configura el balance entre precisión, velocidad y consumo.</p>
                  </section>
                </header>
                <section className="mt-6">
                  <SelectorOptimizacionIA />
                </section>
                <aside className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
                  <p className="text-sm font-semibold text-cyan-200">Recomendación inteligente</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">Usa Equilibrado para sesiones normales. Cambia a Precisión cuando la iluminación o el movimiento sean complejos.</p>
                </aside>
              </article>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article className={sectionClass}>
                <header className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <CameraIcon className="h-7 w-7 text-cyan-300" />
                  <section>
                    <h2 className="text-xl font-bold text-white">Dispositivos y accesibilidad</h2>
                    <p className="text-sm text-slate-400">Prepara el entorno para una operación más cómoda.</p>
                  </section>
                </header>
                <section className="mt-6 space-y-4">
                  <label className="block space-y-2 text-sm font-semibold text-slate-300">
                    Cámara principal
                    <select className={inputClass} defaultValue="gafas">
                      <option value="gafas">Sensor de gafas inteligentes</option>
                      <option value="integrada">Cámara integrada</option>
                      <option value="externa">Cámara externa</option>
                    </select>
                  </label>
                  <label className="block space-y-2 text-sm font-semibold text-slate-300">
                    Micrófono principal
                    <select className={inputClass} defaultValue="usb">
                      <option value="usb">Micrófono USB</option>
                      <option value="default">Micrófono del sistema</option>
                    </select>
                  </label>
                  <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
                    <span className="flex items-center gap-3"><MicrophoneIcon className="h-5 w-5 text-cyan-300" />Modo accesible</span>
                    <input type="checkbox" checked={accesibilidad} onChange={(event) => setAccesibilidad(event.target.checked)} className="h-5 w-5 accent-cyan-400" />
                  </label>
                </section>
              </article>

              <article className={sectionClass}>
                <header className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <Cog6ToothIcon className="h-7 w-7 text-cyan-300" />
                  <section>
                    <h2 className="text-xl font-bold text-white">Experiencia del sistema</h2>
                    <p className="text-sm text-slate-400">Personaliza la apariencia y las alertas.</p>
                  </section>
                </header>
                <form className="mt-6 space-y-4" onSubmit={guardarTema}>
                  <label className="block space-y-2 text-sm font-semibold text-slate-300">
                    Tema visual
                    <select className={inputClass} value={tema} onChange={(event) => setTema(event.target.value)}>
                      <option value="oscuro">Oscuro neón</option>
                      <option value="claro">Claro alto contraste</option>
                    </select>
                  </label>
                  <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
                    <span className="flex items-center gap-3"><BellAlertIcon className="h-5 w-5 text-cyan-300" />Notificaciones operativas</span>
                    <input type="checkbox" checked={notificaciones} onChange={(event) => setNotificaciones(event.target.checked)} className="h-5 w-5 accent-cyan-400" />
                  </label>
                  <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
                    <span className="flex items-center gap-3"><MoonIcon className="h-5 w-5 text-cyan-300" />Reducir animaciones</span>
                    <input type="checkbox" className="h-5 w-5 accent-cyan-400" />
                  </label>
                  <button type="submit" className="rounded-xl border border-cyan-400 bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300">
                    Guardar preferencias
                  </button>
                </form>
              </article>
            </section>

            <footer className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
              <ArrowPathIcon className="h-5 w-5 text-cyan-300" />
              <span>Los cambios se aplican de forma local y quedan listos para integrarse con el backend de preferencias.</span>
            </footer>
          </section>
        </main>
      </section>
    </>
  );
}
