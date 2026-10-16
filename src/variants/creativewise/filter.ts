import { Project, Service, ServiceId } from '../../content/types';

export function serviceFilters(
  projects: readonly Project[],
  services: readonly Service[]
): Service[] {
  const used = new Set(projects.flatMap(p => p.services));
  return services.filter(s => used.has(s.id));
}

export function filterByService(
  projects: readonly Project[],
  serviceId: ServiceId | null
): Project[] {
  if (!serviceId) {
    return [...projects];
  }
  return projects.filter(p => p.services.includes(serviceId));
}
