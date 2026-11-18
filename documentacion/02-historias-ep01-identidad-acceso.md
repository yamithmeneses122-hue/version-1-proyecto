# Historias de usuario — EP-01 Gestión de identidad y acceso

> **Proyecto:** SIGNA-TECH-APP  
> **Documento:** 02 — Historias de usuario de identidad y acceso  
> **Épica relacionada:** EP-01 Gestión de identidad y acceso  
> **Versión:** 1.0  
> **Base de análisis:** rama `correcciones-de-color` del repositorio del proyecto.  
> **Estado documental:** primera especificación funcional contrastada con los componentes y rutas inspeccionados.

---

## 1. Propósito y alcance

Este documento especifica los flujos de entrada, registro, recuperación de contraseña, conservación de sesión, cierre de sesión y cambio de cuenta de SIGNA-TECH-APP. Incluye tanto el comportamiento visible de las pantallas como las reglas funcionales necesarias para que el flujo pueda implementarse, probarse y aceptarse sin interpretaciones ambiguas.

La documentación distingue tres dimensiones:

- **Situación observada:** comportamiento que se identificó en el frontend revisado.
- **Comportamiento requerido:** resultado funcional que debe cumplir el producto.
- **Brecha:** trabajo que falta para que la implementación satisfaga el requerimiento.

No se considera que una pantalla esté completamente implementada solo porque exista su diseño. Tampoco se presume la existencia de servicios backend, envío de correos, persistencia de usuarios o controles de seguridad que no hayan sido comprobados.

## 2. Referencias de implementación revisadas

Rama de referencia: `correcciones-de-color`.

Rutas App Router identificadas:

- `src/app/(autenticacion)/login/page.jsx`
- `src/app/(autenticacion)/crear-cuenta/page.jsx`
- `src/app/(autenticacion)/recuperar-contrasena/page.jsx`
- `src/app/(publico)/(inicio)/page.jsx`
- `src/app/(publico)/(inicio)/layout.jsx`
- `src/app/(operador)/operador/page.jsx`
- `src/app/(operador)/layout.jsx`
- `src/app/(administrador)/layout.jsx`

Componentes de autenticación revisados:

- `src/Features/Authentication/Vistas/InicioSesionVista.jsx`
- `src/Features/Authentication/Componentes/InicioSesionComponente.jsx`
- `src/Features/Authentication/Vistas/NuevaCuentaVista.jsx`
- `src/Features/Authentication/Componentes/NuevaCuentaComponente.jsx`
- `src/Features/Authentication/Vistas/ContrasenaVista.jsx`
- `src/Features/Authentication/Componentes/ContrasenaComponente.jsx`
- `src/Features/Authentication/funcionalidades/funciones.js`

El análisis de estos archivos permite confirmar la existencia de las rutas y los componentes mencionados, además de los comportamientos concretos descritos en cada historia. No constituye una auditoría completa de todos los archivos del repositorio.

## 3. Actores y términos

| Término | Descripción |
|---|---|
| Visitante | Persona que navega por las páginas públicas sin haber iniciado sesión. |
| Operador | Usuario que utiliza las funciones de comunicación de SIGNA-TECH-APP. |
| Intérprete | Usuario autorizado para actividades relacionadas con el contenido de señas. |
| Administrador | Usuario encargado de la administración del sistema. |
| Sesión | Estado de autenticación que permite reconocer al usuario durante su navegación. |
| Cuenta activa | Cuenta habilitada para ingresar al sistema. |
| Cambio de cuenta | Acción de finalizar o sustituir la identidad autenticada para ingresar con otra cuenta. No equivale a cambiar el rol de una misma cuenta. |

## 4. Convenciones de estado

- **Parcial:** existe interfaz y una parte del comportamiento, pero no se ha comprobado el flujo completo.
- **Demostrativa:** el comportamiento utiliza datos locales o simulados y no demuestra persistencia ni conexión a servicios reales.
- **Pendiente:** la capacidad no se encontró implementada en los componentes revisados o requiere integración adicional.
- **Por verificar:** existe una ruta o referencia, pero hace falta inspeccionar el componente completo para confirmar su comportamiento.

Los estados describen la evidencia disponible en el análisis, no la calidad final esperada.

---

# 5. Historias de usuario

## HU-001 — Consultar la página pública de inicio y acceder a la plataforma

**Épica:** EP-01 Gestión de identidad y acceso  
**Actor principal:** Visitante  
**Prioridad:** Alta  
**Estado de implementación:** Por verificar en detalle visual y funcional.

### Historia

Como visitante, quiero ingresar a la página pública de SIGNA-TECH-APP y reconocer qué ofrece la plataforma, para comprender su propósito y decidir si deseo iniciar sesión o crear una cuenta.

### Objetivo

Ofrecer un punto de entrada claro, accesible y coherente con la identidad del producto. La página debe explicar que SIGNA-TECH-APP busca facilitar la comunicación bidireccional mediante texto, voz y contenidos básicos de Lengua de Señas Colombiana.

### Precondiciones

1. La aplicación debe estar disponible.
2. El visitante debe poder acceder a la ruta pública de inicio.
3. No se debe exigir autenticación para consultar el contenido público.

### Elementos y comportamiento esperado de la pantalla

1. **Encabezado**
   - Mostrar el nombre o logotipo de SIGNA-TECH-APP.
   - Presentar navegación pública hacia las secciones informativas disponibles.
   - Incluir acceso visible a “Iniciar sesión”.
   - Incluir acceso a “Crear cuenta” cuando el registro público esté habilitado.
   - En pantallas pequeñas, la navegación debe adaptarse sin ocultar las acciones principales.

2. **Sección principal o presentación**
   - Explicar en lenguaje sencillo el propósito de la aplicación.
   - Comunicar la propuesta de inclusión y comunicación bidireccional.
   - Presentar llamadas a la acción para iniciar sesión o registrarse.
   - Evitar afirmar que la interpretación automática de cualquier seña o conversación compleja está disponible si esa capacidad no se encuentra integrada.

3. **Sección de funcionalidades**
   - Describir las capacidades que realmente formen parte del alcance aprobado: comunicación mediante texto y voz, herramientas de apoyo con cámara y consulta de contenido de señas.
   - Diferenciar capacidades disponibles de funcionalidades en desarrollo o demostrativas.

4. **Secciones informativas**
   - Incluir información del proyecto, beneficios y preguntas frecuentes cuando estén presentes en el diseño aprobado.
   - Los enlaces deben llevar a secciones o páginas existentes; no deben ser controles decorativos sin acción.

5. **Pie de página**
   - Mostrar información institucional o de contacto únicamente si está definida.
   - Los enlaces deben ser navegables y tener un destino válido.

### Flujo principal

1. El visitante abre la ruta pública de inicio.
2. El sistema presenta el encabezado y el contenido informativo.
3. El visitante revisa la explicación del producto.
4. El visitante selecciona “Iniciar sesión” o “Crear cuenta”.
5. El sistema navega a la ruta correspondiente.

### Flujos alternos y excepciones

- Si una sección informativa no está disponible, no se debe mostrar un enlace roto.
- Si el visitante abre una ruta inexistente, el sistema debe presentar una página de no encontrado con una opción para volver al inicio.
- Si el visitante ya tiene una sesión válida, el comportamiento de redirección debe ajustarse a la política de sesión definida en HU-005; no debe crear una segunda sesión silenciosamente.

### Criterios de aceptación

- **CA-001.1:** La ruta pública puede consultarse sin iniciar sesión.
- **CA-001.2:** La página identifica claramente el producto como SIGNA-TECH-APP.
- **CA-001.3:** El propósito y las capacidades se describen sin prometer funciones no integradas.
- **CA-001.4:** Los accesos de inicio de sesión y registro conducen a sus rutas correctas.
- **CA-001.5:** La página se adapta a escritorio y dispositivos móviles.
- **CA-001.6:** Los controles interactivos tienen etiquetas comprensibles y destinos funcionales.

### Observación de implementación

Se identificó la ruta pública `(publico)/(inicio)` con su archivo `page.jsx` y un `layout.jsx`. El contenido interno debe contrastarse visualmente y componente por componente antes de certificar cada sección como implementada.

---

## HU-002 — Iniciar sesión con credenciales y acceder según el rol

**Épica:** EP-01 Gestión de identidad y acceso  
**Actor principal:** Operador, intérprete o administrador  
**Prioridad:** Crítica  
**Estado de implementación:** Parcial / demostrativa.

### Historia

Como usuario registrado, quiero ingresar mi correo y contraseña para acceder de forma personalizada a las funciones autorizadas según mi rol.

### Objetivo

Permitir que una persona identificada acceda a la plataforma y sea dirigida al espacio de trabajo correspondiente a su rol.

### Precondiciones

1. El usuario debe tener una cuenta registrada.
2. La cuenta debe encontrarse activa.
3. El usuario debe conocer sus credenciales.
4. La ruta de inicio de sesión debe estar disponible.

### Elementos de pantalla

1. **Identidad visual**
   - Logotipo o identificador del producto.
   - Nombre SIGNA-TECH-APP.
   - Texto de bienvenida.
   - Acceso para regresar a la página pública.

2. **Campo de correo electrónico**
   - Etiqueta visible: “Correo electrónico”.
   - Tipo de entrada apropiado para correo.
   - Debe permitir escribir y editar la dirección.
   - Debe validar que el campo no esté vacío y que tenga una estructura de correo válida.

3. **Campo de contraseña**
   - Etiqueta visible: “Contraseña”.
   - El valor debe ocultarse inicialmente.
   - Debe incluir un control para mostrar u ocultar la contraseña.
   - El control debe indicar su estado de manera accesible.

4. **Opción “Recordar mi sesión”**
   - Debe permitir que el usuario decida si desea conservar la sesión al cerrar o actualizar el navegador, de acuerdo con la política de seguridad definida.
   - La selección debe aplicarse únicamente después de una autenticación válida.

5. **Acción “Iniciar sesión”**
   - Debe validar los campos antes de enviar la solicitud.
   - Debe evitar envíos duplicados mientras se procesa la autenticación.
   - Debe informar el resultado de forma comprensible.

6. **Enlace “¿Olvidaste tu contraseña?”**
   - Debe dirigir a la pantalla de recuperación.

7. **Enlace para crear cuenta**
   - Debe dirigir a la ruta de registro si el registro público se encuentra habilitado.

### Flujo principal

1. El usuario abre la pantalla de inicio de sesión.
2. El sistema presenta los campos de correo y contraseña.
3. El usuario escribe sus credenciales.
4. El usuario selecciona opcionalmente “Recordar mi sesión”.
5. El usuario pulsa “Iniciar sesión”.
6. El sistema valida que los campos estén completos y tengan formato correcto.
7. El sistema verifica las credenciales y el estado de la cuenta mediante el servicio de autenticación.
8. Si la autenticación es correcta, el sistema establece la sesión de forma segura.
9. El sistema identifica el rol asociado a la cuenta.
10. El sistema redirige al espacio correspondiente:
    - Operador: `/operador`.
    - Administrador: `/administrador`.
    - Intérprete: `/interprete`.
11. El sistema impide que el usuario acceda a módulos que no correspondan a sus permisos.

### Reglas de negocio

- **RN-001:** No se permite iniciar sesión con campos obligatorios vacíos.
- **RN-002:** Una cuenta inactiva no puede iniciar sesión.
- **RN-003:** El rol debe provenir de la información de la cuenta validada, no de una selección libre en el formulario.
- **RN-004:** La navegación posterior al inicio de sesión debe corresponder al rol autorizado.
- **RN-005:** Un mensaje de error no debe revelar si el correo existe o si la contraseña fue la incorrecta.
- **RN-006:** La sesión debe gestionarse mediante mecanismos seguros del lado servidor cuando exista backend; no se deben tratar credenciales almacenadas en código cliente como autenticación de producción.

### Flujos alternos y excepciones

- **Credenciales incorrectas:** mostrar un mensaje general: “Correo o contraseña incorrectos”.
- **Cuenta inactiva:** informar que la cuenta no está habilitada y orientar al usuario hacia el canal de soporte definido.
- **Campos vacíos:** señalar los campos que requieren información.
- **Formato de correo inválido:** solicitar una dirección válida sin borrar los demás datos.
- **Fallo de conexión:** informar que no fue posible completar el inicio de sesión e indicar que se intente nuevamente.
- **Procesamiento en curso:** deshabilitar temporalmente el botón para evitar solicitudes duplicadas.
- **Rol no reconocido:** no conceder acceso por defecto; mostrar un error controlado y registrar el incidente según la política de auditoría.

### Criterios de aceptación

- **CA-002.1:** El formulario presenta correo, contraseña, mostrar/ocultar, recordar sesión, iniciar sesión y enlaces relacionados.
- **CA-002.2:** El sistema valida los campos obligatorios y el formato del correo.
- **CA-002.3:** Una autenticación correcta permite ingresar al área correspondiente al rol.
- **CA-002.4:** Una cuenta inactiva no obtiene acceso.
- **CA-002.5:** Las credenciales incorrectas producen un mensaje general y comprensible.
- **CA-002.6:** El usuario puede mostrar u ocultar la contraseña sin modificar su valor.
- **CA-002.7:** El sistema evita envíos repetidos mientras procesa la solicitud.
- **CA-002.8:** La sesión no depende de credenciales ficticias incluidas en el código fuente en el entorno productivo.
- **CA-002.9:** El usuario no puede entrar directamente a una ruta protegida sin una sesión válida y autorización suficiente.

### Situación observada en el frontend

El componente revisado contiene los campos, el control de mostrar/ocultar contraseña, la opción de recordar sesión, los enlaces de navegación y el envío del formulario. La función de autenticación revisada compara credenciales contra cuentas ficticias definidas en el código para desarrollo, verifica el estado activo y devuelve datos básicos del usuario y su rol. Cuando el acceso falla, el componente muestra una alerta con un mensaje general. Cuando el acceso es correcto, almacena información de sesión en `localStorage` o `sessionStorage` según la opción seleccionada y redirige según el rol.

**Brecha:** este comportamiento es demostrativo. Se requiere integrar autenticación real, almacenamiento seguro de sesión, protección de rutas y validación de permisos en servidor antes de considerar el flujo apto para producción.

---

## HU-003 — Solicitar la creación de una cuenta de operador

**Épica:** EP-01 Gestión de identidad y acceso  
**Actor principal:** Visitante  
**Prioridad:** Alta  
**Estado de implementación:** Interfaz identificada; procesamiento real pendiente de verificar e integrar.

### Historia

Como visitante que desea utilizar SIGNA-TECH-APP, quiero completar un formulario de registro para solicitar una cuenta de operador y acceder a las herramientas de comunicación.

### Objetivo

Capturar los datos mínimos necesarios para registrar a una persona como operador, validarlos y dejar la cuenta en el estado que determine la política de activación del sistema.

### Precondiciones

1. El registro público debe estar habilitado.
2. El visitante debe encontrarse en la ruta de creación de cuenta.
3. Deben estar definidas las condiciones de uso y privacidad que correspondan.

### Elementos de pantalla

1. **Encabezado**
   - Identidad visual de SIGNA-TECH-APP.
   - Título que indique que se está creando una cuenta.
   - Enlace para volver al inicio de sesión.

2. **Campo “Nombre completo”**
   - Obligatorio.
   - Debe aceptar nombres y apellidos.
   - Debe rechazar valores vacíos o compuestos únicamente por espacios.

3. **Campo “Correo electrónico”**
   - Obligatorio.
   - Debe validar formato.
   - Debe comprobar que el correo no esté registrado previamente.

4. **Campo “Contraseña”**
   - Obligatorio.
   - Debe cumplir la política de contraseñas definida.
   - El formulario actual establece una longitud mínima de ocho caracteres; la regla final debe mantenerse consistente con la política de seguridad.

5. **Campo “Confirmar contraseña”**
   - Obligatorio.
   - Debe coincidir exactamente con la contraseña ingresada.
   - Debe permitir detectar errores antes de enviar el formulario.

6. **Botón “Crear cuenta”**
   - Debe validar todos los campos.
   - Debe mostrar estado de procesamiento.
   - Debe informar si la solicitud se registró o si ocurrió un error.

7. **Enlace “Iniciar sesión”**
   - Debe regresar a la ruta de acceso.

### Flujo principal requerido

1. El visitante abre la ruta `/crear-cuenta`.
2. El sistema presenta el formulario.
3. El visitante escribe nombre completo, correo, contraseña y confirmación.
4. El visitante pulsa “Crear cuenta”.
5. El sistema valida campos obligatorios, formato del correo y coincidencia de contraseñas.
6. El sistema verifica que el correo no esté asociado a otra cuenta.
7. El sistema registra la solicitud con el rol permitido para el autorregistro: operador.
8. El sistema aplica la política de activación definida para nuevos operadores.
9. El sistema informa el resultado y presenta el siguiente paso: iniciar sesión o esperar activación, según corresponda.

### Reglas de negocio

- **RN-007:** El autorregistro público crea exclusivamente cuentas del tipo operador.
- **RN-008:** Un visitante no puede asignarse a sí mismo el rol de administrador o intérprete.
- **RN-009:** El correo debe ser único.
- **RN-010:** La contraseña y su confirmación deben coincidir.
- **RN-011:** Las contraseñas deben almacenarse mediante hash seguro en el backend; nunca en texto plano.
- **RN-012:** La activación de una cuenta debe seguir la política institucional definida. No se debe asumir que toda cuenta queda activa automáticamente.
- **RN-013:** El sistema debe informar el resultado sin exponer detalles internos ni datos de otras cuentas.

### Flujos alternos y excepciones

- Nombre vacío: marcar el campo y solicitar el nombre.
- Correo inválido: mostrar orientación junto al campo.
- Correo ya registrado: informar que no puede utilizarse y ofrecer volver al inicio de sesión o recuperar contraseña.
- Contraseña inferior al mínimo: explicar la condición requerida.
- Contraseñas diferentes: señalar la falta de coincidencia.
- Error de servidor: conservar los datos no sensibles cuando sea seguro hacerlo y permitir reintentar.
- Registro deshabilitado: informar que no se reciben registros en ese momento.

### Criterios de aceptación

- **CA-003.1:** El formulario presenta nombre completo, correo, contraseña y confirmación.
- **CA-003.2:** Los campos obligatorios no aceptan valores vacíos.
- **CA-003.3:** El correo debe tener formato válido y ser único.
- **CA-003.4:** La contraseña debe cumplir la política definida.
- **CA-003.5:** La confirmación debe coincidir con la contraseña.
- **CA-003.6:** El registro público no permite seleccionar roles privilegiados.
- **CA-003.7:** El sistema informa claramente el resultado del registro.
- **CA-003.8:** La cuenta queda en el estado de activación establecido por la política del producto.

### Situación observada en el frontend

Se identificó la ruta `/crear-cuenta` y una vista con nombre completo, correo, contraseña, confirmación, botón para crear cuenta y enlace a inicio de sesión. Los campos de contraseña tienen validación HTML de longitud mínima de ocho caracteres y los campos requeridos usan validación de formulario.

**Brecha:** en el componente revisado no se encontró una operación de envío conectada a un servicio de registro. La presencia del formulario no demuestra que se cree una cuenta ni que los datos se almacenen.

---

## HU-004 — Recuperar el acceso mediante solicitud de restablecimiento de contraseña

**Épica:** EP-01 Gestión de identidad y acceso  
**Actor principal:** Usuario registrado  
**Prioridad:** Alta  
**Estado de implementación:** Interfaz identificada; envío y restablecimiento real pendientes.

### Historia

Como usuario que olvidó su contraseña, quiero solicitar un proceso de recuperación mediante mi correo electrónico para volver a acceder a mi cuenta de forma segura.

### Objetivo

Permitir que un usuario solicite un mecanismo seguro de restablecimiento sin revelar información sensible sobre la existencia de cuentas.

### Precondiciones

1. El usuario debe poder acceder a la pantalla de recuperación.
2. Debe existir un mecanismo de envío de mensajes o enlaces de recuperación en el backend.
3. Debe estar definida la vigencia y el uso único del token de recuperación.

### Elementos de pantalla

1. Título que indique “Recuperar contraseña”.
2. Texto explicativo que indique que se utilizará el correo asociado a la cuenta.
3. Campo “Correo electrónico”.
4. Botón “Enviar enlace de recuperación”.
5. Enlace para volver al inicio de sesión.
6. Mensaje de confirmación o error en un espacio visible y accesible.

### Flujo principal requerido

1. El usuario abre la ruta `/recuperar-contrasena`.
2. El sistema muestra el campo de correo.
3. El usuario escribe su dirección.
4. El usuario pulsa “Enviar enlace de recuperación”.
5. El sistema valida el formato.
6. El backend procesa la solicitud sin revelar si el correo está registrado.
7. Si corresponde, el sistema envía un enlace o código temporal.
8. El sistema muestra una confirmación neutral.
9. El usuario accede al enlace recibido y define una nueva contraseña.
10. El sistema valida el token, la vigencia y la nueva contraseña.
11. El sistema actualiza la credencial y confirma el cambio.
12. El usuario puede regresar al inicio de sesión.

### Reglas de negocio

- **RN-014:** La solicitud de recuperación no debe revelar si una cuenta existe.
- **RN-015:** El token o código debe tener expiración y uso limitado.
- **RN-016:** Un token utilizado o vencido no puede volver a utilizarse.
- **RN-017:** La nueva contraseña debe cumplir la política vigente.
- **RN-018:** La contraseña y su confirmación deben coincidir si ambos campos se presentan.
- **RN-019:** El sistema debe limitar solicitudes repetidas para reducir abuso.

### Flujos alternos y excepciones

- Correo con formato inválido: solicitar corrección.
- Error de envío: mostrar que no fue posible completar la solicitud y permitir reintentar.
- Token vencido: informar que debe solicitarse un nuevo enlace.
- Token inválido o ya utilizado: impedir el cambio y ofrecer iniciar una nueva solicitud.
- Contraseña no válida: explicar los requisitos sin revelar información interna.

### Criterios de aceptación

- **CA-004.1:** La pantalla presenta un campo de correo y el botón de envío.
- **CA-004.2:** El formato del correo se valida antes de enviar.
- **CA-004.3:** El sistema muestra una confirmación neutral que no revela la existencia de la cuenta.
- **CA-004.4:** El enlace o código tiene expiración y no puede reutilizarse.
- **CA-004.5:** El usuario puede establecer una contraseña nueva solo mediante un proceso válido.
- **CA-004.6:** Una solicitud fallida presenta un mensaje comprensible y permite reintentar.

### Situación observada en el frontend

Se identificó la ruta `/recuperar-contrasena`, con campo de correo, texto que indica que se enviará un enlace de recuperación, botón de envío y enlace para volver al login.

**Brecha:** en el componente revisado no se encontró un controlador de envío ni integración con un servicio de correo o restablecimiento. El flujo de recuperación completo está pendiente.

---

## HU-005 — Mantener o finalizar la sesión de manera controlada

**Épica:** EP-01 Gestión de identidad y acceso  
**Actor principal:** Usuario autenticado  
**Prioridad:** Crítica  
**Estado de implementación:** Parcial / demostrativa.

### Historia

Como usuario autenticado, quiero que el sistema conserve mi acceso según la opción que seleccioné y me permita cerrar sesión cuando lo necesite, para proteger mi cuenta y controlar el uso de la plataforma.

### Objetivo

Definir el ciclo de vida de la sesión, evitando que una sesión quede abierta sin conocimiento del usuario y garantizando que cerrar sesión elimine el acceso a las áreas protegidas.

### Precondiciones

1. El usuario inició sesión correctamente.
2. El sistema conoce la identidad y el rol de la cuenta.
3. Existe una sesión válida.

### Comportamiento requerido

1. **Recordar sesión**
   - Si el usuario activa la opción, la sesión puede mantenerse según una política de duración explícita.
   - Si no la activa, la sesión debe finalizar al cerrar el contexto de navegación establecido por la política.
   - La decisión debe aplicarse después de autenticar correctamente.
   - No se deben guardar contraseñas en almacenamiento del navegador.

2. **Reconocimiento de sesión**
   - Al navegar entre módulos autorizados, el sistema debe conservar la identidad.
   - Al actualizar una página, el sistema debe recuperar la sesión si continúa vigente.
   - Si la sesión expiró, debe solicitar autenticación nuevamente.

3. **Cerrar sesión**
   - El usuario debe encontrar una acción claramente identificada como “Cerrar sesión”.
   - Al seleccionarla, el sistema debe solicitar confirmación cuando exista riesgo de perder una operación no guardada.
   - El sistema debe invalidar la sesión en el servidor cuando se implemente autenticación backend.
   - Debe limpiar los datos de sesión locales que correspondan.
   - Debe redirigir al usuario a la página pública o al login.
   - Al usar el botón Atrás, no debe recuperar acceso a contenido protegido sin autenticarse de nuevo.

### Flujo principal de cierre

1. El usuario abre el menú o área de cuenta.
2. Selecciona “Cerrar sesión”.
3. El sistema finaliza la sesión.
4. El sistema limpia el estado de autenticación.
5. El sistema redirige a una ruta pública.
6. El usuario intenta regresar a una ruta protegida.
7. El sistema solicita iniciar sesión nuevamente.

### Flujos alternos

- Sesión expirada: redirigir al login y explicar que debe autenticarse nuevamente.
- Error al invalidar la sesión en servidor: no presentar el cierre como exitoso si el servidor no confirmó la operación; aplicar manejo seguro definido.
- Operación sin guardar: advertir antes de salir cuando corresponda.

### Criterios de aceptación

- **CA-005.1:** La opción “Recordar mi sesión” controla la persistencia conforme a una política documentada.
- **CA-005.2:** No se almacenan contraseñas en texto plano en el navegador.
- **CA-005.3:** El usuario puede cerrar sesión desde un control visible y consistente.
- **CA-005.4:** Al cerrar sesión se elimina el acceso a rutas protegidas.
- **CA-005.5:** La sesión expirada no permite continuar operando.
- **CA-005.6:** La navegación hacia atrás no expone información protegida después del cierre.

### Situación observada en el frontend

El componente de inicio de sesión revisado guarda datos de sesión en `localStorage` cuando se selecciona recordar sesión y en `sessionStorage` cuando no se selecciona, eliminando previamente la clave opuesta.

**Brecha:** este mecanismo local no demuestra que exista una sesión validada por servidor ni que se invaliden credenciales o tokens en backend. El control de cierre de sesión y la protección efectiva de rutas deben verificarse en los módulos de navegación y completar su integración.

---

## HU-006 — Cambiar de cuenta sin mezclar identidades ni permisos

**Épica:** EP-01 Gestión de identidad y acceso  
**Actor principal:** Usuario autenticado  
**Prioridad:** Alta  
**Estado de implementación:** Pendiente de verificación e implementación funcional.

### Historia

Como usuario que necesita utilizar otra cuenta, quiero cambiar de cuenta de forma segura para ingresar con una identidad diferente sin mezclar información, permisos o actividades de la sesión anterior.

### Objetivo

Proporcionar un flujo explícito para sustituir la identidad autenticada. El cambio de cuenta no debe confundirse con cambiar el rol de una cuenta ni con modificar el perfil personal.

### Precondiciones

1. Existe una sesión autenticada.
2. El usuario puede acceder al menú o área de cuenta.
3. El sistema dispone de una acción de cierre de sesión y de una ruta de inicio de sesión.

### Elementos de pantalla y navegación requeridos

1. **Acceso al menú de cuenta**
   - Debe estar disponible desde el encabezado, menú lateral o área de perfil del espacio autenticado.
   - Debe permitir reconocer qué cuenta está activa mediante nombre o correo, cuando esa información esté disponible.

2. **Acción “Cambiar de cuenta”**
   - Debe distinguirse visual y semánticamente de “Editar perfil” y “Cambiar contraseña”.
   - Al seleccionarla, el sistema debe explicar que finalizará la sesión actual.

3. **Confirmación**
   - Debe ofrecer continuar o cancelar.
   - Si existen operaciones pendientes de guardar, debe advertirlo antes de finalizar.

4. **Pantalla de inicio de sesión**
   - Después de confirmar, debe limpiar la identidad anterior y mostrar el formulario de autenticación.
   - No debe precargar la contraseña de la cuenta anterior.
   - Puede conservar el correo únicamente si la política de privacidad lo permite y el usuario lo espera.

### Flujo principal

1. El usuario autenticado abre el menú de cuenta.
2. Selecciona “Cambiar de cuenta”.
3. El sistema muestra una confirmación.
4. El usuario confirma.
5. El sistema finaliza la sesión anterior y limpia el estado de identidad.
6. El sistema redirige a la pantalla de inicio de sesión.
7. El usuario introduce las credenciales de la nueva cuenta.
8. El sistema autentica la nueva identidad.
9. El sistema carga el rol y permisos de la nueva cuenta.
10. El sistema redirige al espacio correspondiente.

### Reglas de negocio

- **RN-020:** El cambio de cuenta debe finalizar la sesión anterior antes de iniciar la nueva.
- **RN-021:** Los permisos de la cuenta anterior no pueden permanecer activos.
- **RN-022:** El sistema no debe mezclar historiales, preferencias privadas ni datos de dos cuentas.
- **RN-023:** Cambiar de cuenta no permite elevar privilegios ni elegir un rol arbitrariamente.
- **RN-024:** Cada nueva autenticación debe validar el estado activo y los permisos de la cuenta seleccionada.

### Flujos alternos y excepciones

- El usuario cancela: permanece en la cuenta actual.
- Hay cambios sin guardar: el sistema solicita guardar o descartar antes de continuar.
- Falla el cierre de sesión: no debe permitir que dos identidades queden mezcladas; informar el problema y aplicar el procedimiento seguro.
- La nueva cuenta está inactiva: rechazar el acceso y mostrar el mensaje correspondiente.
- La nueva cuenta tiene otro rol: cargar exclusivamente las rutas y permisos de ese rol.

### Criterios de aceptación

- **CA-006.1:** El menú de cuenta diferencia “Cambiar de cuenta” de “Cerrar sesión” y “Editar perfil”.
- **CA-006.2:** El usuario puede cancelar el cambio sin perder la sesión actual.
- **CA-006.3:** Al confirmar, la sesión anterior finaliza.
- **CA-006.4:** El formulario de login no muestra la contraseña de la cuenta anterior.
- **CA-006.5:** La nueva cuenta se autentica de forma independiente.
- **CA-006.6:** El sistema redirige según el rol real de la nueva cuenta.
- **CA-006.7:** Ningún dato o permiso de la sesión anterior queda disponible para la nueva identidad.

### Situación observada en el frontend

En los componentes de autenticación revisados no se encontró evidencia suficiente para afirmar que exista un flujo completo de cambio de cuenta. Tampoco debe suponerse que cambiar de cuenta sea lo mismo que cerrar sesión. Se requiere inspeccionar y verificar el menú de usuario, encabezados, perfiles y navegación de cada rol.

**Brecha:** esta historia define el comportamiento requerido. Debe validarse contra los componentes de navegación existentes antes de marcarla como implementada.

---

## HU-007 — Restringir el acceso a módulos según autenticación y rol

**Épica:** EP-01 Gestión de identidad y acceso  
**Actor principal:** Usuario autenticado y sistema  
**Prioridad:** Crítica  
**Estado de implementación:** Por verificar de forma integral.

### Historia

Como usuario del sistema, quiero que SIGNA-TECH-APP me permita acceder únicamente a las funciones correspondientes a mi rol, para proteger la información y evitar acciones no autorizadas.

### Objetivo

Garantizar que la navegación, las páginas y las operaciones respeten la identidad y los permisos asignados a cada cuenta.

### Precondiciones

1. El usuario inició sesión.
2. La cuenta tiene un rol asignado.
3. El sistema dispone de una matriz de permisos aprobada.

### Requerimientos funcionales

- Un visitante no autenticado solo puede consultar rutas públicas.
- Un operador puede acceder a las funciones habilitadas para su rol.
- Un intérprete puede acceder a las herramientas de revisión, validación y corrección que le correspondan.
- Un administrador puede acceder a las funciones administrativas autorizadas.
- El sistema debe validar permisos tanto al presentar opciones de navegación como al ejecutar operaciones protegidas.
- Ocultar un botón no reemplaza la autorización del lado servidor.

### Flujo principal

1. El usuario solicita una ruta.
2. El sistema comprueba si la ruta es pública o protegida.
3. Si es pública, permite la consulta.
4. Si es protegida, verifica la sesión.
5. Si no existe sesión válida, redirige al login.
6. Si existe sesión, verifica el rol y permiso requerido.
7. Si está autorizado, presenta la pantalla.
8. Si no está autorizado, presenta una respuesta de acceso denegado y evita ejecutar la operación.

### Criterios de aceptación

- **CA-007.1:** Las rutas protegidas requieren sesión válida.
- **CA-007.2:** Cada módulo valida el rol y los permisos requeridos.
- **CA-007.3:** El acceso directo por URL no permite omitir controles.
- **CA-007.4:** Un usuario no autorizado recibe una respuesta controlada.
- **CA-007.5:** La interfaz no presenta acciones que el usuario no puede ejecutar, sin depender únicamente de esta ocultación para proteger datos.
- **CA-007.6:** La navegación después de autenticarse coincide con el rol real de la cuenta.

### Situación observada en el frontend

Se identificaron grupos de rutas y layouts diferenciados para operador y administrador, además de rutas de autenticación y páginas públicas. La autenticación local revisada realiza redirección por rol.

**Brecha:** la existencia de rutas separadas y redirecciones no demuestra protección completa del lado servidor. Se debe verificar el middleware, los layouts, los servicios y las operaciones protegidas.

---

# 6. Matriz de trazabilidad de la épica

| Historia | Capacidad | Pantalla o módulo relacionado | Estado observado |
|---|---|---|---|
| HU-001 | Presentación pública y entrada al producto | Inicio público | Ruta identificada; contenido por verificar |
| HU-002 | Autenticación | Login | Parcial / demostrativa |
| HU-003 | Solicitud de registro | Crear cuenta | Interfaz identificada; procesamiento pendiente |
| HU-004 | Recuperación de contraseña | Recuperar contraseña | Interfaz identificada; integración pendiente |
| HU-005 | Persistencia y cierre de sesión | Sesión / menú de cuenta | Persistencia local parcial; cierre por verificar |
| HU-006 | Sustitución de identidad | Menú de cuenta / login | Pendiente de verificación e implementación |
| HU-007 | Control de acceso por rol | Rutas y layouts protegidos | Por verificar integralmente |

# 7. Reglas transversales de calidad

1. **Accesibilidad:** todos los campos deben tener etiquetas; los botones deben tener nombres comprensibles; los errores deben poder identificarse sin depender únicamente del color.
2. **Diseño adaptable:** los formularios deben funcionar en dispositivos móviles y escritorio sin desbordamientos.
3. **Mensajes consistentes:** los mensajes deben indicar qué ocurrió y qué puede hacer el usuario, sin exponer datos sensibles.
4. **Seguridad:** las credenciales deben transmitirse mediante HTTPS y validarse en backend; las contraseñas deben almacenarse con hash seguro.
5. **Privacidad:** no se deben mostrar datos de una cuenta anterior después de cambiar de usuario.
6. **Trazabilidad:** los eventos relevantes de autenticación deben poder registrarse conforme a la política de auditoría y protección de datos.
7. **Usabilidad:** los formularios deben conservar los datos no sensibles ante errores cuando sea seguro, y evitar dobles envíos.
8. **Consistencia:** el nombre de las rutas, etiquetas y acciones debe mantenerse uniforme en toda la aplicación.

# 8. Dependencias y decisiones pendientes

Antes de cerrar esta épica para desarrollo y pruebas, el equipo debe confirmar:

1. Si el registro de operadores es abierto o requiere aprobación.
2. Qué datos adicionales son obligatorios para el registro, si los hay.
3. Cuál es la política de activación de cuentas nuevas.
4. Qué duración tendrá una sesión recordada y una sesión temporal.
5. Qué mecanismo de autenticación backend se utilizará.
6. Qué proveedor o servicio enviará los mensajes de recuperación.
7. Desde qué elemento visual se accederá a “Cambiar de cuenta”.
8. Si el cierre de sesión requerirá confirmación en todos los roles o solo cuando existan cambios pendientes.
9. Cuál será la matriz definitiva de permisos por rol.
10. Qué información de auditoría se conservará y durante cuánto tiempo.

Estas decisiones no deben resolverse mediante supuestos en el código ni en los criterios de aceptación.

# 9. Definición de terminado (DoD) de EP-01

La épica podrá considerarse terminada cuando:

- Las siete historias estén implementadas o formalmente excluidas del alcance mediante decisión del Product Owner.
- Los flujos de login, registro y recuperación hayan sido probados con escenarios exitosos y fallidos.
- La sesión se gestione con mecanismos seguros y tenga expiración definida.
- El cierre y cambio de cuenta eliminen correctamente la identidad anterior.
- Las rutas protegidas validen autenticación y permisos en servidor.
- Los mensajes de error y confirmación sean accesibles y consistentes.
- Se hayan ejecutado pruebas en móvil y escritorio.
- Los criterios de aceptación de cada historia estén verificados y exista evidencia de prueba.
- Las brechas demostrativas identificadas en el frontend hayan sido resueltas o aceptadas explícitamente como limitaciones del prototipo.

---

## 10. Control de cambios

| Versión | Cambio | Estado |
|---|---|---|
| 1.0 | Creación de historias de usuario de la épica de identidad y acceso, con separación entre evidencia del frontend y comportamiento requerido. | Inicial |

**Siguiente documento sugerido:** historias de usuario de EP-02 — Comunicación de voz y texto.
