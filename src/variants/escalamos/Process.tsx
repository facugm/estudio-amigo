import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function EscalamosProcess(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="process" layout="escalamos-timeline">
      <div className="escalamos-section-header">
        <h2 className="escalamos-section-title">{site.process.title}</h2>
        <p className="escalamos-section-desc">
          Metodología estructurada de diagnóstico, diseño, implementación y acompañamiento continuo.
        </p>
      </div>

      <div className="escalamos-timeline-grid">
        {site.process.steps.map((step, idx) => (
          <div key={step.id} className="escalamos-timeline-step">
            <span className="escalamos-step-indicator">0{idx + 1}</span>
            <h3 className="escalamos-step-title">{step.title}</h3>
            <p className="escalamos-step-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
