# estudio amigo - Prototipo Web Multi-Dirección

Prototipo web navegable de alta fidelidad para **estudio amigo** (Tu Estudio Amigo), estudio creativo y de comunicación integral.

El sitio implementa **tres direcciones creativas intercambiables en caliente desde el header**, permitiendo evaluar tres enfoques de marca, jerarquía de contenido y tono de comunicación sobre el mismo conjunto de proyectos de muestra.

---

## 🎯 Direcciones Creativas

| # | Dirección | Tono & Filosofía | Tipografía de Marca | Orden de Secciones | Comportamiento Clave |
|---|---|---|---|---|---|
| **02** | **Nefiu** | **Identidad & Presentación Comercial**<br>Posicionamiento pragmático, tabs interactivos por módulo, portfolio en grilla Bento. | *Museo Sans* | Hero → Servicios → Trabajos → Cómo trabajamos → Sobre nosotros → Contacto | **Tabs accesibles de servicios** con navegación por teclado y **Grilla Bento** de proyectos adaptativa. |
| **03** | **Escalamos** | **Claridad de Valor & Evidencia**<br>Estética tecnológica en navy de marca, selector interactivo de servicios con prellenado de contacto. | *Museo Sans* | Hero → Servicios → Cómo trabajamos → Trabajos → Sobre nosotros → Contacto | **Selector múltiple con checkboxes** que prellena automáticamente el mensaje de consulta en el formulario. |
| **04** | **Creativewise** | **Portfolio-First & Alto Impacto Visual**<br>Protagonismo absoluto de piezas sobre fondo neutro, muro visual dinámico con chips de filtro por categoría. | *Museo Sans* | Hero → Trabajos → Servicios → Cómo trabajamos → Sobre nosotros → Contacto | **Muro visual de proyectos de muestra** y chips interactivos de filtrado por categoría (`aria-pressed`). |

---

## 🎨 Identidad & Tipografía Oficial

- **Paleta oficial de marca**: Navy (`#234060`), Lima (`#c8f264`), Magenta (`#c61e97`), Gris (`#dcdcdc`) y Blanco (`#ffffff`).
- **Tipografía de marca unificada**: **Museo Sans** autoalojada y servida localmente con licencia web (`.woff2`) en todos los pesos utilizados.
- **Logotipo e Isotipo**: Wordmark vectorizado e isotipo oficial (sol con calados) integrados en formato SVG vectorial sin dependencias de fuentes externas.
- **Marca**: Uso oficial y exclusivo de **estudio amigo**.
- **Versiones Mobile**: Maquetación móvil optimizada para pantallas táctiles con accesibilidad WCAG AA.

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo estricto).
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/).
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) con jsdom.
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
