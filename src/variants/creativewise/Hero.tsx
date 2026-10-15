import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function CreativewiseHero(): JSX.Element {
  const { site, projects } = useContent();

  return (
    <SectionShell section="hero" layout="creativewise-reel">
      <div className="creativewise-hero-container">
        <h1 className="creativewise-hero-headline">{site.hero.headline}</h1>
        <div className="creativewise-hero-bottom">
          <p className="creativewise-hero-support">{site.hero.support}</p>
          <div className="creativewise-hero-ctas">
            <a href="#contacto" className="creativewise-btn-primary">
              {site.hero.cta.label}
            </a>
            <a href="#trabajos" className="creativewise-btn-secondary">
              {site.hero.secondaryCta.label}
            </a>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="creativewise-hero-projects">
            {projects.slice(0, 3).map(p => (
              <a
                key={p.id}
                href="#trabajos"
                className="creativewise-hero-project-card"
              >
                <span>{p.name}</span>
                <span className="creativewise-hero-project-client">
                  {p.client}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
