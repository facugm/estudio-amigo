import { ComponentType } from 'react';
import { SectionId } from '../content/types';

export type { SectionId };

export type VariantId = 'orilla' | 'nefiu' | 'escalamos' | 'creativewise';

export const SECTION_ANCHORS: Record<SectionId, string> = {
  hero: 'inicio',
  portfolio: 'trabajos',
  services: 'servicios',
  process: 'como-trabajamos',
  about: 'sobre-tea',
  contact: 'contacto'
};

export interface VariantTokens {
  colors: {
    bg: string;
    surface: string;
    fg: string;
    muted: string;
    accent: string;
    accentFg: string;
  };
  radius: string;
  space: string;
}

export interface VariantDefinition {
  id: VariantId;
  number: '01' | '02' | '03' | '04';
  label: string;
  sectionOrder: readonly SectionId[];
  sections: Record<SectionId, ComponentType>;
  tokens: VariantTokens;
  ready: boolean;
}
