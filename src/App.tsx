import { Portada } from './sections/portada/Portada';
import { Barra } from './sections/barra/Barra';
import { Clientes } from './sections/clientes/Clientes';
import { QueHacemos } from './sections/que-hacemos/QueHacemos';
import { trabajos } from './sections/que-hacemos/trabajos';
import { Nosotros } from './sections/nosotros/Nosotros';
import { Cierre } from './sections/cierre/Cierre';

/** Sitio de estudio amigo: one page, celu primero. Orden según "Jose — One page" en Figma. */
export function App(): JSX.Element {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Portada />
      <Barra />
      <main id="main">
        <Clientes />
        <QueHacemos grupos={trabajos} />
        <Nosotros />
      </main>
      <Cierre />
    </>
  );
}
