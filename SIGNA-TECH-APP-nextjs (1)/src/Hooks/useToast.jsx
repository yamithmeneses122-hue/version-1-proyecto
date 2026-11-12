"use client";

const ICONOS = {
    exito: 'fa-solid fa-circle-check',
    alerta: 'fa-solid fa-triangle-exclamation',
    error: 'fa-solid fa-circle-xmark',
    info: 'fa-solid fa-circle-info',
};

export function RegionNotificaciones({ toasts }) {
    if (!toasts.length) return null;
    return (
        <output className="pointer-events-none fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] flex-col gap-2" aria-live="polite" aria-atomic="false">
            {toasts.map((t) => (
                <p
                    key={t.id}
                    className={`pointer-events-auto flex min-w-64 max-w-96 items-center gap-3 rounded-lg border border-[#1a2030] border-l-4 bg-[#111827] px-4 py-3 text-sm font-medium text-white shadow-xl shadow-black/40 theme-light:border-slate-300 theme-light:bg-white theme-light:text-slate-900 ${
                        t.tipo === 'exito'
                            ? 'border-l-emerald-400 text-emerald-300'
                            : t.tipo === 'alerta'
                              ? 'border-l-amber-400 text-amber-300'
                              : t.tipo === 'error'
                                ? 'border-l-red-400 text-red-300'
                                : 'border-l-cyan-400 text-cyan-300'
                    }`}
                    role="status"
                >
                    <i className={`${ICONOS[t.tipo]} shrink-0`} aria-hidden="true" />
                    {t.mensaje}
                </p>
            ))}
        </output>
    );
}
