import { Portada } from './sections/portada/Portada';
import { CasosReales } from './sections/casos-reales/CasosReales';
import { trabajosDemo } from './sections/casos-reales/trabajos.demo';
import { linkWhatsApp } from './content/contacto';

/**
 * Sitio de estudio amigo: one page, celu primero.
 * Orden según el diseño de Figma ("Jose — One page"). Las secciones que faltan se van sumando acá.
 */
export function App(): JSX.Element {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <main id="main">
        <Portada />
        {/* Próximas: logos de clientes, Qué hacemos */}
        <CasosReales grupos={trabajosDemo} ctaHref={linkWhatsApp()} />
        {/* Próximas: Quiénes somos, Cierre y contacto */}
      </main>
    </>
  );
}
