import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function EscalamosHero(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="hero" layout="escalamos-value">
      <div className="escalamos-hero-badge">
        <span>{site.hero.eyebrow}</span>
      </div>
      <h1 className="escalamos-hero-headline">{site.hero.headline}</h1>
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
