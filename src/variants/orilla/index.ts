import { VariantDefinition } from '../types';
import { orillaTokens } from './tokens';
import { OrillaHero } from './Hero';
import { OrillaAbout } from './About';
import { OrillaPortfolio } from './Portfolio';
import { OrillaServices } from './Services';
import { OrillaProcess } from './Process';
import { OrillaContact } from './Contact';
import './orilla.css';

export const orillaVariant: VariantDefinition = {
  id: 'orilla',
  number: '01',
  label: 'Orilla',
  sectionOrder: ['hero', 'about', 'portfolio', 'services', 'process', 'contact'],
  sections: {
    hero: OrillaHero,
    about: OrillaAbout,
    portfolio: OrillaPortfolio,
    services: OrillaServices,
    process: OrillaProcess,
    contact: OrillaContact
  },
  tokens: orillaTokens,
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
  ready: true
};
