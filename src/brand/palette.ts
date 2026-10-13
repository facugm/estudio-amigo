export const BRAND = {
  navy: '#234060',
  lime: '#c8f264',
  magenta: '#c61e97',
  gray: '#dcdcdc',
  white: '#ffffff'
} as const;

export type BrandColor = keyof typeof BRAND;

export type Tone = 'navy' | 'lime' | 'magenta' | 'gray';

export const TONES: Record<Tone, { bg: BrandColor; fg: BrandColor }> = {
  navy: { bg: 'navy', fg: 'white' },
  lime: { bg: 'lime', fg: 'navy' },
  magenta: { bg: 'magenta', fg: 'white' },
  gray: { bg: 'gray', fg: 'navy' }
};

export const TEXT_PAIRS: readonly { fg: BrandColor; bg: BrandColor }[] = [
  { fg: 'navy', bg: 'white' },
  { fg: 'navy', bg: 'gray' },
  { fg: 'navy', bg: 'lime' },
  { fg: 'white', bg: 'navy' },
  { fg: 'white', bg: 'magenta' },
  { fg: 'magenta', bg: 'white' }
];

export function brandViolations(css: string): string[] {
  const violations: string[] = [];

  // Check gradients
  const gradientMatches = css.match(/[a-z-]*gradient\s*\([^)]*\)/gi);
  if (gradientMatches) {
    gradientMatches.forEach(g => {
      violations.push(`Disallowed gradient: ${g}`);
    });
  }

  // Hex colors
  const allowedHex6 = new Set(Object.values(BRAND).map(c => c.toLowerCase()));
  const hexRegex = /#([0-9a-f]{3,8})\b/gi;
  let hexMatch: RegExpExecArray | null;
  while ((hexMatch = hexRegex.exec(css)) !== null) {
    const raw = hexMatch[1]!.toLowerCase();
    let normalized = raw;
    if (raw.length === 3) {
      normalized = raw.split('').map(ch => ch + ch).join('');
    } else if (raw.length === 6) {
      normalized = raw;
    } else if (raw.length === 8) {
      normalized = raw.slice(0, 6);
    } else {
      violations.push(`Invalid hex length: #${raw}`);
      continue;
    }
    if (!allowedHex6.has(`#${normalized}`)) {
      violations.push(`Off-brand hex color: #${raw}`);
    }
  }

  // rgb / rgba colors
  const rgbRegex = /rgba?\s*\(([^)]+)\)/gi;
  let rgbMatch: RegExpExecArray | null;
  while ((rgbMatch = rgbRegex.exec(css)) !== null) {
    const content = rgbMatch[1]!.trim();
    const parts = content.split(/[/,\s]+/).filter(Boolean);
    if (parts.length >= 3) {
      const r = Math.round(parseFloat(parts[0]!));
      const g = Math.round(parseFloat(parts[1]!));
      const b = Math.round(parseFloat(parts[2]!));

      const isBrandRgb = Object.values(BRAND).some(hex => {
        const hr = parseInt(hex.slice(1, 3), 16);
        const hg = parseInt(hex.slice(3, 5), 16);
        const hb = parseInt(hex.slice(5, 7), 16);
        return r === hr && g === hg && b === hb;
      });

      if (!isBrandRgb) {
        violations.push(`Off-brand rgb/rgba color: ${rgbMatch[0]}`);
      }
    }
  }

  // hsl / hsla colors
  const hslRegex = /hsla?\s*\(([^)]+)\)/gi;
  let hslMatch: RegExpExecArray | null;
  while ((hslMatch = hslRegex.exec(css)) !== null) {
    violations.push(`Off-brand hsl/hsla color: ${hslMatch[0]}`);
  }

  return violations;
}
