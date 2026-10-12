export const SECTION_OFFSET_PX = 96;

export function findCurrentSectionAnchor(
  doc: Document,
  anchors: readonly string[],
  offsetPx: number = SECTION_OFFSET_PX
): string | null {
  let matchedAnchor: string | null = null;

  for (const anchor of anchors) {
    const el = doc.getElementById(anchor);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= offsetPx) {
        matchedAnchor = anchor;
      }
    }
  }

  return matchedAnchor;
}

export function restoreSectionAnchor(
  doc: Document,
  anchor: string | null,
  behavior: ScrollBehavior = 'auto',
  offsetPx: number = SECTION_OFFSET_PX
): void {
  if (!anchor) return;
  const el = doc.getElementById(anchor);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  window.scrollTo({
    top: rect.top + currentScrollY - offsetPx,
    behavior
  });
}
