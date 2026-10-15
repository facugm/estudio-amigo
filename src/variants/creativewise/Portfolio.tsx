import { useState } from 'react';
import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { PortfolioEmptyState } from '../../components/PortfolioEmptyState';
import { ProjectMedia } from '../../components/ProjectMedia';
import { ProvisionalTag } from '../../components/ProvisionalTag';
import { ProjectCaseLink } from '../../components/ProjectCaseLink';
import { ServiceTags } from '../../components/ServiceTags';
import { projectCategories, filterProjects } from './filter';

export function CreativewisePortfolio(): JSX.Element {
  const { site, projects } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const portfolioTitle =
    site.nav.find(n => n.section === 'portfolio')?.label ?? 'Portfolio';

  const categories = projectCategories(projects);
  const visibleProjects = filterProjects(projects, selectedCategory);

  return (
    <SectionShell section="portfolio" layout="creativewise-wall">
      <div className="creativewise-wall-header">
        <div>
          <h2 className="creativewise-section-title">{portfolioTitle}</h2>
          <p className="creativewise-wall-subtitle">
            Selección curada de identidades, lanzamientos y producciones creativas.
          </p>
        </div>

        {projects.length > 0 && categories.length > 0 && (
          <div className="creativewise-filters" role="toolbar" aria-label="Filtro de proyectos por categoría">
            <button
              type="button"
              className="creativewise-chip"
              aria-pressed={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className="creativewise-chip"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {projects.length === 0 ? (
        <PortfolioEmptyState />
      ) : visibleProjects.length === 0 ? (
        <p className="creativewise-wall-empty">
          No se encontraron proyectos para la categoría seleccionada.
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
