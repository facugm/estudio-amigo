import { render, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { bentoSize } from './bento';
import { defaultContent } from '../../content/ContentProvider';
import { nefiuTokens } from './tokens';
import { BRAND } from '../../brand/palette';

it('nefiu tokens use only brand palette colors', () => {
  const brandHexValues = new Set(Object.values(BRAND).map(c => c.toLowerCase()));
  Object.values(nefiuTokens.colors).forEach(color => {
    expect(brandHexValues.has(color.toLowerCase())).toBe(true);
  });
});

it('bentoSize cycles with period 4 starting large, for any index', () => {
  expect([0, 1, 2, 3].map(bentoSize)).toEqual(['large', 'small', 'small', 'wide']);
  for (let i = 0; i < 40; i++) {
    expect(bentoSize(i)).toBe(bentoSize(i % 4));
  }
});

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

it('portfolio tiles carry the bento size derived from their index', () => {
  mount();
  const tiles = document.querySelectorAll('[data-section="portfolio"] [data-size]');
  expect([...tiles].slice(0, 4).map(t => t.getAttribute('data-size'))).toEqual([
    'large',
    'small',
    'small',
    'wide'
  ]);
});
