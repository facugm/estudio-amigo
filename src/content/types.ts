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
