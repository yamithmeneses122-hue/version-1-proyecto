-- ============================================================
-- PROCEDIMIENTO 1
-- REGISTRAR USUARIO
-- ============================================================

DROP PROCEDURE IF EXISTS SP_RegistrarUsuario;

DELIMITER $$

CREATE PROCEDURE SP_RegistrarUsuario(

    IN p_NombreCompleto VARCHAR(150),
    IN p_Correo VARCHAR(120),
    IN p_ContrasenaHash VARCHAR(255),
    IN p_RolIdRol INT UNSIGNED

)
BEGIN

    IF EXISTS (
        SELECT 1
        FROM TblUsuario
        WHERE UsuCorreo = p_Correo
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El correo ya esta registrado';

    END IF;


    IF NOT EXISTS (
        SELECT 1
        FROM TblRol
        WHERE RolIdRol = p_RolIdRol
          AND RolEstado = 'ACTIVO'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El rol no existe o esta inactivo';

    END IF;


    INSERT INTO TblUsuario
    (
        UsuNombreCompleto,
        UsuCorreo,
        UsuContrasenaHash,
        UsuEstado,
        RolIdRol
    )
    VALUES
    (
        p_NombreCompleto,
        p_Correo,
        p_ContrasenaHash,
        'ACTIVO',
        p_RolIdRol
    );

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 2
-- CAMBIAR ESTADO DEL USUARIO
-- ============================================================

DROP PROCEDURE IF EXISTS SP_CambiarEstadoUsuario;

DELIMITER $$

CREATE PROCEDURE SP_CambiarEstadoUsuario(

    IN p_UsuIdUsuario INT UNSIGNED,
    IN p_NuevoEstado VARCHAR(10)

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblUsuario
        WHERE UsuIdUsuario = p_UsuIdUsuario
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El usuario no existe';

    END IF;


    IF p_NuevoEstado NOT IN
    (
        'ACTIVO',
        'INACTIVO',
        'BLOQUEADO'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'Estado de usuario no valido';

    END IF;


    UPDATE TblUsuario

    SET UsuEstado = p_NuevoEstado

    WHERE UsuIdUsuario = p_UsuIdUsuario;

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 3
-- REGISTRAR TRADUCCION DE VOZ
-- ============================================================

DROP PROCEDURE IF EXISTS SP_RegistrarTraduccionVoz;

DELIMITER $$

CREATE PROCEDURE SP_RegistrarTraduccionVoz(

    IN p_AudioOriginal VARCHAR(255),
    IN p_TextoGenerado TEXT,
    IN p_TiempoRespuesta DECIMAL(8,2),
    IN p_UsuIdUsuario INT UNSIGNED

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblUsuario
        WHERE UsuIdUsuario = p_UsuIdUsuario
          AND UsuEstado = 'ACTIVO'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El usuario no existe o esta inactivo';

    END IF;


    IF p_TiempoRespuesta < 0 THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El tiempo de respuesta no puede ser negativo';

    END IF;


    INSERT INTO TblTraduccionVoz
    (
        VozAudioOriginal,
        VozTextoGenerado,
        VozTiempoRespuesta,
        VozEstadoProcesamiento,
        UsuIdUsuario
    )
    VALUES
    (
        p_AudioOriginal,
        p_TextoGenerado,
        p_TiempoRespuesta,
        'PROCESADA',
        p_UsuIdUsuario
    );

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 4
-- REGISTRAR TRADUCCION DE SEÑA
-- ============================================================

DROP PROCEDURE IF EXISTS SP_RegistrarTraduccionSena;

DELIMITER $$

CREATE PROCEDURE SP_RegistrarTraduccionSena(

    IN p_TextoGenerado TEXT,
    IN p_ConfianzaModelo DECIMAL(5,2),
    IN p_TiempoRespuesta DECIMAL(8,2),
    IN p_UsuIdUsuario INT UNSIGNED,
    IN p_SenIdSena INT UNSIGNED

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblUsuario
        WHERE UsuIdUsuario = p_UsuIdUsuario
          AND UsuEstado = 'ACTIVO'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El usuario no existe o esta inactivo';

    END IF;


    IF NOT EXISTS (
        SELECT 1
        FROM TblDiccionarioSena
        WHERE SenIdSena = p_SenIdSena
          AND SenEstadoValidacion = 'APROBADA'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'La sena no existe o no esta aprobada';

    END IF;


    IF p_ConfianzaModelo < 0
       OR p_ConfianzaModelo > 100 THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'La confianza debe estar entre 0 y 100';

    END IF;


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
    (
        p_TextoGenerado,
        p_ConfianzaModelo,
        p_TiempoRespuesta,
        'PROCESADA',
        p_UsuIdUsuario,
        p_SenIdSena
    );

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 5
-- REGISTRAR CAPTURA DE CAMARA
-- ============================================================

DROP PROCEDURE IF EXISTS SP_RegistrarCapturaCamara;

DELIMITER $$

CREATE PROCEDURE SP_RegistrarCapturaCamara(

    IN p_CalidadImagen VARCHAR(10),
    IN p_Iluminacion VARCHAR(10),
    IN p_EstadoCaptura VARCHAR(20),
    IN p_TraIdTraduccion INT UNSIGNED

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblTraduccionSenas
        WHERE TraIdTraduccion = p_TraIdTraduccion
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'La traduccion no existe';

    END IF;


    INSERT INTO TblCapturaCamara
    (
        CapCalidadImagen,
        CapIluminacionDetectada,
        CapEstadoCaptura,
        TraIdTraduccion
    )
    VALUES
    (
        p_CalidadImagen,
        p_Iluminacion,
        p_EstadoCaptura,
        p_TraIdTraduccion
    );

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 6
-- VALIDAR SEÑA
-- ============================================================

DROP PROCEDURE IF EXISTS SP_ValidarSena;

DELIMITER $$

CREATE PROCEDURE SP_ValidarSena(

    IN p_SenIdSena INT UNSIGNED,
    IN p_UsuIdUsuario INT UNSIGNED,
    IN p_Resultado VARCHAR(10),
    IN p_Observaciones TEXT

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblDiccionarioSena
        WHERE SenIdSena = p_SenIdSena
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'La seña no existe';

    END IF;


    IF p_Resultado NOT IN
    (
        'APROBADA',
        'RECHAZADA'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'Resultado de validacion no valido';

    END IF;


    IF NOT EXISTS (

        SELECT 1

        FROM TblUsuario U

        INNER JOIN TblRol R
            ON U.RolIdRol = R.RolIdRol

        WHERE U.UsuIdUsuario = p_UsuIdUsuario
          AND R.RolNombre = 'INTERPRETE'
          AND U.UsuEstado = 'ACTIVO'

    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El usuario no es un interprete activo';

    END IF;


    INSERT INTO TblValidacionSena
    (
        ValObservaciones,
        ValResultado,
        SenIdSena,
        UsuIdUsuario
    )
    VALUES
    (
        p_Observaciones,
        p_Resultado,
        p_SenIdSena,
        p_UsuIdUsuario
    );


    UPDATE TblDiccionarioSena

    SET SenEstadoValidacion = p_Resultado

    WHERE SenIdSena = p_SenIdSena;

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 7
-- REGISTRAR RETROALIMENTACION
-- ============================================================

DROP PROCEDURE IF EXISTS SP_RegistrarRetroalimentacion;

DELIMITER $$

CREATE PROCEDURE SP_RegistrarRetroalimentacion(

    IN p_Correccion TEXT,
    IN p_Observacion TEXT,
    IN p_UsuIdUsuario INT UNSIGNED,
    IN p_TraIdTraduccion INT UNSIGNED

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblTraduccionSenas
        WHERE TraIdTraduccion = p_TraIdTraduccion
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'La traduccion no existe';

    END IF;


    IF NOT EXISTS (
        SELECT 1
        FROM TblUsuario
        WHERE UsuIdUsuario = p_UsuIdUsuario
          AND UsuEstado = 'ACTIVO'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El usuario no existe o esta inactivo';

    END IF;


    INSERT INTO TblRetroalimentacion
    (
        RetCorreccion,
        RetObservacion,
        UsuIdUsuario,
        TraIdTraduccion
    )
    VALUES
    (
        p_Correccion,
        p_Observacion,
        p_UsuIdUsuario,
        p_TraIdTraduccion
    );

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 8
-- REGISTRAR REPORTE DE FALLA
-- ============================================================

DROP PROCEDURE IF EXISTS SP_RegistrarReporteFalla;

DELIMITER $$

CREATE PROCEDURE SP_RegistrarReporteFalla(

    IN p_TipoError VARCHAR(100),
    IN p_Descripcion TEXT,
    IN p_UsuIdUsuario INT UNSIGNED

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblUsuario
        WHERE UsuIdUsuario = p_UsuIdUsuario
          AND UsuEstado = 'ACTIVO'
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'El usuario no existe o esta inactivo';

    END IF;


    INSERT INTO TblReporteFalla
    (
        RepTipoError,
        RepDescripcion,
        RepEstado,
        UsuIdUsuario
    )
    VALUES
    (
        p_TipoError,
        p_Descripcion,
        'PENDIENTE',
        p_UsuIdUsuario
    );

END$$

DELIMITER ;


-- ============================================================
-- PROCEDIMIENTO 9
-- CERRAR SESION
-- ============================================================

DROP PROCEDURE IF EXISTS SP_CerrarSesion;

DELIMITER $$

CREATE PROCEDURE SP_CerrarSesion(

    IN p_SesIdSesion INT UNSIGNED

)
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM TblSesion
        WHERE SesIdSesion = p_SesIdSesion
    ) THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT =
            'La sesion no existe';

    END IF;


    UPDATE TblSesion

    SET
        SesFechaFin = CURRENT_TIMESTAMP,
        SesEstado = 'CERRADA'

    WHERE SesIdSesion = p_SesIdSesion
      AND SesEstado = 'ACTIVA';

END$$

DELIMITER ;

-- ============================================================
-- PROCEDIMIENTO 10: CREAR SOLICITUD DE CAMBIO DE SEÑA
-- ============================================================
DROP PROCEDURE IF EXISTS SP_CrearSolicitudCambioSena;
DELIMITER $$
CREATE PROCEDURE SP_CrearSolicitudCambioSena(
    IN p_Tipo VARCHAR(30),
    IN p_Descripcion TEXT,
    IN p_SenIdSena INT UNSIGNED,
    IN p_UsuIdUsuario INT UNSIGNED
)
BEGIN
    IF p_Tipo NOT IN ('CORRECCION','ACTUALIZACION','RETIRO') OR p_Descripcion IS NULL OR CHAR_LENGTH(TRIM(p_Descripcion))=0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Tipo o descripcion de solicitud no validos';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM TblDiccionarioSena WHERE SenIdSena=p_SenIdSena) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='La seña indicada no existe';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM TblUsuario WHERE UsuIdUsuario=p_UsuIdUsuario AND UsuEstado='ACTIVO') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='El usuario solicitante no existe o esta inactivo';
    END IF;
    INSERT INTO TblSolicitudCambioSena(ScsTipoSolicitud,ScsDescripcion,SenIdSena,UsuIdUsuario)
    VALUES(p_Tipo,p_Descripcion,p_SenIdSena,p_UsuIdUsuario);
    INSERT INTO TblHistorialOperativo(HopAccion,HopDescripcion,HopEntidad,HopIdRegistro,UsuIdUsuario)
    VALUES('SOLICITUD_CAMBIO_SENA','Se creó una solicitud de cambio.','TblSolicitudCambioSena',LAST_INSERT_ID(),p_UsuIdUsuario);
END$$
DELIMITER ;

-- ============================================================
-- PROCEDIMIENTO 11: REGISTRAR VERSION DE SEÑA
-- ============================================================
DROP PROCEDURE IF EXISTS SP_RegistrarVersionSena;
DELIMITER $$
CREATE PROCEDURE SP_RegistrarVersionSena(
    IN p_SenIdSena INT UNSIGNED,
    IN p_UsuIdUsuario INT UNSIGNED,
    IN p_NombreVersion VARCHAR(100),
    IN p_Descripcion TEXT,
    IN p_ScsIdSolicitud INT UNSIGNED
)
BEGIN
    DECLARE v_Numero INT UNSIGNED DEFAULT 1;
    IF NOT EXISTS (SELECT 1 FROM TblDiccionarioSena WHERE SenIdSena=p_SenIdSena) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='La seña no existe';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM TblUsuario WHERE UsuIdUsuario=p_UsuIdUsuario AND UsuEstado='ACTIVO') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='El usuario no existe o esta inactivo';
    END IF;
    SELECT COALESCE(MAX(VerNumero),0)+1 INTO v_Numero FROM TblVersionSena WHERE SenIdSena=p_SenIdSena;
    INSERT INTO TblVersionSena(VerNumero,VerNombre,VerDescripcion,SenIdSena,UsuIdUsuario,ScsIdSolicitud)
    VALUES(v_Numero,p_NombreVersion,p_Descripcion,p_SenIdSena,p_UsuIdUsuario,p_ScsIdSolicitud);
    INSERT INTO TblHistorialOperativo(HopAccion,HopDescripcion,HopEntidad,HopIdRegistro,UsuIdUsuario)
    VALUES('VERSION_SENA','Se registró una nueva versión.','TblVersionSena',LAST_INSERT_ID(),p_UsuIdUsuario);
END$$
DELIMITER ;

-- ============================================================
-- PROCEDIMIENTO 12: CREAR SOLICITUD DE SOPORTE
-- ============================================================
DROP PROCEDURE IF EXISTS SP_CrearSolicitudSoporte;
DELIMITER $$
CREATE PROCEDURE SP_CrearSolicitudSoporte(
    IN p_Asunto VARCHAR(160),
    IN p_Descripcion TEXT,
    IN p_Categoria VARCHAR(50),
    IN p_Prioridad VARCHAR(15),
    IN p_UsuIdSolicitante INT UNSIGNED
)
BEGIN
    DECLARE v_IdSolicitud INT UNSIGNED;
    IF p_Prioridad NOT IN ('BAJA','MEDIA','ALTA','CRITICA') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Prioridad no valida';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM TblUsuario WHERE UsuIdUsuario=p_UsuIdSolicitante AND UsuEstado='ACTIVO') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='El solicitante no existe o esta inactivo';
    END IF;
    INSERT INTO TblSolicitudSoporte(SsoAsunto,SsoDescripcion,SsoCategoria,SsoPrioridad,UsuIdSolicitante)
    VALUES(p_Asunto,p_Descripcion,p_Categoria,p_Prioridad,p_UsuIdSolicitante);
    SET v_IdSolicitud=LAST_INSERT_ID();
    INSERT INTO TblHistorialSolicitud(HsoEstadoAnterior,HsoEstadoNuevo,HsoComentario,SsoIdSolicitud,UsuIdUsuario)
    VALUES(NULL,'ABIERTA','Solicitud creada.',v_IdSolicitud,p_UsuIdSolicitante);
END$$
DELIMITER ;

-- ============================================================
-- PROCEDIMIENTO 13: ACTUALIZAR ESTADO DE SOLICITUD DE SOPORTE
-- ============================================================
DROP PROCEDURE IF EXISTS SP_ActualizarEstadoSolicitudSoporte;
DELIMITER $$
CREATE PROCEDURE SP_ActualizarEstadoSolicitudSoporte(
    IN p_SsoIdSolicitud INT UNSIGNED,
    IN p_NuevoEstado VARCHAR(20),
    IN p_UsuIdResponsable INT UNSIGNED,
    IN p_Comentario TEXT
)
BEGIN
    DECLARE v_EstadoAnterior VARCHAR(20);
    IF p_NuevoEstado NOT IN ('ABIERTA','ASIGNADA','EN_PROCESO','RESUELTA','CERRADA') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Estado de soporte no valido';
    END IF;
    SELECT SsoEstado INTO v_EstadoAnterior FROM TblSolicitudSoporte WHERE SsoIdSolicitud=p_SsoIdSolicitud FOR UPDATE;
    IF v_EstadoAnterior IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='La solicitud de soporte no existe';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM TblUsuario WHERE UsuIdUsuario=p_UsuIdResponsable AND UsuEstado='ACTIVO') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='El responsable no existe o esta inactivo';
    END IF;
    UPDATE TblSolicitudSoporte
    SET SsoEstado=p_NuevoEstado,
        UsuIdResponsable=p_UsuIdResponsable,
        SsoFechaCierre=IF(p_NuevoEstado IN ('RESUELTA','CERRADA'),CURRENT_TIMESTAMP,NULL)
    WHERE SsoIdSolicitud=p_SsoIdSolicitud;
    INSERT INTO TblHistorialSolicitud(HsoEstadoAnterior,HsoEstadoNuevo,HsoComentario,SsoIdSolicitud,UsuIdUsuario)
    VALUES(v_EstadoAnterior,p_NuevoEstado,p_Comentario,p_SsoIdSolicitud,p_UsuIdResponsable);
END$$
DELIMITER ;
