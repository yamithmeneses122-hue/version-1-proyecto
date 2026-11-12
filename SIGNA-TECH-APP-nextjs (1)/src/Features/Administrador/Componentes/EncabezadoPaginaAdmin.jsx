"use client";

function EncabezadoPaginaAdmin({ title, description, action, icon, eyebrow = 'MÓDULO ADMINISTRADOR' }) {
    return (
        <header className="mx-auto mb-7 flex w-full max-w-6xl flex-col items-start justify-between gap-4 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur theme-light:border-slate-300 theme-light:bg-none theme-light:bg-white md:flex-row md:items-center">
            <section className="max-w-3xl">
                {eyebrow && (
                    <p className="text-[11px] font-extrabold tracking-[0.18em] text-cyan-400">
                        {eyebrow}
                    </p>
                )}
                <h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-white theme-light:text-slate-900 md:text-5xl">
                    {icon && (
                        <i
                            className={`${icon} shrink-0 bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-2xl text-transparent md:text-3xl`}
                            aria-hidden="true"
                        />
                    )}
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 max-w-2xl text-sm text-slate-300 theme-light:text-slate-600 md:text-base">
                        {description}
                    </p>
                )}
            </section>
            {action && <section className="flex gap-2">{action}</section>}
        </header>
    );
}

export default EncabezadoPaginaAdmin;
