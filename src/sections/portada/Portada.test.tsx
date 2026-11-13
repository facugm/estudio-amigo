import { render, screen } from '@testing-library/react';
import { Portada } from './Portada';
import { ANCLA_CONTACTO, linkWhatsApp } from '../../content/contacto';

it('el título se lee completo: "somos el estudio amigo de tu marca"', () => {
  render(<Portada />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName(
    'somos el estudio amigo de tu marca'
  );
});

it('muestra los cuatro datos de las esquinas', () => {
  render(<Portada />);
  ['Rosario · Argentina', 'Estudio de comunicación digital', 'Estrategia, contenido y diseño', 'Te acompañamos como lo haría un amigo'].forEach(
    texto =>
      expect(
        screen.getByText((_, el) => el?.tagName === 'P' && el.textContent?.replace(/\s+/g, ' ').trim() === texto)
      ).toBeInTheDocument()
  );
});

it('el botón "Escribinos" lleva al WhatsApp (o al contacto si todavía no hay número)', () => {
  render(<Portada />);
  expect(screen.getByRole('link', { name: 'Escribinos' })).toHaveAttribute('href', linkWhatsApp());
});

it('un link externo abre en otra pestaña', () => {
  render(<Portada ctaHref="https://wa.me/5490000000000" />);
  const cta = screen.getByRole('link', { name: 'Escribinos' });
  expect(cta).toHaveAttribute('target', '_blank');
  expect(cta).toHaveAttribute('rel', 'noreferrer');
});

it('sin número cargado, el link de WhatsApp cae en el ancla de contacto', () => {
  expect(linkWhatsApp()).toBe(ANCLA_CONTACTO);
});
