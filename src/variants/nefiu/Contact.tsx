import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { ContactForm } from '../../components/ContactForm';
import { ContactChannels } from '../../components/ContactChannels';

export function NefiuContact(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="contact" layout="nefiu-contact">
      <div className="nefiu-contact-info">
        <h2 className="nefiu-section-title">{site.contact.title}</h2>
        <p style={{ color: 'var(--c-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.5 }}>
          {site.contact.invitation}
        </p>
        <ContactChannels />
      </div>
      <div className="nefiu-contact-form-wrapper">
        <ContactForm />
      </div>
    </SectionShell>
  );
}
