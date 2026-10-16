import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { Isotype } from '../../brand/Isotype';

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
        <div className="nefiu-hero-graphic">
          <span className="nefiu-graphic-tag">{site.hero.eyebrow}</span>
          <div className="nefiu-hero-isotype-wrap" aria-hidden="true">
            <Isotype className="nefiu-hero-isotype" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
