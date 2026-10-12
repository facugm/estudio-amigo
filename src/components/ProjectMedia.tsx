import { Project } from '../content/types';

export function ProjectMedia({
  project,
  className
}: {
  project: Project;
  className?: string;
}): JSX.Element {
  const { media } = project;

  if (media.kind === 'placeholder') {
    return (
      <div
        role="img"
        aria-label={`Imagen provisional: ${media.label}`}
        className={`project-media project-media--placeholder ${className ?? ''}`}
        style={{
          backgroundColor: `hsl(${media.hue} 35% 72%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#111111',
          padding: '1.5rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          fontWeight: 500
        }}
      >
        <span>{media.label}</span>
      </div>
    );
  }

  if (media.kind === 'image') {
    return (
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        className={`project-media project-media--image ${className ?? ''}`}
      />
    );
  }

  return (
    <video
      controls
      preload="none"
      poster={media.poster}
      aria-label={media.alt}
      className={`project-media project-media--video ${className ?? ''}`}
    >
      <source src={media.src} />
    </video>
  );
}
