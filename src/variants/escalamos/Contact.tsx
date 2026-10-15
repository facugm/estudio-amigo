import { useContent } from '../../content/ContentProvider';
import { SectionShell } from '../../components/SectionShell';
import { ContactForm } from '../../components/ContactForm';
import { ContactChannels } from '../../components/ContactChannels';

export function EscalamosContact(): JSX.Element {
  const { site } = useContent();

  return (
    <SectionShell section="contact" layout="escalamos-contact">
      <div className="escalamos-contact-info">
        <h2 className="escalamos-section-title">{site.contact.title}</h2>
        <p className="escalamos-contact-invitation">
          {site.contact.invitation}
        </p>
        <ContactChannels />
      </div>
      <div className="escalamos-contact-form-area">
        <ContactForm />
      </div>
    </SectionShell>
  );
}
