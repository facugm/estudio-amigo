import css from './base.css?raw';

it('neutralizes motion under prefers-reduced-motion', () => {
  expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  expect(css).toMatch(/animation-duration:\s*0\.01ms/);
  expect(css).toMatch(/scroll-behavior:\s*auto/);
});

it('defines a visible focus style', () => expect(css).toMatch(/:focus-visible/));
