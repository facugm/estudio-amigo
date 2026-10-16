# estudio amigo - Prototipo Web Multi-Dirección

Prototipo web navegable de alta fidelidad para **estudio amigo**, estudio de comunicación integral.

El sitio implementa **tres direcciones creativas intercambiables** desde un dock flotante accesible, permitiendo evaluar tres propuestas de diseño, jerarquía de contenido y tono de comunicación sobre el mismo conjunto de proyectos y servicios.

---

## 🎯 Direcciones Creativas

| # | Dirección | Tono & Filosofía | Tipografía de Marca | Orden de Secciones | Comportamiento Clave |
|---|---|---|---|---|---|
| **02** | **Nefiu** | **Identidad & Presentación Comercial**<br>Posicionamiento pragmático, tabs interactivos por módulo, portfolio en grilla Bento de 12 columnas con tonos de marca. | *Museo Sans* | Hero → Servicios → Trabajos → Cómo trabajamos → Sobre nosotros → Contacto | **Tabs accesibles de servicios** con navegación por teclado, **Bento grid 12 col** sin huecos con tonos de marca y **proceso en lista numerada** sin tarjetas repetidas. |
| **03** | **Escalamos** | **Claridad de Valor & Evidencia**<br>Estética corporativa en navy de marca, selector interactivo de servicios con prellenado de contacto. | *Museo Sans* | Hero → Servicios → Cómo trabajamos → Trabajos → Sobre nosotros → Contacto | **Selector múltiple de servicios (3+4 en 12 columnas)** con CTA deshabilitado de alto contraste y prellenado automático del formulario. |
| **04** | **Creativewise** | **Portfolio-First & Alto Impacto Visual**<br>Protagonismo de piezas sobre fondo neutro, muro visual dinámico con chips de filtro por servicio y hero con imágenes. | *Museo Sans* | Hero → Trabajos → Servicios → Cómo trabajamos → Sobre nosotros → Contacto | **Hero con tarjetas visuales de proyectos** y **chips de filtrado por servicio** en scroll horizontal con estado `aria-pressed`. |

---

## 🧭 Selector de Variantes (Dock Flotante)

El selector de propuestas vive en un dock flotante (`<VariantDock />`) en la parte inferior de la pantalla:
- **Reserva de espacio**: el footer reserva espacio mediante padding inferior para no solapar contenido.
- **Teclado móvil & accesibilidad**: cuando cualquier campo de texto o textarea del formulario de contacto recibe foco, el dock se desplaza automáticamente fuera de la vista para no tapar el botón de envío.
- **Paso a producción**: para publicar el sitio definitivo con una sola dirección elegida:
  1. Quitar `<VariantDock />` de `src/App.tsx`.
  2. Fijar la variante deseada como `DEFAULT_VARIANT_ID` en `src/variants/tokens.ts` (o como default en `src/variants/VariantProvider.tsx`).

---

## 🎨 Identidad, Legibilidad & Ritmo Vertical

- **Paleta oficial exacta**: Navy (`#234060`), Lima (`#c8f264`), Magenta (`#c61e97`), Gris (`#dcdcdc`) y Blanco (`#ffffff`).
- **Pares de texto con contraste accesible (WCAG AA)**: navy/blanco, navy/gris, navy/lima, blanco/navy, blanco/magenta, magenta/blanco. Se prohíben combinaciones de bajo contraste (ej. magenta sobre navy o lima sobre blanco).
- **Tipografía de marca unificada**: **Museo Sans** autoalojada en `.woff2` (100, 300, 500, 700). Sin dependencias de fuentes externas.
- **Regla estricta de legibilidad (≥ 13 px)**: ningún texto en ningún CSS o componente baja de `0.8125rem` (13 px), auditado por el test automatizado `src/brand/legibility.ts` (`fontSizeViolations`).
- **Ritmo vertical compartido (`--section-y`)**: el padding vertical de las secciones en todas las variantes se controla con el token `--section-y: clamp(3rem, 6vw, 5rem)` definido en `:root` de `src/styles/base.css`. Para ajustar la densidad del sitio completo, basta con modificar este único valor.
- **Targets táctiles**: todos los controles interactivos, botones, inputs y enlaces poseen una altura mínima de `44px` (`min-height: 44px`).

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo estricto).
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/).
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) con jsdom.
- **Estilos**: Vanilla CSS con Custom Properties (`tokens`), sin librerías de estilos en runtime.
- **Tests de Marca & Integridad**:
  - `compliance.test.ts`: audita que ningún archivo CSS utilice colores fuera de paleta ni degradados.
  - `noInlineStyle.test.ts`: prohíbe estilos en línea (`style={{`).
  - `legibility.test.ts`: verifica escala de fuentes ≥ 13px y token `--section-y`.
  - `integrity.test.ts`: rechaza datos de contacto falsos o claims no respaldados.

---

## 🚀 Comandos

```bash
# Iniciar servidor de desarrollo local
npm run dev

# Ejecutar suite completa de tests automatizados
npx vitest run

# Chequeo estricto de tipos de TypeScript
npx tsc --noEmit

# Compilar bundle de producción
npm run build
```

---

## 📋 Los 7 Servicios Oficiales de estudio amigo

1. **Branding y rebranding** (Short: *Branding*)
2. **Pauta digital** (Short: *Pauta digital*)
3. **Papelería, cartelería, señalética y merchandising** (Short: *Papelería y señalética*)
4. **Gestión de redes sociales** (Short: *Redes sociales*)
5. **Creación de contenido para redes sociales** (Short: *Contenido*)
6. **Fotoproducto** (Short: *Fotoproducto*)
7. **Sitios web** (Short: *Sitios web*)
