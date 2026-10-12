import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectMedia } from './ProjectMedia';
import { ProjectCaseLink } from './ProjectCaseLink';
import { ServiceTags } from './ServiceTags';
import { PortfolioEmptyState } from './PortfolioEmptyState';
import { ContactChannels } from './ContactChannels';
import { ContactFormProvider, validateContact } from './ContactFormProvider';
import { ContactForm } from './ContactForm';
import { defaultContent } from '../content/ContentProvider';

const p = defaultContent.projects[0]!;

const placeholderProject = {
  ...p,
  media: { kind: 'placeholder' as const, hue: 28, label: 'Identidad y packaging Foster Café' }
};

it('placeholder media has an accessible name flagged as provisional', () => {
  render(<ProjectMedia project={placeholderProject} />);
  expect(screen.getByRole('img', { name: /imagen provisional/i })).toBeInTheDocument();
});

it('image media requires and renders its alt text', () => {
  render(
    <ProjectMedia
      project={{ ...p, media: { kind: 'image', src: '/x.jpg', alt: 'Cartel en vidriera' } }}
    />
  );
  expect(screen.getByAltText('Cartel en vidriera')).toHaveAttribute('loading', 'lazy');
});

it('ProjectCaseLink renders nothing without caseUrl and a real link with it', () => {
  const { container, rerender } = render(<ProjectCaseLink project={p} />);
  expect(container).toBeEmptyDOMElement();
  rerender(
    <ProjectCaseLink
      project={{ ...p, caseUrl: 'https://example.com/caso' }}
      label="Ver caso"
    />
  );
  expect(screen.getByRole('link', { name: 'Ver caso' })).toHaveAttribute(
    'href',
    'https://example.com/caso'
  );
});

it('ServiceTags prints service titles and skips unknown ids', () => {
  render(<ServiceTags serviceIds={['fotoproducto', 'nope' as never]} />);
  expect(screen.getAllByRole('listitem').map(li => li.textContent)).toEqual(['Fotoproducto']);
});

it('empty state is a status message', () => {
  render(<PortfolioEmptyState />);
  expect(screen.getByRole('status')).toHaveTextContent('Todavía no hay proyectos cargados.');
});

it('placeholder channels are not links', () => {
  render(<ContactChannels />);
  expect(screen.queryAllByRole('link')).toHaveLength(0);
  expect(screen.getAllByText(/a definir/i).length).toBe(
    defaultContent.site.contact.channels.length
  );
});

it('validateContact flags empty name, malformed email and short message; accepts padded valid data', () => {
  expect(
    Object.keys(validateContact({ name: ' ', email: 'a@b', message: 'corto' })).sort()
  ).toEqual(['email', 'message', 'name']);
  expect(
    validateContact({
      name: ' Ana ',
      email: ' ana@mail.com ',
      message: 'Quiero hablar de mi marca'
    })
  ).toEqual({});
});

const setup = () =>
  render(
    <ContactFormProvider>
      <ContactForm />
    </ContactFormProvider>
  );

it('invalid submit shows errors and focuses the first invalid field', async () => {
  setup();
  await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
  expect(screen.getByLabelText(/nombre/i)).toHaveFocus();
  expect(screen.getByLabelText(/nombre/i)).toHaveAttribute('aria-invalid', 'true');
});

it('valid submit confirms as a demo, never calls fetch, and lets the user go back to edit', async () => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch' as never).mockImplementation((() =>
    Promise.reject()) as never);
  setup();
  await userEvent.type(screen.getByLabelText(/nombre/i), 'Ana');
  await userEvent.type(screen.getByLabelText(/email/i), 'ana@mail.com');
  await userEvent.type(screen.getByLabelText(/mensaje/i), 'Quiero hablar de mi marca');
  await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
  expect(screen.getByRole('status')).toHaveTextContent(/demo/i);
  expect(fetchSpy).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button', { name: /editar mensaje/i }));
  expect(screen.getByLabelText(/nombre/i)).toHaveValue('Ana');
});

it('the draft survives unmounting and remounting the form under the same provider', async () => {
  const Host = ({ show }: { show: boolean }) => (
    <ContactFormProvider>{show ? <ContactForm /> : <p>otra variante</p>}</ContactFormProvider>
  );
  const { rerender } = render(<Host show />);
  await userEvent.type(screen.getByLabelText(/nombre/i), 'Ana');
  rerender(<Host show={false} />);
  rerender(<Host show />);
  expect(screen.getByLabelText(/nombre/i)).toHaveValue('Ana');
});
