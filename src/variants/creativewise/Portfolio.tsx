import { useState } from 'react';
import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { PortfolioEmptyState } from '../../components/PortfolioEmptyState';
import { ProjectMedia } from '../../components/ProjectMedia';
import { ProvisionalTag } from '../../components/ProvisionalTag';
import { ProjectCaseLink } from '../../components/ProjectCaseLink';
import { ServiceTags } from '../../components/ServiceTags';
import { ServiceId } from '../../content/types';
import { serviceFilters, filterByService } from './filter';

export function CreativewisePortfolio(): JSX.Element {
  const { site, projects, services } = useContent();
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);

  const portfolioTitle =
    site.nav.find(n => n.section === 'portfolio')?.label ?? 'Portfolio';

  const availableServices = serviceFilters(projects, services);
  const visibleProjects = filterByService(projects, selectedService);

  return (
    <SectionShell section="portfolio" layout="creativewise-wall">
      <div className="creativewise-wall-header">
        <div>
          <h2 className="creativewise-section-title">{portfolioTitle}</h2>
          <p className="creativewise-wall-subtitle">
            {site.intros.portfolio}
          </p>
        </div>

        {projects.length > 1 && (
          <div className="creativewise-filters" role="toolbar" aria-label="Filtro de proyectos por servicio">
            <button
              type="button"
              className="creativewise-chip"
              aria-pressed={selectedService === null}
              onClick={() => setSelectedService(null)}
            >
              Todos
            </button>
            {availableServices.map(service => (
              <button
                key={service.id}
                type="button"
                className="creativewise-chip"
                aria-pressed={selectedService === service.id}
                onClick={() => setSelectedService(service.id)}
              >
                {service.shortTitle}
              </button>
            ))}
          </div>
        )}
      </div>

      {projects.length === 0 ? (
        <PortfolioEmptyState />
      ) : visibleProjects.length === 0 ? (
        <p className="creativewise-wall-empty">
          No se encontraron proyectos para el servicio seleccionado.
        </p>
      ) : (
        <div className="creativewise-wall-grid">
          {visibleProjects.map(project => (
            <article key={project.id} className="creativewise-card">
              <div className="creativewise-card-media">
                <ProjectMedia project={project} />
              </div>
              <div className="creativewise-card-body">
                <div className="creativewise-card-meta">
                  <span>{project.client} · {project.category}</span>
                  <ProvisionalTag />
                </div>
                <h3 className="creativewise-card-title">{project.name}</h3>
                <p className="creativewise-card-desc">{project.description}</p>
                <div className="creativewise-card-footer">
                  <ServiceTags serviceIds={project.services} />
                  <ProjectCaseLink project={project} className="creativewise-btn-secondary" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
