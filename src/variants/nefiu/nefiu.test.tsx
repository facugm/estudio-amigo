import { render, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { bentoSize, bentoTone, BENTO_SPAN } from './bento';
import { defaultContent } from '../../content/ContentProvider';
import { nefiuTokens } from './tokens';
import { BRAND } from '../../brand/palette';

it('nefiu tokens use only brand palette colors', () => {
  const brandHexValues = new Set(Object.values(BRAND).map(c => c.toLowerCase()));
  Object.values(nefiuTokens.colors).forEach(color => {
    expect(brandHexValues.has(color.toLowerCase())).toBe(true);
  });
});

it('rows always fill exactly 12 columns for any number of projects, with no leftovers', () => {
  for (let total = 1; total <= 12; total++) {
    let acc = 0;
    for (let i = 0; i < total; i++) {
      acc += BENTO_SPAN[bentoSize(i, total)];
      expect(acc).toBeLessThanOrEqual(12);
      if (acc === 12) acc = 0;
    }
    expect(acc).toBe(0);
  }
});
it('bentoSize cycles large, small, small, large without a total', () =>
  expect([0, 1, 2, 3, 4, 5].map(i => bentoSize(i))).toEqual(['large', 'small', 'small', 'large', 'large', 'small']));
it('bentoTone cycles navy, lime, magenta, gray', () =>
  expect([0, 1, 2, 3, 4].map(bentoTone)).toEqual(['navy', 'lime', 'magenta', 'gray', 'navy']));

const mount = () => render(<App storage={null} initialVariantId="nefiu" />);

it('puts services right after the hero', () => {
  mount();
  expect(
    [...document.querySelectorAll('[data-section]')]
      .map(e => e.getAttribute('data-section'))
      .slice(0, 3)
  ).toEqual(['hero', 'services', 'portfolio']);
});

it('services are a tablist: first selected, click selects another and shows its summary', async () => {
  mount();
  const services = within(
    document.querySelector('[data-section="services"]') as HTMLElement
  );
  const tabs = services.getAllByRole('tab');
  expect(tabs).toHaveLength(7);
  expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  await act(async () => {
    await userEvent.click(tabs[2]!);
  });
  expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  expect(services.getByRole('tabpanel')).toHaveTextContent(defaultContent.services[2]!.summary);
});

it('tabs support ArrowRight/ArrowLeft with wraparound', async () => {
  mount();
  const tabs = within(
    document.querySelector('[data-section="services"]') as HTMLElement
  ).getAllByRole('tab');
  tabs[0]!.focus();
  await act(async () => {
    await userEvent.keyboard('{ArrowLeft}');
  });
  expect(tabs[6]).toHaveFocus();
  expect(tabs[6]).toHaveAttribute('aria-selected', 'true');
});

it('tiles carry the size and tone of their index', () => {
  render(<App storage={null} initialVariantId="nefiu" />);
  const tiles = [...document.querySelectorAll('[data-section="portfolio"] .nefiu-bento-tile')];
  expect(tiles).toHaveLength(defaultContent.projects.length);
  expect(tiles.map(t => t.getAttribute('data-size'))).toEqual(tiles.map((_, i) => bentoSize(i, tiles.length)));
  expect(tiles[1]!.querySelector('[data-tone="lime"]')).not.toBeNull();
});

it('hero carries exactly one decorative isotype, outside the heading', () => {
  render(<App storage={null} initialVariantId="nefiu" />);
  const hero = document.querySelector('[data-section="hero"]') as HTMLElement;
  expect(hero.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(1);
  expect(hero.querySelector('h1 svg')).toBeNull();
});

it('hero panel shows the eyebrow as real text', () => {
  render(<App storage={null} initialVariantId="nefiu" />);
  expect(within(document.querySelector('[data-section="hero"]') as HTMLElement).getByText(defaultContent.site.hero.eyebrow)).toBeVisible();
});

