import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { PortfolioEmptyState } from '../../components/PortfolioEmptyState';
import { ProjectMedia } from '../../components/ProjectMedia';
import { ProvisionalTag } from '../../components/ProvisionalTag';
import { ProjectCaseLink } from '../../components/ProjectCaseLink';
import { ServiceTags } from '../../components/ServiceTags';
import { bentoSize } from './bento';

export function NefiuPortfolio(): JSX.Element {
  const { site, projects } = useContent();

  const portfolioTitle =
    site.nav.find(n => n.section === 'portfolio')?.label ?? 'Proyectos';

  return (
    <SectionShell section="portfolio" layout="nefiu-bento">
      <h2 className="nefiu-section-title">{portfolioTitle}</h2>

      {projects.length === 0 ? (
        <PortfolioEmptyState />
      ) : (
        <div className="nefiu-bento-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="nefiu-bento-tile"
              data-size={bentoSize(index)}
            >
              <div className="nefiu-bento-media">
                <ProjectMedia project={project} />
              </div>
              <div className="nefiu-bento-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--c-muted)' }}>
                    {project.client}
                  </span>
                  <ProvisionalTag />
                </div>
                <h3 className="nefiu-bento-title">{project.name}</h3>
                <p className="nefiu-bento-desc">{project.description}</p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <ServiceTags serviceIds={project.services} />
                  </div>
                  <ProjectCaseLink project={project} className="nefiu-btn-outline" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
