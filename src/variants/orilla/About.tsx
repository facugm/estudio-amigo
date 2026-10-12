import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function OrillaAbout(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="about" layout="orilla-editorial" className="orilla-about">
      <div className="orilla-about-header">
        <h2 className="orilla-section-title">{site.about.title}</h2>
      </div>
      <div className="orilla-about-text">
        {site.about.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </SectionShell>
  );
}
