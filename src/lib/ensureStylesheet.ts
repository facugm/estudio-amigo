export function ensureStylesheet(href: string | null, doc: Document = document): void {
  if (!href) return;
  const existing = doc.querySelector(`link[rel="stylesheet"][href="${href}"]`);
  if (!existing) {
    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    doc.head.appendChild(link);
  }
}
