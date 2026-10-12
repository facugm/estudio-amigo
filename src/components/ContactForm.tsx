import { useRef, FormEvent } from 'react';
import { useContactForm, validateContact } from './ContactFormProvider';

export function ContactForm({ className }: { className?: string }): JSX.Element {
  const { draft, errors, status, setField, submit, reset } = useContactForm();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = submit();
    if (!ok) {
      const errs = validateContact(draft);
      if (errs.name) {
        nameInputRef.current?.focus();
      } else if (errs.email) {
        emailInputRef.current?.focus();
      } else if (errs.message) {
        messageInputRef.current?.focus();
      }
    }
  };

  if (status === 'confirmed') {
    return (
      <div role="status" className={`contact-confirmed ${className ?? ''}`}>
        <h3>¡Mensaje enviado (Demo para evaluación)!</h3>
        <p>
          Este prototipo no cuenta con backend conectado, por lo que ningún dato fue transmitido. Lo redactado se conserva en memoria.
        </p>
        <button type="button" onClick={reset} className="btn-secondary">
          Editar mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`contact-form ${className ?? ''}`}
    >
      <div className="field">
        <label htmlFor="contact-name">Nombre</label>
        <input
          id="contact-name"
          ref={nameInputRef}
          type="text"
          value={draft.name}
          onChange={e => setField('name', e.target.value)}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          autoComplete="name"
        />
        {errors.name && (
          <span id="contact-name-error" className="field-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          ref={emailInputRef}
          type="email"
          value={draft.email}
          onChange={e => setField('email', e.target.value)}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <span id="contact-email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          ref={messageInputRef}
          rows={4}
          value={draft.message}
          onChange={e => setField('message', e.target.value)}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <span id="contact-message-error" className="field-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Enviar mensaje
      </button>
    </form>
  );
}
