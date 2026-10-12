import { ComponentType, createElement } from 'react';
import { VariantDefinition, SectionId } from '../types';
import { nefiuTokens } from './tokens';
import { SectionShell } from '../../components/SectionShell';

const createStub = (section: SectionId): ComponentType => {
  return function StubSection() {
    return createElement(
      SectionShell,
      { section, layout: 'stub' },
      section === 'hero' ? createElement('h1', null, 'hero') : createElement('h2', null, section)
    );
  };
};

export const nefiuVariant: VariantDefinition = {
  id: 'nefiu',
  number: '02',
  label: 'Nefiu',
  sectionOrder: ['hero', 'portfolio', 'services', 'process', 'about', 'contact'],
  sections: {
    hero: createStub('hero'),
    portfolio: createStub('portfolio'),
    services: createStub('services'),
    process: createStub('process'),
    about: createStub('about'),
    contact: createStub('contact')
  },
  tokens: nefiuTokens,
  fontsHref: null,
  ready: false
};
