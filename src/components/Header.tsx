import { useState, useRef, useEffect } from 'react';
import { useContent } from '../content/ContentProvider';
import { SECTION_ANCHORS } from '../variants/types';
import { VariantSwitcher } from './VariantSwitcher';

export function Header(): JSX.Element {
  const { site } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-brand-container">
          <a href="#inicio" className="header-brand" onClick={closeMenu}>
            <span className="brand-logo-text">estudio amigo</span>
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="main-nav"
          aria-label="Menú principal"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className="menu-icon" aria-hidden="true">
            {isOpen ? '✕' : '☰'}
          </span>
          <span className="menu-text">{isOpen ? 'Cerrar' : 'Menú'}</span>
        </button>

        <nav
          id="main-nav"
          aria-label="Principal"
          className={`main-nav ${isOpen ? 'is-open' : ''}`}
        >
          <ul className="nav-list">
            {site.nav.map(item => (
              <li key={item.section} className="nav-item">
                <a
                  href={`#${SECTION_ANCHORS[item.section]}`}
                  className="nav-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="header-actions">
            <a
              href="#contacto"
              className="header-cta"
              onClick={closeMenu}
            >
              Iniciar una conversación
            </a>
          </div>
        </nav>
      </div>

      <div className="header-switcher-row">
        <VariantSwitcher />
      </div>
    </header>
  );
}
