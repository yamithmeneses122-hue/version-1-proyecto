"use client";

import { useState } from 'react';
import { useToast } from '../../../Hooks/useToastHook';
import EncabezadoTarjetaAdmin from '../Componentes/EncabezadoTarjetaAdmin';
import DisenoAdmin from '../Componentes/DisenoAdmin';
import { estilosAdmin } from '../Componentes/estilosAdmin';

const AprobacionSenas = () => {
    const { toasts, toast } = useToast();

    const [nuevasSenas, setNuevasSenas] = useState([
        { id: 'n1', concepto: 'Servidor', gesticulacion: 'Manos paralelas moviéndose verticalmente simulando racks físicos rígidos.', categoria: 'Técnico', claseCategoria: 'tecnico', autor: 'Katherin Gómez' },
    ]);

    const [correcciones, setCorrecciones] = useState([
        { id: 'c1', concepto: 'Software', icono: 'fa-solid fa-laptop', autor: 'Dayanna Popayán', actual: 'Configuración de la mano dominante en forma de pinza tocando la sien de manera repetitiva.', propuesta: 'Palma extendida no dominante actúa como pantalla, mientras la mano dominante dibuja líneas lógicas fluidas descendentes.' },
    ]);

    const gestionarNuevaSena = (id, accion) => {
        if (!window.confirm(`¿Confirmar "${accion}" para este registro?`)) return;
        setNuevasSenas((prev) => prev.filter((s) => s.id !== id));
        toast(`Operación ejecutada: ${accion}.`, accion === 'Aprobado' ? 'exito' : 'alerta');
    };

    const gestionarCorreccion = (id, accion) => {
        if (!window.confirm(`¿Confirmar "${accion}" para esta corrección?`)) return;
        setCorrecciones((prev) => prev.filter((c) => c.id !== id));
        toast(`Operación ejecutada: ${accion}.`, accion.includes('Aplicada') ? 'exito' : 'alerta');
    };

    return (
        <DisenoAdmin
            title="Módulo de Auditoría Léxica"
            description="Cola de moderación en tiempo real. Examina y valida las nuevas incorporaciones o correcciones propuestas por los intérpretes."
            icon="fa-solid fa-circle-check"
            toasts={toasts}
        >
            <section className="flex flex-col gap-6">
                <article className={`${estilosAdmin.card} ${estilosAdmin.cardBlue}`}>
                    <EncabezadoTarjetaAdmin
                        icon="fa-solid fa-hands-asl-interpreting"
                        title="Nuevas Señas Solicitadas"
                        description="Términos inéditos cargados que requieren autorización para ingresar al diccionario oficial de la IA."
                    />

                    <ul className={estilosAdmin.list} role="list" aria-label="Solicitudes de nuevas señas">
                        {nuevasSenas.map((sena) => (
                            <li key={sena.id} className={estilosAdmin.listItem}>
                                <section className="min-w-0 flex-1">
                                    <strong className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white theme-light:text-slate-900">
                                        Concepto: {sena.concepto}
                                        <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-200 theme-light:border-blue-700/20 theme-light:bg-blue-700/10 theme-light:text-blue-800">Nuevo</span>
                                    </strong>
                                    <span className={`mt-2 block ${estilosAdmin.muted}`}>
                                        <strong className="font-semibold text-slate-300 theme-light:text-slate-700">Gesticulación:</strong> {sena.gesticulacion}
                                    </span>
                                    <p className="mt-3 flex flex-wrap items-center gap-2">
                                        <span className="inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-2.5 py-1 text-xs font-semibold text-teal-200 theme-light:border-teal-700/20 theme-light:bg-teal-700/10 theme-light:text-teal-800">
                                            {sena.categoria}
                                        </span>
                                        <span className="text-xs text-slate-400 theme-light:text-slate-600">Enviado por: {sena.autor}</span>
                                    </p>
                                </section>
                                <footer className="flex shrink-0 flex-wrap gap-2">
                                    <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.primaryButton}`} onClick={() => gestionarNuevaSena(sena.id, 'Aprobado')}>
                                        <i className="fa-solid fa-check" aria-hidden="true" /> Aprobar
                                    </button>
                                    <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.dangerButton}`} onClick={() => gestionarNuevaSena(sena.id, 'Rechazado')}>
                                        <i className="fa-solid fa-xmark" aria-hidden="true" /> Rechazar
                                    </button>
                                </footer>
                            </li>
                        ))}

                        {nuevasSenas.length === 0 && (
                            <li className={estilosAdmin.empty}>
                                <i className="fa-solid fa-inbox text-2xl text-cyan-300" aria-hidden="true" />
                                <span>No hay solicitudes pendientes.</span>
                            </li>
                        )}
                    </ul>
                </article>

                <article className={`${estilosAdmin.card} ${estilosAdmin.cardTeal}`}>
                    <EncabezadoTarjetaAdmin
                        icon="fa-solid fa-scale-balanced"
                        title="Correcciones y Mutaciones Léxicas"
                        description="Modificaciones sugeridas a conceptos ya públicos para optimizar la precisión lingüística de la comunidad sorda."
                        teal
                    />

                    <ul className={estilosAdmin.list} role="list" aria-label="Correcciones propuestas">
                        {correcciones.map((corr) => (
                            <li key={corr.id} className={`${estilosAdmin.listItem} flex-col items-stretch sm:flex-col sm:items-stretch`}>
                                <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <strong className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white theme-light:text-slate-900">
                                        Concepto en Mutación: {corr.concepto}
                                        <i className={`${corr.icono} text-cyan-300`} aria-hidden="true" />
                                    </strong>
                                    <span className="text-xs text-slate-400 theme-light:text-slate-600">Propuesto por: {corr.autor}</span>
                                </header>

                                <section className="grid grid-cols-1 gap-3 md:grid-cols-2" aria-label="Comparación de versiones">
                                    <article className="rounded-lg border border-slate-700 bg-slate-900/70 p-4 theme-light:border-slate-300 theme-light:bg-slate-100">
                                        <strong className="text-xs font-bold uppercase tracking-wider text-slate-400 theme-light:text-slate-600">Definición Actual Activa</strong>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-300 theme-light:text-slate-700">{corr.actual}</p>
                                    </article>
                                    <article className="rounded-lg border border-teal-400/30 bg-teal-400/5 p-4 theme-light:border-teal-700/30 theme-light:bg-teal-50">
                                        <strong className="text-xs font-bold uppercase tracking-wider text-teal-300 theme-light:text-teal-800">Modificación Propuesta</strong>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-300 theme-light:text-slate-700">{corr.propuesta}</p>
                                    </article>
                                </section>

                                <footer className="flex flex-wrap gap-2">
                                    <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.primaryButton}`} onClick={() => gestionarCorreccion(corr.id, 'Mutación Aplicada')}>
                                        <i className="fa-solid fa-code-merge" aria-hidden="true" /> Validar e Intercambiar
                                    </button>
                                    <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.dangerButton}`} onClick={() => gestionarCorreccion(corr.id, 'Mutación Rechazada')}>
                                        <i className="fa-solid fa-trash-arrow-up" aria-hidden="true" /> Descartar Sugerencia
                                    </button>
                                </footer>
                            </li>
                        ))}

                        {correcciones.length === 0 && (
                            <li className={estilosAdmin.empty}>
                                <i className="fa-solid fa-inbox text-2xl text-teal-300" aria-hidden="true" />
                                <span>No hay correcciones pendientes.</span>
                            </li>
                        )}
                    </ul>
                </article>
            </section>
        </DisenoAdmin>
    );
};

export default AprobacionSenas;
