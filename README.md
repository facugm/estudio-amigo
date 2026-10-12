# estudio amigo - Prototipo Web Multi-Dirección

Prototipo web navegable de alta fidelidad para **estudio amigo** (Tu Estudio Amigo), estudio creativo y de comunicación integral radicado en San Juan, Argentina.

El sitio implementa **cuatro direcciones creativas intercambiables en caliente desde el header**, permitiendo evaluar cuatro enfoques de marca, jerarquía de contenido y tono de comunicación sobre el mismo conjunto de datos reales.

---

## 🎯 Direcciones Creativas

| # | Dirección | Tono & Filosofía | Tipografía de Marca | Orden de Secciones | Comportamiento Clave |
|---|---|---|---|---|---|
| **01** | **Orilla** | **Editorial & Rigor Conceptual**<br>Líneas precisas de 2px, estética de catálogo de autor y lectura pausada. | *Museo Sans* (Logo: *Monod*) | Hero → Sobre nosotros → Trabajos → Servicios → Cómo trabajamos → Contacto | **Scroll Horizontal Predominante** en desktop (con control por rueda de mouse) y mazo de cartas swipeable en mobile. |
| **02** | **Nefiu** | **Identidad & Presentación Comercial**<br>Posicionamiento pragmático, tabs interactivos por módulo, portfolio en grilla Bento. | *Museo Sans* (Logo: *Monod*) | Hero → Servicios → Trabajos → Cómo trabajamos → Sobre nosotros → Contacto | **Tabs accesibles de servicios** con navegación por teclado y **Grilla Bento** de proyectos adaptativa. |
| **03** | **Escalamos** | **Claridad de Valor & Evidencia**<br>Estética tecnológica oscura, selector interactivo de servicios con prellenado de contacto. | *Museo Sans* (Logo: *Monod*) | Hero → Servicios → Cómo trabajamos → Evidencia → Sobre nosotros → Contacto | **Selector múltiple con checkboxes** que prellena automáticamente el mensaje de consulta en el formulario. |
| **04** | **Creativewise** | **Portfolio-First & Alto Impacto Visual**<br>Protagonismo absoluto de piezas, muro visual dinámico con chips de filtro por categoría. | *Museo Sans* (Logo: *Monod*) | Hero → Portfolio → Servicios → Cómo trabajamos → Sobre nosotros → Contacto | **Muro visual enriquecido con stock photography** y chips interactivos de filtrado por categoría (`aria-pressed`). |

---

## 🎨 Identidad & Tipografía Oficial

- **Tipografía de marca unificada**: **Museo Sans** aplicada en todas las variantes como la tipografía institucional oficial de estudio amigo.
- **Tipografía del logo**: **Monod** aplicada en el identificador de cabecera `estudio amigo`.
- **Fotografía**: Fotografías stock de alta resolución integradas en todos los proyectos y casos de estudio.
- **Marca**: Eliminadas las siglas provisionales TEA; uso oficial y exclusivo de **estudio amigo**.
- **Versiones Mobile**: Cada dirección cuenta con maquetación móvil optimizada para pantallas táctiles (deslizamiento horizontal en Orilla, grillas responsivas de 1 columna en Bento, chips scrolleables en Creativewise).

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo estricto).
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/).
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) con jsdom (112 tests en verde).
- **Estilos**: Vanilla CSS con Custom Properties (`tokens`), sin dependencias pesadas de runtime.
- **Persistencia**: Preferencia de variante persistida en `localStorage` con preservación de estado de formulario entre variantes.

---

## 🚀 Inicio Rápido

```bash
# Iniciar servidor de desarrollo local
npm run dev

# Ejecutar suite completa de tests automatizados
npm test -- --run

# Validar chequeo de tipos estricto de TypeScript
npm run typecheck

# Compilar bundle de producción
npm run build
```

---

## 📋 Los 7 Servicios Obligatorios de estudio amigo

1. **Branding y rebranding**
2. **Pauta digital**
3. **Papelería, cartelería, señalética y merchandising**
4. **Gestión de redes sociales**
5. **Creación de contenido para redes sociales**
6. **Fotoproducto**
7. **Sitios web**
