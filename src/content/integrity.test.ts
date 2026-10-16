const files = import.meta.glob('/src/**/*.{ts,tsx}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const BANNED = [/San Juan/i, /siguiente nivel/i, /soluciones innovadoras/i, /punta a punta/i, /transforma marcas/i,
  /Diagnóstico & Crecimiento/i, /Evidencia concreta/i, /Selección curada/i, /tuestudioamigo/i, /0000-0000/];

it('no source file carries unverified claims, banned phrases or fake contact data', () => {
  const hits = Object.entries(files)
    .filter(([p]) => !/\.test\.tsx?$/.test(p))
    .flatMap(([p, src]) => BANNED.filter(r => r.test(src)).map(r => `${p}: ${r}`));
  expect(hits).toEqual([]);
});
