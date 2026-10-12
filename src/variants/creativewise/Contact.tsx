import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { ContactForm } from '../../components/ContactForm';
import { ContactChannels } from '../../components/ContactChannels';

export function CreativewiseContact(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="contact" layout="creativewise-contact">
      <div className="creativewise-contact-info">
        <h2 className="creativewise-section-title">{site.contact.title}</h2>
        <p style={{ color: 'var(--c-muted)', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
          {site.contact.invitation}
        </p>
        <ContactChannels />
      </div>
      <div className="creativewise-contact-form">
        <ContactForm />
      </div>
    </SectionShell>
  );
}
