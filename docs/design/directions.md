# Direcciones Creativas y Análisis de Referencias para estudio amigo

Documento de análisis de referencias de diseño y decisiones visuales para las tres variantes de estudio amigo | Tu Estudio Amigo.

---

## 02 · Nefiu

### Observado
- Sitio web inspeccionado en vivo (`https://www.nefiu.com/`).
- Posicionamiento claro y comercial enfocado en servicios y piezas tangibles.
- Estructura directa con navegación superior clara (`INICIO`, `SERVICIOS`, `PROYECTOS`, `CONTACTO`).
- Enfoque pragmático orientado a clientes corporativos que buscan soluciones integrales.

### No verificado
- Catálogo externo en flipbook (`heyzine.com`) no se analizó internamente para evitar dependencias de terceros.

### Decisiones para estudio amigo
- **Paleta**:
  - `bg`: `#ffffff`
  - `surface`: `#dcdcdc`
  - `fg`: `#234060`
  - `muted`: `#234060`
  - `accent`: `#c61e97`
  - `accentFg`: `#ffffff`
- **Tipografía**: *Museo Sans* institucional autoalojada.
- **Radius**: `12px` (módulos contemporáneos con esquinas suavizadas).
- **Escala de espaciado**: `12px` (grilla modular de 12px / 24px / 48px).
- **Composición del hero**: `nefiu-composition`. Panel navy con isotipo lima recortado, tipografía audaz y síntesis de la propuesta de comunicación integral.
- **Presentación del portfolio**: `nefiu-bento`. Grilla tipo Bento calculada por índice (`large`, `small`, `small`, `wide`) que cicla por los tonos de marca.
- **Presentación de servicios**: `nefiu-modules`. Módulos interactivos en formato `tablist` accesible donde cada servicio seleccionado muestra su alcance detallado sin desbordar la página.
- **Motion**: Microinteracciones rápidas y mecánicas, feedback táctil en tabs y botones (150ms-200ms `ease-out`).

---

## 03 · Escalamos

### Observado
- Sitio web inspeccionado en vivo (`https://www.escalamos.io/`).
- Estética tecnológica contemporánea sobre fondo oscuro elegante con acento de alta visibilidad.
- Foco en claridad de valor, metodología de trabajo secuencial y prueba concreta de resultados.

### No verificado
- El script de atribución multi-toque y métricas internas de conversión de la página original no forman parte de este prototipo.

### Decisiones para estudio amigo
- **Paleta**:
  - `bg`: `#234060`
  - `surface`: `#234060`
  - `fg`: `#ffffff`
  - `muted`: `#dcdcdc`
  - `accent`: `#c8f264`
  - `accentFg`: `#234060`
- **Tipografía**: *Museo Sans* institucional autoalojada.
- **Radius**: `8px` (geometría técnica precisa).
- **Escala de espaciado**: `8px` (escala métrica estricta de 8px / 16px / 32px / 64px).
- **Composición del hero**: `escalamos-value`. Declaración directa de la propuesta de valor con acento lima e isotipo magenta decorativo.
- **Presentación del portfolio**: `escalamos-proof`. Portfolio organizado como evidencia y respaldo de los servicios ofrecidos, etiquetando los servicios específicos que cada proyecto demandó.
- **Presentación de servicios**: `escalamos-benefits`. Selector múltiple interactivo (checkboxes) que permite a los clientes seleccionar las áreas de interés y prellenar automáticamente el formulario de contacto sin sobreescribir mensajes existentes.
- **Motion**: Transiciones técnicas controladas con líneas delimitadoras nítidas y badges de estado.

---

## 04 · Creativewise

### Observado
- Sitio web inspeccionado en vivo (`https://www.creativewise.co/work`).
- Presentación de portfolio de alto impacto visual ("Our Work") para marcas y proyectos creativos.
- Sistema de filtrado con píldoras/chips interactivos por servicios.
- Muro visual de proyectos con relaciones de aspecto cuidadas, tipografía limpia y descripciones concisas.

### No verificado
- Efectos de shader WebGL o videos 3D de alta carga presentes en algunos casos individuales de la web original.

### Decisiones para estudio amigo
- **Paleta**:
  - `bg`: `#dcdcdc`
  - `surface`: `#ffffff`
  - `fg`: `#234060`
  - `muted`: `#234060`
  - `accent`: `#c61e97`
  - `accentFg`: `#ffffff`
- **Tipografía**: *Museo Sans* institucional autoalojada.
- **Radius**: `16px` (tarjetas redondeadas y fluidas que realzan la estética visual).
- **Escala de espaciado**: `12px` (márgenes generosos y aire entre piezas visuales).
- **Composición del hero**: `creativewise-reel`. Hero donde los trabajos destacados son enlaces reales inmediatos al portfolio desde el primer pliegue visual, con fallback tipográfico si no hay proyectos.
- **Presentación del portfolio**: `creativewise-wall`. Muro visual enriquecido con chips de filtrado por categoría (`aria-pressed`) y tarjetas que muestran imagen, nombre y tags de servicio.
- **Presentación de servicios**: `creativewise-index`. Índice compacto que acompaña el recorrido visual sin competir con las obras del portfolio.
- **Motion**: Elevación suave de tarjetas en foco/hover (`translateY(-4px)` con `transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1)`).
