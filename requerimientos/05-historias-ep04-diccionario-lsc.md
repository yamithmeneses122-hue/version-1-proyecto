# SIGNA-TECH-APP — Historias de usuario EP-04: Consulta y administración del diccionario LSC

**Versión:** 1.0  
**Estado:** Especificación funcional derivada de ingeniería inversa del frontend; requiere validación del Product Owner y conexión con servicios persistentes.  
**Rama de documentación:** `documentacion-signa-tech-app`  
**Rama de código inspeccionada:** `correcciones-de-color`  
**Módulo principal:** `src/Features/Operador/Vistas/VistaDiccionario.jsx`  
**Componentes relacionados:** `TarjetaSena.jsx`, `BarraLateral.jsx` y `Administrador/Vistas/DiccionarioAdministracion.jsx`.

---

## 1. Objetivo y alcance

Esta épica define cómo los usuarios consultan el vocabulario de Lengua de Señas Colombiana (LSC) y cómo el rol administrativo mantiene el catálogo de referencia del prototipo.

Se separan dos contextos para evitar mezclar permisos y objetivos:

- **Consulta del operador:** explorar palabras/señas, buscar por concepto o categoría, filtrar categorías, marcar favoritos y abrir la vista de consulta.
- **Mantenimiento administrativo:** registrar, editar, consultar y eliminar entradas del catálogo desde la consola administrativa.

La aprobación lingüística de propuestas y correcciones se mantiene en EP-05 y EP-06. La administración de usuarios y permisos se mantiene en EP-07. Esta épica no afirma que el catálogo ya esté conectado a una base de datos ni que el contenido multimedia represente señas verificadas.

## 2. Evidencia del frontend y diagnóstico

### 2.1 Consulta del operador

Archivo: `src/Features/Operador/Vistas/VistaDiccionario.jsx`.

Se observó:

- Encabezado “Diccionario LSC” y sección “Centro de aprendizaje”.
- Indicador de cantidad de señas, estadísticas de resultados, categorías y favoritos.
- Campo de búsqueda con identificador `input-buscar-seña` y placeholder “Buscar una seña, categoría o concepto...”.
- Categorías visibles: Todos, Saludos, Cotidiano, Emociones y Números.
- Filtro “Solo favoritos”.
- Tarjetas que presentan categoría, nombre, descripción, icono, botón de favorito y acción “Ver seña”.
- Estado vacío “No encontramos esa seña”.
- Modal “Vista de seña”, con cierre por botón, clic en el fondo y tecla Escape.
- El modal indica expresamente que la representación visual todavía no está disponible.
- Se llama a `SpeechSynthesisUtterance` para pronunciar el texto “Demostración de la seña [nombre]” en `es-CO`. Esto es una locución demostrativa, no reproducción de una seña ni traducción LSC.
- El catálogo está definido como un arreglo local de 12 entradas. Los favoritos se guardan en estado React mientras permanece montada la vista; no se encontró persistencia.

Limitaciones comprobadas en la lógica revisada:

- La búsqueda del operador compara el término con el título y la categoría, no con la descripción, aunque el placeholder menciona “concepto”.
- La lista de categorías está codificada de forma fija.
- El modal no muestra video, animación ni imagen de la seña.
- Los favoritos no están asociados a una cuenta ni guardados en almacenamiento persistente.
- No se observó consumo de API ni consulta a una base de datos en el archivo revisado.

### 2.2 Administración del diccionario

Archivo: `src/Features/Administrador/Vistas/DiccionarioAdministracion.jsx`.

Se observó:

- Formulario de alta/edición con palabra, imagen, categoría, icono y descripción.
- Categorías disponibles en el selector: Saludos, Cortesía, Técnico y Social.
- Carga de imagen con lectura mediante `FileReader`; acepta imágenes y limita el tamaño a 5 MB.
- Validación de campos obligatorios y detección local de palabras duplicadas sin distinguir mayúsculas/minúsculas.
- Acciones para editar, cancelar edición, consultar un resumen y eliminar con confirmación.
- Búsqueda administrativa por palabra, descripción y categoría; filtro por categoría.
- Datos iniciales y cambios mantenidos en estado local. Los mensajes indican que el registro se agrega o actualiza en la lista de esta sesión.
- No se comprobó persistencia en servidor, almacenamiento de archivos ni auditoría de cambios.

**Conclusión de ingeniería inversa:** la interfaz de consulta y la consola administrativa existen, pero el catálogo observado es demostrativo/local. No se debe comunicar al usuario final que las señas están respaldadas por un repositorio oficial, que las imágenes están disponibles o que los cambios administrativos se guardan permanentemente sin implementar y verificar esos servicios.

---

## 3. Actores, permisos y reglas generales

| Actor | Permiso dentro de EP-04 |
|---|---|
| Operador | Consultar el diccionario, buscar, filtrar y administrar sus favoritos personales. |
| Administrador | Crear, consultar, editar y eliminar registros del catálogo, sujeto a autorización. |
| Intérprete | No obtiene permisos CRUD automáticamente por su rol. Su participación en revisión lingüística se define en EP-05 y EP-06. |
| Visitante | No se contempla acceso al diccionario privado salvo que el producto decida publicar una versión pública. |

### Reglas de negocio transversales

- **RN-EP04-01:** todo registro debe tener un identificador único, palabra o concepto, categoría y descripción.
- **RN-EP04-02:** el catálogo no debe aceptar conceptos duplicados según la regla de unicidad que defina el negocio. Como línea base se propone comparación sin distinguir mayúsculas/minúsculas y normalización de espacios.
- **RN-EP04-03:** una seña sin recurso visual debe identificarse como “Recurso visual no disponible”; nunca debe mostrarse una imagen genérica como si fuera la seña real.
- **RN-EP04-04:** los favoritos son personales y no modifican el catálogo compartido.
- **RN-EP04-05:** el operador no puede crear, editar ni eliminar registros administrativos desde la vista de consulta.
- **RN-EP04-06:** toda operación administrativa debe informar su resultado real. Un cambio local no puede presentarse como guardado permanente.
- **RN-EP04-07:** el contenido lingüístico debe tener fuente, responsable de revisión o estado de validación cuando se conecte con el flujo de EP-05/EP-06.
- **RN-EP04-08:** la búsqueda y los filtros deben poder combinarse y actualizar los resultados sin perder el contexto de navegación.
- **RN-EP04-09:** las categorías deben proceder de una fuente controlada y no depender de listas incompatibles entre la consulta y la administración.
- **RN-EP04-10:** las acciones deben ser accesibles mediante teclado y lectores de pantalla, con etiquetas comprensibles.

---

## 4. Historias de usuario

# HU-014 — Buscar señas en el diccionario LSC

**Épica:** EP-04  
**Prioridad:** Alta  
**Actor principal:** Operador  
**Tipo:** Consulta

### Historia

Como operador, quiero buscar una seña por su palabra o categoría, para encontrar rápidamente el concepto que necesito consultar.

### Objetivo funcional

Permitir que el operador introduzca un término y obtenga una lista de resultados que coincidan con el contenido indexado del diccionario.

### Pantalla y componentes

En la vista “Diccionario LSC” deben estar disponibles:

1. Barra lateral del operador y acceso “Diccionario LSC”.
2. Encabezado “Centro de aprendizaje / Diccionario LSC”.
3. Indicador de cantidad de señas disponibles.
4. Campo de búsqueda con etiqueta accesible, texto de ayuda y opción para limpiar.
5. Filtros de categoría.
6. Filtro “Solo favoritos”.
7. Contador de resultados.
8. Cuadrícula de tarjetas de señas.
9. Estado vacío cuando no existan coincidencias.
10. Indicador de carga y mensaje de error cuando el catálogo se consulte mediante un servicio remoto.

### Flujo principal

1. El operador inicia sesión y navega a “Diccionario LSC”.
2. El sistema presenta el catálogo disponible y los filtros iniciales.
3. El operador selecciona el campo de búsqueda.
4. Escribe una palabra o fragmento.
5. El sistema normaliza el término para la búsqueda, sin alterar el texto original mostrado.
6. El sistema busca coincidencias en palabra/concepto y categoría. Se recomienda incluir también descripción y sinónimos cuando el modelo de datos lo soporte.
7. La lista se actualiza y el contador refleja el número real de coincidencias.
8. El operador selecciona una tarjeta para abrir la consulta de la seña.

### Flujos alternos y excepciones

- **HU014-A1 — Campo vacío:** al limpiar el término, se restablecen los resultados correspondientes a los demás filtros activos.
- **HU014-A2 — Sin coincidencias:** se muestra “No encontramos esa seña” y una sugerencia para cambiar el término o la categoría. No se presenta una pantalla en blanco.
- **HU014-A3 — Espacios adicionales:** los espacios al inicio/final no deben impedir una coincidencia.
- **HU014-A4 — Diferencia entre mayúsculas y minúsculas:** la búsqueda debe ser insensible a mayúsculas/minúsculas.
- **HU014-A5 — Error de servicio:** se informa que no fue posible cargar el diccionario y se ofrece reintentar; no se debe mostrar un resultado vacío como si no existieran señas.
- **HU014-A6 — Catálogo sin registros:** mostrar un estado específico de catálogo vacío, distinto del estado “sin coincidencias”.

### Criterios de aceptación

- **CA-014-01:** dado que el operador abre el diccionario, cuando la vista termina de cargar, entonces ve el campo de búsqueda y los resultados disponibles.
- **CA-014-02:** dado un término que coincide con una palabra, cuando se escribe, entonces aparecen las entradas coincidentes.
- **CA-014-03:** dado un término con mayúsculas o espacios periféricos, cuando se busca, entonces se obtienen los mismos resultados que con el término normalizado.
- **CA-014-04:** dado un término sin coincidencias, cuando se ejecuta la búsqueda, entonces aparece el estado vacío con orientación para modificar la consulta.
- **CA-014-05:** dado que hay filtros activos, cuando se limpia únicamente la búsqueda, entonces los filtros permanecen activos.
- **CA-014-06:** dado que ocurre un error de carga, cuando el servicio falla, entonces se informa el error y se permite reintentar.
- **CA-014-07:** el contador de resultados coincide con la cantidad de tarjetas efectivamente mostradas.
- **CA-014-08:** el campo dispone de nombre accesible y puede utilizarse con teclado.

### Estado frente al código

**Implementado parcialmente:** existe búsqueda reactiva en el frontend por título y categoría sobre 12 datos locales. No incluye descripción en la búsqueda del operador, no consulta un servicio y no contempla estados de carga/error de API. El placeholder promete buscar “concepto”, pero la lógica no cubre descripción.

### Dependencias y tareas técnicas

- Definir contrato de consulta del catálogo.
- Acordar campos indexables, sinónimos y normalización.
- Implementar paginación o carga incremental si el catálogo crece.
- Añadir pruebas unitarias de búsqueda y pruebas de interfaz.
- Mantener los filtros y el término de búsqueda al volver desde el detalle.

---

# HU-015 — Filtrar el diccionario por categoría y favoritos

**Épica:** EP-04  
**Prioridad:** Alta  
**Actor principal:** Operador  
**Tipo:** Consulta y personalización

### Historia

Como operador, quiero filtrar las señas por categoría y consultar únicamente mis favoritas, para concentrarme en el vocabulario que estoy aprendiendo o utilizando.

### Objetivo funcional

Combinar filtros de categoría y favoritos con el término de búsqueda, reflejando de forma consistente el conjunto de resultados.

### Pantalla y componentes

- Navegación de categorías: “Todos” y categorías disponibles.
- Control “Solo favoritos”.
- Indicador de categoría activa.
- Contador de resultados y total de favoritos.
- Tarjetas con acción para agregar/quitar favorito.
- Estado vacío específico cuando no existan favoritos o cuando la combinación de filtros no encuentre coincidencias.

### Flujo principal

1. El operador abre el diccionario.
2. El sistema muestra la categoría “Todos” como selección inicial.
3. El operador selecciona una categoría.
4. El sistema actualiza los resultados sin abandonar la vista.
5. El operador puede activar “Solo favoritos”.
6. El sistema limita los resultados a los registros marcados como favoritos y conserva el filtro de categoría y el término de búsqueda.
7. El operador marca la estrella de una tarjeta para agregarla a favoritos.
8. Si vuelve a pulsar la estrella, la seña deja de ser favorita.
9. El contador de favoritos se actualiza.

### Flujos alternos y excepciones

- **HU015-A1 — Volver a Todos:** elimina únicamente el filtro de categoría.
- **HU015-A2 — Sin favoritos:** si el filtro está activo y no existen favoritos, se muestra una explicación y una invitación a marcar señas.
- **HU015-A3 — Quitar favorito durante el filtro:** si se elimina de favoritos una tarjeta visible mientras “Solo favoritos” está activo, la tarjeta desaparece de la lista y se actualizan los contadores.
- **HU015-A4 — Filtros combinados sin resultados:** mostrar estado vacío y permitir retirar filtros.
- **HU015-A5 — Error al guardar favorito:** si se implementa persistencia remota y falla, informar que no se pudo guardar y mantener un estado coherente; no mostrar confirmación falsa.

### Criterios de aceptación

- **CA-015-01:** dado el diccionario, cuando el operador selecciona una categoría, entonces solo se muestran señas de esa categoría.
- **CA-015-02:** cuando selecciona “Todos”, se retira el filtro de categoría.
- **CA-015-03:** cuando activa “Solo favoritos”, se muestran exclusivamente las señas marcadas.
- **CA-015-04:** cuando marca una seña como favorita, la estrella cambia de estado y el contador aumenta una unidad.
- **CA-015-05:** cuando quita una seña de favoritos, la estrella vuelve a estado inactivo y el contador disminuye una unidad.
- **CA-015-06:** los filtros de búsqueda, categoría y favoritos se aplican simultáneamente.
- **CA-015-07:** el estado de favorito se representa con una etiqueta accesible que indique la acción disponible.
- **CA-015-08:** los favoritos pertenecen al usuario autenticado y se conservan entre sesiones una vez implementada la persistencia.
- **CA-015-09:** el sistema distingue entre “no hay favoritos guardados” y “no hay resultados para los filtros aplicados”.

### Estado frente al código

**Implementado parcialmente:** los filtros de categoría y favoritos funcionan con estado local React. Los favoritos desaparecen al desmontar la vista o recargar, ya que no se observó persistencia. Las categorías del operador son distintas a las categorías que ofrece el formulario administrativo, por lo que se requiere catálogo unificado.

### Dependencias y tareas técnicas

- Definir relación usuario-favorito-seña o mecanismo equivalente.
- Definir si el favorito se sincroniza entre dispositivos.
- Unificar identificadores y categorías del diccionario.
- Probar combinaciones de búsqueda, categoría y favoritos.

---

# HU-016 — Consultar el detalle y la representación de una seña

**Épica:** EP-04  
**Prioridad:** Alta  
**Actor principal:** Operador  
**Tipo:** Consulta de contenido

### Historia

Como operador, quiero abrir una seña y consultar su significado, descripción y representación visual, para comprender cómo se expresa y utilizarla como referencia.

### Objetivo funcional

Mostrar una ficha de consulta con información lingüística y un recurso visual asociado cuando esté disponible y validado.

### Pantalla y componentes

La ficha o modal debe incluir:

- Nombre o concepto de la seña.
- Categoría.
- Descripción clara y comprensible.
- Recurso visual: imagen, secuencia o video, según el contenido aprobado.
- Texto alternativo o descripción accesible del recurso.
- Control de reproducción si el recurso es animado o audiovisual.
- Control para detener o reiniciar la reproducción.
- Acción para cerrar la ficha.
- Acción para agregar/quitar favorito.
- Aviso visible cuando el recurso visual no esté disponible.
- Indicador de carga y mensaje de error si el recurso no puede recuperarse.

### Flujo principal

1. El operador localiza una seña en los resultados.
2. Selecciona “Ver seña”.
3. El sistema abre una ficha o diálogo asociado al registro seleccionado.
4. Se presentan el concepto, categoría y descripción.
5. Si existe un recurso visual aprobado, se muestra y permite consultarlo.
6. Si existe un recurso audiovisual, el operador puede reproducirlo, pausarlo o reiniciarlo.
7. El operador puede marcar la seña como favorita.
8. El operador cierra la ficha y regresa a la lista conservando la búsqueda y los filtros.

### Flujos alternos y excepciones

- **HU016-A1 — Recurso no disponible:** mostrar “La representación visual de esta seña aún no está disponible” o un mensaje equivalente, sin simular una animación.
- **HU016-A2 — Recurso no cargado:** informar que el recurso no pudo cargarse y permitir reintentar.
- **HU016-A3 — Cierre con Escape:** cerrar el diálogo y detener cualquier reproducción activa.
- **HU016-A4 — Clic en fondo:** cerrar el diálogo solo si el usuario pulsa fuera del contenido; los clics dentro de la ficha no deben cerrarla.
- **HU016-A5 — Cambio de seña:** detener el recurso anterior antes de presentar el siguiente para evitar reproducciones simultáneas.
- **HU016-A6 — Recurso sin descripción accesible:** no declarar la ficha completamente accesible hasta proporcionar texto alternativo o una alternativa equivalente.

### Criterios de aceptación

- **CA-016-01:** al seleccionar “Ver seña”, la ficha presenta el concepto correspondiente a la tarjeta seleccionada.
- **CA-016-02:** la ficha presenta categoría y descripción asociadas al registro.
- **CA-016-03:** si existe un recurso visual aprobado, se muestra el recurso correcto y no uno perteneciente a otra seña.
- **CA-016-04:** si no existe recurso visual, se muestra un aviso explícito.
- **CA-016-05:** si el recurso es audiovisual, los controles de reproducción ejecutan acciones reales.
- **CA-016-06:** al cerrar con el botón o la tecla Escape, la ficha se cierra y cualquier reproducción se detiene.
- **CA-016-07:** la ficha conserva el contexto de búsqueda y filtros al cerrarse.
- **CA-016-08:** el diálogo declara semántica accesible, administra el foco y permite navegación por teclado.
- **CA-016-09:** no se presenta una locución de texto como si fuera una representación de la seña.

### Estado frente al código

**Implementado parcialmente:** existe tarjeta con acción “Ver seña” y modal con título, descripción y cierre mediante botón, fondo y Escape. El modal informa que la representación visual no está disponible. La función `reproducirSena` pronuncia una frase demostrativa mediante síntesis de voz; no reproduce un video ni representa el movimiento de la seña. Se requiere revisar y completar la accesibilidad del foco del diálogo.

### Dependencias y tareas técnicas

- Definir modelo de recursos multimedia y almacenamiento.
- Asociar cada recurso con una seña y su versión aprobada.
- Establecer formatos, tamaño máximo, duración y controles del reproductor.
- Definir licencias, procedencia y revisión lingüística del contenido.
- Probar que el recurso cargado corresponde al identificador de la seña.

---

# HU-017 — Administrar los registros del diccionario LSC

**Épica:** EP-04  
**Prioridad:** Alta  
**Actor principal:** Administrador  
**Tipo:** Gestión de catálogo

### Historia

Como administrador, quiero crear, consultar, editar y eliminar registros del diccionario LSC, para mantener organizado y actualizado el catálogo de referencia de la aplicación.

### Objetivo funcional

Gestionar los datos de cada entrada del catálogo desde una consola administrativa, validando la información y los recursos asociados antes de guardar.

### Pantalla y componentes

La consola “Diccionario LSC” debe organizarse en dos bloques:

**A. Formulario de alta o edición**
- Título dinámico: “Agregar Nueva Seña” o “Modificar Seña Guardada”.
- Campo “Concepto / Palabra clave”.
- Selector “Categoría léxica”.
- Campo de descripción técnica/lingüística.
- Campo de recurso visual o multimedia.
- Vista previa del recurso seleccionado.
- Acción “Quitar imagen” o retirar recurso.
- Campo de icono solo si el diseño del producto confirma que es un dato funcional y no un detalle interno de presentación.
- Botón principal “Cargar Registro Léxico” o “Actualizar Cambios”.
- Botón “Cancelar Edición” cuando se edita.

**B. Catálogo administrativo**
- Campo de búsqueda por concepto, descripción o categoría.
- Filtro por categoría.
- Contador de registros encontrados.
- Lista de registros con concepto, descripción resumida, categoría y recurso visual.
- Acción “Ver detalles”.
- Acción “Editar”.
- Acción “Eliminar”.
- Estado vacío cuando no existan coincidencias.

### Flujo de creación

1. El administrador accede a la consola.
2. Selecciona agregar una nueva seña.
3. Introduce palabra/concepto, categoría y descripción.
4. Adjunta un recurso visual si está disponible.
5. El sistema valida campos obligatorios, formato, tamaño y duplicados.
6. El administrador confirma el registro.
7. El sistema guarda el registro en el repositorio persistente.
8. Se informa el resultado real de la operación y el nuevo registro aparece en el catálogo.

### Flujo de edición

1. El administrador localiza el registro.
2. Selecciona “Editar”.
3. El formulario carga los valores existentes.
4. El administrador modifica los campos permitidos.
5. El sistema valida los cambios.
6. El administrador confirma la actualización.
7. El sistema conserva el identificador del registro, actualiza los datos y confirma el resultado.
8. La lista refleja la versión actualizada.

### Flujo de eliminación

1. El administrador localiza el registro.
2. Selecciona “Eliminar”.
3. El sistema muestra confirmación con el concepto exacto que será eliminado.
4. El administrador confirma o cancela.
5. Si confirma, el sistema ejecuta la eliminación o desactivación según la política definida.
6. El sistema informa el resultado y actualiza el listado.

### Validaciones y reglas específicas

- El concepto es obligatorio y no puede contener únicamente espacios.
- La categoría es obligatoria y debe pertenecer al catálogo controlado.
- La descripción es obligatoria y debe tener longitud máxima definida por el modelo de datos.
- El recurso visual, cuando se adjunte, debe ser de un formato permitido y cumplir el límite de tamaño configurado.
- El sistema debe detectar duplicados usando una comparación normalizada.
- El sistema debe impedir que un usuario sin permiso administrativo ejecute operaciones CRUD.
- El sistema debe validar también en servidor; las validaciones del navegador no son suficientes.
- La eliminación debe considerar referencias desde favoritos, traducciones, datasets o historial. No debe romper claves foráneas ni borrar evidencia histórica.
- Se recomienda utilizar estado “inactivo/retirado” cuando existan referencias o cuando el contenido haya sido publicado y deba conservar trazabilidad.
- Los cambios de contenido lingüístico sujetos a aprobación deben integrarse con EP-05 y EP-06; la edición administrativa no debe saltarse controles de revisión acordados.

### Flujos alternos y excepciones

- **HU017-A1 — Campos incompletos:** señalar los campos que requieren corrección y no guardar.
- **HU017-A2 — Duplicado:** informar que ya existe un concepto equivalente y conservar los datos del formulario.
- **HU017-A3 — Archivo inválido:** rechazar el archivo e indicar formatos permitidos.
- **HU017-A4 — Archivo superior al límite:** rechazarlo e informar el tamaño máximo.
- **HU017-A5 — Error de lectura:** informar que no se pudo procesar el archivo y permitir seleccionarlo de nuevo.
- **HU017-A6 — Cancelar edición:** descartar cambios no guardados y volver al estado inicial del formulario; si existen cambios, solicitar confirmación antes de perderlos.
- **HU017-A7 — Cancelar eliminación:** conservar el registro sin cambios.
- **HU017-A8 — Error de servidor:** conservar los datos introducidos, informar que no se guardó y permitir reintentar.
- **HU017-A9 — Registro relacionado:** impedir la eliminación física si existen dependencias; proponer desactivación o retiro controlado.
- **HU017-A10 — Sesión expirada o permiso insuficiente:** bloquear la operación y solicitar autenticación/autorización válida.

### Criterios de aceptación

- **CA-017-01:** un administrador autorizado puede abrir la consola y consultar los registros existentes.
- **CA-017-02:** el formulario exige concepto, categoría y descripción.
- **CA-017-03:** el sistema rechaza conceptos vacíos o duplicados según la regla de normalización.
- **CA-017-04:** el sistema acepta únicamente los formatos de recurso definidos y valida el tamaño antes de cargar.
- **CA-017-05:** al seleccionar un recurso válido, se muestra una vista previa y una alternativa para retirarlo.
- **CA-017-06:** al guardar correctamente, el registro queda disponible después de recargar la aplicación y de iniciar una nueva sesión.
- **CA-017-07:** al editar, se cargan los datos actuales y el identificador permanece estable.
- **CA-017-08:** al cancelar una edición, no se persisten los cambios no confirmados.
- **CA-017-09:** antes de eliminar, se presenta confirmación que identifica el registro.
- **CA-017-10:** si el registro tiene relaciones que impiden eliminarlo, el sistema bloquea la eliminación física y explica la alternativa.
- **CA-017-11:** el buscador administrativo encuentra coincidencias en concepto, descripción y categoría.
- **CA-017-12:** el filtro por categoría puede combinarse con la búsqueda.
- **CA-017-13:** los mensajes de éxito solo aparecen después de una respuesta exitosa del repositorio persistente.
- **CA-017-14:** un operador o usuario sin permiso administrativo no puede ejecutar alta, edición ni eliminación aunque intente invocar directamente la operación.
- **CA-017-15:** las operaciones administrativas generan trazabilidad cuando se conecten con el mecanismo de auditoría definido para el proyecto.

### Estado frente al código

**Implementado parcialmente:** la consola permite alta, edición, eliminación, búsqueda y filtro sobre un arreglo local. Valida campos obligatorios, duplicados y archivos de imagen; usa `FileReader` y un máximo de 5 MB. Los mensajes explícitamente indican que los cambios se conservan en la lista de esta sesión. No se comprobó persistencia, almacenamiento de archivos, autorización de backend, historial de versiones ni auditoría.

### Dependencias y tareas técnicas

- Diseñar entidad de seña y catálogo de categorías.
- Definir identificadores, restricciones de unicidad y relaciones.
- Definir API para operaciones CRUD y carga de archivos.
- Implementar autorización en servidor.
- Definir política de eliminación lógica/física y tratamiento de referencias.
- Integrar auditoría y flujo de aprobación de EP-05/EP-06.
- Añadir pruebas de validación, persistencia, permisos y errores.

---

## 5. Requisitos no funcionales de la épica

- **RNF-EP04-01 — Accesibilidad:** controles con etiquetas, foco visible, navegación por teclado, contraste suficiente y mensajes compatibles con tecnologías de asistencia.
- **RNF-EP04-02 — Rendimiento:** la búsqueda local debe responder sin bloqueos perceptibles; para catálogos remotos se definirá un objetivo de rendimiento y estrategia de paginación.
- **RNF-EP04-03 — Integridad:** cada recurso multimedia debe estar asociado a un registro válido y no debe quedar huérfano.
- **RNF-EP04-04 — Seguridad:** las operaciones CRUD deben verificar permisos en servidor y validar archivos.
- **RNF-EP04-05 — Disponibilidad de contenido:** errores de carga no deben confundirse con ausencia de resultados.
- **RNF-EP04-06 — Compatibilidad:** la consulta debe funcionar en los navegadores y tamaños de pantalla definidos para el producto.
- **RNF-EP04-07 — Claridad lingüística:** las descripciones deben utilizar lenguaje comprensible y contar con revisión de una persona competente en LSC antes de considerarse contenido validado.

## 6. Trazabilidad entre historias y elementos observados

| Historia | Evidencia principal | Brecha principal |
|---|---|---|
| HU-014 | Campo de búsqueda y filtro local en `VistaDiccionario.jsx` | Búsqueda limitada a título/categoría; sin servicio remoto |
| HU-015 | Estados `favoritos`, `categoriaActiva`, `soloFavoritos` | Favoritos no persistentes; categorías no unificadas |
| HU-016 | `TarjetaSena.jsx`, modal de `VistaDiccionario.jsx` | Sin recurso visual real; locución es demostrativa |
| HU-017 | `DiccionarioAdministracion.jsx` | CRUD local; sin persistencia, autorización de servidor ni auditoría |

## 7. Definition of Done — EP-04

Una historia de esta épica solo se considerará terminada cuando:

1. El comportamiento esté implementado y revisado en la rama de desarrollo correspondiente.
2. Los criterios de aceptación estén cubiertos por pruebas reproducibles.
3. Las validaciones se ejecuten en cliente y servidor cuando corresponda.
4. Los permisos se comprueben en backend, no únicamente ocultando botones.
5. Los datos y recursos sobrevivan a una recarga y a una nueva sesión cuando el requisito implique persistencia.
6. Los errores de red, carga y validación tengan mensajes claros.
7. La interfaz sea utilizable con teclado y tenga etiquetas accesibles.
8. El recurso multimedia mostrado corresponda al registro y tenga procedencia/revisión documentada.
9. Las operaciones administrativas respeten integridad referencial y generen trazabilidad según el diseño aprobado.
10. La documentación técnica y funcional esté actualizada.
11. El Product Owner valide el resultado en un entorno de pruebas.

## 8. Pendientes de definición con el Product Owner

- Confirmar si el catálogo de consulta debe incluir exclusivamente LSC validada o también vocabulario técnico propuesto.
- Definir si la descripción y los sinónimos forman parte de la búsqueda del operador.
- Definir el tipo de recurso visual prioritario: fotografía, secuencia de imágenes, GIF o video.
- Definir si el audio de apoyo se conserva como función complementaria y evitar confundirlo con la representación de la seña.
- Unificar las categorías del diccionario del operador y de la consola administrativa.
- Definir si los cambios del administrador se publican inmediatamente o requieren aprobación del intérprete.
- Definir política de eliminación lógica, versionado y conservación de favoritos cuando una seña se retire.
- Definir tamaño máximo, formatos, duración y almacenamiento de recursos multimedia.
- Definir fuente y validación lingüística de cada entrada.

## 9. Control de cambios

| Versión | Cambio |
|---|---|
| 1.0 | Primera especificación detallada de EP-04 basada en inspección de la vista de consulta del operador, su tarjeta de seña, navegación y consola administrativa. |

---

**Nota:** este documento describe el comportamiento observado y el comportamiento objetivo por separado. La existencia de una pantalla o de datos locales no acredita persistencia, validez lingüística oficial ni integración con inteligencia artificial.