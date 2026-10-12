import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function OrillaServices(): JSX.Element {
  const { site, services } = useContent();

  const servicesTitle =
    site.nav.find(n => n.section === 'services')?.label ?? 'Servicios';

  return (
    <SectionShell section="services" layout="orilla-typographic">
      <h2 className="orilla-section-title">{servicesTitle}</h2>
      <ol className="orilla-services-list">
        {services.map(service => (
          <li key={service.id} className="orilla-service-item">
            <h3 className="orilla-service-title">{service.title}</h3>
            <p className="orilla-service-summary">{service.summary}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
