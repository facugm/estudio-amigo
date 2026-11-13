import Lightbox, { type Slide } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import type { Pieza } from './types';
import { atributosLink } from '../../lib/IconoChat';

const ETIQUETAS = {
  Previous: 'Anterior',
  Next: 'Siguiente',
  Close: 'Cerrar',
  Lightbox: 'Galería de piezas',
  Carousel: 'carrusel',
  Slide: 'pieza',
  'Photo gallery': 'Galería',
  '{index} of {total}': '{index} de {total}',
  Caption: 'Descripción',
  'Show captions': 'Mostrar descripción',
  'Hide captions': 'Ocultar descripción'
};

export function piezaASlide(pieza: Pieza): Slide {
  const { media } = pieza;
  if (media.tipo === 'video') {
    return {
      type: 'video',
      poster: media.poster,
      width: media.ancho,
      height: media.alto,
      sources: [{ src: media.src, type: media.mime }],
      title: pieza.titulo,
      description: pieza.descripcion
    };
  }
  return {
    src: media.src,
    alt: media.alt,
    width: media.ancho,
    height: media.alto,
    title: pieza.titulo,
    description: pieza.descripcion
  };
}

export interface GaleriaPiezasProps {
  piezas: readonly Pieza[];
  abierta: boolean;
  /** Pieza con la que se abre la galería. */
  indice: number;
  onCerrar: () => void;
  /** Link del botón "Quiero algo así" (por ejemplo, el WhatsApp del estudio). */
  ctaHref?: string;
}

/**
 * Galería a pantalla completa (opción E).
 * En celu: se desliza para pasar, se arrastra hacia abajo para cerrar,
 * y cada pieza muestra su título y su descripción.
 */
export function GaleriaPiezas({
  piezas,
  abierta,
  indice,
  onCerrar,
  ctaHref
}: GaleriaPiezasProps): JSX.Element {
  const botones = ctaHref
    ? [
        <a
          key="cta"
          className="galeria-piezas__cta"
          href={ctaHref}
          {...atributosLink(ctaHref)}
        >
          Quiero algo así
        </a>,
        'close' as const
      ]
    : ['close' as const];

  return (
    <Lightbox
      className="galeria-piezas"
      open={abierta}
      close={onCerrar}
      index={indice}
      slides={piezas.map(piezaASlide)}
      plugins={[Captions, Counter, Video]}
      labels={ETIQUETAS}
      carousel={{ finite: true, preload: 2 }}
      controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      captions={{ descriptionTextAlign: 'start', descriptionMaxLines: 4 }}
      counter={{ separator: ' / ' }}
      video={{ controls: true, playsInline: true, preload: 'metadata' }}
      toolbar={{ buttons: botones }}
    />
  );
}
