# Historias de usuario — EP-02 Comunicación de voz y texto

> **Proyecto:** SIGNA-TECH-APP  
> **Documento:** 03 — Historias de usuario de comunicación de voz y texto  
> **Épica relacionada:** EP-02 Comunicación de voz y texto  
> **Versión:** 1.0  
> **Rama de referencia del producto:** `correcciones-de-color`  
> **Rama documental:** `documentacion-signa-tech-app`  
> **Estado documental:** especificación funcional contrastada con las vistas de voz a texto y texto a voz inspeccionadas.

---

## 1. Propósito y alcance

Este documento define los requisitos funcionales para las capacidades de comunicación de voz y texto dirigidas principalmente al operador. Se especifican dos flujos centrales:

1. **Voz a texto:** permitir que el usuario capture voz y obtenga una transcripción textual.
2. **Texto a voz:** permitir que el usuario escriba un mensaje y lo reproduzca mediante síntesis de voz.

También se documentan las acciones auxiliares que forman parte de esas pantallas: copiar, limpiar, detener, ajustar la velocidad, consultar el historial reciente y visualizar el estado del proceso.

La documentación diferencia explícitamente la interfaz existente de la capacidad real de procesamiento. En la vista Voz a Texto inspeccionada, los botones modifican estados locales y muestran un texto de ejemplo; no se encontró una integración con la API de reconocimiento de voz del navegador ni con un servicio de transcripción. En Texto a Voz sí se encontró uso de `SpeechSynthesisUtterance` y `window.speechSynthesis`, con idioma `es-CO`. El historial de esa vista se mantiene en estado local y está limitado a cuatro elementos.

Por tanto, la existencia de una pantalla o de un indicador visual no se considera evidencia suficiente de que exista reconocimiento automático, precisión de IA, almacenamiento permanente o procesamiento en servidor.

## 2. Referencias de implementación revisadas

**Archivos inspeccionados en la rama `correcciones-de-color`:**

- `SIGNA-TECH-APP-nextjs (1)/src/Features/Operador/Vistas/VistaVozATexto.jsx`
- `SIGNA-TECH-APP-nextjs (1)/src/Features/Operador/Vistas/VistaTextoAVoz.jsx`
- `SIGNA-TECH-APP-nextjs (1)/src/Features/Operador/Componentes/VisualizadorAudio.jsx`

**Hallazgos verificables:**

| Elemento | Evidencia observada | Estado |
|---|---|---|
| Pantalla Voz a Texto | Presenta control de captura, estado, contador de palabras, transcripción, copiar y limpiar | Interfaz implementada; transcripción real pendiente |
| Inicio de captura | Cambia el estado local a captura y sustituye el texto por un mensaje de escucha | Demostrativo |
| Detención de captura | Cambia el estado local a captura pausada | Demostrativo |
| Reconocimiento de voz | No se encontró uso de `SpeechRecognition`, `webkitSpeechRecognition` ni conexión a servicio de transcripción en el archivo revisado | No evidenciado |
| Copiar transcripción | Utiliza `navigator.clipboard.writeText` | Implementado en frontend, sujeto a permisos del navegador |
| Pantalla Texto a Voz | Incluye textarea, contador, control de velocidad, reproducir, detener, copiar, limpiar e historial | Implementada en frontend |
| Síntesis de voz | Utiliza `SpeechSynthesisUtterance`, idioma `es-CO` y `window.speechSynthesis` | Implementada en navegador |
| Velocidad | Rango de 0.5 a 1.5, con incrementos de 0.1 | Implementada en frontend |
| Historial | Conserva hasta cuatro reproducciones en estado React | Temporal; no persistente |
| Visualizador de audio | Renderiza barras animadas con clases CSS | Decorativo; no demuestra medición real del audio |

El análisis se limita a los archivos listados. Las integraciones con backend, modelos de IA, servicios externos o persistencia deben verificarse en otros componentes antes de considerarse existentes.

## 3. Actores y términos

| Término | Descripción |
|---|---|
| Operador | Usuario que utiliza las herramientas de comunicación de la aplicación. |
| Voz a texto | Conversión de una entrada de voz a una representación textual. |
| Texto a voz | Lectura de un texto mediante un sintetizador de voz. |
| Captura | Periodo durante el cual el sistema recibe audio del micrófono. |
| Transcripción | Texto producido a partir del reconocimiento de voz. |
| Síntesis | Generación de voz a partir de un texto escrito. |
| Historial reciente | Lista temporal de los últimos textos enviados a reproducción en la sesión actual de la vista. |
| Visualizador | Recurso gráfico que comunica visualmente un estado; no equivale por sí mismo a una medición técnica. |

## 4. Convenciones de estado

- **Implementada en frontend:** existe comportamiento verificable en el navegador, aunque no necesariamente persistencia o backend.
- **Parcial:** existe una parte del flujo, pero faltan capacidades necesarias para cumplir el objetivo completo.
- **Demostrativa:** la interfaz simula un resultado o cambia estados locales sin ejecutar el procesamiento esperado.
- **Pendiente:** la capacidad no se encontró en los archivos inspeccionados.
- **Por verificar:** requiere inspección de otros archivos o pruebas de ejecución para confirmar su alcance.

---

# 5. Historias de usuario

## HU-008 — Convertir voz capturada en texto

**Épica:** EP-02 Comunicación de voz y texto  
**Actor principal:** Operador  
**Prioridad:** Alta  
**Estado de implementación:** Parcial; interfaz demostrativa, reconocimiento de voz real no evidenciado.

### Historia

Como operador, quiero hablar frente al micrófono y obtener una transcripción en texto, para comunicar mis mensajes a otra persona sin depender exclusivamente de la voz.

### Objetivo

Proporcionar una herramienta de reconocimiento de voz que capture audio autorizado por el usuario, procese la entrada y presente el resultado textual de forma clara, controlable y accesible.

### Precondiciones

1. El operador inició sesión y tiene acceso al módulo.
2. El navegador y el dispositivo disponen de un micrófono compatible.
3. La aplicación se ejecuta en un contexto donde el navegador permita solicitar acceso al micrófono.
4. El usuario ha otorgado el permiso de captura cuando el navegador lo solicite.
5. La integración de reconocimiento de voz debe estar configurada para el idioma aprobado por el producto; para el contexto colombiano se debe priorizar español de Colombia cuando el motor lo soporte.

### Pantalla y componentes

**A. Encabezado “Voz a Texto”**
- Mostrar el título “Voz a Texto”.
- Explicar brevemente que la herramienta convierte voz en texto.
- Mostrar una tarjeta de estado del micrófono.
- El estado debe distinguir, como mínimo: listo, solicitando permiso, escuchando, procesando, pausado/detenido y error.
- No presentar un indicador como “98 % de precisión” como métrica real si no existe una medición respaldada por el motor y por pruebas documentadas.

**B. Tarjetas de indicadores**
- Estado: indicar si la captura está activa o en espera.
- Palabras: mostrar el número de palabras de la transcripción útil, excluyendo mensajes de ayuda o placeholders.
- Precisión: solo debe mostrarse si existe una fuente real de confianza o métrica; en caso contrario debe eliminarse o rotularse claramente como dato ilustrativo no operativo.

**C. Panel “Control de captura”**
- Mostrar una explicación breve para activar el micrófono.
- Mostrar un icono de micrófono y el estado textual.
- Mostrar el visualizador de audio únicamente como apoyo visual. Si se pretende representar volumen o señal real, deberá conectarse a datos de audio reales.
- Incluir botón “Iniciar captura”.
- Incluir botón “Detener”.
- “Iniciar captura” debe deshabilitarse mientras la captura esté activa o mientras exista una solicitud en curso.
- “Detener” debe habilitarse únicamente cuando exista una captura activa.

**D. Panel “Transcripción en vivo”**
- Mostrar el texto reconocido en un área legible y de alto contraste.
- Diferenciar el texto reconocido del texto provisional o parcial cuando el motor lo permita.
- Mostrar un indicador de procesamiento que refleje el estado técnico real.
- Incluir botón “Copiar texto”.
- Incluir botón “Limpiar”.
- Cuando no exista transcripción, mostrar una indicación vacía, por ejemplo: “La transcripción aparecerá aquí cuando inicies una captura de voz”.

**E. Orientaciones de uso**
- Mostrar recomendaciones breves para hablar con claridad, mantener una distancia apropiada del micrófono y revisar el texto generado.
- Estas recomendaciones no deben sustituir mensajes de error o instrucciones necesarias para resolver fallos.

### Flujo principal

1. El operador abre la opción “Voz a Texto”.
2. El sistema muestra la pantalla en estado “En espera”.
3. El operador selecciona “Iniciar captura”.
4. El navegador solicita permiso de micrófono si todavía no existe autorización.
5. El operador concede el permiso.
6. El sistema inicia el reconocimiento de voz.
7. La pantalla cambia a estado “Escuchando” y el control de inicio queda deshabilitado.
8. El operador pronuncia una frase.
9. El motor procesa la entrada y entrega texto parcial o final.
10. El sistema presenta la transcripción en el área correspondiente.
11. El contador de palabras se actualiza con el contenido reconocido.
12. El operador puede continuar hablando o seleccionar “Detener”.
13. Al detener, el sistema finaliza la captura y conserva visible el texto obtenido durante la sesión.
14. El operador puede copiar el resultado o limpiarlo para iniciar una nueva transcripción.

### Flujos alternos y excepciones

- **Permiso denegado:** informar que el acceso al micrófono fue rechazado y explicar cómo habilitarlo desde los permisos del navegador o dispositivo. No simular una captura activa.
- **Micrófono inexistente o no disponible:** informar que no se encontró un dispositivo de entrada compatible.
- **Micrófono ocupado:** indicar que otra aplicación puede estar utilizando el dispositivo y permitir reintentar.
- **Error del motor de reconocimiento:** detener el estado de escucha, conservar el texto previamente reconocido y mostrar un mensaje comprensible.
- **Sin voz detectada:** informar que no se detectó voz y permitir continuar o reintentar, según el comportamiento del motor.
- **Conexión interrumpida:** si el reconocimiento depende de un servicio remoto, informar la interrupción y no presentar texto como confirmado cuando no haya sido recibido.
- **Captura detenida sin resultados:** mostrar el estado vacío con una orientación para volver a intentar.
- **Texto parcial:** identificarlo como provisional si el motor puede modificarlo antes del resultado final.
- **Salida de la pantalla:** detener la captura y liberar los recursos del micrófono para evitar que continúe grabando fuera del módulo.
- **Fallo al copiar:** informar que no fue posible copiar y mantener el contenido disponible para selección manual.

### Reglas de negocio

- **RN-008.1:** La captura de audio solo puede comenzar después de una acción explícita del operador.
- **RN-008.2:** La aplicación debe solicitar y respetar los permisos del navegador para acceder al micrófono.
- **RN-008.3:** El sistema no debe indicar que está escuchando si el motor no ha confirmado el inicio de la captura.
- **RN-008.4:** El texto mostrado como transcripción debe provenir del motor de reconocimiento; los mensajes de orientación no cuentan como resultado.
- **RN-008.5:** El usuario debe poder detener la captura en cualquier momento.
- **RN-008.6:** Al detener o abandonar la vista se deben liberar los recursos de captura.
- **RN-008.7:** Los errores no deben borrar automáticamente el texto válido ya obtenido.
- **RN-008.8:** La métrica de precisión solo puede presentarse si su cálculo, fuente y alcance están documentados.
- **RN-008.9:** El tratamiento, almacenamiento y eventual envío del audio deben ajustarse a la política de privacidad aprobada; no se debe almacenar audio sin informar al usuario y contar con la base de autorización correspondiente.

### Criterios de aceptación

- **CA-008.1:** Al entrar a la vista, el sistema presenta el estado inicial “En espera”.
- **CA-008.2:** Al seleccionar “Iniciar captura”, se solicita el permiso de micrófono cuando corresponda.
- **CA-008.3:** Si el usuario deniega el permiso, se presenta un mensaje y no se activa el estado “Escuchando”.
- **CA-008.4:** Con permiso concedido y motor disponible, el sistema inicia la captura y refleja el estado real.
- **CA-008.5:** La voz reconocida se muestra como texto en el área de transcripción.
- **CA-008.6:** El contador de palabras se actualiza con el texto reconocido y no cuenta el placeholder.
- **CA-008.7:** Mientras la captura esté activa, “Iniciar captura” no permite iniciar procesos duplicados.
- **CA-008.8:** “Detener” finaliza la captura y deja visible el texto reconocido.
- **CA-008.9:** “Limpiar” elimina el contenido de la transcripción y restablece los indicadores asociados, sin dejar una captura activa.
- **CA-008.10:** “Copiar texto” copia el contenido útil y comunica el resultado de la operación.
- **CA-008.11:** Si ocurre un error, el sistema muestra una explicación y conserva el texto previamente reconocido.
- **CA-008.12:** Al salir de la pantalla, el micrófono deja de utilizarse.
- **CA-008.13:** Los controles se pueden identificar y operar con teclado y tecnologías de asistencia.
- **CA-008.14:** La interfaz se adapta a escritorio y dispositivos móviles sin ocultar las acciones principales.

### Brecha frente al código observado

La vista `VistaVozATexto.jsx` implementa estados locales para iniciar, detener y limpiar. Al iniciar, reemplaza el contenido por un mensaje fijo de escucha; no se encontró una API de reconocimiento de voz ni un servicio de transcripción en el archivo inspeccionado. Por ello, el flujo de captura y transcripción real permanece pendiente. La acción de copiar sí utiliza el portapapeles del navegador. El componente `VisualizadorAudio.jsx` presenta barras animadas mediante CSS y no evidencia análisis de señal real.

---

## HU-009 — Convertir texto escrito en voz

**Épica:** EP-02 Comunicación de voz y texto  
**Actor principal:** Operador  
**Prioridad:** Alta  
**Estado de implementación:** Parcialmente implementada en frontend mediante la API de síntesis de voz del navegador.

### Historia

Como operador, quiero escribir un mensaje y reproducirlo como voz, para comunicarme oralmente con otras personas cuando no pueda o no desee hablar.

### Objetivo

Permitir que el operador redacte un mensaje y escuche su contenido mediante el sintetizador de voz disponible en el dispositivo, con controles de reproducción y velocidad.

### Precondiciones

1. El operador inició sesión y tiene acceso al módulo.
2. El navegador es compatible con la API de síntesis de voz o dispone de un mecanismo equivalente.
3. El dispositivo tiene una salida de audio disponible y no está silenciada.
4. El usuario puede ingresar texto en el campo habilitado.

### Pantalla y componentes

**A. Encabezado “Texto a Voz”**
- Mostrar el título “Texto a Voz”.
- Explicar que el mensaje escrito se convertirá en audio.
- Mostrar un indicador del sintetizador con estados “Listo para usar” y “Reproduciendo”, o equivalentes fieles al estado real.

**B. Tarjetas de indicadores**
- Caracteres: número de caracteres escritos.
- Palabras: número de palabras del mensaje.
- Velocidad: valor actual del control, expresado como multiplicador (por ejemplo, 1.0x).

**C. Panel “Mensaje a sintetizar”**
- Incluir un área de texto con etiqueta accesible “Mensaje a sintetizar”.
- Mostrar un placeholder que invite a escribir una frase.
- Aplicar un máximo de 500 caracteres en la versión actual de la interfaz; cualquier cambio de límite debe aprobarse y reflejarse en validaciones y pruebas.
- Actualizar los contadores mientras el usuario escribe.
- Mostrar el estado de reproducción.

**D. Control “Velocidad de lectura”**
- Presentar un control deslizante.
- Valor mínimo: 0.5.
- Valor máximo: 1.5.
- Incremento: 0.1.
- Mostrar el valor seleccionado numéricamente.
- Aclarar los extremos “Lento” y “Rápido”, con referencia visual de “Normal”.
- Aplicar la velocidad seleccionada a la siguiente reproducción y, si el diseño lo permite, a una reproducción en curso únicamente si la API soporta ese cambio sin reiniciar.

**E. Acciones**
- “Reproducir audio”: inicia la síntesis del texto no vacío.
- “Detener”: cancela la reproducción activa.
- “Copiar texto”: copia el mensaje escrito.
- “Limpiar”: detiene la reproducción si está activa, elimina el texto y restablece los estados de la vista.

**F. Panel “Salida de audio”**
- Mostrar un indicador gráfico y el estado actual del sintetizador.
- Mostrar el visualizador como elemento auxiliar; no debe presentarse como medición de volumen si no está conectado a una fuente de audio.
- Mostrar “Historial reciente”.
- Cada elemento del historial debe mostrar el texto reproducido y la hora registrada.
- Cuando no haya elementos, mostrar un estado vacío: “Aún no hay reproducciones”.

### Flujo principal

1. El operador abre la opción “Texto a Voz”.
2. El sistema muestra el campo vacío, contadores en cero, velocidad inicial de 1.0x y sintetizador en espera.
3. El operador escribe un mensaje de hasta 500 caracteres.
4. El sistema actualiza los contadores de caracteres y palabras.
5. El operador ajusta la velocidad si lo necesita.
6. El operador selecciona “Reproducir audio”.
7. El sistema valida que el texto no esté vacío después de eliminar espacios al inicio y al final.
8. El sistema cancela una reproducción anterior si existe y prepara una nueva instancia de síntesis.
9. El sistema configura el idioma español de Colombia (`es-CO`) y la velocidad seleccionada.
10. El navegador reproduce el mensaje.
11. La interfaz indica que el audio está reproduciéndose y deshabilita la acción de iniciar otra reproducción simultánea.
12. Al finalizar, el sistema cambia el estado a “Reproducción finalizada”.
13. El sistema agrega el mensaje al historial reciente.
14. El operador puede reproducir otro texto, copiar el contenido o limpiar el formulario.

### Flujos alternos y excepciones

- **Texto vacío:** no iniciar la síntesis y mostrar “Escribe un mensaje antes de reproducir”.
- **Solo espacios:** tratar el contenido como vacío.
- **Límite de caracteres:** impedir que se escriban más de 500 caracteres y mantener actualizado el contador.
- **Síntesis no disponible:** informar que el navegador o dispositivo no ofrece la función.
- **Error de reproducción:** detener el indicador, mostrar “No se pudo reproducir el audio” o un mensaje equivalente y permitir reintentar.
- **Reproducción cancelada:** reflejar el estado de espera o cancelación sin registrar como finalizada una reproducción que no terminó.
- **Dispositivo sin salida audible:** informar que la aplicación no puede garantizar que el sonido se escuche; no declarar éxito acústico basándose únicamente en que la API aceptó la solicitud.
- **Cambio de pantalla:** cancelar la síntesis activa al desmontar la vista para evitar que el audio continúe inesperadamente.
- **Fallo al copiar:** informar el problema y permitir seleccionar manualmente el texto.
- **Historial vacío:** presentar el mensaje de estado vacío, sin errores ni elementos ficticios.

### Reglas de negocio

- **RN-009.1:** No se permite iniciar la síntesis con un texto vacío o compuesto únicamente por espacios.
- **RN-009.2:** El contenido debe respetar el límite de caracteres aprobado para el campo.
- **RN-009.3:** La velocidad debe mantenerse dentro del rango permitido de 0.5 a 1.5, con pasos de 0.1, salvo que una decisión de producto modifique estos valores.
- **RN-009.4:** La síntesis debe usar español de Colombia (`es-CO`) cuando exista una voz compatible; si no está disponible, debe comunicarse la limitación o aplicarse una alternativa aprobada.
- **RN-009.5:** No deben ejecutarse dos reproducciones simultáneas desde esta vista.
- **RN-009.6:** La acción “Detener” debe cancelar la reproducción activa.
- **RN-009.7:** El historial reciente de la implementación actual contiene como máximo cuatro elementos y se mantiene en memoria de la vista; no debe anunciarse como historial permanente.
- **RN-009.8:** Al limpiar el formulario se debe cancelar cualquier reproducción activa antes de restablecer el contenido.
- **RN-009.9:** La aplicación debe comunicar errores de síntesis sin perder innecesariamente el texto que el usuario escribió.

### Criterios de aceptación

- **CA-009.1:** La vista presenta el campo de texto vacío y los indicadores iniciales.
- **CA-009.2:** El contador de caracteres cambia conforme el usuario escribe.
- **CA-009.3:** El contador de palabras calcula correctamente el contenido, ignorando espacios sobrantes.
- **CA-009.4:** El campo impide superar el máximo de 500 caracteres.
- **CA-009.5:** El control de velocidad permite seleccionar valores desde 0.5 hasta 1.5 en incrementos de 0.1.
- **CA-009.6:** Al reproducir texto válido, el navegador recibe una solicitud de síntesis con idioma `es-CO` y velocidad seleccionada.
- **CA-009.7:** Si el texto está vacío, la reproducción no inicia y se muestra el mensaje de validación.
- **CA-009.8:** Durante la reproducción, el indicador refleja el estado y se evita iniciar otra reproducción desde el mismo control.
- **CA-009.9:** “Detener” cancela la síntesis y restablece el estado correspondiente.
- **CA-009.10:** Al terminar correctamente, la interfaz informa que la reproducción finalizó.
- **CA-009.11:** Si el sintetizador genera un error, se informa al usuario y se permite reintentar.
- **CA-009.12:** El historial agrega el texto enviado a reproducción y su hora, conservando como máximo cuatro elementos en la implementación actual.
- **CA-009.13:** “Copiar texto” copia el contenido cuando no está vacío y muestra confirmación.
- **CA-009.14:** “Limpiar” detiene la reproducción activa, vacía el campo y restablece los contadores.
- **CA-009.15:** Al abandonar la vista, la síntesis activa se cancela.
- **CA-009.16:** La pantalla es operable en dispositivos móviles y mediante tecnologías de asistencia.

### Brecha frente al código observado

La vista `VistaTextoAVoz.jsx` implementa la síntesis mediante `SpeechSynthesisUtterance`, asigna `es-CO`, aplica la velocidad seleccionada, permite reproducir, detener, copiar y limpiar, y registra hasta cuatro elementos en un historial local. El historial no se persiste en una base de datos ni se recupera después de desmontar la vista o recargar la aplicación. La disponibilidad de voces depende del navegador y del dispositivo. Deben realizarse pruebas en los navegadores objetivo para validar compatibilidad, selección de voz y comportamiento real del audio.

---

## HU-010 — Administrar el contenido y consultar el historial reciente de comunicación por texto

**Épica:** EP-02 Comunicación de voz y texto  
**Actor principal:** Operador  
**Prioridad:** Media  
**Estado de implementación:** Parcialmente implementada en frontend; las acciones de copiar y limpiar existen en ambas vistas, y el historial existe únicamente en Texto a Voz.

### Historia

Como operador, quiero revisar, copiar y limpiar el contenido de mis conversiones de voz y texto, y consultar las reproducciones recientes, para reutilizar mis mensajes y mantener organizada la comunicación durante la sesión.

### Objetivo

Facilitar el uso práctico de los resultados generados por las herramientas de comunicación, evitando que el usuario tenga que volver a escribir o recordar mensajes recientes.

### Precondiciones

1. El operador se encuentra en una de las vistas de comunicación de voz o texto.
2. Existe contenido de texto para copiar o limpiar, o elementos previos en el historial de Texto a Voz.
3. El navegador permite el uso del portapapeles o dispone de un mecanismo alternativo.

### Elementos de pantalla

**A. Acciones sobre el texto**
- “Copiar texto”: copia el contenido textual disponible.
- “Limpiar”: elimina el contenido de la vista y restablece los indicadores relacionados.
- La confirmación de copiado debe mostrarse de forma temporal y accesible.
- Si el contenido está vacío, la aplicación debe explicar que no hay texto para copiar.

**B. Historial reciente de Texto a Voz**
- Mostrar una lista de mensajes reproducidos recientemente.
- Cada elemento debe presentar el texto y la hora registrada.
- Mostrar un estado vacío cuando todavía no existan reproducciones.
- Mantener el límite actual de cuatro elementos mientras no se apruebe otro comportamiento.
- El historial debe identificarse como temporal mientras no exista persistencia.

**C. Estado de la operación**
- Mostrar confirmación al copiar.
- Mostrar error cuando el navegador no permita copiar.
- Mostrar el estado de espera después de limpiar.
- No confundir el historial de reproducciones con un historial general de conversaciones.

### Flujo principal — Copiar texto

1. El operador genera o escribe un texto.
2. Selecciona “Copiar texto”.
3. El sistema comprueba que exista contenido útil.
4. El sistema solicita al navegador copiar el texto al portapapeles.
5. Si la operación termina correctamente, muestra una confirmación temporal.
6. El contenido original permanece visible.

### Flujo principal — Limpiar

1. El operador selecciona “Limpiar”.
2. Si existe una reproducción activa, el sistema la detiene antes de limpiar.
3. El sistema elimina el contenido de la vista correspondiente.
4. El sistema restablece los contadores, indicadores y mensajes temporales.
5. La vista queda preparada para una nueva operación.

### Flujo principal — Consultar historial reciente

1. El operador abre la vista Texto a Voz.
2. El sistema consulta el historial temporal disponible en el estado de la vista.
3. Si existen elementos, presenta hasta cuatro reproducciones con su hora.
4. Si no existen elementos, muestra “Aún no hay reproducciones”.
5. Al realizar una nueva reproducción, el sistema agrega el nuevo elemento al inicio de la lista y retira el más antiguo cuando se supera el límite.

### Flujos alternos y excepciones

- **Portapapeles no disponible:** informar que no se pudo copiar y conservar el texto visible.
- **Permiso de portapapeles denegado:** informar el resultado y permitir selección manual.
- **Texto vacío:** no intentar copiar y mostrar una indicación clara.
- **Limpieza durante reproducción:** cancelar primero el audio y después borrar el texto.
- **Historial sin datos:** presentar el estado vacío sin generar elementos ficticios.
- **Recarga o salida de la vista:** el historial local puede perderse; debe informarse como limitación hasta que exista persistencia.
- **Texto extenso en historial:** limitar visualmente la cantidad de líneas mostradas sin alterar el contenido íntegro almacenado en el estado local.

### Reglas de negocio

- **RN-010.1:** Copiar no debe modificar ni borrar el contenido original.
- **RN-010.2:** Solo se debe confirmar una copia cuando la operación del portapapeles se complete correctamente.
- **RN-010.3:** Si el portapapeles falla, el contenido debe permanecer disponible en pantalla.
- **RN-010.4:** Limpiar debe detener cualquier síntesis activa antes de eliminar el texto.
- **RN-010.5:** El historial actual corresponde únicamente a reproducciones de Texto a Voz, no a transcripciones de Voz a Texto.
- **RN-010.6:** El historial actual conserva como máximo cuatro elementos y es temporal.
- **RN-010.7:** No se debe presentar el historial local como almacenamiento permanente, sincronizado o compartido entre dispositivos.
- **RN-010.8:** Si en una versión futura se requiere historial persistente, deberán definirse permisos, retención, eliminación y protección de los mensajes.

### Criterios de aceptación

- **CA-010.1:** El usuario puede copiar el texto no vacío desde Voz a Texto.
- **CA-010.2:** El usuario puede copiar el texto no vacío desde Texto a Voz.
- **CA-010.3:** La interfaz muestra confirmación solo cuando el portapapeles acepta la operación.
- **CA-010.4:** Ante un fallo de copia, el texto permanece visible y se informa el problema.
- **CA-010.5:** La acción “Limpiar” elimina el contenido de la vista correspondiente.
- **CA-010.6:** En Texto a Voz, limpiar cancela una reproducción activa antes de vaciar el campo.
- **CA-010.7:** El historial muestra el texto y la hora de cada reproducción registrada.
- **CA-010.8:** El historial presenta como máximo cuatro elementos en la implementación actual.
- **CA-010.9:** Cuando no hay reproducciones, se muestra el estado vacío definido.
- **CA-010.10:** La interfaz no afirma que el historial sea permanente.
- **CA-010.11:** Los mensajes de confirmación y error son comprensibles y accesibles.

### Brecha frente al código observado

En Voz a Texto y Texto a Voz se encontró copia mediante `navigator.clipboard.writeText` y acción de limpieza. La vista Texto a Voz mantiene un arreglo local de hasta cuatro reproducciones con hora. No se encontró persistencia del historial ni un historial compartido entre las dos vistas. En Voz a Texto, el botón de limpiar restablece el texto y el estado local; no existe una transcripción real que administrar hasta que se integre el reconocimiento de voz.

---

# 6. Reglas de negocio transversales de EP-02

- **RN-EP02-01 — Consentimiento de captura:** el micrófono solo se activa mediante una acción explícita del usuario y respetando los permisos del navegador.
- **RN-EP02-02 — Veracidad del estado:** los indicadores de escucha, procesamiento y reproducción deben representar estados técnicos reales, no únicamente cambios visuales.
- **RN-EP02-03 — Idioma:** la síntesis de voz debe solicitar español de Colombia (`es-CO`) cuando el dispositivo disponga de una voz compatible. El idioma y la disponibilidad del reconocimiento de voz deberán definirse en la integración correspondiente.
- **RN-EP02-04 — Control del usuario:** el operador puede detener la captura o la reproducción y limpiar el contenido.
- **RN-EP02-05 — Conservación ante errores:** un error no debe eliminar el texto válido que el usuario ya haya escrito o recibido.
- **RN-EP02-06 — Accesibilidad:** los controles deben tener etiquetas, estados comprensibles, contraste suficiente y operación por teclado.
- **RN-EP02-07 — Privacidad:** no se debe almacenar ni transmitir audio o texto de comunicación sin definir finalidad, autorización, acceso, retención y eliminación.
- **RN-EP02-08 — Compatibilidad:** las APIs de micrófono, portapapeles y síntesis deben probarse en los navegadores y dispositivos que el producto declare compatibles.
- **RN-EP02-09 — Indicadores honestos:** no se mostrarán porcentajes de precisión, mediciones de volumen ni estados de IA sin una fuente técnica verificable.
- **RN-EP02-10 — Recursos del dispositivo:** al detener o abandonar una vista se deben liberar micrófono, reproducción y demás recursos que permanezcan activos.

# 7. Trazabilidad

| ID de historia | Épica | Vista o componente de referencia | Capacidad principal | Estado observado |
|---|---|---|---|---|
| HU-008 | EP-02 | `VistaVozATexto.jsx` | Captura y transcripción de voz | Interfaz demostrativa; reconocimiento real pendiente |
| HU-009 | EP-02 | `VistaTextoAVoz.jsx` | Síntesis de texto a voz | Implementada en frontend; compatibilidad por validar |
| HU-010 | EP-02 | `VistaVozATexto.jsx`, `VistaTextoAVoz.jsx` | Copiar, limpiar e historial reciente | Parcial; historial local solo en Texto a Voz |
| Transversal | EP-02 | `VisualizadorAudio.jsx` | Indicador visual de actividad | Animación decorativa, no medición real |

**Relación con los requisitos:** estas historias desarrollan la capacidad de comunicación mediante voz y texto descrita en la épica EP-02. Los requisitos de reconocimiento de señas, traducción a LSC, administración de diccionario y validación de señas pertenecen a otras épicas y no deben mezclarse con este alcance.

# 8. Dependencias y consideraciones técnicas

1. **Reconocimiento de voz:** seleccionar e integrar una tecnología compatible con los navegadores objetivo. Definir si el procesamiento será local o remoto, sus requisitos de conectividad, soporte de idioma, límites y manejo de errores.
2. **Permisos de micrófono:** implementar solicitud, comprobación, denegación y liberación del dispositivo.
3. **Síntesis de voz:** validar disponibilidad de voces en español de Colombia en los dispositivos objetivo y definir comportamiento alternativo.
4. **Portapapeles:** probar permisos y disponibilidad en contextos seguros y navegadores móviles.
5. **Privacidad:** definir si el audio se procesa en el dispositivo o se envía a un servicio, cuánto tiempo se conserva y quién puede acceder.
6. **Pruebas:** incluir pruebas funcionales, de accesibilidad, compatibilidad y manejo de errores con dispositivos reales.

# 9. Definición de Terminado (DoD) para EP-02

Una historia de esta épica podrá considerarse terminada cuando:

- [ ] El comportamiento funcional esté implementado y corresponda a la historia aprobada.
- [ ] Los controles de pantalla tengan acciones reales y estados coherentes.
- [ ] Las validaciones de campos, límites y permisos estén implementadas.
- [ ] Los flujos alternos y excepciones definidos cuenten con tratamiento verificable.
- [ ] La captura o reproducción pueda detenerse de forma segura.
- [ ] Los recursos del micrófono y del sintetizador se liberen al finalizar o abandonar la vista.
- [ ] No existan indicadores o métricas ficticias presentadas como resultados reales.
- [ ] Se hayan probado los navegadores y dispositivos incluidos en el alcance del producto.
- [ ] Se hayan ejecutado pruebas de accesibilidad para teclado, etiquetas, foco, contraste y mensajes de estado.
- [ ] Se hayan validado los criterios de aceptación con evidencia de pruebas.
- [ ] Se haya revisado el tratamiento de datos de audio y texto frente a las reglas de privacidad.
- [ ] El código haya pasado revisión y no introduzca regresiones en la navegación o en los módulos existentes.
- [ ] La documentación y la trazabilidad se encuentren actualizadas.

# 10. Pendientes de producto y decisiones que deben cerrarse

1. Definir la tecnología de reconocimiento de voz y confirmar soporte real para español de Colombia.
2. Determinar si la transcripción debe funcionar sin conexión o si puede depender de un servicio remoto.
3. Definir si el texto transcrito debe poder editarse antes de copiarse o compartirse.
4. Definir si el historial será temporal, persistente por usuario o parte de un historial general de comunicación.
5. Definir si el usuario podrá seleccionar distintas voces o únicamente utilizar la voz predeterminada del dispositivo.
6. Confirmar los navegadores y dispositivos oficialmente soportados.
7. Revisar si el indicador de precisión mostrado actualmente debe eliminarse o reemplazarse por una métrica respaldada.
8. Definir límites de duración de captura, tamaño de transcripción y tratamiento de sesiones prolongadas.

---

## 11. Control de cambios

| Versión | Cambio | Estado |
|---|---|---|
| 1.0 | Creación de las historias HU-008 a HU-010 con análisis de las vistas Voz a Texto y Texto a Voz | Primera versión |

**Nota de alcance:** este documento describe requisitos verificables y brechas observadas en los archivos inspeccionados. No certifica que las funciones pendientes estén disponibles en producción ni reemplaza las pruebas de integración del sistema completo.
