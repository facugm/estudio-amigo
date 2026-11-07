import { Isotype } from '../../brand/Isotype';
import { Wordmark } from '../../brand/Wordmark';
import { linkWhatsApp } from '../../content/contacto';
import './portada.css';

/**
 * Patrón fijo de tonos para el mosaico de fondo (0 = navy liso, 1-3 = cada vez más claro).
 * Fijo para que no cambie entre cargas.
 */
const MOSAICO = [
  0, 1, 0, 2, 1, 0, 3, 1,
  2, 0, 1, 0, 3, 1, 0, 2,
  0, 3, 0, 1, 0, 2, 1, 0,
  1, 0, 2, 0, 1, 0, 0, 3,
  0, 2, 1, 3, 0, 1, 2, 0,
  2, 0, 0, 1, 2, 0, 1, 0
] as const;

export interface PortadaProps {
  /** Destino del botón. Por defecto, el WhatsApp del estudio. */
  ctaHref?: string;
}

/** Portada de alto impacto: "somos el estudio amigo de tu marca". */
export function Portada({ ctaHref = linkWhatsApp() }: PortadaProps): JSX.Element {
  const esExterno = ctaHref.startsWith('http');

  return (
    <section className="portada" id="inicio" aria-labelledby="portada-titulo">
      <div className="portada__mosaico" aria-hidden="true">
        {MOSAICO.map((tono, i) => (
          <span key={i} className={`portada__baldosa portada__baldosa--t${tono}`} />
        ))}
      </div>

      <p className="portada__dato portada__dato--lugar">Rosario · Argentina</p>
      <p className="portada__dato portada__dato--rubro">Estudio de comunicación digital.</p>

      <div className="portada__centro">
        <Isotype className="portada__amigo" />
        <h1 id="portada-titulo" className="portada__titulo">
          <span className="portada__linea portada__linea--somos">somos el</span>
          <Wordmark className="portada__linea portada__marca" />
          <span className="portada__linea portada__linea--marca">de tu marca</span>
        </h1>
        <a
          className="portada__cta"
          href={ctaHref}
          {...(esExterno ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          Escribinos
        </a>
      </div>

      <p className="portada__dato portada__dato--servicios">Estrategia, contenido y diseño</p>
      <p className="portada__dato portada__dato--amigo">Te acompañamos como lo haría un amigo</p>
    </section>
  );
}
