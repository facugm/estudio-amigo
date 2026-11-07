import type { GrupoDeServicio } from './types';

function portadaDe(grupo: GrupoDeServicio): { src: string; alt: string } {
  const pieza = grupo.piezas[grupo.portada ?? 0] ?? grupo.piezas[0]!;
  const { media } = pieza;
  return media.tipo === 'video'
    ? { src: media.poster, alt: media.alt }
    : { src: media.src, alt: media.alt };
}

export interface TarjetaServicioProps {
  grupo: GrupoDeServicio;
  /** Nombre corto del servicio, por ejemplo "Fotoproducto". */
  nombreServicio: string;
  onAbrir: () => void;
}

/** Tarjeta del carrusel (opción A). Toda la tarjeta abre la galería. */
export function TarjetaServicio({
  grupo,
  nombreServicio,
  onAbrir
}: TarjetaServicioProps): JSX.Element {
  const portada = portadaDe(grupo);
  const cantidad = grupo.piezas.length;
  const textoCantidad = cantidad === 1 ? '1 pieza' : `${cantidad} piezas`;

  return (
    <button
      type="button"
      className="tarjeta-servicio"
      onClick={onAbrir}
      aria-label={`${nombreServicio}: ${grupo.titulo}. Ver ${textoCantidad}`}
    >
      <span className="tarjeta-servicio__portada">
        <img
          src={portada.src}
          alt=""
          loading="lazy"
          className="tarjeta-servicio__imagen"
        />
        <span className="tarjeta-servicio__cantidad">{textoCantidad}</span>
        <span className="tarjeta-servicio__ampliar" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      <span className="tarjeta-servicio__cuerpo">
        <span className="tarjeta-servicio__servicio">{nombreServicio}</span>
        <span className="tarjeta-servicio__titulo">{grupo.titulo}</span>
        <span className="tarjeta-servicio__link">
          Ver {cantidad === 1 ? 'la pieza' : `las ${textoCantidad}`} →
        </span>
      </span>
    </button>
  );
}
