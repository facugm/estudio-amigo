import { atributosLink } from '../../lib/IconoChat';
import type { GrupoDeServicio } from './types';

function portadaDe(grupo: GrupoDeServicio): { src: string } | null {
  const pieza = grupo.piezas[grupo.portada ?? 0] ?? grupo.piezas[0];
  if (!pieza) return null;
  return { src: pieza.media.tipo === 'video' ? pieza.media.poster : pieza.media.src };
}

export interface TarjetaServicioProps {
  grupo: GrupoDeServicio;
  /** Abre la galería con las piezas del servicio. */
  onAbrir: () => void;
  /** Destino de "Quiero algo así" (WhatsApp). */
  ctaHref: string;
}

/**
 * Tarjeta de un servicio (Figma: 400 × 442, imagen de 260).
 * La imagen abre la galería; "Quiero algo así" lleva a WhatsApp.
 */
export function TarjetaServicio({ grupo, onAbrir, ctaHref }: TarjetaServicioProps): JSX.Element {
  const portada = portadaDe(grupo);
  const cantidad = grupo.piezas.length;
  const textoCantidad = cantidad === 1 ? '1 pieza' : `${cantidad} piezas`;

  return (
    <article className="tarjeta">
      {portada ? (
        <button
          type="button"
          className="tarjeta__imagen"
          onClick={onAbrir}
          aria-label={`Ver ${textoCantidad} de ${grupo.etiqueta}: ${grupo.titulo}`}
        >
          <img src={portada.src} alt="" loading="lazy" className="tarjeta__foto" />
          <span className="tarjeta__cantidad">{textoCantidad}</span>
        </button>
      ) : (
        <div className="tarjeta__imagen tarjeta__imagen--vacia" aria-hidden="true" />
      )}
      <div className="tarjeta__cuerpo">
        <p className="tarjeta__servicio">{grupo.etiqueta}</p>
        <h3 className="tarjeta__titulo">{grupo.titulo}</h3>
        <p className="tarjeta__descripcion">{grupo.descripcion}</p>
        <a className="tarjeta__link" href={ctaHref} {...atributosLink(ctaHref)}>
          Quiero algo así
        </a>
      </div>
    </article>
  );
}
