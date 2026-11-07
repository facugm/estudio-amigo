import { brandViolations } from './palette';

const css = import.meta.glob('/src/**/*.css', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export const CHECKED_CSS = [
  '/src/styles/base.css',
  '/src/styles/fonts.css',
  '/src/sections/portada/portada.css',
  '/src/sections/casos-reales/casos-reales.css'
];

it('checks every CSS file in src', () => expect(Object.keys(css).sort()).toEqual([...CHECKED_CSS].sort()));

it.each(CHECKED_CSS)('%s only uses brand colors and no gradients', path => {
  expect(css[path]).toBeDefined();
  expect(brandViolations(css[path]!)).toEqual([]);
});
