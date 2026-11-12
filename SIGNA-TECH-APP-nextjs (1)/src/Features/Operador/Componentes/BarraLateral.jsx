"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import NavLink from "@/componentes/compartidos/NavLink";
import {
  HomeIcon,
  SpeakerWaveIcon,
  MicrophoneIcon,
  CameraIcon,
  BookOpenIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function BarraLateral({ isOpen, onClose }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(localStorage.getItem('signa-theme') || 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('signa-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems = [
    { path: '/operador', name: 'Inicio', icon: HomeIcon },
    { path: '/texto-voz', name: 'Texto a Voz', icon: SpeakerWaveIcon },
    { path: '/voz-a-texto', name: 'Voz a Texto', icon: MicrophoneIcon },
    { path: '/camara', name: 'Detección Cámara', icon: CameraIcon },
    { path: '/diccionario', name: 'Diccionario LSC', icon: BookOpenIcon },
    { path: '/avatar', name: 'Avatar', icon: UserCircleIcon },
    { path: '/configuracion', name: 'Configuración', icon: Cog6ToothIcon },
  ];

  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        bg-white border-r border-slate-200 text-slate-800 
        dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200`}>

        <header className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
          <section className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-wider font-['Montserrat'] text-cyan-600 dark:text-white">
              SIGNA-TECH
            </h2>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 dark:text-cyan-400">
              PANEL OPERADOR
            </p>
          </section>

          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 bg-slate-100 text-slate-600 hover:text-cyan-600 hover:bg-slate-200 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] dark:bg-slate-800 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-700 dark:hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-yellow-400 dark:drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
            ) : (
              <MoonIcon className="h-5 w-5 text-cyan-500" />
            )}
          </button>
        </header>

        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Navegación principal">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icono = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    href={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)] dark:bg-cyan-900/40 dark:border-cyan-400/50 dark:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-cyan-700 dark:hover:bg-slate-800/80 dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    }`}
                  >
                    {({ isActive }) => (
                      <>
                        <Icono
                          className={`h-5 w-5 ${
                            isActive
                              ? 'text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]'
                              : 'text-slate-400 group-hover:text-cyan-500 dark:text-cyan-400 dark:group-hover:text-cyan-300'
                          }`}
                        />
                        <span className="text-slate-700 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-white">{item.name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <footer className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 hover:shadow-[0_0_10px_rgba(244,63,94,0.2)] dark:bg-rose-500/10 dark:border-rose-500/20 dark:hover:bg-rose-500/20 dark:hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            onClick={(e) => {
              if (!window.confirm('¿Desea cerrar la sesión operativa?')) {
                e.preventDefault();
                return;
              }

              sessionStorage.removeItem('usuario');
              localStorage.removeItem('usuario');
            }}
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-rose-500 dark:text-rose-400" />
            <span className="text-rose-600 dark:text-white">Cerrar Sesión</span>
          </Link>
        </footer>
      </aside>
    </>
  );
}