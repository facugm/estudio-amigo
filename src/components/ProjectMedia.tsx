import { useState } from 'react';
import { Project } from '../content/types';
import { Isotype } from '../brand/Isotype';

export function ProjectMedia({
  project,
  className
}: {
  project: Project;
  className?: string;
}): JSX.Element {
  const { media } = project;
  const [hasError, setHasError] = useState(false);

  if (hasError || media.kind === 'placeholder') {
    const label = media.kind === 'placeholder' ? media.label : (media.alt || project.name);
    return (
      <div
        role="img"
        aria-label={`Imagen provisional: ${label}`}
        className={`project-media project-media--placeholder ${className ?? ''}`.trim()}
      >
        <Isotype className="project-media-isotype" />
        <span className="project-media-placeholder-label">{label}</span>
      </div>
    );
  }

  if (media.kind === 'image') {
    return (
      <img
        src={media.src}
        alt={media.alt}
        width={1200}
        height={900}
        loading="lazy"
        onError={() => setHasError(true)}
        className={`project-media project-media--image ${className ?? ''}`.trim()}
      />
    );
  }

  return (
    <video
      controls
      preload="none"
      poster={media.poster}
      aria-label={media.alt}
      className={`project-media project-media--video ${className ?? ''}`.trim()}
    >
      <source src={media.src} />
    </video>
  );
}
