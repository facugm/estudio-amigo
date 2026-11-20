import { render, screen } from '@testing-library/react';
import { Proximamente, mostrarProximamente } from './Proximamente';

it('avisa que la web se está preparando y lleva a Instagram', () => {
  render(<Proximamente />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Estamos preparando nuestra web para recibir amigos'
  );
  expect(screen.getByText('¡Volvé pronto!')).toBeInTheDocument();
  const ig = screen.getByRole('link', { name: 'Mientras, seguinos en Instagram' });
  expect(ig).toHaveAttribute('href', 'https://www.instagram.com/tuestudioamigo/');
  expect(ig).toHaveAttribute('target', '_blank');
});

it('se puede ver la web completa con ?vista=completa y se apaga al lanzar', () => {
  expect(mostrarProximamente('', true)).toBe(true);
  expect(mostrarProximamente('?vista=completa', true)).toBe(false);
  expect(mostrarProximamente('', false)).toBe(false);
});
