"use client";

import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/componentes/tema/TemaProvider";
const NAV_LINKS = [
    { to: '/inicio_admin', icon: 'fa-solid fa-chart-pie', label: 'Panel Global' },
    { to: '/gestion_usuarios', icon: 'fa-solid fa-users-gear', label: 'Gestión Usuarios' },
    { to: '/gestion_roles', icon: 'fa-solid fa-shield-halved', label: 'Roles y Permisos' },
    { to: '/diccionario_admin', icon: 'fa-solid fa-book-bookmark', label: 'Diccionario LSC' },
    { to: '/aprobacion_senas', icon: 'fa-solid fa-circle-check', label: 'Aprobación Señas' },
    { to: '/configuracion_admin', icon: 'fa-solid fa-sliders', label: 'Configuración' },
];

function BarraLateral({ menuAbierto, onClose }) {
    const pathname = usePathname();
    const location = { pathname };
    const router = useRouter();
    const navigate = (ruta) => router.push(ruta);
    const { theme, toggleTheme } = useTheme();

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        sessionStorage.removeItem('usuario');
        navigate('/login');
    };

    return (
        <>
            {menuAbierto && (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                    aria-label="Cerrar menú de navegación"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-hidden border-r border-slate-800 bg-slate-900 font-['Montserrat'] text-slate-200 shadow-2xl transition-transform duration-300 theme-light:border-slate-200 theme-light:bg-white theme-light:text-slate-800 md:translate-x-0 ${
                    menuAbierto ? 'translate-x-0' : '-translate-x-full'
                }`}
                id="menu-lateral"
                aria-label="Menú de navegación"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-start justify-between border-b border-slate-800 p-6 theme-light:border-slate-200">
                    <section className="flex flex-col gap-1">
                        <h2 className="font-['Montserrat'] text-xl font-bold tracking-wider text-white theme-light:text-cyan-700">SIGNA-TECH</h2>
                        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Panel Administrador</p>
                    </section>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-cyan-300 theme-light:bg-slate-100 theme-light:text-slate-600 theme-light:hover:bg-slate-200 theme-light:hover:text-cyan-700"
                    >
                        {theme === 'dark' ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-cyan-700" />}
                    </button>
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-300 transition-colors hover:bg-slate-800 hover:text-cyan-300 theme-light:text-slate-600 theme-light:hover:bg-slate-100 theme-light:hover:text-cyan-700 md:hidden"
                        onClick={onClose}
                        aria-label="Cerrar menú"
                    >
                        ×
                    </button>
                </header>

                <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Secciones del panel">
                    <ul className="m-0 flex list-none flex-col gap-2 p-0" role="list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.to}>
                                <Link
                                    href={link.to}
                                    onClick={onClose}
                                    className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                                        location.pathname === link.to
                                            ? 'border-cyan-400/50 bg-cyan-900/40 text-white shadow-[0_0_15px_rgba(34,211,238,0.25)] theme-light:border-cyan-300 theme-light:bg-cyan-50 theme-light:text-cyan-800'
                                            : 'border-transparent text-slate-300 hover:bg-slate-800/80 hover:text-white hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] theme-light:text-slate-600 theme-light:hover:bg-slate-100 theme-light:hover:text-cyan-700'
                                    }`}
                                    aria-current={location.pathname === link.to ? 'page' : undefined}
                                >
                                    <i className={`${link.icon} w-5 shrink-0 text-center text-cyan-400 transition-colors ${
                                        location.pathname === link.to
                                            ? 'drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]'
                                            : 'group-hover:text-cyan-300'
                                    } theme-light:text-cyan-600`} aria-hidden="true" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <footer className="border-t border-slate-800 p-4 theme-light:border-slate-200">
                    <button
                        type="button"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] theme-light:border-rose-200 theme-light:bg-rose-50 theme-light:text-rose-600 theme-light:hover:bg-rose-100 theme-light:hover:shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                        onClick={cerrarSesion}
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-rose-400 theme-light:text-rose-500" aria-hidden="true" />
                        <span>Cerrar Sesión</span>
                    </button>
                </footer>
            </aside>
        </>
    );
}

export default BarraLateral;
