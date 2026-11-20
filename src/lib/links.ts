/** Atributos para que un link externo abra en otra pestaña. */
export function atributosLink(href: string): { target?: string; rel?: string } {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
}
