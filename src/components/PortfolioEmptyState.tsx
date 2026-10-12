export function PortfolioEmptyState({ className }: { className?: string }): JSX.Element {
  return (
    <div role="status" className={`portfolio-empty-state ${className ?? ''}`}>
      <p>Todavía no hay proyectos cargados.</p>
    </div>
  );
}
