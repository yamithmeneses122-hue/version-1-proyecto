"use client";

import BarraLateral from './BarraLateral';
import EncabezadoPaginaAdmin from './EncabezadoPaginaAdmin';
import { useBarraLateral } from './useBarraLateral';
import { RegionNotificaciones } from '../../../Hooks/useToast';

function DisenoAdmin({ title, description, icon, toasts = [], children }) {
    const { menuAbierto, toggleMenu, cerrar } = useBarraLateral();

    return (
        <section className="relative isolate flex min-h-screen overflow-hidden bg-slate-950 font-sans text-slate-100 transition-colors theme-light:bg-slate-100 theme-light:text-slate-900">
            <section className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <span className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
                <span className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
                <span className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
            </section>
            <button
                type="button"
                className="fixed left-4 top-4 z-[60] flex size-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 text-cyan-300 shadow-lg shadow-black/20 transition hover:border-cyan-400/50 theme-light:border-slate-300 theme-light:bg-white theme-light:text-cyan-700 md:hidden"
                aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuAbierto}
                aria-controls="menu-lateral"
                onClick={toggleMenu}
            >
                <span className={`h-0.5 w-5 rounded bg-current transition ${menuAbierto ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`h-0.5 w-5 rounded bg-current transition ${menuAbierto ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-5 rounded bg-current transition ${menuAbierto ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>

            <BarraLateral menuAbierto={menuAbierto} onClose={cerrar} />

            <main className="relative z-10 min-h-screen w-full px-4 pb-10 pt-20 sm:px-6 md:ml-64 md:w-[calc(100%_-_16rem)] md:px-10 md:py-12">
                <EncabezadoPaginaAdmin title={title} description={description} icon={icon} />
                <section className="mx-auto w-full max-w-6xl">
                    {children}
                </section>
            </main>
            <RegionNotificaciones toasts={toasts} />
        </section>
    );
}

export default DisenoAdmin;
