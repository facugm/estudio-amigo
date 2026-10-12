import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function OrillaHero(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="hero" layout="orilla-editorial">
      <div className="orilla-hero-inner">
        <h1 className="orilla-hero-headline">{site.hero.headline}</h1>
        <div className="orilla-hero-bottom">
          <p className="orilla-hero-support">{site.hero.support}</p>
          <div className="orilla-hero-ctas">
            <a href="#contacto" className="orilla-btn-main">
              {site.hero.cta.label}
            </a>
            <a href="#trabajos" className="orilla-btn-secondary">
              {site.hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
