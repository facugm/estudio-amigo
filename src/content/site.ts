import { SiteContent } from './types';

export const siteContent: SiteContent = {
  brand: {
    short: 'estudio amigo',
    long: 'estudio amigo',
    full: 'estudio amigo'
  },
  nav: [
    { label: 'Inicio', section: 'hero' },
    { label: 'Trabajos', section: 'portfolio' },
    { label: 'Servicios', section: 'services' },
    { label: 'Cómo trabajamos', section: 'process' },
    { label: 'Sobre nosotros', section: 'about' },
    { label: 'Contacto', section: 'contact' }
  ],
  hero: {
    eyebrow: 'Estudio de comunicación integral',
    headline: 'Estrategia, creatividad y comunicación para marcas que buscan conectar de verdad.',
    support:
      'Acompañamos a marcas, proyectos y organizaciones en el diseño de su identidad y en la articulación de sus mensajes en canales digitales y físicos.',
    cta: {
      label: 'Iniciar una conversación'
    },
    secondaryCta: {
      label: 'Ver trabajos'
    }
  },
  intros: {
    services: 'Siete servicios que se pueden combinar según lo que necesite cada marca.',
    servicesSelect: 'Elegí los servicios que te interesan y armamos el mensaje por vos.',
    portfolio: 'Casos de muestra para evaluar el diseño; se reemplazan por trabajos reales.'
  },
  servicesCta: {
    label: 'Conversemos sobre estos servicios',
    empty: 'Elegí al menos un servicio para continuar.'
  },
  process: {
    title: 'Cómo trabajamos',
    steps: [
      {
        id: 'comprender',
        title: 'Comprender el desafío',
        description:
          'Escuchamos la realidad de tu proyecto, entendemos a tus públicos y analizamos el contexto antes de proponer cualquier solución.'
      },
      {
        id: 'estrategia',
        title: 'Definir la estrategia',
        description:
          'Trazamos un plan de comunicación claro, con objetivos concretos y canales adecuados para cada etapa.'
      },
      {
        id: 'propuesta',
        title: 'Desarrollar la propuesta',
        description:
          'Creamos conceptos visuales, piezas, mensajes y experiencias con criterio estético riguroso y sentido práctico.'
      },
      {
        id: 'implementar',
        title: 'Implementar y acompañar',
        description:
          'Llevamos las ideas a la práctica, coordinamos la ejecución y medimos el impacto para ajustar continuamente.'
      }
    ]
  },
  about: {
    title: 'Sobre nosotros',
    paragraphs: [
      'estudio amigo es un estudio de comunicación integral que une pensamiento estratégico, dirección creativa y ejecución técnica. Creemos en el trabajo cercano, donde cada decisión visual responde a una necesidad concreta de tu marca.',
      'Trabajamos con proyectos en distintas etapas: desde la creación de una identidad desde cero hasta el fortalecimiento de canales digitales y la producción de contenidos con impacto real.'
    ]
  },
  contact: {
    title: 'Contacto',
    invitation:
      '¿Tenés un proyecto en mente? Conversemos sobre los desafíos de tu marca y cómo podemos acompañarte.',
    ctaLabel: 'Enviar mensaje',
    channels: [
      {
        id: 'email',
        label: 'Email',
        href: null,
        isPlaceholder: true
      },
      {
        id: 'whatsapp',
        label: 'WhatsApp',
        href: null,
        isPlaceholder: true
      },
      {
        id: 'instagram',
        label: 'Instagram',
        href: null,
        isPlaceholder: true
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        href: null,
        isPlaceholder: true
      }
    ]
  },
  footer: {
    prototypeNote: 'Prototipo para evaluación: textos y proyectos de muestra.'
  },
  sampleCopy: ['hero', 'portfolio', 'services', 'process', 'about', 'contact']
};
