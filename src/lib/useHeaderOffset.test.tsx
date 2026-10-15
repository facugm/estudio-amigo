import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useHeaderOffset } from './useHeaderOffset';

describe('useHeaderOffset', () => {
  beforeEach(() => {
    document.documentElement.style.removeProperty('--header-h');
  });

  it('sets --header-h on document.documentElement', () => {
    const el = document.createElement('header');
    Object.defineProperty(el, 'offsetHeight', { value: 92, configurable: true });

    renderHook(() => {
      const ref = useRef<HTMLElement>(el);
      useHeaderOffset(ref);
    });

    expect(document.documentElement.style.getPropertyValue('--header-h')).toBe('92px');
  });

  it('updates --header-h when window resize event fires', () => {
    const el = document.createElement('header');
    Object.defineProperty(el, 'offsetHeight', { value: 80, configurable: true });

    renderHook(() => {
      const ref = useRef<HTMLElement>(el);
      useHeaderOffset(ref);
    });

    expect(document.documentElement.style.getPropertyValue('--header-h')).toBe('80px');

    Object.defineProperty(el, 'offsetHeight', { value: 110, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(document.documentElement.style.getPropertyValue('--header-h')).toBe('110px');
  });
});
