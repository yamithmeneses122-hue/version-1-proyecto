"use client";

import { useState } from "react";
import Icono from "../../../componentes/compartidos/Icono.jsx";

const questions = [
    ["¿Qué es SIGNA-TECH-APP?", "Es una propuesta web para facilitar comunicación básica entre personas que utilizan voz, texto y Lengua de Señas Colombiana en situaciones definidas."],
    ["¿SIGNA interpreta cualquier conversación en LSC?", "No. El enfoque del prototipo es trabajar con señas básicas y expresiones de uso cotidiano o educativo; no se presenta como un intérprete universal de LSC."],
    ["¿La interpretación por cámara ya está completamente integrada?", "La experiencia visual contempla el flujo de captura y reconocimiento, pero la integración completa del modelo de interpretación LSC requiere el desarrollo correspondiente."],
    ["¿Puedo conocer más del producto?", "Sí. La sección Producto resume el alcance actual y Soporte reúne la información de ayuda disponible."],
];

export default function PreguntasFrecuentes() {
    const [open, setOpen] = useState(0);

    return (
        <section className="mx-auto max-w-[1000px] px-5 py-20 lg:py-28">
            <header className="text-center">
                <span className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Preguntas frecuentes</span>
                <h2 className="mt-4 text-4xl font-black tracking-[-.03em] sm:text-5xl">
                    Antes de probarlo, queremos que lo tengas claro.
                </h2>
            </header>

            <ul className="mt-10 space-y-3">
                {questions.map(([question, answer], index) => {
                    const isOpen = open === index;
                    return (
                        <li key={question} className="overflow-hidden rounded-2xl border border-white/8 bg-white/[.025]">
                            <article>
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-bold"
                                    aria-expanded={isOpen}
                                >
                                    <span>{question}</span>
                                    <Icono name="chevron" className={`h-5 w-5 shrink-0 text-cyan-300 transition ${isOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isOpen && (
                                    <p className="border-t border-white/8 px-5 pb-5 pt-4 text-sm leading-7 text-slate-400">
                                        {answer}
                                    </p>
                                )}
                            </article>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}