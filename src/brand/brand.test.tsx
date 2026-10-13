import { render, screen } from '@testing-library/react';
import { BRAND, TONES, TEXT_PAIRS, brandViolations } from './palette';
import { Wordmark } from './Wordmark';
import { Isotype } from './Isotype';
import { contrastRatio } from '../lib/contrast';
import wordmarkSvg from '../../docs/brand/estudio_amigo_logo-01.svg?raw';
import isotypeSvg from '../../docs/brand/Estudio_amigo_amigo-04.svg?raw';

const pathData = (svg: string) => [...svg.matchAll(/ d="([^"]+)"/g)].map(m => m[1]);

it('BRAND holds the official palette exactly', () =>
  expect(BRAND).toEqual({ navy: '#234060', lime: '#c8f264', magenta: '#c61e97', gray: '#dcdcdc', white: '#ffffff' }));

it('every allowed text pair and every tone passes WCAG AA', () => {
  [...TEXT_PAIRS, ...Object.values(TONES)].forEach(p => {
    const [fg, bg] = 'fg' in p && 'bg' in p ? [p.fg, p.bg] : [];
    expect(contrastRatio(BRAND[fg!], BRAND[bg!])).toBeGreaterThanOrEqual(4.5);
  });
});

it('brandViolations flags off-brand hex, rgba, hsl and gradients, and accepts brand colors', () => {
  expect(brandViolations('a{color:#234060;background:#FFF;border:1px solid rgba(35,64,96,.2)}')).toEqual([]);
  expect(brandViolations('a{color:#0b57d0}')).toHaveLength(1);
  expect(brandViolations('a{box-shadow:0 0 4px rgba(0,0,0,.1)}')).toHaveLength(1);
  expect(brandViolations('a{color:hsl(10 35% 72%)}')).toHaveLength(1);
  expect(brandViolations('a{background:linear-gradient(#234060,#c8f264)}')).toHaveLength(1);
});

it('Wordmark is an accessible image, uses currentColor and keeps the supplied path data', () => {
  const { container } = render(<Wordmark />);
  expect(screen.getByRole('img', { name: 'estudio amigo' })).toBeInTheDocument();
  expect(container.querySelectorAll('path')).toHaveLength(12);
  expect([...container.querySelectorAll('path')].map(p => p.getAttribute('d'))).toEqual(pathData(wordmarkSvg));
  container.querySelectorAll('path').forEach(p => expect(p.getAttribute('fill')).toBe('currentColor'));
});

it('Isotype is decorative, uses currentColor and keeps the supplied path data', () => {
  const { container } = render(<Isotype />);
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  expect(container.querySelector('path')!.getAttribute('d')).toBe(pathData(isotypeSvg)[0]);
  expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor');
});
