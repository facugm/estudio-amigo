import { useEffect } from 'react';
import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function OrillaHero(): JSX.Element {
  const { site } = useContent();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth <= 860) return;
      const main = document.getElementById('main') || document.querySelector('.app-main');
      if (!main) return;

      if (e.deltaY !== 0) {
        e.preventDefault();
        main.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

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
        <div className="orilla-scroll-hint" aria-hidden="true">
          <span>← Deslizá horizontalmente para explorar →</span>
        </div>
      </div>
    </SectionShell>
  );
}
