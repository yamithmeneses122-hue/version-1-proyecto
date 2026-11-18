# EP-08 — Soporte, seguimiento e historial de actividad

**Identificador:** EP-08  
**Nombre:** Soporte, seguimiento e historial de actividad  
**Módulos relacionados:** Público, Operador, Intérprete, Administrador y Auditoría  
**Prioridad:** Alta  
**Estado documental:** Especificación funcional  
**Base de análisis:** Rama `correcciones-de-color`, módulo Next.js `SIGNA-TECH-APP-nextjs (1)/`

---

## 1. Propósito de la épica

Ofrecer mecanismos claros para que las personas usuarias encuentren orientación, comuniquen problemas y conozcan el estado de sus solicitudes de soporte. Además, permitir que los actores autorizados consulten la actividad asociada a los procesos operativos de la plataforma, con filtros, trazabilidad y protección de datos.

La épica distingue tres conceptos que no deben confundirse:

1. **Ayuda y soporte:** información de orientación y solicitudes de asistencia presentadas por usuarios.
2. **Historial operativo:** registro de acciones relacionadas con propuestas, validaciones y correcciones de señas.
3. **Auditoría técnica y administrativa:** registro de seguridad y operaciones privilegiadas, cuya especificación principal está en EP-07, HU-034.

Un historial que se guarda en el navegador no equivale a una bitácora central ni a una auditoría segura.

## 2. Actores

- **Visitante:** consulta información pública de ayuda y soporte.
- **Usuario autenticado (Operador o Intérprete):** crea solicitudes y consulta su propio seguimiento; consulta el historial operativo permitido para su rol.
- **Agente de soporte:** recibe, clasifica, responde y actualiza solicitudes asignadas.
- **Administrador autorizado:** supervisa solicitudes, configura categorías y consulta indicadores dentro de su alcance.
- **Auditor:** consulta registros de auditoría cuando cuenta con autorización específica.
- **Sistema:** genera identificadores, fechas, notificaciones y registros de actividad.

## 3. Alcance funcional

Incluye:
- Consultar la sección pública de soporte.
- Consultar orientaciones sobre acceso, cuenta, cámara, micrófono y alcance del producto.
- Crear una solicitud de soporte con información de contacto y descripción del problema.
- Validar y registrar solicitudes en un servicio central.
- Generar número de radicado y estado de seguimiento.
- Consultar solicitudes propias y su historial de cambios.
- Clasificar, asignar, responder, escalar y cerrar solicitudes desde el perfil de soporte autorizado.
- Notificar cambios relevantes de estado.
- Consultar historial operativo del módulo de intérprete.
- Filtrar, buscar y paginar registros históricos.
- Mantener trazabilidad de quién realizó una acción, qué cambió y cuándo.
- Respetar permisos, privacidad y políticas de retención.

No incluye:
- Reemplazar la auditoría de seguridad/administración definida en EP-07.
- Dar por hecho que existe un sistema de tickets o mesa de ayuda integrado.
- Registrar como actividad real los datos de ejemplo estáticos.
- Exponer a todos los usuarios la actividad privada de otras personas.
- Considerar un mensaje de confirmación visual como prueba de que la solicitud llegó a un servidor.

## 4. Evidencia del comportamiento actual en el código

### 4.1 Página pública de soporte

Archivos revisados:
- `src/Features/Public/Vistas/VistaSoporte.jsx`
- `src/Features/Public/Componentes/PortadaSoporte.jsx`
- `src/Features/Public/Componentes/OpcionesSoporte.jsx`
- `src/Features/Public/Componentes/FormularioSoporte.jsx`

Comportamiento observado:
- La vista compone portada, opciones de ayuda y formulario.
- La portada presenta el mensaje “Estamos para ayudarte” y describe el alcance de la sección.
- Se muestran tres bloques informativos: Acceso y cuenta, Dispositivos y Producto.
- El formulario contiene nombre completo, correo electrónico y mensaje.
- Los tres campos son obligatorios mediante validación HTML.
- El correo utiliza tipo `email`.
- Al enviar, `handleSubmit` ejecuta `preventDefault()` y cambia el estado local `sent` a `true`.
- Se muestra el texto “Solicitud preparada. En una integración futura, aquí se conectará el envío real”.
- El propio formulario declara expresamente que es una demostración y que todavía no envía datos a un servidor.

Limitaciones observadas:
- No se observa llamada a API, servicio de correo, base de datos ni plataforma de tickets.
- No se genera número de radicado.
- No se registra fecha, estado, prioridad ni responsable.
- No existe consulta posterior de solicitudes.
- No se observa adjunto de capturas o archivos.
- El estado de confirmación se limita al componente y no acredita recepción real.

### 4.2 Historial del intérprete

Archivos revisados:
- `src/Features/Interprete/Vistas/Historial.jsx`
- `src/Features/Interprete/Componentes/ContenidoHistorial.jsx`
- `src/Features/Interprete/funcionalidades/interpreterStorage.js`
- `src/Features/Interprete/funcionalidades/interpreterActions.js`
- `src/Features/Interprete/data/interpreterData.js`

Comportamiento observado:
- La vista Historial renderiza `ContenidoHistorial`.
- La tabla muestra seña, acción, usuario, estado, detalle y fecha.
- Permite buscar por palabra, acción, usuario, motivo y cambios.
- Permite filtrar por acción: Todas, Validación, Corrección y Revisión.
- Pagina los resultados en grupos de cinco registros.
- Si no hay resultados, muestra un mensaje de estado vacío.
- Los registros se obtienen mediante `getHistory()`.
- `interpreterStorage.js` guarda el historial en localStorage bajo la clave `signa_interpreter_history`.
- Cuando no existe historial guardado, se utilizan registros iniciales de demostración definidos en `interpreterData.js`.
- `addHistory` agrega el registro al inicio y asigna un ID basado en `Date.now()`.
- `changeSignStatus`, `updateSign` y `registerSign` generan registros de validación, corrección o revisión.
- En las operaciones inspeccionadas, el usuario predeterminado es la cadena fija “Intérprete”.
- La fecha se guarda como texto localizado mediante `toLocaleDateString("es-CO")`.

Limitaciones observadas:
- El historial se almacena en el navegador y no en un repositorio central.
- Los registros iniciales son datos estáticos de demostración.
- No se observa identidad autenticada real asociada al actor en las funciones inspeccionadas.
- El ID basado en milisegundos no garantiza unicidad en escenarios concurrentes o distribuidos.
- La fecha localizada como texto no permite ordenar y consultar con la robustez de una marca temporal normalizada.
- No se observa integridad inmutable, firma, protección contra manipulación ni retención central.
- No se observa una vista equivalente de auditoría administrativa completa en los archivos revisados.

### 4.3 Relación con EP-07

EP-07, especialmente HU-034, define la auditoría de operaciones administrativas, roles, permisos y configuración. EP-08 debe consumir o enlazar esa capacidad cuando corresponda, pero no duplicar su catálogo ni debilitar sus controles.

El historial del intérprete es un historial operativo del contenido LSC; no debe presentarse como bitácora global de seguridad.

### 4.4 Conclusión de la inspección

**Estado real:** existe una página pública de ayuda con formulario demostrativo que no envía información al servidor. Existe una pantalla de historial del intérprete con búsqueda, filtro y paginación, alimentada por datos locales y localStorage.

**No se pudo certificar:** recepción real de solicitudes, radicados, sistema de tickets, notificaciones, atención por agentes, historial central, auditoría inmutable ni trazabilidad basada en identidad autenticada.

Las historias siguientes describen el comportamiento objetivo y mantienen separadas las funciones demostrativas de las capacidades pendientes.

---

## 5. Historias de usuario

## HU-035 — Consultar información y orientaciones de soporte

**Como** visitante o usuario de SIGNA-TECH-APP,  
**quiero** consultar información de ayuda organizada por temas,  
**para** resolver dudas frecuentes sobre el acceso, los dispositivos y las funciones disponibles.

### Precondiciones
- La sección pública de soporte está disponible.
- No se requiere iniciar sesión para consultar la información pública.

### Flujo principal
1. El usuario selecciona **Soporte** desde la navegación pública o el enlace correspondiente.
2. El sistema presenta una portada con el propósito de la sección.
3. Muestra categorías de ayuda, como Acceso y cuenta, Dispositivos y Producto.
4. El usuario selecciona una categoría.
5. El sistema presenta artículos o instrucciones relacionados.
6. El contenido distingue las funciones disponibles de las que están en desarrollo o requieren integración.
7. Si la información no resuelve la duda, el usuario puede iniciar una solicitud de soporte.

### Reglas de negocio
- **RN-035.1:** la consulta pública no debe requerir autenticación.
- **RN-035.2:** las instrucciones deben corresponder al funcionamiento real y a la versión vigente del producto.
- **RN-035.3:** no se debe afirmar que una integración funciona cuando solo existe una interfaz demostrativa.
- **RN-035.4:** los artículos deben tener título, categoría, contenido, fecha de actualización y estado de publicación.
- **RN-035.5:** la información interna, datos de otros usuarios y procedimientos sensibles no deben publicarse.
- **RN-035.6:** la navegación debe ser accesible desde teclado y lectores de pantalla.

### Criterios de aceptación
- **CA-035.1:** El usuario puede abrir la sección Soporte desde la navegación disponible.
- **CA-035.2:** La portada presenta claramente el propósito de la ayuda.
- **CA-035.3:** Las categorías muestran contenido relacionado al seleccionarse.
- **CA-035.4:** Los artículos publicados presentan información vigente y comprensible.
- **CA-035.5:** El usuario puede localizar el mecanismo para solicitar asistencia.
- **CA-035.6:** Si una categoría no tiene artículos, se presenta un estado vacío y no una pantalla rota.
- **CA-035.7:** Los artículos no exponen información privada o administrativa.

### Estado frente al código
Existe portada pública y tres tarjetas informativas con los temas Acceso y cuenta, Dispositivos y Producto. En los archivos revisados se muestran descripciones estáticas; no se observa un catálogo de artículos, buscador de ayuda ni navegación a detalle de preguntas frecuentes.

---

## HU-036 — Enviar una solicitud de soporte

**Como** usuario o visitante que necesita ayuda,  
**quiero** enviar una solicitud con mis datos de contacto y una descripción del problema,  
**para** comunicar una dificultad y recibir atención.

### Campos del formulario objetivo

| Campo | Tipo | Obligatorio | Validación |
|---|---|---:|---|
| Nombre completo | Texto | Sí | Recortar espacios; longitud permitida |
| Correo electrónico | Email | Sí | Formato válido |
| Tipo de solicitud | Selector | Sí | Categoría habilitada |
| Asunto | Texto | Sí | Longitud mínima y máxima |
| Descripción | Texto largo | Sí | Longitud mínima y máxima |
| Módulo afectado | Selector | No | Voz, texto, cámara, diccionario, cuenta u otro |
| Evidencia adjunta | Archivo | No | Formatos y tamaño permitidos |
| Consentimiento/aviso de privacidad | Confirmación | Según política | Informar finalidad y tratamiento |

### Flujo principal
1. El usuario abre la sección **Enviar una solicitud**.
2. El sistema presenta el formulario y explica qué información se necesita.
3. El usuario diligencia nombre, correo, categoría, asunto y descripción.
4. Opcionalmente indica el módulo afectado y adjunta evidencia permitida.
5. El sistema valida campos, formato de correo, tamaño y tipo de archivo.
6. El usuario envía la solicitud.
7. El servidor vuelve a validar todos los datos.
8. El sistema registra la solicitud, genera un identificador único de radicado y asigna el estado inicial **Recibida**.
9. El sistema registra fecha y hora de recepción y la información de contacto.
10. Se presenta confirmación únicamente cuando el servidor confirma el registro.
11. Si existe un canal de notificación configurado, se envía confirmación al correo suministrado.

### Reglas de negocio
- **RN-036.1:** el formulario debe indicar si el envío requiere autenticación o está disponible para visitantes.
- **RN-036.2:** las validaciones del navegador son una ayuda; el servidor debe repetirlas.
- **RN-036.3:** el radicado debe ser único y no depender de un timestamp generado en cliente.
- **RN-036.4:** el texto debe limitarse en longitud para evitar abuso y cargas excesivas.
- **RN-036.5:** los adjuntos deben validar extensión, MIME real, tamaño y contenido seguro; no confiar solo en el nombre del archivo.
- **RN-036.6:** no se deben aceptar ejecutables ni archivos peligrosos.
- **RN-036.7:** la solicitud debe incluir aviso de privacidad y tratamiento de datos conforme a la política institucional.
- **RN-036.8:** no se deben incluir contraseñas, tokens ni secretos en la descripción o adjuntos.
- **RN-036.9:** una solicitud no se considera recibida hasta que el servicio confirme su persistencia.
- **RN-036.10:** las solicitudes públicas deben contar con controles contra spam y automatización abusiva.
- **RN-036.11:** el sistema debe evitar crear duplicados por reintentos de red mediante un mecanismo de idempotencia cuando aplique.

### Criterios de aceptación
- **CA-036.1:** El formulario muestra los campos requeridos y sus indicaciones.
- **CA-036.2:** Si falta un campo obligatorio, no se envía la solicitud.
- **CA-036.3:** Si el correo es inválido, el sistema identifica el campo.
- **CA-036.4:** Si un adjunto excede límites o tiene un formato no permitido, se rechaza antes de completar el envío.
- **CA-036.5:** Una solicitud válida queda almacenada y recibe radicado único.
- **CA-036.6:** La confirmación muestra el radicado y estado inicial.
- **CA-036.7:** Si el servidor falla, se informa que no se pudo enviar y no se presenta un radicado ficticio.
- **CA-036.8:** El sistema no duplica la solicitud al reintentar una misma operación cuando se use idempotencia.
- **CA-036.9:** Los datos se procesan conforme al aviso de privacidad.

### Mensajes
- Éxito: **“Tu solicitud fue recibida. Guarda este número de radicado para consultar su estado.”**
- Validación: **“Revisa los campos señalados antes de enviar.”**
- Error: **“No fue posible enviar la solicitud. Inténtalo nuevamente.”**
- Adjunto: **“El archivo no cumple los formatos o el tamaño permitidos.”**

### Estado frente al código
Existe un formulario con nombre, correo y mensaje obligatorios. Su envío solo cambia el estado local `sent` y muestra expresamente que la solicitud está preparada para una integración futura. No hay radicado, persistencia, categorías, adjuntos ni envío real.

---

## HU-037 — Consultar el estado y seguimiento de una solicitud

**Como** persona que envió una solicitud de soporte,  
**quiero** consultar su estado y las actualizaciones realizadas,  
**para** conocer si fue recibida, está siendo atendida o ya fue resuelta.

### Precondiciones
- Existe una solicitud registrada con radicado.
- El usuario acredita que puede consultar esa solicitud, mediante sesión o mecanismo seguro de consulta.

### Flujo principal
1. El usuario abre **Mis solicitudes** o **Consultar radicado**.
2. El sistema solicita iniciar sesión o introducir el radicado y un mecanismo adicional de verificación.
3. Valida que la persona tenga derecho a consultar la solicitud.
4. Presenta radicado, fecha de creación, categoría, asunto, estado y última actualización.
5. Muestra una línea de tiempo de cambios de estado y respuestas visibles para el solicitante.
6. El usuario puede responder o aportar información adicional mientras la solicitud esté abierta, si la política lo permite.
7. El sistema registra cada interacción y actualiza la fecha de actividad.
8. El usuario recibe notificación cuando existe una respuesta o cambio importante.

### Estados propuestos
- **Recibida:** registrada correctamente y pendiente de clasificación.
- **En revisión:** el equipo está analizando la solicitud.
- **Asignada:** tiene un responsable de atención.
- **En espera del usuario:** se requiere información adicional.
- **En resolución:** se está trabajando en la solución.
- **Resuelta:** se comunicó una solución.
- **Cerrada:** el proceso terminó conforme a la política.
- **Reabierta:** el usuario reportó que el problema continúa y la política permite reabrir.

### Reglas de negocio
- **RN-037.1:** el radicado no debe ser suficiente por sí solo para exponer información privada; se requiere autenticación o verificación adicional.
- **RN-037.2:** un usuario solo consulta sus propias solicitudes, salvo permiso de soporte o administración.
- **RN-037.3:** cada cambio de estado debe registrar estado anterior, estado nuevo, actor, fecha y motivo.
- **RN-037.4:** las respuestas internas del equipo deben distinguirse de las respuestas visibles para el solicitante.
- **RN-037.5:** el usuario debe conocer cuándo se requiere una acción de su parte.
- **RN-037.6:** el cierre y la reapertura deben seguir reglas explícitas y quedar registrados.
- **RN-037.7:** las notificaciones no deben incluir información sensible innecesaria.

### Criterios de aceptación
- **CA-037.1:** Un usuario autenticado puede consultar sus solicitudes.
- **CA-037.2:** Un visitante puede consultar únicamente mediante un mecanismo seguro de verificación definido.
- **CA-037.3:** La pantalla muestra radicado, asunto, estado y fechas.
- **CA-037.4:** La línea de tiempo presenta cambios ordenados cronológicamente.
- **CA-037.5:** Un usuario no puede consultar solicitudes de otra persona manipulando el identificador.
- **CA-037.6:** Las notas internas no se muestran al solicitante.
- **CA-037.7:** Si el radicado no existe o no se puede verificar la identidad, el sistema no revela información privada.
- **CA-037.8:** Los cambios de estado se reflejan después de consultar nuevamente el servicio central.

### Estado frente al código
No se encontró en los archivos revisados una pantalla de seguimiento, entidad de solicitud, radicado o consulta de tickets.

---

## HU-038 — Gestionar y responder solicitudes de soporte

**Como** agente de soporte autorizado,  
**quiero** revisar, clasificar, asignar y responder las solicitudes recibidas,  
**para** dar atención organizada y dejar constancia del proceso.

### Flujo principal
1. El agente ingresa a la bandeja de soporte.
2. El sistema valida el permiso de gestión.
3. Presenta solicitudes con radicado, fecha, categoría, prioridad, estado y responsable.
4. El agente filtra por estado, prioridad, categoría, fecha o responsable.
5. Abre una solicitud y consulta los datos necesarios para atenderla.
6. Clasifica la solicitud y establece prioridad según criterios definidos.
7. Se asigna a sí mismo o a otro agente autorizado.
8. Registra una respuesta pública o una nota interna claramente diferenciada.
9. Cambia el estado según el avance.
10. El sistema guarda los cambios y registra auditoría.
11. El solicitante recibe notificación de la respuesta o cambio relevante.

### Reglas de negocio
- **RN-038.1:** solo agentes con permiso pueden consultar y gestionar la bandeja global.
- **RN-038.2:** toda solicitud debe tener un estado válido y una categoría.
- **RN-038.3:** la prioridad debe seguir criterios documentados, no asignarse arbitrariamente.
- **RN-038.4:** la asignación y reasignación deben registrar actor, fecha y responsable anterior/nuevo.
- **RN-038.5:** las notas internas no deben enviarse al usuario final.
- **RN-038.6:** cada respuesta pública debe quedar asociada a la solicitud y al agente que la emitió.
- **RN-038.7:** una solicitud cerrada no puede editarse sin el permiso o flujo de reapertura correspondiente.
- **RN-038.8:** el agente no debe poder modificar o eliminar el historial de interacciones.
- **RN-038.9:** los tiempos de atención y escalamiento deben definirse mediante una política de servicio aprobada.
- **RN-038.10:** los cambios deben persistirse de forma transaccional y auditable.

### Criterios de aceptación
- **CA-038.1:** Un agente autorizado puede consultar la bandeja.
- **CA-038.2:** Los filtros se pueden combinar.
- **CA-038.3:** El agente puede clasificar y asignar una solicitud.
- **CA-038.4:** El sistema distingue respuesta pública de nota interna.
- **CA-038.5:** El usuario solicitante puede consultar las respuestas públicas.
- **CA-038.6:** Los cambios de estado y asignación quedan en el historial.
- **CA-038.7:** Un usuario sin permiso no puede acceder a la bandeja ni operar sobre una solicitud mediante endpoints directos.
- **CA-038.8:** Si falla el guardado, la interfaz no confirma la operación.
- **CA-038.9:** Las solicitudes cerradas respetan el flujo de reapertura.

### Estado frente al código
No se encontró una bandeja de agentes, asignación, clasificación, prioridad, respuesta, notas internas ni flujo de cierre de tickets en los archivos inspeccionados.

---

## HU-039 — Consultar, buscar y filtrar el historial operativo

**Como** intérprete autorizado,  
**quiero** consultar el historial de acciones realizadas sobre las señas,  
**para** revisar validaciones, correcciones y revisiones anteriores.

### Flujo principal
1. El intérprete abre **Historial** desde su menú.
2. El sistema valida autenticación y permiso de consulta.
3. Presenta una tabla con seña, acción, usuario responsable, estado, detalle y fecha.
4. El intérprete busca por palabra, acción, usuario o detalle.
5. Filtra por tipo de acción y, cuando se implemente, por estado y rango de fechas.
6. El sistema combina los filtros y pagina los resultados.
7. El intérprete abre un registro para consultar el detalle disponible.
8. El sistema presenta la información en orden cronológico, indicando si la fecha corresponde a creación o actualización.

### Reglas de negocio
- **RN-039.1:** el historial debe provenir de registros persistidos centralmente para ser considerado fuente oficial.
- **RN-039.2:** el actor debe asociarse a la identidad autenticada y no a una cadena fija o editable por el cliente.
- **RN-039.3:** cada registro debe tener identificador único generado por el sistema.
- **RN-039.4:** las fechas deben almacenarse en formato normalizado y mostrarse según zona horaria definida.
- **RN-039.5:** las acciones deben utilizar un catálogo consistente: Registro, Validación, Rechazo, Corrección, Revisión y otras aprobadas.
- **RN-039.6:** el historial debe conservar suficiente detalle para comprender qué cambió sin exponer datos personales innecesarios.
- **RN-039.7:** el usuario solo puede consultar registros dentro de su alcance.
- **RN-039.8:** los filtros deben ejecutarse en servidor cuando el volumen de registros lo requiera.
- **RN-039.9:** el historial oficial no debe permitir editar o borrar eventos desde la interfaz operativa.
- **RN-039.10:** los registros demostrativos deben identificarse como tales y no mezclarse con la actividad productiva.

### Criterios de aceptación
- **CA-039.1:** El intérprete autorizado puede abrir el historial.
- **CA-039.2:** La tabla presenta seña, acción, actor, estado, detalle y fecha.
- **CA-039.3:** La búsqueda localiza coincidencias en los campos definidos.
- **CA-039.4:** El filtro por acción limita los resultados correctamente.
- **CA-039.5:** La paginación muestra la cantidad correcta de resultados y permite cambiar de página.
- **CA-039.6:** Cuando no existen coincidencias, se muestra un estado vacío.
- **CA-039.7:** Los registros se ordenan según fecha y hora reales.
- **CA-039.8:** El actor corresponde a la identidad autenticada y no a un valor predeterminado del frontend.
- **CA-039.9:** Los registros no pueden alterarse desde el cliente.
- **CA-039.10:** Los errores de consulta se comunican sin sustituirlos por datos ficticios.

### Estado frente al código
Existe tabla con seña, acción, usuario, estado, detalle y fecha; búsqueda por texto; filtro por acción y paginación de cinco filas. Los registros se obtienen de localStorage y de datos iniciales estáticos. El actor predeterminado es “Intérprete”, y las fechas se guardan como texto localizado. No se observa consulta central ni identidad autenticada enlazada a cada evento.

---

## HU-040 — Consultar el detalle y la trazabilidad de una actividad

**Como** usuario autorizado que necesita verificar una operación,  
**quiero** abrir un registro del historial y conocer su contexto y resultado,  
**para** comprender qué ocurrió sin depender únicamente de una etiqueta o resumen.

### Flujo principal
1. El usuario selecciona un registro de actividad.
2. El sistema carga el detalle asociado al identificador del evento.
3. Presenta tipo de acción, elemento afectado, actor, fecha y hora, estado anterior y posterior cuando corresponda.
4. Si la acción fue una corrección, muestra los campos modificados y sus valores permitidos antes/después.
5. Si la acción fue una validación o rechazo, muestra el resultado y motivo cuando exista.
6. El sistema oculta información sensible o ajena al alcance del usuario.
7. El usuario vuelve al listado conservando los filtros y página actuales.

### Reglas de negocio
- **RN-040.1:** el detalle debe corresponder al evento persistido y no a datos construidos únicamente en el navegador.
- **RN-040.2:** cada evento debe conservar una relación estable con el elemento afectado.
- **RN-040.3:** los cambios antes/después deben excluir credenciales y secretos.
- **RN-040.4:** si un dato histórico fue anonimizado por política, debe indicarse sin reconstruir información eliminada.
- **RN-040.5:** el usuario solo puede acceder a los detalles permitidos por su rol.
- **RN-040.6:** la consulta de eventos sensibles puede generar su propio evento de auditoría.

### Criterios de aceptación
- **CA-040.1:** Al abrir un registro, el sistema muestra el detalle correspondiente.
- **CA-040.2:** Se identifica actor, fecha, acción y elemento afectado.
- **CA-040.3:** Para correcciones, se muestran los campos modificados cuando el registro los conserva.
- **CA-040.4:** Para rechazos, se presenta el motivo cuando fue registrado.
- **CA-040.5:** Un usuario sin permiso no puede consultar detalles restringidos.
- **CA-040.6:** Al regresar al listado, se conservan búsqueda, filtros y página.
- **CA-040.7:** Si el evento ya no está disponible por política de retención, se informa sin inventar datos.

### Estado frente al código
La tabla actual muestra un resumen con `reason` o `changes`, pero en los archivos revisados no se encontró una vista de detalle individual ni un endpoint de consulta de eventos.

---

## HU-041 — Notificar recepción, respuesta y cambios relevantes de soporte

**Como** usuario que presentó una solicitud,  
**quiero** recibir avisos cuando mi solicitud sea recibida, respondida o cambie de estado,  
**para** mantenerme informado sin consultar continuamente la plataforma.

### Flujo principal
1. El sistema registra una solicitud o un cambio relevante.
2. Determina si el evento requiere notificación.
3. Verifica que exista un canal de contacto válido y autorizado.
4. Genera una notificación con radicado, tipo de evento y acceso seguro al seguimiento.
5. Envía la notificación por los canales habilitados.
6. Registra el resultado del envío.
7. Si el envío falla, conserva el evento y permite reintento según política.

### Reglas de negocio
- **RN-041.1:** las notificaciones deben generarse a partir de eventos persistidos, no de estados temporales de interfaz.
- **RN-041.2:** no deben incluir contraseñas, tokens, adjuntos privados ni información sensible.
- **RN-041.3:** el enlace de seguimiento debe requerir autenticación o token seguro con vencimiento y alcance limitado.
- **RN-041.4:** los reintentos no deben generar notificaciones duplicadas innecesarias.
- **RN-041.5:** el sistema debe registrar canal, fecha, destinatario lógico y resultado, evitando guardar datos excesivos.
- **RN-041.6:** las preferencias de notificación deben respetar los avisos obligatorios de servicio y la normativa aplicable.
- **RN-041.7:** una notificación fallida no debe revertir una solicitud correctamente registrada.

### Criterios de aceptación
- **CA-041.1:** Al recibirse una solicitud, se genera el evento de confirmación configurado.
- **CA-041.2:** Al publicarse una respuesta o cambio relevante, se genera la notificación correspondiente.
- **CA-041.3:** La notificación identifica el radicado y el tipo de actualización.
- **CA-041.4:** El contenido no expone información sensible.
- **CA-041.5:** El resultado del envío queda registrado.
- **CA-041.6:** Si falla el canal, el sistema conserva la solicitud y permite reintento controlado.
- **CA-041.7:** Los reintentos no crean múltiples eventos de negocio idénticos.

### Estado frente al código
No se encontró integración de correo, notificaciones push ni centro de notificaciones asociado al formulario público de soporte.

---

## 6. Matriz de trazabilidad

| Historia | Capacidad | Actor principal | Prioridad |
|---|---|---|---|
| HU-035 | Consultar información y orientaciones | Visitante / Usuario | Media |
| HU-036 | Enviar solicitud de soporte | Visitante / Usuario | Alta |
| HU-037 | Consultar estado y seguimiento | Usuario solicitante | Alta |
| HU-038 | Gestionar y responder solicitudes | Agente de soporte | Alta |
| HU-039 | Consultar historial operativo | Intérprete | Alta |
| HU-040 | Consultar detalle de actividad | Usuario autorizado | Media |
| HU-041 | Recibir notificaciones de soporte | Usuario solicitante | Media |

## 7. Modelo conceptual mínimo

La estructura física debe ajustarse al modelo entidad-relación aprobado. Conceptualmente, para soporte se requieren:

### Solicitud de soporte
- Identificador único.
- Radicado único.
- Usuario relacionado, si está autenticado.
- Nombre y correo de contacto cuando sea visitante.
- Categoría.
- Asunto y descripción.
- Módulo afectado.
- Prioridad.
- Estado.
- Responsable asignado.
- Fecha de creación y actualización.
- Fecha de resolución y cierre, si aplica.

### Interacción de soporte
- Identificador único.
- Solicitud relacionada.
- Autor.
- Tipo: respuesta pública, nota interna o aporte del solicitante.
- Contenido.
- Fecha/hora.
- Visibilidad.
- Adjuntos relacionados, si se permiten.

### Historial de estado
- Identificador único.
- Solicitud relacionada.
- Estado anterior.
- Estado nuevo.
- Actor.
- Motivo.
- Fecha/hora.

### Notificación
- Identificador único.
- Evento relacionado.
- Destinatario.
- Canal.
- Estado de envío.
- Fecha de creación y envío.
- Referencia de reintento, si aplica.

### Evento de actividad operativa
- Identificador único.
- Actor autenticado.
- Tipo de acción.
- Entidad y registro afectado.
- Resultado.
- Fecha/hora normalizada.
- Detalle permitido.
- Referencia de correlación.

Estos conceptos no afirman la existencia actual de tablas, servicios o endpoints. Deben mapearse al modelo de datos definitivo antes de la implementación.

## 8. Requisitos no funcionales

- **RNF-08.1 Seguridad:** autorización del lado servidor para solicitudes, respuestas e historiales.
- **RNF-08.2 Privacidad:** un solicitante solo puede consultar sus propias solicitudes y respuestas públicas.
- **RNF-08.3 Integridad:** radicados e identificadores únicos, relaciones consistentes y operaciones transaccionales.
- **RNF-08.4 Trazabilidad:** actor, acción, fecha y resultado registrados en una fuente central.
- **RNF-08.5 Disponibilidad:** los fallos de notificación no deben perder solicitudes ni interacciones.
- **RNF-08.6 Accesibilidad:** formularios y tablas operables por teclado, con etiquetas y mensajes claros.
- **RNF-08.7 Usabilidad:** estados de carga, vacío, error, confirmación y seguimiento comprensibles.
- **RNF-08.8 Rendimiento:** búsqueda y paginación eficientes en el servidor cuando crezca el volumen.
- **RNF-08.9 Retención:** conservar solicitudes e historiales conforme a una política institucional.
- **RNF-08.10 Protección de archivos:** validar y almacenar adjuntos en infraestructura segura, sin ejecutarlos ni servirlos de forma pública por defecto.
- **RNF-08.11 Observabilidad:** registrar fallos de procesamiento y notificación sin filtrar datos sensibles.
- **RNF-08.12 Consistencia temporal:** almacenar fechas en formato normalizado y mostrarlas según la zona horaria definida.

## 9. Dependencias

- EP-01: identidad, autenticación, sesiones y recuperación de acceso.
- EP-05 y EP-06: eventos de registro, validación y corrección de señas.
- EP-07: usuarios, roles, permisos y auditoría administrativa.
- Servicio backend y base de datos central.
- Servicio de correo o canal de notificaciones, si se habilita.
- Almacenamiento seguro de archivos adjuntos, si se permite.
- Catálogo de categorías, prioridades y estados de soporte.
- Política institucional de privacidad, retención y atención.

## 10. Riesgos y decisiones pendientes

1. **Responsable del soporte:** definir si será un rol nuevo, un permiso de administrador o un equipo externo.
2. **Canales de atención:** decidir si el soporte se prestará por correo, bandeja interna, formulario o combinación.
3. **Autenticación del solicitante:** definir el seguimiento para visitantes sin cuenta.
4. **Radicado:** definir formato y política de consulta segura.
5. **Prioridad y tiempos:** acordar niveles de prioridad y tiempos objetivo de respuesta/resolución.
6. **Adjuntos:** decidir formatos, tamaño máximo, antivirus/escaneo y retención.
7. **Notificaciones:** definir proveedor, plantillas, reintentos y preferencias.
8. **Privacidad:** definir consentimiento, tratamiento, retención y anonimización.
9. **Historial operativo:** acordar si los intérpretes consultan solo sus eventos o los de todo el equipo.
10. **Auditoría:** conectar el historial con la fuente central definida en EP-07 sin duplicar funciones.
11. **Datos de demostración:** retirar o marcar los registros iniciales antes de presentar la información como actividad real.
12. **Zona horaria:** establecer una política uniforme para almacenamiento y visualización de fechas.

## 11. Definition of Ready (DoR)

Una historia de esta épica está lista para desarrollo cuando:
- Se identificó el actor y su alcance de consulta o gestión.
- Se definieron estados, categorías y transiciones.
- Se especificaron campos, validaciones y límites.
- Se definió el mecanismo de autenticación y autorización.
- Se identificó el servicio y modelo de datos responsables.
- Se estableció qué información es pública, privada o interna.
- Se definieron criterios de aceptación positivos, negativos y de error.
- Se conoce el mecanismo de notificación y almacenamiento cuando aplique.

## 12. Definition of Done (DoD)

Una historia se considera terminada cuando:
- La interfaz implementa los flujos y estados documentados.
- Las solicitudes y eventos se persisten en backend y base de datos.
- El servidor valida identidad, permisos y propiedad de cada solicitud.
- Los radicados e identificadores son únicos.
- El historial conserva actor, fecha, acción y resultado.
- Las respuestas internas no se exponen al solicitante.
- Las notificaciones se generan y registran de acuerdo con la política.
- Los adjuntos se validan y almacenan de forma segura, si la función fue aprobada.
- Se prueban accesos indebidos, datos inválidos, duplicados y fallos de red.
- Se prueban accesibilidad, búsqueda, filtros y paginación.
- No se muestran confirmaciones falsas ante fallos de persistencia.
- La documentación y pruebas quedan actualizadas.

## 13. Evidencia técnica analizada

- `src/Features/Public/Vistas/VistaSoporte.jsx`
- `src/Features/Public/Componentes/PortadaSoporte.jsx`
- `src/Features/Public/Componentes/OpcionesSoporte.jsx`
- `src/Features/Public/Componentes/FormularioSoporte.jsx`
- `src/Features/Interprete/Vistas/Historial.jsx`
- `src/Features/Interprete/Componentes/ContenidoHistorial.jsx`
- `src/Features/Interprete/funcionalidades/interpreterStorage.js`
- `src/Features/Interprete/funcionalidades/interpreterActions.js`
- `src/Features/Interprete/data/interpreterData.js`

**Criterio de documentación:** se describe como implementado únicamente lo observado en los archivos indicados. El formulario público no envía solicitudes a un servidor y el historial del intérprete se basa en localStorage y datos de demostración. Seguimiento de tickets, atención por agentes, notificaciones e historial central son capacidades objetivo pendientes de implementación o verificación.
