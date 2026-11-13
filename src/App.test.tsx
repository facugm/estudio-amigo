import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

class ObserverFalso {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): [] {
    return [];
  }
}
beforeAll(() => {
  vi.stubGlobal('ResizeObserver', ObserverFalso);
  vi.stubGlobal('IntersectionObserver', ObserverFalso);
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  }));
});
afterAll(() => {
  vi.unstubAllGlobals();
});

it('arma la página en el orden del diseño', () => {
  const { container } = render(<App />);
  const ids = [...container.querySelectorAll('section[id], header, footer[id]')].map(
    el => el.id || el.tagName.toLowerCase()
  );
  expect(ids).toEqual(['inicio', 'header', 'clientes', 'que-hacemos', 'nosotros', 'contacto']);
});

it('el menú lleva a cada sección y existe el destino de cada link interno', () => {
  const { container } = render(<App />);
  // En celu el menú está oculto hasta tocar la hamburguesa: lo buscamos directo en el HTML.
  const menu = container.querySelector<HTMLElement>('nav[aria-label="Principal"]')!;
  ['Qué hacemos', 'Clientes', 'Nosotros'].forEach(n =>
    expect(within(menu).getByRole('link', { name: n, hidden: true })).toBeInTheDocument()
  );
  [...container.querySelectorAll('a[href^="#"]')].forEach(a => {
    const destino = a.getAttribute('href')!.slice(1);
    expect(container.querySelector(`#${destino}`), `falta #${destino}`).not.toBeNull();
  });
});

it('la hamburguesa abre y cierra el menú', async () => {
  const usuario = userEvent.setup();
  render(<App />);
  const boton = screen.getByRole('button', { name: 'Abrir menú' });
  expect(boton).toHaveAttribute('aria-expanded', 'false');
  await usuario.click(boton);
  expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
  await usuario.keyboard('{Escape}');
  expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
});

it('muestra los 7 clientes una sola vez para lectores de pantalla', () => {
  render(<App />);
  const clientes = screen.getByRole('region', { name: 'Algunas marcas con las que trabajamos' });
  expect(within(clientes).getAllByRole('listitem')).toHaveLength(7);
});

it('muestra el equipo y el cierre con Instagram', () => {
  render(<App />);
  ['Constanza', 'Josefina', 'Valentino', 'Facundo'].forEach(n => expect(screen.getByText(n)).toBeInTheDocument());
  expect(screen.getByRole('link', { name: 'Escribinos por WhatsApp' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '@tuestudioamigo' })).toHaveAttribute(
    'href',
    'https://www.instagram.com/tuestudioamigo/'
  );
});
