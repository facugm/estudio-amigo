import { render, within } from '@testing-library/react';
import { App } from '../../App';
import { defaultContent } from '../../content/ContentProvider';

const mount = () => render(<App storage={null} initialVariantId="orilla" />);

it('orders sections editorially: hero, about, portfolio, services, process, contact', () => {
  mount();
  expect(
    [...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section'))
  ).toEqual(['hero', 'about', 'portfolio', 'services', 'process', 'contact']);
});

it('uses the Orilla layouts', () => {
  mount();
  expect(document.querySelector('[data-section="hero"]')).toHaveAttribute(
    'data-layout',
    'orilla-editorial'
  );
  expect(document.querySelector('[data-section="portfolio"]')).toHaveAttribute(
    'data-layout',
    'orilla-index'
  );
  expect(document.querySelector('[data-section="services"]')).toHaveAttribute(
    'data-layout',
    'orilla-typographic'
  );
});

it('lists the seven services as a numbered ordered list', () => {
  mount();
  const list = within(
    document.querySelector('[data-section="services"]') as HTMLElement
  ).getByRole('list');
  expect(list.tagName).toBe('OL');
  expect(within(list).getAllByRole('listitem')).toHaveLength(7);
});

it('portfolio rows show name, category and description without hover, with the provisional tag', () => {
  mount();
  const portfolio = within(
    document.querySelector('[data-section="portfolio"]') as HTMLElement
  );
  const p = defaultContent.projects[0]!;
  expect(portfolio.getByText(p.name)).toBeVisible();
  expect(portfolio.getAllByText(p.category).length).toBeGreaterThan(0);
  expect(portfolio.getByText(p.description)).toBeVisible();
  expect(portfolio.getAllByText('Provisional').length).toBe(defaultContent.projects.length);
});
