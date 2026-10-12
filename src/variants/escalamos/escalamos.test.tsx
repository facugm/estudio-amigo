import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { defaultContent } from '../../content/ContentProvider';
import { buildInterestMessage } from './interestMessage';

describe('Escalamos variant', () => {
  it('buildInterestMessage formats an empty string when empty and lists services when provided', () => {
    expect(buildInterestMessage([])).toBe('');
    const msg = buildInterestMessage(['Branding y rebranding', 'Pauta digital']);
    expect(msg).toContain('Branding y rebranding, Pauta digital');
    expect(msg).toContain('Hola TEA');
  });

  const mount = () => render(<App storage={null} initialVariantId="escalamos" />);

  it('declares section order with services and process before portfolio', () => {
    mount();
    expect(
      [...document.querySelectorAll('[data-section]')]
        .map(e => e.getAttribute('data-section'))
        .slice(0, 4)
    ).toEqual(['hero', 'services', 'process', 'portfolio']);
  });

  it('services render 7 checkboxes; CTA button is disabled when nothing is selected', () => {
    mount();
    const services = within(document.querySelector('[data-section="services"]') as HTMLElement);
    const checkboxes = services.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(7);
    checkboxes.forEach(cb => expect(cb).not.toBeChecked());

    const cta = services.getByRole('button', { name: /solicitar diagnóstico|consultar por servicios/i });
    expect(cta).toBeDisabled();
  });

  it('checking services enables the CTA and clicking it prefills the contact form message', async () => {
    mount();
    const services = within(document.querySelector('[data-section="services"]') as HTMLElement);
    const checkboxes = services.getAllByRole('checkbox');

    await userEvent.click(checkboxes[0]!);
    await userEvent.click(checkboxes[1]!);

    const cta = services.getByRole('button', { name: /solicitar diagnóstico|consultar por servicios/i });
    expect(cta).not.toBeDisabled();

    await userEvent.click(cta);

    const contact = within(document.querySelector('[data-section="contact"]') as HTMLElement);
    const messageInput = contact.getByLabelText(/mensaje/i);
    expect(messageInput).toHaveValue(
      buildInterestMessage([
        defaultContent.services[0]!.title,
        defaultContent.services[1]!.title
      ])
    );
  });

  it('portfolio displays service tags as proof of deliverables', () => {
    mount();
    const portfolio = within(document.querySelector('[data-section="portfolio"]') as HTMLElement);
    const tags = portfolio.getAllByRole('list');
    expect(tags.length).toBeGreaterThan(0);
  });
});
