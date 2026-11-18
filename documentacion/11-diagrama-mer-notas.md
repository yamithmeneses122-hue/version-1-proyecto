# Diagrama MER — SIGNA-TECH-APP

**Versión:** 1.0 — propuesta conceptual derivada de las épicas e historias documentadas.  
**Rama:** `documentacion-signa-tech-app`  
**Diagrama editable:** [Diagrama_MER.drawio](./Diagrama_MER.drawio)

## Alcance
Modelo conceptual con 18 entidades y 21 relaciones para identidad y acceso, comunicación, captura de cámara, diccionario LSC, validación y mantenimiento de señas, soporte e historiales. Se separan auditoría administrativa, historial operativo e historial de solicitudes de soporte.

## Entidades
1. **USUARIO** — id_usuario (PK), nombre, correo, hash_contrasena, telefono, estado.
2. **ROL** — id_rol (PK), nombre, descripcion, estado.
3. **PERMISO** — id_permiso (PK), codigo, nombre, descripcion.
4. **SESION** — id_sesion (PK), fecha_inicio, fecha_fin, token_hash, estado.
5. **HISTORIAL_AUDITORIA** — id_auditoria (PK), accion, entidad, id_registro, fecha, ip.
6. **REPORTE_FALLA** — id_reporte (PK), categoria, descripcion, modulo, fecha, estado.
7. **CAPTURA_CAMARA** — id_captura (PK), fecha_inicio, fecha_fin, calidad, estado, mensaje_error.
8. **TRADUCCION_VOZ** — id_traduccion_voz (PK), texto_entrada, texto_resultado, idioma, velocidad, fecha.
9. **TRADUCCION_SENAS** — id_traduccion_sena (PK), texto_resultado, confianza, fecha, estado.
10. **DICCIONARIO_SENAS** — id_sena (PK), nombre, descripcion, categoria, estado, fecha_actualizacion.
11. **VALIDACION_SENA** — id_validacion (PK), decision, observacion, fecha, estado.
12. **RETROALIMENTACION** — id_retroalimentacion (PK), tipo, comentario, fecha, estado.
13. **SOLICITUD_CAMBIO_SENA** — id_solicitud_cambio (PK), tipo PROPUESTA/CORRECCION, motivo, datos_propuestos, estado, fecha.
14. **VERSION_SENA** — id_version (PK), numero_version, contenido, fecha, vigente.
15. **RECURSO_MULTIMEDIA** — id_recurso (PK), tipo, ruta, mime, tamano, checksum.
16. **SOLICITUD_SOPORTE** — id_solicitud (PK), radicado, categoria, asunto, descripcion, prioridad, estado, fecha.
17. **HISTORIAL_SOLICITUD** — id_historial_solicitud (PK), estado_anterior, estado_nuevo, comentario, fecha.
18. **HISTORIAL_OPERATIVO** — id_historial_operativo (PK), tipo_accion, detalle, fecha, referencia.

## Relaciones y cardinalidades
| # | Entidades | Relación | Cardinalidad |
|---:|---|---|---|
| 1 | USUARIO — ROL | pertenece | N : 1 |
| 2 | ROL — PERMISO | concede | N : M |
| 3 | USUARIO — SESION | inicia | 1 : N |
| 4 | USUARIO — HISTORIAL_AUDITORIA | genera | 1 : N |
| 5 | USUARIO — REPORTE_FALLA | reporta | 1 : N |
| 6 | USUARIO — CAPTURA_CAMARA | realiza | 1 : N |
| 7 | CAPTURA_CAMARA — TRADUCCION_SENAS | origina | 1 : N |
| 8 | USUARIO — TRADUCCION_VOZ | solicita | 1 : N |
| 9 | USUARIO — TRADUCCION_SENAS | solicita | 1 : N |
| 10 | TRADUCCION_SENAS — DICCIONARIO_SENAS | consulta | N : M |
| 11 | DICCIONARIO_SENAS — VALIDACION_SENA | recibe | 1 : N |
| 12 | USUARIO — VALIDACION_SENA | realiza | 1 : N |
| 13 | DICCIONARIO_SENAS — RETROALIMENTACION | recibe | 1 : N |
| 14 | USUARIO — RETROALIMENTACION | envia | 1 : N |
| 15 | DICCIONARIO_SENAS — RECURSO_MULTIMEDIA | contiene | 1 : N |
| 16 | DICCIONARIO_SENAS — VERSION_SENA | mantiene | 1 : N |
| 17 | USUARIO — SOLICITUD_CAMBIO_SENA | crea | 1 : N |
| 18 | DICCIONARIO_SENAS — SOLICITUD_CAMBIO_SENA | es_objeto_de | 1 : N |
| 19 | USUARIO — SOLICITUD_SOPORTE | crea | 0..1 : N |
| 20 | SOLICITUD_SOPORTE — HISTORIAL_SOLICITUD | registra | 1 : N |
| 21 | SOLICITUD_CAMBIO_SENA — HISTORIAL_OPERATIVO | genera | 1 : N |

## Decisiones de modelado
- `SOLICITUD_CAMBIO_SENA` unifica propuesta y corrección mediante el discriminador `tipo` (PROPUESTA/CORRECCION), evitando duplicar el mismo ciclo de revisión.
- `HISTORIAL_AUDITORIA` se reserva para trazabilidad administrativa y técnica; `HISTORIAL_OPERATIVO` representa acciones del ciclo de vida del contenido LSC; `HISTORIAL_SOLICITUD` conserva cambios de estado de tickets de soporte.
- `VERSION_SENA` conserva la evolución del contenido publicado; `RECURSO_MULTIMEDIA` separa los metadatos de archivos de la información lingüística.
- Las solicitudes de soporte pueden originarse en visitantes; por ello la relación con USUARIO es opcional (0..1).
- Las relaciones N:M se resolverán mediante tablas asociativas en el modelo relacional.
- La presencia de una entidad en el modelo objetivo no implica que el frontend actual ya persista esos datos ni que exista un backend conectado.

## Reglas por formalizar en el modelo relacional
- Correo de usuario único tras normalización; código de permiso y nombre de rol únicos; radicado único.
- Número de versión único por seña y una sola versión vigente por seña.
- Estados controlados mediante catálogos o restricciones CHECK.
- Integridad referencial y política de borrado definida por entidad; no eliminar auditoría ni historiales por cascada.
- Hash de contraseña y de token; nunca almacenar credenciales en texto plano.
- Validar tipo, tamaño, MIME real y checksum de recursos multimedia.

## Observaciones pendientes de validación
Antes del modelo lógico y el DDL MySQL se debe cerrar: (1) si reportes de falla y tickets de soporte son procesos distintos o unificables; (2) el vínculo del historial operativo con usuario, validación y solicitud de cambio; (3) si las notificaciones serán persistentes o derivadas de eventos; (4) el detalle final de atributos y claves; (5) cardinalidades mínimas y máximas de cada flujo. Las historias no justifican asumir un servicio de notificaciones, motor de reconocimiento LSC o almacenamiento persistente ya implementados.
