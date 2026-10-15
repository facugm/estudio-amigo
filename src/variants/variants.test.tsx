import { render, screen, act } from '@testing-library/react';
import { VARIANTS, DEFAULT_VARIANT_ID, isVariantId } from './registry';
import { VariantProvider, useVariant, resolveInitialVariantId } from './VariantProvider';
import { contrastRatio } from '../lib/contrast';

const memoryStorage = (initial?: string) => {
  let v = initial ?? null;
  return {
    getItem: () => v,
    setItem: (_: string, x: string) => {
      v = x;
    }
  };
};

const Probe = () => {
  const { variant, setVariantId } = useVariant();
  return <button onClick={() => setVariantId('escalamos')}>{variant.id}</button>;
};

it('registers the three remaining variants keeping their numbers', () => {
  expect(VARIANTS.map(v => `${v.number} ${v.label}`)).toEqual([
    '02 Nefiu',
    '03 Escalamos',
    '04 Creativewise'
  ]);
  expect(DEFAULT_VARIANT_ID).toBe('nefiu');
  expect(isVariantId('orilla')).toBe(false);
  expect(isVariantId('nefiu')).toBe(true);
  expect(isVariantId('x')).toBe(false);
});

it('every sectionOrder has all six sections once and starts with hero', () =>
  VARIANTS.forEach(v => {
    expect([...v.sectionOrder].sort()).toEqual([
      'about',
      'contact',
      'hero',
      'portfolio',
      'process',
      'services'
    ]);
    expect(v.sectionOrder[0]).toBe('hero');
  }));

it('every variant keeps AA contrast for fg, muted and accent text', () =>
  VARIANTS.forEach(({ tokens: { colors: c } }) => {
    expect(contrastRatio(c.fg, c.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.muted, c.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.accentFg, c.accent)).toBeGreaterThanOrEqual(4.5);
  }));

it('resolveInitialVariantId: URL > storage > default, tolerating bad values and a throwing storage', () => {
  expect(resolveInitialVariantId('?v=nefiu', memoryStorage('escalamos'))).toBe('nefiu');
  expect(resolveInitialVariantId('?v=bogus', memoryStorage('escalamos'))).toBe('escalamos');
  expect(resolveInitialVariantId('', memoryStorage('bogus'))).toBe('nefiu');
  expect(resolveInitialVariantId('', null)).toBe('nefiu');
  expect(
    resolveInitialVariantId('', {
      getItem: () => {
        throw new Error('blocked');
      }
    })
  ).toBe('nefiu');
});

it('legacy Orilla values in the URL or in storage fall back to the default without throwing', () => {
  expect(resolveInitialVariantId('?v=orilla', memoryStorage('orilla'))).toBe('nefiu');
  expect(resolveInitialVariantId('?v=orilla', memoryStorage('escalamos'))).toBe('escalamos');
  expect(resolveInitialVariantId('', memoryStorage('orilla'))).toBe('nefiu');
});

it('switching sets data-variant, tokens, storage and URL (keeping the hash), without reloading', () => {
  const storage = memoryStorage();
  window.history.replaceState(null, '', '/?x=1#servicios');
  render(
    <VariantProvider storage={storage}>
      <Probe />
    </VariantProvider>
  );
  act(() => screen.getByRole('button').click());
  expect(document.documentElement.dataset.variant).toBe('escalamos');
  expect(document.documentElement.style.getPropertyValue('--c-bg')).toBe(
    VARIANTS.find(v => v.id === 'escalamos')!.tokens.colors.bg
  );
  expect(storage.getItem()).toBe('escalamos');
  expect(window.location.search).toContain('v=escalamos');
  expect(window.location.hash).toBe('#servicios');
});

it('does not throw when storage.setItem throws', () => {
  const storage = {
    getItem: () => null,
    setItem: () => {
      throw new Error('blocked');
    }
  };
  render(
    <VariantProvider storage={storage}>
      <Probe />
    </VariantProvider>
  );
  expect(() => act(() => screen.getByRole('button').click())).not.toThrow();
});

it('uses document.startViewTransition when present, and updates anyway when it is missing', () => {
  const start = vi.fn((cb: () => void) => {
    cb();
    return {};
  });
  (document as unknown as { startViewTransition?: unknown }).startViewTransition = start;
  render(
    <VariantProvider storage={null}>
      <Probe />
    </VariantProvider>
  );
  act(() => screen.getByRole('button').click());
  expect(start).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button')).toHaveTextContent('escalamos');
  delete (document as unknown as { startViewTransition?: unknown }).startViewTransition;
});

it('skips view transitions when the user prefers reduced motion', () => {
  const start = vi.fn();
  (document as unknown as { startViewTransition?: unknown }).startViewTransition = start;
  window.matchMedia = (() => ({
    matches: true,
    addEventListener() {},
    removeEventListener() {}
  })) as never;
  render(
    <VariantProvider storage={null}>
      <Probe />
    </VariantProvider>
  );
  act(() => screen.getByRole('button').click());
  expect(start).not.toHaveBeenCalled();
  expect(screen.getByRole('button')).toHaveTextContent('escalamos');
  delete (window as { matchMedia?: unknown }).matchMedia;
  delete (document as unknown as { startViewTransition?: unknown }).startViewTransition;
});

it('keeps the section in view after switching', () => {
  document.body.insertAdjacentHTML('beforeend', '<section id="servicios"></section>');
  document.getElementById('servicios')!.getBoundingClientRect = () => ({ top: 10 } as DOMRect);
  (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
  render(
    <VariantProvider storage={null}>
      <Probe />
    </VariantProvider>
  );
  act(() => screen.getByRole('button').click());
  expect(window.scrollTo).toHaveBeenCalled();
});

it('variants no longer carry per-variant font loading', () =>
  VARIANTS.forEach(v => {
    expect('fontsHref' in v).toBe(false);
    expect('fonts' in v.tokens).toBe(false);
  }));

it('switching variants never injects Google Fonts links', () => {
  render(
    <VariantProvider storage={null}>
      <Probe />
    </VariantProvider>
  );
  act(() => screen.getByRole('button').click());
  expect(document.head.querySelector('link[href*="fonts.googleapis"]')).toBeNull();
});
