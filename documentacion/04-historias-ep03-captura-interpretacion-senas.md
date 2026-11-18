# Historias de usuario — EP-03 Captura e interpretación de señas

> **Proyecto:** SIGNA-TECH-APP  
> **Documento:** 04 — Historias de usuario de captura e interpretación de señas  
> **Épica relacionada:** EP-03 Captura e interpretación de señas  
> **Versión:** 1.0  
> **Rama de referencia del producto:** `correcciones-de-color`  
> **Rama documental:** `documentacion-signa-tech-app`  
> **Estado documental:** especificación funcional basada en la inspección de la vista de cámara y sus componentes relacionados.

---

## 1. Propósito y alcance

Este documento especifica la experiencia del operador para habilitar una cámara, visualizar la captura de manos y recibir el resultado de una interpretación de señas. Incluye el control de conexión, permisos, vista previa de video, estados de señal, desconexión, selección del modo de salida y tratamiento de fallos de captura.

La finalidad del producto es apoyar la comunicación básica mediante contenidos de Lengua de Señas Colombiana (LSC). La interpretación automática debe limitarse al vocabulario, expresiones y condiciones de captura que hayan sido validados para el alcance del prototipo. No se debe prometer traducción general de conversaciones complejas ni interpretación perfecta de cualquier seña.

**Distinción esencial entre interfaz y capacidad real:** en la vista revisada se encontró acceso real a la cámara mediante `navigator.mediaDevices.getUserMedia`, reproducción del flujo en un elemento `video` y liberación de las pistas al desconectar o desmontar la vista. Sin embargo, no se encontró un modelo de visión artificial, detector de manos, clasificador de señas ni servicio de interpretación LSC. Los valores de FPS y frames se incrementan mediante un intervalo local y no proceden de una medición de los fotogramas reales. El texto que indica que se están interpretando gestos es un mensaje fijo de interfaz.

Por tanto, la captura de video está parcialmente implementada en frontend, pero la interpretación automática real permanece pendiente de integración y validación.

## 2. Referencias de implementación revisadas

**Archivos inspeccionados en la rama `correcciones-de-color`:**

- `SIGNA-TECH-APP-nextjs (1)/src/Features/Operador/Vistas/VistaDeteccionCamara.jsx`
- `SIGNA-TECH-APP-nextjs (1)/src/Features/Operador/Componentes/SelectorModoSalida.jsx`

**Hallazgos verificables:**

| Elemento | Evidencia observada | Estado |
|---|---|---|
| Acceso a cámara | Solicita flujo de video con `getUserMedia`, resolución ideal 1280 × 720 y audio desactivado | Implementado en frontend |
| Vista previa | Asigna el flujo a `video.srcObject` y presenta el video | Implementado en frontend |
| Permisos | Si la solicitud falla, muestra un mensaje general de permisos/cámara | Parcial; no clasifica causas |
| Vincular gafas | El botón ejecuta la solicitud de cámara del navegador | El rótulo “gafas” no demuestra integración con hardware OV5640 específico |
| Desconectar | Detiene las pistas del flujo, limpia `srcObject` y restablece parte del estado | Implementado en frontend |
| Liberación al salir | El efecto de desmontaje detiene las pistas del flujo asociado al video | Implementado en frontend |
| FPS y frames | Se actualizan con un intervalo de un segundo mientras `conectado` es verdadero | Indicadores simulados; no son métricas reales |
| Interpretación LSC | Se modifica un texto fijo al conectar; no se encontró un modelo ni servicio de reconocimiento | Pendiente |
| Modo de salida | Selector local con opciones Texto y Voz | Selector implementado; salida de voz interpretada no evidenciada |
| Mensajes de cámara | Maneja navegador sin `getUserMedia` y fallo de solicitud | Parcial; faltan escenarios específicos y recuperación detallada |

El archivo `SelectorModoSalida.jsx` solo cambia el modo seleccionado entre `texto` y `escuchar`. En la vista, el modo Voz presenta un mensaje de que el sintetizador está listo, pero no se encontró en ese flujo una invocación de síntesis que convierta el resultado interpretado en audio.

No se inspeccionó en esta revisión un modelo de IA ni un servicio remoto de interpretación. La ausencia de evidencia en estos archivos no permite afirmar que no exista en otra parte del repositorio; sí impide certificarlo como integrado en esta vista.

## 3. Actores y términos

| Término | Descripción |
|---|---|
| Operador | Usuario que utiliza la cámara para apoyar la comunicación mediante señas. |
| Cámara | Dispositivo de captura de video autorizado por el navegador. |
| Flujo de video | Secuencia de imagen entregada por el dispositivo al navegador. |
| Captura activa | Estado en el que el navegador mantiene una pista de video habilitada. |
| Interpretación LSC | Proceso que analiza los movimientos y configuraciones de las manos y produce un resultado textual o equivalente, mediante un modelo validado. |
| Modo de salida | Preferencia para presentar el resultado interpretado como texto o voz. |
| Calidad de captura | Condiciones de iluminación, enfoque, encuadre, estabilidad y visibilidad necesarias para interpretar las señas. |
| Sensor OV5640 | Referencia visual presente en la interfaz; no se considera evidencia de conexión física a ese sensor específico. |

## 4. Convenciones de estado

- **Implementada en frontend:** comportamiento comprobable mediante APIs del navegador o estado local.
- **Parcial:** existe captura o interfaz, pero faltan partes del flujo requerido.
- **Demostrativa:** presenta mensajes o métricas simuladas sin procesamiento real.
- **Pendiente:** no se encontró implementación verificable en los archivos inspeccionados.
- **Por verificar:** requiere inspección adicional o pruebas con el hardware y entorno objetivo.

---

# 5. Historias de usuario

## HU-011 — Activar la cámara y visualizar la captura de manos

**Épica:** EP-03 Captura e interpretación de señas  
**Actor principal:** Operador  
**Prioridad:** Crítica  
**Estado de implementación:** Parcialmente implementada en frontend; la captura funciona mediante la API del navegador, pero la integración con gafas o sensor específico no está demostrada.

### Historia

Como operador, quiero activar la cámara y visualizar en tiempo real el área donde realizo las señas, para comprobar que mis manos están siendo capturadas antes de iniciar la interpretación.

### Objetivo

Permitir que el operador habilite la cámara de manera explícita, compruebe el encuadre y controle la conexión desde una pantalla que informe claramente el estado del dispositivo.

### Precondiciones

1. El operador inició sesión y tiene acceso a la opción “Detección de Cámara”.
2. El dispositivo dispone de una cámara compatible.
3. El navegador permite el acceso a medios mediante `navigator.mediaDevices.getUserMedia`.
4. La aplicación se ejecuta en un contexto seguro compatible con la política del navegador.
5. El operador puede conceder o denegar el permiso de cámara.

### Pantalla y componentes

**A. Encabezado “Detección de Cámara”**
- Mostrar el título de la pantalla.
- Explicar que permite visualizar la captura de manos y seleccionar el modo de salida.
- Presentar una tarjeta de estado del sensor con los estados “Conectado” y “Desconectado”.
- No afirmar conexión a un dispositivo físico concreto si solo se obtuvo la cámara genérica del navegador.

**B. Indicadores de estado**
- Estado: desconectado, solicitando permiso, conectado, error o desconectando.
- Señal/FPS: mostrar una medición real solo si se calcula a partir del flujo de video. Si no existe medición, mostrar “No disponible” en lugar de un valor simulado.
- Frames: mostrar un conteo real de fotogramas procesados solo si se obtiene de la fuente de video o del módulo de procesamiento.
- Los indicadores deben actualizarse de acuerdo con el estado real y no con un temporizador independiente.

**C. Panel “Streaming del sensor LSC”**
- Mostrar el video en una relación de aspecto adecuada.
- Mantener el video silenciado, ya que este flujo requiere captura de imagen y no audio.
- Mostrar una etiqueta de estado visible.
- En estado desconectado, presentar un estado vacío con el texto “Esperando señal de cámara”.
- Mostrar recomendaciones para ubicar las manos dentro del encuadre.
- Cuando la cámara esté activa, permitir que el usuario compruebe visualmente la iluminación, distancia y visibilidad de las manos.

**D. Mensajes de error**
- Presentar mensajes accesibles y próximos al panel de video.
- Explicar si el navegador no soporta la función, si el permiso fue denegado o si el dispositivo no está disponible, siempre que el error permita distinguirlo.
- Mantener una acción clara para reintentar.

**E. Botones de control**
- “Vincular gafas” (o “Activar cámara”, si se confirma que el dispositivo es una cámara genérica): solicita acceso a la cámara.
- “Desconectar”: detiene las pistas activas y limpia la vista previa.
- El botón de vinculación debe estar deshabilitado mientras exista una captura activa o una solicitud en curso.
- El botón de desconexión debe estar habilitado solo cuando haya un flujo activo.

**F. Panel “Estado del sistema”**
- Cámara: detectada/no detectada.
- Resolución: resolución real del flujo, cuando esté disponible.
- Permisos: concedidos, denegados o pendientes.
- Procesamiento: en espera, inicializando, activo o no disponible.
- No marcar “Procesamiento listo” si solo se ha abierto la cámara y no existe un módulo de interpretación conectado.

### Flujo principal

1. El operador abre “Detección de Cámara”.
2. El sistema presenta la vista en estado desconectado.
3. El operador selecciona “Vincular gafas” o “Activar cámara”.
4. El navegador solicita permiso de cámara cuando sea necesario.
5. El operador concede el permiso.
6. El sistema solicita un flujo de video con las características compatibles configuradas.
7. El sistema asigna el flujo al elemento de video.
8. El sistema espera a que el video pueda reproducirse y confirma que la captura está activa.
9. La pantalla cambia a “Conectado”.
10. El operador visualiza la imagen y ubica las manos dentro del encuadre.
11. El sistema presenta los datos reales disponibles del dispositivo y del flujo.
12. El operador puede continuar al proceso de interpretación o desconectar la cámara.

### Flujos alternos y excepciones

- **Navegador no compatible:** mostrar que el navegador no permite acceder a la cámara y sugerir utilizar un navegador compatible.
- **Permiso denegado:** informar que el acceso fue rechazado y explicar cómo habilitarlo desde la configuración del navegador.
- **Cámara inexistente:** informar que no se detectó un dispositivo de video.
- **Cámara ocupada:** indicar que otra aplicación podría estar utilizando el dispositivo y permitir reintentar.
- **Error al iniciar el video:** detener las pistas obtenidas, limpiar `srcObject` y presentar el error; no dejar el estado como conectado.
- **Dispositivo desconectado durante la captura:** detectar el fin de la pista cuando sea posible, cambiar el estado y permitir reconectar.
- **Resolución distinta a la solicitada:** mostrar la resolución realmente entregada por el navegador, sin afirmar que se obtuvo 1280 × 720 si no es así.
- **Salida de la pantalla:** detener todas las pistas de video al desmontar la vista.
- **Solicitud repetida:** evitar abrir varias capturas simultáneas o mantener pistas duplicadas.
- **Conexión interrumpida:** restablecer los indicadores y explicar que la cámara dejó de enviar video.

### Reglas de negocio

- **RN-011.1:** La cámara solo puede activarse mediante una acción explícita del operador.
- **RN-011.2:** El sistema debe respetar la decisión de permisos del navegador.
- **RN-011.3:** El estado “Conectado” solo se establece cuando existe un flujo de video válido y el elemento puede reproducirlo.
- **RN-011.4:** El sistema no debe afirmar conexión a gafas OV5640 u otro hardware específico si no se verifica la identidad del dispositivo.
- **RN-011.5:** Los valores de resolución, FPS y frames deben provenir de mediciones reales o identificarse claramente como no disponibles.
- **RN-011.6:** No debe iniciarse más de un flujo de captura desde la misma instancia de la vista.
- **RN-011.7:** Al desconectar o abandonar la pantalla, todas las pistas de video deben detenerse y el elemento de video debe liberar su referencia al flujo.
- **RN-011.8:** El sistema no debe almacenar ni transmitir video sin una finalidad definida y sin informar al usuario conforme a la política de privacidad.
- **RN-011.9:** La vista previa debe permitir al operador comprobar el encuadre antes de iniciar una interpretación.

### Criterios de aceptación

- **CA-011.1:** Al entrar a la pantalla, el estado inicial es “Desconectado”.
- **CA-011.2:** Al seleccionar la acción de conexión, el navegador solicita permisos cuando corresponda.
- **CA-011.3:** Si el usuario deniega el permiso, la cámara permanece desconectada y se muestra una explicación.
- **CA-011.4:** Si el dispositivo y los permisos están disponibles, se muestra el flujo de video en la vista previa.
- **CA-011.5:** El estado “Conectado” aparece únicamente cuando el flujo está disponible.
- **CA-011.6:** El botón de conexión no permite iniciar una segunda captura mientras la primera esté activa.
- **CA-011.7:** El botón “Desconectar” detiene todas las pistas del flujo y limpia la vista previa.
- **CA-011.8:** Al abandonar la pantalla, la cámara deja de capturar.
- **CA-011.9:** Si la cámara falla o se desconecta, el sistema informa el problema y no mantiene indicadores de conexión activa.
- **CA-011.10:** La resolución y las métricas mostradas corresponden a datos reales o se identifican como no disponibles.
- **CA-011.11:** El panel de video se adapta a dispositivos móviles y conserva una visualización legible.
- **CA-011.12:** Los controles tienen nombres accesibles, foco visible y operación por teclado.

### Brecha frente al código observado

`VistaDeteccionCamara.jsx` utiliza `getUserMedia` con video y audio desactivado, solicita una resolución ideal de 1280 × 720, asigna el flujo a un elemento `video`, permite desconectar y detiene las pistas tanto al desconectar como al desmontar la vista. El error de acceso se presenta mediante un mensaje general. La interfaz rotula el dispositivo como OV5640 y “gafas”, pero el código inspeccionado solicita la cámara disponible del navegador y no verifica un modelo físico concreto. Los valores de 30 FPS y frames se actualizan artificialmente cada segundo; deben sustituirse por mediciones reales o retirarse.

---

## HU-012 — Interpretar señas capturadas y obtener un resultado textual

**Épica:** EP-03 Captura e interpretación de señas  
**Actor principal:** Operador  
**Prioridad:** Crítica  
**Estado de implementación:** Pendiente de integración verificable; la vista actual muestra un mensaje fijo, sin evidencia de reconocimiento automático LSC.

### Historia

Como operador, quiero que el sistema analice las señas que realizo frente a la cámara y presente su significado en texto, para comunicar mis mensajes a una persona que no utiliza Lengua de Señas Colombiana.

### Objetivo

Integrar un mecanismo de reconocimiento de señas que procese el video autorizado, identifique únicamente las señas incluidas en el alcance validado y entregue resultados textuales con controles de confianza y manejo de incertidumbre.

### Precondiciones

1. El operador inició sesión.
2. La cámara está activa y entrega video válido.
3. Existe un modelo o servicio de reconocimiento de señas integrado y disponible.
4. El modelo cuenta con un conjunto de señas LSC definido y validado por el equipo responsable del contenido.
5. Se han establecido condiciones mínimas de iluminación, encuadre, calidad y posición de manos.
6. El operador conoce que el prototipo reconoce un vocabulario acotado y no necesariamente expresiones complejas.

### Pantalla y componentes

**A. Estado de interpretación**
- Mostrar estados “En espera”, “Inicializando”, “Interpretando”, “Resultado disponible”, “No se reconoce la seña” y “Error”.
- El estado “Interpretando” solo se muestra cuando el modelo esté procesando datos reales.
- Informar cuando el modelo o servicio no esté disponible.

**B. Área de captura**
- Reutilizar la vista previa de cámara de HU-011.
- Mostrar una guía visual de encuadre para que las manos permanezcan dentro del área de captura.
- Cuando exista un detector de manos, presentar guías o indicadores basados en la detección real.
- No dibujar indicadores de detección si no existe un detector integrado.

**C. Resultado textual**
- Presentar la palabra, expresión o frase reconocida.
- Diferenciar resultados provisionales de resultados confirmados cuando el modelo lo permita.
- Incluir una indicación cuando no exista coincidencia suficiente.
- Evitar completar o inventar palabras cuando el sistema no tenga evidencia suficiente.

**D. Información de reconocimiento**
- Mostrar el nombre o versión del modelo únicamente si corresponde al modelo realmente desplegado.
- Mostrar nivel de confianza solo si el modelo proporciona una medida interpretable y se ha definido un umbral aprobado.
- Informar limitaciones de vocabulario cuando la seña no pertenezca al conjunto reconocido.

**E. Controles de interpretación**
- Iniciar interpretación.
- Pausar o detener interpretación.
- Reintentar cuando ocurra un error.
- Limpiar el resultado textual.
- Los controles deben mantener la captura y el procesamiento en estados coherentes; detener interpretación no debe dejar un procesamiento activo en segundo plano.

### Flujo principal

1. El operador activa la cámara según HU-011.
2. El sistema comprueba que el flujo de video esté disponible.
3. El operador inicia la interpretación.
4. El sistema inicializa el modelo o servicio de reconocimiento.
5. El sistema procesa los fotogramas requeridos.
6. El detector identifica las manos y extrae la información necesaria, si esa etapa forma parte de la arquitectura aprobada.
7. El modelo compara la secuencia observada con el vocabulario LSC validado.
8. Si existe una coincidencia suficiente, el sistema genera un resultado textual.
9. La interfaz presenta el resultado y su estado de confirmación.
10. El operador puede continuar realizando señas, pausar, detener o limpiar el resultado.
11. Si no existe coincidencia suficiente, el sistema solicita repetir la seña o mejorar las condiciones de captura.

### Flujos alternos y excepciones

- **Modelo no disponible:** informar que la interpretación no se encuentra disponible y conservar la cámara en el estado que corresponda.
- **Cámara desconectada:** detener el procesamiento y solicitar que se reactive la cámara.
- **Manos fuera del encuadre:** informar que las manos deben permanecer dentro del área visible.
- **Iluminación insuficiente:** solicitar mejorar la iluminación sin afirmar que se ha medido la luz si no existe un sensor o análisis que lo respalde.
- **Imagen borrosa:** solicitar estabilizar el dispositivo o mejorar el enfoque.
- **Seña desconocida:** informar que no se reconoce dentro del vocabulario disponible; no inventar una traducción.
- **Confianza insuficiente:** no presentar el resultado como definitivo; solicitar repetir la seña.
- **Movimiento incompleto:** solicitar completar o repetir la seña.
- **Ruido o interrupción de procesamiento:** informar que no fue posible procesar la secuencia y permitir reintentar.
- **Resultado ambiguo:** presentar la incertidumbre o alternativas únicamente si el modelo y el diseño funcional las soportan.
- **Detención del proceso:** cancelar las tareas de interpretación y evitar que lleguen resultados tardíos a una sesión ya detenida.

### Reglas de negocio

- **RN-012.1:** La interpretación solo puede ejecutarse con una fuente de video válida y un modelo o servicio disponible.
- **RN-012.2:** El sistema solo debe reconocer y traducir las señas incluidas en el vocabulario LSC validado.
- **RN-012.3:** No se debe presentar una interpretación como confirmada cuando la confianza sea inferior al umbral aprobado.
- **RN-012.4:** El sistema debe comunicar de forma clara cuando una seña no esté contemplada en el vocabulario.
- **RN-012.5:** La interfaz no debe inventar traducciones ni completar mensajes sin evidencia del modelo.
- **RN-012.6:** El resultado debe diferenciarse de los mensajes de orientación y de los estados técnicos.
- **RN-012.7:** Si la cámara se detiene, el procesamiento asociado también debe detenerse.
- **RN-012.8:** El operador debe poder pausar o detener el reconocimiento.
- **RN-012.9:** Los indicadores de precisión, confianza, FPS y rendimiento deben provenir de datos reales y tener significado documentado.
- **RN-012.10:** El modelo debe ser evaluado con señas y condiciones de captura representativas de las personas y escenarios incluidos en el alcance.
- **RN-012.11:** La solución debe indicar que el reconocimiento es de alcance básico y no sustituye la interpretación profesional de contenido complejo.

### Criterios de aceptación

- **CA-012.1:** El sistema no permite iniciar interpretación cuando la cámara no está activa.
- **CA-012.2:** Al iniciar, la interfaz muestra el estado de inicialización y luego el estado real del modelo.
- **CA-012.3:** El sistema procesa video mediante el modelo o servicio integrado, no mediante mensajes de texto fijos.
- **CA-012.4:** Cuando se reconoce una seña incluida en el vocabulario, se presenta su resultado textual.
- **CA-012.5:** Cuando no se reconoce la seña, se informa la situación sin inventar una traducción.
- **CA-012.6:** Cuando la calidad de captura es insuficiente, el sistema comunica una recomendación concreta si puede identificar la causa.
- **CA-012.7:** El resultado provisional y el confirmado se distinguen cuando la tecnología los proporcione.
- **CA-012.8:** El operador puede detener la interpretación y el sistema cancela el procesamiento activo.
- **CA-012.9:** Al desconectar la cámara, la interpretación se detiene automáticamente.
- **CA-012.10:** Las métricas y porcentajes visibles corresponden a datos reales y documentados.
- **CA-012.11:** El sistema identifica las limitaciones del vocabulario reconocido.
- **CA-012.12:** Las pruebas incluyen señas reconocidas, desconocidas, incompletas, ambiguas y capturas de baja calidad.

### Brecha frente al código observado

En `VistaDeteccionCamara.jsx`, al conectar la cámara se establece el texto fijo “Interpretando gestos en tiempo real desde el sensor OV5640...”. No se encontró invocación de un modelo, detector de manos, clasificador, endpoint ni proceso de reconocimiento LSC en el archivo inspeccionado. La implementación de interpretación automática descrita en esta historia es un requerimiento pendiente, no una funcionalidad que pueda darse por terminada.

---

## HU-013 — Seleccionar el formato de salida de la interpretación

**Épica:** EP-03 Captura e interpretación de señas  
**Actor principal:** Operador  
**Prioridad:** Alta  
**Estado de implementación:** Selector visual implementado; generación de voz a partir del resultado interpretado no evidenciada.

### Historia

Como operador, quiero seleccionar si deseo recibir el resultado de una seña reconocida en texto o en voz, para adaptar la comunicación a las necesidades de la persona con quien interactúo.

### Objetivo

Permitir que el usuario seleccione el canal de presentación del resultado de interpretación, manteniendo coherencia entre el modo elegido, el resultado generado y las capacidades realmente disponibles.

### Precondiciones

1. El operador se encuentra en la pantalla de Detección de Cámara.
2. El selector de modo de salida está disponible.
3. Para presentar un resultado, debe existir una interpretación textual confirmada según HU-012.
4. Para reproducir voz, debe existir un sintetizador disponible y configurado.

### Pantalla y componentes

**A. Sección “Modo de interpretación”**
- Mostrar el título y una explicación breve.
- Presentar el selector con dos opciones:
  - “Texto”.
  - “Voz”.
- Indicar visualmente cuál opción está seleccionada.
- El selector debe exponer el estado seleccionado de forma accesible, por ejemplo mediante `aria-pressed`.

**B. Panel de salida**
- En modo Texto, presentar la interpretación textual confirmada.
- En modo Voz, presentar el estado del sintetizador y reproducir el resultado mediante síntesis de voz cuando exista un texto confirmado.
- Si todavía no hay interpretación, mostrar una indicación de espera.
- Si el sintetizador no está disponible, informar que no se puede reproducir el resultado por voz y permitir cambiar a Texto.

**C. Control de reproducción**
- En modo Voz, incluir controles para reproducir y detener si la arquitectura de salida lo requiere.
- Evitar reproducir repetidamente el mismo resultado sin una acción del usuario, salvo que se defina expresamente una reproducción automática accesible.
- Informar cuando el audio haya finalizado o haya ocurrido un error.

### Flujo principal — Salida en texto

1. El operador abre la pantalla.
2. El sistema selecciona el modo Texto por defecto.
3. El operador realiza una seña y el sistema obtiene una interpretación confirmada.
4. El panel muestra el resultado textual.
5. El operador continúa con la conversación o cambia al modo Voz.

### Flujo principal — Salida en voz

1. El operador selecciona “Voz”.
2. El sistema actualiza el modo seleccionado.
3. Si existe un resultado textual confirmado, el sistema habilita la reproducción.
4. El operador solicita reproducir el resultado, o se aplica la política de reproducción automática aprobada.
5. El sintetizador reproduce el texto.
6. La interfaz informa el estado de reproducción.
7. El operador puede detener el audio o volver a Texto.

### Flujos alternos y excepciones

- **Sin interpretación disponible:** mostrar que se está esperando un resultado; no sintetizar el mensaje fijo de ayuda como si fuera una traducción.
- **Sintetizador no compatible:** informar la limitación y permitir seleccionar Texto.
- **Error de síntesis:** informar el error y conservar la interpretación textual.
- **Cambio de modo durante reproducción:** detener o finalizar de manera controlada la reproducción anterior para evitar audio inesperado.
- **Resultado nuevo mientras hay audio:** aplicar una política definida para cancelar o finalizar el audio anterior antes de reproducir el nuevo.
- **Modo de salida no disponible:** no permitir seleccionar una opción que no pueda cumplir su función o mostrarla claramente como no disponible.

### Reglas de negocio

- **RN-013.1:** El modo inicial será Texto, salvo que una decisión de producto establezca otra preferencia.
- **RN-013.2:** El modo seleccionado determina cómo se presenta un resultado de interpretación válido.
- **RN-013.3:** La opción Voz requiere un resultado textual y un sintetizador disponible.
- **RN-013.4:** No se debe reproducir como traducción un mensaje fijo de espera o una orientación de interfaz.
- **RN-013.5:** El cambio de modo debe reflejarse visualmente y ser anunciado por tecnologías de asistencia.
- **RN-013.6:** El usuario debe poder detener la reproducción de voz.
- **RN-013.7:** Un error de síntesis no debe eliminar el resultado textual reconocido.
- **RN-013.8:** La disponibilidad de voz debe depender de las capacidades reales del navegador o servicio.

### Criterios de aceptación

- **CA-013.1:** La sección muestra las opciones Texto y Voz.
- **CA-013.2:** El modo Texto aparece seleccionado inicialmente.
- **CA-013.3:** Al seleccionar una opción, el estado visual y accesible del selector se actualiza.
- **CA-013.4:** En modo Texto, el panel muestra el resultado textual confirmado cuando existe.
- **CA-013.5:** En modo Voz, el sistema permite reproducir el resultado mediante el sintetizador integrado.
- **CA-013.6:** Si no existe un resultado válido, el sistema presenta un estado de espera y no reproduce mensajes de interfaz como traducciones.
- **CA-013.7:** Si el sintetizador falla, se informa el error y el texto reconocido permanece disponible.
- **CA-013.8:** El usuario puede detener la reproducción.
- **CA-013.9:** Cambiar de modo durante una reproducción no genera dos audios simultáneos.
- **CA-013.10:** El selector puede utilizarse con teclado y tecnologías de asistencia.

### Brecha frente al código observado

`SelectorModoSalida.jsx` implementa las opciones Texto y Voz mediante estado local y marca la selección con `aria-pressed`. En `VistaDeteccionCamara.jsx`, el modo Texto presenta el contenido de `textoConversion`, que actualmente es un mensaje fijo; el modo Voz presenta el mensaje “Sintetizador de voz listo para transmitir el gesto interpretado”. No se encontró una llamada a `SpeechSynthesisUtterance` o a otro servicio de voz en ese flujo. Por tanto, la selección visual está implementada, pero la conversión del resultado de señas a voz está pendiente de integración.

---

# 6. Reglas de negocio transversales de EP-03

- **RN-EP03-01 — Captura explícita:** el uso de la cámara comienza solo después de una acción del operador y con permiso del navegador.
- **RN-EP03-02 — Estados reales:** los estados de conexión, procesamiento e interpretación deben corresponder a eventos o resultados técnicos verificables.
- **RN-EP03-03 — Vocabulario validado:** el reconocimiento se limita al conjunto de señas LSC revisado y aprobado para el prototipo.
- **RN-EP03-04 — Incertidumbre:** cuando la calidad o confianza no permita una interpretación fiable, el sistema debe solicitar repetir la seña y no inventar resultados.
- **RN-EP03-05 — Control del operador:** el usuario puede conectar, desconectar, iniciar, detener y cambiar el modo de salida de forma comprensible.
- **RN-EP03-06 — Liberación de recursos:** al desconectar o abandonar la vista se detienen las pistas de cámara y cualquier proceso que dependa de ellas.
- **RN-EP03-07 — Privacidad:** la captura, transmisión y eventual almacenamiento de video deben tener finalidad, autorización, acceso y retención definidos.
- **RN-EP03-08 — Accesibilidad:** controles, estados y errores deben ser comprensibles sin depender exclusivamente del color o de animaciones.
- **RN-EP03-09 — Métricas verificables:** FPS, frames, precisión y confianza no pueden presentarse como valores reales si no proceden de mediciones o salidas técnicas.
- **RN-EP03-10 — Alcance educativo y básico:** el sistema debe comunicar las limitaciones del vocabulario y no sustituye la interpretación profesional de mensajes complejos.

# 7. Trazabilidad

| ID de historia | Épica | Vista o componente de referencia | Capacidad principal | Estado observado |
|---|---|---|---|---|
| HU-011 | EP-03 | `VistaDeteccionCamara.jsx` | Activar cámara, mostrar video y desconectar | Captura implementada en frontend; hardware específico no verificado |
| HU-012 | EP-03 | `VistaDeteccionCamara.jsx` | Reconocer señas LSC y producir texto | Pendiente de integración verificable |
| HU-013 | EP-03 | `VistaDeteccionCamara.jsx`, `SelectorModoSalida.jsx` | Seleccionar salida Texto o Voz | Selector implementado; síntesis del resultado pendiente |

**Fuera del alcance de estas historias:** el mantenimiento del diccionario, la carga y validación de material de señas y la administración de contenido corresponden a las épicas respectivas. La traducción de texto o voz hacia un avatar animado debe documentarse en la épica que cubra la salida de señas/avatar, sin confundirla con la interpretación de señas capturadas por cámara.

# 8. Dependencias y consideraciones técnicas

1. **Hardware y navegador:** definir si el producto utiliza cámara web, cámara integrada o gafas con un sensor específico. Validar el dispositivo real antes de conservar la denominación “OV5640”.
2. **Reconocimiento LSC:** seleccionar o desarrollar un modelo que procese secuencias de video y tenga un vocabulario de señas aprobado.
3. **Datos de entrenamiento y evaluación:** documentar origen, consentimiento, etiquetado, cobertura y validación del conjunto de datos.
4. **Detección de manos:** definir si se requiere una etapa independiente para localizar manos, articulaciones y movimiento.
5. **Procesamiento:** decidir si se ejecutará en el navegador, en el dispositivo o en un servicio remoto; documentar latencia, conectividad y protección de datos.
6. **Calidad de captura:** establecer umbrales o reglas verificables para iluminación, enfoque, encuadre y visibilidad.
7. **Salida de voz:** conectar el texto reconocido al sintetizador y probar idioma, disponibilidad y cancelación.
8. **Métricas:** reemplazar los contadores simulados por mediciones reales o retirarlos de la interfaz.
9. **Pruebas con usuarios:** validar el vocabulario y la experiencia con personas conocedoras de LSC y con los perfiles de usuario previstos.

# 9. Definición de Terminado (DoD) para EP-03

Una historia de esta épica podrá considerarse terminada cuando:

- [ ] El flujo funcional esté implementado de acuerdo con la historia aprobada.
- [ ] Los permisos de cámara se soliciten y gestionen correctamente.
- [ ] La captura pueda iniciarse, detenerse y liberarse sin dejar recursos activos.
- [ ] Los estados y métricas mostrados correspondan a datos reales.
- [ ] El modelo de interpretación, cuando aplique, esté integrado y versionado.
- [ ] El vocabulario de señas reconocido esté documentado y validado.
- [ ] Los casos de seña desconocida, ambigua, incompleta y de baja calidad estén cubiertos.
- [ ] Los resultados no reconocidos o de baja confianza no se presenten como traducciones confirmadas.
- [ ] El modo de salida seleccionado cumpla su función real.
- [ ] Los errores de cámara, modelo y sintetizador tengan mensajes y recuperación verificables.
- [ ] Se hayan realizado pruebas en los dispositivos y navegadores del alcance.
- [ ] Se hayan ejecutado pruebas de accesibilidad y usabilidad.
- [ ] El tratamiento de imágenes y video esté alineado con la política de privacidad.
- [ ] Se haya revisado el código y no existan regresiones en los módulos del operador.
- [ ] Los criterios de aceptación tengan evidencia de pruebas.
- [ ] La documentación y trazabilidad estén actualizadas.

# 10. Pendientes y decisiones de producto

1. Confirmar si “Vincular gafas” corresponde a un dispositivo físico real o si el prototipo utiliza la cámara convencional del dispositivo.
2. Verificar si existe una integración OV5640 en otro módulo; si no existe, ajustar el texto de interfaz para no afirmar una conexión que no se realiza.
3. Definir el modelo o servicio de reconocimiento de señas LSC y su alcance funcional.
4. Definir el vocabulario inicial que el prototipo podrá reconocer y quién lo valida.
5. Establecer cómo se medirá la confianza del reconocimiento y cuál será el umbral para confirmar una traducción.
6. Definir si el resultado de interpretación se presenta de forma continua, por seña aislada o por secuencias de señas.
7. Establecer los mensajes y criterios verificables para manos fuera del encuadre, baja iluminación, imagen borrosa y seña desconocida.
8. Definir si la salida de voz será automática o iniciada por el usuario.
9. Determinar si el procesamiento será local o remoto y qué datos se transmitirán.
10. Sustituir o retirar las métricas simuladas de FPS y frames.

---

## 11. Control de cambios

| Versión | Cambio | Estado |
|---|---|---|
| 1.0 | Creación de HU-011 a HU-013 a partir de la inspección de cámara y selector de modo de salida | Primera versión |

**Nota de alcance:** este documento describe requisitos y brechas observadas en los archivos inspeccionados. No certifica la existencia de un modelo de interpretación LSC ni de una integración con hardware OV5640. Las capacidades pendientes deberán implementarse y probarse antes de declararse terminadas.
