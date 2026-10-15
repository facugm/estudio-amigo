import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function NefiuProcess(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="process" layout="nefiu-steps">
      <h2 className="nefiu-section-title">{site.process.title}</h2>
      <div className="nefiu-process-grid">
        {site.process.steps.map((step, idx) => (
          <div key={step.id} className="nefiu-process-card">
            <span className="nefiu-process-step-num">
              0{idx + 1}
            </span>
            <h3 className="nefiu-process-step-title">
              {step.title}
            </h3>
            <p className="nefiu-process-step-desc">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
