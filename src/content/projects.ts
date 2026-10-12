import { Project } from './types';

export const projects: readonly Project[] = [
  {
    id: 'foster-cafe',
    name: 'Foster Specialty Coffee',
    client: 'Foster Café (Muestra)',
    category: 'Identidad y Espacio',
    description:
      'Sistema de identidad visual, packaging de café tostado y señalética para una cafetería de especialidad urbana.',
    services: ['branding', 'papeleria-senaletica', 'fotoproducto'],
    media: {
      kind: 'image',
      src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      alt: 'Identidad visual, café de especialidad y packaging para Foster Café'
    },
    provisional: true
  },
  {
    id: 'nordik-estudio',
    name: 'Nordik Muebles de Diseño',
    client: 'Nordik Design (Muestra)',
    category: 'Digital y Campañas',
    description:
      'Estrategia de lanzamiento online, producción fotográfica de catálogo y pauta de performance multicanal.',
    services: ['pauta-digital', 'fotoproducto', 'sitios-web'],
    media: {
      kind: 'image',
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      alt: 'Mobiliario de diseño minimalista y dirección de arte para catálogo Nordik'
    },
    provisional: true
  },
  {
    id: 'amapola-botanica',
    name: 'Amapola Cuidado Botánico',
    client: 'Amapola Cosmética (Muestra)',
    category: 'Contenido y Comunidad',
    description:
      'Estrategia editorial para redes, creación de piezas audiovisuales y gestión activa de comunidad.',
    services: ['gestion-redes', 'contenido-redes', 'branding'],
    media: {
      kind: 'image',
      src: 'https://images.unsplash.com/photo-1608248597359-0f04c62e58c8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Línea de cosmética botánica natural y frascos de vidrio para Amapola'
    },
    provisional: true
  },
  {
    id: 'origen-organico',
    name: 'Origen Alimentos Conscientes',
    client: 'Origen Alimentos (Muestra)',
    category: 'Branding y Packaging',
    description:
      'Rebranding integral, rediseño de envases compostables y piezas para punto de venta.',
    services: ['branding', 'papeleria-senaletica'],
    media: {
      kind: 'image',
      src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Envases sustentables y packaging de alimentos orgánicos para Origen'
    },
    provisional: true
  },
  {
    id: 'vortex-tech',
    name: 'Vórtex Plataforma SaaS',
    client: 'Vórtex Software (Muestra)',
    category: 'Producto Digital',
    description:
      'Diseño y desarrollo de sitio web institucional optimizado para conversión y captación comercial.',
    services: ['sitios-web', 'branding'],
    media: {
      kind: 'image',
      src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Sitio web interactivo y experiencia digital en pantalla para Vórtex Tech'
    },
    provisional: true
  },
  {
    id: 'solsticio-vinos',
    name: 'Bodega Solsticio',
    client: 'Solsticio Wines (Muestra)',
    category: 'Producción Audiovisual y Redes',
    description:
      'Fotoproducto para botellas de alta gama, microvideos para reels y anuncios dirigidos a nuevos segmentos.',
    services: ['fotoproducto', 'contenido-redes', 'pauta-digital'],
    media: {
      kind: 'image',
      src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Fotografía editorial de botellas de vino de alta gama para Bodega Solsticio'
    },
    provisional: true
  }
];
