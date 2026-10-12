import { renderHook } from '@testing-library/react';
import { defaultContent, ContentProvider, useContent, findService } from './ContentProvider';

const TITLES = [
  'Branding y rebranding',
  'Pauta digital',
  'Papelería, cartelería, señalética y merchandising',
  'Gestión de redes sociales',
  'Creación de contenido para redes sociales',
  'Fotoproducto',
  'Sitios web'
];

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
  defaultContent.site.contact.channels.forEach(c => {
    expect(c.isPlaceholder).toBe(true);
    expect(c.href).toBeNull();
  }));

it('has the four process steps from the brief', () =>
  expect(defaultContent.site.process.steps.map(s => s.title)).toEqual([
    'Comprender el desafío',
    'Definir la estrategia',
    'Desarrollar la propuesta',
    'Implementar y acompañar'
  ]));

it('avoids banned hero phrases', () =>
  expect(`${defaultContent.site.hero.headline} ${defaultContent.site.hero.support}`).not.toMatch(
    /siguiente nivel|soluciones innovadoras/i
  ));

it('findService returns undefined for an unknown id', () =>
  expect(findService(defaultContent, 'nope' as never)).toBeUndefined());

it('useContent returns the provided bundle and falls back to defaults', () => {
  const custom = { ...defaultContent, projects: [] };
  expect(
    renderHook(() => useContent(), {
      wrapper: ({ children }) => <ContentProvider content={custom}>{children}</ContentProvider>
    }).result.current.projects
  ).toEqual([]);
  expect(renderHook(() => useContent()).result.current).toBe(defaultContent);
});
