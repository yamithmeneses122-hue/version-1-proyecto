"use client";

import { useState, useEffect, useRef } from 'react';
import EncabezadoTarjetaAdmin from '../Componentes/EncabezadoTarjetaAdmin';
import DisenoAdmin from '../Componentes/DisenoAdmin';
import { estilosAdmin } from '../Componentes/estilosAdmin';
import { useToast } from '../../../Hooks/useToastHook';

const Configuracion = () => {
    const { toasts, toast } = useToast();
    const [tema, setTema] = useState('oscuro');
    const [listo, setListo] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setTema(localStorage.getItem('tema-sinatex-glasses') || 'oscuro');
        setListo(true);
    }, []);

    useEffect(() => {
        if (!listo) return;
        document.documentElement.dataset.theme = tema === 'claro' ? 'light' : 'dark';
        localStorage.setItem('tema-sinatex-glasses', tema);
    }, [tema, listo]);

    const handleBackupExport = () => {
        toast('Generando volcado de base de datos... Descarga iniciada.', 'info');
    };

    const triggerRestore = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            toast(`Archivo "${e.target.files[0].name}" cargado. Iniciando restauración...`, 'alerta');
        }
    };

    const handleAIUpdate = (e) => {
        e.preventDefault();
        toast('Parámetros de enlace de IA actualizados con éxito.', 'exito');
    };

    const guardarApariencia = (e) => {
        e.preventDefault();
        toast('Configuración de apariencia guardada.', 'exito');
    };

    const limpiarCache = () => {
        if (!window.confirm('¿Purgar los buffers de almacenamiento temporal? Esta acción no altera el diccionario.')) return;
        toast('Buffer y memoria caché del servidor limpiados.', 'exito');
    };

    return (
        <DisenoAdmin
            title="Configuración del Sistema"
            description="Gobernanza técnica. Administra los respaldos de las bases de datos, los canales de la IA y el mantenimiento del servidor local."
            icon="fa-solid fa-sliders"
            toasts={toasts}
        >

                <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-8">
                    <article className={`${estilosAdmin.card} ${estilosAdmin.cardBlue}`}>
                        <EncabezadoTarjetaAdmin icon="fa-solid fa-database" title="Copias de Seguridad y Restauración" description="Exporta el estado lógico del diccionario LSC y el padrón de usuarios para salvaguardar la información." />

                        <form className={estilosAdmin.form} onSubmit={(e) => e.preventDefault()}>
                            <fieldset className={estilosAdmin.fieldset}>
                                <legend className={estilosAdmin.legend}>Formato de Salida Estándar</legend>
                                <select className={estilosAdmin.input} defaultValue="sql">
                                    <option value="sql">Estructura SQL Pura (*.sql Dumps)</option>
                                    <option value="json">Esquema de Intercambio JSON (*.json)</option>
                                </select>
                            </fieldset>

                            <footer className="flex flex-wrap gap-3">
                                <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.primaryButton} flex-1`} onClick={handleBackupExport}>
                                    <i className="fa-solid fa-download" aria-hidden="true" /> Exportar Base de Datos
                                </button>
                                <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.secondaryButton} flex-1`} onClick={triggerRestore}>
                                    <i className="fa-solid fa-upload" aria-hidden="true" /> Restaurar Respaldo
                                </button>
                                <input className="hidden" type="file" ref={fileInputRef} accept=".sql,.json" onChange={handleFileChange} aria-hidden="true" />
                            </footer>
                        </form>
                    </article>

                    <article className={`${estilosAdmin.card} ${estilosAdmin.cardTeal}`}>
                        <EncabezadoTarjetaAdmin icon="fa-solid fa-brain" title="Conectividad Core e Inteligencia Artificial" description="Calibra los límites de comunicación del traductor en la nube y la latencia del sensor de las gafas." teal />

                        <form className={estilosAdmin.form} onSubmit={handleAIUpdate}>
                            <fieldset className={estilosAdmin.fieldset}>
                                <legend className={estilosAdmin.legend}>Servidor del Modelo de Redes Neuronales</legend>
                                <select className={estilosAdmin.input} defaultValue="local">
                                    <option value="local">Modelo de Interpretación Local (Gafas Integrado)</option>
                                    <option value="cloud-api">API de Alta Precisión (Streaming en la Nube)</option>
                                </select>
                            </fieldset>

                            <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                                <fieldset className={estilosAdmin.fieldset}>
                                    <legend className={estilosAdmin.legend}>Tiempo Límite de Respuesta (Timeout)</legend>
                                    <select className={estilosAdmin.input} defaultValue="3000">
                                        <option value="1500">Ultra Rápido (1500ms)</option>
                                        <option value="3000">Estándar Tolerante (3000ms)</option>
                                    </select>
                                </fieldset>
                                <fieldset className={estilosAdmin.fieldset}>
                                    <legend className={estilosAdmin.legend}>Tasa de Refresco de Cuadros (FPS)</legend>
                                    <select className={estilosAdmin.input} defaultValue="60">
                                        <option value="30">Muestreo Estándar (30 FPS)</option>
                                        <option value="60">Muestreo Cinemático Fluido (60 FPS)</option>
                                    </select>
                                </fieldset>
                            </section>

                            <button type="submit" className={`${estilosAdmin.button} ${estilosAdmin.primaryButton}`}>
                                <i className="fa-solid fa-satellite-dish" aria-hidden="true" /> Actualizar Canales de IA
                            </button>
                        </form>
                    </article>

                    <article className={`${estilosAdmin.card} ${estilosAdmin.cardBlue}`}>
                        <EncabezadoTarjetaAdmin icon="fa-solid fa-circle-half-stroke" title="Mantenimiento Técnico e Interfaz" description="Purga los registros acumulados del servidor y personaliza la apariencia visual del panel administrativo." />

                        <form className={estilosAdmin.form} onSubmit={guardarApariencia}>
                            <fieldset className={estilosAdmin.fieldset}>
                                <legend className={estilosAdmin.legend}>Modo de Contraste y Apariencia</legend>
                                <select className={estilosAdmin.input} value={tema} onChange={(e) => setTema(e.target.value)}>
                                    <option value="oscuro">Modo Oscuro (Predeterminado)</option>
                                    <option value="claro">Modo Claro (Contraste Alto)</option>
                                </select>
                            </fieldset>

                            <footer className="flex flex-wrap gap-3">
                                <button type="submit" className={`${estilosAdmin.button} ${estilosAdmin.primaryButton} flex-1`}>
                                    <i className="fa-solid fa-floppy-disk" aria-hidden="true" /> Guardar Apariencia
                                </button>
                                <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.dangerButton} flex-1`} onClick={limpiarCache}>
                                    <i className="fa-solid fa-broom" aria-hidden="true" /> Limpiar Caché de Logs
                                </button>
                            </footer>
                        </form>
                    </article>
                </section>
        </DisenoAdmin>
    );
};

export default Configuracion;
