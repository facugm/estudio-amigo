import { useState, useRef, useEffect } from 'react';
import { useContent } from '../content/ContentProvider';
import { SECTION_ANCHORS } from '../variants/types';
import { VariantSwitcher } from './VariantSwitcher';
import { Wordmark } from '../brand/Wordmark';
import { useHeaderOffset } from '../lib/useHeaderOffset';

export function Header(): JSX.Element {
  const { site } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useHeaderOffset(headerRef);

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

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = site.nav
      .map(item => document.getElementById(SECTION_ANCHORS[item.section]))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [site.nav]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-top">
        <div className="header-brand-container">
          <a href="#inicio" className="header-brand" aria-label="estudio amigo" onClick={closeMenu}>
            <Wordmark className="brand-logo" />
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
            {site.nav.map(item => {
              const anchor = SECTION_ANCHORS[item.section];
              const isCurrent = activeSection === anchor;
              return (
                <li key={item.section} className="nav-item">
                  <a
                    href={`#${anchor}`}
                    className="nav-link"
                    aria-current={isCurrent ? 'true' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
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
