"use client";

const tones = {
    cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
    teal: 'border-teal-300/20 bg-teal-300/10 text-teal-300',
    green: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-400',
    amber: 'border-amber-400/20 bg-amber-400/10 text-amber-400',
};

function TarjetaEstadisticaAdmin({ label, value, detail, icon, tone = 'cyan' }) {
    return (
        <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-colors theme-light:border-slate-300 theme-light:bg-none theme-light:bg-white theme-light:shadow-slate-200">
            <header className="flex items-center gap-3 text-sm text-slate-400 theme-light:text-slate-600">
                {icon && (
                    <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg border text-base ${tones[tone] ?? tones.cyan}`}
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                )}
                <span>{label}</span>
            </header>
            <strong className="mt-3 block text-3xl font-extrabold text-white theme-light:text-slate-900">
                {value}
            </strong>
            {detail && (
                <p className="mt-2 text-xs leading-relaxed text-slate-400 theme-light:text-slate-600">
                    {detail}
                </p>
            )}
        </article>
    );
}

export default TarjetaEstadisticaAdmin;
