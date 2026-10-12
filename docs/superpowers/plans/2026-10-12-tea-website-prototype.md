# TEA Website Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un prototipo navegable del sitio de TEA | Tu Estudio Amigo con cuatro direcciones creativas (01 Orilla, 02 Nefiu, 03 Escalamos, 04 Creativewise) intercambiables desde el header, para compararlas y decidir la dirección final.

**Architecture:** Una sola app React donde el contenido (marca, servicios, proyectos) vive en `src/content/` y se inyecta por contexto. Cada variante es una *definición* (`VariantDefinition`): tokens de tema, orden de secciones y un componente de layout propio por sección. El selector cambia la variante en un contexto sin recargar; el estado del formulario de contacto vive por encima de las variantes para sobrevivir al cambio.

**Tech Stack:** React 18, TypeScript (strict), Vite, Vitest + Testing Library (jsdom), CSS con variables. Sin otras dependencias.

**Spec:** `docs/superpowers/specs/2026-10-12-tea-brief.md` (el brief de TEA, guardado textual en la Task 1; leerlo completo antes de empezar).

## Global Constraints

- Stack: React + TypeScript + Vite, proyecto nuevo. Dependencias de runtime: solo `react` y `react-dom`. Dev: `vite`, `@vitejs/plugin-react`, `typescript`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`. "No agregues dependencias innecesarias."
- Marca: `TEA | Tu Estudio Amigo`. Selector: `[01 Orilla] [02 Nefiu] [03 Escalamos] [04 Creativewise]`, cambio inmediato sin recargar, variante activa claramente indicada.
- Los siete servicios, textual y en este orden: `Branding y rebranding`, `Pauta digital`, `Papelería, cartelería, señalética y merchandising`, `Gestión de redes sociales`, `Creación de contenido para redes sociales`, `Fotoproducto`, `Sitios web`.
- Proceso (propuesta inicial, no institucional): `Comprender el desafío`, `Definir la estrategia`, `Desarrollar la propuesta`, `Implementar y acompañar`.
- Secciones base: Header, Hero, Portfolio/Trabajos, Servicios, Cómo trabajamos, Sobre TEA, Contacto, Footer.
- No inventar historia, manifiesto, valores, métricas, clientes, premios, resultados, testimonios ni datos de contacto. Proyectos y textos de muestra: marcados como provisionales, nunca presentados como trabajos reales de TEA. Contacto sin datos reales: placeholders reemplazables, no clickeables.
- Hero: prohibido "llevamos tu marca al siguiente nivel" y "soluciones innovadoras para tu negocio".
- Evitar: aspecto SaaS genérico, exceso de gradientes, efectos sin función, tarjetas repetidas en todas las secciones, animaciones que dificulten la lectura, bloques de texto largos, elementos que parezcan interactivos y no funcionen.
- Formulario de contacto: validaciones básicas y estado de confirmación que NO simula un envío real (no hay backend).
- Estados hover/focus/active, navegación por teclado, `prefers-reduced-motion` respetado, textos alternativos en imágenes, contraste legible.
- Responsive deliberado en desktop, notebook, tablet y móvil (no una reducción del desktop).
- No copiar logos, textos ni imágenes de las referencias. No afirmar haber analizado lo que no se pudo observar.
- Texto visible en español rioplatense; identificadores de código en inglés.

## Review Focus

El brief dice qué debe hacer el sitio, no todo lo que va a encontrar. Lo más probable que falle, con la conducta esperada:

1. **Portfolio con cero proyectos** (alguien vació `projects.ts`): la sección y su ancla siguen existiendo y muestran "Todavía no hay proyectos cargados.", sin romper. Test en Task 7 (contrato) y Task 6.
2. **`localStorage` bloqueado, valor guardado inválido o `?v=` inválido**: se usa la variante por defecto, sin error. Test en Task 5.
3. **Borrador y confirmación del formulario al cambiar de variante**: lo escrito (y el estado "confirmado") sobrevive. Test en Task 6 y Task 7.
4. **Proyecto sin `caseUrl` o con un `ServiceId` desconocido**: no se renderiza ningún link muerto (`href="#"` o vacío) y el tag de servicio desconocido se omite. Test en Task 6 y Task 7.
5. **`matchMedia` ausente o `prefers-reduced-motion: reduce`**: sin animaciones ni view transitions, sin excepción. Test en Task 4 y Task 5.

## File Structure

```
docs/superpowers/specs/2026-10-12-tea-brief.md   brief textual (Task 1)
docs/design/directions.md                        análisis de referencias + decisiones por variante (Task 2)
docs/MISSING_INFO.md, docs/EVALUATION.md, README.md   (Task 12)
src/
  main.tsx, App.tsx
  test/setup.ts
  content/
    types.ts       tipos de contenido
    site.ts        marca, nav, hero, proceso, sobre TEA, contacto, footer
    services.ts    los 7 servicios
    projects.ts    proyectos (provisionales)
    ContentProvider.tsx   ContentBundle, ContentProvider, useContent, findService
  lib/
    usePrefersReducedMotion.ts, scrollContext.ts, contrast.ts, ensureStylesheet.ts
  variants/
    types.ts            VariantId, SectionId, SECTION_ANCHORS, VariantTokens, VariantDefinition
    registry.ts         VARIANTS, DEFAULT_VARIANT_ID, isVariantId
    VariantProvider.tsx VariantProvider, useVariant, resolveInitialVariantId, applyTokens
    <id>/index.ts, tokens.ts, <id>.css, Hero.tsx, Portfolio.tsx, Services.tsx, Process.tsx, About.tsx, Contact.tsx   (<id> = orilla|nefiu|escalamos|creativewise)
  components/
    SectionShell.tsx, ProjectMedia.tsx, ProvisionalTag.tsx, ProjectCaseLink.tsx, ServiceTags.tsx,
    PortfolioEmptyState.tsx, ContactChannels.tsx, ContactForm.tsx, ContactFormProvider.tsx,
    Header.tsx, VariantSwitcher.tsx, Footer.tsx
  styles/base.css, shell.css
```

---

### Task 1: Scaffold, tooling y brief

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`, `src/main.tsx`, `src/App.tsx`, `src/test/setup.ts`, `docs/superpowers/specs/2026-10-12-tea-brief.md`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `export function App(props?: AppProps): JSX.Element` (en esta task, sin props; se extiende en Task 7). Scripts npm: `dev`, `build` (`tsc -b && vite build`), `typecheck` (`tsc --noEmit`), `test` (`vitest run`).

- [ ] **Step 1: Guardar el brief** textual en `docs/superpowers/specs/2026-10-12-tea-brief.md`. Si el archivo no está disponible en el repo ni en el mensaje de arranque, detenerse y pedirlo.
- [ ] **Step 2: Escribir la configuración** (`package.json`, `tsconfig.json` con `strict: true`, `jsx: react-jsx`, `types: ["vitest/globals"]`; `vite.config.ts` con `test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts' }`; `index.html` con `lang="es"` y `<title>TEA | Tu Estudio Amigo</title>`). `setup.ts` importa `@testing-library/jest-dom/vitest` y define `window.scrollTo = vi.fn()`. No stubear `matchMedia` (jsdom no lo tiene y es parte del Review Focus 5). Instalar con `npm install`.
- [ ] **Step 3: Escribir el test que falla**

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import { App } from './App';

it('renders a main landmark', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});
```

- [ ] **Step 4: Run** `npx vitest run src/App.test.tsx` — Expected: FAIL (`Cannot find module './App'`).
- [ ] **Step 5: Implementar** `App` mínimo (`<main id="main">`), `main.tsx` que monta `<App />` en `#root`.
- [ ] **Step 6: Run** `npm test && npm run typecheck && npm run build` — Expected: todo PASS.
- [ ] **Step 7: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold Vite + React + TS + Vitest and save TEA brief"
```

---

### Task 2: Análisis de referencias y decisiones por variante

**Files:**
- Create: `docs/design/directions.md`

**Interfaces:**
- Produces: `docs/design/directions.md` con cuatro secciones `## 0N · <Nombre>` (Orilla, Nefiu, Escalamos, Creativewise). Cada una con tres subsecciones fijas: `### Observado`, `### No verificado`, `### Decisiones para TEA`. "Decisiones para TEA" contiene: paleta (hex para `bg`, `surface`, `fg`, `muted`, `accent`, `accentFg`), familias tipográficas de Google Fonts (display y body, con stack de fallback), `radius`, escala de espaciado, composición del hero, presentación del portfolio, presentación de servicios, motion. Las Tasks 8–11 las consumen. Los `data-layout` y el orden de secciones están fijados en esas tasks y no se renegocian acá; todo lo visual sí se decide acá.

- [ ] **Step 1: Inspeccionar** con navegación web las cuatro URLs del brief (`orilla.com.ar`, `nefiu.com`, `escalamos.io`, `creativewise.co/work`): estructura, jerarquía, tipografías, colores, navegación, animaciones, presentación de proyectos. Anotar solo lo observado.
- [ ] **Step 2: Redactar `directions.md`** con el esquema fijo. Si una URL no se pudo inspeccionar, escribir en "No verificado" el motivo y marcar sus decisiones como "interpretación provisoria". Prohibido atribuir a una referencia algo no observado. Las tipografías deben existir en Google Fonts; las paletas deben pasar contraste 4.5:1 para `fg/bg`, `muted/bg` y `accentFg/accent` (se verifica en Task 5).
- [ ] **Step 3: Verificar el esquema**

Run:
```bash
for n in Orilla Nefiu Escalamos Creativewise; do grep -c "^## .*$n" docs/design/directions.md; done
grep -c "^### Observado" docs/design/directions.md; grep -c "^### No verificado" docs/design/directions.md; grep -c "^### Decisiones para TEA" docs/design/directions.md
```
Expected: `1` cuatro veces, y luego `4`, `4`, `4`.
- [ ] **Step 4: Commit**

```bash
git add docs/design/directions.md && git commit -m "docs: reference analysis and per-variant design decisions"
```

---

### Task 3: Capa de contenido

**Files:**
- Create: `src/content/types.ts`, `src/content/site.ts`, `src/content/services.ts`, `src/content/projects.ts`, `src/content/ContentProvider.tsx`
- Test: `src/content/content.test.tsx`

**Interfaces:**
- Produces (en `types.ts`):
  - `type ServiceId = 'branding' | 'pauta-digital' | 'papeleria-senaletica' | 'gestion-redes' | 'contenido-redes' | 'fotoproducto' | 'sitios-web'`
  - `interface Service { id: ServiceId; title: string; summary: string }`
  - `type ProjectMedia = { kind: 'placeholder'; hue: number; label: string } | { kind: 'image'; src: string; alt: string } | { kind: 'video'; src: string; poster: string; alt: string }`
  - `interface Project { id: string; name: string; client: string; category: string; description: string; services: ServiceId[]; media: ProjectMedia; caseUrl?: string; provisional: boolean }`
  - `interface ContactChannel { id: 'email' | 'whatsapp' | 'instagram' | 'linkedin'; label: string; href: string | null; isPlaceholder: boolean }`
  - `type SectionId = 'hero' | 'portfolio' | 'services' | 'process' | 'about' | 'contact'` (la Task 5 lo reexporta desde `variants/types.ts`; definirlo acá y que `variants/types.ts` lo importe)
  - `interface SiteContent { brand: { short: 'TEA'; long: 'Tu Estudio Amigo'; full: 'TEA | Tu Estudio Amigo' }; nav: readonly { label: string; section: SectionId }[]; hero: { headline: string; support: string; cta: { label: string }; secondaryCta: { label: string } }; process: { title: string; steps: readonly { id: string; title: string; description: string }[] }; about: { title: string; paragraphs: readonly string[] }; contact: { title: string; invitation: string; ctaLabel: string; channels: readonly ContactChannel[] }; footer: { prototypeNote: string }; sampleCopy: readonly SectionId[] }`
- Produces (en `ContentProvider.tsx`): `interface ContentBundle { site: SiteContent; services: readonly Service[]; projects: readonly Project[] }`; `const defaultContent: ContentBundle`; `function ContentProvider(props: { content?: ContentBundle; children: ReactNode }): JSX.Element`; `function useContent(): ContentBundle` (sin provider devuelve `defaultContent`); `function findService(bundle: ContentBundle, id: ServiceId): Service | undefined`.

- [ ] **Step 1: Escribir los tests que fallan**

```tsx
// src/content/content.test.tsx
import { renderHook } from '@testing-library/react';
import { defaultContent, ContentProvider, useContent, findService } from './ContentProvider';

const TITLES = ['Branding y rebranding','Pauta digital','Papelería, cartelería, señalética y merchandising',
  'Gestión de redes sociales','Creación de contenido para redes sociales','Fotoproducto','Sitios web'];

it('has the seven services with the brief titles, in order', () =>
  expect(defaultContent.services.map(s => s.title)).toEqual(TITLES));
it('has unique service ids and unique project ids', () => {
  const ids = (xs: { id: string }[]) => new Set(xs.map(x => x.id)).size === xs.length;
  expect(ids([...defaultContent.services])).toBe(true);
  expect(ids([...defaultContent.projects])).toBe(true);
});
it('marks every sample project as provisional and references only known services', () => {
  const known = new Set(defaultContent.services.map(s => s.id));
  for (const p of defaultContent.projects) {
    expect(p.provisional).toBe(true);
    expect(p.services.length).toBeGreaterThan(0);
    p.services.forEach(id => expect(known.has(id)).toBe(true));
  }
});
it('keeps contact channels as non-clickable placeholders', () =>
  defaultContent.site.contact.channels.forEach(c => { expect(c.isPlaceholder).toBe(true); expect(c.href).toBeNull(); }));
it('has the four process steps from the brief', () =>
  expect(defaultContent.site.process.steps.map(s => s.title)).toEqual(
    ['Comprender el desafío','Definir la estrategia','Desarrollar la propuesta','Implementar y acompañar']));
it('avoids banned hero phrases', () =>
  expect(`${defaultContent.site.hero.headline} ${defaultContent.site.hero.support}`).not.toMatch(/siguiente nivel|soluciones innovadoras/i));
it('findService returns undefined for an unknown id', () =>
  expect(findService(defaultContent, 'nope' as never)).toBeUndefined());
it('useContent returns the provided bundle and falls back to defaults', () => {
  const custom = { ...defaultContent, projects: [] };
  expect(renderHook(() => useContent(), { wrapper: ({ children }) => <ContentProvider content={custom}>{children}</ContentProvider> }).result.current.projects).toEqual([]);
  expect(renderHook(() => useContent()).result.current).toBe(defaultContent);
});
```

- [ ] **Step 2: Run** `npx vitest run src/content` — Expected: FAIL (módulos inexistentes).
- [ ] **Step 3: Implementar tipos y datos.** `services.ts`: siete `Service` con los títulos de arriba y un `summary` de una oración tomado de la descripción del brief. `projects.ts`: 6 proyectos de muestra (`provisional: true`, `client` que deje claro que es una marca de ejemplo, `media.kind: 'placeholder'`, categorías variadas que cubran al menos 4 de los 7 servicios, ninguno con `caseUrl`). `site.ts`: titular original y breve alrededor de estrategia + creatividad + comunicación, texto de apoyo, CTAs, proceso (4 pasos, una oración cada uno), "Sobre TEA" (máx. dos párrafos cortos, sin historia ni valores inventados), contacto con los 4 canales como placeholder (`href: null`), `footer.prototypeNote` ("Prototipo para evaluación: textos y proyectos de muestra."), `sampleCopy` con todas las secciones cuyo texto es de muestra.
- [ ] **Step 4: Implementar `ContentProvider.tsx`** con las firmas de Interfaces.
- [ ] **Step 5: Run** `npx vitest run src/content && npm run typecheck` — Expected: PASS.
- [ ] **Step 6: Commit**

```bash
git add src/content && git commit -m "feat: editable content layer (site, services, provisional projects)"
```

---

### Task 4: Utilidades de plataforma

**Files:**
- Create: `src/lib/usePrefersReducedMotion.ts`, `src/lib/scrollContext.ts`, `src/lib/contrast.ts`, `src/lib/ensureStylesheet.ts`, `src/styles/base.css`
- Test: `src/lib/lib.test.tsx`, `src/styles/base.css.test.ts`

**Interfaces:**
- Produces:
  - `function usePrefersReducedMotion(): boolean` (`false` si no existe `window.matchMedia`; reacciona a cambios del query `(prefers-reduced-motion: reduce)`)
  - `const SECTION_OFFSET_PX = 96`
  - `function findCurrentSectionAnchor(doc: Document, anchors: readonly string[], offsetPx?: number): string | null` — el último ancla existente cuyo `getBoundingClientRect().top <= offsetPx`; `null` si ninguna
  - `function restoreSectionAnchor(doc: Document, anchor: string | null, behavior?: ScrollBehavior, offsetPx?: number): void` — `scrollTo({ top: rect.top + scrollY - offsetPx, behavior })`; no hace nada si `anchor` es `null` o no existe
  - `function contrastRatio(foreground: string, background: string): number` (hex `#rrggbb`; lanza `Error` si es inválido)
  - `function ensureStylesheet(href: string, doc?: Document): void` (agrega `<link rel="stylesheet">` una sola vez por `href`)

- [ ] **Step 1: Escribir los tests que fallan**

```tsx
// src/lib/lib.test.tsx
import { renderHook, act } from '@testing-library/react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { findCurrentSectionAnchor, restoreSectionAnchor } from './scrollContext';
import { contrastRatio } from './contrast';
import { ensureStylesheet } from './ensureStylesheet';

const stubMatchMedia = (matches: boolean) => {
  let cb: ((e: { matches: boolean }) => void) | undefined;
  window.matchMedia = ((q: string) => ({ matches, media: q,
    addEventListener: (_: string, f: typeof cb) => { cb = f; }, removeEventListener: () => {} })) as never;
  return (m: boolean) => cb?.({ matches: m });
};
afterEach(() => { delete (window as { matchMedia?: unknown }).matchMedia; document.body.innerHTML = ''; document.head.innerHTML = ''; });

it('reduced motion is false when matchMedia is missing', () =>
  expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(false));
it('reduced motion is true when the query matches and follows changes', () => {
  const fire = stubMatchMedia(true);
  const { result } = renderHook(() => usePrefersReducedMotion());
  expect(result.current).toBe(true);
  act(() => fire(false));
  expect(result.current).toBe(false);
});

const sections = (tops: number[]) => {
  document.body.innerHTML = tops.map((_, i) => `<section id="s${i}"></section>`).join('');
  tops.forEach((t, i) => { document.getElementById(`s${i}`)!.getBoundingClientRect = () => ({ top: t } as DOMRect); });
};
it('finds the last section whose top is above the offset', () => {
  sections([-500, -10, 400]);
  expect(findCurrentSectionAnchor(document, ['s0', 's1', 's2'], 96)).toBe('s1');
});
it('returns null when no section reached the offset, and skips missing anchors', () => {
  sections([200, 500]);
  expect(findCurrentSectionAnchor(document, ['s0', 's1'], 96)).toBeNull();
  expect(findCurrentSectionAnchor(document, ['missing'], 96)).toBeNull();
});
it('restores by scrolling the anchor to the offset; null and unknown anchors do nothing', () => {
  sections([300]);
  (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
  Object.defineProperty(window, 'scrollY', { value: 1000, configurable: true });
  restoreSectionAnchor(document, 's0', 'auto', 96);
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 1204, behavior: 'auto' });
  (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
  restoreSectionAnchor(document, null); restoreSectionAnchor(document, 'zzz');
  expect(window.scrollTo).not.toHaveBeenCalled();
});

it('contrastRatio: black/white is 21, identical is 1, #767676 on white passes AA, invalid throws', () => {
  expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  expect(contrastRatio('#336699', '#336699')).toBeCloseTo(1, 5);
  expect(contrastRatio('#767676', '#ffffff')).toBeGreaterThanOrEqual(4.5);
  expect(() => contrastRatio('red', '#fff')).toThrow();
});
it('ensureStylesheet injects each href once', () => {
  ensureStylesheet('https://x.test/a.css'); ensureStylesheet('https://x.test/a.css'); ensureStylesheet('https://x.test/b.css');
  expect(document.head.querySelectorAll('link[rel="stylesheet"]')).toHaveLength(2);
});
```

```ts
// src/styles/base.css.test.ts
import css from './base.css?raw';
it('neutralizes motion under prefers-reduced-motion', () => {
  expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  expect(css).toMatch(/animation-duration:\s*0\.01ms/);
  expect(css).toMatch(/scroll-behavior:\s*auto/);
});
it('defines a visible focus style', () => expect(css).toMatch(/:focus-visible/));
```

- [ ] **Step 2: Run** `npx vitest run src/lib src/styles` — Expected: FAIL.
- [ ] **Step 3: Implementar** los cuatro módulos con las firmas de Interfaces. `usePrefersReducedMotion` usa `useSyncExternalStore` o `useEffect` con `addEventListener('change')`.
- [ ] **Step 4: Escribir `base.css`**: reset mínimo, `scroll-behavior: smooth` por defecto, `:focus-visible { outline: 3px solid var(--c-accent); outline-offset: 3px }`, clase `.sr-only`, skip-link (`.skip-link`), y el bloque `@media (prefers-reduced-motion: reduce)` con `*, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important }` y `html { scroll-behavior: auto }`.
- [ ] **Step 5: Run** `npx vitest run src/lib src/styles` — Expected: PASS.
- [ ] **Step 6: Commit**

```bash
git add src/lib src/styles && git commit -m "feat: reduced-motion, scroll-context, contrast and stylesheet utilities"
```

---

### Task 5: Sistema de variantes

**Files:**
- Create: `src/variants/types.ts`, `src/variants/registry.ts`, `src/variants/VariantProvider.tsx`, `src/components/SectionShell.tsx`, `src/variants/{orilla,nefiu,escalamos,creativewise}/index.ts`, `src/variants/{orilla,nefiu,escalamos,creativewise}/tokens.ts`
- Test: `src/variants/variants.test.tsx`

**Interfaces:**
- Consumes: `SectionId` (Task 3); `usePrefersReducedMotion`, `findCurrentSectionAnchor`, `restoreSectionAnchor`, `contrastRatio`, `ensureStylesheet` (Task 4).
- Produces (`types.ts`):
  - `type VariantId = 'orilla' | 'nefiu' | 'escalamos' | 'creativewise'`
  - `const SECTION_ANCHORS: Record<SectionId, string>` = `{ hero: 'inicio', portfolio: 'trabajos', services: 'servicios', process: 'como-trabajamos', about: 'sobre-tea', contact: 'contacto' }`
  - `interface VariantTokens { colors: { bg: string; surface: string; fg: string; muted: string; accent: string; accentFg: string }; fonts: { display: string; body: string }; radius: string; space: string }`
  - `interface VariantDefinition { id: VariantId; number: '01' | '02' | '03' | '04'; label: string; sectionOrder: readonly SectionId[]; sections: Record<SectionId, ComponentType>; tokens: VariantTokens; fontsHref: string | null; ready: boolean }`
- Produces (`registry.ts`): `const VARIANTS: readonly VariantDefinition[]` (orden orilla, nefiu, escalamos, creativewise); `const DEFAULT_VARIANT_ID: VariantId = 'orilla'`; `function isVariantId(value: unknown): value is VariantId`.
- Produces (`VariantProvider.tsx`):
  - `function resolveInitialVariantId(search: string, storage: Pick<Storage, 'getItem'> | null): VariantId` — precedencia `?v=` válido > storage clave `tea:variant` válido > default; `getItem` que lanza → default.
  - `function applyTokens(root: HTMLElement, tokens: VariantTokens): void` — setea `--c-bg`, `--c-surface`, `--c-fg`, `--c-muted`, `--c-accent`, `--c-accent-fg`, `--font-display`, `--font-body`, `--radius`, `--space`.
  - `function VariantProvider(props: { initialId?: VariantId; storage?: Pick<Storage, 'getItem' | 'setItem'> | null; children: ReactNode }): JSX.Element`
  - `function useVariant(): { variant: VariantDefinition; setVariantId: (id: VariantId) => void }`
- Produces (`SectionShell.tsx`): `function SectionShell(props: { section: SectionId; layout: string; labelledBy?: string; className?: string; children: ReactNode }): JSX.Element` → `<section id={SECTION_ANCHORS[section]} data-section={section} data-layout={layout} aria-labelledby={labelledBy}>`.
- Cada `src/variants/<id>/index.ts` exporta `const <id>Variant: VariantDefinition` con `ready: false`, `sectionOrder` provisional (hero, portfolio, services, process, about, contact), tokens neutros que pasan contraste (`bg #ffffff`, `surface #f4f4f4`, `fg #111111`, `muted #555555`, `accent #1a1a1a`, `accentFg #ffffff`, `radius '4px'`, `space '8px'`, fuentes `system-ui, sans-serif`), `fontsHref: null` y en `sections` un stub (`<SectionShell section=… layout="stub">` con el nombre de la sección en un `<h2>`; el hero usa `<h1>`).

- [ ] **Step 1: Escribir los tests que fallan**

```tsx
// src/variants/variants.test.tsx
import { render, screen, act } from '@testing-library/react';
import { VARIANTS, DEFAULT_VARIANT_ID, isVariantId } from './registry';
import { VariantProvider, useVariant, resolveInitialVariantId } from './VariantProvider';
import { contrastRatio } from '../lib/contrast';

const memoryStorage = (initial?: string) => { let v = initial ?? null; return { getItem: () => v, setItem: (_: string, x: string) => { v = x; } }; };
const Probe = () => { const { variant, setVariantId } = useVariant();
  return <button onClick={() => setVariantId('escalamos')}>{variant.id}</button>; };

it('registers the four variants in brief order with numbers and labels', () => {
  expect(VARIANTS.map(v => `${v.number} ${v.label}`)).toEqual(['01 Orilla','02 Nefiu','03 Escalamos','04 Creativewise']);
  expect(DEFAULT_VARIANT_ID).toBe('orilla');
  expect(isVariantId('nefiu')).toBe(true); expect(isVariantId('x')).toBe(false);
});
it('every sectionOrder has all six sections once and starts with hero', () =>
  VARIANTS.forEach(v => { expect([...v.sectionOrder].sort()).toEqual(['about','contact','hero','portfolio','process','services']); expect(v.sectionOrder[0]).toBe('hero'); }));
it('every variant keeps AA contrast for fg, muted and accent text', () =>
  VARIANTS.forEach(({ tokens: { colors: c } }) => {
    expect(contrastRatio(c.fg, c.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.muted, c.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.accentFg, c.accent)).toBeGreaterThanOrEqual(4.5);
  }));

it('resolveInitialVariantId: URL > storage > default, tolerating bad values and a throwing storage', () => {
  expect(resolveInitialVariantId('?v=nefiu', memoryStorage('escalamos'))).toBe('nefiu');
  expect(resolveInitialVariantId('?v=bogus', memoryStorage('escalamos'))).toBe('escalamos');
  expect(resolveInitialVariantId('', memoryStorage('bogus'))).toBe('orilla');
  expect(resolveInitialVariantId('', null)).toBe('orilla');
  expect(resolveInitialVariantId('', { getItem: () => { throw new Error('blocked'); } })).toBe('orilla');
});
it('switching sets data-variant, tokens, storage and URL (keeping the hash), without reloading', () => {
  const storage = memoryStorage();
  window.history.replaceState(null, '', '/?x=1#servicios');
  render(<VariantProvider storage={storage}><Probe /></VariantProvider>);
  act(() => screen.getByRole('button').click());
  expect(document.documentElement.dataset.variant).toBe('escalamos');
  expect(document.documentElement.style.getPropertyValue('--c-bg')).toBe(VARIANTS[2]!.tokens.colors.bg);
  expect(storage.getItem()).toBe('escalamos');
  expect(window.location.search).toContain('v=escalamos'); expect(window.location.hash).toBe('#servicios');
});
it('does not throw when storage.setItem throws', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('blocked'); } };
  render(<VariantProvider storage={storage}><Probe /></VariantProvider>);
  expect(() => act(() => screen.getByRole('button').click())).not.toThrow();
});
it('uses document.startViewTransition when present, and updates anyway when it is missing', () => {
  const start = vi.fn((cb: () => void) => { cb(); return {}; });
  (document as unknown as { startViewTransition?: unknown }).startViewTransition = start;
  render(<VariantProvider storage={null}><Probe /></VariantProvider>);
  act(() => screen.getByRole('button').click());
  expect(start).toHaveBeenCalledTimes(1); expect(screen.getByRole('button')).toHaveTextContent('escalamos');
  delete (document as unknown as { startViewTransition?: unknown }).startViewTransition;
});
it('skips view transitions when the user prefers reduced motion', () => {
  const start = vi.fn(); (document as unknown as { startViewTransition?: unknown }).startViewTransition = start;
  window.matchMedia = (() => ({ matches: true, addEventListener() {}, removeEventListener() {} })) as never;
  render(<VariantProvider storage={null}><Probe /></VariantProvider>);
  act(() => screen.getByRole('button').click());
  expect(start).not.toHaveBeenCalled(); expect(screen.getByRole('button')).toHaveTextContent('escalamos');
  delete (window as { matchMedia?: unknown }).matchMedia; delete (document as unknown as { startViewTransition?: unknown }).startViewTransition;
});
it('keeps the section in view after switching', () => {
  document.body.insertAdjacentHTML('beforeend', '<section id="servicios"></section>');
  document.getElementById('servicios')!.getBoundingClientRect = () => ({ top: 10 } as DOMRect);
  (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
  render(<VariantProvider storage={null}><Probe /></VariantProvider>);
  act(() => screen.getByRole('button').click());
  expect(window.scrollTo).toHaveBeenCalled();
});
```

- [ ] **Step 2: Run** `npx vitest run src/variants` — Expected: FAIL.
- [ ] **Step 3: Implementar `types.ts`, `SectionShell.tsx` y los cuatro `index.ts`/`tokens.ts` neutros**, luego `registry.ts` (arma `VARIANTS` desde los cuatro `<id>Variant`).
- [ ] **Step 4: Implementar `VariantProvider.tsx`.** En `setVariantId`: capturar el ancla con `findCurrentSectionAnchor` (usando `Object.values(SECTION_ANCHORS)`), aplicar el cambio dentro de `document.startViewTransition(() => flushSync(apply))` solo si existe y `!usePrefersReducedMotion()`, y restaurar con `restoreSectionAnchor(document, anchor, 'auto')` en un `useLayoutEffect` posterior al cambio. Persistencia (`storage.setItem`, `history.replaceState` conservando `hash` y otros params) dentro de `try/catch`. `storage` por defecto: `window.localStorage` accedido dentro de `try/catch` (→ `null`). Efecto sobre `document.documentElement`: `dataset.variant`, `applyTokens`, y `ensureStylesheet(variant.fontsHref)` si no es `null`.
- [ ] **Step 5: Run** `npx vitest run src/variants && npm run typecheck` — Expected: PASS.
- [ ] **Step 6: Commit**

```bash
git add src/variants src/components/SectionShell.tsx && git commit -m "feat: variant registry, provider, persistence and tokens"
```

---

### Task 6: Componentes compartidos (media, tags, links, formulario)

**Files:**
- Create: `src/components/ProjectMedia.tsx`, `ProvisionalTag.tsx`, `ProjectCaseLink.tsx`, `ServiceTags.tsx`, `PortfolioEmptyState.tsx`, `ContactChannels.tsx`, `ContactFormProvider.tsx`, `ContactForm.tsx`
- Test: `src/components/components.test.tsx`

**Interfaces:**
- Consumes: `Project`, `ServiceId`, `ContactChannel` (Task 3); `useContent`, `findService` (Task 3).
- Produces:
  - `function ProjectMedia(props: { project: Project; className?: string }): JSX.Element` — `placeholder` → `<div role="img" aria-label="Imagen provisional: {label}">` con fondo plano `hsl({hue} 35% 72%)` y la etiqueta visible (sin gradientes); `image` → `<img alt loading="lazy">`; `video` → `<video controls preload="none" poster aria-label>`.
  - `function ProvisionalTag(): JSX.Element` — texto visible "Provisional".
  - `function ProjectCaseLink(props: { project: Project; label?: string; className?: string }): JSX.Element | null` — `null` sin `caseUrl`; si existe, `<a href={caseUrl}>` (`rel="noopener noreferrer"` y `target="_blank"` solo si la URL es absoluta).
  - `function ServiceTags(props: { serviceIds: readonly ServiceId[]; className?: string }): JSX.Element` — `<ul>` con el título de cada servicio; omite ids desconocidos.
  - `function PortfolioEmptyState(): JSX.Element` — `role="status"`, texto "Todavía no hay proyectos cargados."
  - `function ContactChannels(props: { className?: string }): JSX.Element` — lista de canales: `href` no nulo → `<a>`, `href: null` → `<span>` con "(a definir)".
  - `interface ContactDraft { name: string; email: string; message: string }`; `function validateContact(draft: ContactDraft): Partial<Record<keyof ContactDraft, string>>` — error en `name` si `trim()` vacío; en `email` si no cumple `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` tras `trim()`; en `message` si `trim().length < 10`.
  - `function ContactFormProvider(props: { children: ReactNode }): JSX.Element`; `function useContactForm(): { draft: ContactDraft; errors: Partial<Record<keyof ContactDraft, string>>; status: 'editing' | 'confirmed'; setField: (field: keyof ContactDraft, value: string) => void; submit: () => void; reset: () => void }`.
  - `function ContactForm(props: { className?: string }): JSX.Element` — usa `useContactForm`; `<label htmlFor>` en cada campo, `aria-invalid` y `aria-describedby` al error; al enviar inválido, foco en el primer campo con error; al enviar válido muestra confirmación que dice explícitamente que es una demo y que no se envió nada; botón "Editar mensaje" que llama `reset` conservando el borrador. Nunca llama `fetch` ni abre `mailto:`.

- [ ] **Step 1: Escribir los tests que fallan**

```tsx
// src/components/components.test.tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectMedia } from './ProjectMedia'; import { ProjectCaseLink } from './ProjectCaseLink';
import { ServiceTags } from './ServiceTags'; import { PortfolioEmptyState } from './PortfolioEmptyState';
import { ContactChannels } from './ContactChannels';
import { ContactFormProvider, validateContact } from './ContactFormProvider'; import { ContactForm } from './ContactForm';
import { defaultContent } from '../content/ContentProvider';
const p = defaultContent.projects[0]!;

it('placeholder media has an accessible name flagged as provisional', () => {
  render(<ProjectMedia project={p} />);
  expect(screen.getByRole('img', { name: /imagen provisional/i })).toBeInTheDocument();
});
it('image media requires and renders its alt text', () => {
  render(<ProjectMedia project={{ ...p, media: { kind: 'image', src: '/x.jpg', alt: 'Cartel en vidriera' } }} />);
  expect(screen.getByAltText('Cartel en vidriera')).toHaveAttribute('loading', 'lazy');
});
it('ProjectCaseLink renders nothing without caseUrl and a real link with it', () => {
  const { container, rerender } = render(<ProjectCaseLink project={p} />);
  expect(container).toBeEmptyDOMElement();
  rerender(<ProjectCaseLink project={{ ...p, caseUrl: 'https://example.com/caso' }} label="Ver caso" />);
  expect(screen.getByRole('link', { name: 'Ver caso' })).toHaveAttribute('href', 'https://example.com/caso');
});
it('ServiceTags prints service titles and skips unknown ids', () => {
  render(<ServiceTags serviceIds={['fotoproducto', 'nope' as never]} />);
  expect(screen.getAllByRole('listitem').map(li => li.textContent)).toEqual(['Fotoproducto']);
});
it('empty state is a status message', () => {
  render(<PortfolioEmptyState />);
  expect(screen.getByRole('status')).toHaveTextContent('Todavía no hay proyectos cargados.');
});
it('placeholder channels are not links', () => {
  render(<ContactChannels />);
  expect(screen.queryAllByRole('link')).toHaveLength(0);
  expect(screen.getAllByText(/a definir/i).length).toBe(defaultContent.site.contact.channels.length);
});

it('validateContact flags empty name, malformed email and short message; accepts padded valid data', () => {
  expect(Object.keys(validateContact({ name: ' ', email: 'a@b', message: 'corto' })).sort()).toEqual(['email','message','name']);
  expect(validateContact({ name: ' Ana ', email: ' ana@mail.com ', message: 'Quiero hablar de mi marca' })).toEqual({});
});
const setup = () => render(<ContactFormProvider><ContactForm /></ContactFormProvider>);
it('invalid submit shows errors and focuses the first invalid field', async () => {
  setup(); await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
  expect(screen.getByLabelText(/nombre/i)).toHaveFocus(); expect(screen.getByLabelText(/nombre/i)).toHaveAttribute('aria-invalid', 'true');
});
it('valid submit confirms as a demo, never calls fetch, and lets the user go back to edit', async () => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch' as never).mockImplementation((() => Promise.reject()) as never);
  setup();
  await userEvent.type(screen.getByLabelText(/nombre/i), 'Ana');
  await userEvent.type(screen.getByLabelText(/email/i), 'ana@mail.com');
  await userEvent.type(screen.getByLabelText(/mensaje/i), 'Quiero hablar de mi marca');
  await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
  expect(screen.getByRole('status')).toHaveTextContent(/demo/i); expect(fetchSpy).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button', { name: /editar mensaje/i }));
  expect(screen.getByLabelText(/nombre/i)).toHaveValue('Ana');
});
it('the draft survives unmounting and remounting the form under the same provider', async () => {
  const Host = ({ show }: { show: boolean }) => <ContactFormProvider>{show ? <ContactForm /> : <p>otra variante</p>}</ContactFormProvider>;
  const { rerender } = render(<Host show />);
  await userEvent.type(screen.getByLabelText(/nombre/i), 'Ana');
  rerender(<Host show={false} />); rerender(<Host show />);
  expect(screen.getByLabelText(/nombre/i)).toHaveValue('Ana');
});
```

- [ ] **Step 2: Run** `npx vitest run src/components` — Expected: FAIL.
- [ ] **Step 3: Implementar** los componentes con las firmas de Interfaces. Estilos de estos componentes: solo clases neutras (`.project-media`, `.tag-list`, `.contact-form`, `.field`, `.field-error`) definidas con variables `--c-*`; el aspecto fino lo ajusta cada variante en su CSS.
- [ ] **Step 4: Run** `npx vitest run src/components && npm run typecheck` — Expected: PASS.
- [ ] **Step 5: Commit**

```bash
git add src/components && git commit -m "feat: shared project media, tags, links and demo contact form"
```

---

### Task 7: Shell (Header, selector, Footer, App) y test de contrato

**Files:**
- Create: `src/components/Header.tsx`, `src/components/VariantSwitcher.tsx`, `src/components/Footer.tsx`, `src/styles/shell.css`
- Modify: `src/App.tsx`, `src/main.tsx`
- Test: `src/components/shell.test.tsx`, `src/variants/variantContract.test.tsx`

**Interfaces:**
- Consumes: `useVariant`, `VariantProvider` (Task 5); `ContentProvider`, `useContent` (Task 3); `ContactFormProvider` (Task 6); `usePrefersReducedMotion` (Task 4).
- Produces:
  - `interface AppProps { content?: ContentBundle; initialVariantId?: VariantId; storage?: Pick<Storage, 'getItem' | 'setItem'> | null }`; `function App(props?: AppProps): JSX.Element` — árbol `ContentProvider > VariantProvider > ContactFormProvider > (skip-link, Header, <main id="main"> con las secciones en el orden de `variant.sectionOrder`, Footer)`.
  - `function VariantSwitcher(): JSX.Element` — `<fieldset>` con `<legend class="sr-only">Propuesta de diseño</legend>` y cuatro `<input type="radio">` (nativos, navegables con flechas), cada uno con nombre accesible `"01 Orilla"`, etc.; el seleccionado es la variante activa. En móvil (CSS) se muestra como segunda fila del header con solo los números y el nombre de la activa visible.
  - `function Header(): JSX.Element` — `<header>` con marca, `<nav aria-label="Principal">` (links `#trabajos`, `#servicios`, desde `site.nav`), CTA "iniciar una conversación" → `#contacto`, `VariantSwitcher`, y botón de menú móvil con `aria-expanded` y `aria-controls`.
  - `function Footer(): JSX.Element` — marca, links de `site.nav`, `ContactChannels`, `site.footer.prototypeNote`.

- [ ] **Step 1: Escribir los tests del shell**

```tsx
// src/components/shell.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { ContactForm } from './ContactForm';

it('the switcher exposes the four proposals as radios and marks the active one', () => {
  render(<App storage={null} initialVariantId="orilla" />);
  expect(screen.getAllByRole('radio').map(r => r.getAttribute('aria-label') ?? r.closest('label')?.textContent?.trim()))
    .toEqual(['01 Orilla', '02 Nefiu', '03 Escalamos', '04 Creativewise']);
  expect(screen.getByRole('radio', { name: '01 Orilla' })).toBeChecked();
});
it('selecting a proposal switches variant without reloading and updates the active radio', async () => {
  render(<App storage={null} initialVariantId="orilla" />);
  await userEvent.click(screen.getByRole('radio', { name: '03 Escalamos' }));
  expect(document.documentElement.dataset.variant).toBe('escalamos');
  expect(screen.getByRole('radio', { name: '03 Escalamos' })).toBeChecked();
});
it('arrow keys move between proposals', async () => {
  render(<App storage={null} initialVariantId="orilla" />);
  screen.getByRole('radio', { name: '01 Orilla' }).focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(document.documentElement.dataset.variant).toBe('nefiu');
});
it('skip link is the first tab stop and targets #main', async () => {
  render(<App storage={null} />);
  await userEvent.tab();
  expect(screen.getByRole('link', { name: /saltar al contenido/i })).toHaveFocus();
  expect(screen.getByRole('link', { name: /saltar al contenido/i })).toHaveAttribute('href', '#main');
});
it('mobile menu toggles aria-expanded, closes on Escape returning focus, and closes after choosing a link', async () => {
  render(<App storage={null} />);
  const toggle = screen.getByRole('button', { name: /menú/i });
  await userEvent.click(toggle); expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await userEvent.keyboard('{Escape}'); expect(toggle).toHaveAttribute('aria-expanded', 'false'); expect(toggle).toHaveFocus();
  await userEvent.click(toggle); await userEvent.click(screen.getAllByRole('link', { name: /servicios/i })[0]!);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
it('header CTA and nav point at existing anchors', () => {
  render(<App storage={null} />);
  expect(screen.getAllByRole('link', { name: /conversación/i })[0]).toHaveAttribute('href', '#contacto');
});
it('footer shows the prototype note', () => {
  render(<App storage={null} />);
  expect(screen.getByText(/prototipo para evaluación/i)).toBeInTheDocument();
});
it('the form draft survives switching variants', async () => {
  render(<App storage={null} initialVariantId="orilla" />);
  // la variante activa debe renderizar <ContactForm /> en su sección de contacto; con stubs, montarlo bajo el mismo provider
  // (este test se activa con `ready` en la Task 8; mientras tanto se valida con el host del test de Task 6)
  expect(document.getElementById('contacto')).toBeInTheDocument();
});
```

- [ ] **Step 2: Escribir el test de contrato** (corre sobre cada variante con `ready: true`; en esta task no hay ninguna, por eso `describe.each` queda vacío y pasa; las Tasks 8–11 lo ponen a prueba)

```tsx
// src/variants/variantContract.test.tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { VARIANTS } from './registry';
import { SECTION_ANCHORS } from './types';
import { defaultContent } from '../content/ContentProvider';

const ready = VARIANTS.filter(v => v.ready);
describe.each(ready.map(v => [v.id, v] as const))('variant contract: %s', (id, v) => {
  const mount = (content = defaultContent) => render(<App storage={null} initialVariantId={id} content={content} />);
  const sec = (s: keyof typeof SECTION_ANCHORS) => document.getElementById(SECTION_ANCHORS[s])!;

  it('renders the six sections once, in its declared order', () => {
    mount();
    expect([...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section'))).toEqual([...v.sectionOrder]);
  });
  it('has exactly one h1, with the hero copy and no banned phrases', () => {
    mount();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(sec('hero')).toHaveTextContent(defaultContent.site.hero.headline);
    expect(sec('hero').textContent).not.toMatch(/siguiente nivel|soluciones innovadoras/i);
  });
  it('shows the seven services', () => {
    mount();
    defaultContent.services.forEach(s => expect(within(sec('services')).getAllByText(s.title).length).toBeGreaterThan(0));
  });
  it('shows every project, and a project added through content appears without touching variant code', () => {
    const extra = { ...defaultContent.projects[0]!, id: 'extra', name: 'Proyecto agregado por datos' };
    mount({ ...defaultContent, projects: [...defaultContent.projects, extra] });
    [...defaultContent.projects, extra].forEach(p => expect(within(sec('portfolio')).getAllByText(p.name).length).toBeGreaterThan(0));
  });
  it('portfolio with zero projects keeps its anchor and shows the empty state', () => {
    mount({ ...defaultContent, projects: [] });
    expect(sec('portfolio')).toBeInTheDocument();
    expect(within(sec('portfolio')).getByText('Todavía no hay proyectos cargados.')).toBeInTheDocument();
  });
  it('never renders dead links: no href="#" or empty, every #anchor exists once, projects without caseUrl have no case link', () => {
    mount();
    document.querySelectorAll('a').forEach(a => { const h = a.getAttribute('href'); expect(h).toBeTruthy(); expect(h).not.toBe('#'); });
    document.querySelectorAll('a[href^="#"]').forEach(a => expect(document.querySelectorAll(`[id="${a.getAttribute('href')!.slice(1)}"]`)).toHaveLength(1));
    expect(within(sec('portfolio')).queryAllByRole('link')).toHaveLength(0);
  });
  it('a project with caseUrl links to it', () => {
    const withCase = { ...defaultContent.projects[0]!, caseUrl: 'https://example.com/caso' };
    mount({ ...defaultContent, projects: [withCase] });
    expect(within(sec('portfolio')).getByRole('link')).toHaveAttribute('href', 'https://example.com/caso');
  });
  it('unknown service ids on a project do not break the portfolio', () => {
    mount({ ...defaultContent, projects: [{ ...defaultContent.projects[0]!, services: ['nope' as never] }] });
    expect(sec('portfolio')).toBeInTheDocument();
  });
  it('images and media have accessible names; buttons have names', () => {
    mount();
    document.querySelectorAll('img').forEach(i => expect(i.getAttribute('alt')).not.toBeNull());
    screen.getAllByRole('button').forEach(b => expect(b).toHaveAccessibleName());
  });
  it('placeholder contact channels are not links', () => {
    mount();
    expect(within(sec('contact')).queryAllByRole('link')).toHaveLength(0);
  });
  it('the contact form draft survives switching to another variant and back', async () => {
    mount();
    await userEvent.type(within(sec('contact')).getByLabelText(/nombre/i), 'Ana');
    const other = VARIANTS.find(x => x.id !== id)!;
    await userEvent.click(screen.getByRole('radio', { name: `${other.number} ${other.label}` }));
    await userEvent.click(screen.getByRole('radio', { name: `${v.number} ${v.label}` }));
    expect(within(sec('contact')).getByLabelText(/nombre/i)).toHaveValue('Ana');
  });
});
```

- [ ] **Step 3: Run** `npx vitest run src/components/shell.test.tsx` — Expected: FAIL.
- [ ] **Step 4: Implementar** `VariantSwitcher`, `Header` (menú móvil con `Escape` y retorno de foco), `Footer`, `App` con `AppProps`, `shell.css` (header sticky con `top: 0`, fila móvil del selector, estados hover/focus/active, targets táctiles ≥ 44px) y los imports de `base.css`/`shell.css` en `main.tsx`. Los estilos del header se ajustan por variante vía `[data-variant]` en la CSS de cada una (Tasks 8–11), de modo que el selector se vea integrado y no como un widget ajeno.
- [ ] **Step 5: Run** `npm test && npm run typecheck && npm run build` — Expected: PASS (el contrato corre vacío hasta la Task 8).
- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: header, variant switcher, footer, app shell and variant contract tests"
```

---

### Task 8: Variante 01 · Orilla (editorial y de marca)

**Files:**
- Modify: `src/variants/orilla/index.ts`, `src/variants/orilla/tokens.ts`
- Create: `src/variants/orilla/{orilla.css,Hero.tsx,Portfolio.tsx,Services.tsx,Process.tsx,About.tsx,Contact.tsx}`
- Test: `src/variants/orilla/orilla.test.tsx`

**Interfaces:**
- Consumes: `docs/design/directions.md` § 01 · Orilla "Decisiones para TEA" (paleta, fuentes, composición, motion); `SectionShell`, `ProjectMedia`, `ProvisionalTag`, `ProjectCaseLink`, `ServiceTags`, `PortfolioEmptyState`, `ContactForm`, `ContactChannels`; `useContent`.
- Produces: `orillaVariant: VariantDefinition` con `ready: true`, `sectionOrder: ['hero','about','portfolio','services','process','contact']`, `fontsHref` con las familias de directions.md. `data-layout` fijos: hero `orilla-editorial`, portfolio `orilla-index`, services `orilla-typographic`, process `orilla-steps`, about `orilla-editorial`, contact `orilla-contact`.
- Intención: experiencia editorial; hero tipográfico de gran escala con composición asimétrica; "Sobre TEA" temprano para dar voz de marca; portfolio como índice editorial (filas con número, nombre, categoría, servicios, media); servicios como lista tipográfica numerada. Ningún contenido depende solo de `:hover`.

- [ ] **Step 1: Escribir los tests que fallan** (más el contrato, que se activa al poner `ready: true`)

```tsx
// src/variants/orilla/orilla.test.tsx
import { render, within } from '@testing-library/react';
import { App } from '../../App';
import { defaultContent } from '../../content/ContentProvider';

const mount = () => render(<App storage={null} initialVariantId="orilla" />);
it('orders sections editorially: hero, about, portfolio, services, process, contact', () => {
  mount();
  expect([...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section')))
    .toEqual(['hero','about','portfolio','services','process','contact']);
});
it('uses the Orilla layouts', () => {
  mount();
  expect(document.querySelector('[data-section="hero"]')).toHaveAttribute('data-layout', 'orilla-editorial');
  expect(document.querySelector('[data-section="portfolio"]')).toHaveAttribute('data-layout', 'orilla-index');
  expect(document.querySelector('[data-section="services"]')).toHaveAttribute('data-layout', 'orilla-typographic');
});
it('lists the seven services as a numbered ordered list', () => {
  mount();
  const list = within(document.querySelector('[data-section="services"]') as HTMLElement).getByRole('list');
  expect(list.tagName).toBe('OL'); expect(within(list).getAllByRole('listitem')).toHaveLength(7);
});
it('portfolio rows show name, category and description without hover, with the provisional tag', () => {
  mount();
  const portfolio = within(document.querySelector('[data-section="portfolio"]') as HTMLElement);
  const p = defaultContent.projects[0]!;
  expect(portfolio.getByText(p.name)).toBeVisible(); expect(portfolio.getAllByText(p.category).length).toBeGreaterThan(0);
  expect(portfolio.getByText(p.description)).toBeVisible(); expect(portfolio.getAllByText('Provisional').length).toBe(defaultContent.projects.length);
});
```

- [ ] **Step 2: Poner `ready: true` en `orillaVariant`** y correr `npx vitest run src/variants` — Expected: FAIL (contrato y tests de Orilla fallan con stubs).
- [ ] **Step 3: `tokens.ts` y `orilla.css`** con los valores de directions.md (colores, fuentes, `radius`, `space`); `fontsHref` con las familias elegidas (`&display=swap`). CSS scoped bajo `[data-variant='orilla']`, incluyendo el ajuste del header y del selector.
- [ ] **Step 4: Implementar `Hero.tsx` y `Portfolio.tsx`**: `export function OrillaHero(): JSX.Element` y `export function OrillaPortfolio(): JSX.Element`. El portfolio mapea `useContent().projects` (cero proyectos → `PortfolioEmptyState`).
- [ ] **Step 5: Implementar `Services.tsx`, `Process.tsx`, `About.tsx`, `Contact.tsx`** (`OrillaServices`, `OrillaProcess`, `OrillaAbout`, `OrillaContact`; este último usa `ContactForm` y `ContactChannels`) y cablearlos en `index.ts`.
- [ ] **Step 6: Run** `npm test && npm run typecheck` — Expected: PASS.
- [ ] **Step 7: Revisión visual** (ver Task 12 §QA para anchos y checks) de Orilla a 360, 768, 1024 y 1440 px.
- [ ] **Step 8: Commit**

```bash
git add src/variants/orilla && git commit -m "feat: variant 01 Orilla (editorial)"
```

---

### Task 9: Variante 02 · Nefiu (identidad + presentación comercial)

**Files:**
- Modify: `src/variants/nefiu/index.ts`, `src/variants/nefiu/tokens.ts`
- Create: `src/variants/nefiu/{nefiu.css,bento.ts,Hero.tsx,Portfolio.tsx,Services.tsx,Process.tsx,About.tsx,Contact.tsx}`
- Test: `src/variants/nefiu/nefiu.test.tsx`

**Interfaces:**
- Consumes: igual que Task 8, con § 02 · Nefiu de directions.md.
- Produces: `nefiuVariant` con `ready: true`, `sectionOrder: ['hero','services','portfolio','process','about','contact']`. `data-layout`: hero `nefiu-composition`, portfolio `nefiu-bento`, services `nefiu-modules`, process `nefiu-steps`, about `nefiu-about`, contact `nefiu-contact`.
- Produces (`bento.ts`): `type BentoSize = 'large' | 'small' | 'wide'`; `function bentoSize(index: number): BentoSize` — ciclo de período 4: `['large','small','small','wide']`.
- Intención: hero como composición gráfica (bloques de color y tipografía, identidad antes que fotos); servicios como módulos seleccionables (tablist: un servicio activo muestra su descripción), portfolio en grilla bento calculada por índice (agregar proyectos no requiere tocar tarjetas).

- [ ] **Step 1: Escribir los tests que fallan**

```tsx
// src/variants/nefiu/nefiu.test.tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { bentoSize } from './bento';
import { defaultContent } from '../../content/ContentProvider';

it('bentoSize cycles with period 4 starting large, for any index', () => {
  expect([0,1,2,3].map(bentoSize)).toEqual(['large','small','small','wide']);
  for (let i = 0; i < 40; i++) { expect(bentoSize(i)).toBe(bentoSize(i % 4)); }
});
const mount = () => render(<App storage={null} initialVariantId="nefiu" />);
it('puts services right after the hero', () => {
  mount();
  expect([...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section')).slice(0, 3)).toEqual(['hero','services','portfolio']);
});
it('services are a tablist: first selected, click selects another and shows its summary', async () => {
  mount();
  const services = within(document.querySelector('[data-section="services"]') as HTMLElement);
  const tabs = services.getAllByRole('tab'); expect(tabs).toHaveLength(7);
  expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  await userEvent.click(tabs[2]!);
  expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  expect(services.getByRole('tabpanel')).toHaveTextContent(defaultContent.services[2]!.summary);
});
it('tabs support ArrowRight/ArrowLeft with wraparound', async () => {
  mount();
  const tabs = within(document.querySelector('[data-section="services"]') as HTMLElement).getAllByRole('tab');
  tabs[0]!.focus(); await userEvent.keyboard('{ArrowLeft}');
  expect(tabs[6]).toHaveFocus(); expect(tabs[6]).toHaveAttribute('aria-selected', 'true');
});
it('portfolio tiles carry the bento size derived from their index', () => {
  mount();
  const tiles = document.querySelectorAll('[data-section="portfolio"] [data-size]');
  expect([...tiles].slice(0, 4).map(t => t.getAttribute('data-size'))).toEqual(['large','small','small','wide']);
});
```

- [ ] **Step 2: `ready: true`** en `nefiuVariant`; correr `npx vitest run src/variants` — Expected: FAIL.
- [ ] **Step 3: `bento.ts`** con `bentoSize`; correr `npx vitest run src/variants/nefiu -t bentoSize` — Expected: PASS.
- [ ] **Step 4: `tokens.ts` y `nefiu.css`** desde directions.md (scoped `[data-variant='nefiu']`, incluye ajuste de header/selector).
- [ ] **Step 5: Implementar `Hero.tsx` y `Portfolio.tsx`** (`NefiuHero`, `NefiuPortfolio`: cada tile con `data-size={bentoSize(index)}`; cero proyectos → `PortfolioEmptyState`).
- [ ] **Step 6: Implementar `Services.tsx`** (`NefiuServices`: `role="tablist"`, tabs con roving `tabIndex`, `role="tabpanel"` con `aria-labelledby`; las siete etiquetas permanecen en el DOM), `Process.tsx`, `About.tsx`, `Contact.tsx`, y cablear `index.ts`.
- [ ] **Step 7: Run** `npm test && npm run typecheck` — Expected: PASS.
- [ ] **Step 8: Revisión visual** a 360, 768, 1024 y 1440 px.
- [ ] **Step 9: Commit**

```bash
git add src/variants/nefiu && git commit -m "feat: variant 02 Nefiu (identity + commercial)"
```

---

### Task 10: Variante 03 · Escalamos (claridad de valor y respaldo)

**Files:**
- Modify: `src/variants/escalamos/index.ts`, `src/variants/escalamos/tokens.ts`
- Create: `src/variants/escalamos/{escalamos.css,interestMessage.ts,Hero.tsx,Portfolio.tsx,Services.tsx,Process.tsx,About.tsx,Contact.tsx}`
- Test: `src/variants/escalamos/escalamos.test.tsx`

**Interfaces:**
- Consumes: igual que Task 8, con § 03 · Escalamos; `useContactForm` (Task 6).
- Produces: `escalamosVariant` con `ready: true`, `sectionOrder: ['hero','services','process','portfolio','about','contact']`. `data-layout`: hero `escalamos-value`, portfolio `escalamos-proof`, services `escalamos-benefits`, process `escalamos-timeline`, about `escalamos-about`, contact `escalamos-contact`.
- Produces (`interestMessage.ts`): `function buildInterestMessage(titles: readonly string[]): string` — `[]` → `''`; `['A']` → `'Hola, me interesa conversar sobre: A.'`; `['A','B']` → `'Hola, me interesa conversar sobre: A y B.'`; `['A','B','C']` → `'Hola, me interesa conversar sobre: A, B y C.'`.
- Intención: claridad de propuesta de valor; hero con qué hace TEA y a quién ayuda (sin métricas inventadas); servicios como selector múltiple que muestra la posibilidad de combinarlos y lleva a Contacto; portfolio como respaldo (cada proyecto con los servicios que involucró vía `ServiceTags`).

- [ ] **Step 1: Escribir los tests que fallan**

```tsx
// src/variants/escalamos/escalamos.test.tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { buildInterestMessage } from './interestMessage';
import { defaultContent } from '../../content/ContentProvider';

it('buildInterestMessage joins titles in Spanish', () => {
  expect(buildInterestMessage([])).toBe('');
  expect(buildInterestMessage(['A'])).toBe('Hola, me interesa conversar sobre: A.');
  expect(buildInterestMessage(['A','B'])).toBe('Hola, me interesa conversar sobre: A y B.');
  expect(buildInterestMessage(['A','B','C'])).toBe('Hola, me interesa conversar sobre: A, B y C.');
});
const mount = () => render(<App storage={null} initialVariantId="escalamos" />);
const services = () => within(document.querySelector('[data-section="services"]') as HTMLElement);
it('services are toggleable checkboxes and the CTA is disabled with an explanation until one is chosen', () => {
  mount();
  expect(services().getAllByRole('checkbox')).toHaveLength(7);
  expect(services().getByRole('button', { name: /conversemos/i })).toBeDisabled();
  expect(services().getByText(/elegí al menos un servicio/i)).toBeInTheDocument();
});
it('choosing services and using the CTA prefills an empty message and goes to contact', async () => {
  mount();
  await userEvent.click(services().getByRole('checkbox', { name: defaultContent.services[0]!.title }));
  await userEvent.click(services().getByRole('checkbox', { name: defaultContent.services[3]!.title }));
  await userEvent.click(services().getByRole('button', { name: /conversemos/i }));
  expect(screen.getByLabelText(/mensaje/i)).toHaveValue(buildInterestMessage([defaultContent.services[0]!.title, defaultContent.services[3]!.title]));
});
it('never overwrites a message the user already typed', async () => {
  mount();
  await userEvent.type(screen.getByLabelText(/mensaje/i), 'Mi propio mensaje');
  await userEvent.click(services().getByRole('checkbox', { name: defaultContent.services[1]!.title }));
  await userEvent.click(services().getByRole('button', { name: /conversemos/i }));
  expect(screen.getByLabelText(/mensaje/i)).toHaveValue('Mi propio mensaje');
});
it('portfolio shows the services each project involved', () => {
  mount();
  const p = defaultContent.projects[0]!;
  const portfolio = within(document.querySelector('[data-section="portfolio"]') as HTMLElement);
  p.services.forEach(id => expect(portfolio.getAllByText(defaultContent.services.find(s => s.id === id)!.title).length).toBeGreaterThan(0));
});
```

- [ ] **Step 2: `ready: true`** en `escalamosVariant`; correr `npx vitest run src/variants` — Expected: FAIL.
- [ ] **Step 3: `interestMessage.ts`**; correr `npx vitest run src/variants/escalamos -t buildInterestMessage` — Expected: PASS.
- [ ] **Step 4: `tokens.ts` y `escalamos.css`** desde directions.md (scoped `[data-variant='escalamos']`, incluye ajuste de header/selector).
- [ ] **Step 5: Implementar `Hero.tsx` y `Portfolio.tsx`** (`EscalamosHero`, `EscalamosPortfolio`; cero proyectos → `PortfolioEmptyState`).
- [ ] **Step 6: Implementar `Services.tsx`** (`EscalamosServices`: estado local con los ids elegidos; el CTA hace `setField('message', buildInterestMessage(titles))` solo si `draft.message.trim() === ''` y luego `document.getElementById('contacto')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })` con `usePrefersReducedMotion`; `scrollIntoView` no existe en jsdom, definirlo como `vi.fn()` en el test o en `setup.ts`), `Process.tsx`, `About.tsx`, `Contact.tsx`, y cablear `index.ts`.
- [ ] **Step 7: Run** `npm test && npm run typecheck` — Expected: PASS.
- [ ] **Step 8: Revisión visual** a 360, 768, 1024 y 1440 px.
- [ ] **Step 9: Commit**

```bash
git add src/variants/escalamos src/test/setup.ts && git commit -m "feat: variant 03 Escalamos (value clarity + proof)"
```

---

### Task 11: Variante 04 · Creativewise (portfolio protagonista)

**Files:**
- Modify: `src/variants/creativewise/index.ts`, `src/variants/creativewise/tokens.ts`
- Create: `src/variants/creativewise/{creativewise.css,filter.ts,Hero.tsx,Portfolio.tsx,Services.tsx,Process.tsx,About.tsx,Contact.tsx}`
- Test: `src/variants/creativewise/creativewise.test.tsx`

**Interfaces:**
- Consumes: igual que Task 8, con § 04 · Creativewise.
- Produces: `creativewiseVariant` con `ready: true`, `sectionOrder: ['hero','portfolio','services','process','about','contact']`. `data-layout`: hero `creativewise-reel`, portfolio `creativewise-wall`, services `creativewise-index`, process `creativewise-steps`, about `creativewise-about`, contact `creativewise-contact`.
- Produces (`filter.ts`): `function projectCategories(projects: readonly Project[]): string[]` (únicas, en orden de primera aparición); `function filterProjects(projects: readonly Project[], category: string | null): Project[]` (`null` → todos).
- Intención: los proyectos son protagonistas desde el hero (muestra hasta 3 proyectos destacados; con cero proyectos cae a un hero tipográfico con el mismo titular); portfolio como muro visual con filtro por categoría (chips con `aria-pressed`); servicios como índice compacto.

- [ ] **Step 1: Escribir los tests que fallan**

```tsx
// src/variants/creativewise/creativewise.test.tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { projectCategories, filterProjects } from './filter';
import { defaultContent } from '../../content/ContentProvider';
const P = defaultContent.projects;

it('projectCategories keeps first-appearance order without duplicates', () => {
  const cats = projectCategories(P);
  expect(new Set(cats).size).toBe(cats.length); expect(cats[0]).toBe(P[0]!.category);
});
it('filterProjects: null returns all; a category returns only its projects; unknown returns none', () => {
  expect(filterProjects(P, null)).toHaveLength(P.length);
  expect(filterProjects(P, P[0]!.category).every(p => p.category === P[0]!.category)).toBe(true);
  expect(filterProjects(P, 'inexistente')).toEqual([]);
});
const mount = (content = defaultContent) => render(<App storage={null} initialVariantId="creativewise" content={content} />);
const wall = () => within(document.querySelector('[data-section="portfolio"]') as HTMLElement);
it('puts the portfolio right after the hero and features projects in the hero', () => {
  mount();
  expect([...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section')).slice(0, 2)).toEqual(['hero','portfolio']);
  expect(within(document.querySelector('[data-section="hero"]') as HTMLElement).getAllByRole('img').length).toBeGreaterThan(0);
});
it('hero falls back to a typographic version with no projects', () => {
  mount({ ...defaultContent, projects: [] });
  const hero = within(document.querySelector('[data-section="hero"]') as HTMLElement);
  expect(hero.queryAllByRole('img')).toHaveLength(0);
  expect(hero.getByRole('heading', { level: 1 })).toHaveTextContent(defaultContent.site.hero.headline);
});
it('filter chips toggle aria-pressed and narrow the wall; "Todos" restores it', async () => {
  mount();
  const cat = P[0]!.category;
  await userEvent.click(wall().getByRole('button', { name: cat }));
  expect(wall().getByRole('button', { name: cat })).toHaveAttribute('aria-pressed', 'true');
  expect(wall().getAllByRole('article')).toHaveLength(filterProjects(P, cat).length);
  await userEvent.click(wall().getByRole('button', { name: 'Todos' }));
  expect(wall().getAllByRole('article')).toHaveLength(P.length);
});
it('each project tile is an article with its name, category and tags', () => {
  mount();
  expect(wall().getByRole('heading', { name: P[0]!.name })).toBeInTheDocument();
});
```

- [ ] **Step 2: `ready: true`** en `creativewiseVariant`; correr `npx vitest run src/variants` — Expected: FAIL.
- [ ] **Step 3: `filter.ts`**; correr `npx vitest run src/variants/creativewise -t "projectCategories|filterProjects"` — Expected: PASS.
- [ ] **Step 4: `tokens.ts` y `creativewise.css`** desde directions.md (scoped `[data-variant='creativewise']`, incluye ajuste de header/selector).
- [ ] **Step 5: Implementar `Hero.tsx` y `Portfolio.tsx`** (`CreativewiseHero`, `CreativewisePortfolio`: estado local `category: string | null`; la revelación de descripción en hover/foco es un refuerzo, la descripción siempre está en el DOM; cero proyectos → `PortfolioEmptyState` y sin chips).
- [ ] **Step 6: Implementar `Services.tsx`, `Process.tsx`, `About.tsx`, `Contact.tsx`** y cablear `index.ts`.
- [ ] **Step 7: Run** `npm test && npm run typecheck` — Expected: PASS.
- [ ] **Step 8: Revisión visual** a 360, 768, 1024 y 1440 px.
- [ ] **Step 9: Commit**

```bash
git add src/variants/creativewise && git commit -m "feat: variant 04 Creativewise (portfolio-first)"
```

---

### Task 12: Diferenciación, documentación y QA final

**Files:**
- Create: `src/variants/differentiation.test.tsx`, `README.md`, `docs/MISSING_INFO.md`, `docs/EVALUATION.md`
- Modify: lo que el QA detecte (enlaces rotos, errores visuales)

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: `README.md` (cómo correr, cómo editar contenido y agregar un proyecto en `src/content/projects.ts`, cómo agregar una variante, dependencia externa de Google Fonts con sus fallbacks, `?v=<id>` para abrir una variante directa), `docs/MISSING_INFO.md` (logo y manual de marca, proyectos y material reales, textos definitivos, canales de contacto, dominio, backend/servicio para el formulario, analítica, textos legales), `docs/EVALUATION.md` (los 7 criterios del brief como tabla vacía para que el equipo puntúe cada variante; sin ganadora preasignada).

- [ ] **Step 1: Escribir el test de diferenciación que falla**

```tsx
// src/variants/differentiation.test.tsx
import { render } from '@testing-library/react';
import { App } from '../App';
import { VARIANTS } from './registry';

it('all four variants are ready', () => expect(VARIANTS.every(v => v.ready)).toBe(true));
it('section orders are pairwise different', () =>
  expect(new Set(VARIANTS.map(v => v.sectionOrder.join('>'))).size).toBe(4));
it.each(['hero', 'portfolio', 'services'] as const)('%s uses a distinct layout in every variant (not just a retheme)', section => {
  const layouts = VARIANTS.map(v => {
    const { unmount } = render(<App storage={null} initialVariantId={v.id} />);
    const layout = document.querySelector(`[data-section="${section}"]`)!.getAttribute('data-layout');
    unmount(); return layout;
  });
  expect(new Set(layouts).size).toBe(4);
});
```

- [ ] **Step 2: Run** `npx vitest run src/variants/differentiation.test.tsx` — Expected: PASS si las Tasks 8–11 respetaron los `data-layout` fijados; si falla, corregir la variante que se desvió.
- [ ] **Step 3: Redactar `README.md`, `docs/MISSING_INFO.md` y `docs/EVALUATION.md`.**
- [ ] **Step 4: Verificación automática**

Run: `npm run typecheck && npm test && npm run build`
Expected: typecheck sin errores, todos los tests PASS, build exitoso.
- [ ] **Step 5: QA manual** con `npm run dev` (si no hay navegador disponible, decirlo explícitamente en el informe final; no declarar verificado lo que no se vio). Para cada variante a 360, 768, 1024 y 1440 px: sin scroll horizontal (`document.documentElement.scrollWidth <= window.innerWidth`); selector accesible y sin saturar el header en móvil; recorrer con `Tab` todo el sitio (foco siempre visible, orden lógico); emular `prefers-reduced-motion: reduce` (sin animaciones); cambiar de variante a mitad de página (mantiene la sección en vista) y con el formulario a medio completar (no se pierde); clic en cada link de navegación y CTA; con `?v=nefiu` abre directo esa variante. Corregir lo que falle y repetir el Step 4.
- [ ] **Step 6: Informe final** (en el mensaje de cierre, no en un archivo): confirmar los cinco puntos "Antes de terminar" del brief (variantes funcionando, selector sin errores, desktop/móvil, enlaces y errores visuales corregidos, contenidos provisionales identificados) y listar la información faltante tomando `docs/MISSING_INFO.md`.
- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "docs+test: differentiation test, README, missing info, evaluation sheet"
```

---

## Prompt de arranque para Claude Code

```
Ejecutá el plan docs/superpowers/plans/2026-10-12-tea-website-prototype.md task por task
con superpowers:subagent-driven-development. El brief está en
docs/superpowers/specs/2026-10-12-tea-brief.md (leelo completo antes de empezar).
Respetá los Global Constraints textualmente y no avances de task con tests en rojo.
En la Task 2, inspeccioná las cuatro referencias y no afirmes nada que no hayas observado.
```
