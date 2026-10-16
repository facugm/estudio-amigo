import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { defaultContent } from '../../content/ContentProvider';
import { serviceFilters, filterByService } from './filter';
import { creativewiseTokens } from './tokens';
import { BRAND } from '../../brand/palette';

const { projects: P, services: S } = defaultContent;

describe('Creativewise variant', () => {
  it('creativewise tokens use only brand palette colors', () => {
    const brandHexValues = new Set(Object.values(BRAND).map(c => c.toLowerCase()));
    Object.values(creativewiseTokens.colors).forEach(color => {
      expect(brandHexValues.has(color.toLowerCase())).toBe(true);
    });
  });

  it('serviceFilters lists only services used by some project, in service order', () => {
    const used = new Set(P.flatMap(p => p.services));
    expect(serviceFilters(P, S).map(s => s.id)).toEqual(S.filter(s => used.has(s.id)).map(s => s.id));
    expect(serviceFilters([], S)).toEqual([]);
  });

  it('filterByService: null returns all; an id returns only projects that involve it', () => {
    expect(filterByService(P, null)).toHaveLength(P.length);
    expect(filterByService(P, 'branding').every(p => p.services.includes('branding'))).toBe(true);
    expect(filterByService(P, 'branding').length).toBeGreaterThan(1);
  });

  const mount = (content = defaultContent) =>
    render(<App storage={null} initialVariantId="creativewise" content={content} />);

  it('puts portfolio immediately after hero', () => {
    mount();
    expect(
      [...document.querySelectorAll('[data-section]')]
        .map(e => e.getAttribute('data-section'))
        .slice(0, 3)
    ).toEqual(['hero', 'portfolio', 'services']);
  });

  it('chips are service short titles, toggle aria-pressed and narrow the wall', async () => {
    render(<App storage={null} initialVariantId="creativewise" />);
    const wall = within(document.querySelector('[data-section="portfolio"]') as HTMLElement);
    const chip = wall.getByRole('button', { name: S.find(s => s.id === 'branding')!.shortTitle });
    await act(async () => {
      await userEvent.click(chip);
    });
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(wall.getAllByRole('article')).toHaveLength(filterByService(P, 'branding').length);
    await act(async () => {
      await userEvent.click(wall.getByRole('button', { name: 'Todos' }));
    });
    expect(wall.getAllByRole('article')).toHaveLength(P.length);
  });

  it('shows no filter bar with zero or one project', () => {
    [[], [P[0]!]].forEach(projects => {
      const { unmount } = render(<App storage={null} initialVariantId="creativewise" content={{ ...defaultContent, projects }} />);
      expect(within(document.querySelector('[data-section="portfolio"]') as HTMLElement).queryByRole('button', { name: 'Todos' })).toBeNull();
      unmount();
    });
  });

  it('hero featured projects are links to the portfolio that include their media', () => {
    render(<App storage={null} initialVariantId="creativewise" />);
    const links = within(document.querySelector('[data-section="hero"]') as HTMLElement).getAllByRole('link', { name: new RegExp(P[0]!.name) });
    expect(links[0]).toHaveAttribute('href', '#trabajos');
    expect(within(links[0]!).getByRole('img')).toBeInTheDocument();
  });

  it('hero shows no project cards with zero projects', () => {
    render(<App storage={null} initialVariantId="creativewise" content={{ ...defaultContent, projects: [] }} />);
    expect(document.querySelector('[data-section="hero"] .creativewise-hero-project-card')).toBeNull();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultContent.site.hero.headline);
  });

  it('hero carries exactly one decorative isotype, outside the heading', () => {
    render(<App storage={null} initialVariantId="creativewise" />);
    const hero = document.querySelector('[data-section="hero"]') as HTMLElement;
    expect(hero.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(1);
    expect(hero.querySelector('h1 svg')).toBeNull();
  });
});
