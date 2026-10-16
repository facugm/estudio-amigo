import { Tone } from '../../brand/palette';

export type BentoSize = 'large' | 'small' | 'wide';

export const BENTO_SPAN: Record<BentoSize, number> = {
  large: 7,
  small: 5,
  wide: 12
};

const CYCLE: readonly BentoSize[] = ['large', 'small', 'small', 'large'];
const TONE_CYCLE: readonly Tone[] = ['navy', 'lime', 'magenta', 'gray'];

export function bentoSize(index: number, total?: number): BentoSize {
  if (total !== undefined && index === total - 1 && index % 2 === 0) {
    return 'wide';
  }
  const normalized = Math.abs(index) % CYCLE.length;
  return CYCLE[normalized]!;
}

export function bentoTone(index: number): Tone {
  const normalized = Math.abs(index) % TONE_CYCLE.length;
  return TONE_CYCLE[normalized]!;
}
