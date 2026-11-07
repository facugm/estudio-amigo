import type { GrupoDeServicio, Pieza } from './types';

/**
 * Datos de prueba: imágenes provisorias generadas con la paleta de marca.
 * Reemplazar por las piezas reales en `trabajos.ts` cuando estén elegidas.
 */
function piezasProvisorias(
  clave: string,
  servicio: string,
  cantidad: number,
  descripciones: readonly string[]
): Pieza[] {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: `${clave}-${i + 1}`,
    media: {
      tipo: 'imagen',
      src: `./casos-demo/${clave}-${i + 1}.svg`,
      alt: `${servicio}: pieza provisoria ${i + 1}`,
      ancho: 1080,
      alto: 1350
    },
    titulo: `${servicio} · Pieza ${i + 1}`,
    descripcion: descripciones[i % descripciones.length]!
  }));
}

export const trabajosDemo: readonly GrupoDeServicio[] = [
  {
    servicio: 'fotoproducto',
    titulo: 'Sesiones de producto',
    piezas: piezasProvisorias('fotoproducto', 'Fotoproducto', 8, [
      'Texto de ejemplo: qué se fotografió y para qué se usó.',
      'Texto de ejemplo: una línea sobre la idea detrás de la sesión.'
    ])
  },
  {
    servicio: 'branding',
    titulo: 'Identidades de marca',
    piezas: piezasProvisorias('branding', 'Branding', 5, [
      'Texto de ejemplo: qué pidió la marca y cómo lo resolvimos.'
    ])
  },
  {
    servicio: 'contenido-redes',
    titulo: 'Contenido para Instagram',
    piezas: piezasProvisorias('contenido', 'Contenido para redes', 6, [
      'Texto de ejemplo: formato de la pieza y objetivo de la publicación.'
    ])
  },
  {
    servicio: 'papeleria-senaletica',
    titulo: 'Piezas para el local',
    piezas: piezasProvisorias('papeleria', 'Papelería y señalética', 4, [
      'Texto de ejemplo: dónde se usa la pieza y en qué material.'
    ])
  },
  {
    servicio: 'sitios-web',
    titulo: 'Webs institucionales',
    piezas: piezasProvisorias('web', 'Sitio web', 3, [
      'Texto de ejemplo: qué necesitaba resolver la web.'
    ])
  },
  {
    // Sin piezas todavía: el carrusel lo oculta solo.
    servicio: 'pauta-digital',
    titulo: 'Campañas en Meta',
    piezas: []
  }
];
