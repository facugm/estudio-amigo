export type ServiceId =
  | 'branding'
  | 'pauta-digital'
  | 'papeleria-senaletica'
  | 'gestion-redes'
  | 'contenido-redes'
  | 'fotoproducto'
  | 'sitios-web';

export interface Service {
  id: ServiceId;
  title: string;
  shortTitle: string;
  summary: string;
}

export type ProjectMedia =
  | { kind: 'placeholder'; hue: number; label: string }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster: string; alt: string };

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  description: string;
  services: ServiceId[];
  media: ProjectMedia;
  caseUrl?: string;
  provisional: boolean;
}

export interface ContactChannel {
  id: 'email' | 'whatsapp' | 'instagram' | 'linkedin';
  label: string;
  href: string | null;
  isPlaceholder: boolean;
}

export type SectionId = 'hero' | 'portfolio' | 'services' | 'process' | 'about' | 'contact';

export interface SiteContent {
  brand: {
    short: string;
    long: string;
    full: string;
  };
  nav: readonly { label: string; section: SectionId }[];
  hero: {
    eyebrow: string;
    headline: string;
    support: string;
    cta: { label: string };
    secondaryCta: { label: string };
  };
  intros: {
    services: string;
    servicesSelect: string;
    portfolio: string;
  };
  servicesCta: {
    label: string;
    empty: string;
  };
  process: {
    title: string;
    steps: readonly { id: string; title: string; description: string }[];
  };
  about: {
    title: string;
    paragraphs: readonly string[];
  };
  contact: {
    title: string;
    invitation: string;
    ctaLabel: string;
    channels: readonly ContactChannel[];
  };
  footer: {
    prototypeNote: string;
  };
  sampleCopy: readonly SectionId[];
}
