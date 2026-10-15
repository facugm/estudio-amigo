import { useEffect, RefObject } from 'react';

export function useHeaderOffset(ref?: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const update = () => {
      const el = ref?.current ?? document.querySelector<HTMLElement>('.site-header');
      if (el) {
        const height = el.offsetHeight;
        if (height > 0) {
          document.documentElement.style.setProperty('--header-h', `${height}px`);
        }
      }
    };

    update();

    window.addEventListener('resize', update, { passive: true });

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      const el = ref?.current ?? document.querySelector<HTMLElement>('.site-header');
      if (el) {
        observer = new ResizeObserver(() => update());
        observer.observe(el);
      }
    }

    return () => {
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [ref]);
}
