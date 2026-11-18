# EP-07 — Administración de usuarios, roles y configuración

**Identificador:** EP-07  
**Nombre:** Administración de usuarios, roles y configuración  
**Módulo principal:** Administrador  
**Módulos relacionados:** Autenticación, Intérprete, Operador y Auditoría  
**Prioridad:** Crítica  
**Estado documental:** Especificación funcional  
**Base de análisis:** Rama `correcciones-de-color`, módulo Next.js `SIGNA-TECH-APP-nextjs (1)/`

---

## 1. Propósito de la épica

Proporcionar al personal administrador las capacidades necesarias para gestionar el ciclo de vida de las cuentas de SIGNA-TECH-APP, asignar roles, controlar permisos y mantener parámetros generales de funcionamiento de la plataforma.

La administración debe garantizar que cada persona acceda únicamente a las funcionalidades autorizadas, que las cuentas puedan activarse o suspenderse de forma segura y que los cambios sensibles queden registrados. Las opciones de configuración deben estar claramente separadas de las preferencias visuales personales.

## 2. Actores

- **Administrador autorizado:** crea y actualiza cuentas, asigna roles, gestiona permisos y modifica configuraciones globales según su alcance.
- **Intérprete:** utiliza las funciones habilitadas para su rol; no administra cuentas ni modifica privilegios propios.
- **Operador:** utiliza los módulos de comunicación y consulta autorizados; no administra usuarios ni permisos.
- **Sistema de autenticación/autorización:** valida identidad, estado de cuenta, rol y permisos en cada operación protegida.
- **Auditor:** consulta eventos administrativos cuando dispone del permiso correspondiente. Puede ser un administrador con privilegio de auditoría u otro rol institucional definido.

## 3. Alcance funcional

Incluye:
- Consultar y buscar cuentas de usuario.
- Crear cuentas internas para los roles autorizados.
- Editar datos de perfil y asignación de rol.
- Activar, suspender y reactivar cuentas.
- Deshabilitar o retirar cuentas mediante un proceso controlado, sin borrar trazabilidad.
- Consultar roles existentes.
- Asignar permisos a roles de forma centralizada.
- Proteger privilegios críticos y evitar escalamiento de privilegios.
- Consultar y modificar configuraciones globales autorizadas.
- Mantener registro de auditoría de las acciones administrativas.
- Gestionar la navegación y acceso a las pantallas según permisos.

No incluye:
- Autoregistro público de operadores, que pertenece al flujo de identidad y acceso (EP-01).
- Corrección lingüística de señas (EP-06).
- Preferencias visuales locales del usuario como si fueran parámetros globales del sistema.
- Exponer o almacenar contraseñas en texto plano.
- Afirmar que los controles de interfaz por sí solos garantizan seguridad.

## 4. Evidencia del comportamiento actual en el código

### 4.1 Gestión de usuarios

Archivos revisados:
- `src/Features/Administrador/Vistas/GestionUsuarios.jsx`
- `src/app/(administrador)/gestion_usuarios/page.jsx`

Comportamiento observado:
1. La ruta de Next.js carga el componente `GestionUsuarios`.
2. El componente inicia con tres usuarios de ejemplo en un estado React local.
3. El formulario permite crear o editar cuentas.
4. Campos: nombre completo, correo corporativo, rol, número celular y contraseña temporal.
5. Roles disponibles en el selector: Operador, Intérprete LSC y Administrador Global.
6. El nombre, correo, rol y celular son obligatorios; al crear cuenta también es obligatoria la contraseña.
7. El correo se recorta, se convierte a minúsculas y se valida con una expresión regular básica.
8. Se evita un correo duplicado comparando contra los registros del estado local.
9. La contraseña temporal debe tener al menos ocho caracteres al crear una cuenta.
10. En edición, la contraseña queda vacía y el texto del campo indica que puede dejarse así para conservar la contraseña.
11. La lista permite buscar por nombre o correo.
12. Cada registro muestra nombre, correo, rol y estado Activo/Inactivo.
13. Acciones visibles: editar, eliminar de esta sesión, desactivar y reactivar.
14. Desactivar solicita confirmación; reactivar se ejecuta directamente.
15. Los resultados se reflejan en estado React y los mensajes indican expresamente que las operaciones ocurren en esta sesión.

Limitaciones observadas:
- No se observa llamada a API ni persistencia en base de datos en el componente revisado.
- Los registros de ejemplo no demuestran que existan cuentas reales.
- El alta, edición, eliminación y cambio de estado se limitan al estado local.
- No se observa envío real de invitación, restablecimiento de contraseña o activación por correo.
- No se observa comprobación de permisos en backend ni protección contra asignación de privilegios por un usuario no autorizado.
- La validación de correo y longitud de contraseña en cliente no sustituye validación del servidor ni políticas de seguridad.
- La eliminación física del arreglo local no conserva por sí sola un historial de cuenta.

### 4.2 Roles y permisos

Archivos revisados:
- `src/Features/Administrador/Vistas/GestionRoles.jsx`
- `src/app/(administrador)/gestion_roles/page.jsx`

Comportamiento observado:
- La vista presenta tres bloques: Administrador Global, Intérprete LSC y Operador de Sistema.
- Los permisos se representan mediante controles tipo interruptor.
- Permisos visibles:
  - Administrador: Gobernanza de Cuentas, Aprobación Léxica LSC y Acceso a Logs de Auditoría.
  - Intérprete: Registro y Carga Multimedia, Proponer Correcciones de Señas y Auto-Aprobación Directa.
  - Operador: Uso de Módulos de Conversión, Consulta de Diccionario Nativo y Bypass de Configuración Avanzada.
- El permiso Gobernanza de Cuentas del Administrador aparece bloqueado en la interfaz.
- Los valores iniciales se almacenan en estado React.
- Al pulsar Guardar, se muestra un toast de éxito.

Limitaciones observadas:
- `guardarPermisos` no realiza una operación de persistencia; únicamente muestra un mensaje.
- Los interruptores cambian estado local, sin evidencia de actualización de una matriz de permisos en servidor.
- La descripción de la pantalla afirma que los cambios alteran tokens al instante, pero el código revisado no muestra actualización de tokens ni servicio de autorización.
- No se observa una matriz de permisos consultada desde base de datos.
- No se observa validación de jerarquía, protección de último administrador o registro de auditoría para los cambios.
- El control bloqueado del frontend no demuestra que el permiso esté protegido en backend.

### 4.3 Navegación y configuración

Archivos revisados:
- `src/Features/Administrador/Componentes/BarraLateral.jsx`
- `src/Features/Administrador/Vistas/PanelAdministracion.jsx`
- `src/app/(administrador)/inicio_admin/page.jsx`

Comportamiento observado:
- El panel administrativo enlaza a Gestión de Usuarios, Roles y Permisos, Diccionario LSC, Aprobación de Señas y Configuración General.
- La barra lateral presenta los mismos módulos y un control para alternar el tema visual.
- El cierre de sesión elimina las claves `usuario` de localStorage y sessionStorage y redirige a `/login`.
- El panel muestra métricas fijas de demostración: 42 usuarios activos, 18 señas por aprobar y 98.4 % de eficacia del modelo.

Hallazgo sobre configuración:
- En `BarraLateral.jsx` y `PanelAdministracion.jsx` existe un enlace a `/configuracion_admin`.
- La búsqueda del repositorio por `configuracion_admin` y por un componente de configuración administrativa no permitió localizar una página o vista correspondiente en la rama inspeccionada.
- El README administrativo consultado menciona una ruta distinta, `/admin/configuracion`, por lo que existe una discrepancia documental/de navegación.
- No se pudo verificar una pantalla administrativa funcional para parámetros del traductor o logs técnicos en los archivos revisados.
- El alternador de tema sí está conectado a un proveedor de tema en la barra lateral, pero no debe confundirse con una consola de configuración global.

### 4.4 Conclusión de la inspección

**Estado real:** existen pantallas de demostración para gestionar usuarios y configurar permisos mediante estado local, además de navegación hacia una opción de configuración cuya vista no fue localizada. No se puede certificar persistencia central, autorización efectiva, gestión segura de credenciales, configuración global ni auditoría administrativa completa.

La especificación siguiente define el comportamiento objetivo. Las capacidades pendientes no deben presentarse como terminadas hasta que se implementen y prueben en el backend y en la interfaz.

---

## 5. Historias de usuario

## HU-026 — Consultar, buscar y filtrar usuarios

**Como** administrador autorizado,  
**quiero** consultar las cuentas registradas y localizar usuarios por sus datos principales,  
**para** administrar correctamente el acceso de cada integrante de SIGNA-TECH-APP.

### Precondiciones
- El administrador inició sesión.
- La cuenta está activa.
- Tiene permiso de consulta de usuarios.
- El servicio de usuarios está disponible.

### Flujo principal
1. El administrador abre **Gestión de Usuarios** desde el panel o la barra lateral.
2. El sistema presenta el encabezado, descripción y listado de cuentas.
3. Cada fila muestra nombre completo, correo, rol, estado y acciones disponibles según permisos.
4. El administrador escribe nombre o correo en el campo de búsqueda.
5. El sistema filtra los resultados sin distinguir mayúsculas/minúsculas.
6. El administrador puede filtrar por rol y estado: Todos, Activos e Inactivos.
7. El sistema combina todos los filtros activos.
8. El administrador abre el detalle de una cuenta para consultar información ampliada, si está habilitada.
9. El sistema presenta paginación cuando el volumen de cuentas lo requiera.

### Reglas de negocio
- **RN-026.1:** la consulta debe exigir autenticación y permiso explícito.
- **RN-026.2:** no se deben mostrar contraseñas, hashes, tokens, secretos ni datos sensibles innecesarios.
- **RN-026.3:** los filtros por rol y estado se combinan con el texto de búsqueda.
- **RN-026.4:** la lista debe distinguir visualmente Activo, Suspendido, Pendiente de activación y estados adicionales que se definan.
- **RN-026.5:** los datos de ejemplo no deben mezclarse con usuarios reales en ambientes productivos.
- **RN-026.6:** las acciones visibles deben corresponder a permisos efectivos, pero el backend debe validar cada operación independientemente.
- **RN-026.7:** la consulta debe respetar paginación y límites para evitar cargar colecciones completas de gran tamaño.

### Criterios de aceptación
- **CA-026.1:** Al entrar un administrador autorizado, el sistema presenta la lista de usuarios disponibles.
- **CA-026.2:** Al buscar por nombre, se muestran coincidencias por nombre completo.
- **CA-026.3:** Al buscar por correo, se muestran coincidencias por correo.
- **CA-026.4:** Los filtros por rol y estado se aplican conjuntamente.
- **CA-026.5:** Si no hay coincidencias, se muestra un estado vacío y una opción para limpiar filtros.
- **CA-026.6:** La información confidencial de autenticación nunca aparece en el listado ni en el detalle.
- **CA-026.7:** Un usuario sin permiso recibe una respuesta de acceso denegado aunque intente consultar el endpoint directamente.
- **CA-026.8:** Los errores de carga se muestran sin presentar datos ficticios como si fueran registros reales.

### Mensajes
- Sin resultados: **“No se encontraron usuarios con los filtros seleccionados.”**
- Error: **“No fue posible cargar los usuarios. Intenta nuevamente.”**
- Sin permiso: **“No tienes autorización para consultar las cuentas.”**

### Estado frente al código
Existe búsqueda local por nombre y correo y una lista con nombre, correo, rol y estado. No se observan filtros por rol/estado, paginación, detalle completo ni consulta a servicio central.

---

## HU-027 — Crear una cuenta de usuario interno

**Como** administrador con permiso de gestión de cuentas,  
**quiero** registrar una cuenta para un integrante interno y asignarle un rol,  
**para** habilitar su acceso a las funciones que necesita dentro de la plataforma.

### Campos del formulario objetivo

| Campo | Tipo | Obligatorio | Regla |
|---|---|---:|---|
| Nombre completo | Texto | Sí | Recortar espacios y validar longitud |
| Correo electrónico | Correo | Sí | Formato válido y único |
| Rol | Selector | Sí | Rol activo permitido para asignación |
| Número celular | Teléfono | Según política | Validar formato y longitud |
| Método de activación | Selector | Sí | Invitación o activación institucional |
| Contraseña temporal | Credencial | Según método | No exponer ni registrar en texto plano |
| Estado inicial | Sistema | Sí | Pendiente de activación o Activo según política |

### Flujo principal
1. El administrador selecciona **Registrar Nuevo Usuario**.
2. El sistema presenta el formulario vacío.
3. El administrador diligencia nombre, correo, rol y datos de contacto.
4. Selecciona el método de activación permitido.
5. El sistema valida los campos en cliente para orientar al usuario.
6. Al enviar, el servidor repite todas las validaciones.
7. El servidor verifica que el correo no esté asociado a otra cuenta, aplicando normalización consistente.
8. Verifica que el administrador tenga permiso para asignar el rol seleccionado.
9. Crea la cuenta con un identificador único y el estado inicial definido.
10. Si el método es invitación, genera un mecanismo seguro, de un solo uso y con vencimiento para que el usuario active su cuenta.
11. Registra el evento de creación en auditoría.
12. Presenta confirmación y permite consultar el registro creado.

### Reglas de negocio
- **RN-027.1:** el alta administrativa es para cuentas internas; el autoregistro de operadores conserva su flujo propio.
- **RN-027.2:** el correo debe ser único en el sistema, considerando normalización y restricciones de base de datos.
- **RN-027.3:** no se debe guardar contraseña en texto plano ni devolverla en respuestas de API.
- **RN-027.4:** las contraseñas deben procesarse mediante un algoritmo de hashing apropiado y una política de credenciales institucional.
- **RN-027.5:** se recomienda invitación de un solo uso y vencimiento en lugar de enviar contraseñas permanentes por correo.
- **RN-027.6:** un administrador no puede asignar un rol o permiso superior al que está autorizado a delegar.
- **RN-027.7:** el sistema debe impedir crear cuentas con roles inexistentes, inactivos o no asignables.
- **RN-027.8:** la creación y su evento de auditoría deben quedar confirmados de forma consistente.
- **RN-027.9:** el sistema no debe revelar si un correo pertenece a otra persona en contextos públicos; en el panel interno puede informar duplicidad a administradores autorizados.

### Criterios de aceptación
- **CA-027.1:** El formulario presenta campos y etiquetas claros para los datos requeridos.
- **CA-027.2:** Si faltan campos obligatorios, no se envía la solicitud y se identifican los errores.
- **CA-027.3:** Si el correo no tiene formato válido, se rechaza el alta.
- **CA-027.4:** Si el correo ya existe, el servidor impide la duplicación.
- **CA-027.5:** Si el administrador intenta asignar un rol no permitido, el servidor rechaza la operación.
- **CA-027.6:** La cuenta se crea con estado inicial coherente con el método de activación.
- **CA-027.7:** La credencial no queda almacenada ni expuesta en texto plano.
- **CA-027.8:** Se registra quién creó la cuenta, cuándo y qué rol asignó.
- **CA-027.9:** Después del alta, la cuenta aparece en la lista con su estado real.
- **CA-027.10:** Si falla la operación, no se muestra un mensaje de éxito ni se crea una cuenta parcial.

### Mensajes
- Éxito: **“La cuenta fue creada. El usuario podrá activar su acceso según el método configurado.”**
- Correo inválido: **“Ingresa un correo electrónico válido.”**
- Duplicado: **“Ya existe una cuenta asociada a ese correo.”**
- Rol no permitido: **“No tienes autorización para asignar ese rol.”**
- Error: **“No fue posible crear la cuenta. Verifica la información e inténtalo nuevamente.”**

### Estado frente al código
Existe formulario con nombre, correo, rol, celular y contraseña temporal; valida campos, formato de correo, duplicidad local y longitud mínima de ocho caracteres. La cuenta se agrega a un arreglo local y el toast indica que queda en la lista de esta sesión. No se observa invitación, activación, hashing, API ni auditoría persistente.

---

## HU-028 — Editar los datos y el rol de una cuenta

**Como** administrador con permiso de edición,  
**quiero** actualizar los datos de una cuenta y su rol autorizado,  
**para** mantener la información institucional y los privilegios acordes con las funciones del usuario.

### Flujo principal
1. El administrador localiza una cuenta y selecciona **Editar**.
2. El sistema carga los datos editables de la cuenta.
3. Los campos muestran nombre, correo, rol y teléfono actuales.
4. La contraseña no se muestra ni se precarga.
5. El administrador modifica los campos necesarios.
6. Si desea cambiar credenciales, utiliza un flujo específico de restablecimiento; no modifica una contraseña existente desde este formulario.
7. El sistema valida los cambios.
8. El servidor comprueba permisos, unicidad de correo y reglas de asignación de roles.
9. Guarda los cambios y registra los valores relevantes antes/después en auditoría, evitando registrar secretos.
10. El sistema confirma la actualización y refresca el detalle y listado.

### Reglas de negocio
- **RN-028.1:** el ID de cuenta no puede modificarse desde el formulario.
- **RN-028.2:** los cambios de correo deben verificar unicidad y pueden requerir nueva verificación.
- **RN-028.3:** el cambio de rol debe respetar la jerarquía de delegación.
- **RN-028.4:** no se deben permitir cambios que dejen al sistema sin un administrador activo con privilegios suficientes.
- **RN-028.5:** el formulario de edición no debe revelar ni solicitar la contraseña actual de otra persona.
- **RN-028.6:** el cambio de rol debe reflejarse en la autorización efectiva en el siguiente control de acceso; deben invalidarse sesiones o tokens afectados cuando corresponda.
- **RN-028.7:** la auditoría debe registrar actor, cuenta afectada, campos modificados y fecha.
- **RN-028.8:** si el registro fue modificado por otra operación concurrente, debe detectarse el conflicto.

### Criterios de aceptación
- **CA-028.1:** Al seleccionar Editar, el formulario carga los datos de la cuenta correcta.
- **CA-028.2:** La contraseña nunca aparece precargada ni visible.
- **CA-028.3:** Si el correo nuevo está asociado a otra cuenta, el sistema rechaza el cambio.
- **CA-028.4:** Si el rol no es asignable por el administrador, el servidor rechaza el cambio.
- **CA-028.5:** Al cancelar, no se modifican los datos persistidos.
- **CA-028.6:** Al guardar correctamente, el listado refleja los datos actualizados.
- **CA-028.7:** La modificación queda registrada en auditoría sin incluir credenciales.
- **CA-028.8:** Si falla el guardado, se conservan los valores editados para reintentar y se informa el error.

### Estado frente al código
Existe edición local de nombre, correo, rol y teléfono. La contraseña queda vacía en el formulario de edición y el código no la modifica. El guardado solo actualiza estado React y muestra un toast de éxito de sesión; no se observa persistencia ni auditoría central.

---

## HU-029 — Activar, suspender y reactivar cuentas

**Como** administrador autorizado,  
**quiero** cambiar el estado de acceso de una cuenta,  
**para** controlar el ingreso a SIGNA-TECH-APP ante altas, bajas, ausencias o incidentes de seguridad.

### Flujo de suspensión
1. El administrador localiza la cuenta.
2. Selecciona **Suspender cuenta**.
3. El sistema muestra una confirmación con la identidad de la cuenta afectada y las consecuencias.
4. El administrador confirma y, cuando la política lo requiera, indica el motivo.
5. El servidor valida permiso y estado actual.
6. Suspende la cuenta y revoca o invalida sesiones activas y credenciales de acceso según la política.
7. Registra actor, fecha, motivo y resultado.
8. Actualiza el listado y muestra confirmación.

### Flujo de reactivación
1. El administrador selecciona **Reactivar cuenta**.
2. El sistema informa que el usuario recuperará acceso si cumple los requisitos de autenticación.
3. El administrador confirma.
4. El servidor valida permisos, bloqueos adicionales y estado de la cuenta.
5. Reactiva la cuenta y registra el evento.
6. El sistema actualiza el listado.

### Reglas de negocio
- **RN-029.1:** una cuenta suspendida no puede iniciar sesión ni consumir endpoints protegidos.
- **RN-029.2:** la suspensión debe invalidar sesiones activas dentro del tiempo definido por la política de seguridad.
- **RN-029.3:** la reactivación no debe eliminar bloqueos independientes, por ejemplo, una restricción de seguridad o verificación pendiente.
- **RN-029.4:** no se puede suspender o degradar al último administrador activo con privilegios de gobernanza sin un proceso de transferencia autorizado.
- **RN-029.5:** la suspensión debe registrar un motivo cuando sea una acción administrativa disciplinaria o de seguridad.
- **RN-029.6:** la reactivación debe registrar quién la ejecutó y cuándo.
- **RN-029.7:** no se debe eliminar la historia de la cuenta al suspenderla.
- **RN-029.8:** el backend debe validar el estado de cuenta en cada autenticación y operación sensible; no basta con cambiar una etiqueta visual.

### Criterios de aceptación
- **CA-029.1:** Al suspender, se solicita confirmación antes de ejecutar el cambio.
- **CA-029.2:** Una cuenta suspendida no puede autenticarse ni utilizar una sesión que haya sido revocada.
- **CA-029.3:** El listado muestra claramente el estado Suspendido/Inactivo.
- **CA-029.4:** Al reactivar, el sistema verifica las condiciones adicionales de seguridad.
- **CA-029.5:** La cuenta reactivada vuelve a estar disponible según sus roles y permisos vigentes.
- **CA-029.6:** Se impide suspender al último administrador protegido por la política.
- **CA-029.7:** Ambas acciones quedan registradas en auditoría.
- **CA-029.8:** Si falla la operación, el estado mostrado no cambia y se informa el error.

### Estado frente al código
Existe cambio de estado local, confirmación para desactivar y reactivación directa sin confirmación. No se observa revocación de sesiones, validación backend, motivo persistente ni auditoría. La interfaz usa `activo` booleano; el modelo objetivo debe permitir estados más precisos si se requieren.

---

## HU-030 — Retirar o eliminar una cuenta de manera controlada

**Como** administrador con permiso de gestión avanzada,  
**quiero** retirar una cuenta del uso operativo sin perder su trazabilidad,  
**para** mantener el directorio actualizado y preservar la integridad de los registros históricos.

### Flujo principal
1. El administrador selecciona **Retirar cuenta**.
2. El sistema informa qué ocurrirá con el acceso, los datos y las referencias históricas.
3. Solicita motivo y confirmación.
4. El servidor valida permisos, dependencias y políticas de retención.
5. La cuenta se desactiva o anonimiza según la política institucional; no se elimina físicamente si tiene relaciones o eventos que deban conservarse.
6. Se registran actor, fecha, motivo y resultado.
7. El sistema actualiza la lista y conserva las referencias históricas necesarias.

### Reglas de negocio
- **RN-030.1:** la eliminación lógica o anonimización es preferible a borrar físicamente cuentas con historial.
- **RN-030.2:** la acción debe respetar las obligaciones de privacidad y retención de datos.
- **RN-030.3:** antes de retirar una cuenta, el sistema debe comprobar si es responsable de procesos pendientes, propuestas o recursos.
- **RN-030.4:** los registros históricos deben conservar integridad referencial.
- **RN-030.5:** una cuenta no puede eliminarse si ello deja el sistema sin administrador crítico.
- **RN-030.6:** la operación requiere permiso específico y motivo.
- **RN-030.7:** el sistema debe distinguir Suspender, Retirar y Eliminar, sin usar estos términos como sinónimos.

### Criterios de aceptación
- **CA-030.1:** La acción informa claramente sus consecuencias antes de confirmarse.
- **CA-030.2:** El sistema solicita motivo cuando la política lo establece.
- **CA-030.3:** Las relaciones históricas no quedan huérfanas.
- **CA-030.4:** La cuenta retirada no puede iniciar sesión.
- **CA-030.5:** La acción queda registrada en auditoría.
- **CA-030.6:** Si existen dependencias que impiden retirar la cuenta, se informa cuáles deben resolverse.
- **CA-030.7:** No se presenta una eliminación como exitosa si solo se quitó un elemento de la lista visual.

### Estado frente al código
El botón Eliminar quita el usuario del arreglo local después de una confirmación. No se observa eliminación lógica, análisis de dependencias, retención ni registro de auditoría.

---

## HU-031 — Consultar la matriz de roles y permisos

**Como** administrador autorizado,  
**quiero** consultar los roles y sus permisos asociados,  
**para** comprender y controlar el alcance de acceso de cada tipo de usuario.

### Flujo principal
1. El administrador ingresa a **Roles y Permisos**.
2. El sistema carga los roles disponibles y sus permisos desde la configuración central.
3. Presenta cada rol con su descripción y conjunto de permisos.
4. El administrador selecciona un rol.
5. El sistema muestra los permisos agrupados por módulo y acción.
6. Los permisos críticos se identifican y muestran sus restricciones.
7. El administrador puede consultar qué usuarios están asociados a un rol, si tiene permiso.

### Reglas de negocio
- **RN-031.1:** los roles deben tener identificador estable, nombre único y descripción.
- **RN-031.2:** los permisos deben modelarse como capacidades específicas, no como etiquetas visuales.
- **RN-031.3:** cada permiso debe tener código único y descripción funcional.
- **RN-031.4:** la matriz debe ser fuente central de autorización.
- **RN-031.5:** se debe aplicar mínimo privilegio: cada rol recibe únicamente las capacidades necesarias.
- **RN-031.6:** los roles protegidos del sistema no pueden ser eliminados ni modificados de forma que rompan la gobernanza.
- **RN-031.7:** la interfaz debe distinguir permiso habilitado, deshabilitado, heredado y bloqueado por política cuando aplique.

### Criterios de aceptación
- **CA-031.1:** El administrador autorizado puede consultar la lista de roles.
- **CA-031.2:** Cada rol muestra sus permisos vigentes.
- **CA-031.3:** Los permisos se agrupan de forma comprensible por módulo o capacidad.
- **CA-031.4:** Los roles protegidos se identifican y explican.
- **CA-031.5:** Si falla la carga, no se muestran valores de ejemplo como si fueran permisos vigentes.
- **CA-031.6:** Un usuario sin autorización no puede consultar la matriz administrativa.

### Estado frente al código
La pantalla presenta tres bloques de rol con nueve interruptores y descripciones. Los valores son constantes iniciales del estado React; no se observa consulta de roles ni permisos a una fuente central.

---

## HU-032 — Asignar y actualizar permisos de un rol

**Como** administrador con privilegio de gobernanza,  
**quiero** habilitar o restringir permisos de los roles,  
**para** adaptar el acceso de los usuarios a las responsabilidades definidas por la organización.

### Flujo principal
1. El administrador abre un rol y selecciona **Editar permisos**.
2. El sistema muestra los permisos actuales.
3. El administrador activa o desactiva las capacidades permitidas.
4. El sistema explica las consecuencias de permisos críticos.
5. Antes de guardar, presenta un resumen de cambios.
6. El administrador confirma.
7. El servidor valida que el actor pueda modificar ese rol y que no se violen restricciones de seguridad.
8. Guarda la nueva matriz y registra el cambio en auditoría.
9. Los cambios se aplican a nuevas verificaciones de autorización y se invalidan sesiones o tokens cuando la política lo requiera.
10. El sistema muestra el resultado real de la operación.

### Reglas de negocio
- **RN-032.1:** solo un usuario con permiso de gobernanza puede modificar permisos.
- **RN-032.2:** un administrador no puede concederse privilegios superiores ni escalarse a sí mismo.
- **RN-032.3:** la matriz debe impedir combinaciones que permitan autoaprobación no autorizada, escalamiento o acceso indebido a auditoría.
- **RN-032.4:** los permisos críticos deben estar sujetos a política y confirmación reforzada.
- **RN-032.5:** el sistema debe conservar el estado anterior y nuevo de la matriz.
- **RN-032.6:** la modificación debe tener efecto consistente en backend; no se considera guardada por cambiar un interruptor local.
- **RN-032.7:** los cambios deben invalidar o actualizar permisos en sesiones activas de acuerdo con una estrategia definida.
- **RN-032.8:** debe protegerse el último administrador con privilegios suficientes.
- **RN-032.9:** la asignación de permisos debe ser transaccional y auditable.
- **RN-032.10:** no se debe permitir que un permiso de interfaz habilite una operación que el backend no reconoce.

### Criterios de aceptación
- **CA-032.1:** El administrador autorizado puede modificar únicamente permisos delegables.
- **CA-032.2:** Los cambios se presentan en un resumen antes de confirmar.
- **CA-032.3:** Si el actor no tiene permiso, el servidor rechaza la operación.
- **CA-032.4:** Si la nueva matriz viola una restricción, el sistema no la guarda y explica el motivo.
- **CA-032.5:** Tras guardar, la matriz vuelve a cargarse desde la fuente persistente y refleja los cambios.
- **CA-032.6:** Los cambios quedan registrados con actor, fecha, rol afectado y diferencias.
- **CA-032.7:** Las sesiones afectadas no conservan privilegios revocados más allá del tiempo definido por la política.
- **CA-032.8:** Si falla el guardado, el sistema no muestra un toast de éxito.

### Estado frente al código
Los interruptores actualizan estado React. La función `guardarPermisos` solo muestra un toast y no realiza persistencia. El permiso Gobernanza de Cuentas está bloqueado visualmente, pero no se observa una política de autorización del lado servidor.

---

## HU-033 — Administrar la configuración general del sistema

**Como** administrador con permiso de configuración,  
**quiero** consultar y actualizar los parámetros globales autorizados de SIGNA-TECH-APP,  
**para** mantener el funcionamiento del sistema de forma controlada y coherente.

### Alcance de configuración
La pantalla debe organizar parámetros por secciones, según las capacidades reales implementadas:
- **General:** nombre institucional visible, zona horaria y parámetros generales no sensibles.
- **Comunicación:** parámetros permitidos para voz, texto y comportamiento de módulos.
- **Interpretación LSC:** parámetros de operación del servicio de interpretación, si existe un servicio real integrado.
- **Recursos y límites:** límites de carga, formatos admitidos y tamaños máximos.
- **Accesibilidad:** preferencias globales de accesibilidad, sin reemplazar las preferencias personales.
- **Auditoría:** acceso de consulta a registros técnicos según permisos.

No se deben mostrar controles para modificar parámetros que todavía no tengan un servicio, configuración o contrato técnico que los consuma.

### Flujo principal
1. El administrador abre **Configuración General** desde el panel o menú lateral.
2. El sistema valida permiso de consulta y carga la configuración vigente.
3. Presenta secciones, descripción de cada parámetro, valor actual y alcance.
4. El administrador selecciona una sección.
5. Modifica únicamente los parámetros editables para su rol.
6. El sistema valida tipo, rango, formato y dependencias.
7. Presenta resumen de los cambios y advierte si requieren reiniciar un servicio o invalidar una configuración.
8. El administrador confirma.
9. El servidor valida de nuevo y guarda los cambios.
10. Registra el evento de auditoría.
11. El sistema confirma qué parámetros fueron actualizados y cuáles requieren una acción adicional.

### Reglas de negocio
- **RN-033.1:** cada parámetro debe tener clave estable, tipo, valor, descripción, rango permitido y alcance.
- **RN-033.2:** no se deben guardar secretos o credenciales en texto plano ni exponerlos en la interfaz.
- **RN-033.3:** los parámetros sensibles requieren permiso específico y, si aplica, confirmación reforzada.
- **RN-033.4:** el sistema debe distinguir configuración global, configuración por rol y preferencia personal.
- **RN-033.5:** solo deben exponerse parámetros que tengan efecto real en el sistema.
- **RN-033.6:** los valores deben validarse en cliente y servidor.
- **RN-033.7:** cambios críticos deben registrar valor anterior, valor nuevo, actor y fecha, protegiendo información sensible.
- **RN-033.8:** los cambios que requieran reinicio o despliegue deben indicarlo antes de guardar.
- **RN-033.9:** debe existir un mecanismo seguro de recuperación ante una configuración inválida.
- **RN-033.10:** el sistema no debe presentar un cambio como aplicado si solo se guardó una preferencia local.

### Criterios de aceptación
- **CA-033.1:** Un administrador autorizado puede consultar los parámetros globales disponibles.
- **CA-033.2:** Cada parámetro muestra su descripción y alcance.
- **CA-033.3:** Los valores fuera de rango o tipo son rechazados.
- **CA-033.4:** Los usuarios sin permiso no pueden leer ni modificar parámetros restringidos.
- **CA-033.5:** Al guardar, el sistema confirma los cambios realmente persistidos.
- **CA-033.6:** Los cambios quedan registrados en auditoría sin exponer secretos.
- **CA-033.7:** Si un cambio requiere reinicio, el sistema lo informa y mantiene un estado de aplicación claro.
- **CA-033.8:** Si falla la persistencia, se conserva la configuración anterior.
- **CA-033.9:** Los parámetros sin integración real no aparecen como controles operativos.

### Estado frente al código
El panel y la barra lateral contienen un enlace a `/configuracion_admin` y el panel describe funciones de parámetros del traductor, tema y logs. No se localizó una página o vista correspondiente en la rama inspeccionada. El alternador de tema en la barra lateral sí tiene un proveedor de tema, pero no demuestra la existencia de una consola de configuración general.

---

## HU-034 — Consultar la auditoría de acciones administrativas

**Como** administrador o auditor con permiso específico,  
**quiero** consultar los eventos relacionados con cuentas, roles, permisos y configuración,  
**para** verificar cambios sensibles y reconstruir las operaciones realizadas.

### Flujo principal
1. El usuario autorizado abre la sección de auditoría.
2. El sistema consulta los eventos disponibles.
3. Presenta fecha y hora, actor, acción, módulo, elemento afectado y resultado.
4. El usuario filtra por rango de fechas, actor, módulo, acción o resultado.
5. Selecciona un evento para consultar detalles permitidos.
6. El sistema muestra diferencias relevantes y motivo, sin revelar contraseñas, tokens ni secretos.
7. El usuario puede exportar un reporte si dispone del permiso correspondiente.

### Reglas de negocio
- **RN-034.1:** los eventos de auditoría deben generarse en servidor y no depender de mensajes toast.
- **RN-034.2:** los eventos deben ser protegidos contra modificación o eliminación no autorizada.
- **RN-034.3:** cada evento debe incluir actor, fecha normalizada, acción, entidad afectada, resultado y correlación de solicitud cuando sea posible.
- **RN-034.4:** las operaciones sensibles deben registrar valores anteriores y nuevos cuando sea apropiado, excluyendo secretos.
- **RN-034.5:** los usuarios solo pueden consultar eventos dentro de su alcance de autorización.
- **RN-034.6:** exportar auditoría requiere permiso explícito y también debe quedar auditado.
- **RN-034.7:** deben definirse política de retención, respaldo y acceso a los registros.
- **RN-034.8:** los eventos deben distinguir operaciones exitosas, rechazadas y fallidas.

### Criterios de aceptación
- **CA-034.1:** El auditor autorizado puede consultar eventos registrados.
- **CA-034.2:** Los filtros producen resultados coherentes y combinables.
- **CA-034.3:** El detalle permite identificar actor, acción, fecha y elemento afectado.
- **CA-034.4:** No se muestran contraseñas, hashes, tokens ni secretos.
- **CA-034.5:** Una operación administrativa sensible genera un evento incluso si su resultado es rechazado, cuando la política de auditoría lo requiera.
- **CA-034.6:** La exportación solo está disponible para usuarios autorizados y queda registrada.
- **CA-034.7:** Si no existen eventos, se presenta un estado vacío; no se inventan registros de actividad.

### Estado frente al código
La matriz de roles describe un permiso de acceso a Logs de Auditoría, y el panel menciona logs técnicos. No se localizó en los archivos revisados una vista de consulta de auditoría integrada con operaciones administrativas. Los toast y arreglos locales no equivalen a un registro de auditoría persistente.

---

## 6. Matriz inicial de roles y capacidades

Esta matriz es una propuesta funcional inicial que debe validarse con el Product Owner y vincularse a permisos reales en el modelo de datos. No representa una configuración ya implementada.

| Capacidad | Administrador | Intérprete | Operador |
|---|---:|---:|---:|
| Consultar módulos operativos | Sí | Según necesidad | Sí |
| Usar conversión voz/texto | Según necesidad | Según necesidad | Sí |
| Consultar diccionario LSC | Sí | Sí | Sí |
| Proponer nueva seña | Según política | Sí | No |
| Proponer corrección | Según política | Sí | No |
| Revisar/aprobar contenido | Sí, si autorizado | No por defecto | No |
| Consultar usuarios | Sí, si autorizado | No | No |
| Crear/editar cuentas internas | Sí, si autorizado | No | No |
| Asignar roles y permisos | Solo gobernanza | No | No |
| Modificar configuración global | Solo configuración | No | No |
| Consultar auditoría administrativa | Solo auditoría | No | No |

**Principio:** los permisos deben asignarse por capacidad específica y mínimo privilegio. El rol no debe usarse como única condición rígida si se requieren excepciones controladas.

## 7. Estados de cuenta recomendados

| Estado | Significado | Acceso |
|---|---|---|
| Pendiente de activación | Cuenta creada, falta completar activación | Restringido |
| Activo | Cuenta habilitada | Según permisos |
| Suspendido | Acceso bloqueado administrativamente | Denegado |
| Bloqueado por seguridad | Restricción por riesgo o intentos fallidos | Denegado hasta resolución |
| Retirado | Cuenta fuera de operación, conservada para trazabilidad | Denegado |

El campo booleano `activo` que existe en la interfaz actual puede servir para una demostración sencilla, pero no representa por sí solo todos los estados requeridos.

## 8. Datos mínimos recomendados

La estructura física debe corresponder al modelo entidad-relación aprobado. Conceptualmente se requiere:

### Cuenta de usuario
- ID único.
- Nombre completo.
- Correo normalizado y único.
- Teléfono, si aplica.
- Estado de cuenta.
- Fecha de creación y actualización.
- Fecha de activación, suspensión o retiro, según aplique.
- Referencia a rol o relación con roles.
- Datos de autenticación administrados por el módulo seguro correspondiente.

### Rol
- ID único.
- Código estable.
- Nombre.
- Descripción.
- Estado.
- Indicador de rol protegido del sistema, si aplica.

### Permiso
- ID único.
- Código estable.
- Nombre.
- Descripción.
- Módulo o recurso.
- Acción.
- Nivel de sensibilidad o criticidad.

### Relaciones de autorización
- Relación usuario-rol.
- Relación rol-permiso.
- Vigencia y actor que realizó la asignación, si aplica.

### Configuración
- Clave única.
- Tipo de dato.
- Valor serializado o referencia segura.
- Alcance global/rol/usuario.
- Descripción.
- Rango permitido.
- Fecha y actor de última modificación.

### Auditoría
- ID del evento.
- Actor.
- Acción.
- Entidad afectada.
- Identificador del registro.
- Valores relevantes antes/después, sin secretos.
- Fecha/hora.
- Resultado y motivo.
- Referencia de correlación.

Estos son conceptos funcionales; no se afirma que todas estas entidades o relaciones existan actualmente en la base de datos. Deben mapearse al esquema relacional definitivo antes de implementar.

## 9. Requisitos no funcionales

- **RNF-07.1 Seguridad:** autenticación y autorización del lado servidor en cada endpoint protegido.
- **RNF-07.2 Mínimo privilegio:** roles y permisos limitados a las responsabilidades reales.
- **RNF-07.3 Credenciales:** contraseñas con hashing seguro, secretos protegidos y mecanismos de recuperación/invitación de un solo uso.
- **RNF-07.4 Integridad:** unicidad de correo y consistencia de asignaciones mediante restricciones de base de datos.
- **RNF-07.5 Auditoría:** operaciones administrativas críticas registradas en servidor.
- **RNF-07.6 Concurrencia:** evitar actualizaciones perdidas en cuentas, roles y configuración.
- **RNF-07.7 Accesibilidad:** formularios etiquetados, estados comprensibles, controles por teclado y contraste adecuado.
- **RNF-07.8 Usabilidad:** mensajes específicos, confirmaciones para acciones destructivas y estados de carga/error.
- **RNF-07.9 Disponibilidad:** fallos del servicio no deben dejar cambios parciales.
- **RNF-07.10 Privacidad:** mostrar únicamente datos personales necesarios para la tarea.
- **RNF-07.11 Escalabilidad:** búsquedas paginadas e índices para correo, estado y rol.
- **RNF-07.12 Configuración segura:** validar rangos y mantener recuperación ante parámetros inválidos.

## 10. Dependencias

- Autenticación, sesiones y recuperación de acceso (EP-01).
- Modelo de usuarios, roles y permisos aprobado.
- Servicios/API de usuarios y autorización.
- Base de datos central y restricciones de integridad.
- Auditoría centralizada.
- Módulos de intérprete, operador y administrador que consumen permisos.
- Servicio de correo o mecanismo institucional de invitación, si se adopta.
- Definición de parámetros globales realmente soportados.
- Gestión de tema y preferencias de interfaz, diferenciada de configuración global.

## 11. Riesgos y decisiones pendientes

1. **Modelo de roles:** confirmar si el administrador es un rol interno con permisos delegables o un rol raíz protegido.
2. **Operadores:** definir el flujo exacto de autoregistro y la relación con el alta administrativa.
3. **Invitación y credenciales:** decidir si se usará enlace de activación, contraseña temporal o proveedor de identidad.
4. **Jerarquía:** definir qué administrador puede crear otros administradores y quién puede modificar permisos críticos.
5. **Último administrador:** establecer el mecanismo para evitar bloqueo total de gobernanza.
6. **Suspensión:** definir tiempos y alcance de revocación de sesiones.
7. **Eliminación:** establecer política de baja, anonimización y retención.
8. **Permisos granulares:** acordar catálogo de acciones y recursos por módulo.
9. **Configuración:** resolver discrepancia entre `/configuracion_admin` y `/admin/configuracion`, y definir qué parámetros tienen implementación real.
10. **Auditoría:** definir política de retención, exportación, protección e inspección.
11. **Tema visual:** separar la preferencia de tema del administrador de parámetros globales de la plataforma.
12. **Métricas:** sustituir números fijos del panel por indicadores provenientes de fuentes reales antes de presentarlos como métricas de producción.

## 12. Definition of Ready (DoR)

Una historia de esta épica está lista para desarrollo cuando:
- Se definió el actor y el permiso requerido.
- Se especificaron campos, reglas y estados.
- Se identificó el endpoint o servicio responsable.
- Se conocen las entidades y restricciones de base de datos involucradas.
- Se definió qué acciones requieren confirmación o auditoría.
- Se conocen las reglas de delegación y protección de privilegios.
- Los criterios de aceptación cubren escenarios positivos, negativos y de seguridad.
- Las pantallas contemplan carga, vacío, error, confirmación y acceso denegado.

## 13. Definition of Done (DoD)

Una historia se considera terminada cuando:
- La interfaz implementa los flujos y estados documentados.
- Las operaciones persisten en backend y base de datos.
- El servidor valida identidad, rol y permiso.
- Las credenciales y secretos se manejan de forma segura.
- Se aplican restricciones de integridad y control de concurrencia.
- Las acciones sensibles generan auditoría verificable.
- Se prueban permisos, intentos de acceso directo, duplicados y conflictos.
- Se verifica que los cambios de permisos surtan efecto según la política de sesiones.
- Se prueban accesibilidad y navegación por teclado.
- No existen mensajes de éxito falsos ante fallos de persistencia.
- La documentación y pruebas quedan actualizadas.

## 14. Matriz de trazabilidad

| Historia | Capacidad | Módulo | Prioridad |
|---|---|---|---|
| HU-026 | Consultar, buscar y filtrar usuarios | Administrador | Alta |
| HU-027 | Crear cuenta interna | Administrador | Crítica |
| HU-028 | Editar datos y rol | Administrador | Alta |
| HU-029 | Activar, suspender y reactivar | Administrador / Autenticación | Crítica |
| HU-030 | Retirar cuenta conservando trazabilidad | Administrador | Alta |
| HU-031 | Consultar matriz de roles y permisos | Administrador | Alta |
| HU-032 | Asignar y actualizar permisos | Administrador | Crítica |
| HU-033 | Administrar configuración general | Administrador | Alta |
| HU-034 | Consultar auditoría administrativa | Administrador / Auditoría | Alta |

## 15. Evidencia técnica analizada

- `src/Features/Administrador/Vistas/GestionUsuarios.jsx`
- `src/Features/Administrador/Vistas/GestionRoles.jsx`
- `src/Features/Administrador/Componentes/BarraLateral.jsx`
- `src/Features/Administrador/Vistas/PanelAdministracion.jsx`
- `src/app/(administrador)/gestion_usuarios/page.jsx`
- `src/app/(administrador)/gestion_roles/page.jsx`
- `src/app/(administrador)/inicio_admin/page.jsx`
- `README_FINAL_ADMIN.md`

**Criterio de documentación:** el estado actual se limita a lo observado en los archivos indicados. Persistencia central, autorización efectiva en servidor, gestión segura de credenciales, configuración global y auditoría integrada se especifican como objetivos, no como funcionalidades certificadas.
