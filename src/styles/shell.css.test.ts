import shell from './shell.css?raw';

it('removes the header switcher row', () => expect(shell).not.toMatch(/header-switcher-row/));
it('floats the dock above the content respecting the safe area', () => {
  expect(shell).toMatch(/\.variant-dock\s*{[^}]*position:\s*fixed/);
  expect(shell).toMatch(/\.variant-dock\s*{[^}]*env\(safe-area-inset-bottom/);
});
it('hides the dock while a form field has focus so it never covers the submit button', () =>
  expect(shell).toMatch(/:has\(\.contact-form[^)]*:focus\)[^{]*\.variant-dock/));
it('the footer reserves room for the dock', () =>
  expect(shell).toMatch(/\.site-footer[^{]*{[^}]*padding-bottom:\s*calc\(/));
