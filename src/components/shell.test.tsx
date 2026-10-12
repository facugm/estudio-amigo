import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

it('the switcher exposes the four proposals as radios and marks the active one', () => {
  render(<App storage={null} initialVariantId="orilla" />);
  expect(
    screen
      .getAllByRole('radio')
      .map(r => r.getAttribute('aria-label') ?? r.closest('label')?.textContent?.trim())
  ).toEqual(['01 Orilla', '02 Nefiu', '03 Escalamos', '04 Creativewise']);
  expect(screen.getByRole('radio', { name: '01 Orilla' })).toBeChecked();
});

it('selecting a proposal switches variant without reloading and updates the active radio', async () => {
  render(<App storage={null} initialVariantId="orilla" />);
  await userEvent.click(screen.getByRole('radio', { name: '03 Escalamos' }));
  expect(document.documentElement.dataset.variant).toBe('escalamos');
  expect(screen.getByRole('radio', { name: '03 Escalamos' })).toBeChecked();
});

it('arrow keys move between proposals', async () => {
  render(<App storage={null} initialVariantId="orilla" />);
  screen.getByRole('radio', { name: '01 Orilla' }).focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(document.documentElement.dataset.variant).toBe('nefiu');
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
  render(<App storage={null} initialVariantId="orilla" />);
  expect(document.getElementById('contacto')).toBeInTheDocument();
});
