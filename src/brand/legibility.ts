export function fontSizeViolations(css: string, minRem = 0.8125): string[] {
  const violations: string[] = [];
  const minPx = minRem * 16;
  const fontSizeDeclRegex = /font-size:\s*([^;}]+)/gi;

  let match: RegExpExecArray | null;
  while ((match = fontSizeDeclRegex.exec(css)) !== null) {
    const decl = match[1]!;
    const unitRegex = /([0-9]*\.?[0-9]+)\s*(px|rem|em)\b/gi;
    let unitMatch: RegExpExecArray | null;
    while ((unitMatch = unitRegex.exec(decl)) !== null) {
      const val = parseFloat(unitMatch[1]!);
      const unit = unitMatch[2]!.toLowerCase();
      if (unit === 'px' && val < minPx) {
        violations.push(`Font size under ${minPx}px: ${val}px in "${match[0].trim()}"`);
      } else if ((unit === 'rem' || unit === 'em') && val < minRem) {
        violations.push(`Font size under ${minRem}rem: ${val}${unit} in "${match[0].trim()}"`);
      }
    }
  }

  return violations;
}
