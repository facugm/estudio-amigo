/** Globo de chat del botón de WhatsApp (como en Figma). */
export function IconoChat({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5z"
        fill="currentColor"
      />
      <circle cx="9" cy="9.5" r="1.3" fill="var(--c-lime)" />
      <circle cx="12" cy="9.5" r="1.3" fill="var(--c-lime)" />
      <circle cx="15" cy="9.5" r="1.3" fill="var(--c-lime)" />
    </svg>
  );
}

/** Atributos para que un link externo abra en otra pestaña. */
export function atributosLink(href: string): { target?: string; rel?: string } {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
}
