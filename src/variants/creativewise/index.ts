import { ComponentType, createElement } from 'react';
import { VariantDefinition, SectionId } from '../types';
import { creativewiseTokens } from './tokens';
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

export const creativewiseVariant: VariantDefinition = {
  id: 'creativewise',
  number: '04',
  label: 'Creativewise',
  sectionOrder: ['hero', 'portfolio', 'services', 'process', 'about', 'contact'],
  sections: {
    hero: createStub('hero'),
    portfolio: createStub('portfolio'),
    services: createStub('services'),
    process: createStub('process'),
    about: createStub('about'),
    contact: createStub('contact')
  },
  tokens: creativewiseTokens,
  fontsHref: null,
  ready: false
};
