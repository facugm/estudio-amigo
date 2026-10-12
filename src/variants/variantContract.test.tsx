import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { VARIANTS } from './registry';
import { SECTION_ANCHORS } from './types';
import { defaultContent } from '../content/ContentProvider';

const ready = VARIANTS.filter(v => v.ready);

if (ready.length === 0) {
  it('no variants marked ready yet (contract tests start in Task 8)', () => {
    expect(ready).toHaveLength(0);
  });
} else {
  describe.each(ready.map(v => [v.id, v] as const))('variant contract: %s', (id, v) => {
    const mount = (content = defaultContent) =>
      render(<App storage={null} initialVariantId={id} content={content} />);
    const sec = (s: keyof typeof SECTION_ANCHORS) =>
      document.getElementById(SECTION_ANCHORS[s])!;

    it('renders the six sections once, in its declared order', () => {
      mount();
      expect(
        [...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section'))
      ).toEqual([...v.sectionOrder]);
    });

    it('has exactly one h1, with the hero copy and no banned phrases', () => {
      mount();
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(sec('hero')).toHaveTextContent(defaultContent.site.hero.headline);
      expect(sec('hero').textContent).not.toMatch(/siguiente nivel|soluciones innovadoras/i);
    });

    it('shows the seven services', () => {
      mount();
      defaultContent.services.forEach(s =>
        expect(within(sec('services')).getAllByText(s.title).length).toBeGreaterThan(0)
      );
    });

    it('shows every project, and a project added through content appears without touching variant code', () => {
      const extra = {
        ...defaultContent.projects[0]!,
        id: 'extra',
        name: 'Proyecto agregado por datos'
      };
      mount({ ...defaultContent, projects: [...defaultContent.projects, extra] });
      [...defaultContent.projects, extra].forEach(p =>
        expect(within(sec('portfolio')).getAllByText(p.name).length).toBeGreaterThan(0)
      );
    });

    it('portfolio with zero projects keeps its anchor and shows the empty state', () => {
      mount({ ...defaultContent, projects: [] });
      expect(sec('portfolio')).toBeInTheDocument();
      expect(
        within(sec('portfolio')).getByText('Todavía no hay proyectos cargados.')
      ).toBeInTheDocument();
    });

    it('never renders dead links: no href="#" or empty, every #anchor exists once, projects without caseUrl have no case link', () => {
      mount();
      document.querySelectorAll('a').forEach(a => {
        const h = a.getAttribute('href');
        expect(h).toBeTruthy();
        expect(h).not.toBe('#');
      });
      document.querySelectorAll('a[href^="#"]').forEach(a =>
        expect(
          document.querySelectorAll(`[id="${a.getAttribute('href')!.slice(1)}"]`)
        ).toHaveLength(1)
      );
      expect(within(sec('portfolio')).queryAllByRole('link')).toHaveLength(0);
    });

    it('a project with caseUrl links to it', () => {
      const withCase = {
        ...defaultContent.projects[0]!,
        caseUrl: 'https://example.com/caso'
      };
      mount({ ...defaultContent, projects: [withCase] });
      expect(within(sec('portfolio')).getByRole('link')).toHaveAttribute(
        'href',
        'https://example.com/caso'
      );
    });

    it('unknown service ids on a project do not break the portfolio', () => {
      mount({
        ...defaultContent,
        projects: [{ ...defaultContent.projects[0]!, services: ['nope' as never] }]
      });
      expect(sec('portfolio')).toBeInTheDocument();
    });

    it('images and media have accessible names; buttons have names', () => {
      mount();
      document.querySelectorAll('img').forEach(i => expect(i.getAttribute('alt')).not.toBeNull());
      screen.getAllByRole('button').forEach(b => expect(b).toHaveAccessibleName());
    });

    it('placeholder contact channels are not links', () => {
      mount();
      expect(within(sec('contact')).queryAllByRole('link')).toHaveLength(0);
    });

    it('the contact form draft survives switching to another variant and back', async () => {
      mount();
      await userEvent.type(within(sec('contact')).getByLabelText(/nombre/i), 'Ana');
      const other = VARIANTS.find(x => x.id !== id)!;
      await userEvent.click(
        screen.getByRole('radio', { name: `${other.number} ${other.label}` })
      );
      await userEvent.click(screen.getByRole('radio', { name: `${v.number} ${v.label}` }));
      expect(within(sec('contact')).getByLabelText(/nombre/i)).toHaveValue('Ana');
    });
  });
}
