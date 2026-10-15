import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function EscalamosAbout(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="about" layout="escalamos-about">
      <div className="escalamos-about-card">
        <h2 className="escalamos-section-title">{site.about.title}</h2>
        <div className="escalamos-about-paragraphs">
          {site.about.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
