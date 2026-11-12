"use client";

export default function VisualizadorAudio() {
  return (
    <>
      <section className="flex items-center justify-center gap-2 py-6 bg-slate-950/40 rounded-xl border border-slate-800/50">
        <span className="w-1.5 h-8 bg-teal-500 rounded-full animate-pulse"></span>
        <span className="w-1.5 h-12 bg-teal-400 rounded-full animate-pulse delay-75"></span>
        <span className="w-1.5 h-10 bg-teal-500 rounded-full animate-pulse delay-150"></span>
        <span className="w-1.5 h-14 bg-teal-400 rounded-full animate-pulse delay-200"></span>
        <span className="w-1.5 h-8 bg-teal-500 rounded-full animate-pulse delay-300"></span>
      </section>
    </>
  );
}