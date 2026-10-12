import './creativewise.css';
import { VariantDefinition } from '../types';
import { creativewiseTokens } from './tokens';
import { CreativewiseHero } from './Hero';
import { CreativewisePortfolio } from './Portfolio';
import { CreativewiseServices } from './Services';
import { CreativewiseProcess } from './Process';
import { CreativewiseAbout } from './About';
import { CreativewiseContact } from './Contact';

export const creativewiseVariant: VariantDefinition = {
  id: 'creativewise',
  number: '04',
  label: 'Creativewise',
  sectionOrder: ['hero', 'portfolio', 'services', 'process', 'about', 'contact'],
  sections: {
    hero: CreativewiseHero,
    portfolio: CreativewisePortfolio,
    services: CreativewiseServices,
    process: CreativewiseProcess,
    about: CreativewiseAbout,
    contact: CreativewiseContact
  },
  tokens: creativewiseTokens,
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..700;1,400..700&family=Syne:wght@600;700;800&display=swap',
  ready: true
};
