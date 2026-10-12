import { Project } from './types';

export const projects: readonly Project[] = [
  {
    id: 'foster-cafe',
    name: 'Foster Specialty Coffee',
    client: 'Foster Café (Muestra provisional)',
    category: 'Identidad y Espacio',
    description:
      'Sistema de identidad visual, packaging de café tostado y señalética para una cafetería de especialidad urbana.',
    services: ['branding', 'papeleria-senaletica', 'fotoproducto'],
    media: { kind: 'placeholder', hue: 28, label: 'Identidad y packaging Foster Café' },
    provisional: true
  },
  {
    id: 'nordik-estudio',
    name: 'Nordik Muebles de Diseño',
    client: 'Nordik Design (Muestra provisional)',
    category: 'Digital y Campañas',
    description:
      'Estrategia de lanzamiento online, producción fotográfica de catálogo y pauta de performance multicanal.',
    services: ['pauta-digital', 'fotoproducto', 'sitios-web'],
    media: { kind: 'placeholder', hue: 205, label: 'Campaña y catálogo Nordik Muebles' },
    provisional: true
  },
  {
    id: 'amapola-botanica',
    name: 'Amapola Cuidado Botánico',
    client: 'Amapola Cosmética (Muestra provisional)',
    category: 'Contenido y Comunidad',
    description:
      'Estrategia editorial para redes, creación de piezas audiovisuales y gestión activa de comunidad.',
    services: ['gestion-redes', 'contenido-redes', 'branding'],
    media: { kind: 'placeholder', hue: 340, label: 'Contenido social Amapola Botánica' },
    provisional: true
  },
  {
    id: 'origen-organico',
    name: 'Origen Alimentos Conscientes',
    client: 'Origen Alimentos (Muestra provisional)',
    category: 'Branding y Packaging',
    description:
      'Rebranding integral, rediseño de envases compostables y piezas para punto de venta.',
    services: ['branding', 'papeleria-senaletica'],
    media: { kind: 'placeholder', hue: 145, label: 'Envases y marca Origen Alimentos' },
    provisional: true
  },
  {
    id: 'vortex-tech',
    name: 'Vórtex Plataforma SaaS',
    client: 'Vórtex Software (Muestra provisional)',
    category: 'Producto Digital',
    description:
      'Diseño y desarrollo de sitio web institucional optimizado para conversión y captación comercial.',
    services: ['sitios-web', 'branding'],
    media: { kind: 'placeholder', hue: 250, label: 'Sitio web interactivo Vórtex Tech' },
    provisional: true
  },
  {
    id: 'solsticio-vinos',
    name: 'Bodega Solsticio',
    client: 'Solsticio Wines (Muestra provisional)',
    category: 'Producción Audiovisual y Redes',
    description:
      'Fotoproducto para botellas de alta gama, microvideos para reels y anuncios dirigidos a nuevos segmentos.',
    services: ['fotoproducto', 'contenido-redes', 'pauta-digital'],
    media: { kind: 'placeholder', hue: 15, label: 'Fotoproducto y reels Bodega Solsticio' },
    provisional: true
  }
];
