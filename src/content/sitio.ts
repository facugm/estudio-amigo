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
  /** Color del sello que acompaña la foto (Figma, nov 2026). */
  sello: 'magenta' | 'navy' | 'lima' | 'lavanda';
}

export const EQUIPO: readonly Integrante[] = [
  { nombre: 'Constanza', rol: 'Cofundadora · estrategia y comunicación', sello: 'magenta' },
  { nombre: 'Josefina', rol: 'Cofundadora · diseño gráfico', sello: 'navy' },
  { nombre: 'Facundo', rol: 'Comunicación y desarrollo web', sello: 'lima' },
  { nombre: 'Valentino', rol: 'Diseño gráfico y edición de video', sello: 'lavanda' }
];

/**
 * Mientras sea `true`, la web muestra la pantalla "Estamos preparando nuestra web".
 * Para ver el sitio completo igual, entrar con `?vista=completa` al final de la dirección.
 * Para lanzar la web, pasarlo a `false`.
 */
export const EN_PREPARACION = true;
