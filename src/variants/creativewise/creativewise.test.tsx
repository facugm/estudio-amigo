import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { defaultContent } from '../../content/ContentProvider';
import { projectCategories, filterProjects } from './filter';
import { creativewiseTokens } from './tokens';
import { BRAND } from '../../brand/palette';

describe('Creativewise variant', () => {
  it('creativewise tokens use only brand palette colors', () => {
    const brandHexValues = new Set(Object.values(BRAND).map(c => c.toLowerCase()));
    Object.values(creativewiseTokens.colors).forEach(color => {
      expect(brandHexValues.has(color.toLowerCase())).toBe(true);
    });
  });

  it('projectCategories extracts unique categories from projects', () => {
    const cats = projectCategories(defaultContent.projects);
    expect(cats.length).toBeGreaterThan(0);
    expect(new Set(cats).size).toBe(cats.length);
  });

  it('filterProjects returns all when category is null or all, and filters by category', () => {
    expect(filterProjects(defaultContent.projects, null)).toEqual(defaultContent.projects);
    expect(filterProjects(defaultContent.projects, 'all')).toEqual(defaultContent.projects);

    const targetCat = defaultContent.projects[0]!.category;
    const filtered = filterProjects(defaultContent.projects, targetCat);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(p => p.category === targetCat)).toBe(true);
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

  it('renders category filter chips with aria-pressed, and filtering changes visible cards', async () => {
    mount();
    const portfolio = within(document.querySelector('[data-section="portfolio"]') as HTMLElement);
    const chips = portfolio.getAllByRole('button');
    expect(chips.length).toBeGreaterThan(1); // "Todas" + categories

    const allChip = chips[0]!;
    expect(allChip).toHaveAttribute('aria-pressed', 'true');

    // Click second category chip
    const secondChip = chips[1]!;
    await act(async () => {
      await userEvent.click(secondChip);
    });
    expect(secondChip).toHaveAttribute('aria-pressed', 'true');
    expect(allChip).toHaveAttribute('aria-pressed', 'false');

    // Re-click allChip
    await act(async () => {
      await userEvent.click(allChip);
    });
    expect(allChip).toHaveAttribute('aria-pressed', 'true');
  });

  it('hero renders fallback cleanly when there are zero projects', () => {
    mount({ ...defaultContent, projects: [] });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      defaultContent.site.hero.headline
    );
    expect(within(document.querySelector('[data-section="portfolio"]') as HTMLElement).getByText(
      'Todavía no hay proyectos cargados.'
    )).toBeInTheDocument();
  });

  it('hero project cards are links to #trabajos', () => {
    mount();
    const hero = document.querySelector('[data-section="hero"]') as HTMLElement;
    const projectCards = hero.querySelectorAll('.creativewise-hero-project-card');
    expect(projectCards.length).toBeGreaterThan(0);
    projectCards.forEach(card => {
      expect(card).toHaveAttribute('href', '#trabajos');
    });
  });

  it('hero carries exactly one decorative isotype, outside the heading', () => {
    render(<App storage={null} initialVariantId="creativewise" />);
    const hero = document.querySelector('[data-section="hero"]') as HTMLElement;
    expect(hero.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(1);
    expect(hero.querySelector('h1 svg')).toBeNull();
  });
});
