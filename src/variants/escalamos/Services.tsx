import { useState } from 'react';
import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { useContactForm } from '../../components/ContactFormProvider';
import { buildInterestMessage } from './interestMessage';

export function EscalamosServices(): JSX.Element {
  const { services, site } = useContent();
  const { draft, setField } = useContactForm();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const servicesTitle = site.nav.find(n => n.section === 'services')?.label ?? 'Servicios';

  const toggleService = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleConsult = () => {
    const selectedTitles = services
      .filter(s => selectedIds.includes(s.id))
      .map(s => s.title);
    const template = buildInterestMessage(selectedTitles);
    const existing = draft.message.trim();
    if (!existing || existing.startsWith('Hola estudio amigo, me interesan los siguientes servicios:')) {
      setField('message', template);
    } else {
      setField('message', `${template}\n\n${existing}`);
    }
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionShell section="services" layout="escalamos-benefits">
      <div className="escalamos-section-header">
        <h2 className="escalamos-section-title">{servicesTitle}</h2>
        <p className="escalamos-section-desc">
          Seleccioná las áreas donde tu marca necesita apoyo y coordinamos un diagnóstico directo.
        </p>
      </div>

      <div className="escalamos-services-grid">
        {services.map(s => {
          const isSelected = selectedIds.includes(s.id);
          const checkboxId = `escalamos-service-${s.id}`;
          return (
            <label
              key={s.id}
              htmlFor={checkboxId}
              className={`escalamos-service-card ${isSelected ? 'is-selected' : ''}`}
            >
              <div className="escalamos-service-header">
                <span className="escalamos-service-name">{s.title}</span>
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleService(s.id)}
                  aria-label={s.title}
                  className="escalamos-service-checkbox"
                />
              </div>
              <p className="escalamos-service-desc">{s.summary}</p>
            </label>
          );
        })}
      </div>

      <div className="escalamos-services-bar">
        <span className="escalamos-services-counter">
          <strong>{selectedIds.length}</strong> de {services.length} servicios seleccionados
        </span>
        <button
          type="button"
          onClick={handleConsult}
          disabled={selectedIds.length === 0}
          className="escalamos-btn-primary"
        >
          Solicitar diagnóstico con servicios seleccionados
        </button>
      </div>
    </SectionShell>
  );
}
