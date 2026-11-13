import { fontSizeViolations } from './legibility';

const css = import.meta.glob('/src/**/*.css', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

it('flags font sizes under 13px and accepts 0.8125rem and above', () => {
  expect(fontSizeViolations('a{font-size:.75rem}')).toHaveLength(1);
  expect(fontSizeViolations('a{font-size:12px}')).toHaveLength(1);
  expect(fontSizeViolations('a{font-size:0.8125rem}b{font-size:13px}c{font-size:1.2rem}')).toEqual([]);
});

it.each(Object.keys(css))('%s has no text under 13px', p => expect(fontSizeViolations(css[p]!)).toEqual([]));

it('content sections share one vertical rhythm token', () => {
  expect(css['/src/styles/base.css']).toMatch(/--section-y:\s*clamp\(3\.5rem,\s*7\.6vw,\s*6\.875rem\)/);
  // La portada ocupa la pantalla completa; el resto de las secciones usa --section-y.
  ['que-hacemos/que-hacemos', 'nosotros/nosotros'].forEach(s =>
    expect(css[`/src/sections/${s}.css`]).toMatch(/padding:\s*var\(--section-y\)/));
});
