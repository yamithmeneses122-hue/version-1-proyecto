"use client";

import Icono from "../../../componentes/compartidos/Icono.jsx";

const flows = [
    {
        title: "De voz a texto y apoyo visual",
        icon: "mic",
        items: ["Hablas", "SIGNA procesa", "Recibes texto / apoyo visual"],
    },
    {
        title: "De señas a texto y audio",
        icon: "camera",
        items: ["Realizas una seña", "SIGNA interpreta", "Obtienes texto / audio"],
    },
];

export default function FlujoComunicacion() {
    return (
        <section id="demo" className="border-y border-white/8 bg-gradient-to-b from-cyan-300/[.055] to-transparent">

            <main className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
                
                <header className="mx-auto max-w-3xl text-center">
                    <span className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">El puente</span>
                    <h2 className="mt-4 text-4xl font-black tracking-[-.03em] sm:text-5xl">
                        Una experiencia pensada en dos direcciones.
                    </h2>
                    <p className="mt-5 text-base leading-8 text-slate-400">
                        La landing ahora muestra la idea central de SIGNA: conectar distintas entradas de comunicación sin esconder qué hace cada parte del flujo.
                    </p>
                </header>

                <section className="mt-12 grid gap-5 lg:grid-cols-2">
                    {flows.map((flow) => (
                        <article key={flow.title} className="rounded-[2rem] border border-white/9 bg-[#111a20]/80 p-7 shadow-2xl">
                            
                            <header className="flex items-center gap-4">
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                                    <Icono name={flow.icon} className="h-6 w-6" />
                                </span>
                                <h3 className="text-xl font-bold">{flow.title}</h3>
                            </header>

                            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                                {flow.items.map((item, index) => (
                                    <li key={item} className="relative rounded-2xl border border-white/8 bg-white/[.025] p-5 text-center">
                                        <span className="text-[11px] font-bold uppercase tracking-[.16em] text-cyan-300">
                                            0{index + 1}
                                        </span>
                                        <p className="mt-2 text-sm font-semibold text-slate-200">{item}</p>
                                        
                                        {index < flow.items.length - 1 && (
                                            <span className="absolute -right-3 top-1/2 hidden text-cyan-300 sm:block" aria-hidden="true">
                                                →
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </article>
                    ))}
                </section>
            </main>
        </section>
    );
}