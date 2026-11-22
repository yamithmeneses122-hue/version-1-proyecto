-- ============================================================
-- SIGNA-TECH-APP
-- BASE DE DATOS PRINCIPAL
-- BLOQUE 1 + BLOQUE 2
-- ESTRUCTURA FISICA + DATOS DE PRUEBA
-- MySQL 8.0+
-- ============================================================


-- ============================================================
-- 1. CREAR BASE DE DATOS
-- ============================================================

DROP DATABASE IF EXISTS SignaTechApp;

CREATE DATABASE SignaTechApp
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE SignaTechApp;


-- ============================================================
-- 2. TABLA: TblRol
-- ============================================================

CREATE TABLE TblRol (

    RolIdRol INT UNSIGNED AUTO_INCREMENT,

    RolNombre VARCHAR(50) NOT NULL,

    RolDescripcion VARCHAR(255),

    RolEstado ENUM('ACTIVO', 'INACTIVO')
        NOT NULL DEFAULT 'ACTIVO',

    PRIMARY KEY (RolIdRol),

    CONSTRAINT UQ_TblRol_RolNombre
        UNIQUE (RolNombre)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 3. TABLA: TblUsuario
-- ============================================================

CREATE TABLE TblUsuario (

    UsuIdUsuario INT UNSIGNED AUTO_INCREMENT,

    UsuNombreCompleto VARCHAR(150) NOT NULL,

    UsuCorreo VARCHAR(120) NOT NULL,

    UsuContrasenaHash VARCHAR(255) NOT NULL,

    UsuEstado ENUM(
        'ACTIVO',
        'INACTIVO',
        'BLOQUEADO'
    ) NOT NULL DEFAULT 'ACTIVO',

    UsuFechaRegistro DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    RolIdRol INT UNSIGNED NOT NULL,

    PRIMARY KEY (UsuIdUsuario),

    CONSTRAINT UQ_TblUsuario_UsuCorreo
        UNIQUE (UsuCorreo),

    CONSTRAINT FK_TblUsuario_TblRol
        FOREIGN KEY (RolIdRol)
        REFERENCES TblRol(RolIdRol)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX IDX_TblUsuario_RolIdRol (RolIdRol),
    INDEX IDX_TblUsuario_Estado (UsuEstado)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 4. TABLA: TblPermiso
-- ============================================================

CREATE TABLE TblPermiso (

    PerIdPermiso INT UNSIGNED AUTO_INCREMENT,

    PerNombre VARCHAR(100) NOT NULL,

    PerDescripcion VARCHAR(255),

    PerEstado ENUM('ACTIVO', 'INACTIVO')
        NOT NULL DEFAULT 'ACTIVO',

    PRIMARY KEY (PerIdPermiso),

    CONSTRAINT UQ_TblPermiso_PerNombre
        UNIQUE (PerNombre)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 5. TABLA: TblRelRolPermiso
-- ============================================================

CREATE TABLE TblRelRolPermiso (

    RrpIdRelacion INT UNSIGNED AUTO_INCREMENT,

    RolIdRol INT UNSIGNED NOT NULL,

    PerIdPermiso INT UNSIGNED NOT NULL,

    PRIMARY KEY (RrpIdRelacion),

    CONSTRAINT UQ_TblRelRolPermiso
        UNIQUE (RolIdRol, PerIdPermiso),

    CONSTRAINT FK_TblRelRolPermiso_Rol
        FOREIGN KEY (RolIdRol)
        REFERENCES TblRol(RolIdRol)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT FK_TblRelRolPermiso_Permiso
        FOREIGN KEY (PerIdPermiso)
        REFERENCES TblPermiso(PerIdPermiso)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblRelRolPermiso_Rol (RolIdRol),
    INDEX IDX_TblRelRolPermiso_Permiso (PerIdPermiso)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 6. TABLA: TblSesion
-- ============================================================

CREATE TABLE TblSesion (

    SesIdSesion INT UNSIGNED AUTO_INCREMENT,

    SesFechaInicio DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    SesFechaFin DATETIME NULL,

    SesDireccionIP VARCHAR(45),

    SesTokenJWT VARCHAR(500),

    SesEstado ENUM(
        'ACTIVA',
        'CERRADA',
        'EXPIRADA'
    ) NOT NULL DEFAULT 'ACTIVA',

    UsuIdUsuario INT UNSIGNED NOT NULL,

    PRIMARY KEY (SesIdSesion),

    CONSTRAINT FK_TblSesion_TblUsuario
        FOREIGN KEY (UsuIdUsuario)
        REFERENCES TblUsuario(UsuIdUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblSesion_Usuario (UsuIdUsuario),
    INDEX IDX_TblSesion_Estado (SesEstado)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 7. TABLA: TblHistorialAuditoria
-- ============================================================

CREATE TABLE TblHistorialAuditoria (

    AudIdAuditoria INT UNSIGNED AUTO_INCREMENT,

    AudAccion VARCHAR(100) NOT NULL,

    AudDescripcion TEXT,

    AudFecha DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    AudDireccionIP VARCHAR(45),

    UsuIdUsuario INT UNSIGNED NOT NULL,

    PRIMARY KEY (AudIdAuditoria),

    CONSTRAINT FK_TblHistorialAuditoria_TblUsuario
        FOREIGN KEY (UsuIdUsuario)
        REFERENCES TblUsuario(UsuIdUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblHistorialAuditoria_Usuario (UsuIdUsuario),
    INDEX IDX_TblHistorialAuditoria_Fecha (AudFecha)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 8. TABLA: TblDiccionarioSena
-- ============================================================

CREATE TABLE TblDiccionarioSena (

    SenIdSena INT UNSIGNED AUTO_INCREMENT,

    SenNombre VARCHAR(100) NOT NULL,

    SenDescripcion TEXT,

    SenCategoria VARCHAR(100),

    SenArchivoMultimedia VARCHAR(255),

    SenEstadoValidacion ENUM(
        'PENDIENTE',
        'APROBADA',
        'RECHAZADA'
    ) NOT NULL DEFAULT 'PENDIENTE',

    SenFechaRegistro DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (SenIdSena),

    CONSTRAINT UQ_TblDiccionarioSena_Nombre
        UNIQUE (SenNombre),

    INDEX IDX_TblDiccionarioSena_Estado
        (SenEstadoValidacion),

    INDEX IDX_TblDiccionarioSena_Categoria
        (SenCategoria)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 9. TABLA: TblValidacionSena
-- ============================================================

CREATE TABLE TblValidacionSena (

    ValIdValidacion INT UNSIGNED AUTO_INCREMENT,

    ValObservaciones TEXT,

    ValResultado ENUM(
        'APROBADA',
        'RECHAZADA'
    ) NOT NULL,

    ValFecha DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    SenIdSena INT UNSIGNED NOT NULL,

    UsuIdUsuario INT UNSIGNED NOT NULL,

    PRIMARY KEY (ValIdValidacion),

    CONSTRAINT FK_TblValidacionSena_Sena
        FOREIGN KEY (SenIdSena)
        REFERENCES TblDiccionarioSena(SenIdSena)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT FK_TblValidacionSena_Usuario
        FOREIGN KEY (UsuIdUsuario)
        REFERENCES TblUsuario(UsuIdUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblValidacionSena_Sena (SenIdSena),
    INDEX IDX_TblValidacionSena_Usuario (UsuIdUsuario)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 10. TABLA: TblTraduccionVoz
-- ============================================================

CREATE TABLE TblTraduccionVoz (

    VozIdTraduccion INT UNSIGNED AUTO_INCREMENT,

    VozAudioOriginal VARCHAR(255),

    VozTextoGenerado TEXT,

    VozTiempoRespuesta DECIMAL(8,2),

    VozEstadoProcesamiento ENUM(
        'PENDIENTE',
        'PROCESADA',
        'ERROR'
    ) NOT NULL DEFAULT 'PENDIENTE',

    VozFecha DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UsuIdUsuario INT UNSIGNED NOT NULL,

    PRIMARY KEY (VozIdTraduccion),

    CONSTRAINT FK_TblTraduccionVoz_Usuario
        FOREIGN KEY (UsuIdUsuario)
        REFERENCES TblUsuario(UsuIdUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblTraduccionVoz_Usuario
        (UsuIdUsuario),

    INDEX IDX_TblTraduccionVoz_Fecha
        (VozFecha),

    INDEX IDX_TblTraduccionVoz_Estado
        (VozEstadoProcesamiento)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 11. TABLA: TblTraduccionSenas
-- ============================================================

CREATE TABLE TblTraduccionSenas (

    TraIdTraduccion INT UNSIGNED AUTO_INCREMENT,

    TraTextoGenerado TEXT,

    TraConfianzaModelo DECIMAL(5,2),

    TraTiempoRespuesta DECIMAL(8,2),

    TraEstadoProcesamiento ENUM(
        'PENDIENTE',
        'PROCESADA',
        'ERROR'
    ) NOT NULL DEFAULT 'PENDIENTE',

    TraFecha DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UsuIdUsuario INT UNSIGNED NOT NULL,

    SenIdSena INT UNSIGNED NOT NULL,

    PRIMARY KEY (TraIdTraduccion),

    CONSTRAINT CK_TblTraduccionSenas_Confianza
        CHECK (
            TraConfianzaModelo IS NULL
            OR (
                TraConfianzaModelo >= 0
                AND TraConfianzaModelo <= 100
            )
        ),

    CONSTRAINT FK_TblTraduccionSenas_Usuario
        FOREIGN KEY (UsuIdUsuario)
        REFERENCES TblUsuario(UsuIdUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT FK_TblTraduccionSenas_Sena
        FOREIGN KEY (SenIdSena)
        REFERENCES TblDiccionarioSena(SenIdSena)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX IDX_TblTraduccionSenas_Usuario
        (UsuIdUsuario),

    INDEX IDX_TblTraduccionSenas_Sena
        (SenIdSena),

    INDEX IDX_TblTraduccionSenas_Fecha
        (TraFecha),

    INDEX IDX_TblTraduccionSenas_Estado
        (TraEstadoProcesamiento)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 12. TABLA: TblCapturaCamara
-- ============================================================

CREATE TABLE TblCapturaCamara (

    CapIdCaptura INT UNSIGNED AUTO_INCREMENT,

    CapCalidadImagen ENUM(
        'BUENA',
        'REGULAR',
        'MALA'
    ),

    CapIluminacionDetectada ENUM(
        'BUENA',
        'REGULAR',
        'BAJA'
    ),

    CapEstadoCaptura ENUM(
        'CORRECTA',
        'CAMARA_BLOQUEADA',
        'SIN_IMAGEN',
        'MANOS_FUERA',
        'IMAGEN_BORROSA'
    ) NOT NULL,

    CapFecha DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    TraIdTraduccion INT UNSIGNED NOT NULL,

    PRIMARY KEY (CapIdCaptura),

    CONSTRAINT FK_TblCapturaCamara_Traduccion
        FOREIGN KEY (TraIdTraduccion)
        REFERENCES TblTraduccionSenas(TraIdTraduccion)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblCapturaCamara_Traduccion
        (TraIdTraduccion),

    INDEX IDX_TblCapturaCamara_Estado
        (CapEstadoCaptura)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 13. TABLA: TblRetroalimentacion
-- ============================================================

CREATE TABLE TblRetroalimentacion (

    RetIdRetroalimentacion INT UNSIGNED AUTO_INCREMENT,

    RetCorreccion TEXT,

    RetObservacion TEXT,

    RetFecha DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UsuIdUsuario INT UNSIGNED NOT NULL,

    TraIdTraduccion INT UNSIGNED NOT NULL,

    PRIMARY KEY (RetIdRetroalimentacion),

    CONSTRAINT FK_TblRetroalimentacion_Usuario
        FOREIGN KEY (UsuIdUsuario)
        REFERENCES TblUsuario(UsuIdUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT FK_TblRetroalimentacion_Traduccion
        FOREIGN KEY (TraIdTraduccion)
        REFERENCES TblTraduccionSenas(TraIdTraduccion)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblRetroalimentacion_Usuario
        (UsuIdUsuario),

    INDEX IDX_TblRetroalimentacion_Traduccion
        (TraIdTraduccion)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 14. TABLA: TblDatasetIA
-- ============================================================

CREATE TABLE TblDatasetIA (

    DatIdDataset INT UNSIGNED AUTO_INCREMENT,

    DatNombre VARCHAR(150) NOT NULL,

    DatDescripcion TEXT,

    DatRuta VARCHAR(255),

    DatCantidadRegistros INT UNSIGNED
        NOT NULL DEFAULT 0,

    DatEstado ENUM(
        'ACTIVO',
        'INACTIVO'
    ) NOT NULL DEFAULT 'ACTIVO',

    DatFechaRegistro DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    SenIdSena INT UNSIGNED NULL,

    PRIMARY KEY (DatIdDataset),

    CONSTRAINT UQ_TblDatasetIA_Nombre
        UNIQUE (DatNombre),

    CONSTRAINT FK_TblDatasetIA_Sena
        FOREIGN KEY (SenIdSena)
        REFERENCES TblDiccionarioSena(SenIdSena)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    INDEX IDX_TblDatasetIA_Sena (SenIdSena),
    INDEX IDX_TblDatasetIA_Estado (DatEstado)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 15. TABLA: TblModeloIA
-- ============================================================

CREATE TABLE TblModeloIA (

    ModIdModelo INT UNSIGNED AUTO_INCREMENT,

    ModNombre VARCHAR(150) NOT NULL,

    ModVersion VARCHAR(50) NOT NULL,

    ModDescripcion TEXT,

    ModPrecision DECIMAL(5,2),

    ModEstado ENUM(
        'ENTRENAMIENTO',
        'ACTIVO',
        'INACTIVO',
        'DEPRECADO'
    ) NOT NULL DEFAULT 'ENTRENAMIENTO',

    ModFechaEntrenamiento DATETIME,

    PRIMARY KEY (ModIdModelo),

    CONSTRAINT UQ_TblModeloIA_NombreVersion
        UNIQUE (ModNombre, ModVersion),

    CONSTRAINT CK_TblModeloIA_Precision
        CHECK (
            ModPrecision IS NULL
            OR (
                ModPrecision >= 0
                AND ModPrecision <= 100
            )
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 16. TABLA: TblRelDatasetModelo
-- ============================================================

CREATE TABLE TblRelDatasetModelo (

    RdmIdRelacion INT UNSIGNED AUTO_INCREMENT,

    DatIdDataset INT UNSIGNED NOT NULL,

    ModIdModelo INT UNSIGNED NOT NULL,

    RdmFechaUso DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (RdmIdRelacion),

    CONSTRAINT UQ_TblRelDatasetModelo
        UNIQUE (DatIdDataset, ModIdModelo),

    CONSTRAINT FK_TblRelDatasetModelo_Dataset
        FOREIGN KEY (DatIdDataset)
        REFERENCES TblDatasetIA(DatIdDataset)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT FK_TblRelDatasetModelo_Modelo
        FOREIGN KEY (ModIdModelo)
        REFERENCES TblModeloIA(ModIdModelo)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblRelDatasetModelo_Dataset
        (DatIdDataset),

    INDEX IDX_TblRelDatasetModelo_Modelo
        (ModIdModelo)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 17. TABLA: TblReporteFalla
-- ============================================================

CREATE TABLE TblReporteFalla (

    RepIdReporte INT UNSIGNED AUTO_INCREMENT,

    RepTipoError VARCHAR(100) NOT NULL,

    RepDescripcion TEXT NOT NULL,

    RepEstado ENUM(
        'PENDIENTE',
        'EN_REVISION',
        'RESUELTO',
        'DESCARTADO'
    ) NOT NULL DEFAULT 'PENDIENTE',

    RepFecha DATETIME
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    RepFechaSolucion DATETIME NULL,

    UsuIdUsuario INT UNSIGNED NOT NULL,

    PRIMARY KEY (RepIdReporte),

    CONSTRAINT FK_TblReporteFalla_Usuario
        FOREIGN KEY (UsuIdUsuario)
        REFERENCES TblUsuario(UsuIdUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX IDX_TblReporteFalla_Usuario
        (UsuIdUsuario),

    INDEX IDX_TblReporteFalla_Estado
        (RepEstado),

    INDEX IDX_TblReporteFalla_Fecha
        (RepFecha)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

 
-- ============================================================
-- EXTENSION DEL MER VIGENTE: EPICAS 06, 07 Y 08
-- Entidades incorporadas desde el diagrama:
-- SOLICITUD_CAMBIO_SENA, RECURSO_MULTIMEDIA, VERSION_SENA,
-- HISTORIAL_OPERATIVO, SOLICITUD_SOPORTE, HISTORIAL_SOLICITUD
-- ============================================================

CREATE TABLE TblSolicitudCambioSena (
    ScsIdSolicitud INT UNSIGNED AUTO_INCREMENT,
    ScsTipoSolicitud VARCHAR(30) NOT NULL,
    ScsDescripcion TEXT NOT NULL,
    ScsEstado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    ScsFechaSolicitud DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ScsFechaDecision DATETIME NULL,
    SenIdSena INT UNSIGNED NOT NULL,
    UsuIdUsuario INT UNSIGNED NOT NULL,
    UsuIdRevisor INT UNSIGNED NULL,
    PRIMARY KEY (ScsIdSolicitud),
    CONSTRAINT CK_TblSolicitudCambioSena_Tipo CHECK (ScsTipoSolicitud IN ('CORRECCION','ACTUALIZACION','RETIRO')),
    CONSTRAINT CK_TblSolicitudCambioSena_Estado CHECK (ScsEstado IN ('PENDIENTE','EN_REVISION','APROBADA','RECHAZADA','CANCELADA')),
    CONSTRAINT FK_TblSolicitudCambioSena_Sena FOREIGN KEY (SenIdSena) REFERENCES TblDiccionarioSena(SenIdSena) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_TblSolicitudCambioSena_Solicitante FOREIGN KEY (UsuIdUsuario) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_TblSolicitudCambioSena_Revisor FOREIGN KEY (UsuIdRevisor) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX IDX_TblSolicitudCambioSena_Estado (ScsEstado),
    INDEX IDX_TblSolicitudCambioSena_Sena (SenIdSena)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE TblRecursoMultimedia (
    RecIdRecurso INT UNSIGNED AUTO_INCREMENT,
    RecTipo VARCHAR(30) NOT NULL,
    RecRuta VARCHAR(500) NOT NULL,
    RecFormato VARCHAR(20) NULL,
    RecDescripcion VARCHAR(255) NULL,
    RecFechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    RecEstado VARCHAR(15) NOT NULL DEFAULT 'ACTIVO',
    SenIdSena INT UNSIGNED NOT NULL,
    UsuIdUsuario INT UNSIGNED NOT NULL,
    PRIMARY KEY (RecIdRecurso),
    CONSTRAINT CK_TblRecursoMultimedia_Tipo CHECK (RecTipo IN ('IMAGEN','VIDEO','AUDIO','ANIMACION')),
    CONSTRAINT CK_TblRecursoMultimedia_Estado CHECK (RecEstado IN ('ACTIVO','INACTIVO')),
    CONSTRAINT FK_TblRecursoMultimedia_Sena FOREIGN KEY (SenIdSena) REFERENCES TblDiccionarioSena(SenIdSena) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_TblRecursoMultimedia_Usuario FOREIGN KEY (UsuIdUsuario) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX IDX_TblRecursoMultimedia_Sena (SenIdSena)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE TblVersionSena (
    VerIdVersion INT UNSIGNED AUTO_INCREMENT,
    VerNumero INT UNSIGNED NOT NULL,
    VerNombre VARCHAR(100) NOT NULL,
    VerDescripcion TEXT NULL,
    VerContenidoAnterior JSON NULL,
    VerContenidoNuevo JSON NULL,
    VerFechaVersion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    SenIdSena INT UNSIGNED NOT NULL,
    UsuIdUsuario INT UNSIGNED NOT NULL,
    ScsIdSolicitud INT UNSIGNED NULL,
    PRIMARY KEY (VerIdVersion),
    CONSTRAINT UQ_TblVersionSena_Numero UNIQUE (SenIdSena, VerNumero),
    CONSTRAINT FK_TblVersionSena_Sena FOREIGN KEY (SenIdSena) REFERENCES TblDiccionarioSena(SenIdSena) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_TblVersionSena_Usuario FOREIGN KEY (UsuIdUsuario) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_TblVersionSena_Solicitud FOREIGN KEY (ScsIdSolicitud) REFERENCES TblSolicitudCambioSena(ScsIdSolicitud) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX IDX_TblVersionSena_Fecha (VerFechaVersion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE TblHistorialOperativo (
    HopIdHistorial INT UNSIGNED AUTO_INCREMENT,
    HopAccion VARCHAR(100) NOT NULL,
    HopDescripcion TEXT NULL,
    HopEntidad VARCHAR(80) NOT NULL,
    HopIdRegistro BIGINT UNSIGNED NULL,
    HopFecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UsuIdUsuario INT UNSIGNED NOT NULL,
    PRIMARY KEY (HopIdHistorial),
    CONSTRAINT FK_TblHistorialOperativo_Usuario FOREIGN KEY (UsuIdUsuario) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX IDX_TblHistorialOperativo_UsuarioFecha (UsuIdUsuario, HopFecha),
    INDEX IDX_TblHistorialOperativo_EntidadRegistro (HopEntidad, HopIdRegistro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE TblSolicitudSoporte (
    SsoIdSolicitud INT UNSIGNED AUTO_INCREMENT,
    SsoAsunto VARCHAR(160) NOT NULL,
    SsoDescripcion TEXT NOT NULL,
    SsoCategoria VARCHAR(50) NOT NULL,
    SsoPrioridad VARCHAR(15) NOT NULL DEFAULT 'MEDIA',
    SsoEstado VARCHAR(20) NOT NULL DEFAULT 'ABIERTA',
    SsoFechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    SsoFechaCierre DATETIME NULL,
    UsuIdSolicitante INT UNSIGNED NOT NULL,
    UsuIdResponsable INT UNSIGNED NULL,
    PRIMARY KEY (SsoIdSolicitud),
    CONSTRAINT CK_TblSolicitudSoporte_Prioridad CHECK (SsoPrioridad IN ('BAJA','MEDIA','ALTA','CRITICA')),
    CONSTRAINT CK_TblSolicitudSoporte_Estado CHECK (SsoEstado IN ('ABIERTA','ASIGNADA','EN_PROCESO','RESUELTA','CERRADA')),
    CONSTRAINT FK_TblSolicitudSoporte_Solicitante FOREIGN KEY (UsuIdSolicitante) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_TblSolicitudSoporte_Responsable FOREIGN KEY (UsuIdResponsable) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX IDX_TblSolicitudSoporte_EstadoPrioridad (SsoEstado, SsoPrioridad),
    INDEX IDX_TblSolicitudSoporte_Solicitante (UsuIdSolicitante)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE TblHistorialSolicitud (
    HsoIdHistorial INT UNSIGNED AUTO_INCREMENT,
    HsoEstadoAnterior VARCHAR(20) NULL,
    HsoEstadoNuevo VARCHAR(20) NOT NULL,
    HsoComentario TEXT NULL,
    HsoFecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    SsoIdSolicitud INT UNSIGNED NOT NULL,
    UsuIdUsuario INT UNSIGNED NOT NULL,
    PRIMARY KEY (HsoIdHistorial),
    CONSTRAINT FK_TblHistorialSolicitud_Solicitud FOREIGN KEY (SsoIdSolicitud) REFERENCES TblSolicitudSoporte(SsoIdSolicitud) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_TblHistorialSolicitud_Usuario FOREIGN KEY (UsuIdUsuario) REFERENCES TblUsuario(UsuIdUsuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX IDX_TblHistorialSolicitud_SolicitudFecha (SsoIdSolicitud, HsoFecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
