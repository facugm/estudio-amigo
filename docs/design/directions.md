# Direcciones Creativas y Análisis de Referencias para TEA

Documento de análisis de referencias de diseño y decisiones visuales para las cuatro variantes de TEA | Tu Estudio Amigo.

---

## 01 · Orilla

### Observado
- Sitio web inspeccionado en vivo (`https://www.orilla.com.ar/`).
- Tipografía display: Google Font `Bricolage Grotesque` con pesos variables (200 a 800), combinada con estructura editorial refinada.
- Estructura y composición: navegación horizontal (`.horizontal_content`) que intercala titulares temáticos en altas ("IDENTIDAD VISUAL", "REDES SOCIALES", "SITIO WEB") con piezas fotográficas de proyectos y un manifiesto de cierre sobre la orilla ("Orilla no tiene límites definidos...").
- Paleta monocromática estricta de alto contraste (`#000000`, `#ffffff`, `#f4f4f4`), con líneas finas y sin sombras decorativas ni gradientes llamativos.
- Navegación: header dividido con logo centralizado, enlaces a izquierda y derecha, y menú móvil desplegable.
- Ritmo de lectura pausado, sobrio y enfocado en la solidez del concepto de diseño.

### No verificado
- No se verificaron casos de estudio secundarios ni la experiencia de compra/tienda vinculada en scripts secundarios.

### Decisiones para TEA
- **Paleta**:
  - `bg`: `#fcfbf9`
  - `surface`: `#f3f0e8`
  - `fg`: `#121212`
  - `muted`: `#5a5852`
  - `accent`: `#121212`
  - `accentFg`: `#ffffff`
- **Tipografías Google Fonts**:
  - Display: `'Bricolage Grotesque', Georgia, serif`
  - Body: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Radius**: `2px` (aristas casi rectas, terminaciones editoriales precisas).
- **Escala de espaciado**: `10px` (ritmo basado en múltiplos de 10px / 20px / 40px / 80px).
- **Composición del hero**: `orilla-editorial`. Titular tipográfico de escala contundente con disposición asimétrica, bajada editorial sobria y acceso directo al diálogo.
- **Presentación del portfolio**: `orilla-index`. Índice editorial organizado en filas con numeración, cliente, categoría, servicios y previsualización equilibrada sin depender de hover.
- **Presentación de servicios**: `orilla-typographic`. Lista tipográfica ordenada y numerada (`<ol>`) con los 7 servicios, destacando el criterio conceptual y la artesanía estratégica.
- **Motion**: Transiciones sutiles de opacidad y desplazamiento mínimo (máximo 0.25s con curvas `cubic-bezier(0.16, 1, 0.3, 1)`), anulables con `prefers-reduced-motion`.

---

## 02 · Nefiu

### Observado
- Sitio web inspeccionado en vivo (`https://www.nefiu.com/`).
- Posicionamiento claro y comercial: "Branding real que conecta". Foco en kits corporativos, activaciones, merchandising y campañas promocionales.
- Estructura directa con navegación superior clara (`INICIO`, `QUE HACEMOS?`, `SERVICIOS`, `PROYECTOS`, `CLIENTES`, `CONTACTO`).
- Servicios presentados como bloques funcionales directos (campañas, merchandising, marketing interno, eventos, diseño creativo, logística).
- Enfoque pragmático orientado a clientes corporativos que buscan soluciones integrales y entregas tangibles.

### No verificado
- Catálogo externo en flipbook (`heyzine.com`) no se analizó internamente para evitar dependencias de terceros.

### Decisiones para TEA
- **Paleta**:
  - `bg`: `#ffffff`
  - `surface`: `#f4f6f9`
  - `fg`: `#0e121a`
  - `muted`: `#545c6b`
  - `accent`: `#0b57d0`
  - `accentFg`: `#ffffff`
- **Tipografías Google Fonts**:
  - Display: `'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif`
  - Body: `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif`
- **Radius**: `12px` (módulos contemporáneos con esquinas suavizadas).
- **Escala de espaciado**: `12px` (grilla modular de 12px / 24px / 48px).
- **Composición del hero**: `nefiu-composition`. Composición gráfica con bloques de color, tipografía audaz y síntesis de la propuesta de agencia de comunicación antes que galerías de fotos.
- **Presentación del portfolio**: `nefiu-bento`. Grilla tipo Bento calculada por índice (`large`, `small`, `small`, `wide`) que permite incorporar trabajos futuros sin alterar la maquetación.
- **Presentación de servicios**: `nefiu-modules`. Módulos interactivos en formato `tablist` accesible donde cada servicio seleccionado muestra su alcance detallado sin desbordar la página.
- **Motion**: Microinteracciones rápidas y mecánicas, feedback táctil en tabs y botones (150ms-200ms `ease-out`).

---

## 03 · Escalamos

### Observado
- Sitio web inspeccionado en vivo (`https://www.escalamos.io/`).
- Construido con tecnología Framer con tipografías `Montserrat` e `Inter`.
- Mensaje de alto impacto enfocado en resolver cuellos de botella y crecimiento ("Encontramos dónde se traba el crecimiento de tu empresa...").
- Estética tecnológica contemporánea: fondo oscuro elegante (`#0e0e12`), acento azul eléctrico (`#4356f2` / `#2b5cf6`), verde lima y blanco nítido.
- Foco en claridad de valor, diagnóstico, metodología de trabajo secuencial y prueba concreta de resultados.

### No verificado
- El script de atribución multi-toque y métricas internas de conversión de la página original no forman parte de este prototipo.

### Decisiones para TEA
- **Paleta**:
  - `bg`: `#0d0f14`
  - `surface`: `#171a24`
  - `fg`: `#f4f6fc`
  - `muted`: `#9da4b4`
  - `accent`: `#2b5cf6`
  - `accentFg`: `#ffffff`
- **Tipografías Google Fonts**:
  - Display: `'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif`
  - Body: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- **Radius**: `8px` (geometría técnica precisa).
- **Escala de espaciado**: `8px` (escala métrica estricta de 8px / 16px / 32px / 64px).
- **Composición del hero**: `escalamos-value`. Declaración directa de la propuesta de valor de TEA y a quién acompaña, con CTA principal enfocado en iniciar diagnóstico.
- **Presentación del portfolio**: `escalamos-proof`. Portfolio organizado como evidencia y respaldo de los servicios ofrecidos, etiquetando los servicios específicos que cada proyecto demandó.
- **Presentación de servicios**: `escalamos-benefits`. Selector múltiple interactivo (checkboxes) que permite a los clientes seleccionar las áreas de interés y prellenar automáticamente el formulario de contacto.
- **Motion**: Transiciones técnicas controladas con líneas delimitadoras nítidas y badges de estado.

---

## 04 · Creativewise

### Observado
- Sitio web inspeccionado en vivo (`https://www.creativewise.co/work`).
- Presentación de portfolio de alto impacto visual ("Our Work") para marcas CPG, packaging y branding.
- Sistema de filtrado con píldoras/chips interactivos por servicios e industrias.
- Muro visual de proyectos con relaciones de aspecto cuidadas (`aspect-[3/2]` y `aspect-square`), tipografía limpia y descripciones concisas de una línea.
- Fondos claros cálidos (`#ffffff`, tonos café/espresso `#191011`), jerarquía tipográfica distinguida y foco absoluto en la imagen y la producción creativa.

### No verificado
- Efectos de shader WebGL o videos 3D de alta carga presentes en algunos casos individuales de la web original.

### Decisiones para TEA
- **Paleta**:
  - `bg`: `#faf8f5`
  - `surface`: `#f1ede6`
  - `fg`: `#191011`
  - `muted`: `#635755`
  - `accent`: `#b93b22`
  - `accentFg`: `#ffffff`
- **Tipografías Google Fonts**:
  - Display: `'Syne', -apple-system, BlinkMacSystemFont, sans-serif`
  - Body: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
- **Radius**: `16px` (tarjetas redondeadas y fluidas que realzan la estética visual).
- **Escala de espaciado**: `12px` (márgenes generosos y aire entre piezas visuales).
- **Composición del hero**: `creativewise-reel`. Hero donde los trabajos destacados son protagonistas inmediatos desde el primer pliegue visual, con fallback tipográfico si no hay proyectos.
- **Presentación del portfolio**: `creativewise-wall`. Muro visual enriquecido con chips de filtrado por categoría (`aria-pressed`) y tarjetas que muestran imagen, nombre y tags de servicio.
- **Presentación de servicios**: `creativewise-index`. Índice compacto que acompaña el recorrido visual sin competir con las obras del portfolio.
- **Motion**: Elevación suave de tarjetas en foco/hover (`translateY(-4px)` con `transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1)`).
