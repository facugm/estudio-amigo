import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { ContactForm } from '../../components/ContactForm';
import { ContactChannels } from '../../components/ContactChannels';

export function OrillaContact(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="contact" layout="orilla-contact">
      <div className="orilla-contact-info">
        <h2 className="orilla-section-title">{site.contact.title}</h2>
        <p className="orilla-contact-invitation">{site.contact.invitation}</p>
        <ContactChannels className="orilla-contact-channels" />
      </div>
      <div className="orilla-contact-form-area">
        <ContactForm className="orilla-form" />
      </div>
    </SectionShell>
  );
}
