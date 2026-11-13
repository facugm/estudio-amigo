/** Textos y datos del sitio que no son de una sola sección. */

export const INSTAGRAM = {
  usuario: '@tuestudioamigo',
  href: 'https://www.instagram.com/tuestudioamigo/'
} as const;

export const NAVEGACION = [
  { label: 'Qué hacemos', href: '#que-hacemos' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Nosotros', href: '#nosotros' }
] as const;

/**
 * Marcas con las que trabajamos. Por ahora se muestran con el nombre;
 * cuando estén los logos, se suma `logo` con la ruta del archivo.
 */
export interface Cliente {
  nombre: string;
  logo?: string;
}

export const CLIENTES: readonly Cliente[] = [
  { nombre: 'Alemana' },
  { nombre: 'Chic Café' },
  { nombre: 'Pelokitos' },
  { nombre: 'Crawley' },
  { nombre: 'Estación F' },
  { nombre: 'Patch & Head' },
  { nombre: 'Matiz' }
];

export interface Integrante {
  nombre: string;
  rol: string;
  /** Color del amigo mientras no haya foto. */
  color: 'navy' | 'magenta';
  foto?: string;
}

export const EQUIPO: readonly Integrante[] = [
  { nombre: 'Constanza', rol: 'Cofundadora · estrategia y comunicación', color: 'navy' },
  { nombre: 'Josefina', rol: 'Cofundadora · diseño gráfico', color: 'magenta' },
  { nombre: 'Valentino', rol: 'Diseño gráfico y edición de video', color: 'navy' },
  { nombre: 'Facundo', rol: 'Comunicación y desarrollo web', color: 'magenta' }
];
