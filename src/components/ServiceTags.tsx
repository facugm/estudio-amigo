import { ServiceId } from '../content/types';
import { useContent, findService } from '../content/ContentProvider';

export function ServiceTags({
  serviceIds,
  className
}: {
  serviceIds: readonly ServiceId[];
  className?: string;
}): JSX.Element {
  const content = useContent();

  const services = serviceIds
    .map(id => findService(content, id))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <ul className={`tag-list ${className ?? ''}`}>
      {services.map(service => (
        <li key={service.id} className="tag-item">
          {service.title}
        </li>
      ))}
    </ul>
  );
}
