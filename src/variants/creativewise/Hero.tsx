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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
              opacity: 0.9
            }}
          >
            {projects.slice(0, 3).map(p => (
              <div
                key={p.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--c-surface)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                <span>{p.name}</span>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--c-muted)', fontWeight: 400 }}>
                  {p.client}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
