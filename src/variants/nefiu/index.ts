import './nefiu.css';
import { VariantDefinition } from '../types';
import { nefiuTokens } from './tokens';
import { NefiuHero } from './Hero';
import { NefiuServices } from './Services';
import { NefiuPortfolio } from './Portfolio';
import { NefiuProcess } from './Process';
import { NefiuAbout } from './About';
import { NefiuContact } from './Contact';

export const nefiuVariant: VariantDefinition = {
  id: 'nefiu',
  number: '02',
  label: 'Nefiu',
  sectionOrder: ['hero', 'services', 'portfolio', 'process', 'about', 'contact'],
  sections: {
    hero: NefiuHero,
    services: NefiuServices,
    portfolio: NefiuPortfolio,
    process: NefiuProcess,
    about: NefiuAbout,
    contact: NefiuContact
  },
  tokens: nefiuTokens,
  ready: true
};
