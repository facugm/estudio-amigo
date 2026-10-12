export function ProvisionalTag({ className }: { className?: string }): JSX.Element {
  return (
    <span
      className={`provisional-tag ${className ?? ''}`}
      style={{
        display: 'inline-block',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '0.2rem 0.5rem',
        borderRadius: 'var(--radius, 4px)',
        backgroundColor: 'var(--c-surface, #f4f4f4)',
        color: 'var(--c-muted, #666666)',
        border: '1px solid var(--c-muted, #cccccc)'
      }}
    >
      Provisional
    </span>
  );
}
