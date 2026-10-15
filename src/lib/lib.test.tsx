import { renderHook, act } from '@testing-library/react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { findCurrentSectionAnchor, restoreSectionAnchor } from './scrollContext';
import { contrastRatio } from './contrast';

const stubMatchMedia = (matches: boolean) => {
  let cb: ((e: { matches: boolean }) => void) | undefined;
  window.matchMedia = ((q: string) => ({
    matches,
    media: q,
    addEventListener: (_: string, f: typeof cb) => {
      cb = f;
    },
    removeEventListener: () => {}
  })) as never;
  return (m: boolean) => cb?.({ matches: m });
};

afterEach(() => {
  delete (window as { matchMedia?: unknown }).matchMedia;
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

it('reduced motion is false when matchMedia is missing', () =>
  expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(false));

it('reduced motion is true when the query matches and follows changes', () => {
  const fire = stubMatchMedia(true);
  const { result } = renderHook(() => usePrefersReducedMotion());
  expect(result.current).toBe(true);
  act(() => fire(false));
  expect(result.current).toBe(false);
});

const sections = (tops: number[]) => {
  document.body.innerHTML = tops.map((_, i) => `<section id="s${i}"></section>`).join('');
  tops.forEach((t, i) => {
    document.getElementById(`s${i}`)!.getBoundingClientRect = () => ({ top: t } as DOMRect);
  });
};

it('finds the last section whose top is above the offset', () => {
  sections([-500, -10, 400]);
  expect(findCurrentSectionAnchor(document, ['s0', 's1', 's2'], 96)).toBe('s1');
});

it('returns null when no section reached the offset, and skips missing anchors', () => {
  sections([200, 500]);
  expect(findCurrentSectionAnchor(document, ['s0', 's1'], 96)).toBeNull();
  expect(findCurrentSectionAnchor(document, ['missing'], 96)).toBeNull();
});

it('restores by scrolling the anchor to the offset; null and unknown anchors do nothing', () => {
  sections([300]);
  (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
  Object.defineProperty(window, 'scrollY', { value: 1000, configurable: true });
  restoreSectionAnchor(document, 's0', 'auto', 96);
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 1204, behavior: 'auto' });
  (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
  restoreSectionAnchor(document, null);
  restoreSectionAnchor(document, 'zzz');
  expect(window.scrollTo).not.toHaveBeenCalled();
});

it('contrastRatio: black/white is 21, identical is 1, #767676 on white passes AA, invalid throws', () => {
  expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  expect(contrastRatio('#336699', '#336699')).toBeCloseTo(1, 5);
  expect(contrastRatio('#767676', '#ffffff')).toBeGreaterThanOrEqual(4.5);
  expect(() => contrastRatio('red', '#fff')).toThrow();
});
