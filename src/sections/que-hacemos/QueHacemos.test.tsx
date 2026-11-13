import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueHacemos } from './QueHacemos';
import { piezaASlide } from './GaleriaPiezas';
import { trabajos } from './trabajos';

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

it('muestra el título de la sección y una tarjeta por servicio, como en Figma', () => {
  render(<QueHacemos grupos={trabajos} />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Comunicación integral para tu marca');
  expect(screen.getAllByRole('article')).toHaveLength(6);
  ['Identidad de marca', 'Contenido para Instagram', 'Sesión de producto', 'Piezas para el local', 'Campaña en Meta', 'Web institucional'].forEach(t =>
    expect(screen.getByRole('heading', { level: 3, name: t })).toBeInTheDocument()
  );
});

it('cada tarjeta tiene "Quiero algo así" hacia el contacto', () => {
  render(<QueHacemos grupos={trabajos} ctaHref="https://wa.me/5490000000000" />);
  const links = screen.getAllByRole('link', { name: 'Quiero algo así' });
  expect(links).toHaveLength(6);
  links.forEach(l => expect(l).toHaveAttribute('href', 'https://wa.me/5490000000000'));
});

it('tocar la imagen abre la galería con contador, título y descripción de la pieza', async () => {
  const usuario = userEvent.setup();
  render(<QueHacemos grupos={trabajos} ctaHref="https://wa.me/5490000000000" />);
  await usuario.click(screen.getByRole('button', { name: /Ver 5 piezas de Branding/ }));

  const galeria = await screen.findByRole('dialog');
  expect(within(galeria).getByText('1 / 5')).toBeInTheDocument();
  expect(within(galeria).getAllByText('Branding · Pieza 1').length).toBeGreaterThan(0);
  expect(within(galeria).getByRole('link', { name: 'Quiero algo así' })).toHaveAttribute(
    'href',
    'https://wa.me/5490000000000'
  );
});

it('sin número de WhatsApp, la galería no muestra el botón de contacto', async () => {
  const usuario = userEvent.setup();
  render(<QueHacemos grupos={trabajos} ctaHref="#contacto" />);
  await usuario.click(screen.getByRole('button', { name: /Ver 5 piezas de Branding/ }));
  const galeria = await screen.findByRole('dialog');
  expect(within(galeria).queryByRole('link', { name: 'Quiero algo así' })).not.toBeInTheDocument();
});

it('una tarjeta sin piezas se muestra igual, sin abrir galería', () => {
  render(
    <QueHacemos
      grupos={[{ servicio: 'branding', etiqueta: 'Branding', titulo: 'Identidad', descripcion: 'x', piezas: [] }]}
    />
  );
  expect(screen.getByRole('article')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Ver/ })).not.toBeInTheDocument();
});

it('convierte un video en una pieza de video con su descripción', () => {
  const slide = piezaASlide({
    id: 'reel-1',
    titulo: 'Reel de lanzamiento',
    descripcion: 'Video vertical para Instagram.',
    media: { tipo: 'video', src: '/reel.mp4', mime: 'video/mp4', poster: '/reel.jpg', alt: 'Reel', ancho: 1080, alto: 1920 }
  });
  expect(slide).toMatchObject({
    type: 'video',
    poster: '/reel.jpg',
    sources: [{ src: '/reel.mp4', type: 'video/mp4' }],
    description: 'Video vertical para Instagram.'
  });
});
