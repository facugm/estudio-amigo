import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { PortfolioEmptyState } from '../../components/PortfolioEmptyState';
import { ProjectMedia } from '../../components/ProjectMedia';
import { ProvisionalTag } from '../../components/ProvisionalTag';
import { ProjectCaseLink } from '../../components/ProjectCaseLink';
import { ServiceTags } from '../../components/ServiceTags';

export function EscalamosPortfolio(): JSX.Element {
  const { site, projects } = useContent();

  const portfolioTitle =
    site.nav.find(n => n.section === 'portfolio')?.label ?? 'Casos y Evidencia';

  return (
    <SectionShell section="portfolio" layout="escalamos-proof">
      <div className="escalamos-section-header">
        <h2 className="escalamos-section-title">{portfolioTitle}</h2>
        <p className="escalamos-section-desc">
          {site.intros.portfolio}
        </p>
      </div>

      {projects.length === 0 ? (
        <PortfolioEmptyState />
      ) : (
        <div className="escalamos-proof-grid">
          {projects.map(project => (
            <article key={project.id} className="escalamos-proof-card">
              <div className="escalamos-proof-media">
                <ProjectMedia project={project} />
              </div>
              <div className="escalamos-proof-content">
                <div className="escalamos-proof-meta">
                  <span>{project.client}</span>
                  <ProvisionalTag />
                </div>
                <h3 className="escalamos-proof-title">{project.name}</h3>
                <p className="escalamos-proof-desc">{project.description}</p>
                <div className="escalamos-proof-footer">
                  <ServiceTags serviceIds={project.services} />
                  <ProjectCaseLink project={project} className="escalamos-btn-outline" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
