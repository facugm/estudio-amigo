import { render } from '@testing-library/react';
import { App } from '../App';
import { VARIANTS } from './registry';

describe('Variant differentiation', () => {
  it('all three variants are registered and marked ready', () => {
    expect(VARIANTS).toHaveLength(3);
    expect(VARIANTS.every(v => v.ready)).toBe(true);
  });

  it('each variant has a pairwise distinct section order', () => {
    const orders = VARIANTS.map(v => v.sectionOrder.join('>'));
    const uniqueOrders = new Set(orders);
    expect(uniqueOrders.size).toBe(3);
  });

  it('each variant renders distinct layouts for hero, portfolio, and services', () => {
    const heroLayouts = new Set<string>();
    const portfolioLayouts = new Set<string>();
    const servicesLayouts = new Set<string>();

    for (const v of VARIANTS) {
      const { unmount } = render(<App storage={null} initialVariantId={v.id} />);

      const hero = document.querySelector('[data-section="hero"]');
      const portfolio = document.querySelector('[data-section="portfolio"]');
      const services = document.querySelector('[data-section="services"]');

      expect(hero).toHaveAttribute('data-layout');
      expect(portfolio).toHaveAttribute('data-layout');
      expect(services).toHaveAttribute('data-layout');

      heroLayouts.add(hero!.getAttribute('data-layout')!);
      portfolioLayouts.add(portfolio!.getAttribute('data-layout')!);
      servicesLayouts.add(services!.getAttribute('data-layout')!);

      unmount();
    }

    expect(heroLayouts.size).toBe(3);
    expect(portfolioLayouts.size).toBe(3);
    expect(servicesLayouts.size).toBe(3);
  });

  it('each variant defines distinct radius and color tokens', () => {
    const radii = new Set(VARIANTS.map(v => v.tokens.radius));
    const bgColors = new Set(VARIANTS.map(v => v.tokens.colors.bg));

    expect(radii.size).toBeGreaterThanOrEqual(3);
    expect(bgColors.size).toBeGreaterThanOrEqual(3);
  });
});
