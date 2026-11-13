import { useEffect, useState } from 'react';
import { Wordmark } from '../../brand/Wordmark';
import { linkWhatsApp } from '../../content/contacto';
import { NAVEGACION } from '../../content/sitio';
import { atributosLink } from '../../lib/IconoChat';
import './barra.css';

/**
 * Barra de navegación. Va después de la portada y queda fija arriba al bajar.
 * En celu, el menú se abre con la hamburguesa.
 */
export function Barra({ ctaHref = linkWhatsApp() }: { ctaHref?: string }): JSX.Element {
  const [abierto, setAbierto] = useState(false);

  // Cerrar con Escape.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setAbierto(false);
    };
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [abierto]);

  const cerrar = (): void => setAbierto(false);

  return (
    <header className={`barra${abierto ? ' barra--abierta' : ''}`}>
      <div className="barra__fila">
        <a href="#inicio" className="barra__logo" aria-label="estudio amigo, volver al inicio" onClick={cerrar}>
          <Wordmark className="barra__marca" />
        </a>

        <button
          type="button"
          className="barra__hamburguesa"
          aria-expanded={abierto}
          aria-controls="barra-menu"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto(a => !a)}
        >
          <span className="barra__linea" />
          <span className="barra__linea" />
          <span className="barra__linea" />
        </button>

        <nav id="barra-menu" className="barra__menu" aria-label="Principal">
          <ul className="barra__links">
            {NAVEGACION.map(item => (
              <li key={item.href}>
                <a href={item.href} className="barra__link" onClick={cerrar}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={ctaHref} className="barra__cta" onClick={cerrar} {...atributosLink(ctaHref)}>
            Escribinos
          </a>
        </nav>
      </div>
    </header>
  );
}
