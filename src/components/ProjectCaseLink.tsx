import { Project } from '../content/types';

export function ProjectCaseLink({
  project,
  label = 'Ver caso',
  className
}: {
  project: Project;
  label?: string;
  className?: string;
}): JSX.Element | null {
  if (!project.caseUrl) {
    return null;
  }

  const isExternal =
    project.caseUrl.startsWith('http://') || project.caseUrl.startsWith('https://');

  return (
    <a
      href={project.caseUrl}
      className={`project-case-link ${className ?? ''}`}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  );
}
