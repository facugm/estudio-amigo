export function ProvisionalTag({ className }: { className?: string }): JSX.Element {
  return (
    <span className={`provisional-tag ${className ?? ''}`.trim()}>
      Provisional
    </span>
  );
}
