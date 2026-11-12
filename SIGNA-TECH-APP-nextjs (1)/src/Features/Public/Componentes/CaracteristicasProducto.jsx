"use client";

const features = [
    ["Voz y texto", "Convierte texto en voz y contempla transcripción de audio cuando el navegador y los permisos del dispositivo lo permiten."],
    ["Detección por cámara", "La interfaz prepara la captura visual para el flujo de señas; el reconocimiento automático completo depende de la integración del modelo LSC."],
    ["Diccionario LSC", "Espacio para consultar vocabulario y apoyar la validación de señas dentro del ecosistema del proyecto."],
    ["Avatar de apoyo", "Organiza entradas de texto, audio y video para representar el flujo de interpretación."],
    ["Panel de intérprete", "La propuesta contempla revisión, corrección y consulta del historial asociado al diccionario."],
    ["Accesibilidad", "Diseño responsive, contraste visual y una experiencia que prioriza claridad y navegación."],
];

export default function CaracteristicasProducto() {
    return (
        <section className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-10 lg:pb-28">
            <header className="mb-10 text-center">
                <span className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Alcance</span>
                <h2 className="mt-4 text-4xl font-black sm:text-5xl">¿Qué propone SIGNA-TECH-APP?</h2>
            </header>

            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {features.map(([title, description]) => (
                    <li key={title}>
                        <article className="h-full rounded-[2rem] border border-white/8 bg-white/[.025] p-7 transition hover:-translate-y-1 hover:border-cyan-300/25">
                            <h3 className="text-xl font-bold">{title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}