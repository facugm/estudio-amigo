# estudio amigo · Correcciones de la review UI/UX — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolver los problemas de usabilidad y de expresión de marca detectados en la review del sitio publicado (formulario sin estilos, header sobredimensionado, contenido que genera desconfianza, heroes sin personalidad, portfolio y filtros poco útiles).

**Architecture:** Cambios acotados sobre la base existente (`src/styles`, `src/components`, `src/variants/*`, `src/content`). Un nuevo `ui.css` da estilo compartido a formulario, botones y chips con los tokens de cada variante; el selector de variantes sale del header a un dock flotante; el contenido de muestra vuelve a vivir solo en `src/content/`. Los tests de cumplimiento de marca existentes (`brandViolations`, `noInlineStyle`) cubren todo el CSS nuevo.

**Tech Stack:** React 18, TypeScript estricto, Vite, Vitest + Testing Library. Sin dependencias nuevas.

**Spec:** la review UI/UX (sección "Hallazgos" de este documento, con la evidencia medida), `docs/brand/` (identidad), `docs/superpowers/specs/2026-10-12-tea-brief.md` (brief, vigente) y `docs/superpowers/plans/2026-10-13-brand-identity-and-fixes.md` (plan anterior; este plan retoma de él la Task 6, que quedó sin aplicar).

## Global Constraints

- Paleta oficial exacta: navy `#234060`, lima `#c8f264`, magenta `#c61e97`, gris `#dcdcdc` (+ blanco como neutro). Pares de texto permitidos: navy/blanco, navy/gris, navy/lima, blanco/navy, blanco/magenta, magenta/blanco. **Prohibidos como texto:** lima sobre blanco o gris, magenta sobre navy, magenta sobre gris.
- Tipografía: Museo Sans autoalojada (`--font-brand`). No agregar otras familias.
- Sitio de scroll vertical con las variantes 02 Nefiu, 03 Escalamos y 04 Creativewise.
- No agregar dependencias. Sin estilos en línea (`style={{`), sin degradados, sin colores fuera de `BRAND` (los tests `compliance` y `noInlineStyle` lo hacen cumplir; todo CSS nuevo se agrega a `CHECKED_CSS`).
- Targets táctiles ≥ 44 px de alto; ningún texto por debajo de `0.8125rem` (13 px).
- Siguen vigentes del brief: no inventar ubicación, métricas, clientes, premios, testimonios ni datos de contacto; proyectos de muestra marcados como provisionales; los siete servicios con sus títulos textuales; `prefers-reduced-motion`; teclado; alt en imágenes; nada que parezca interactivo y no lo sea.
- Texto visible en español rioplatense; identificadores de código en inglés.

## Hallazgos

Medidos con un Chromium headless sobre el build de `main` (`66d3295`) a 1440, 768 y 390 px (Unsplash bloqueado en el entorno de análisis: se vieron los fallbacks de marca, no las fotos).

1. **Formulario sin estilos** en las tres variantes: no existe CSS para `.field`, `.field-error`, `.btn-primary`, `.btn-secondary` ni `.contact-confirmed`; inputs de 181×19 px y botón de 19 px de alto. Tampoco hay CSS para `.tag-list`/`.tag-item` (los servicios de cada proyecto se ven como lista con viñetas).
2. **Header pegajoso de 127 px en desktop y 132–134 px en móvil** (≈16 % de 844 px) por la fila del selector; en móvil esa fila se corta ("04 Creativewise" recortado). En Creativewise el selector se ve como una píldora blanca ajena al header.
3. **Contenido que desconfía:** `site.ts` aún tiene `contacto@tuestudioamigo.com`, `+54 9 11 0000-0000`, `@tuestudioamigo` y `linkedin.com/company/tuestudioamigo` (con "(a definir)" al lado); siguen "Branding real que conecta y transforma marcas" (`nefiu/Hero.tsx`), "Diagnóstico & Crecimiento" y "Evidencia concreta de marcas acompañadas…" sobre casos ficticios.
4. **Heroes sin la personalidad de la marca:** el isotipo no aparece en ningún hero; Nefiu deja ~200 px vacíos bajo el hero.
5. **Portfolio de Nefiu desparejo:** el ciclo `large, small, small, wide` deja tiles con media tarjeta vacía y un hueco a la derecha; los tiles son blancos sin color de marca.
6. **Creativewise:** el hero muestra tres links de solo texto sin imagen; hay 6 categorías para 6 proyectos, así que los chips no filtran nada útil.
7. **Escalamos:** CTA deshabilitado casi ilegible, "Ver trabajos" de bajo contraste sobre navy, séptimo servicio huérfano en la grilla de 3 columnas.
8. **Ritmo:** el mismo patrón de tarjeta con borde en servicios, proceso y portfolio; mucho aire vertical (≈5.400–6.400 px de alto en desktop, ≈10.000 px en móvil); textos de 12 px.

## Review Focus

1. **Cantidad impar o mínima de proyectos** (1, 3, 5, 7 o 9): el bento de Nefiu no deja huecos ni filas incompletas. Test en Task 5.
2. **Cero o un solo proyecto, o proyectos sin servicios conocidos**: Creativewise no muestra chips vacíos ni tarjetas de hero rotas. Test en Task 6.
3. **Móvil con el teclado abierto en el formulario**: el dock del selector no tapa el botón de envío ni los campos. Test en Task 2.
4. **Títulos de servicio largos en 360 px** ("Papelería, cartelería, señalética y merchandising") en chips y tarjetas: no desbordan. Test en Task 1.
5. **Mensajes de error del formulario**: se entienden sin depender de un color de bajo contraste (magenta sobre navy o gris falla AA). Test en Task 1.

## File Structure

```
src/styles/ui.css           formulario, botones .btn-*, chips .tag-*, confirmación (Task 1)
src/styles/shell.css        header de una fila + dock del selector (Task 2)
src/components/VariantDock.tsx   contenedor flotante del selector (Task 2)
src/brand/legibility.ts     fontSizeViolations() (Task 8)
src/content/*               textos centralizados (Task 3)
src/variants/<id>/…         heroes, portfolio, filtros y pulido por variante (Tasks 4–8)
```
