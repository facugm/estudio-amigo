import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function CreativewiseProcess(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="process" layout="creativewise-steps">
      <h2 className="creativewise-section-title">{site.process.title}</h2>
      <div className="creativewise-steps-grid">
        {site.process.steps.map((step, idx) => (
          <div key={step.id} className="creativewise-step-card">
            <span className="creativewise-step-num">0{idx + 1}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--c-fg)' }}>
              {step.title}
            </h3>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.95rem', lineHeight: 1.55 }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
