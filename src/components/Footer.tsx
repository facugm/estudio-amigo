import { useContent } from '../content/ContentProvider';
import { SECTION_ANCHORS } from '../variants/types';
import { ContactChannels } from './ContactChannels';
import { Wordmark } from '../brand/Wordmark';

export function Footer(): JSX.Element {
  const { site } = useContent();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark className="footer-wordmark" />
          </div>

          <nav aria-label="Navegación pie de página" className="footer-nav">
            <ul className="footer-nav-list">
              {site.nav.map(item => (
                <li key={item.section} className="footer-nav-item">
                  <a
                    href={`#${SECTION_ANCHORS[item.section]}`}
                    className="footer-nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-contact">
            <h3 className="footer-heading">Canales de contacto</h3>
            <ContactChannels className="footer-channels" />
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-prototype-note">
            {site.footer.prototypeNote}
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} {site.brand.full}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
