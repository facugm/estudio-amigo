import { Isotype } from '../../brand/Isotype';
import { Wordmark } from '../../brand/Wordmark';
import { linkWhatsApp } from '../../content/contacto';
import './portada.css';

export interface PortadaProps {
  /** Destino del botón. Por defecto, el WhatsApp del estudio. */
  ctaHref?: string;
}

/** Portada de alto impacto: "somos el estudio amigo de tu marca". */
export function Portada({ ctaHref = linkWhatsApp() }: PortadaProps): JSX.Element {
  const esExterno = ctaHref.startsWith('http');

  return (
    <section className="portada" id="inicio" aria-labelledby="portada-titulo">
      <p className="portada__dato portada__dato--lugar">Rosario · Argentina</p>
      <p className="portada__dato portada__dato--rubro">
        Estudio de{' '}<br className="portada__salto" />
        comunicación{' '}<br className="portada__salto" />
        digital.
      </p>

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

      <p className="portada__dato portada__dato--servicios">
        Estrategia,{' '}<br className="portada__salto" />
        contenido y diseño
      </p>
      <p className="portada__dato portada__dato--amigo">
        Te acompañamos como{' '}<br className="portada__salto" />
        lo haría un amigo
      </p>
    </section>
  );
}
