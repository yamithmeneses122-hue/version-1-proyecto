
-- ============================================================
-- FUNCION 1
-- OBTENER NOMBRE COMPLETO DE UN USUARIO
-- ============================================================

DROP FUNCTION IF EXISTS FN_ObtenerNombreUsuario;

DELIMITER $$

CREATE FUNCTION FN_ObtenerNombreUsuario(
    p_UsuIdUsuario INT UNSIGNED
)
RETURNS VARCHAR(150)
NOT DETERMINISTIC
READS SQL DATA
BEGIN

    DECLARE v_Nombre VARCHAR(150);

    SELECT UsuNombreCompleto
    INTO v_Nombre
    FROM TblUsuario
    WHERE UsuIdUsuario = p_UsuIdUsuario;

    RETURN v_Nombre;

END$$

DELIMITER ;


-- ============================================================
-- FUNCION 2
-- OBTENER ROL DE UN USUARIO
-- ============================================================

DROP FUNCTION IF EXISTS FN_ObtenerRolUsuario;

DELIMITER $$

CREATE FUNCTION FN_ObtenerRolUsuario(
    p_UsuIdUsuario INT UNSIGNED
)
RETURNS VARCHAR(50)
NOT DETERMINISTIC
READS SQL DATA
BEGIN

    DECLARE v_Rol VARCHAR(50);

    SELECT R.RolNombre
    INTO v_Rol
    FROM TblUsuario U
    INNER JOIN TblRol R
        ON U.RolIdRol = R.RolIdRol
    WHERE U.UsuIdUsuario = p_UsuIdUsuario;

    RETURN v_Rol;

END$$

DELIMITER ;


-- ============================================================
-- FUNCION 3
-- PORCENTAJE DE TRADUCCIONES DE SEÑAS EXITOSAS
-- ============================================================

DROP FUNCTION IF EXISTS FN_PorcentajeTraduccionesExitosas;

DELIMITER $$

CREATE FUNCTION FN_PorcentajeTraduccionesExitosas(
    p_UsuIdUsuario INT UNSIGNED
)
RETURNS DECIMAL(5,2)
NOT DETERMINISTIC
READS SQL DATA
BEGIN

    DECLARE v_Total INT DEFAULT 0;
    DECLARE v_Exitosas INT DEFAULT 0;

    SELECT COUNT(*)
    INTO v_Total
    FROM TblTraduccionSenas
    WHERE UsuIdUsuario = p_UsuIdUsuario;

    SELECT COUNT(*)
    INTO v_Exitosas
    FROM TblTraduccionSenas
    WHERE UsuIdUsuario = p_UsuIdUsuario
      AND TraEstadoProcesamiento = 'PROCESADA';

    IF v_Total = 0 THEN
        RETURN 0.00;
    END IF;

    RETURN ROUND(
        (v_Exitosas * 100.0) / v_Total,
        2
    );

END$$

DELIMITER ;


-- ============================================================
-- FUNCION 4
-- CLASIFICAR NIVEL DE CONFIANZA DEL MODELO
-- ============================================================

DROP FUNCTION IF EXISTS FN_ClasificarConfianza;

DELIMITER $$

CREATE FUNCTION FN_ClasificarConfianza(
    p_Confianza DECIMAL(5,2)
)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN

    IF p_Confianza IS NULL THEN

        RETURN 'SIN DATOS';

    ELSEIF p_Confianza >= 90 THEN

        RETURN 'ALTA';

    ELSEIF p_Confianza >= 70 THEN

        RETURN 'MEDIA';

    ELSE

        RETURN 'BAJA';

    END IF;

END$$

DELIMITER ;

-- ============================================================
-- FUNCION 5: CONTAR SOLICITUDES DE SOPORTE ABIERTAS
-- ============================================================
DROP FUNCTION IF EXISTS FN_ContarSolicitudesSoporteAbiertas;
DELIMITER $$
CREATE FUNCTION FN_ContarSolicitudesSoporteAbiertas()
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_Total INT DEFAULT 0;
    SELECT COUNT(*) INTO v_Total
    FROM TblSolicitudSoporte
    WHERE SsoEstado IN ('ABIERTA','ASIGNADA','EN_PROCESO');
    RETURN v_Total;
END$$
DELIMITER ;

-- ============================================================
-- FUNCION 6: OBTENER LA VERSION ACTUAL DE UNA SEÑA
-- ============================================================
DROP FUNCTION IF EXISTS FN_ObtenerVersionActualSena;
DELIMITER $$
CREATE FUNCTION FN_ObtenerVersionActualSena(p_SenIdSena INT UNSIGNED)
RETURNS INT UNSIGNED
NOT DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_Version INT UNSIGNED DEFAULT NULL;
    SELECT MAX(VerNumero) INTO v_Version
    FROM TblVersionSena
    WHERE SenIdSena = p_SenIdSena;
    RETURN v_Version;
END$$
DELIMITER ;
