import './escalamos.css';
import { VariantDefinition } from '../types';
import { escalamosTokens } from './tokens';
import { EscalamosHero } from './Hero';
import { EscalamosServices } from './Services';
import { EscalamosProcess } from './Process';
import { EscalamosPortfolio } from './Portfolio';
import { EscalamosAbout } from './About';
import { EscalamosContact } from './Contact';

export const escalamosVariant: VariantDefinition = {
  id: 'escalamos',
  number: '03',
  label: 'Escalamos',
  sectionOrder: ['hero', 'services', 'process', 'portfolio', 'about', 'contact'],
  sections: {
    hero: EscalamosHero,
    services: EscalamosServices,
    process: EscalamosProcess,
    portfolio: EscalamosPortfolio,
    about: EscalamosAbout,
    contact: EscalamosContact
  },
  tokens: escalamosTokens,
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap',
  ready: true
};
