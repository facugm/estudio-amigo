import type { ServiceId } from '../../content/types';

/** Imagen o video de una pieza. Ancho y alto en píxeles reales del archivo. */
export type MediaPieza =
  | {
      tipo: 'imagen';
      src: string;
      alt: string;
      ancho: number;
      alto: number;
    }
  | {
      tipo: 'video';
      src: string;
      /** Tipo del archivo, por ejemplo `video/mp4`. */
      mime: string;
      /** Imagen que se ve antes de reproducir y en la portada de la tarjeta. */
      poster: string;
      alt: string;
      ancho: number;
      alto: number;
    };

/** Un trabajo concreto que se muestra en la galería. */
export interface Pieza {
  id: string;
  media: MediaPieza;
  /** Título corto que aparece arriba en la galería. */
  titulo: string;
  /** Descripción que acompaña a la pieza mientras se ve en grande. */
  descripcion: string;
}

/** Todas las piezas de un mismo servicio: una tarjeta de "Qué hacemos". */
export interface GrupoDeServicio {
  servicio: ServiceId;
  /** Nombre del servicio que va arriba, en mayúsculas (por ejemplo "Branding"). */
  etiqueta: string;
  /** Título de la tarjeta, por ejemplo "Identidad de marca". */
  titulo: string;
  /** Una línea sobre qué incluye. */
  descripcion: string;
  /** Índice de la pieza que se usa de portada. Por defecto, la primera. */
  portada?: number;
  piezas: readonly Pieza[];
}
