import { createContext, useContext, ReactNode } from 'react';
import { SiteContent, Service, Project, ServiceId } from './types';
import { siteContent } from './site';
import { services } from './services';
import { projects } from './projects';

export interface ContentBundle {
  site: SiteContent;
  services: readonly Service[];
  projects: readonly Project[];
}

export const defaultContent: ContentBundle = {
  site: siteContent,
  services,
  projects
};

const ContentContext = createContext<ContentBundle | null>(null);

export function ContentProvider({
  content,
  children
}: {
  content?: ContentBundle;
  children: ReactNode;
}): JSX.Element {
  const value = content ?? defaultContent;
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentBundle {
  const context = useContext(ContentContext);
  return context ?? defaultContent;
}

export function findService(bundle: ContentBundle, id: ServiceId): Service | undefined {
  return bundle.services.find(s => s.id === id);
}
