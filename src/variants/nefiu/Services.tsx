import { useState, useRef, KeyboardEvent } from 'react';
import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function NefiuServices(): JSX.Element {
  const { services, site } = useContent();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeService = services[selectedIndex] ?? services[0];
  const servicesTitle = site.nav.find(n => n.section === 'services')?.label ?? 'Servicios';

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % services.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + services.length) % services.length;
    } else {
      return;
    }
    e.preventDefault();
    setSelectedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <SectionShell section="services" layout="nefiu-modules">
      <h2 className="nefiu-section-title">{servicesTitle}</h2>
      <div className="nefiu-services-layout">
        <div role="tablist" aria-label="Nuestros Servicios" className="nefiu-tablist">
          {services.map((s, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={s.id}
                ref={el => {
                  tabRefs.current[idx] = el;
                }}
                id={`tab-${s.id}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls={`panel-${s.id}`}
                tabIndex={isSelected ? 0 : -1}
                className="nefiu-tab"
                onClick={() => setSelectedIndex(idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
              >
                <span>{s.title}</span>
                <span aria-hidden="true">→</span>
              </button>
            );
          })}
        </div>

        {activeService && (
          <div
            id={`panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeService.id}`}
            className="nefiu-tabpanel"
          >
            <div>
              <h3 className="nefiu-tabpanel-title">{activeService.title}</h3>
              <p className="nefiu-tabpanel-desc">{activeService.summary}</p>
            </div>
            <a href="#contacto" className="nefiu-btn-primary" style={{ alignSelf: 'flex-start' }}>
              Consultar por este servicio
            </a>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
