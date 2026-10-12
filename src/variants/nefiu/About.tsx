import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function NefiuAbout(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="about" layout="nefiu-about">
      <div className="nefiu-about-card">
        <h2 className="nefiu-section-title">{site.about.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--c-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          {site.about.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
