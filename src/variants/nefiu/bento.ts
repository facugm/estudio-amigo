export type BentoSize = 'large' | 'small' | 'wide';

const CYCLE: readonly BentoSize[] = ['large', 'small', 'small', 'wide'];

export function bentoSize(index: number): BentoSize {
  const normalized = Math.abs(index) % CYCLE.length;
  return CYCLE[normalized]!;
}
