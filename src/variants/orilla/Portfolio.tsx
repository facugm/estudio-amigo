import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { PortfolioEmptyState } from '../../components/PortfolioEmptyState';
import { ProjectMedia } from '../../components/ProjectMedia';
import { ProvisionalTag } from '../../components/ProvisionalTag';
import { ProjectCaseLink } from '../../components/ProjectCaseLink';
import { ServiceTags } from '../../components/ServiceTags';

export function OrillaPortfolio(): JSX.Element {
  const { site, projects } = useContent();

  const portfolioTitle =
    site.nav.find(n => n.section === 'portfolio')?.label ?? 'Trabajos';

  return (
    <SectionShell section="portfolio" layout="orilla-index">
      <div className="orilla-portfolio-header">
        <h2 className="orilla-section-title">{portfolioTitle}</h2>
      </div>

      {projects.length === 0 ? (
        <PortfolioEmptyState />
      ) : (
        <div className="orilla-portfolio-table">
          {projects.map((project, index) => (
            <article key={project.id} className="orilla-project-row">
              <span className="orilla-project-num">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="orilla-project-title-area">
                <h3 className="orilla-project-name">{project.name}</h3>
                <span className="orilla-project-client">{project.client}</span>
                <div style={{ marginTop: '0.25rem' }}>
                  <ProvisionalTag />
                </div>
              </div>

              <div className="orilla-project-meta">
                <span className="orilla-project-category">{project.category}</span>
                <ServiceTags
                  serviceIds={project.services}
                  className="orilla-service-tags"
                />
              </div>

              <div className="orilla-project-desc-area">
                <p className="orilla-project-desc">{project.description}</p>
                <ProjectCaseLink project={project} className="orilla-btn-secondary" />
              </div>

              <div className="orilla-project-media-wrap">
                <ProjectMedia project={project} />
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
