import type { GrupoDeServicio, Pieza } from './types';

/**
 * Tarjetas de "Qué hacemos", con los textos del diseño de Figma ("Jose — One page").
 *
 * Las piezas son PROVISORIAS: imágenes generadas con la paleta en `public/casos-demo/`.
 * Para cargar las reales, reemplazar `piezas` de cada servicio (ver README de esta carpeta).
 */
function provisorias(clave: string, servicio: string, cantidad: number): Pieza[] {
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
    descripcion: 'Texto de ejemplo: qué se hizo y para qué. Se reemplaza al cargar la pieza real.'
  }));
}

export const trabajos: readonly GrupoDeServicio[] = [
  {
    servicio: 'branding',
    etiqueta: 'Branding',
    titulo: 'Identidad de marca',
    descripcion: 'Logo, paleta, tipografías y cómo se aplica en cada pieza.',
    piezas: provisorias('branding', 'Branding', 5)
  },
  {
    servicio: 'contenido-redes',
    etiqueta: 'Contenido para redes',
    titulo: 'Contenido para Instagram',
    descripcion: 'Posteos, reels e historias con la voz de la marca.',
    piezas: provisorias('contenido', 'Contenido para redes', 6)
  },
  {
    servicio: 'fotoproducto',
    etiqueta: 'Fotoproducto',
    titulo: 'Sesión de producto',
    descripcion: 'Fotos listas para usar en redes, web y catálogo.',
    piezas: provisorias('fotoproducto', 'Fotoproducto', 8)
  },
  {
    servicio: 'papeleria-senaletica',
    etiqueta: 'Cartelería y señalética',
    titulo: 'Piezas para el local',
    descripcion: 'Carteles, menús y señalética que acompañan lo que se ve en redes.',
    piezas: provisorias('papeleria', 'Cartelería y señalética', 4)
  },
  {
    servicio: 'pauta-digital',
    etiqueta: 'Pauta digital',
    titulo: 'Campaña en Meta',
    descripcion: 'Anuncios con un objetivo claro y resultados contados sin vueltas.',
    piezas: provisorias('pauta', 'Pauta digital', 3)
  },
  {
    servicio: 'sitios-web',
    etiqueta: 'Sitio web',
    titulo: 'Web institucional',
    descripcion: 'Simple, clara y pensada para que te escriban.',
    piezas: provisorias('web', 'Sitio web', 3)
  }
];
