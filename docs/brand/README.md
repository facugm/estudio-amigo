# estudio amigo · Guía de Identidad Gráfica y Sistema de Diseño

Documentación oficial del sistema visual, componentes vectoriales, tipografía y reglas de cumplimiento de marca para **estudio amigo**.

---

## 1. Paleta de Colores Oficial

La identidad de **estudio amigo** se rige por una paleta estricta de cinco (5) colores institucionales. No se permite la inclusión de colores complementarios no autorizados ni degradados.

| Color | Hex | RGB | Token CSS | Uso Recomendado |
|---|---|---|---|---|
| **Navy** | `#234060` | `rgb(35, 64, 96)` | `--brand-navy` | Fondo principal oscuro, tipografía sobre fondo claro, bordes de alto contraste. |
| **Lima** | `#c8f264` | `rgb(200, 242, 100)` | `--brand-lime` | Acento primario, botones de llamada a la acción (CTA), badges destacados, tags. |
| **Magenta** | `#c61e97` | `rgb(198, 30, 151)` | `--brand-magenta` | Acento secundario, badges de categoría, destaques visuales en Creativewise. |
| **Gris** | `#dcdcdc` | `rgb(220, 220, 220)` | `--brand-gray` | Fondos de superficie secundarios, líneas divisoras, bordes sutiles. |
| **Blanco** | `#ffffff` | `rgb(255, 255, 255)` | `--brand-white` | Fondos de página claros, tarjetas sobre fondo gris/navy, texto sobre fondo oscuro. |

### Transparencias Permitidas (Alpha Channels)
Las transparencias (`rgba`) están permitidas **únicamente** cuando se derivan directamente de los canales RGB de los cinco colores institucionales:
- **Navy traslúcido:** `rgba(35, 64, 96, a)` (sombras, overlays sutiles)
- **Lima traslúcido:** `rgba(200, 242, 100, a)` (resplandores o halos de interacción)
- **Magenta traslúcido:** `rgba(198, 30, 151, a)` (tintes o acentos suaves)
- **Gris traslúcido:** `rgba(220, 220, 220, a)` (bordes atenuados)
- **Blanco traslúcido:** `rgba(255, 255, 255, a)` (capas translúcidas sobre fondos oscuros)

### Reglas Prohibitivas de Estilo
1. **Sin degradados**: Prohibido el uso de `linear-gradient`, `radial-gradient` o `conic-gradient`. La identidad visual utiliza planos de color puros y sólidos.
2. **Sin colores no homologados**: No se admiten valores HEX o RGB de paletas externas.
3. **Sin estilos en línea**: Todo estilo debe residir en las hojas de estilo organizadas en `src/styles/` o `src/variants/`, referenciando los tokens de marca.

---

## 2. Activos Vectoriales de Marca

Todos los activos vectoriales están implementados como componentes React SVG de resolución infinita, sin dependencias externas:

### Wordmark (`src/brand/Wordmark.tsx`)
- Representación tipográfica vectorizada oficial de **estudio amigo**.
- Props:
  - `color`: Color del isotipo y del texto (por defecto `#ffffff` o hereda de tokens).
  - `width` / `height`: Dimensiones escalables manteniendo el viewBox `0 0 358 48`.
  - `aria-label`: "estudio amigo" con rol `img` para accesibilidad.

### Isotype (`src/brand/Isotype.tsx`)
- Emblema solar oficial con calados geométricos de **estudio amigo**.
- Props:
  - `color`: Color de relleno del sol.
  - `size`: Tamaño cuadrado en píxeles (por defecto `40`).
  - `aria-label`: "Isotipo de estudio amigo".

### Favicon e Iconos
- `public/favicon.svg`: Isotipo vectorial oficial optimizado para navegadores modernos en modo claro y oscuro.

---

## 3. Tipografía Oficial: Museo Sans

La tipografía de marca es **Museo Sans**, autoalojada y servida localmente desde el propio bundle para eliminar dependencias externas y cumplir con políticas de privacidad y rendimiento.

- **Ubicación:** `src/fonts/`
- **Formatos:** `.woff2` (Web Open Font Format 2 de máxima compresión).
- **Pesos implementados:**
  - `100` (ExtraLight / Thin)
  - `300` (Light)
  - `500` (Medium / Regular)
  - `700` (Bold)
- **Definición CSS:** `src/styles/fonts.css`
- **Pila tipográfica de fallback:**
  ```css
  font-family: 'Museo Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  ```

---

## 4. Direcciones Creativas Activas

El sitio implementa 3 variantes de diseño intercambiables:

1. **02 Nefiu**:
   - Fondo: Blanco institucional (`#ffffff`).
   - Acento: Navy y Lima.
   - Componentes clave: Tabs interactivos de servicios accesibles y grilla bento adaptativa.
   - Radio de esquinas: `12px`.
2. **03 Escalamos**:
   - Fondo: Navy institucional (`#234060`).
   - Acento: Lima vibrante (`#c8f264`).
   - Componentes clave: Selector múltiple interactivo de servicios con prellenado dinámico del formulario de contacto.
   - Radio de esquinas: `8px`.
3. **04 Creativewise**:
   - Fondo: Gris institucional (`#dcdcdc`).
   - Acento: Magenta (`#c61e97`) y Navy (`#234060`).
   - Componentes clave: Muro visual interactivo de proyectos con filtrado por categoría en tiempo real y enlaces directos desde el hero.
   - Radio de esquinas: `16px`.

---

## 5. Suite de Cumplimiento Automatizado (`compliance.test.ts`)

Para evitar desviaciones de marca durante el mantenimiento y desarrollo de nuevas funcionalidades, la suite de tests en `src/brand/compliance.test.ts` analiza estáticamente todo el código fuente y las hojas de estilo:

- **Validación de Colores**: Escanea cada token y valor CSS para asegurar que coincide exactamente con los 5 colores permitidos o sus derivados `rgba`.
- **Detección de Degradados**: Falla si detecta cualquier ocurrencia de gradientes.
- **Auditoría de Inline Styles**: Falla si algún componente React utiliza la propiedad `style={{...}}`.
- **Diferenciación de Variantes**: Verifica que cada variante mantenga tokens visuales únicos y coherentes con la marca.

Para ejecutar la verificación:
```bash
npm test -- src/brand/compliance.test.ts --run
```
