import fonts from './fonts.css?raw';
import base from './base.css?raw';
import shell from './shell.css?raw';

it('declares Museo Sans with one @font-face per supplied file, self-hosted, with font-display: swap', () => {
  const faces = fonts.match(/@font-face\s*{[^}]+}/g) ?? [];
  expect(faces.length).toBeGreaterThanOrEqual(2);
  faces.forEach(f => {
    expect(f).toMatch(/font-family:\s*['"]Museo Sans['"]/);
    expect(f).toMatch(/font-display:\s*swap/);
    expect(f).toMatch(/url\(['"]?\.?\/?[^'")]*fonts\/[^'")]+\.woff2['"]?\)/);
    expect(f).not.toMatch(/https?:/);
  });
});

it('has a readable system fallback in --font-brand', () =>
  expect(base).toMatch(/--font-brand:\s*'Museo Sans',\s*system-ui/));

it('no longer references third-party font hosts or the Monod/Monoid font', () =>
  [fonts, base, shell].forEach(css => {
    expect(css).not.toMatch(/cdnfonts|googleapis|gstatic|Monod|Monoid/i);
  }));
