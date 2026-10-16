import { VariantSwitcher } from './VariantSwitcher';

export function VariantDock(): JSX.Element {
  return (
    <aside className="variant-dock" aria-label="Propuesta de diseño">
      <VariantSwitcher />
    </aside>
  );
}
