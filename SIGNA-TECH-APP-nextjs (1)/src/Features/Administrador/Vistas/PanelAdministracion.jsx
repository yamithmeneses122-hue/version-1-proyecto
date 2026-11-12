"use client";

import Link from "next/link";
import DisenoAdmin from '../Componentes/DisenoAdmin';
import { estilosAdmin } from '../Componentes/estilosAdmin';
import TarjetaEstadisticaAdmin from '../Componentes/TarjetaEstadisticaAdmin';
import { useToast } from '../../../Hooks/useToastHook';

const PanelAdministracion = () => {
    const { toasts } = useToast();

    return (
        <DisenoAdmin
            title="Panel de Control Global"
            description="Bienvenido al núcleo de administración de SIGNA-TECH. Audita el rendimiento del sistema y gestiona las historias operativas."
            icon="fa-solid fa-hand-peace"
            toasts={toasts}
        >
            <section className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Métricas del sistema">
                {[
                    { title: 'Usuarios Activos', value: '42', note: '4 nuevos esta semana', icon: 'fa-arrow-trend-up', tone: 'text-emerald-400' },
                    { title: 'Señas por Aprobar', value: '18', note: 'Requiere revisión del intérprete', icon: 'fa-circle-exclamation', tone: 'text-amber-400' },
                    { title: 'Eficacia del Modelo IA', value: '98.4%', note: 'Tasa de precisión estable', icon: 'fa-arrow-trend-up', tone: 'text-emerald-400' },
                ].map((metric) => (
                    <TarjetaEstadisticaAdmin
                        key={metric.title}
                        label={metric.title}
                        value={metric.value}
                        detail={metric.note}
                        icon={<i className={`fa-solid ${metric.icon}`} />}
                        tone={metric.tone.includes('amber') ? 'amber' : 'green'}
                    />
                ))}
            </section>

            <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2" aria-label="Módulos del panel">
                    <Link href="/gestion_usuarios" className={`${estilosAdmin.card} ${estilosAdmin.cardBlue} group flex items-center gap-4 transition hover:-translate-y-1 hover:border-cyan-400/60`}>
                        <span className={estilosAdmin.icon} aria-hidden="true"><i className="fa-solid fa-users-gear" /></span>
                        <span className="min-w-0 flex-1">
                            <span className={`block ${estilosAdmin.sectionTitle}`}>Gestión de Usuarios</span>
                            <span className={`mt-1 block ${estilosAdmin.sectionDescription}`}>Registrar nuevos perfiles, editar credenciales operativas y desactivar cuentas del sistema de forma segura.</span>
                        </span>
                        <i className="fa-solid fa-arrow-right shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" aria-hidden="true" />
                    </Link>

                    <Link href="/gestion_roles" className={`${estilosAdmin.card} ${estilosAdmin.cardTeal} group flex items-center gap-4 transition hover:-translate-y-1 hover:border-teal-300/60`}>
                        <span className={`${estilosAdmin.icon} ${estilosAdmin.iconTeal}`} aria-hidden="true"><i className="fa-solid fa-shield-halved" /></span>
                        <span className="min-w-0 flex-1">
                            <span className={`block ${estilosAdmin.sectionTitle}`}>Roles y Permisos</span>
                            <span className={`mt-1 block ${estilosAdmin.sectionDescription}`}>Auditar la matriz de privilegios y configurar los alcances de acceso para Administradores, Intérpretes y Operadores.</span>
                        </span>
                        <i className="fa-solid fa-arrow-right shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-teal-300" aria-hidden="true" />
                    </Link>

                    <Link href="/diccionario_admin" className={`${estilosAdmin.card} ${estilosAdmin.cardBlue} group flex items-center gap-4 transition hover:-translate-y-1 hover:border-cyan-400/60`}>
                        <span className={estilosAdmin.icon} aria-hidden="true"><i className="fa-solid fa-book-bookmark" /></span>
                        <span className="min-w-0 flex-1">
                            <span className={`block ${estilosAdmin.sectionTitle}`}>Diccionario LSC</span>
                            <span className={`mt-1 block ${estilosAdmin.sectionDescription}`}>Administración completa del glosario multimedia: crear, consultar, visualizar, modificar y eliminar señas oficiales.</span>
                        </span>
                        <i className="fa-solid fa-arrow-right shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" aria-hidden="true" />
                    </Link>

                    <Link href="/aprobacion_senas" className={`${estilosAdmin.card} ${estilosAdmin.cardTeal} group flex items-center gap-4 transition hover:-translate-y-1 hover:border-teal-300/60`}>
                        <span className={`${estilosAdmin.icon} ${estilosAdmin.iconTeal}`} aria-hidden="true"><i className="fa-solid fa-circle-check" /></span>
                        <span className="min-w-0 flex-1">
                            <span className={`block ${estilosAdmin.sectionTitle}`}>Aprobación de Señas</span>
                            <span className={`mt-1 block ${estilosAdmin.sectionDescription}`}>Validar las nuevas señas cargadas por el intérprete y auditar las correcciones léxicas propuestas en tiempo real.</span>
                        </span>
                        <i className="fa-solid fa-arrow-right shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-teal-300" aria-hidden="true" />
                    </Link>

                    <Link href="/configuracion_admin" className={`${estilosAdmin.card} ${estilosAdmin.cardBlue} group flex items-center gap-4 transition hover:-translate-y-1 hover:border-cyan-400/60`}>
                        <span className={estilosAdmin.icon} aria-hidden="true"><i className="fa-solid fa-sliders" /></span>
                        <span className="min-w-0 flex-1">
                            <span className={`block ${estilosAdmin.sectionTitle}`}>Configuración General</span>
                            <span className={`mt-1 block ${estilosAdmin.sectionDescription}`}>Ajustar parámetros core del traductor, gestionar temas visuales e inspeccionar los logs de auditoría técnica.</span>
                        </span>
                        <i className="fa-solid fa-arrow-right shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" aria-hidden="true" />
                    </Link>
            </section>
        </DisenoAdmin>
    );
};

export default PanelAdministracion;
