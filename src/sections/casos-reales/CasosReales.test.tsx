import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CasosReales } from './CasosReales';
import { piezaASlide } from './GaleriaPiezas';
import { trabajosDemo } from './trabajos.demo';
import type { GrupoDeServicio } from './types';

// jsdom no trae estos observers, que Embla usa para medir el carrusel.
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
  if (!window.matchMedia) {
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {}
    }));
  }
});
afterAll(() => {
  vi.unstubAllGlobals();
});

const conPiezas = trabajosDemo.filter(g => g.piezas.length > 0);

it('muestra una tarjeta por servicio con piezas y oculta los vacíos', () => {
  render(<CasosReales grupos={trabajosDemo} />);
  const tarjetas = screen.getAllByRole('button', { name: /Ver \d+ pieza/ });
  expect(tarjetas).toHaveLength(conPiezas.length);
  expect(screen.queryByText('Campañas en Meta')).not.toBeInTheDocument();
});

it('la tarjeta indica cuántas piezas tiene el servicio', () => {
  render(<CasosReales grupos={trabajosDemo} />);
  const foto = screen.getByRole('button', { name: /Fotoproducto: Sesiones de producto/ });
  expect(within(foto).getByText('8 piezas')).toBeInTheDocument();
});

it('al tocar una tarjeta abre la galería con el contador y la descripción de la pieza', async () => {
  const usuario = userEvent.setup();
  render(<CasosReales grupos={trabajosDemo} ctaHref="https://example.com/whatsapp" />);
  await usuario.click(screen.getByRole('button', { name: /Branding: Identidades de marca/ }));

  const galeria = await screen.findByRole('dialog');
  expect(within(galeria).getByText('1 / 5')).toBeInTheDocument();
  expect(within(galeria).getAllByText('Branding · Pieza 1').length).toBeGreaterThan(0);
  expect(
    within(galeria).getAllByText('Texto de ejemplo: qué pidió la marca y cómo lo resolvimos.').length
  ).toBeGreaterThan(0);
  expect(within(galeria).getByRole('link', { name: 'Quiero algo así' })).toHaveAttribute(
    'href',
    'https://example.com/whatsapp'
  );
});

it('sin link de contacto no muestra el botón "Quiero algo así"', async () => {
  const usuario = userEvent.setup();
  render(<CasosReales grupos={trabajosDemo} />);
  await usuario.click(screen.getByRole('button', { name: /Branding: Identidades de marca/ }));
  const galeria = await screen.findByRole('dialog');
  expect(within(galeria).queryByRole('link', { name: 'Quiero algo así' })).not.toBeInTheDocument();
});

it('no renderiza la sección si ningún servicio tiene piezas', () => {
  const vacios: GrupoDeServicio[] = [{ servicio: 'branding', titulo: 'x', piezas: [] }];
  const { container } = render(<CasosReales grupos={vacios} />);
  expect(container).toBeEmptyDOMElement();
});

it('convierte un video en una pieza de video con su descripción', () => {
  const slide = piezaASlide({
    id: 'reel-1',
    titulo: 'Reel de lanzamiento',
    descripcion: 'Video vertical para Instagram.',
    media: {
      tipo: 'video',
      src: '/reel.mp4',
      mime: 'video/mp4',
      poster: '/reel.jpg',
      alt: 'Reel',
      ancho: 1080,
      alto: 1920
    }
  });
  expect(slide).toMatchObject({
    type: 'video',
    poster: '/reel.jpg',
    sources: [{ src: '/reel.mp4', type: 'video/mp4' }],
    description: 'Video vertical para Instagram.'
  });
});
