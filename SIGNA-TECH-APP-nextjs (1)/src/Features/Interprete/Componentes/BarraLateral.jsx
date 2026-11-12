"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  CheckBadgeIcon,
  ClockIcon,
  HomeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import NavLink from "@/componentes/compartidos/NavLink";
import { useRouter } from "next/navigation";
const items = [
  { path: "/interprete", name: "Inicio", icon: HomeIcon, end: true },
  { path: "/interprete/validar", name: "Validar señas", icon: CheckBadgeIcon },
  { path: "/interprete/registrar", name: "Registrar", icon: PlusCircleIcon },
  { path: "/interprete/corregir", name: "Corregir", icon: PencilSquareIcon },
  { path: "/interprete/historial", name: "Historial", icon: ClockIcon },
  { path: "/interprete/perfil", name: "Perfil", icon: UserCircleIcon },
];

export default function BarraLateral({ open, onClose }) {
  const router = useRouter();
  const navigate = (ruta) => router.push(ruta);

  function logout() {
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-900 text-slate-200 shadow-2xl transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <header className="flex items-start justify-between border-b border-slate-800 p-6">
        <section className="flex flex-col gap-1">
          <h2 className="font-['Montserrat'] text-xl font-bold tracking-wider text-white">
            SIGNA-TECH
          </h2>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Panel intérprete
          </p>
        </section>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-300 transition-colors hover:bg-slate-800 hover:text-cyan-300 md:hidden"
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          ×
        </button>
      </header>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navegación del intérprete">
        <ul className="flex flex-col gap-2">
          {items.map(({ path, name, icon: Icono, end }) => (
            <li key={path}>
              <NavLink
                href={path}
                end={end}
                onClick={onClose}
                className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  isActive
                    ? "border border-cyan-400/50 bg-cyan-900/40 text-white shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white hover:shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                }`}
              >
                {({ isActive }) => (
                  <>
                    <Icono className={`h-5 w-5 text-cyan-400 transition-colors ${
                      isActive
                        ? "drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                        : "group-hover:text-cyan-300"
                    }`} aria-hidden="true" />
                    <span>{name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="border-t border-slate-800 p-4">
        <button
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600 transition-all duration-300 hover:scale-105 hover:bg-rose-100 hover:shadow-[0_0_10px_rgba(244,63,94,0.2)] dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-white dark:hover:bg-rose-500/20 dark:hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          type="button"
          onClick={logout}
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-rose-500 dark:text-rose-400" aria-hidden="true" />
          <span>Cerrar Sesión</span>
        </button>
      </footer>
    </aside>
  );
}
