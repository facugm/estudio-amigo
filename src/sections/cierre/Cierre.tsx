import { Isotype } from '../../brand/Isotype';
import { Wordmark } from '../../brand/Wordmark';
import { linkWhatsApp } from '../../content/contacto';
import { INSTAGRAM } from '../../content/sitio';
import { IconoChat, atributosLink } from '../../lib/IconoChat';
import './cierre.css';

/** Cierre con el botón a WhatsApp (es el destino "#contacto") y pie del sitio. */
export function Cierre({ ctaHref = linkWhatsApp() }: { ctaHref?: string }): JSX.Element {
  const anio = new Date().getFullYear();

  return (
    <footer className="cierre" id="contacto" aria-labelledby="cierre-titulo">
      <div className="cierre__centro">
        <Isotype className="cierre__amigo" />
        <h2 id="cierre-titulo" className="cierre__titulo">
          ¿Querés esto para <span className="cierre__resaltado">tu marca?</span>
        </h2>
        <p className="cierre__bajada">Escribinos y lo charlamos. Sin compromiso y sin formularios.</p>
        <a className="cierre__cta" href={ctaHref} {...atributosLink(ctaHref)}>
          <IconoChat className="cierre__icono" />
          Escribinos por WhatsApp
        </a>
      </div>

      <div className="cierre__pie">
        <a href="#inicio" className="cierre__logo" aria-label="estudio amigo, volver al inicio">
          <Wordmark className="cierre__marca" />
        </a>
        <p className="cierre__dato">
          Rosario, Argentina ·{' '}
          <a href={INSTAGRAM.href} className="cierre__instagram" {...atributosLink(INSTAGRAM.href)}>
            {INSTAGRAM.usuario}
          </a>
        </p>
        <p className="cierre__dato">© {anio} Estudio Amigo</p>
      </div>
    </footer>
  );
}
