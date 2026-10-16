import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function NefiuProcess(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="process" layout="nefiu-steps">
      <h2 className="nefiu-section-title">{site.process.title}</h2>
      <ol className="nefiu-process-list">
        {site.process.steps.map((step, idx) => (
          <li key={step.id} className="nefiu-process-item">
            <span className="nefiu-process-step-num">
              0{idx + 1}
            </span>
            <div className="nefiu-process-step-body">
              <h3 className="nefiu-process-step-title">
                {step.title}
              </h3>
              <p className="nefiu-process-step-desc">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
