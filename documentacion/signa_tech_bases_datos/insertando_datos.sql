INSERT INTO TblRol
(
    RolNombre,
    RolDescripcion,
    RolEstado
)
VALUES
('ADMINISTRADOR', 'Gestion general del sistema', 'ACTIVO'),
('INTERPRETE', 'Valida y corrige señas', 'ACTIVO'),
('OPERADOR_DISCAPACIDAD', 'Usuario operador con dificultad de comunicacion', 'ACTIVO'),
('OPERADOR_OYENTE', 'Usuario operador oyente', 'ACTIVO'),
('SUPERVISOR', 'Supervision del sistema', 'ACTIVO'),
('ANALISTA', 'Analisis de informacion', 'ACTIVO'),
('DESARROLLADOR', 'Gestion tecnica del sistema', 'ACTIVO'),
('INVESTIGADOR', 'Investigacion sobre IA y LSC', 'ACTIVO'),
('DOCENTE', 'Apoyo educativo', 'ACTIVO'),
('COORDINADOR', 'Coordinacion del proyecto', 'ACTIVO'),
('EVALUADOR', 'Evaluacion del sistema', 'ACTIVO'),
('TECNICO', 'Soporte tecnico', 'ACTIVO'),
('AUDITOR', 'Revision de auditoria', 'ACTIVO'),
('GESTOR', 'Gestion de contenidos', 'ACTIVO'),
('ENTRENADOR_IA', 'Entrenamiento de modelos de IA', 'ACTIVO'),
('MODERADOR', 'Moderacion de contenido', 'ACTIVO'),
('ASISTENTE', 'Asistencia operativa', 'ACTIVO'),
('CONSULTOR', 'Consultoria del proyecto', 'ACTIVO'),
('INVITADO', 'Acceso limitado', 'ACTIVO'),
('PRUEBAS', 'Usuario destinado a pruebas', 'ACTIVO');


-- ============================================================
-- PERMISOS
-- ============================================================

INSERT INTO TblPermiso
(
    PerNombre,
    PerDescripcion,
    PerEstado
)
VALUES
('GESTIONAR_USUARIOS', 'Crear, activar, bloquear y administrar usuarios', 'ACTIVO'),
('GESTIONAR_ROLES', 'Administrar roles', 'ACTIVO'),
('GESTIONAR_PERMISOS', 'Administrar permisos', 'ACTIVO'),
('CONSULTAR_AUDITORIA', 'Consultar historial de auditoria', 'ACTIVO'),
('VALIDAR_SENAS', 'Validar señas del diccionario', 'ACTIVO'),
('CORREGIR_SENAS', 'Corregir traducciones de señas', 'ACTIVO'),
('CONSULTAR_HISTORIAL', 'Consultar historial de traducciones', 'ACTIVO'),
('REALIZAR_TRADUCCION_VOZ', 'Realizar traducciones de voz', 'ACTIVO'),
('REALIZAR_TRADUCCION_SENA', 'Realizar reconocimiento de señas', 'ACTIVO'),
('USAR_CAMARA', 'Utilizar la camara', 'ACTIVO'),
('REGISTRAR_RETROALIMENTACION', 'Registrar retroalimentacion', 'ACTIVO'),
('REPORTAR_FALLAS', 'Reportar fallas del sistema', 'ACTIVO'),
('CONSULTAR_DICCIONARIO', 'Consultar diccionario de señas', 'ACTIVO'),
('GESTIONAR_DICCIONARIO', 'Administrar diccionario', 'ACTIVO'),
('GESTIONAR_DATASETS', 'Administrar datasets', 'ACTIVO'),
('GESTIONAR_MODELOS_IA', 'Administrar modelos de IA', 'ACTIVO'),
('CONSULTAR_ESTADISTICAS', 'Consultar estadisticas', 'ACTIVO'),
('GESTIONAR_SESIONES', 'Administrar sesiones', 'ACTIVO'),
('CONSULTAR_REPORTES', 'Consultar reportes de fallas', 'ACTIVO'),
('GESTIONAR_SISTEMA', 'Administrar configuracion general', 'ACTIVO');


-- ============================================================
-- USUARIOS
-- ============================================================

INSERT INTO TblUsuario
(
    UsuNombreCompleto,
    UsuCorreo,
    UsuContrasenaHash,
    UsuEstado,
    RolIdRol
)
VALUES
('Administrador Principal', 'admin@signatech.com', '$2b$12$HashPrueba001', 'ACTIVO', 1),
('Interprete Principal', 'interprete@signatech.com', '$2b$12$HashPrueba002', 'ACTIVO', 2),
('Operador Discapacidad 01', 'operador1@signatech.com', '$2b$12$HashPrueba003', 'ACTIVO', 3),
('Operador Oyente 01', 'oyente1@signatech.com', '$2b$12$HashPrueba004', 'ACTIVO', 4),
('Supervisor General', 'supervisor@signatech.com', '$2b$12$HashPrueba005', 'ACTIVO', 5),
('Analista Sistema', 'analista@signatech.com', '$2b$12$HashPrueba006', 'ACTIVO', 6),
('Desarrollador', 'desarrollador@signatech.com', '$2b$12$HashPrueba007', 'ACTIVO', 7),
('Investigador IA', 'investigador@signatech.com', '$2b$12$HashPrueba008', 'ACTIVO', 8),
('Docente CTPI', 'docente@signatech.com', '$2b$12$HashPrueba009', 'ACTIVO', 9),
('Coordinador Proyecto', 'coordinador@signatech.com', '$2b$12$HashPrueba010', 'ACTIVO', 10),
('Evaluador', 'evaluador@signatech.com', '$2b$12$HashPrueba011', 'ACTIVO', 11),
('Tecnico', 'tecnico@signatech.com', '$2b$12$HashPrueba012', 'ACTIVO', 12),
('Auditor', 'auditor@signatech.com', '$2b$12$HashPrueba013', 'ACTIVO', 13),
('Gestor Contenido', 'gestor@signatech.com', '$2b$12$HashPrueba014', 'ACTIVO', 14),
('Entrenador IA', 'entrenador@signatech.com', '$2b$12$HashPrueba015', 'ACTIVO', 15),
('Moderador', 'moderador@signatech.com', '$2b$12$HashPrueba016', 'ACTIVO', 16),
('Asistente', 'asistente@signatech.com', '$2b$12$HashPrueba017', 'ACTIVO', 17),
('Consultor', 'consultor@signatech.com', '$2b$12$HashPrueba018', 'ACTIVO', 18),
('Invitado', 'invitado@signatech.com', '$2b$12$HashPrueba019', 'ACTIVO', 19),
('Usuario Pruebas', 'pruebas@signatech.com', '$2b$12$HashPrueba020', 'ACTIVO', 20);


-- ============================================================
-- RELACION ROL - PERMISO
-- ============================================================

INSERT INTO TblRelRolPermiso
(
    RolIdRol,
    PerIdPermiso
)
VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,13),
(1,14),
(1,15),
(1,16),
(1,17),
(1,18),
(1,19),
(1,20),

(2,5),
(2,6),
(2,7),
(2,13),
(2,17),

(3,7),
(3,8),
(3,9),
(3,10),
(3,11),
(3,12),
(3,13),

(4,7),
(4,8),
(4,9),
(4,10),
(4,11),
(4,12),
(4,13);


-- ============================================================
-- DICCIONARIO DE SEÑAS
-- ============================================================

INSERT INTO TblDiccionarioSena
(
    SenNombre,
    SenDescripcion,
    SenCategoria,
    SenArchivoMultimedia,
    SenEstadoValidacion
)
VALUES
('HOLA', 'Saludo basico', 'SALUDOS', 'hola.mp4', 'APROBADA'),
('ADIOS', 'Despedida basica', 'SALUDOS', 'adios.mp4', 'APROBADA'),
('GRACIAS', 'Expresion de agradecimiento', 'CORTESIA', 'gracias.mp4', 'APROBADA'),
('POR_FAVOR', 'Expresion de cortesia', 'CORTESIA', 'por_favor.mp4', 'APROBADA'),
('SI', 'Respuesta afirmativa', 'RESPUESTAS', 'si.mp4', 'APROBADA'),
('NO', 'Respuesta negativa', 'RESPUESTAS', 'no.mp4', 'APROBADA'),
('BUENOS_DIAS', 'Saludo de la mañana', 'SALUDOS', 'buenos_dias.mp4', 'APROBADA'),
('BUENAS_TARDES', 'Saludo de la tarde', 'SALUDOS', 'buenas_tardes.mp4', 'APROBADA'),
('BUENAS_NOCHES', 'Saludo nocturno', 'SALUDOS', 'buenas_noches.mp4', 'APROBADA'),
('AYUDA', 'Solicitud de ayuda', 'NECESIDADES', 'ayuda.mp4', 'APROBADA'),
('AGUA', 'Referencia al agua', 'OBJETOS', 'agua.mp4', 'APROBADA'),
('COMER', 'Accion de comer', 'ACCIONES', 'comer.mp4', 'APROBADA'),
('BEBER', 'Accion de beber', 'ACCIONES', 'beber.mp4', 'APROBADA'),
('CASA', 'Referencia al hogar', 'LUGARES', 'casa.mp4', 'APROBADA'),
('ESCUELA', 'Referencia a institucion educativa', 'LUGARES', 'escuela.mp4', 'PENDIENTE'),
('TRABAJO', 'Referencia al trabajo', 'ACTIVIDADES', 'trabajo.mp4', 'PENDIENTE'),
('FAMILIA', 'Referencia a familia', 'PERSONAS', 'familia.mp4', 'PENDIENTE'),
('AMIGO', 'Referencia a amistad', 'PERSONAS', 'amigo.mp4', 'PENDIENTE'),
('PERDON', 'Expresion de disculpa', 'CORTESIA', 'perdon.mp4', 'PENDIENTE'),
('BIENVENIDO', 'Expresion de bienvenida', 'SALUDOS', 'bienvenido.mp4', 'PENDIENTE');


-- ============================================================
-- VALIDACIONES
-- ============================================================

INSERT INTO TblValidacionSena
(
    ValObservaciones,
    ValResultado,
    SenIdSena,
    UsuIdUsuario
)
VALUES
('Validacion correcta', 'APROBADA', 1, 2),
('Validacion correcta', 'APROBADA', 2, 2),
('Validacion correcta', 'APROBADA', 3, 2),
('Validacion correcta', 'APROBADA', 4, 2),
('Validacion correcta', 'APROBADA', 5, 2),
('Validacion correcta', 'APROBADA', 6, 2),
('Validacion correcta', 'APROBADA', 7, 2),
('Validacion correcta', 'APROBADA', 8, 2),
('Validacion correcta', 'APROBADA', 9, 2),
('Validacion correcta', 'APROBADA', 10, 2),
('Validacion correcta', 'APROBADA', 11, 2),
('Validacion correcta', 'APROBADA', 12, 2),
('Validacion correcta', 'APROBADA', 13, 2),
('Validacion correcta', 'APROBADA', 14, 2),
('Pendiente de revision', 'RECHAZADA', 15, 2),
('Pendiente de revision', 'RECHAZADA', 16, 2),
('Pendiente de revision', 'RECHAZADA', 17, 2),
('Pendiente de revision', 'RECHAZADA', 18, 2),
('Pendiente de revision', 'RECHAZADA', 19, 2),
('Pendiente de revision', 'RECHAZADA', 20, 2);


-- ============================================================
-- TRADUCCIONES DE VOZ
-- ============================================================

INSERT INTO TblTraduccionVoz
(
    VozAudioOriginal,
    VozTextoGenerado,
    VozTiempoRespuesta,
    VozEstadoProcesamiento,
    UsuIdUsuario
)
VALUES
('audio001.wav', 'Hola', 1.20, 'PROCESADA', 3),
('audio002.wav', 'Gracias', 1.10, 'PROCESADA', 4),
('audio003.wav', 'Buenos dias', 1.35, 'PROCESADA', 3),
('audio004.wav', 'Necesito ayuda', 1.50, 'PROCESADA', 4),
('audio005.wav', 'Por favor', 1.00, 'PROCESADA', 3),
('audio006.wav', 'Adios', 1.10, 'PROCESADA', 4),
('audio007.wav', 'Si', 0.90, 'PROCESADA', 3),
('audio008.wav', 'No', 0.95, 'PROCESADA', 4),
('audio009.wav', 'Buenas tardes', 1.40, 'PROCESADA', 3),
('audio010.wav', 'Buenas noches', 1.30, 'PROCESADA', 4),
('audio011.wav', 'Quiero agua', 1.60, 'PROCESADA', 3),
('audio012.wav', 'Quiero comer', 1.55, 'PROCESADA', 4),
('audio013.wav', 'Necesito ir a casa', 1.80, 'PROCESADA', 3),
('audio014.wav', 'Gracias por ayudarme', 1.90, 'PROCESADA', 4),
('audio015.wav', 'Hola amigo', 1.20, 'PROCESADA', 3),
('audio016.wav', 'Necesito ayuda', 1.45, 'PROCESADA', 4),
('audio017.wav', 'Por favor espere', 1.70, 'PROCESADA', 3),
('audio018.wav', 'Adios amigo', 1.25, 'PROCESADA', 4),
('audio019.wav', 'Buenos dias', 1.30, 'PROCESADA', 3),
('audio020.wav', 'Gracias', 1.00, 'PROCESADA', 4);


-- ============================================================
-- TRADUCCIONES DE SEÑAS
-- ============================================================

INSERT INTO TblTraduccionSenas
(
    TraTextoGenerado,
    TraConfianzaModelo,
    TraTiempoRespuesta,
    TraEstadoProcesamiento,
    UsuIdUsuario,
    SenIdSena
)
VALUES
('Hola', 98.50, 0.80, 'PROCESADA', 3, 1),
('Adios', 96.40, 0.85, 'PROCESADA', 3, 2),
('Gracias', 97.20, 0.82, 'PROCESADA', 4, 3),
('Por favor', 95.80, 0.90, 'PROCESADA', 4, 4),
('Si', 99.10, 0.70, 'PROCESADA', 3, 5),
('No', 98.00, 0.75, 'PROCESADA', 4, 6),
('Buenos dias', 96.70, 0.88, 'PROCESADA', 3, 7),
('Buenas tardes', 94.50, 0.95, 'PROCESADA', 4, 8),
('Buenas noches', 93.20, 0.98, 'PROCESADA', 3, 9),
('Ayuda', 91.50, 1.10, 'PROCESADA', 4, 10),
('Agua', 97.60, 0.80, 'PROCESADA', 3, 11),
('Comer', 95.90, 0.85, 'PROCESADA', 4, 12),
('Beber', 94.80, 0.90, 'PROCESADA', 3, 13),
('Casa', 92.40, 1.00, 'PROCESADA', 4, 14),
('Escuela', 89.50, 1.20, 'PROCESADA', 3, 15),
('Trabajo', 88.40, 1.30, 'PROCESADA', 4, 16),
('Familia', 90.10, 1.15, 'PROCESADA', 3, 17),
('Amigo', 91.20, 1.05, 'PROCESADA', 4, 18),
('Perdon', 87.50, 1.40, 'PROCESADA', 3, 19),
('Bienvenido', 86.90, 1.45, 'PROCESADA', 4, 20);


-- ============================================================
-- CAPTURAS DE CAMARA
-- ============================================================

INSERT INTO TblCapturaCamara
(
    CapCalidadImagen,
    CapIluminacionDetectada,
    CapEstadoCaptura,
    TraIdTraduccion
)
VALUES
('BUENA', 'BUENA', 'CORRECTA', 1),
('BUENA', 'BUENA', 'CORRECTA', 2),
('BUENA', 'BUENA', 'CORRECTA', 3),
('REGULAR', 'REGULAR', 'CORRECTA', 4),
('BUENA', 'BUENA', 'CORRECTA', 5),
('MALA', 'BAJA', 'IMAGEN_BORROSA', 6),
('BUENA', 'BUENA', 'CORRECTA', 7),
('REGULAR', 'REGULAR', 'CORRECTA', 8),
('BUENA', 'BUENA', 'CORRECTA', 9),
('MALA', 'BAJA', 'SIN_IMAGEN', 10),
('BUENA', 'BUENA', 'CORRECTA', 11),
('REGULAR', 'REGULAR', 'CORRECTA', 12),
('BUENA', 'BUENA', 'CORRECTA', 13),
('MALA', 'BAJA', 'MANOS_FUERA', 14),
('BUENA', 'REGULAR', 'CORRECTA', 15),
('MALA', 'BAJA', 'CAMARA_BLOQUEADA', 16),
('BUENA', 'BUENA', 'CORRECTA', 17),
('REGULAR', 'REGULAR', 'CORRECTA', 18),
('MALA', 'BAJA', 'IMAGEN_BORROSA', 19),
('BUENA', 'BUENA', 'CORRECTA', 20);


-- ============================================================
-- RETROALIMENTACION
-- ============================================================

INSERT INTO TblRetroalimentacion
(
    RetCorreccion,
    RetObservacion,
    UsuIdUsuario,
    TraIdTraduccion
)
VALUES
('Correcto', 'La traduccion fue adecuada', 2, 1),
('Correcto', 'Buena identificacion', 2, 2),
('Correcto', 'Resultado correcto', 2, 3),
('Mejorar posicion', 'La mano estaba ligeramente desplazada', 2, 4),
('Correcto', 'Buena señal', 2, 5),
('Revisar iluminacion', 'La imagen presentaba poca iluminacion', 2, 6),
('Correcto', 'Resultado adecuado', 2, 7),
('Mejorar captura', 'La calidad fue regular', 2, 8),
('Correcto', 'Resultado correcto', 2, 9),
('Revisar camara', 'No se obtuvo imagen suficiente', 2, 10),
('Correcto', 'Resultado adecuado', 2, 11),
('Correcto', 'Buena identificacion', 2, 12),
('Correcto', 'Resultado correcto', 2, 13),
('Repetir captura', 'Las manos salieron del area', 2, 14),
('Correcto', 'Resultado adecuado', 2, 15),
('Revisar camara', 'La camara estaba bloqueada', 2, 16),
('Correcto', 'Buena identificacion', 2, 17),
('Correcto', 'Resultado correcto', 2, 18),
('Repetir captura', 'La imagen estaba borrosa', 2, 19),
('Mejorar iluminacion', 'Se recomienda mayor iluminacion', 2, 20);


-- ============================================================
-- DATASETS
-- ============================================================

INSERT INTO TblDatasetIA
(
    DatNombre,
    DatDescripcion,
    DatRuta,
    DatCantidadRegistros,
    DatEstado,
    SenIdSena
)
VALUES
('Dataset LSC 001', 'Dataset para saludo hola', '/datasets/lsc001', 1000, 'ACTIVO', 1),
('Dataset LSC 002', 'Dataset para adios', '/datasets/lsc002', 950, 'ACTIVO', 2),
('Dataset LSC 003', 'Dataset para gracias', '/datasets/lsc003', 1200, 'ACTIVO', 3),
('Dataset LSC 004', 'Dataset para por favor', '/datasets/lsc004', 900, 'ACTIVO', 4),
('Dataset LSC 005', 'Dataset para si', '/datasets/lsc005', 1100, 'ACTIVO', 5),
('Dataset LSC 006', 'Dataset para no', '/datasets/lsc006', 1050, 'ACTIVO', 6),
('Dataset LSC 007', 'Dataset buenos dias', '/datasets/lsc007', 1300, 'ACTIVO', 7),
('Dataset LSC 008', 'Dataset buenas tardes', '/datasets/lsc008', 1150, 'ACTIVO', 8),
('Dataset LSC 009', 'Dataset buenas noches', '/datasets/lsc009', 1000, 'ACTIVO', 9),
('Dataset LSC 010', 'Dataset ayuda', '/datasets/lsc010', 1400, 'ACTIVO', 10),
('Dataset LSC 011', 'Dataset agua', '/datasets/lsc011', 950, 'ACTIVO', 11),
('Dataset LSC 012', 'Dataset comer', '/datasets/lsc012', 1250, 'ACTIVO', 12),
('Dataset LSC 013', 'Dataset beber', '/datasets/lsc013', 900, 'ACTIVO', 13),
('Dataset LSC 014', 'Dataset casa', '/datasets/lsc014', 1000, 'ACTIVO', 14),
('Dataset LSC 015', 'Dataset escuela', '/datasets/lsc015', 800, 'ACTIVO', 15),
('Dataset LSC 016', 'Dataset trabajo', '/datasets/lsc016', 850, 'ACTIVO', 16),
('Dataset LSC 017', 'Dataset familia', '/datasets/lsc017', 900, 'ACTIVO', 17),
('Dataset LSC 018', 'Dataset amigo', '/datasets/lsc018', 950, 'ACTIVO', 18),
('Dataset LSC 019', 'Dataset perdon', '/datasets/lsc019', 700, 'ACTIVO', 19),
('Dataset LSC 020', 'Dataset bienvenido', '/datasets/lsc020', 750, 'ACTIVO', 20);


-- ============================================================
-- MODELOS IA
-- ============================================================

INSERT INTO TblModeloIA
(
    ModNombre,
    ModVersion,
    ModDescripcion,
    ModPrecision,
    ModEstado,
    ModFechaEntrenamiento
)
VALUES
('ModeloLSC', '1.0', 'Modelo inicial de reconocimiento', 88.50, 'ACTIVO', '2026-01-10 10:00:00'),
('ModeloLSC', '1.1', 'Modelo mejorado', 89.40, 'ACTIVO', '2026-02-10 10:00:00'),
('ModeloLSC', '1.2', 'Modelo optimizado', 90.20, 'ACTIVO', '2026-03-10 10:00:00'),
('ModeloLSC', '1.3', 'Modelo con mayor dataset', 91.10, 'ACTIVO', '2026-04-10 10:00:00'),
('ModeloLSC', '1.4', 'Modelo actualizado', 91.80, 'ACTIVO', '2026-05-10 10:00:00'),
('ModeloLSC', '1.5', 'Modelo experimental', 92.30, 'ACTIVO', '2026-06-10 10:00:00'),
('ModeloLSC', '1.6', 'Modelo experimental 2', 92.90, 'ACTIVO', '2026-07-10 10:00:00'),
('ModeloLSC', '1.7', 'Modelo actualizado', 93.20, 'ACTIVO', '2026-08-10 10:00:00'),
('ModeloLSC', '1.8', 'Modelo optimizado', 93.70, 'ACTIVO', '2026-08-20 10:00:00'),
('ModeloLSC', '1.9', 'Modelo mejorado', 94.10, 'ACTIVO', '2026-08-30 10:00:00'),
('ModeloLSC', '2.0', 'Segunda generacion', 94.50, 'ACTIVO', '2026-09-01 10:00:00'),
('ModeloLSC', '2.1', 'Modelo mejorado', 94.90, 'ACTIVO', '2026-09-05 10:00:00'),
('ModeloLSC', '2.2', 'Modelo optimizado', 95.10, 'ACTIVO', '2026-09-10 10:00:00'),
('ModeloLSC', '2.3', 'Modelo actualizado', 95.40, 'ACTIVO', '2026-09-15 10:00:00'),
('ModeloLSC', '2.4', 'Modelo experimental', 95.70, 'ACTIVO', '2026-09-20 10:00:00'),
('ModeloLSC', '2.5', 'Modelo mejorado', 96.00, 'ACTIVO', '2026-09-22 10:00:00'),
('ModeloLSC', '2.6', 'Modelo optimizado', 96.30, 'ACTIVO', '2026-09-24 10:00:00'),
('ModeloLSC', '2.7', 'Modelo actualizado', 96.50, 'ACTIVO', '2026-09-26 10:00:00'),
('ModeloLSC', '2.8', 'Modelo final de pruebas', 96.80, 'ACTIVO', '2026-09-28 10:00:00'),
('ModeloLSC', '3.0', 'Modelo candidato final', 97.00, 'ACTIVO', '2026-10-01 10:00:00');


-- ============================================================
-- RELACION DATASET - MODELO
-- ============================================================

INSERT INTO TblRelDatasetModelo
(
    DatIdDataset,
    ModIdModelo
)
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8),
(9,9),
(10,10),
(11,11),
(12,12),
(13,13),
(14,14),
(15,15),
(16,16),
(17,17),
(18,18),
(19,19),
(20,20);


-- ============================================================
-- REPORTES DE FALLA
-- ============================================================

INSERT INTO TblReporteFalla
(
    RepTipoError,
    RepDescripcion,
    RepEstado,
    UsuIdUsuario
)
VALUES
('BAJA_ILUMINACION', 'La iluminacion no permite reconocer correctamente la seña', 'PENDIENTE', 3),
('SIN_CAMARA', 'El sistema no detecta la camara', 'PENDIENTE', 4),
('CAMARA_BLOQUEADA', 'La camara se encuentra bloqueada', 'EN_REVISION', 3),
('MANOS_FUERA', 'Las manos estan fuera del area de captura', 'RESUELTO', 4),
('SEÑA_NO_RECONOCIDA', 'La seña no fue identificada', 'PENDIENTE', 3),
('VIDEO_BORROSO', 'La imagen presenta desenfoque', 'PENDIENTE', 4),
('ALTO_RUIDO', 'El nivel de ruido afecta el reconocimiento', 'EN_REVISION', 3),
('BAJA_CALIDAD', 'La calidad del video es insuficiente', 'PENDIENTE', 4),
('ERROR_MODELO', 'El modelo no genero una prediccion', 'PENDIENTE', 3),
('TIEMPO_RESPUESTA', 'El tiempo de respuesta fue alto', 'RESUELTO', 4),
('AUDIO_NO_DETECTADO', 'No se detecto audio', 'PENDIENTE', 3),
('TEXTO_INCORRECTO', 'La transcripcion generada fue incorrecta', 'PENDIENTE', 4),
('SEÑA_INCORRECTA', 'La traduccion de la seña fue incorrecta', 'EN_REVISION', 3),
('FALLA_LOGIN', 'No fue posible iniciar sesion', 'RESUELTO', 4),
('ERROR_SESION', 'La sesion fue cerrada inesperadamente', 'PENDIENTE', 3),
('ERROR_DICCIONARIO', 'No se encontro una seña', 'PENDIENTE', 4),
('ERROR_VALIDACION', 'No se pudo validar la seña', 'EN_REVISION', 3),
('ERROR_RETROALIMENTACION', 'No se pudo registrar retroalimentacion', 'PENDIENTE', 4),
('ERROR_DATASET', 'No se pudo cargar el dataset', 'PENDIENTE', 3),
('ERROR_MODELO_IA', 'Error durante la ejecucion del modelo', 'EN_REVISION', 4);


-- ============================================================
-- SESIONES
-- ============================================================

INSERT INTO TblSesion
(
    SesFechaInicio,
    SesFechaFin,
    SesDireccionIP,
    SesTokenJWT,
    SesEstado,
    UsuIdUsuario
)
VALUES
('2026-10-01 08:00:00', '2026-10-01 09:00:00', '192.168.1.101', 'TOKEN_PRUEBA_001', 'CERRADA', 1),
('2026-10-01 09:00:00', '2026-10-01 10:00:00', '192.168.1.102', 'TOKEN_PRUEBA_002', 'CERRADA', 2),
('2026-10-01 10:00:00', '2026-10-01 11:00:00', '192.168.1.103', 'TOKEN_PRUEBA_003', 'CERRADA', 3),
('2026-10-01 11:00:00', '2026-10-01 12:00:00', '192.168.1.104', 'TOKEN_PRUEBA_004', 'CERRADA', 4),
('2026-10-01 12:00:00', NULL, '192.168.1.105', 'TOKEN_PRUEBA_005', 'ACTIVA', 5),
('2026-10-01 13:00:00', '2026-10-01 14:00:00', '192.168.1.106', 'TOKEN_PRUEBA_006', 'CERRADA', 6),
('2026-10-01 14:00:00', '2026-10-01 15:00:00', '192.168.1.107', 'TOKEN_PRUEBA_007', 'CERRADA', 7),
('2026-10-01 15:00:00', '2026-10-01 16:00:00', '192.168.1.108', 'TOKEN_PRUEBA_008', 'CERRADA', 8),
('2026-10-01 16:00:00', '2026-10-01 17:00:00', '192.168.1.109', 'TOKEN_PRUEBA_009', 'CERRADA', 9),
('2026-10-01 17:00:00', '2026-10-01 18:00:00', '192.168.1.110', 'TOKEN_PRUEBA_010', 'CERRADA', 10),
('2026-10-02 08:00:00', '2026-10-02 09:00:00', '192.168.1.111', 'TOKEN_PRUEBA_011', 'CERRADA', 11),
('2026-10-02 09:00:00', '2026-10-02 10:00:00', '192.168.1.112', 'TOKEN_PRUEBA_012', 'CERRADA', 12),
('2026-10-02 10:00:00', '2026-10-02 11:00:00', '192.168.1.113', 'TOKEN_PRUEBA_013', 'CERRADA', 13),
('2026-10-02 11:00:00', '2026-10-02 12:00:00', '192.168.1.114', 'TOKEN_PRUEBA_014', 'CERRADA', 14),
('2026-10-02 12:00:00', '2026-10-02 13:00:00', '192.168.1.115', 'TOKEN_PRUEBA_015', 'CERRADA', 15),
('2026-10-02 13:00:00', '2026-10-02 14:00:00', '192.168.1.116', 'TOKEN_PRUEBA_016', 'CERRADA', 16),
('2026-10-02 14:00:00', '2026-10-02 15:00:00', '192.168.1.117', 'TOKEN_PRUEBA_017', 'CERRADA', 17),
('2026-10-02 15:00:00', '2026-10-02 16:00:00', '192.168.1.118', 'TOKEN_PRUEBA_018', 'CERRADA', 18),
('2026-10-02 16:00:00', '2026-10-02 17:00:00', '192.168.1.119', 'TOKEN_PRUEBA_019', 'CERRADA', 19),
('2026-10-02 17:00:00', '2026-10-02 18:00:00', '192.168.1.120', 'TOKEN_PRUEBA_020', 'CERRADA', 20);


-- ============================================================
-- HISTORIAL DE AUDITORIA
-- ============================================================

INSERT INTO TblHistorialAuditoria
(
    AudAccion,
    AudDescripcion,
    AudDireccionIP,
    UsuIdUsuario
)
VALUES
('LOGIN', 'Inicio de sesion', '192.168.1.101', 1),
('LOGIN', 'Inicio de sesion', '192.168.1.102', 2),
('LOGIN', 'Inicio de sesion', '192.168.1.103', 3),
('LOGIN', 'Inicio de sesion', '192.168.1.104', 4),
('VALIDAR_SENA', 'Validacion de seña', '192.168.1.102', 2),
('VALIDAR_SENA', 'Validacion de seña', '192.168.1.102', 2),
('CONSULTAR_DICCIONARIO', 'Consulta de diccionario', '192.168.1.103', 3),
('TRADUCCION_VOZ', 'Traduccion de voz', '192.168.1.103', 3),
('TRADUCCION_SENA', 'Traduccion de seña', '192.168.1.103', 3),
('REPORTAR_FALLA', 'Reporte de falla', '192.168.1.103', 3),
('RETROALIMENTACION', 'Registro de retroalimentacion', '192.168.1.102', 2),
('CONSULTAR_HISTORIAL', 'Consulta del historial', '192.168.1.102', 2),
('GESTION_USUARIO', 'Actualizacion de usuario', '192.168.1.101', 1),
('GESTION_ROL', 'Gestion de rol', '192.168.1.101', 1),
('GESTION_PERMISO', 'Gestion de permiso', '192.168.1.101', 1),
('GESTION_DATASET', 'Gestion de dataset', '192.168.1.101', 1),
('GESTION_MODELO', 'Gestion de modelo IA', '192.168.1.101', 1),
('CAMBIO_ESTADO', 'Cambio de estado de usuario', '192.168.1.101', 1),
('CIERRE_SESION', 'Cierre de sesion', '192.168.1.102', 2),
('CONSULTA_ESTADISTICAS', 'Consulta de estadisticas', '192.168.1.101', 1);


-- ============================================================
-- VERIFICACION
-- ============================================================

SELECT 'TblRol' AS Tabla, COUNT(*) AS Registros FROM TblRol
UNION ALL
SELECT 'TblUsuario', COUNT(*) FROM TblUsuario
UNION ALL
SELECT 'TblPermiso', COUNT(*) FROM TblPermiso
UNION ALL
SELECT 'TblRelRolPermiso', COUNT(*) FROM TblRelRolPermiso
UNION ALL
SELECT 'TblSesion', COUNT(*) FROM TblSesion
UNION ALL
SELECT 'TblHistorialAuditoria', COUNT(*) FROM TblHistorialAuditoria
UNION ALL
SELECT 'TblDiccionarioSena', COUNT(*) FROM TblDiccionarioSena
UNION ALL
SELECT 'TblValidacionSena', COUNT(*) FROM TblValidacionSena
UNION ALL
SELECT 'TblTraduccionVoz', COUNT(*) FROM TblTraduccionVoz
UNION ALL
SELECT 'TblTraduccionSenas', COUNT(*) FROM TblTraduccionSenas
UNION ALL
SELECT 'TblCapturaCamara', COUNT(*) FROM TblCapturaCamara
UNION ALL
SELECT 'TblRetroalimentacion', COUNT(*) FROM TblRetroalimentacion
UNION ALL
SELECT 'TblDatasetIA', COUNT(*) FROM TblDatasetIA
UNION ALL
SELECT 'TblModeloIA', COUNT(*) FROM TblModeloIA
UNION ALL
SELECT 'TblRelDatasetModelo', COUNT(*) FROM TblRelDatasetModelo
UNION ALL
SELECT 'TblReporteFalla', COUNT(*) FROM TblReporteFalla;

-- ============================================================
-- DATOS DE PRUEBA: ENTIDADES ADICIONALES DEL MER
-- Requiere que existan los usuarios y señas de los bloques previos.
-- ============================================================

INSERT INTO TblSolicitudCambioSena
(ScsTipoSolicitud, ScsDescripcion, ScsEstado, SenIdSena, UsuIdUsuario, UsuIdRevisor)
VALUES
('CORRECCION','Ajustar la descripción y los parámetros de ejecución de la seña.', 'PENDIENTE', 1, 3, NULL),
('ACTUALIZACION','Actualizar el recurso audiovisual asociado a la seña.', 'EN_REVISION', 2, 3, 2),
('CORRECCION','Revisar la variante regional registrada.', 'APROBADA', 3, 4, 2);

INSERT INTO TblRecursoMultimedia
(RecTipo, RecRuta, RecFormato, RecDescripcion, SenIdSena, UsuIdUsuario)
VALUES
('VIDEO','/recursos/senas/hola.mp4','mp4','Demostración de la seña HOLA',1,2),
('VIDEO','/recursos/senas/adios.mp4','mp4','Demostración de la seña ADIOS',2,2),
('IMAGEN','/recursos/senas/gracias.png','png','Referencia visual de GRACIAS',3,2);

INSERT INTO TblVersionSena
(VerNumero, VerNombre, VerDescripcion, VerContenidoAnterior, VerContenidoNuevo, SenIdSena, UsuIdUsuario, ScsIdSolicitud)
VALUES
(1,'Versión inicial','Registro inicial de la seña',NULL,JSON_OBJECT('nombre','HOLA','estado','APROBADA'),1,2,NULL),
(1,'Versión inicial','Registro inicial de la seña',NULL,JSON_OBJECT('nombre','ADIOS','estado','APROBADA'),2,2,2),
(1,'Versión inicial','Registro inicial de la seña',NULL,JSON_OBJECT('nombre','GRACIAS','estado','APROBADA'),3,2,3);

INSERT INTO TblHistorialOperativo
(HopAccion, HopDescripcion, HopEntidad, HopIdRegistro, UsuIdUsuario)
VALUES
('VALIDACION_SENA','Se validó una seña del diccionario.','TblDiccionarioSena',1,2),
('ACTUALIZACION_RECURSO','Se registró un recurso multimedia.','TblRecursoMultimedia',1,2),
('CREACION_VERSION','Se creó la versión inicial de una seña.','TblVersionSena',1,2);

INSERT INTO TblSolicitudSoporte
(SsoAsunto, SsoDescripcion, SsoCategoria, SsoPrioridad, SsoEstado, UsuIdSolicitante, UsuIdResponsable)
VALUES
('Problema con la cámara','La cámara no se activa desde el módulo de interpretación.','TECNICO','ALTA','ABIERTA',3,NULL),
('Consulta de acceso','El usuario necesita asistencia para recuperar el acceso.','CUENTA','MEDIA','ASIGNADA',4,1),
('Error en traducción','La traducción generada no corresponde con la seña realizada.','TRADUCCION','ALTA','EN_PROCESO',3,2);

INSERT INTO TblHistorialSolicitud
(HsoEstadoAnterior, HsoEstadoNuevo, HsoComentario, SsoIdSolicitud, UsuIdUsuario)
VALUES
(NULL,'ABIERTA','Solicitud de soporte creada.',1,3),
(NULL,'ASIGNADA','Solicitud asignada al equipo responsable.',2,1),
(NULL,'EN_PROCESO','Se inició el análisis del problema.',3,2);
