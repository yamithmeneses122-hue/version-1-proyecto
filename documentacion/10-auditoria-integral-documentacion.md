# Auditoría integral de la documentación — SIGNA-TECH-APP

**Rama:** `documentacion-signa-tech-app`  
**Repositorio:** `yamithmeneses122-hue/version-1-proyecto`  
**Alcance revisado:** catálogo de épicas y documentos EP-01 a EP-08.  
**Fecha de auditoría:** 2026-11-18  
**Resultado:** revisión estructural y de consistencia completada; documentación **aprobable con ajustes**, todavía no certificable como “100 % cerrada”.

---

## 1. Resumen ejecutivo

Se localizaron los nueve documentos esperados en la carpeta `documentacion/`: un catálogo y ocho documentos de historias. La secuencia de historias está completa y no presenta identificadores de historia duplicados en los encabezados:

| Épica | Historias | Cantidad |
|---|---:|---:|
| EP-01 Identidad y acceso | HU-001 a HU-007 | 7 |
| EP-02 Comunicación de voz y texto | HU-008 a HU-010 | 3 |
| EP-03 Captura e interpretación de señas | HU-011 a HU-013 | 3 |
| EP-04 Diccionario LSC | HU-014 a HU-017 | 4 |
| EP-05 Registro y validación | HU-018 a HU-019 | 2 |
| EP-06 Corrección y mantenimiento | HU-020 a HU-025 | 6 |
| EP-07 Usuarios, roles y configuración | HU-026 a HU-034 | 9 |
| EP-08 Soporte e historial | HU-035 a HU-041 | 7 |
| **Total** | **HU-001 a HU-041** | **41** |

La estructura documental es sólida: las historias desarrollan flujos, reglas de negocio, criterios de aceptación y brechas frente al código; las épicas más recientes también incluyen DoR, DoD, dependencias, riesgos y modelos conceptuales. Se mantiene una distinción importante entre interfaz demostrativa, comportamiento local y funcionalidad productiva pendiente.

**Conclusión:** no se detectó un hueco en la numeración ni una historia duplicada como encabezado. Sí hay decisiones transversales que deben cerrarse antes de declarar el backlog definitivo y llevarlo a planificación de sprint.

## 2. Verificaciones que pasaron

- [x] Los nueve archivos documentales existen en la rama indicada.
- [x] Están documentadas las ocho épicas del catálogo.
- [x] La numeración de historias cubre de HU-001 a HU-041 sin saltos.
- [x] No hay IDs de historia repetidos en los encabezados de las ocho épicas.
- [x] Todas las épicas tienen una sección de historias y criterios de aceptación.
- [x] Se documentan límites técnicos y no se presenta automáticamente una interfaz como integración real de IA, backend o persistencia.
- [x] EP-01 contempla inicio público, login, registro, recuperación, sesión, cambio de cuenta y protección por rol.
- [x] EP-05 y EP-06 distinguen propuesta nueva de corrección de contenido existente.
- [x] EP-07 contempla administración de usuarios, roles, permisos, configuración y auditoría.
- [x] EP-08 contempla orientación, solicitud, seguimiento, atención, historial y notificaciones.

## 3. Hallazgos que requieren ajuste

### A-01 — Línea base técnica y procedencia del código (prioridad crítica)

El catálogo identifica como proyecto analizado una aplicación Next.js con App Router y señala la rama `correcciones-de-color`. EP-01 referencia rutas `src/app/(...)` propias del App Router. En cambio, varios documentos EP-02, EP-04, EP-05 y EP-08 citan archivos bajo `src/Features/...`, estructura asociada a la versión React anterior. EP-06 y EP-07 también contienen referencias tecnológicas mezcladas.

Esto no demuestra que los hallazgos sean falsos, pero deja ambigua la versión exacta del código usada como evidencia para cada historia.

**Corrección requerida:** agregar a cada documento una ficha de evidencia con repositorio, rama, ruta exacta, versión/commit inspeccionado y estado de la evidencia. Identificar expresamente qué archivos pertenecen al frontend React anterior y cuáles a Next.js. No combinar comportamientos de ambas versiones como si fueran una única implementación.

### A-02 — Límites entre diccionario, registro y corrección (prioridad alta)

EP-04 HU-017 permite administrar registros del diccionario mediante operaciones CRUD. EP-05 HU-018 registra nuevas propuestas y HU-019 las valida. EP-06 HU-020 a HU-025 gestiona propuestas de corrección de señas existentes.

La separación conceptual es válida, pero debe quedar como regla explícita: el CRUD administrativo no debe permitir saltarse el flujo de validación lingüística para contenido que se publique como seña aprobada.

**Corrección requerida:** definir qué actor puede crear borradores, qué actor puede aprobar, qué cambios requieren nueva revisión y cuál es la única operación que publica o reemplaza una seña vigente. Definir si la administración de EP-04 es mantenimiento técnico del catálogo o edición lingüística; evitar dos caminos que modifiquen el mismo registro sin trazabilidad.

### A-03 — Estados y transiciones del ciclo de vida de una seña (prioridad alta)

EP-05 usa estados como Pendiente, Validada, Rechazada y Corregida; EP-06 propone estados adicionales para correcciones, como revisión, devolución y decisión. EP-04 también contempla edición y eliminación.

**Corrección requerida:** publicar un único catálogo de estados y una matriz de transiciones por tipo de objeto (seña publicada, propuesta nueva y propuesta de corrección). Distinguir el estado de una solicitud del estado de la seña vigente. Una corrección aprobada no debe borrar la versión anterior.

### A-04 — Roles y actor de soporte (prioridad alta)

En EP-08 HU-038 aparece el actor “agente de soporte autorizado”. Ese actor no está definido como rol independiente en el catálogo general ni queda completamente resuelto si será un permiso del administrador, un usuario interno o un equipo externo. En EP-05 también se menciona administrador/revisor según permisos.

**Corrección requerida:** decidir si “agente de soporte” es un rol nuevo o un conjunto de permisos asignables a un rol existente. Actualizar el catálogo de actores y la matriz de permisos para que no existan actores funcionales sin autorización definida.

### A-05 — Delimitación entre auditoría administrativa e historial operativo (prioridad alta)

EP-07 HU-034 trata la auditoría de acciones administrativas. EP-08 HU-039 y HU-040 tratan historial operativo y detalle de actividad. Son capacidades distintas, pero pueden terminar consultando los mismos eventos.

**Corrección requerida:** definir un catálogo común de eventos y separar las vistas por alcance y autorización. EP-07 debe cubrir acciones administrativas sensibles; EP-08 debe cubrir actividad operativa de señas y seguimiento. Especificar si comparten una fuente de eventos y evitar duplicar registros o implementar dos auditorías incompatibles.

### A-06 — Catálogo de épicas desactualizado frente a la entrega actual (prioridad media)

El catálogo conserva una sección “Próxima etapa” que dice que la siguiente entrega será EP-01 y después EP-02. Esa secuencia ya se completó: están publicados los ocho documentos y 41 historias. El documento se titula “catálogo inicial” y mantiene estado de borrador.

**Corrección requerida:** actualizar el estado del catálogo a línea base documental en revisión, reemplazar la próxima etapa antigua por el estado actual y enlazar los ocho documentos de historias.

### A-07 — Requisitos transversales y criterios de aceptación no totalmente normalizados (prioridad media)

La profundidad de las épicas no es uniforme. EP-01 a EP-05 tienen estructuras diferentes; EP-06 a EP-08 incluyen DoR y DoD más explícitos. También varían los nombres de secciones para evidencia, brechas y trazabilidad.

**Corrección requerida:** adoptar una plantilla común mínima para todas las épicas: propósito, alcance/no alcance, actores y permisos, vocabulario/estados, evidencia técnica, historias, criterios de aceptación, reglas, dependencias, requisitos no funcionales, riesgos/decisiones, DoR, DoD y trazabilidad. No es necesario forzar secciones que no apliquen, pero sí marcar “No aplica” o “Pendiente de decisión”.

### A-08 — Prioridad y preparación del backlog (prioridad media)

Las historias tienen prioridades, pero todavía hay decisiones de producto y dependencias abiertas. La prioridad por sí sola no determina el orden de desarrollo. Algunas historias dependen de autenticación, backend, modelo de datos, permisos, almacenamiento multimedia, servicio de IA o notificaciones.

**Corrección requerida:** crear una matriz consolidada de las 41 historias con prioridad, valor, dependencia, estado actual, riesgo y criterio de preparación (Ready/Needs decision). No asignar sprints hasta que se confirme capacidad del equipo y se resuelvan dependencias críticas.

## 4. Decisiones de producto que bloquean el cierre

1. ¿La línea base oficial del producto para la documentación será Next.js, React anterior o ambas, con una matriz explícita de migración?
2. ¿“Agente de soporte” será un rol o un permiso asignable?
3. ¿Quién puede publicar una seña en el diccionario y qué validación es obligatoria?
4. ¿Qué estados y transiciones oficiales aplican a señas, propuestas nuevas y propuestas de corrección?
5. ¿La auditoría administrativa y el historial operativo compartirán un servicio central de eventos?
6. ¿Qué funcionalidades forman parte del alcance de la primera versión entregable y cuáles quedan como evolución?

## 5. Recomendación de corrección

Orden sugerido para dejar el backlog coherente:

1. Confirmar la línea base técnica y los commits de referencia.
2. Definir actores y permisos comunes, incluido soporte.
3. Unificar el ciclo de vida de señas y correcciones.
4. Separar las responsabilidades EP-04, EP-05 y EP-06.
5. Unificar auditoría e historial sin duplicar responsabilidades.
6. Actualizar el catálogo de épicas y agregar índice de navegación.
7. Consolidar las 41 historias en un Product Backlog con dependencias y preparación.
8. Realizar una segunda revisión de consistencia y aprobar la línea base.

## 6. Dictamen

**Estado actual: revisión estructural aprobada; cierre funcional/documental condicionado.**

La documentación es una base amplia y útil para el equipo, pero no sería profesional afirmar que está “100 % lista” mientras sigan abiertas la procedencia de la evidencia entre React/Next.js, la matriz definitiva de permisos, los estados de señas y las fronteras entre edición, validación y corrección.

Este informe no modifica ni elimina historias existentes. Registra los hallazgos para que las correcciones se realicen de forma controlada en esta misma rama, conservando la trazabilidad de los documentos originales.
