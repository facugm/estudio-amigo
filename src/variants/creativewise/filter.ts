import { Project } from '../../content/types';

export function projectCategories(projects: readonly Project[]): string[] {
  const cats: string[] = [];
  for (const p of projects) {
    if (p.category && !cats.includes(p.category)) {
      cats.push(p.category);
    }
  }
  return cats;
}

export function filterProjects(
  projects: readonly Project[],
  category: string | null
): Project[] {
  if (!category || category === 'all' || category === 'Todas' || category === 'Todos') {
    return [...projects];
  }
  return projects.filter(p => p.category === category);
}
