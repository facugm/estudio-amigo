import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function NefiuHero(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="hero" layout="nefiu-composition">
      <div className="nefiu-hero-grid">
        <div className="nefiu-hero-copy">
          <h1 className="nefiu-hero-headline">{site.hero.headline}</h1>
          <p className="nefiu-hero-support">{site.hero.support}</p>
          <div className="nefiu-hero-ctas">
            <a href="#contacto" className="nefiu-btn-primary">
              {site.hero.cta.label}
            </a>
            <a href="#servicios" className="nefiu-btn-outline">
              {site.hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="nefiu-hero-graphic" aria-hidden="true">
          <span className="nefiu-graphic-tag">Estudio Creativo & Comunicación</span>
          <div className="nefiu-graphic-title">Branding real que conecta y transforma marcas.</div>
          <div className="nefiu-graphic-meta">Identidad, estrategia y comunicación</div>
        </div>
      </div>
    </SectionShell>
  );
}
