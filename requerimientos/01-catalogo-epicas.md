# SIGNA-TECH-APP — Catálogo inicial de épicas

**Versión:** 0.1  
**Estado:** Borrador de ingeniería inversa — sujeto a validación funcional  
**Rama de documentación:** `documentacion-signa-tech-app`  
**Rama de código de referencia:** `correcciones-de-color`  
**Proyecto analizado:** `SIGNA-TECH-APP-nextjs (1)`  
**Tecnología identificada:** Next.js 16.4.6, React 19.2.8, App Router y Tailwind CSS 4.

---

## 1. Propósito del documento

Este documento establece el primer catálogo de épicas de SIGNA-TECH-APP a partir de la estructura y de la inspección inicial del frontend existente. Las épicas agrupan capacidades del producto por objetivos de usuario y servirán como contenedor para desglosar posteriormente las historias de usuario, criterios de aceptación y sprints.

El catálogo no pretende afirmar que todas las capacidades visibles estén terminadas ni conectadas a servicios persistentes. En esta reconstrucción se diferencia entre:

- **Confirmado en código revisado:** existe una implementación identificable en los archivos inspeccionados.
- **Parcial o demostrativo:** existe interfaz o comportamiento local, pero no se comprobó la integración completa que necesitaría una versión productiva.
- **Pendiente de inspección:** la capacidad aparece en la estructura o navegación del proyecto, pero todavía no se ha revisado su implementación con suficiente profundidad.

Esta clasificación evita convertir elementos visuales o datos de ejemplo en funcionalidades terminadas.

## 2. Contexto del producto

SIGNA-TECH-APP es un prototipo de aplicación de comunicación bidireccional que busca facilitar intercambios básicos entre personas con y sin dificultades de comunicación auditiva y del habla, mediante texto, voz y recursos de Lengua de Señas Colombiana (LSC).

La visión funcional contempla dos direcciones principales:

1. **Voz o texto hacia recursos visuales de señas:** facilitar que una persona oyente pueda expresar mensajes básicos que puedan consultarse mediante representaciones de señas.
2. **Señas hacia texto o voz:** apoyar la comprensión de señas mediante mecanismos de captura, interpretación y presentación del resultado.

El alcance real de cada mecanismo de reconocimiento debe validarse por separado. La presencia de una cámara, un avatar o una pantalla de traducción no demuestra por sí sola que exista un modelo de inteligencia artificial entrenado e integrado.

## 3. Actores del producto

| Actor | Responsabilidad general |
|---|---|
| Visitante | Consulta la información pública del producto y sus canales de orientación o soporte. |
| Operador | Utiliza las herramientas de comunicación y consulta disponibles en la aplicación. Puede corresponder a una persona con o sin dificultades auditivas o del habla. |
| Intérprete | Participa en el registro, revisión, validación y corrección del contenido relacionado con señas. |
| Administrador | Gestiona la configuración administrativa, los usuarios y el contenido del sistema, según las capacidades implementadas. |

Los permisos específicos de cada rol se detallarán en las historias y se contrastarán con las rutas y controles reales del proyecto.

## 4. Catálogo de épicas

### EP-01 — Gestión de identidad y acceso

**Objetivo:** permitir que los usuarios ingresen al sistema de acuerdo con su identidad, estado y rol, y que accedan a las áreas que les corresponden.

**Problema que atiende:** sin un mecanismo de acceso diferenciado, no es posible separar las funciones del operador, intérprete y administrador ni controlar el ingreso a las áreas privadas.

**Actores principales:** operador, intérprete y administrador.

**Capacidades agrupadas:**
- Inicio de sesión.
- Validación de credenciales.
- Identificación del rol asociado al usuario.
- Verificación del estado activo de la cuenta.
- Acceso y navegación hacia el área correspondiente al rol.
- Registro de cuenta y recuperación de contraseña, si se confirma su flujo funcional completo.

**Evidencia y estado inicial:**
- **Confirmado en código revisado:** existe una función de autenticación que compara credenciales de cuentas de prueba, comprueba el estado activo y devuelve datos básicos del usuario y su rol.
- **Parcial/demostrativo:** las credenciales revisadas están definidas en el frontend; no se comprobó autenticación contra un backend ni almacenamiento seguro de usuarios.
- **Pendiente de inspección:** persistencia de sesión, cierre de sesión, registro de cuenta, recuperación de contraseña y protección efectiva de todas las rutas.

**Criterio de cierre de la épica:** los flujos de acceso definidos para cada rol están documentados, probados y respaldados por el mecanismo de autenticación que finalmente adopte el proyecto. No se considerará suficiente una pantalla de login sin validación real.

### EP-02 — Comunicación de voz y texto

**Objetivo:** ofrecer herramientas para convertir voz en texto y reproducir texto mediante voz, facilitando intercambios básicos de comunicación.

**Problema que atiende:** algunas personas necesitan alternativas al canal oral o escrito tradicional para comprender y expresar mensajes.

**Actores principales:** operador.

**Capacidades agrupadas:**
- Acceso a la herramienta de voz a texto.
- Inicio y detención de la captura de voz.
- Visualización y copia del texto obtenido.
- Ingreso de texto para reproducción por voz.
- Selección o ajuste de parámetros de reproducción disponibles.
- Consulta del historial local de reproducciones, cuando aplique.

**Evidencia y estado inicial:**
- **Confirmado en código revisado:** la vista de texto a voz utiliza las API del navegador `SpeechSynthesisUtterance` y `speechSynthesis`, configura español de Colombia y permite reproducir/detener la voz; también mantiene un historial local limitado.
- **Parcial/demostrativo:** en la vista de voz a texto, los controles modifican el estado visual y muestran un texto de espera, pero no se encontró implementación de reconocimiento de voz en el archivo revisado.
- **Pendiente de inspección:** persistencia del historial, compatibilidad entre navegadores y posibles integraciones adicionales.

**Criterio de cierre de la épica:** cada dirección de conversión debe producir el resultado esperado en un entorno de prueba, manejar permisos y errores y comunicar claramente sus limitaciones. La interfaz de captura no se considerará reconocimiento funcional si no entrega una transcripción real.

### EP-03 — Captura e interpretación de señas

**Objetivo:** proporcionar al operador un medio para utilizar la cámara y, cuando exista un motor de interpretación integrado, procesar señas para generar una salida comprensible.

**Problema que atiende:** se requiere un canal visual que permita reconocer o apoyar la interpretación de mensajes expresados mediante señas.

**Actores principales:** operador.

**Capacidades agrupadas:**
- Solicitud de permiso para utilizar la cámara.
- Visualización de la transmisión de video.
- Inicio y detención de la cámara.
- Presentación del estado de captura.
- Interpretación de señas y presentación del resultado, únicamente cuando el motor correspondiente esté integrado.
- Manejo de permisos denegados, cámara no disponible y problemas de calidad de imagen.

**Evidencia y estado inicial:**
- **Confirmado en código revisado:** la vista de cámara solicita acceso mediante `navigator.mediaDevices.getUserMedia`, muestra el flujo de video y detiene las pistas al desconectarse o desmontarse el componente.
- **Parcial/demostrativo:** algunos indicadores de rendimiento se actualizan de forma artificial.
- **No comprobado / pendiente:** no se encontró en el archivo revisado integración de un modelo que reconozca automáticamente señas de LSC. Por tanto, no se registra todavía la traducción automática como capacidad implementada.

**Criterio de cierre de la épica:** la captura debe funcionar de forma estable y, para declarar interpretación automática, debe existir un procesamiento verificable que transforme una seña reconocida en un resultado, con pruebas y límites documentados.

### EP-04 — Consulta y administración del diccionario LSC

**Objetivo:** facilitar la consulta y organización de un conjunto de señas y sus recursos asociados.

**Problema que atiende:** los usuarios necesitan consultar referencias de señas y el equipo requiere organizar el contenido lingüístico utilizado por el prototipo.

**Actores principales:** operador y administrador.

**Capacidades agrupadas:**
- Consulta y búsqueda de señas.
- Visualización de información y recursos asociados a cada seña.
- Organización o filtrado del contenido.
- Creación, edición y eliminación administrativa de registros.
- Carga y validación básica de archivos de imagen, cuando corresponda.

**Evidencia y estado inicial:**
- **Confirmado en código revisado:** el componente administrativo del diccionario permite operaciones de creación, edición, eliminación, búsqueda y filtrado sobre datos mantenidos en estado local. Incluye lectura de imágenes y validación de tipo y tamaño.
- **Parcial/demostrativo:** los datos iniciales están definidos en el frontend y los cambios se mantienen en el estado de la sesión; no se comprobó persistencia en una base de datos.
- **Pendiente de inspección:** experiencia de consulta del operador, detalle de cada seña y estructura completa de los recursos multimedia.

**Criterio de cierre de la épica:** el contenido debe poder consultarse de forma consistente y las operaciones administrativas deben persistir, validarse y respetar las reglas de integridad que se definan para el diccionario.

### EP-05 — Registro y validación de señas

**Objetivo:** permitir que el intérprete participe en el ingreso y revisión de nuevas señas antes de incorporarlas al contenido aprobado.

**Problema que atiende:** el contenido lingüístico requiere revisión para reducir errores y evitar que material no validado se presente como referencia confiable.

**Actores principales:** intérprete y administrador, según los permisos que se confirmen.

**Capacidades agrupadas:**
- Registro o propuesta de nuevas señas.
- Consulta de elementos pendientes de revisión.
- Revisión de la información y recursos asociados.
- Aprobación o rechazo de propuestas.
- Registro del resultado de la revisión y de su responsable, si el sistema lo soporta.

**Evidencia y estado inicial:**
- **Confirmado en código revisado:** la vista de aprobación contiene conjuntos de datos de ejemplo y permite aprobar, rechazar o retirar elementos mediante cambios de estado local.
- **Parcial/demostrativo:** las acciones revisadas operan sobre arreglos locales; no se comprobó persistencia ni trazabilidad en servidor.
- **Pendiente de inspección:** formulario completo de registro de señas, validaciones, permisos y conexión con el diccionario.

**Criterio de cierre de la épica:** una propuesta debe recorrer un flujo verificable de registro y decisión, conservar su estado y permitir identificar qué usuario realizó la revisión.

### EP-06 — Corrección y mantenimiento del contenido de señas

**Objetivo:** facilitar la corrección de señas existentes y el mantenimiento de la calidad del contenido del diccionario.

**Problema que atiende:** una referencia puede contener errores, información incompleta o recursos que necesiten actualización; se requiere un flujo controlado para corregirla.

**Actores principales:** intérprete y administrador.

**Capacidades agrupadas:**
- Consulta de señas que requieren corrección.
- Edición de datos o recursos asociados.
- Envío de correcciones para revisión, cuando exista ese flujo.
- Aprobación o rechazo de correcciones.
- Conservación de la versión vigente y del resultado de la revisión, si está implementado.

**Evidencia y estado inicial:**
- **Confirmado en código revisado:** la vista de aprobación incluye un conjunto diferenciado de correcciones y acciones locales para gestionarlas.
- **Parcial/demostrativo:** las operaciones revisadas modifican el estado del frontend y no demuestran persistencia.
- **Pendiente de inspección:** vista completa de corrección del intérprete, control de versiones y relación con el historial.

**Criterio de cierre de la épica:** las correcciones deben tener un flujo claro, validaciones, persistencia y una forma de identificar qué cambió y quién lo autorizó.

### EP-07 — Administración de usuarios, roles y configuración

**Objetivo:** proporcionar al administrador herramientas para gestionar el acceso y los parámetros generales del sistema.

**Problema que atiende:** el producto necesita administración centralizada para mantener el control de usuarios, roles y opciones de configuración.

**Actores principales:** administrador.

**Capacidades agrupadas:**
- Consulta y gestión de usuarios.
- Activación o desactivación de cuentas, si está soportado.
- Asignación o consulta de roles y permisos.
- Acceso a opciones de configuración administrativa.
- Control de acceso a las funciones según el rol.

**Evidencia y estado inicial:**
- **Pendiente de inspección detallada:** el árbol del proyecto identifica un módulo de administración y vistas asociadas a usuarios, roles y configuración, pero todavía no se ha verificado la implementación completa ni la persistencia de sus operaciones.
- **No asumir:** que la existencia de pantallas administrativas implique que los cambios se guarden o que los permisos estén aplicados en servidor.

**Criterio de cierre de la épica:** las operaciones administrativas deben funcionar con permisos adecuados, validaciones, persistencia y controles que impidan acciones no autorizadas.

### EP-08 — Soporte, seguimiento e historial de actividad

**Objetivo:** ofrecer mecanismos de orientación y soporte al usuario y, cuando esté implementado, consultar registros de actividad relevantes para el seguimiento del sistema.

**Problema que atiende:** los usuarios necesitan comunicar dificultades y el equipo requiere información para dar seguimiento a incidencias y acciones relevantes.

**Actores principales:** visitante, operador, intérprete y administrador, según cada función.

**Capacidades agrupadas:**
- Consulta de preguntas frecuentes y orientación pública.
- Acceso al formulario de soporte.
- Consulta de historiales funcionales disponibles para cada rol.
- Consulta de registros administrativos o de auditoría, si se confirma su implementación.
- Seguimiento del estado de solicitudes o incidencias, si existe ese flujo.

**Evidencia y estado inicial:**
- **Confirmado en código revisado:** el formulario de soporte presenta una demostración de interfaz; al enviarlo cambia el estado visual, y el propio código indica que todavía no envía información a un servidor.
- **Pendiente de inspección:** historiales del intérprete y administrador, auditoría, almacenamiento de solicitudes y seguimiento de incidencias.

**Criterio de cierre de la épica:** las solicitudes e historiales que se incluyan en el alcance deben tener un flujo verificable, almacenamiento definido y controles de acceso apropiados. Una confirmación visual no equivale a una solicitud enviada.

## 5. Resumen de validación inicial

| Épica | Área | Estado de evidencia |
|---|---|---|
| EP-01 | Identidad y acceso | Implementación parcial revisada; autenticación de prueba en frontend |
| EP-02 | Voz y texto | Texto a voz implementado con API del navegador; voz a texto no comprobado como reconocimiento real |
| EP-03 | Captura e interpretación de señas | Captura de cámara comprobada; reconocimiento automático no comprobado |
| EP-04 | Diccionario LSC | Gestión local de datos comprobada; persistencia no comprobada |
| EP-05 | Registro y validación | Acciones locales de aprobación comprobadas; flujo integral pendiente |
| EP-06 | Corrección de señas | Gestión local de correcciones identificada; flujo integral pendiente |
| EP-07 | Usuarios, roles y configuración | Módulo identificado; inspección detallada pendiente |
| EP-08 | Soporte e historiales | Formulario demostrativo comprobado; historiales y auditoría pendientes |

## 6. Reglas para desglosar las historias de usuario

Al construir las historias de cada épica se aplicarán estas reglas:

1. Cada historia representará una necesidad concreta de un actor y un resultado verificable.
2. Las historias se redactarán con el formato: **Como [actor], quiero [capacidad], para [beneficio].**
3. Cada historia tendrá identificador único, descripción, prioridad, criterios de aceptación y dependencias cuando existan.
4. Los criterios de aceptación describirán comportamientos observables y comprobables, no solo la apariencia de una pantalla.
5. Se distinguirán las historias que describen comportamiento ya implementado de aquellas que representan trabajo pendiente para completar el producto.
6. No se atribuirá reconocimiento mediante IA, persistencia, seguridad de backend o auditoría a una vista si no existe evidencia de su implementación.
7. La asignación a sprints se hará después de revisar las historias, dependencias, capacidad del equipo y estado real del código.

## 7. Próxima etapa

La siguiente entrega será el desglose de **EP-01 — Gestión de identidad y acceso** en historias de usuario detalladas. Antes de dar por cerradas las historias, se contrastarán los componentes de autenticación, las rutas protegidas y el manejo de sesión. Después se continuará con EP-02 y las demás épicas, y finalmente se organizarán los sprints con base en dependencias y trabajo verificable.

---

**Nota de control:** este catálogo es una línea base inicial construida con inspección parcial del frontend. Las épicas podrán dividirse, fusionarse o cambiar de alcance si la revisión de los módulos restantes demuestra que el producto implementado tiene límites distintos. Cualquier cambio se registrará en esta misma rama de documentación.
