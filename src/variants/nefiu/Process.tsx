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
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'var(--c-accent)',
                marginBottom: '0.75rem'
              }}
            >
              0{idx + 1}
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {step.title}
            </h3>
            <p style={{ color: 'var(--c-muted)', lineHeight: 1.5, fontSize: '0.95rem' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
