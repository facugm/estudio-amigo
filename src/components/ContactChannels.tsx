import { useContent } from '../content/ContentProvider';

export function ContactChannels({ className }: { className?: string }): JSX.Element {
  const { site } = useContent();

  return (
    <ul className={`contact-channels ${className ?? ''}`}>
      {site.contact.channels.map(channel => (
        <li key={channel.id} className="contact-channel-item">
          {channel.href ? (
            <a href={channel.href} className="contact-channel-link">
              {channel.label}
            </a>
          ) : (
            <span className="contact-channel-placeholder">
              {channel.label} (a definir)
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
