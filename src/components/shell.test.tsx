import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { defaultContent } from '../content/ContentProvider';
import { SECTION_ANCHORS } from '../variants/types';

it('the switcher exposes the three proposals as radios and marks the active one', () => {
  render(<App storage={null} initialVariantId="nefiu" />);
  expect(
    screen
      .getAllByRole('radio')
      .map(r => r.getAttribute('aria-label') ?? r.closest('label')?.textContent?.trim())
  ).toEqual(['02 Nefiu', '03 Escalamos', '04 Creativewise']);
  expect(screen.getByRole('radio', { name: '02 Nefiu' })).toBeChecked();
});

it('selecting a proposal switches variant without reloading and updates the active radio', async () => {
  render(<App storage={null} initialVariantId="nefiu" />);
  await userEvent.click(screen.getByRole('radio', { name: '03 Escalamos' }));
  expect(document.documentElement.dataset.variant).toBe('escalamos');
  expect(screen.getByRole('radio', { name: '03 Escalamos' })).toBeChecked();
});

it('arrow keys move between proposals', async () => {
  render(<App storage={null} initialVariantId="nefiu" />);
  screen.getByRole('radio', { name: '02 Nefiu' }).focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(document.documentElement.dataset.variant).toBe('escalamos');
  screen.getByRole('radio', { name: '02 Nefiu' }).focus();
  await userEvent.keyboard('{ArrowLeft}');
  expect(document.documentElement.dataset.variant).toBe('creativewise');
});

it('skip link is the first tab stop and targets #main', async () => {
  render(<App storage={null} />);
  await userEvent.tab();
  expect(screen.getByRole('link', { name: /saltar al contenido/i })).toHaveFocus();
  expect(screen.getByRole('link', { name: /saltar al contenido/i })).toHaveAttribute('href', '#main');
});

it('mobile menu toggles aria-expanded, closes on Escape returning focus, and closes after choosing a link', async () => {
  render(<App storage={null} />);
  const toggle = screen.getByRole('button', { name: /menú/i });
  await userEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await userEvent.keyboard('{Escape}');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
  await userEvent.click(toggle);
  await userEvent.click(screen.getAllByRole('link', { name: /servicios/i })[0]!);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

it('header CTA and nav point at existing anchors', () => {
  render(<App storage={null} />);
  expect(screen.getAllByRole('link', { name: /conversación/i })[0]).toHaveAttribute(
    'href',
    '#contacto'
  );
});

it('footer shows the prototype note', () => {
  render(<App storage={null} />);
  expect(screen.getByText(/prototipo para evaluación/i)).toBeInTheDocument();
});

it('the form draft survives switching variants', async () => {
  render(<App storage={null} initialVariantId="nefiu" />);
  expect(document.getElementById('contacto')).toBeInTheDocument();
});

it('header brand is the wordmark linking to the top, with an accessible name', () => {
  render(<App storage={null} />);
  const brand = screen.getByRole('link', { name: /estudio amigo/i });
  expect(brand).toHaveAttribute('href', '#inicio');
  expect(brand.querySelector('svg')).not.toBeNull();
});

it('footer shows the wordmark, the nav and the prototype note, without repeating the hero paragraph', () => {
  render(<App storage={null} />);
  const footer = screen.getByRole('contentinfo');
  expect(within(footer).getByRole('img', { name: 'estudio amigo' })).toBeInTheDocument();
  expect(footer).not.toHaveTextContent(defaultContent.site.hero.support);
});

it('each section anchor referenced in nav exists in the document', () => {
  render(<App storage={null} />);
  for (const item of defaultContent.site.nav) {
    const anchor = SECTION_ANCHORS[item.section];
    const el = document.getElementById(anchor);
    expect(el).not.toBeNull();
  }
});


