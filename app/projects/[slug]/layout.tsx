import { getProjects } from '@/lib/projects';

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((p) => ({
    slug: p.id,
  }));
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
