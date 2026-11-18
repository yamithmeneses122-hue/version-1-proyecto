# EP-06 — Corrección y mantenimiento del contenido de señas

**Identificador:** EP-06  
**Nombre:** Corrección y mantenimiento del contenido de señas  
**Módulo principal:** Intérprete  
**Módulo relacionado:** Administración / Auditoría léxica  
**Prioridad:** Alta  
**Estado documental:** Especificación funcional  
**Base de análisis:** Rama `correcciones-de-color`, módulo Next.js `SIGNA-TECH-APP-nextjs (1)/`

---

## 1. Propósito de la épica

Permitir que el contenido de las señas existentes en el diccionario LSC pueda mantenerse actualizado, corregirse y revisarse de forma controlada. El proceso debe proteger la integridad del contenido publicado, conservar la trazabilidad de las modificaciones y permitir identificar quién propuso, revisó y autorizó cada cambio.

La corrección puede involucrar la palabra o concepto, categoría, significado, descripción y, cuando el modelo de datos lo soporte, los recursos multimedia asociados a la seña.

## 2. Actores

- **Intérprete:** consulta señas disponibles para corrección, propone ajustes y aporta justificación o evidencia.
- **Administrador / revisor autorizado:** evalúa la propuesta, compara el contenido vigente con el propuesto y decide aprobarla o rechazarla.
- **Operador:** consume el contenido publicado del diccionario; no modifica directamente los registros oficiales.
- **Sistema:** valida datos, controla estados, conserva versiones y registra eventos de auditoría.

> La autorización efectiva debe validarse en el servidor. Ocultar botones en la interfaz no constituye un control de seguridad.

## 3. Alcance funcional

Incluye:
- Localizar señas existentes mediante búsqueda y filtros.
- Consultar el contenido vigente antes de proponer un cambio.
- Editar los campos permitidos y presentar una propuesta de corrección.
- Validar campos obligatorios, formatos, duplicados y consistencia.
- Comparar contenido vigente y propuesta.
- Aprobar, rechazar o devolver una propuesta para ajustes, según permisos.
- Publicar únicamente cambios aprobados.
- Mantener versiones anteriores y un historial de auditoría consultable.
- Informar al intérprete el resultado de la revisión.

No debe confundirse con:
- El registro de una seña completamente nueva (EP-05).
- La edición directa e irreversible de un registro publicado.
- La simple eliminación de una tarjeta de una lista local.
- La validación lingüística automática por IA, que requiere un servicio y reglas explícitas.

## 4. Evidencia del comportamiento actual en el código

### 4.1 Vista del intérprete

Archivos revisados:
- `src/Features/Interprete/Vistas/Corregir.jsx`
- `src/Features/Interprete/Componentes/ContenidoCorreccion.jsx`

Comportamiento observado:
1. La vista `Corregir.jsx` renderiza el componente `ContenidoCorreccion`.
2. Al iniciar, la pantalla carga señas mediante `getSigns()` y excluye las que tengan estado `Pendiente`.
3. Presenta búsqueda por palabra/significado y filtro por categoría.
4. La tabla muestra palabra, categoría, significado, estado y acción Editar.
5. El formulario de edición se abre en un diálogo y permite modificar palabra, categoría, significado y descripción.
6. Los controles Guardar corrección, Cancelar y Cerrar están presentes.
7. Al guardar, se ejecuta `updateSign(editing)`; si no encuentra el registro, muestra un mensaje de error. Si lo actualiza, muestra confirmación y refresca la lista.

### 4.2 Persistencia y acciones

Archivos revisados:
- `src/Features/Interprete/funcionalidades/interpreterActions.js`
- `src/Features/Interprete/funcionalidades/interpreterStorage.js`
- `src/Features/Interprete/funcionalidades/interpreterUtils.js`
- `src/Features/Interprete/data/interpreterData.js`

Comportamiento observado:
- `getSigns()` lee la colección desde `localStorage`; si no existe, utiliza datos semilla locales.
- `updateSign()` localiza la seña por ID, reemplaza el objeto en la colección, cambia su estado a `Corregida` y guarda la colección.
- La acción registra un elemento de historial con palabra, acción Corrección, usuario predeterminado `Intérprete`, estado, fecha y una descripción textual de los campos que cambiaron.
- El historial no conserva una copia completa del antes y después; tampoco registra una versión numerada ni una referencia formal a una solicitud.
- La fecha se guarda como texto localizado (`es-CO`), no como marca temporal normalizada.
- No se observa en estos archivos persistencia centralizada, API, transacción, control de concurrencia ni autorización en servidor.
- La búsqueda de `filterSigns` compara palabra y significado, no descripción. La comparación de categoría es exacta.
- En el formulario actual palabra y significado son obligatorios mediante `required`; descripción no es obligatoria en esta pantalla. No se observa validación de duplicados ni normalización previa al guardado.
- No se observa en esta vista una acción para adjuntar o sustituir el recurso multimedia de una seña.

### 4.3 Auditoría administrativa relacionada

Archivo revisado:
- `src/Features/Administrador/Vistas/AprobacionSenas.jsx`

La pantalla presenta una cola de nuevas señas y otra de correcciones propuestas, con comparación entre definición actual y modificación propuesta. Sin embargo, los elementos se inicializan en arreglos locales de demostración. Los botones de aprobación, rechazo, validación o descarte solicitan confirmación, eliminan el elemento del arreglo de estado y muestran un toast. En el archivo inspeccionado no se observa conexión de esta cola con las correcciones almacenadas por el módulo del intérprete.

### 4.4 Conclusión de la inspección

<aside>
**Estado real:** existe una interfaz funcional de edición local y registro básico de actividad. No se puede certificar un flujo integrado de solicitud, revisión administrativa, aprobación, publicación y versionado persistente.
</aside>

La especificación siguiente define el comportamiento objetivo. Las funciones descritas como pendientes no deben presentarse como implementadas hasta que exista evidencia en código y pruebas.

---

## 5. Historias de usuario

## HU-020 — Consultar y seleccionar una seña existente para corregir

**Como** intérprete autorizado,  
**quiero** consultar las señas existentes y localizar la que necesita ajustes,  
**para** iniciar una corrección sobre el registro correcto sin alterar otra seña por error.

### Precondiciones
- El usuario inició sesión.
- Su cuenta tiene el rol de intérprete y permiso vigente para proponer correcciones.
- El catálogo está disponible.
- La seña objetivo existe y el usuario tiene acceso a su contenido.

### Flujo principal
1. El intérprete ingresa al módulo **Corregir señas** desde la navegación del módulo.
2. El sistema presenta el encabezado, la descripción de la función y el listado de señas habilitadas para consulta/corrección.
3. El listado muestra, como mínimo: palabra o concepto, categoría, significado, estado y acción disponible.
4. El intérprete escribe una palabra o parte del significado en el campo de búsqueda.
5. El sistema actualiza los resultados sin perder los filtros seleccionados.
6. El intérprete selecciona una categoría o la opción Todas.
7. El sistema combina búsqueda y categoría; no debe reemplazar un filtro con el otro.
8. Si existen coincidencias, el sistema presenta los registros y permite abrir el detalle de la seña.
9. El intérprete selecciona **Proponer corrección** sobre el registro deseado.
10. El sistema abre el formulario asociado al ID único del registro y muestra su contenido vigente como referencia.

### Reglas de negocio
- **RN-020.1:** la búsqueda debe ignorar diferencias entre mayúsculas y minúsculas y, preferiblemente, tildes.
- **RN-020.2:** la búsqueda debe considerar palabra, significado y descripción.
- **RN-020.3:** los filtros deben combinarse y disponer de una opción para restablecerlos.
- **RN-020.4:** cada resultado debe identificarse por un ID estable; nunca por el nombre visible de la palabra.
- **RN-020.5:** no se deben mostrar como editables registros eliminados, archivados o bloqueados.
- **RN-020.6:** el operador puede consultar el contenido publicado, pero no debe acceder a acciones de modificación.
- **RN-020.7:** la interfaz debe diferenciar claramente estado vigente, propuesta pendiente, corregida, rechazada y archivada, según el catálogo definitivo de estados.

### Criterios de aceptación
- **CA-020.1:** Dado que el intérprete accede al módulo, cuando carga correctamente el catálogo, entonces ve un listado con sus columnas y acciones autorizadas.
- **CA-020.2:** Dado un término de búsqueda, cuando lo escribe, entonces se muestran coincidencias en los campos definidos.
- **CA-020.3:** Dado un filtro de categoría, cuando lo selecciona, entonces el listado solo incluye registros de esa categoría.
- **CA-020.4:** Dada una búsqueda y una categoría activas, cuando ambas se aplican, entonces el resultado satisface simultáneamente ambos criterios.
- **CA-020.5:** Cuando no existen coincidencias, el sistema presenta un estado vacío comprensible y permite limpiar filtros.
- **CA-020.6:** Cuando el intérprete selecciona una seña, el formulario queda asociado al ID correcto y muestra el contenido vigente.
- **CA-020.7:** Si el usuario no tiene permiso de corrección, no puede iniciar ni ejecutar una modificación.

### Excepciones y mensajes
- Error de carga: **“No fue posible cargar las señas. Intenta nuevamente.”**
- Sin resultados: **“No se encontraron señas con los criterios seleccionados.”**
- Registro no disponible: **“La seña ya no está disponible o fue modificada por otro usuario. Actualiza el listado.”**
- Acceso no autorizado: **“No tienes permisos para proponer correcciones.”**

### Estado frente al código
La búsqueda, filtro por categoría, tabla y acción Editar existen. La búsqueda actual contempla palabra y significado, no descripción; no se observa control de permisos de servidor ni una acción formal de creación de propuesta.

---

## HU-021 — Elaborar y enviar una propuesta de corrección

**Como** intérprete autorizado,  
**quiero** editar los datos de una seña y enviar los cambios como propuesta,  
**para** mejorar la calidad del diccionario sin modificar directamente el contenido publicado.

### Campos del formulario objetivo

| Campo | Tipo | Obligatorio | Regla |
|---|---|---:|---|
| Palabra / concepto | Texto | Sí | Recortar espacios; longitud y unicidad configurables |
| Categoría | Selector | Sí | Debe pertenecer al catálogo activo |
| Significado | Texto multilínea | Sí | No aceptar solo espacios |
| Descripción | Texto multilínea | Sí | Explicar el uso o contexto de la seña |
| Recurso multimedia | Archivo o selector | Según política | Validar tipo, tamaño y seguridad |
| Justificación del cambio | Texto multilínea | Sí | Explicar por qué se requiere el ajuste |
| Evidencia / observación | Texto o adjunto | No | Referencia de apoyo para el revisor |

### Flujo principal
1. El intérprete abre una seña desde el listado.
2. El sistema presenta los datos vigentes en un panel de referencia o comparación.
3. El formulario carga una copia editable de los datos, sin modificar el registro publicado.
4. El intérprete ajusta uno o varios campos.
5. El sistema permite cancelar y volver al listado sin guardar una propuesta.
6. El intérprete completa la justificación.
7. Al seleccionar **Enviar corrección**, el sistema valida los campos en cliente y servidor.
8. El servidor comprueba que la seña siga existiendo y que la versión base no haya cambiado desde que se abrió el formulario.
9. Si las validaciones son correctas, crea una solicitud independiente vinculada a la seña original.
10. La solicitud queda en estado **Pendiente de revisión** y conserva autor, fecha, versión base y contenido propuesto.
11. El sistema confirma el envío y muestra el identificador de la solicitud.

### Reglas de negocio
- **RN-021.1:** la propuesta no reemplaza el contenido público antes de ser aprobada.
- **RN-021.2:** la solicitud debe guardar el ID de la seña original y la versión sobre la que se elaboró.
- **RN-021.3:** palabra, categoría, significado y descripción deben cumplir las reglas de validación del diccionario.
- **RN-021.4:** la palabra debe ser única según la política lingüística y de normalización definida; si existen homónimos o variantes legítimas, deben modelarse explícitamente y no bloquearse por una regla simplista.
- **RN-021.5:** la justificación es obligatoria y debe explicar el cambio propuesto.
- **RN-021.6:** el sistema debe detectar propuestas idénticas o solicitudes abiertas para la misma seña y evitar duplicados innecesarios.
- **RN-021.7:** si el registro cambió después de abrir el formulario, el sistema no debe sobrescribir la versión nueva; debe informar el conflicto y solicitar revisión.
- **RN-021.8:** los archivos deben validarse en servidor, limitarse por tipo y tamaño y almacenarse fuera de `localStorage`.
- **RN-021.9:** no se debe confiar en el nombre, rol o ID de usuario enviados desde el navegador; el servidor obtiene la identidad desde la sesión autenticada.

### Criterios de aceptación
- **CA-021.1:** Dado un registro vigente, cuando el intérprete inicia una corrección, entonces el formulario muestra los valores actuales sin modificarlos.
- **CA-021.2:** Cuando el intérprete envía campos obligatorios vacíos o compuestos solo por espacios, entonces el sistema bloquea el envío e indica cada campo.
- **CA-021.3:** Cuando la categoría no pertenece al catálogo autorizado, entonces el servidor rechaza la propuesta.
- **CA-021.4:** Cuando la propuesta es válida, entonces se crea una solicitud independiente en estado Pendiente de revisión.
- **CA-021.5:** Después del envío, el diccionario público conserva el contenido anterior hasta la aprobación.
- **CA-021.6:** La solicitud registra autor autenticado, fecha, ID del registro original y versión base.
- **CA-021.7:** Si otra persona modificó el registro mientras el formulario estaba abierto, el sistema informa el conflicto y no aplica cambios silenciosamente.
- **CA-021.8:** Si ocurre un error de red o servidor, el sistema conserva los datos del formulario de forma segura para que el usuario pueda reintentar, sin crear solicitudes duplicadas.

### Mensajes
- Éxito: **“La propuesta de corrección fue enviada y quedó pendiente de revisión.”**
- Validación: **“Revisa los campos señalados antes de continuar.”**
- Conflicto: **“Esta seña fue modificada desde que abriste el formulario. Actualiza la información antes de enviar.”**
- Error: **“No fue posible enviar la corrección. Tus cambios siguen disponibles para reintentar.”**

### Estado frente al código
La pantalla actual permite editar palabra, categoría, significado y descripción y llama directamente a `updateSign`. No incluye justificación, evidencia, solicitud independiente ni revisión de versión base. El guardado reemplaza el objeto local y marca la seña como Corregida; ese comportamiento debe cambiarse para cumplir esta historia.

---

## HU-022 — Revisar y comparar una propuesta de corrección

**Como** administrador o revisor autorizado,  
**quiero** consultar las correcciones pendientes y comparar el contenido vigente con el propuesto,  
**para** evaluar los cambios antes de decidir si se incorporan al diccionario.

### Flujo principal
1. El revisor ingresa al módulo de auditoría léxica.
2. El sistema carga las solicitudes pendientes desde el servicio central.
3. La pantalla separa nuevas señas de propuestas de corrección.
4. En cada corrección muestra concepto, autor, fecha de envío, justificación y estado.
5. El revisor abre una propuesta.
6. El sistema presenta una comparación clara: contenido vigente y contenido propuesto.
7. Los campos modificados se resaltan; los campos sin cambios permanecen identificables.
8. El revisor consulta la evidencia o recurso multimedia, cuando exista.
9. El revisor puede aprobar, rechazar o devolver para ajustes, si su permiso y el flujo lo permiten.
10. Antes de ejecutar una decisión irreversible, el sistema solicita confirmación y, cuando corresponda, un comentario.
11. La decisión queda registrada en auditoría.

### Reglas de negocio
- **RN-022.1:** solo usuarios con permiso de revisión pueden acceder a la cola y decidir solicitudes.
- **RN-022.2:** la comparación debe mostrar valores anterior y propuesto, no únicamente una descripción genérica.
- **RN-022.3:** el revisor debe conocer la justificación y el autor de la propuesta.
- **RN-022.4:** una solicitud ya resuelta no puede aprobarse o rechazarse nuevamente.
- **RN-022.5:** una solicitud debe bloquearse para edición o decisión concurrente mientras otro revisor la está procesando, o aplicar control optimista equivalente.
- **RN-022.6:** la decisión debe incluir usuario revisor, fecha, resultado y observación.
- **RN-022.7:** rechazar requiere un motivo comprensible para que el intérprete pueda conocer la razón.
- **RN-022.8:** la aprobación solo publica el contenido si la versión vigente coincide con la versión base de la propuesta; si no coincide, se requiere reconciliación.
- **RN-022.9:** la aprobación de una corrección no debe aprobar automáticamente una nueva seña ni ejecutar acciones ajenas a la solicitud.

### Criterios de aceptación
- **CA-022.1:** El revisor autorizado visualiza la cola de solicitudes pendientes.
- **CA-022.2:** Cada solicitud presenta datos suficientes para identificar el registro, autor, fecha y motivo.
- **CA-022.3:** La comparación permite reconocer exactamente qué campos cambian.
- **CA-022.4:** Los adjuntos pueden consultarse de forma segura cuando existan.
- **CA-022.5:** Un usuario sin permiso no puede consultar información restringida ni ejecutar decisiones mediante llamadas directas.
- **CA-022.6:** Una solicitud resuelta deja de aparecer en la cola de pendientes y permanece disponible en el historial.
- **CA-022.7:** Si la solicitud fue resuelta por otra persona, el sistema informa que ya no está pendiente.
- **CA-022.8:** El sistema registra la decisión y la identidad autenticada del revisor.

### Estado frente al código
La vista administrativa `AprobacionSenas.jsx` incluye una comparación visual entre definición actual y propuesta, confirmación de acciones y mensajes toast. Los registros se encuentran en arreglos locales de demostración y se eliminan de la lista al decidir. No se observa integración con las propuestas del módulo del intérprete ni persistencia centralizada.

---

## HU-023 — Aprobar, rechazar o devolver una corrección

**Como** revisor autorizado,  
**quiero** resolver una propuesta de corrección mediante una decisión controlada,  
**para** garantizar que solo los cambios revisados se publiquen en el diccionario.

### Flujo de aprobación
1. El revisor abre una solicitud pendiente.
2. Selecciona **Aprobar corrección**.
3. El sistema presenta un resumen de los campos que serán actualizados.
4. El revisor confirma.
5. El servidor verifica permisos, estado pendiente y versión base.
6. En una operación atómica, crea una nueva versión del contenido, marca la solicitud como Aprobada y registra la decisión.
7. El diccionario comienza a mostrar la versión aprobada.
8. El sistema notifica el resultado al intérprete proponente.

### Flujo de rechazo
1. El revisor selecciona **Rechazar**.
2. El sistema solicita un motivo obligatorio.
3. El revisor confirma el rechazo.
4. El sistema conserva intacta la versión publicada, cambia el estado de la solicitud a Rechazada y registra el motivo.
5. El intérprete puede consultar la decisión y su justificación.

### Flujo de devolución para ajustes
1. El revisor selecciona **Solicitar ajustes** cuando esta opción esté habilitada.
2. Escribe observaciones concretas y obligatorias.
3. El sistema cambia el estado a Requiere ajustes.
4. El intérprete recibe la observación y puede generar una nueva versión de la propuesta sin borrar el historial previo.

### Reglas de negocio
- **RN-023.1:** estados mínimos de solicitud: Pendiente, Aprobada, Rechazada y Requiere ajustes. El catálogo definitivo debe centralizarse.
- **RN-023.2:** las transiciones de estado deben validarse en servidor.
- **RN-023.3:** la aprobación crea una nueva versión; no sobrescribe ni elimina la anterior.
- **RN-023.4:** rechazo y devolución requieren motivo u observación.
- **RN-023.5:** toda decisión debe ser atómica: no puede actualizarse el contenido si falla el registro de auditoría o la resolución de la solicitud.
- **RN-023.6:** la misma solicitud no puede producir dos publicaciones.
- **RN-023.7:** quien propone no debe aprobar su propia corrección, salvo que una política institucional documentada autorice expresamente una excepción.
- **RN-023.8:** las notificaciones no deben exponer datos privados ni contenido restringido a destinatarios no autorizados.

### Criterios de aceptación
- **CA-023.1:** Una solicitud pendiente puede aprobarse únicamente por un revisor autorizado.
- **CA-023.2:** Al aprobar, se crea una nueva versión y la anterior permanece consultable.
- **CA-023.3:** Al rechazar sin motivo, el sistema bloquea la operación.
- **CA-023.4:** Al rechazar con motivo, la solicitud cambia a Rechazada y el contenido vigente no se altera.
- **CA-023.5:** Al devolver para ajustes, la observación queda vinculada a la solicitud y es visible para el autor.
- **CA-023.6:** Una segunda decisión sobre una solicitud resuelta es rechazada por el servidor.
- **CA-023.7:** Si existe conflicto de versión, no se publica la propuesta y se informa al revisor.
- **CA-023.8:** El sistema conserva la trazabilidad completa de la decisión.

### Estado frente al código
La pantalla administrativa actual elimina elementos locales al aprobar o rechazar y muestra un toast. No se observa persistencia de la decisión, motivo de rechazo, publicación de versión ni integración transaccional.

---

## HU-024 — Consultar versiones e historial de correcciones

**Como** usuario autorizado,  
**quiero** consultar las versiones y decisiones relacionadas con una seña,  
**para** conocer qué cambió, cuándo cambió y quién realizó o aprobó cada modificación.

### Flujo principal
1. El usuario abre el detalle de una seña o el historial de auditoría.
2. El sistema presenta la versión vigente y una lista cronológica de versiones anteriores.
3. Cada entrada muestra número de versión, fecha, autor de la propuesta, revisor, estado y resumen de cambios.
4. El usuario selecciona una versión.
5. El sistema presenta los valores completos de esa versión.
6. Cuando el usuario tiene permiso, puede comparar dos versiones.
7. El sistema muestra diferencias por campo.
8. Si la política lo permite, un administrador puede iniciar una reversión creando una nueva versión basada en una versión histórica; nunca se elimina la historia posterior.

### Reglas de negocio
- **RN-024.1:** cada publicación aprobada genera un número de versión único y creciente dentro del registro de seña.
- **RN-024.2:** la versión histórica es inmutable.
- **RN-024.3:** el historial debe distinguir autor de la propuesta y responsable de aprobación.
- **RN-024.4:** los eventos deben guardar fecha y hora normalizadas, preferiblemente UTC, y presentarse en la zona horaria del usuario.
- **RN-024.5:** una corrección sin cambios reales no debe crear una nueva versión.
- **RN-024.6:** una reversión es una nueva publicación que referencia la versión recuperada; no borra ni reescribe versiones previas.
- **RN-024.7:** los permisos determinan quién puede ver datos de auditoría y quién puede solicitar una reversión.
- **RN-024.8:** el sistema debe conservar los motivos de rechazo y las observaciones de revisión conforme a la política de retención.

### Criterios de aceptación
- **CA-024.1:** Cada seña publicada permite consultar su versión vigente.
- **CA-024.2:** Las versiones anteriores aparecen ordenadas cronológicamente y con identificador inequívoco.
- **CA-024.3:** El detalle histórico muestra los valores completos almacenados en esa versión.
- **CA-024.4:** La comparación identifica campos agregados, modificados o retirados.
- **CA-024.5:** El historial identifica proponente, revisor, fecha y decisión cuando corresponda.
- **CA-024.6:** Ninguna acción de edición ordinaria altera una versión histórica.
- **CA-024.7:** Si se realiza una reversión autorizada, se crea una nueva versión y se registra su referencia de origen.

### Estado frente al código
`updateSign()` agrega un registro resumido a `signa_interpreter_history`, con el nombre de los campos modificados. No conserva valores anteriores y nuevos completos, número de versión ni historial inmutable. El historial actual se almacena en `localStorage`.

---

## HU-025 — Notificar el resultado de una propuesta de corrección

**Como** intérprete que envió una corrección,  
**quiero** conocer si fue aprobada, rechazada o devuelta para ajustes,  
**para** dar seguimiento a mi propuesta y actuar según la decisión del revisor.

### Flujo principal
1. El sistema registra una decisión sobre una solicitud.
2. Identifica al intérprete proponente.
3. Genera una notificación dentro de la aplicación con el resultado, fecha y referencia de la solicitud.
4. Si fue rechazada o devuelta, incluye el motivo u observación autorizada.
5. El intérprete abre la notificación y accede al detalle de la solicitud.
6. El sistema marca la notificación como leída cuando corresponda.

### Reglas de negocio
- **RN-025.1:** cada notificación debe estar vinculada a una solicitud real.
- **RN-025.2:** no se debe notificar antes de confirmar la transacción que registra la decisión.
- **RN-025.3:** la notificación debe identificar la seña y el estado resultante.
- **RN-025.4:** el rechazo y la devolución deben incluir el motivo registrado por el revisor.
- **RN-025.5:** la notificación no sustituye el historial de auditoría.
- **RN-025.6:** los canales externos (correo, SMS o push) dependen de configuración y consentimiento; no se asumen habilitados por esta historia.

### Criterios de aceptación
- **CA-025.1:** Al resolverse una solicitud, el proponente recibe una notificación interna.
- **CA-025.2:** La notificación permite navegar al detalle correspondiente si el usuario conserva permisos.
- **CA-025.3:** El usuario puede distinguir notificaciones leídas y no leídas.
- **CA-025.4:** Si falla un canal externo, la decisión permanece registrada y la notificación interna no se pierde.
- **CA-025.5:** Un usuario diferente al proponente no recibe información privada de la solicitud salvo que tenga autorización.

### Estado frente al código
No se identificó en los archivos revisados un flujo de notificación vinculado a la corrección administrativa. Los mensajes toast actuales son confirmaciones locales de interfaz y no equivalen a notificaciones persistentes.

---

## 6. Modelo de estados propuesto

Los estados de la solicitud de corrección deben distinguirse del estado editorial de la seña publicada.

| Estado de solicitud | Descripción | Transiciones permitidas |
|---|---|---|
| Pendiente | En espera de revisión | Aprobada, Rechazada, Requiere ajustes |
| Requiere ajustes | Devuelta al proponente | Pendiente (nueva entrega), Cancelada |
| Aprobada | Decisión favorable y publicación confirmada | Estado final |
| Rechazada | Decisión desfavorable | Estado final; nueva solicitud independiente si procede |
| Cancelada | Retirada antes de resolución, según política | Estado final |

**Importante:** el estado `Corregida` que hoy usa el frontend no debe representar simultáneamente una solicitud pendiente, una decisión administrativa y la publicación vigente. Se recomienda separar al menos:
- Estado de la solicitud.
- Estado editorial de la seña.
- Número de versión publicada.

## 7. Datos mínimos recomendados para soportar la épica

La estructura física definitiva debe ajustarse al modelo entidad-relación aprobado del proyecto. Como mínimo, el dominio necesita representar:

### Solicitud de corrección
- Identificador de solicitud.
- Identificador de la seña original.
- Identificador del usuario proponente.
- Fecha de creación y última actualización.
- Estado de la solicitud.
- Justificación.
- Versión base.
- Identificador de la versión propuesta o contenido propuesto.
- Identificador del revisor, fecha de decisión y motivo/observación.

### Versionado de seña
- Identificador de versión.
- Identificador de la seña.
- Número de versión.
- Valores completos de palabra, categoría, significado y descripción.
- Referencias a recursos multimedia.
- Autor y fecha de publicación.
- Solicitud que originó la versión.
- Indicador de versión vigente, o relación equivalente controlada.

### Auditoría
- Identificador del evento.
- Actor autenticado.
- Acción realizada.
- Entidad y registro afectados.
- Fecha y hora.
- Resultado.
- Motivo o resumen.
- Referencia a la solicitud y versión cuando aplique.

Estos elementos son requisitos conceptuales; no se afirma que ya existan como tablas en la base de datos. La correspondencia con las tablas definitivas debe documentarse al actualizar el modelo relacional.

## 8. Requisitos no funcionales

- **RNF-06.1 Seguridad:** autorización por rol y permiso en backend; validación de propiedad y estado de cada solicitud.
- **RNF-06.2 Integridad:** aprobación, creación de versión y auditoría deben ejecutarse en una transacción.
- **RNF-06.3 Concurrencia:** utilizar control de versión o bloqueo para evitar sobrescrituras.
- **RNF-06.4 Trazabilidad:** conservar datos suficientes para reconstruir quién hizo qué y cuándo.
- **RNF-06.5 Usabilidad:** formularios claros, comparación legible, mensajes comprensibles y navegación por teclado.
- **RNF-06.6 Accesibilidad:** etiquetas asociadas a controles, foco visible, contraste adecuado, anuncios de errores y estados mediante tecnologías de asistencia.
- **RNF-06.7 Rendimiento:** búsqueda y consulta paginadas cuando el volumen del diccionario lo requiera.
- **RNF-06.8 Disponibilidad:** los errores de servicio no deben dejar solicitudes en estados parciales.
- **RNF-06.9 Privacidad:** limitar el acceso a identidad, observaciones y archivos según permisos.
- **RNF-06.10 Archivos:** validar contenido real del archivo, tamaño y extensión; no confiar exclusivamente en el MIME declarado por el navegador.

## 9. Dependencias

- Autenticación y gestión de roles/permisos (EP-01 y EP-07).
- Catálogo oficial de señas y categorías (EP-04).
- Registro y validación de nuevas señas (EP-05).
- Persistencia centralizada y API.
- Modelo relacional y auditoría.
- Servicio de almacenamiento seguro de recursos multimedia.
- Módulo de notificaciones, si se habilita.

## 10. Riesgos y decisiones pendientes

1. **Integración de flujos:** la corrección del intérprete y la auditoría del administrador aparecen actualmente como implementaciones locales separadas. Se requiere definir un único flujo de solicitudes.
2. **Política de aprobación:** definir si toda corrección necesita aprobación administrativa o si ciertos cambios menores pueden publicarse bajo reglas específicas.
3. **Autoría y conflicto de interés:** establecer si el proponente puede revisar su propia propuesta; recomendación: impedirlo.
4. **Unicidad lingüística:** definir cómo se modelan sinónimos, variantes regionales, homónimos y conceptos equivalentes en LSC.
5. **Multimedia:** definir formatos, tamaño, almacenamiento, permisos y tratamiento de versiones de video/imagen.
6. **Retención:** establecer cuánto tiempo se conservan propuestas rechazadas, adjuntos y auditoría.
7. **Reversión:** definir roles habilitados y necesidad de una segunda aprobación.
8. **Migración:** los datos semilla y el historial local actual no constituyen una fuente confiable para migrar versiones históricas.

## 11. Definition of Ready (DoR)

Una historia de esta épica está lista para desarrollo cuando:
- Tiene actor, objetivo y valor de negocio claros.
- Se conocen los permisos necesarios.
- Los campos y reglas de validación están definidos.
- Los estados y transiciones aplicables están documentados.
- Se conocen las dependencias de API, base de datos y almacenamiento.
- Los criterios de aceptación son verificables.
- Diseño de pantalla y estados vacíos/error/carga están disponibles.
- Se han definido las reglas de conflicto y auditoría.

## 12. Definition of Done (DoD)

Una historia se considera terminada cuando:
- La interfaz implementa el flujo y sus estados de carga, vacío, éxito y error.
- Las validaciones se aplican tanto en cliente como en servidor.
- Los permisos se comprueban en backend.
- Los datos persisten en la base de datos central, no solo en estado React o `localStorage`.
- Las decisiones críticas son atómicas y resistentes a concurrencia.
- Se conserva la versión anterior y la auditoría requerida.
- Se prueban los casos positivos, negativos, permisos y conflictos.
- Se verifican accesibilidad y navegación por teclado.
- No quedan errores críticos en consola ni fallos de integración.
- La documentación técnica y funcional queda actualizada.
- Se demuestra el comportamiento con pruebas reproducibles.

## 13. Matriz de trazabilidad

| Historia | Capacidad | Módulo | Prioridad |
|---|---|---|---|
| HU-020 | Buscar y seleccionar seña | Intérprete | Alta |
| HU-021 | Elaborar y enviar propuesta | Intérprete | Crítica |
| HU-022 | Revisar y comparar propuesta | Administrador | Crítica |
| HU-023 | Aprobar, rechazar o devolver | Administrador | Crítica |
| HU-024 | Consultar versiones y auditoría | Intérprete / Administrador | Alta |
| HU-025 | Notificar resultado | Sistema / Intérprete | Media |

## 14. Evidencia técnica analizada

- `src/Features/Interprete/Vistas/Corregir.jsx`
- `src/Features/Interprete/Componentes/ContenidoCorreccion.jsx`
- `src/Features/Interprete/funcionalidades/interpreterActions.js`
- `src/Features/Interprete/funcionalidades/interpreterStorage.js`
- `src/Features/Interprete/funcionalidades/interpreterUtils.js`
- `src/Features/Interprete/data/interpreterData.js`
- `src/Features/Administrador/Vistas/AprobacionSenas.jsx`

**Criterio de documentación:** los comportamientos descritos como actuales se limitan a lo observado en estos archivos. Los flujos de solicitud integrada, persistencia central, permisos de servidor, versionado, notificación y auditoría completa son objetivos especificados, no funcionalidades certificadas como implementadas.
