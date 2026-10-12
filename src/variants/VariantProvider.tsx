import {
  createContext,
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  ReactNode
} from 'react';
import { flushSync } from 'react-dom';
import { VariantId, VariantTokens, VariantDefinition, SECTION_ANCHORS } from './types';
import { VARIANTS, DEFAULT_VARIANT_ID, isVariantId } from './registry';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import { findCurrentSectionAnchor, restoreSectionAnchor } from '../lib/scrollContext';
import { ensureStylesheet } from '../lib/ensureStylesheet';

export function resolveInitialVariantId(
  search: string,
  storage: Pick<Storage, 'getItem'> | null
): VariantId {
  try {
    const params = new URLSearchParams(search);
    const v = params.get('v');
    if (isVariantId(v)) {
      return v;
    }
  } catch {}

  if (storage) {
    try {
      const stored = storage.getItem('tea:variant');
      if (isVariantId(stored)) {
        return stored;
      }
    } catch {
      return DEFAULT_VARIANT_ID;
    }
  }

  return DEFAULT_VARIANT_ID;
}

export function applyTokens(root: HTMLElement, tokens: VariantTokens): void {
  root.style.setProperty('--c-bg', tokens.colors.bg);
  root.style.setProperty('--c-surface', tokens.colors.surface);
  root.style.setProperty('--c-fg', tokens.colors.fg);
  root.style.setProperty('--c-muted', tokens.colors.muted);
  root.style.setProperty('--c-accent', tokens.colors.accent);
  root.style.setProperty('--c-accent-fg', tokens.colors.accentFg);
  root.style.setProperty('--font-display', tokens.fonts.display);
  root.style.setProperty('--font-body', tokens.fonts.body);
  root.style.setProperty('--radius', tokens.radius);
  root.style.setProperty('--space', tokens.space);
}

interface VariantContextValue {
  variant: VariantDefinition;
  setVariantId: (id: VariantId) => void;
}

const VariantContext = createContext<VariantContextValue | null>(null);

function getDefaultStorage(): Pick<Storage, 'getItem' | 'setItem'> | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {}
  return null;
}

export function VariantProvider({
  initialId,
  storage,
  children
}: {
  initialId?: VariantId;
  storage?: Pick<Storage, 'getItem' | 'setItem'> | null;
  children: ReactNode;
}): JSX.Element {
  const effectiveStorage = storage !== undefined ? storage : getDefaultStorage();
  const prefersReduced = usePrefersReducedMotion();

  const [currentId, setCurrentId] = useState<VariantId>(() => {
    if (initialId && isVariantId(initialId)) {
      return initialId;
    }
    const search = typeof window !== 'undefined' ? window.location.search : '';
    return resolveInitialVariantId(search, effectiveStorage);
  });

  const [switchTick, setSwitchTick] = useState(0);
  const savedAnchor = useRef<string | null>(null);
  const variant = VARIANTS.find(v => v.id === currentId) ?? VARIANTS[0]!;

  // Apply tokens, dataset, and fonts whenever variant changes
  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.variant = variant.id;
      applyTokens(document.documentElement, variant.tokens);
      if (variant.fontsHref) {
        ensureStylesheet(variant.fontsHref);
      }
    }
  }, [variant]);

  // Restore scroll anchor in a useLayoutEffect after switch
  useLayoutEffect(() => {
    if (savedAnchor.current && typeof document !== 'undefined') {
      restoreSectionAnchor(document, savedAnchor.current, 'auto');
      savedAnchor.current = null;
    }
  }, [switchTick]);

  const setVariantId = (nextId: VariantId) => {
    if (!isVariantId(nextId)) return;

    if (typeof document !== 'undefined') {
      savedAnchor.current = findCurrentSectionAnchor(
        document,
        Object.values(SECTION_ANCHORS)
      );
    }

    try {
      effectiveStorage?.setItem('tea:variant', nextId);
    } catch {}

    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('v', nextId);
        window.history.replaceState(null, '', url.toString());
      }
    } catch {}

    const apply = () => {
      setCurrentId(nextId);
      setSwitchTick(t => t + 1);
    };

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => unknown;
    };

    if (
      !prefersReduced &&
      typeof doc !== 'undefined' &&
      typeof doc.startViewTransition === 'function'
    ) {
      doc.startViewTransition(() => {
        flushSync(apply);
      });
    } else {
      apply();
    }
  };

  return (
    <VariantContext.Provider value={{ variant, setVariantId }}>
      {children}
    </VariantContext.Provider>
  );
}

export function useVariant(): VariantContextValue {
  const context = useContext(VariantContext);
  if (!context) {
    return {
      variant: VARIANTS[0]!,
      setVariantId: () => {}
    };
  }
  return context;
}
