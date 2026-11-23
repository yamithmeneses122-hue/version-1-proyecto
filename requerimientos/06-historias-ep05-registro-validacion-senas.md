# SIGNA-TECH-APP — Historias de usuario EP-05: Registro y validación de señas

**Versión:** 1.0  
**Estado:** Especificación funcional basada en inspección del frontend; requiere backend, seguridad y validación lingüística para producción.  
**Rama de documentación:** `documentacion-signa-tech-app`  
**Rama de código inspeccionada:** `correcciones-de-color`  
**Módulo:** `src/Features/Interprete/`

---

## 1. Propósito y límites de la épica

EP-05 define el flujo mediante el cual una persona intérprete registra una propuesta de seña y posteriormente revisa propuestas pendientes para validarlas o rechazarlas. El objetivo es que el diccionario no incorpore contenido nuevo sin un proceso de revisión identificable.

Esta épica cubre:

- Captura de palabra, categoría, significado, descripción y recurso visual.
- Conservación temporal del borrador de registro.
- Envío de una propuesta al conjunto de señas pendientes.
- Consulta y filtrado de propuestas por palabra, categoría y estado.
- Inspección de la información y del recurso adjunto.
- Decisión de validar o rechazar con motivo obligatorio en caso de rechazo.

No cubre la edición posterior de señas ya revisadas, que corresponde a EP-06; ni la consulta general del catálogo, que corresponde a EP-04; ni la administración de cuentas y permisos, que corresponde a EP-07.

## 2. Evidencia técnica inspeccionada

### 2.1 Archivos y responsabilidades

| Archivo | Responsabilidad observada |
|---|---|
| `Vistas/Registrar.jsx` | Enruta/renderiza el formulario de registro. |
| `Componentes/ContenidoRegistro.jsx` | Formulario, adjuntos, borrador, validación y confirmación de registro. |
| `Vistas/Validar.jsx` | Enruta/renderiza la bandeja de validación. |
| `Componentes/ContenidoValidacion.jsx` | Filtros, selección, vista previa, decisión de validar/rechazar. |
| `Componentes/TarjetaSena.jsx` | Presentación resumida de una propuesta y selección. |
| `funcionalidades/interpreterActions.js` | Registra propuestas y cambia estado, generando historial local. |
| `funcionalidades/interpreterStorage.js` | Lee/escribe señas, historial y borrador en localStorage. |
| `funcionalidades/interpreterUtils.js` | Normalización, filtros y validación de campos. |
| `data/interpreterData.js` | Categorías y datos iniciales demostrativos. |

### 2.2 Registro: comportamiento observado

- Campos: Palabra, Categoría, Significado y Descripción de la seña.
- Categorías iniciales: Personas, Acciones, Educación, Lugares y Objetos.
- Adjunto opcional: PNG, JPG/JPEG, WEBP o MP4.
- Límite de archivo: 1 MB.
- La vista previa muestra imágenes o video MP4.
- El borrador se guarda automáticamente en localStorage del dispositivo.
- La validación de formulario exige palabra, significado y descripción; la categoría tiene valor inicial “Personas”.
- Al registrar, se crea identificador con `Date.now()`, estado “Pendiente” y fecha local.
- Se agrega un registro al historial local con acción “Revisión”.
- El mensaje indica que la seña quedó pendiente de validación.

### 2.3 Validación: comportamiento observado

- Bandeja con búsqueda por palabra/significado, filtro de categoría y filtro de estado.
- Estados visibles: Pendiente, Todos, Validada, Rechazada y Corregida.
- Panel de lista con tarjetas y contador de pendientes.
- Panel de vista previa con recurso, palabra, estado, categoría, significado y descripción.
- Acciones “Validar seña” y “Rechazar” solo para registros pendientes.
- El rechazo abre un diálogo y exige un motivo no vacío, con máximo de 500 caracteres.
- Tras la decisión, se selecciona la siguiente propuesta pendiente que coincide con los filtros.
- El cambio de estado y el historial se escriben en localStorage.

### 2.4 Límites y riesgos detectados

- Los datos iniciales son arreglos de demostración.
- `localStorage` es almacenamiento del navegador/dispositivo, no base de datos central ni sincronización multiusuario.
- El actor se registra como cadena fija “Intérprete”; no se identifica de forma segura al usuario autenticado.
- No se observa API ni transacción de servidor para registrar, validar o rechazar.
- No se observan permisos aplicados en backend.
- No hay evidencia de revisión lingüística externa ni certificación de que los ejemplos sean señas oficiales de LSC.
- El registro genera ID basado en tiempo, que no sustituye un identificador único generado por servidor.
- El formulario guarda borrador automáticamente; el botón “Limpiar” reinicia el formulario, pero la política de confirmación ante pérdida de borrador debe formalizarse.
- El archivo se almacena como Data URL en localStorage, limitado a 1 MB; no es una estrategia adecuada para almacenamiento multimedia de producción.
- La validación actual no exige adjunto visual; se debe decidir si será obligatorio para la publicación o solo recomendado.

---

## 3. Actores, estados y reglas de negocio

### Actores

| Actor | Responsabilidad |
|---|---|
| Intérprete autenticado | Registrar propuestas y revisar las que tenga asignadas o que estén disponibles en la bandeja, según política de asignación. |
| Administrador | Administrar permisos y supervisar el catálogo; no sustituye automáticamente la revisión lingüística. |
| Operador | No registra ni valida propuestas desde este flujo. |

### Estados de la propuesta

| Estado | Significado | Transición permitida en EP-05 |
|---|---|---|
| Pendiente | Propuesta recibida y aún no decidida. | Validada o Rechazada |
| Validada | Propuesta aprobada para continuar al catálogo/publicación según política. | No se modifica en esta épica |
| Rechazada | Propuesta no aceptada; debe conservarse el motivo. | No se reabre automáticamente |
| Corregida | Estado usado por el módulo de correcciones; su ciclo pertenece a EP-06. | Fuera del alcance de EP-05 |

### Reglas de negocio

- **RN-EP05-01:** toda propuesta nueva inicia en estado “Pendiente”.
- **RN-EP05-02:** el registro debe identificar al intérprete real que realizó la acción.
- **RN-EP05-03:** la palabra, significado y descripción son obligatorios.
- **RN-EP05-04:** la categoría debe pertenecer al catálogo controlado.
- **RN-EP05-05:** el adjunto es opcional en el prototipo observado; el Product Owner debe definir si será obligatorio antes de aprobar una propuesta para publicación.
- **RN-EP05-06:** solo una propuesta en estado “Pendiente” puede recibir decisión de validación o rechazo desde esta bandeja.
- **RN-EP05-07:** el rechazo requiere un motivo no vacío, comprensible y asociado a la propuesta.
- **RN-EP05-08:** una decisión debe registrar actor, fecha/hora, estado anterior, estado nuevo y motivo cuando aplique.
- **RN-EP05-09:** una propuesta no debe duplicarse por doble clic, reintento de red o envío repetido.
- **RN-EP05-10:** la validación significa aprobación de contenido dentro del flujo del proyecto; no debe presentarse como certificación oficial de LSC si no existe autoridad o proceso que la respalde.
- **RN-EP05-11:** las propuestas rechazadas se conservan para trazabilidad y no se eliminan automáticamente.
- **RN-EP05-12:** las operaciones se autorizan en servidor; ocultar botones en la interfaz no constituye control de acceso.
- **RN-EP05-13:** si dos intérpretes intentan decidir simultáneamente sobre la misma propuesta, el servidor debe aceptar una única transición válida y comunicar el conflicto al segundo.
- **RN-EP05-14:** la publicación al diccionario consultable debe respetar el flujo definido entre EP-04, EP-05 y el mantenimiento posterior.

---

## 4. Historias de usuario

# HU-018 — Registrar una nueva propuesta de seña

**Épica:** EP-05  
**Prioridad:** Alta  
**Actor principal:** Intérprete  
**Tipo:** Registro

### Historia

Como intérprete, quiero registrar una nueva propuesta de seña con su palabra, categoría, significado, descripción y recurso visual, para que pueda ser revisada antes de incorporarse al diccionario LSC.

### Objetivo

Capturar la información mínima necesaria para que otra instancia autorizada pueda evaluar la propuesta y tomar una decisión informada.

### Pantalla: “Registrar seña”

La pantalla debe incluir:

1. Encabezado “Registrar seña” y explicación del propósito.
2. Sección “Información de la seña”.
3. Campo “Palabra”.
4. Selector “Categoría”.
5. Campo multilínea “Significado”.
6. Campo multilínea “Descripción de la seña”.
7. Sección “Recurso visual”.
8. Selector de archivo con formatos admitidos y tamaño máximo informado.
9. Vista previa del archivo seleccionado.
10. Acción “Quitar recurso”.
11. Indicador de guardado automático del borrador.
12. Acción “Limpiar”.
13. Acción principal “Registrar seña”.
14. Mensajes de validación, error y confirmación accesibles.

### Datos del formulario

| Campo | Tipo | Requerido | Regla |
|---|---|---:|---|
| Palabra | Texto | Sí | No vacío; eliminar espacios periféricos; longitud máxima por definir. |
| Categoría | Selector | Sí | Valor de catálogo controlado. |
| Significado | Texto multilínea | Sí | No vacío; longitud máxima por definir. |
| Descripción | Texto multilínea | Sí | No vacío; longitud máxima por definir. |
| Recurso visual | Archivo imagen/video | Por definir | En el frontend actual es opcional; formatos y límite configurados. |

### Flujo principal

1. El intérprete autenticado abre “Registrar seña”.
2. El sistema presenta el formulario vacío o recupera el borrador guardado en el dispositivo.
3. El intérprete escribe la palabra.
4. Selecciona una categoría.
5. Describe el significado del concepto.
6. Describe cómo se realiza la seña, utilizando información suficientemente clara para revisión.
7. Selecciona opcionalmente un archivo visual.
8. El sistema verifica el formato y tamaño antes de leerlo.
9. Si el archivo es válido, muestra una vista previa.
10. El sistema conserva el borrador de forma automática.
11. El intérprete pulsa “Registrar seña”.
12. El sistema valida los campos obligatorios y envía la propuesta al servicio.
13. El servidor registra la propuesta con identificador, autor, fecha/hora y estado “Pendiente”.
14. La interfaz confirma el registro y limpia el formulario según la política de borradores.
15. La propuesta aparece en la bandeja de validación.

### Flujos alternos y excepciones

- **HU018-A1 — Borrador existente:** recuperar los datos guardados localmente y permitir continuar editándolos.
- **HU018-A2 — Campo obligatorio vacío:** señalar el campo y evitar el envío.
- **HU018-A3 — Archivo no permitido:** aceptar únicamente los tipos configurados y explicar los formatos admitidos.
- **HU018-A4 — Archivo supera límite:** rechazarlo antes de procesarlo y mostrar el límite exacto.
- **HU018-A5 — Error al leer archivo:** mostrar mensaje, conservar el resto del formulario y permitir reintentar.
- **HU018-A6 — Quitar recurso:** eliminar la selección y la vista previa sin borrar los demás campos.
- **HU018-A7 — Limpiar formulario:** limpiar los campos y el adjunto; si existe contenido no enviado, solicitar confirmación para evitar pérdida accidental.
- **HU018-A8 — Fallo al guardar borrador:** advertir que el contenido no quedó guardado localmente; no afirmar que está protegido.
- **HU018-A9 — Fallo de envío:** conservar el contenido para reintento y mostrar un error; no presentar confirmación de registro.
- **HU018-A10 — Doble envío:** bloquear temporalmente el botón mientras se procesa y evitar crear dos propuestas idénticas por el mismo intento.
- **HU018-A11 — Sesión vencida:** no registrar como un usuario genérico; solicitar autenticación y conservar el borrador cuando sea posible.
- **HU018-A12 — Posible duplicado:** advertir al intérprete y permitir revisar la coincidencia antes de continuar, según política de duplicados.

### Criterios de aceptación

- **CA-018-01:** al abrir el formulario, se presentan los cinco campos definidos y las acciones principales.
- **CA-018-02:** el sistema impide enviar si palabra, significado o descripción están vacíos.
- **CA-018-03:** el sistema elimina espacios periféricos y rechaza contenido compuesto únicamente por espacios.
- **CA-018-04:** el selector muestra exclusivamente categorías autorizadas.
- **CA-018-05:** el sistema acepta los formatos de archivo definidos y rechaza los demás.
- **CA-018-06:** el archivo que supera el tamaño máximo no se procesa y se informa el límite.
- **CA-018-07:** un archivo válido muestra una vista previa correcta y puede retirarse.
- **CA-018-08:** el borrador se recupera al volver a abrir la vista en el mismo dispositivo, mientras exista y sea válido.
- **CA-018-09:** al registrar correctamente, la propuesta queda en estado “Pendiente”.
- **CA-018-10:** el registro conserva el identificador del intérprete autenticado y la fecha/hora del servidor.
- **CA-018-11:** al fallar el envío, no se muestra mensaje de éxito y se conservan los datos para reintentar.
- **CA-018-12:** al completar el registro, la propuesta puede localizarse en la bandeja de validación.
- **CA-018-13:** la acción “Limpiar” no elimina datos sin confirmación cuando existe contenido ingresado.
- **CA-018-14:** el botón de envío impide envíos repetidos mientras exista una solicitud en curso.

### Estado frente al código

**Implementado parcialmente en frontend:** formulario, validación de campos, categorías, carga y vista previa de adjuntos, límite de 1 MB, borrador automático en localStorage y registro en almacenamiento local con estado “Pendiente”. No se observó persistencia central, API, identificación real del usuario ni almacenamiento de archivos en servidor. El límite de 1 MB y los tipos PNG/JPEG/WEBP/MP4 son valores actualmente codificados en el frontend, sujetos a decisión de producto.

### Dependencias técnicas

- Endpoint de creación de propuesta.
- Autenticación e identificación del intérprete.
- Modelo persistente de propuesta y recurso multimedia.
- Validación de archivo en servidor, además de cliente.
- Política de duplicados y de obligatoriedad del recurso visual.
- Estrategia para borrar o conservar borradores tras envío exitoso.

---

# HU-019 — Revisar, validar o rechazar propuestas de señas

**Épica:** EP-05  
**Prioridad:** Crítica  
**Actor principal:** Intérprete autorizado  
**Tipo:** Revisión y decisión

### Historia

Como intérprete autorizado, quiero revisar las propuestas pendientes y aprobarlas o rechazarlas indicando el motivo cuando corresponda, para asegurar que el contenido que avance al diccionario tenga una revisión controlada.

### Objetivo

Proporcionar una bandeja de revisión que permita localizar propuestas, inspeccionar su contenido y registrar una decisión trazable.

### Pantalla: “Validar señas”

La pantalla se compone de:

**A. Encabezado**
- Título “Validar señas”.
- Descripción de la tarea de revisión.

**B. Filtros**
- Búsqueda por palabra.
- Selector de categoría.
- Selector de estado: Pendiente, Todos, Validada, Rechazada y Corregida.
- Los filtros deben poder combinarse.

**C. Panel de listado**
- Contador de resultados.
- Contador de propuestas pendientes.
- Tarjetas con palabra, categoría, fecha y estado.
- Acción “Seleccionar”.
- Estado vacío cuando no existan coincidencias.

**D. Panel de vista previa**
- Recurso visual o multimedia, cuando exista.
- Palabra.
- Estado.
- Categoría.
- Significado.
- Descripción.
- Acciones “Rechazar” y “Validar seña” cuando la propuesta esté pendiente.

**E. Diálogo de rechazo**
- Título “Indica el motivo del rechazo”.
- Identificación de la propuesta.
- Campo “Motivo”.
- Límite máximo de 500 caracteres como línea base observada.
- Acción “Cancelar”.
- Acción “Confirmar rechazo”.

### Flujo principal de validación

1. El intérprete autorizado abre “Validar señas”.
2. El sistema carga propuestas disponibles.
3. La vista inicia filtrada por estado “Pendiente”.
4. El intérprete busca o filtra por categoría si lo necesita.
5. Selecciona una propuesta.
6. El sistema presenta su información completa y recurso adjunto.
7. El intérprete revisa palabra, categoría, significado, descripción y material visual.
8. Si considera correcta la propuesta, pulsa “Validar seña”.
9. El sistema solicita confirmación cuando la decisión tenga impacto irreversible o de publicación.
10. El servidor comprueba que la propuesta siga pendiente y que el actor tenga permiso.
11. El servidor cambia el estado a “Validada” y registra actor, fecha/hora y estado anterior/nuevo.
12. La interfaz actualiza la lista y confirma el resultado.
13. El sistema selecciona la siguiente propuesta pendiente que cumpla los filtros, si existe.

### Flujo principal de rechazo

1. El intérprete selecciona una propuesta pendiente.
2. Pulsa “Rechazar”.
3. El sistema abre el diálogo de rechazo.
4. El intérprete escribe un motivo claro y específico.
5. El sistema valida que el motivo no esté vacío y respete el límite.
6. El intérprete pulsa “Confirmar rechazo”.
7. El servidor verifica permisos y estado actual.
8. El servidor cambia el estado a “Rechazada” y conserva el motivo.
9. El sistema registra la acción en el historial.
10. La interfaz confirma el rechazo y actualiza la bandeja.

### Flujos alternos y excepciones

- **HU019-A1 — Sin propuestas pendientes:** mostrar mensaje específico y conservar acceso a los filtros de otros estados.
- **HU019-A2 — Sin coincidencias:** indicar que no hay propuestas con los filtros seleccionados.
- **HU019-A3 — Propuesta sin recurso visual:** mostrar una indicación clara; el intérprete decide según las reglas de revisión, sin inventar una representación.
- **HU019-A4 — Motivo vacío:** bloquear el rechazo y señalar el campo.
- **HU019-A5 — Motivo excede el máximo:** impedir caracteres adicionales o informar el límite antes de confirmar.
- **HU019-A6 — Cancelar rechazo:** cerrar el diálogo sin cambiar el estado.
- **HU019-A7 — Error de actualización:** conservar la propuesta y permitir reintentar; no mostrarla como validada/rechazada.
- **HU019-A8 — Propuesta ya decidida por otro intérprete:** informar que el estado cambió y actualizar la información desde el servidor.
- **HU019-A9 — Permiso insuficiente:** impedir la decisión y registrar el intento según política de seguridad.
- **HU019-A10 — Pérdida de conexión:** no asumir que la decisión se guardó; mostrar estado pendiente de confirmación y consultar al servidor antes de reintentar.
- **HU019-A11 — Selección siguiente:** después de una decisión, seleccionar otra propuesta pendiente solo si realmente existe y coincide con los filtros activos.
- **HU019-A12 — Filtro en otros estados:** permitir consulta de registros ya validados o rechazados, pero no mostrar acciones de decisión para ellos.

### Criterios de aceptación

- **CA-019-01:** al abrir la bandeja, se muestran propuestas pendientes por defecto.
- **CA-019-02:** la búsqueda permite localizar por palabra y significado.
- **CA-019-03:** categoría y estado filtran correctamente y pueden combinarse con la búsqueda.
- **CA-019-04:** cada tarjeta muestra palabra, categoría, fecha y estado.
- **CA-019-05:** al seleccionar una tarjeta, el panel presenta los datos correspondientes a esa propuesta, sin mezclar información de otra.
- **CA-019-06:** el recurso visual se muestra si existe; si no existe, se comunica su ausencia.
- **CA-019-07:** solo las propuestas pendientes presentan acciones para validar o rechazar.
- **CA-019-08:** al validar, el estado cambia a “Validada” únicamente después de confirmación del servidor.
- **CA-019-09:** al rechazar, el motivo es obligatorio y queda asociado a la decisión.
- **CA-019-10:** el sistema rechaza un motivo vacío o superior al máximo configurado.
- **CA-019-11:** cancelar el diálogo no modifica el estado de la propuesta.
- **CA-019-12:** cada decisión registra actor autenticado, fecha/hora, estado anterior, estado nuevo y motivo cuando aplique.
- **CA-019-13:** dos decisiones concurrentes sobre la misma propuesta no generan transiciones contradictorias.
- **CA-019-14:** un error de red o servidor no produce una confirmación falsa.
- **CA-019-15:** al completar una decisión, la bandeja actualiza contadores y resultados.
- **CA-019-16:** el sistema conserva las propuestas rechazadas para consulta y trazabilidad.
- **CA-019-17:** una propuesta validada queda disponible para el siguiente paso de publicación definido por el producto; no se asume que se publica automáticamente si existe una etapa adicional.

### Estado frente al código

**Implementado parcialmente en frontend:** bandeja con búsqueda, filtros, contador de pendientes, selección, vista previa, acción de validar y diálogo de rechazo con motivo obligatorio de hasta 500 caracteres. Las acciones actualizan localStorage mediante `changeSignStatus` y agregan registros de historial. No se observó API, persistencia central, control de concurrencia, autorización backend ni actor autenticado real. Los datos iniciales son de demostración.

### Dependencias técnicas

- Endpoint para consultar propuestas y aplicar decisiones.
- Autorización por rol y permisos en servidor.
- Registro de auditoría e historial.
- Control de concurrencia y transición atómica de estados.
- Almacenamiento seguro de adjuntos.
- Definición de si una seña validada se publica inmediatamente o pasa por otro paso.
- Política de revisión lingüística y de resolución de desacuerdos.

---

## 5. Requisitos no funcionales

- **RNF-EP05-01 — Seguridad:** solo intérpretes autorizados pueden revisar y decidir; validar permisos en backend.
- **RNF-EP05-02 — Integridad:** una propuesta debe tener identidad estable y sus decisiones deben conservar relación con ella.
- **RNF-EP05-03 — Trazabilidad:** toda creación, validación y rechazo debe registrar actor y fecha/hora.
- **RNF-EP05-04 — Concurrencia:** las decisiones deben ser atómicas y evitar sobrescrituras silenciosas.
- **RNF-EP05-05 — Accesibilidad:** formularios, mensajes, diálogos, tablas y controles deben ser operables con teclado y lectores de pantalla.
- **RNF-EP05-06 — Archivos:** validar MIME real, extensión, tamaño y seguridad del contenido en servidor; no confiar únicamente en el atributo `accept`.
- **RNF-EP05-07 — Disponibilidad:** un error al consultar propuestas debe distinguirse de una bandeja sin resultados.
- **RNF-EP05-08 — Privacidad:** los adjuntos y datos de revisión solo deben ser visibles para roles autorizados.

## 6. Trazabilidad

| Historia | Componentes principales | Brecha principal |
|---|---|---|
| HU-018 | `ContenidoRegistro.jsx`, `interpreterActions.js`, `interpreterStorage.js` | Registro local; sin API ni identidad autenticada persistente |
| HU-019 | `ContenidoValidacion.jsx`, `TarjetaSena.jsx`, `interpreterActions.js` | Decisiones locales; sin control de concurrencia ni autorización de servidor |

## 7. Definition of Done — EP-05

Una historia se considera terminada cuando:

1. Los criterios de aceptación se prueban con escenarios positivos, negativos y alternos.
2. La creación y las decisiones persisten en un repositorio central.
3. El actor se obtiene de la sesión autenticada, no de una cadena fija.
4. Los permisos se validan en servidor.
5. Los estados y sus transiciones están definidos y protegidos.
6. Los adjuntos se validan y almacenan de forma segura.
7. Las decisiones quedan registradas con fecha/hora, actor y motivo cuando aplique.
8. Se manejan reintentos, errores de red y decisiones concurrentes.
9. La interfaz es accesible y conserva el contexto de búsqueda/filtros.
10. El contenido aprobado sigue el flujo de publicación acordado.
11. El Product Owner y el responsable de revisión lingüística aceptan el comportamiento en pruebas.

## 8. Decisiones pendientes del Product Owner

- ¿El recurso visual será obligatorio para registrar o validar una seña?
- ¿Qué formatos y tamaño máximo se permitirán en producción?
- ¿La misma persona que registra puede validar su propia propuesta? Se recomienda separar autor y revisor.
- ¿Las propuestas se asignan a un intérprete o quedan disponibles en una bandeja compartida?
- ¿Una seña validada se publica inmediatamente o requiere aprobación adicional?
- ¿Se permitirá reabrir propuestas rechazadas? ¿Quién y bajo qué motivo?
- ¿Cómo se resuelven desacuerdos entre intérpretes?
- ¿Qué campos y metadatos deben conservarse para auditoría?
- ¿Cuál es la política de conservación de borradores y adjuntos?

## 9. Control de cambios

| Versión | Cambio |
|---|---|
| 1.0 | Primera especificación de registro y validación, basada en inspección de formularios, bandeja, acciones y almacenamiento local del módulo de intérprete. |

---

**Nota de precisión:** el frontend demuestra un flujo funcional local de registro y revisión, pero no demuestra operación multiusuario ni persistencia en servidor. La validación de una propuesta dentro del prototipo tampoco equivale, por sí sola, a certificación lingüística oficial de LSC.