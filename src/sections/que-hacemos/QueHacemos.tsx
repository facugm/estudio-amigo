import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { linkWhatsApp } from '../../content/contacto';
import { GaleriaPiezas } from './GaleriaPiezas';
import { TarjetaServicio } from './TarjetaServicio';
import type { GrupoDeServicio } from './types';
import './que-hacemos.css';

/** Desde este ancho las tarjetas se ven en grilla de 3 y el carrusel se apaga. */
const GRILLA = '(min-width: 1024px)';

export interface QueHacemosProps {
  grupos: readonly GrupoDeServicio[];
  titulo?: string;
  /** Destino de "Quiero algo así" (WhatsApp del estudio). */
  ctaHref?: string;
}

/**
 * "Qué hacemos": una tarjeta por servicio con sus trabajos.
 * Celu y tablet: carrusel que se desliza (asoma la tarjeta siguiente).
 * Desktop: grilla de 3 × 2, como en Figma.
 * Tocar la imagen abre todas las piezas del servicio a pantalla completa.
 */
export function QueHacemos({
  grupos,
  titulo = 'Comunicación integral para tu marca',
  ctaHref = linkWhatsApp()
}: QueHacemosProps): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: { [GRILLA]: { active: false } }
  });
  const [seleccionado, setSeleccionado] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [galeria, setGaleria] = useState<{ grupo: number; indice: number } | null>(null);

  const actualizar = useCallback(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    setSeleccionado(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    actualizar();
    emblaApi.on('select', actualizar).on('reInit', actualizar);
    return () => {
      emblaApi.off('select', actualizar).off('reInit', actualizar);
    };
  }, [emblaApi, actualizar]);

  const grupoAbierto = galeria ? grupos[galeria.grupo] : undefined;

  return (
    <section className="que-hacemos" id="que-hacemos" aria-labelledby="que-hacemos-titulo">
      <div className="que-hacemos__encabezado">
        <p className="que-hacemos__etiqueta">Qué hacemos</p>
        <h2 id="que-hacemos-titulo" className="que-hacemos__titulo">
          {titulo}
        </h2>
      </div>

      <div className="que-hacemos__viewport" ref={emblaRef}>
        <ul className="que-hacemos__pista" aria-label="Trabajos por servicio">
          {grupos.map((grupo, i) => (
            <li key={grupo.servicio} className="que-hacemos__slide">
              <TarjetaServicio
                grupo={grupo}
                ctaHref={ctaHref}
                onAbrir={() => setGaleria({ grupo: i, indice: 0 })}
              />
            </li>
          ))}
        </ul>
      </div>

      {snaps.length > 1 && (
        <div className="que-hacemos__puntos" role="group" aria-label="Elegir tarjeta">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              className="que-hacemos__punto"
              aria-label={`Ir a la tarjeta ${i + 1}`}
              aria-current={i === seleccionado ? 'true' : undefined}
              onClick={() => emblaApi?.scrollTo(i)}
            >
              <span className="que-hacemos__punto-marca" />
            </button>
          ))}
        </div>
      )}

      <GaleriaPiezas
        piezas={grupoAbierto?.piezas ?? []}
        abierta={Boolean(grupoAbierto)}
        indice={galeria?.indice ?? 0}
        onCerrar={() => setGaleria(null)}
        // Dentro de la galería, el botón solo aparece cuando ya está el link real de WhatsApp.
        ctaHref={ctaHref.startsWith('http') ? ctaHref : undefined}
      />
    </section>
  );
}
