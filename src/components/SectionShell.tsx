import { ReactNode } from 'react';
import { SectionId, SECTION_ANCHORS } from '../variants/types';

export function SectionShell({
  section,
  layout,
  labelledBy,
  className,
  children
}: {
  section: SectionId;
  layout: string;
  labelledBy?: string;
  className?: string;
  children?: ReactNode;
}): JSX.Element {
  return (
    <section
      id={SECTION_ANCHORS[section]}
      data-section={section}
      data-layout={layout}
      aria-labelledby={labelledBy}
      className={className}
    >
      {children}
    </section>
  );
}
