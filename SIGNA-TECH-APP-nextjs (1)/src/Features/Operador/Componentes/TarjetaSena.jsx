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

export default function TarjetaSena({
  icon = 'hand',
  title,
  category,
  description,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) {
  const Icono = iconMap[icon] || HandRaisedIcon;

  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-5 shadow-[0_0_20px_rgba(34,211,238,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]">
      <section>
        <section className="flex items-start justify-between">
          <section className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.12)]">
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
          <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {category}
          </span>
          <h3 className="mt-3 text-xl font-bold text-white group-hover:text-cyan-300">{title}</h3>
          <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-400">{description}</p>
        </section>
      </section>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-bold text-cyan-200 transition-all hover:bg-cyan-500 hover:text-slate-950"
        onClick={onPlay}
      >
        <PlayIcon className="h-5 w-5" />
        Ver seña
      </button>
    </article>
  );
}
