"use client";

const options = [
    ["Acceso y cuenta", "Crea una cuenta, inicia sesión y consulta las opciones de recuperación disponibles en la aplicación."],
    ["Dispositivos", "Autoriza el acceso a micrófono o cámara desde el navegador cuando el módulo correspondiente lo requiera."],
    ["Producto", "Revisa el alcance actual y distingue las funciones implementadas de las que requieren integración posterior."],
];

export default function OpcionesSoporte() {
    return (
        <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-10">
            <ul className="grid gap-4 md:grid-cols-3">
                {options.map(([title, description]) => (
                    <li key={title}>
                        <article className="h-full rounded-[2rem] border border-white/8 bg-white/[.025] p-7">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}