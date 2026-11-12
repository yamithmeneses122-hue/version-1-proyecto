"use client";

import { useMemo, useState } from 'react';
import {
  Bars3Icon,
  BookOpenIcon,
  CheckBadgeIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import BarraLateral from '../Componentes/BarraLateral';
import TarjetaSena from '../Componentes/TarjetaSena';

const signosData = [
  { id: 1, title: 'Hola', category: 'Saludos', description: 'Saludo cotidiano para iniciar una conversación.', icon: 'hand' },
  { id: 2, title: 'Gracias', category: 'Saludos', description: 'Expresa gratitud o reconocimiento.', icon: 'heart' },
  { id: 3, title: 'Por favor', category: 'Cotidiano', description: 'Solicitud amable dentro de una conversación.', icon: 'sparkle' },
  { id: 4, title: 'Familia', category: 'Cotidiano', description: 'Personas que forman parte de tu núcleo familiar.', icon: 'people' },
  { id: 5, title: 'Amigo', category: 'Cotidiano', description: 'Persona cercana con quien compartes confianza.', icon: 'peace' },
  { id: 6, title: 'Bien', category: 'Saludos', description: 'Indica que algo está correcto o funciona.', icon: 'check' },
  { id: 7, title: 'Amor', category: 'Emociones', description: 'Expresa afecto, cariño o amor.', icon: 'heart' },
  { id: 8, title: 'Uno', category: 'Números', description: 'Primer número natural.', icon: 'number' },
];

const categorias = ['Todos', 'Saludos', 'Cotidiano', 'Emociones', 'Números'];

export default function VistaDiccionario() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [favoritos, setFavoritos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  const signosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return signosData.filter((item) => {
      const coincideBusqueda = !termino
        || item.title.toLowerCase().includes(termino)
        || item.category.toLowerCase().includes(termino);
      const coincideCategoria = categoriaActiva === 'Todos' || item.category === categoriaActiva;
      const coincideFavorito = !soloFavoritos || favoritos.includes(item.id);
      return coincideBusqueda && coincideCategoria && coincideFavorito;
    });
  }, [busqueda, categoriaActiva, favoritos, soloFavoritos]);

  const toggleFavorito = (id) => {
    setFavoritos((items) => (
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id]
    ));
  };

  const reproducirSena = (signo) => {
    setSeleccionado(signo);
    const mensaje = new SpeechSynthesisUtterance(`Demostración de la seña ${signo.title}`);
    mensaje.lang = 'es-CO';
    window.speechSynthesis?.cancel();
    window.speechSynthesis?.speak(mensaje);
  };

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <section className="pointer-events-none absolute inset-0">
        <section className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <section className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <section className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
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
          <header className="flex min-h-[260px] flex-col gap-4 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:min-h-[200px] md:flex-row md:items-center md:justify-between">
            <section className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <BookOpenIcon className="h-3.5 w-3.5" />
                Centro de aprendizaje
              </span>
              <section>
                <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">Diccionario LSC</h1>
                <p className="mt-2 text-sm text-slate-300 md:text-base xl:whitespace-nowrap">
                  Explora señas de la Lengua de Señas Colombiana de forma sencilla, visual e intuitiva.
                </p>
              </section>
            </section>

            <section className="flex w-full items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 shadow-[0_0_20px_rgba(34,211,238,0.15)] md:w-auto">
              <section className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                <SparklesIcon className="h-5 w-5" />
              </section>
              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Biblioteca</p>
                <p className="font-semibold text-white">{signosData.length} señas disponibles</p>
              </section>
            </section>
          </header>

          <section className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Resultados', value: signosFiltrados.length, icon: BookOpenIcon },
              { label: 'Categorías', value: categorias.length - 1, icon: SparklesIcon },
              { label: 'Favoritos', value: favoritos.length, icon: StarIcon },
            ].map((stat) => {
              const Icono = stat.icon;
              return (
                <article key={stat.label} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                  <section className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                    <Icono className="h-5 w-5 text-cyan-300" />
                  </section>
                  <p className="mt-3 text-2xl font-black text-cyan-300">{stat.value}</p>
                </article>
              );
            })}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_0.34fr]">
            <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 shadow-[0_0_30px_rgba(14,165,233,0.12)]">
              <section className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-300" />
                <input
                  type="search"
                  id="input-buscar-seña"
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  placeholder="Buscar una seña, categoría o concepto..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 py-4 pl-12 pr-4 text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400"
                />
              </section>

              <section className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <nav className="flex flex-wrap gap-2" aria-label="Categorías del diccionario">
                  {categorias.map((categoria) => (
                    <button
                      key={categoria}
                      type="button"
                      className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${categoriaActiva === categoria ? 'border-cyan-400 bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.25)]' : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-200'}`}
                      onClick={() => setCategoriaActiva(categoria)}
                    >
                      {categoria}
                    </button>
                  ))}
                </nav>

                <button
                  type="button"
                  onClick={() => setSoloFavoritos(!soloFavoritos)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${soloFavoritos ? 'border-yellow-300/60 bg-yellow-400/15 text-yellow-200' : 'border-slate-700 bg-slate-950 text-slate-400 hover:text-yellow-200'}`}
                >
                  <StarIcon className="h-4 w-4" />
                  Solo favoritos
                </button>
              </section>
            </article>

            <aside className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-5 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
              <section className="flex items-center gap-3">
                <CheckBadgeIcon className="h-7 w-7 text-cyan-300" />
                <section>
                  <h2 className="font-bold text-white">Consejo LSC</h2>
                  <p className="text-xs text-slate-400">Aprende a tu ritmo</p>
                </section>
              </section>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Practica una seña, guárdala en favoritos y vuelve a consultarla cuando quieras.
              </p>
            </aside>
          </section>

          {seleccionado && (
            <section className="flex flex-col gap-4 rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-5 shadow-[0_0_25px_rgba(34,211,238,0.12)] sm:flex-row sm:items-center sm:justify-between">
              <section className="flex items-center gap-4">
                <section className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/40 bg-slate-950/60 text-cyan-300">
                  <PlayIcon className="h-6 w-6" />
                </section>
                <section>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Seña seleccionada</p>
                  <p className="text-lg font-bold text-white">{seleccionado.title}</p>
                </section>
              </section>
              <p className="text-sm text-slate-300">{seleccionado.description}</p>
            </section>
          )}

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" id="contenedor-tarjetas-senas">
            {signosFiltrados.length === 0 ? (
              <section className="col-span-full rounded-3xl border border-slate-800 bg-slate-900/60 py-14 text-center">
                <MagnifyingGlassIcon className="mx-auto h-10 w-10 text-cyan-300" />
                <p className="mt-4 font-semibold text-slate-300">No encontramos esa seña</p>
                <p className="mt-1 text-sm text-slate-500">Prueba con otra palabra o categoría.</p>
              </section>
            ) : (
              signosFiltrados.map((signo) => (
                <TarjetaSena
                  key={signo.id}
                  icon={signo.icon}
                  title={signo.title}
                  category={signo.category}
                  description={signo.description}
                  isFavorite={favoritos.includes(signo.id)}
                  onToggleFavorite={() => toggleFavorito(signo.id)}
                  onPlay={() => reproducirSena(signo)}
                />
              ))
            )}
          </section>
        </section>
      </main>
    </section>
  );
}
