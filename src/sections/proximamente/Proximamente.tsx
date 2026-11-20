import { Isotype } from '../../brand/Isotype';
import { Wordmark } from '../../brand/Wordmark';
import { EN_PREPARACION, INSTAGRAM } from '../../content/sitio';
import { atributosLink } from '../../lib/links';
import './proximamente.css';

/** Se muestra la pantalla de espera salvo que la web esté lanzada o se pida la vista completa. */
export function mostrarProximamente(busqueda: string, enPreparacion = EN_PREPARACION): boolean {
  return enPreparacion && new URLSearchParams(busqueda).get('vista') !== 'completa';
}

/** Pantalla de espera mientras terminamos la web. */
export function Proximamente(): JSX.Element {
  return (
    <main className="proximamente" aria-labelledby="proximamente-titulo">
      <Wordmark className="proximamente__marca" />

      <div className="proximamente__centro">
        <Isotype className="proximamente__amigo" />
        <h1 id="proximamente-titulo" className="proximamente__titulo">
          <span className="proximamente__liviano">Estamos preparando nuestra web</span>{' '}
          <br className="proximamente__salto" />
          para recibir amigos
        </h1>
        <p className="proximamente__bajada">¡Volvé pronto!</p>
        <a className="proximamente__cta" href={INSTAGRAM.href} {...atributosLink(INSTAGRAM.href)}>
          Mientras, seguinos en Instagram
        </a>
      </div>

      <p className="proximamente__pie">Rosario · Argentina · {INSTAGRAM.usuario}</p>
    </main>
  );
}
