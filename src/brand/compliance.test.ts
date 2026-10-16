import { brandViolations } from './palette';

const css = import.meta.glob('/src/**/*.css', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export const CHECKED_CSS = [
  '/src/styles/base.css',
  '/src/styles/shell.css',
  '/src/styles/ui.css',
  '/src/variants/nefiu/nefiu.css',
  '/src/variants/escalamos/escalamos.css',
  '/src/variants/creativewise/creativewise.css'
];

it.each(CHECKED_CSS)('%s only uses brand colors and no gradients', path => {
  expect(css[path]).toBeDefined();
  expect(brandViolations(css[path]!)).toEqual([]);
});
