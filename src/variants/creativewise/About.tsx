import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function CreativewiseAbout(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="about" layout="creativewise-about">
      <div className="creativewise-about-box">
        <h2 className="creativewise-section-title">{site.about.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--c-muted)', fontSize: '1.15rem', lineHeight: 1.65, marginTop: '1.5rem' }}>
          {site.about.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
