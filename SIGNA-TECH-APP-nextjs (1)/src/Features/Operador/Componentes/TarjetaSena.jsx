"use client";

import {
  CheckIcon,
  HandRaisedIcon,
  HeartIcon,
  PlayIcon,
  SparklesIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  check: CheckIcon,
  hand: HandRaisedIcon,
  heart: HeartIcon,
  people: UserGroupIcon,
  peace: HandRaisedIcon,
  sparkle: SparklesIcon,
  number: SparklesIcon,
};

const accents = {
  cyan: {
    card: 'border-cyan-400/30 from-cyan-500/20 to-cyan-500/5 hover:border-cyan-400/60 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] theme-light:border-cyan-200 theme-light:bg-none theme-light:bg-cyan-50 theme-light:shadow-cyan-100',
    icon: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.12)]',
    category: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-300',
    title: 'group-hover:text-cyan-300',
    button: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500',
  },
  blue: {
    card: 'border-blue-400/30 from-blue-500/20 to-blue-500/5 hover:border-blue-400/60 hover:shadow-[0_0_28px_rgba(59,130,246,0.18)] theme-light:border-blue-200 theme-light:bg-none theme-light:bg-blue-50 theme-light:shadow-blue-100',
    icon: 'border-blue-400/30 bg-blue-500/10 text-blue-300 shadow-[0_0_18px_rgba(59,130,246,0.12)]',
    category: 'border-blue-400/20 bg-blue-500/10 text-blue-300',
    title: 'group-hover:text-blue-300',
    button: 'border-blue-400/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500',
  },
};

export default function TarjetaSena({
  accent = 'cyan',
  icon = 'hand',
  title,
  category,
  description,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) {
  const Icono = iconMap[icon] || HandRaisedIcon;
  const accentStyle = accents[accent] || accents.cyan;

  return (
    <article className={`group flex flex-col justify-between rounded-3xl border bg-gradient-to-br p-5 shadow-[0_0_20px_rgba(34,211,238,0.07)] transition-all duration-300 hover:-translate-y-1 ${accentStyle.card}`}>
      <section>
        <section className="flex items-start justify-between">
          <section className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${accentStyle.icon}`}>
            <Icono className="h-7 w-7" />
          </section>
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`rounded-xl border p-2 transition-all ${isFavorite ? 'border-yellow-300/50 bg-yellow-400/15 text-yellow-200' : 'border-slate-700 bg-slate-950/50 text-slate-500 hover:text-yellow-200'}`}
            aria-label={isFavorite ? `Quitar ${title} de favoritos` : `Agregar ${title} a favoritos`}
          >
            <StarIcon className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </section>

        <section className="mt-5">
          <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${accentStyle.category}`}>
            {category}
          </span>
          <h3 className={`mt-3 text-xl font-bold text-white ${accentStyle.title}`}>{title}</h3>
          <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-400">{description}</p>
        </section>
      </section>

      <button
        type="button"
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all hover:text-slate-950 ${accentStyle.button}`}
        onClick={onPlay}
      >
        <PlayIcon className="h-5 w-5" />
        Ver seña
      </button>
    </article>
  );
}
