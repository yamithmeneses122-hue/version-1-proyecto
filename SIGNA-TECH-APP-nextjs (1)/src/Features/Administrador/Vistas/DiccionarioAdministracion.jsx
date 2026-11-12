"use client";

import { useState } from 'react';
import { useToast } from '../../../Hooks/useToastHook';
import EncabezadoTarjetaAdmin from '../Componentes/EncabezadoTarjetaAdmin';
import DisenoAdmin from '../Componentes/DisenoAdmin';
import { estilosAdmin } from '../Componentes/estilosAdmin';
import BarraBusquedaAdmin from '../Componentes/BarraBusquedaAdmin';

const DiccionarioAdministracion = () => {
    const { toasts, toast } = useToast();

    const [busqueda, setBusqueda] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [idEdicion, setIdEdicion] = useState(null);
    const [formData, setFormData] = useState({ palabra: '', categoria: '', icono: '', descripcion: '', imagen: '' });

    const [senas, setSenas] = useState([
        { id: 's1', palabra: 'Hola', categoria: 'Saludos', descripcion: 'Seña de saludo inicial. Se realiza pasando la palma extendida cerca de la frente con un movimiento hacia afuera.', icono: 'fa-solid fa-hand' },
        { id: 's2', palabra: 'Hardware', categoria: 'Técnico', descripcion: 'Término técnico de informática. Se representa configurando ambas manos en forma de pinza simulando estructuras físicas rígidas.', icono: 'fa-solid fa-laptop' },
        { id: 's3', palabra: 'Gracias', categoria: 'Cortesía', descripcion: 'Expresión de cortesía. Se ejecuta apoyando las yemas de los dedos en los labios y extendiendo la mano hacia el receptor.', icono: 'fa-solid fa-hands-praying' },
    ]);

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast('Selecciona un archivo de imagen válido.', 'alerta');
            event.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast('La imagen debe pesar menos de 5 MB.', 'alerta');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                toast('No se pudo leer la imagen seleccionada.', 'error');
                return;
            }
            setFormData((prev) => ({ ...prev, imagen: reader.result }));
        };
        reader.onerror = () => toast('Ocurrió un error al cargar la imagen.', 'error');
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const palabra = formData.palabra.trim();
        const palabraDuplicada = senas.some(
            (sena) => sena.id !== idEdicion && sena.palabra.toLocaleLowerCase() === palabra.toLocaleLowerCase(),
        );

        if (!palabra || !formData.categoria || !formData.icono.trim() || !formData.descripcion.trim()) {
            toast('Completa todos los campos antes de guardar la seña.', 'alerta');
            return;
        }

        if (palabraDuplicada) {
            toast('Ya existe una seña con ese concepto en el catálogo.', 'alerta');
            return;
        }

        if (idEdicion) {
            setSenas((prev) => prev.map((s) => s.id === idEdicion ? { ...s, ...formData, palabra } : s));
            toast('Seña actualizada en la lista de esta sesión.', 'exito');
        } else {
            setSenas((prev) => [...prev, {
                ...formData,
                palabra,
                id: 's' + Date.now(),
            }]);
            toast('Seña agregada a la lista de esta sesión.', 'exito');
        }
        cancelarEdicion();
    };

    const cargarEdicion = (sena) => {
        setIdEdicion(sena.id);
        setFormData({
            palabra: sena.palabra,
            categoria: sena.categoria,
            icono: sena.icono,
            descripcion: sena.descripcion,
            imagen: sena.imagen || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setIdEdicion(null);
        setFormData({ palabra: '', categoria: '', icono: '', descripcion: '', imagen: '' });
    };

    const eliminarSena = (id, palabra) => {
        if (!window.confirm(`¿Eliminar físicamente la seña "${palabra}" del diccionario?`)) return;
        setSenas((prev) => prev.filter((s) => s.id !== id));
        toast(`Seña "${palabra}" eliminada de esta sesión.`, 'info');
    };

    const consultarSena = (sena) => {
        toast(`${sena.palabra}: ${sena.descripcion.substring(0, 80)}...`, 'info');
    };

    const textoFiltro = busqueda.trim().toLocaleLowerCase();
    const senasFiltradas = senas.filter((s) =>
        (!textoFiltro || `${s.palabra} ${s.descripcion} ${s.categoria}`.toLocaleLowerCase().includes(textoFiltro)) &&
        (!categoriaFiltro || s.categoria === categoriaFiltro)
    );

    return (
        <DisenoAdmin
            title="Consola del Diccionario LSC"
            description="Módulo CRUD avanzado. Inserta nuevos términos léxicos, altera traducciones o elimina registros de la base de datos central."
            icon="fa-solid fa-book-bookmark"
            toasts={toasts}
        >
            <section className="flex flex-col gap-6">
                <article className={`${estilosAdmin.card} ${estilosAdmin.cardBlue}`}>
                    <EncabezadoTarjetaAdmin
                        icon={idEdicion ? 'fa-solid fa-pen-to-square' : 'fa-solid fa-file-pen'}
                        title={idEdicion ? 'Modificar Seña Guardada' : 'Agregar Nueva Seña Oficial'}
                        description={idEdicion ? 'Estás editando los parámetros lógicos de un registro existente.' : 'Inserta un nuevo concepto semántico indexado para el motor de traducción.'}
                    />

                    <form className={estilosAdmin.form} onSubmit={handleSubmit} noValidate>
                        <fieldset className={estilosAdmin.fieldset}>
                            <legend className={estilosAdmin.legend}>Concepto / Palabra Clave</legend>
                            <input
                                className={estilosAdmin.input}
                                type="text"
                                name="palabra"
                                value={formData.palabra}
                                onChange={handleInputChange}
                                placeholder="Ej: Hardware, Computador, Hola..."
                                required
                            />
                        </fieldset>

                        <fieldset className={estilosAdmin.fieldset}>
                            <legend className={estilosAdmin.legend}>Imagen o fotografía de la seña</legend>
                            <input
                                className={`${estilosAdmin.input} file:mr-4 file:rounded-md file:border-0 file:bg-cyan-400/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-cyan-300`}
                                type="file"
                                accept="image/png,image/jpeg,image/webp,image/gif"
                                onChange={handleImageChange}
                                aria-describedby="imagen-ayuda"
                            />
                            <p id="imagen-ayuda" className={`mt-2 text-xs ${estilosAdmin.muted}`}>
                                Formatos PNG, JPG, WEBP o GIF; máximo 5 MB. La imagen se conserva solo durante esta sesión.
                            </p>
                            {formData.imagen && (
                                <figure className="mt-3 max-w-sm overflow-hidden rounded-xl border border-[#2a3550] bg-[#0a0f1c] p-2 theme-light:border-slate-300 theme-light:bg-slate-50">
                                    <img
                                        src={formData.imagen}
                                        alt={`Vista previa de la seña ${formData.palabra || 'nueva'}`}
                                        className="aspect-video w-full rounded-lg object-contain"
                                    />
                                    <button
                                        type="button"
                                        className={`${estilosAdmin.button} ${estilosAdmin.secondaryButton} mt-2 w-full`}
                                        onClick={() => setFormData((prev) => ({ ...prev, imagen: '' }))}
                                    >
                                        Quitar imagen
                                    </button>
                                </figure>
                            )}
                        </fieldset>

                        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <fieldset className={estilosAdmin.fieldset}>
                                <legend className={estilosAdmin.legend}>Categoría Léxica</legend>
                                <select className={estilosAdmin.input} name="categoria" value={formData.categoria} onChange={handleInputChange} required>
                                    <option value="" disabled>Seleccione categoría...</option>
                                    <option value="Saludos">Saludos</option>
                                    <option value="Cortesía">Cortesía</option>
                                    <option value="Técnico">Técnico</option>
                                    <option value="Social">Social</option>
                                </select>
                            </fieldset>
                            <fieldset className={estilosAdmin.fieldset}>
                                <legend className={estilosAdmin.legend}>Símbolo Representativo (Ícono)</legend>
                                <input
                                    className={estilosAdmin.input}
                                    type="text"
                                    name="icono"
                                    value={formData.icono}
                                    onChange={handleInputChange}
                                    placeholder="Ej: fa-solid fa-laptop"
                                    required
                                />
                            </fieldset>
                        </section>

                        <fieldset className={estilosAdmin.fieldset}>
                            <legend className={estilosAdmin.legend}>Descripción Técnica de la Gesticulación</legend>
                            <input
                                className={estilosAdmin.input}
                                type="text"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                placeholder="Detalla el movimiento cinemático de las manos..."
                                required
                            />
                        </fieldset>

                        <footer className="flex flex-wrap gap-3">
                            <button type="submit" className={`${estilosAdmin.button} ${estilosAdmin.primaryButton}`}>
                                <i className="fa-solid fa-floppy-disk" aria-hidden="true" />
                                {idEdicion ? 'Actualizar Cambios' : 'Cargar Registro Léxico'}
                            </button>
                            {idEdicion && (
                                <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.secondaryButton}`} onClick={cancelarEdicion}>
                                    Cancelar Edición
                                </button>
                            )}
                        </footer>
                    </form>
                </article>

                <article className={`${estilosAdmin.card} ${estilosAdmin.cardTeal}`}>
                    <EncabezadoTarjetaAdmin
                        icon="fa-solid fa-book"
                        title="Glosario de Control Técnico"
                        description="Consulta el catálogo guardado, visualiza sus estructuras o ejecuta eliminaciones físicas del repositorio."
                        teal
                    />

                    <section className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]" aria-label="Filtros del diccionario">
                        <BarraBusquedaAdmin value={busqueda} onChange={setBusqueda} placeholder="Buscar concepto, categoría o descripción..." />
                        <select
                            className={estilosAdmin.input}
                            value={categoriaFiltro}
                            onChange={(event) => setCategoriaFiltro(event.target.value)}
                            aria-label="Filtrar por categoría"
                        >
                            <option value="">Todas las categorías</option>
                            {[...new Set(senas.map((sena) => sena.categoria))].sort((a, b) => a.localeCompare(b, 'es')).map((categoria) => (
                                <option key={categoria} value={categoria}>{categoria}</option>
                            ))}
                        </select>
                    </section>
                    <p className={`mt-3 text-xs ${estilosAdmin.muted}`} aria-live="polite">
                        {senasFiltradas.length} {senasFiltradas.length === 1 ? 'seña encontrada' : 'señas encontradas'}
                    </p>

                    <ul className={estilosAdmin.list} role="list" aria-label="Catálogo de señas">
                        {senasFiltradas.map((sena) => (
                            <li key={sena.id} className={`${estilosAdmin.listItem} gap-4`}>
                                <figure className="w-full shrink-0 sm:w-36">
                                    {sena.imagen ? (
                                        <img
                                            src={sena.imagen}
                                            alt={`Seña de ${sena.palabra}`}
                                            className="aspect-video w-full rounded-lg border border-[#2a3550] bg-[#0d1117] object-cover theme-light:border-slate-300"
                                        />
                                    ) : (
                                        <figure className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#2a3550] bg-[#0d1117] text-cyan-300 theme-light:border-slate-300 theme-light:bg-slate-100">
                                            <i className={`${sena.icono} text-2xl`} aria-hidden="true" />
                                            <span className="text-[0.65rem] text-slate-400 theme-light:text-slate-600">Sin imagen</span>
                                        </figure>
                                    )}
                                </figure>
                                <section className="min-w-0 flex-1">
                                    <strong className="block text-sm font-semibold text-white theme-light:text-slate-900">Concepto: {sena.palabra}</strong>
                                    <span className={`mt-1 block ${estilosAdmin.muted}`}>{sena.descripcion.substring(0, 60)}...</span>
                                    <p className="mt-2">
                                        <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-200 theme-light:border-blue-700/20 theme-light:bg-blue-700/10 theme-light:text-blue-800">
                                            {sena.categoria}
                                        </span>
                                    </p>
                                </section>
                                <footer className="flex shrink-0 gap-2">
                                    <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.secondaryButton} size-11 px-0`} title="Ver detalles" aria-label={`Ver detalles de ${sena.palabra}`} onClick={() => consultarSena(sena)}>
                                        <i className="fa-solid fa-eye" aria-hidden="true" />
                                    </button>
                                    <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.primaryButton} size-11 px-0`} title="Editar seña" aria-label={`Editar ${sena.palabra}`} onClick={() => cargarEdicion(sena)}>
                                        <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                                    </button>
                                    <button type="button" className={`${estilosAdmin.button} ${estilosAdmin.dangerButton} size-11 px-0`} title="Eliminar seña" aria-label={`Eliminar ${sena.palabra}`} onClick={() => eliminarSena(sena.id, sena.palabra)}>
                                        <i className="fa-solid fa-trash-can" aria-hidden="true" />
                                    </button>
                                </footer>
                            </li>
                        ))}

                        {senasFiltradas.length === 0 && (
                            <li className={estilosAdmin.empty}>
                                <i className="fa-solid fa-book-open text-2xl text-cyan-300" aria-hidden="true" />
                                <span>No se encontraron señas.</span>
                            </li>
                        )}
                    </ul>
                </article>
            </section>
        </DisenoAdmin>
    );
};

export default DiccionarioAdministracion;
