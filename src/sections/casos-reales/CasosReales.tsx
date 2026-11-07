import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { services } from '../../content/services';
import { GaleriaPiezas } from './GaleriaPiezas';
import { TarjetaServicio } from './TarjetaServicio';
import type { GrupoDeServicio } from './types';
import './casos-reales.css';

export interface CasosRealesProps {
  grupos: readonly GrupoDeServicio[];
  titulo?: string;
  /** Link del botón "Quiero algo así" dentro de la galería. */
  ctaHref?: string;
}

/**
 * Sección "Casos reales": carrusel de servicios (A) + galería a pantalla completa (E).
 * En celu se ve una tarjeta y asoma la siguiente; en desktop, tres a la vez.
 */
export function CasosReales({
  grupos,
  titulo = 'Así se ve lo que hacemos.',
  ctaHref
}: CasosRealesProps): JSX.Element | null {
  const visibles = useMemo(() => grupos.filter(g => g.piezas.length > 0), [grupos]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false
  });
  const [seleccionado, setSeleccionado] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [puedeAnterior, setPuedeAnterior] = useState(false);
  const [puedeSiguiente, setPuedeSiguiente] = useState(false);
  const [galeria, setGaleria] = useState<{ grupo: number; indice: number } | null>(null);

  const actualizar = useCallback(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    setSeleccionado(emblaApi.selectedScrollSnap());
    setPuedeAnterior(emblaApi.canScrollPrev());
    setPuedeSiguiente(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    actualizar();
    emblaApi.on('select', actualizar).on('reInit', actualizar);
    return () => {
      emblaApi.off('select', actualizar).off('reInit', actualizar);
    };
  }, [emblaApi, actualizar]);

  if (visibles.length === 0) return null;

  const nombreDe = (id: GrupoDeServicio['servicio']): string =>
    services.find(s => s.id === id)?.shortTitle ?? id;
  const grupoAbierto = galeria ? visibles[galeria.grupo] : undefined;

  return (
    <section className="casos-reales" id="casos-reales" aria-labelledby="casos-reales-titulo">
      <div className="casos-reales__encabezado">
        <p className="casos-reales__etiqueta">Casos reales</p>
        <h2 id="casos-reales-titulo" className="casos-reales__titulo">
          {titulo}
        </h2>
      </div>

      <div
        className="casos-reales__carrusel"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Trabajos por servicio"
      >
        <div className="casos-reales__viewport" ref={emblaRef}>
          <ul className="casos-reales__pista">
            {visibles.map((grupo, i) => (
              <li
                key={grupo.servicio}
                className="casos-reales__slide"
                aria-roledescription="tarjeta"
                aria-label={`${i + 1} de ${visibles.length}`}
              >
                <TarjetaServicio
                  grupo={grupo}
                  nombreServicio={nombreDe(grupo.servicio)}
                  onAbrir={() => setGaleria({ grupo: i, indice: 0 })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="casos-reales__controles">
          {snaps.length > 1 && (
            <div className="casos-reales__puntos" role="group" aria-label="Elegir tarjeta">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="casos-reales__punto"
                  aria-label={`Ir a la tarjeta ${i + 1}`}
                  aria-current={i === seleccionado ? 'true' : undefined}
                  onClick={() => emblaApi?.scrollTo(i)}
                >
                  <span className="casos-reales__punto-marca" />
                </button>
              ))}
            </div>
          )}
          <div className="casos-reales__flechas">
            <button
              type="button"
              className="casos-reales__flecha"
              aria-label="Tarjeta anterior"
              disabled={!puedeAnterior}
              onClick={() => emblaApi?.scrollPrev()}
            >
              ←
            </button>
            <button
              type="button"
              className="casos-reales__flecha"
              aria-label="Tarjeta siguiente"
              disabled={!puedeSiguiente}
              onClick={() => emblaApi?.scrollNext()}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <GaleriaPiezas
        piezas={grupoAbierto?.piezas ?? []}
        abierta={Boolean(grupoAbierto)}
        indice={galeria?.indice ?? 0}
        onCerrar={() => setGaleria(null)}
        ctaHref={ctaHref}
      />
    </section>
  );
}
