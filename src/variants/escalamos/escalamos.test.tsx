import { render, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { defaultContent } from '../../content/ContentProvider';
import { buildInterestMessage } from './interestMessage';
import { escalamosTokens } from './tokens';
import { BRAND } from '../../brand/palette';
import css from './escalamos.css?raw';

describe('Escalamos variant', () => {
  it('disabled CTA keeps readable text: outlined with the muted token and no opacity', () => {
    const r = /\.escalamos-btn-primary:disabled\s*{[^}]*}/.exec(css)?.[0] ?? '';
    expect(r).toMatch(/color:\s*var\(--c-muted\)/);
    expect(r).toMatch(/border:\s*2px solid var\(--c-muted\)/);
    expect(r).not.toMatch(/opacity/);
  });

  it('outline buttons use white text and border on navy', () => {
    const r = /\.escalamos-btn-outline\s*{[^}]*}/.exec(css)?.[0] ?? '';
    expect(r).toMatch(/color:\s*var\(--c-fg\)/);
    expect(r).toMatch(/border:\s*2px solid var\(--c-fg\)/);
  });

  it('services grid lays out 3 + 4 cards on a 12-column grid', () => {
    expect(css).toMatch(/\.escalamos-services-grid\s*{[^}]*grid-template-columns:\s*repeat\(12/);
    expect(css).toMatch(/\.escalamos-service-card:nth-child\(-n\s*\+\s*3\)\s*{[^}]*grid-column:\s*span 4/);
    expect(css).toMatch(/\.escalamos-service-card:nth-child\(n\s*\+\s*4\)\s*{[^}]*grid-column:\s*span 3/);
  });
  it('escalamos tokens use only brand palette colors', () => {
    const brandHexValues = new Set(Object.values(BRAND).map(c => c.toLowerCase()));
    Object.values(escalamosTokens.colors).forEach(color => {
      expect(brandHexValues.has(color.toLowerCase())).toBe(true);
    });
  });

  it('buildInterestMessage formats an empty string when empty and lists services when provided', () => {
    expect(buildInterestMessage([])).toBe('');
    const msg = buildInterestMessage(['Branding y rebranding', 'Pauta digital']);
    expect(msg).toContain('Branding y rebranding, Pauta digital');
    expect(msg).toContain('Hola estudio amigo');
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

    const cta = services.getByRole('button', { name: /conversemos sobre estos servicios|solicitar diagnóstico|consultar por servicios/i });
    expect(cta).toBeDisabled();
  });

  it('checking services enables the CTA and clicking it prefills the contact form message', async () => {
    mount();
    const services = within(document.querySelector('[data-section="services"]') as HTMLElement);
    const checkboxes = services.getAllByRole('checkbox');

    await act(async () => {
      await userEvent.click(checkboxes[0]!);
      await userEvent.click(checkboxes[1]!);
    });

    const cta = services.getByRole('button', { name: /conversemos sobre estos servicios|solicitar diagnóstico|consultar por servicios/i });
    expect(cta).not.toBeDisabled();

    await act(async () => {
      await userEvent.click(cta);
    });

    const contact = within(document.querySelector('[data-section="contact"]') as HTMLElement);
    const messageInput = contact.getByLabelText(/mensaje/i);
    expect(messageInput).toHaveValue(
      buildInterestMessage([
        defaultContent.services[0]!.title,
        defaultContent.services[1]!.title
      ])
    );
  });

  it('clicking CTA preserves already typed message in contact form', async () => {
    mount();
    const contact = within(document.querySelector('[data-section="contact"]') as HTMLElement);
    const messageInput = contact.getByLabelText(/mensaje/i);
    await act(async () => {
      await userEvent.type(messageInput, 'Mi proyecto es una tienda de ropa.');
    });

    const services = within(document.querySelector('[data-section="services"]') as HTMLElement);
    const checkboxes = services.getAllByRole('checkbox');
    await act(async () => {
      await userEvent.click(checkboxes[0]!);
    });

    const cta = services.getByRole('button', { name: /conversemos sobre estos servicios|solicitar diagnóstico/i });
    await act(async () => {
      await userEvent.click(cta);
    });

    expect(messageInput).toHaveValue(
      `${buildInterestMessage([defaultContent.services[0]!.title])}\n\nMi proyecto es una tienda de ropa.`
    );
  });

  it('the CTA reads from content, and its disabled state is explained until a service is chosen', async () => {
    mount();
    const section = within(document.querySelector('[data-section="services"]') as HTMLElement);
    expect(section.getByRole('button', { name: defaultContent.site.servicesCta.label })).toBeDisabled();
    expect(section.getByText(defaultContent.site.servicesCta.empty)).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(section.getByRole('checkbox', { name: defaultContent.services[0]!.title }));
    });
    expect(section.queryByText(defaultContent.site.servicesCta.empty)).toBeNull();
  });

  it('portfolio displays service tags as proof of deliverables', () => {
    mount();
    const portfolio = within(document.querySelector('[data-section="portfolio"]') as HTMLElement);
    const tags = portfolio.getAllByRole('list');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('hero carries exactly one decorative isotype, outside the heading', () => {
    render(<App storage={null} initialVariantId="escalamos" />);
    const hero = document.querySelector('[data-section="hero"]') as HTMLElement;
    expect(hero.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(1);
    expect(hero.querySelector('h1 svg')).toBeNull();
  });
});
