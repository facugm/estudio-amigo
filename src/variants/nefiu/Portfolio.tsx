import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { PortfolioEmptyState } from '../../components/PortfolioEmptyState';
import { ProjectMedia } from '../../components/ProjectMedia';
import { ProvisionalTag } from '../../components/ProvisionalTag';
import { ProjectCaseLink } from '../../components/ProjectCaseLink';
import { ServiceTags } from '../../components/ServiceTags';
import { bentoSize, bentoTone } from './bento';

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
              data-size={bentoSize(index, projects.length)}
            >
              <div className="nefiu-bento-media">
                <ProjectMedia project={project} />
              </div>
              <div
                className="nefiu-bento-content"
                data-tone={bentoTone(index)}
              >
                <div className="nefiu-bento-header">
                  <span className="nefiu-bento-client">
                    {project.client}
                  </span>
                  <ProvisionalTag />
                </div>
                <h3 className="nefiu-bento-title">{project.name}</h3>
                <p className="nefiu-bento-desc">{project.description}</p>
                <div className="nefiu-bento-footer">
                  <div className="nefiu-bento-tags">
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
