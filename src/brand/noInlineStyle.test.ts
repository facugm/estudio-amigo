const tsx = import.meta.glob('/src/**/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export const INLINE_STYLE_ALLOWLIST: string[] = [];

it('no component uses inline style objects', () => {
  const offenders = Object.entries(tsx)
    .filter(
      ([p]) =>
        !p.endsWith('.test.tsx') &&
        !INLINE_STYLE_ALLOWLIST.includes(p) &&
        /style=\{\{/.test(tsx[p]!)
    )
    .map(([p]) => p);
  expect(offenders).toEqual([]);
});
