# TEA | Tu Estudio Amigo - Prototipo Web Multi-Dirección

Prototipo web navegable de alta fidelidad para **TEA | Tu Estudio Amigo**, estudio creativo y de comunicación integral radicado en San Juan, Argentina.

El sitio implementa **cuatro direcciones creativas intercambiables en caliente desde el header**, permitiendo evaluar cuatro enfoques de marca, jerarquía de contenido y tono de comunicación sobre el mismo conjunto de datos reales.

---

## 🎯 Direcciones Creativas

| # | Dirección | Tono & Filosofía | Tipografías | Orden de Secciones |
|---|---|---|---|---|
| **01** | **Orilla** | **Editorial & Rigor Conceptual**<br>Diseño sobrio, monocromático, líneas precisas de 2px, lectura pausada. | *Bricolage Grotesque* + *Plus Jakarta Sans* | Hero → Sobre TEA → Trabajos → Servicios → Cómo trabajamos → Contacto |
| **02** | **Nefiu** | **Identidad & Presentación Comercial**<br>Posicionamiento pragmático, tabs interactivos por módulo, portfolio en grilla Bento. | *Space Grotesk* + *DM Sans* | Hero → Servicios → Trabajos → Cómo trabajamos → Sobre TEA → Contacto |
| **03** | **Escalamos** | **Claridad de Valor & Evidencia**<br>Estética tecnológica oscura, selector interactivo de servicios con prellenado de contacto. | *Montserrat* + *Inter* | Hero → Servicios → Cómo trabajamos → Evidencia → Sobre TEA → Contacto |
| **04** | **Creativewise** | **Portfolio-First & Alto Impacto Visual**<br>Protagonismo absoluto de piezas, muro visual dinámico con chips de filtro por categoría. | *Syne* + *Plus Jakarta Sans* | Hero → Portfolio → Servicios → Cómo trabajamos → Sobre TEA → Contacto |

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo estricto).
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/).
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) con jsdom (100% de suites en verde con TDD).
- **Estilos**: Vanilla CSS con Custom Properties (`tokens`), sin dependencias pesadas de runtime (`tailwind` o bibliotecas UI externas).
- **Persistencia**: Preferencia de variante persistida en `localStorage` con preservación de ancla de scroll al alternar entre variantes.
- **Inyección dinámica de fuentes**: Solo se cargan las fuentes de Google Fonts requeridas por la variante activa.
- **Accesibilidad**: WCAG AA verificado, navegación accesible por teclado en tabs (con wraparound en Flecha Izq/Der), roles ARIA semánticos (`tablist`, `tab`, `tabpanel`, `toolbar`, `article`).

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ (o Node.js 20 recomendado).
- npm 9+.

### Instalación & Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev

# 3. Ejecutar suite completa de tests automatizados
npm test -- --run

# 4. Validar tipos TypeScript
npm run typecheck

# 5. Compilar bundle de producción
npm run build
```

---

## 📁 Estructura del Proyecto

```
tea-website/
├── docs/
│   ├── design/
│   │   └── directions.md             # Notas de inspección y decisiones visuales
│   ├── superpowers/specs/
│   │   └── 2026-10-12-tea-brief.md    # Brief consolidado de TEA
│   ├── MISSING_INFO.md               # Información pendiente de confirmación con el cliente
│   └── EVALUATION.md                 # Matriz de evaluación comparativa de las 4 direcciones
├── src/
│   ├── components/                   # Componentes shell y compartidos (Header, Footer, Formulario, etc.)
│   ├── content/                      # Capa desacoplada de contenido (7 servicios, proyectos, datos de sitio)
│   ├── lib/                          # Utilidades (contraste WCAG, scroll, motion, carga de tipografías)
│   ├── styles/                       # CSS base y estilos de shell
│   └── variants/                     # 4 variantes creativas completas y pruebas de contrato
│       ├── orilla/
│       ├── nefiu/
│       ├── escalamos/
│       ├── creativewise/
│       ├── variantContract.test.tsx  # Test de contrato ejecutado contra todas las variantes
│       └── differentiation.test.tsx  # Verificación de unicidad y diferenciación entre variantes
```

---

## 📋 Los 7 Servicios Obligatorios de TEA

1. **Branding y rebranding**
2. **Pauta digital**
3. **Papelería, cartelería, señalética y merchandising**
4. **Gestión de redes sociales**
5. **Creación de contenido para redes sociales**
6. **Fotoproducto**
7. **Sitios web**

Todos los servicios y proyectos de muestra están tipados rigurosamente y protegidos contra desincronización mediante la suite de tests automatizada.
