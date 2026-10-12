import { ComponentType, createElement } from 'react';
import { VariantDefinition, SectionId } from '../types';
import { escalamosTokens } from './tokens';
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

export const escalamosVariant: VariantDefinition = {
  id: 'escalamos',
  number: '03',
  label: 'Escalamos',
  sectionOrder: ['hero', 'portfolio', 'services', 'process', 'about', 'contact'],
  sections: {
    hero: createStub('hero'),
    portfolio: createStub('portfolio'),
    services: createStub('services'),
    process: createStub('process'),
    about: createStub('about'),
    contact: createStub('contact')
  },
  tokens: escalamosTokens,
  fontsHref: null,
  ready: false
};
