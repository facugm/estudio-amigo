import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';

export function CreativewiseServices(): JSX.Element {
  const { services, site } = useContent();

  const servicesTitle = site.nav.find(n => n.section === 'services')?.label ?? 'Servicios';

  return (
    <SectionShell section="services" layout="creativewise-index">
      <h2 className="creativewise-section-title">{servicesTitle}</h2>
      <div className="creativewise-services-list">
        {services.map((service, idx) => (
          <div key={service.id} className="creativewise-service-item">
            <span className="creativewise-service-num">
              0{idx + 1}
            </span>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
