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
        <p className="nefiu-contact-invitation">
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
