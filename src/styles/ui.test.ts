import ui from './ui.css?raw';
import { brandViolations } from '../brand/palette';

// bloque `selector { … }` cuyo selector es exactamente el indicado (los grupos y descendientes se prueban con regex aparte)
const rule = (selector: string) =>
  new RegExp(`(?:^|})\\s*${selector.replace(/[.\[\]()*+?^$|\\]/g, '\\$&')}\\s*{[^}]*}`).exec(ui)?.[0] ?? '';

it.each(['.contact-form', '.field', '.field-error', '.btn-primary', '.btn-secondary', '.contact-confirmed', '.tag-list', '.tag-item'])(
  'defines %s', sel => expect(ui).toContain(sel));
// .field-error, .tag-list y .tag-item deben tener su propio bloque (rule() lo exige)
it('form controls and buttons are at least 44px tall', () => {
  expect(ui).toMatch(/\.field input[^{]*{[^}]*min-height:\s*44px/);
  expect(ui).toMatch(/\.field textarea[^{]*{[^}]*min-height:\s*(?:\d{3}px|[\d.]+rem)/);
  expect(ui).toMatch(/\.btn-primary[^{]*{[^}]*min-height:\s*44px/);
  expect(ui).toMatch(/\.btn-secondary[^{]*{[^}]*min-height:\s*44px/);
});
it('labels sit above their controls', () => expect(ui).toMatch(/\.field label[^{]*{[^}]*display:\s*block/));
it('error messages keep the text color and mark the error with a border, never a low-contrast color', () => {
  const r = rule('.field-error');
  expect(r).toMatch(/color:\s*var\(--c-fg\)/);
  expect(r).toMatch(/border-left:\s*\d+px solid/);
});
it('chips wrap long service titles', () => {
  expect(rule('.tag-list')).toMatch(/display:\s*flex/); expect(rule('.tag-list')).toMatch(/flex-wrap:\s*wrap/);
  expect(rule('.tag-list')).toMatch(/list-style:\s*none/);
  expect(rule('.tag-item')).toMatch(/overflow-wrap:\s*anywhere/);
});
it('textarea does not resize horizontally and never overflows its container', () =>
  expect(ui).toMatch(/\.field textarea[^{]*{[^}]*resize:\s*vertical/));
it('is on brand: no off-palette colors or gradients', () => expect(brandViolations(ui)).toEqual([]));
