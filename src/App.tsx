import { ContentBundle, ContentProvider } from './content/ContentProvider';
import { VariantId } from './variants/types';
import { VariantProvider, useVariant } from './variants/VariantProvider';
import { ContactFormProvider } from './components/ContactFormProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export interface AppProps {
  content?: ContentBundle;
  initialVariantId?: VariantId;
  storage?: Pick<Storage, 'getItem' | 'setItem'> | null;
}

function AppInner(): JSX.Element {
  const { variant } = useVariant();

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        {variant.sectionOrder.map(section => {
          const SectionComponent = variant.sections[section];
          return <SectionComponent key={section} />;
        })}
      </main>
      <Footer />
    </div>
  );
}

export function App({
  content,
  initialVariantId,
  storage
}: AppProps = {}): JSX.Element {
  return (
    <ContentProvider content={content}>
      <VariantProvider initialId={initialVariantId} storage={storage}>
        <ContactFormProvider>
          <AppInner />
        </ContactFormProvider>
      </VariantProvider>
    </ContentProvider>
  );
}
