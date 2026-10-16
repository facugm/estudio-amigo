import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { Isotype } from '../../brand/Isotype';

export function EscalamosHero(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="hero" layout="escalamos-value">
      <div className="escalamos-hero-badge">
        <span>{site.hero.eyebrow}</span>
      </div>
      <div className="escalamos-hero-header-row">
        <h1 className="escalamos-hero-headline">{site.hero.headline}</h1>
        <div className="escalamos-hero-isotype-wrap" aria-hidden="true">
          <Isotype className="escalamos-hero-isotype" />
        </div>
      </div>
      <p className="escalamos-hero-support">{site.hero.support}</p>
      <div className="escalamos-hero-ctas">
        <a href="#contacto" className="escalamos-btn-primary">
          {site.hero.cta.label}
        </a>
        <a href="#servicios" className="escalamos-btn-outline">
          {site.hero.secondaryCta.label}
        </a>
      </div>
    </SectionShell>
  );
}
