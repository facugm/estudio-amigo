import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function OrillaProcess(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="process" layout="orilla-steps">
      <h2 className="orilla-section-title">{site.process.title}</h2>
      <div className="orilla-steps-grid">
        {site.process.steps.map((step, idx) => (
          <div key={step.id} className="orilla-step-card">
            <span className="orilla-step-num">0{idx + 1}</span>
            <h3 className="orilla-step-title">{step.title}</h3>
            <p className="orilla-step-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
