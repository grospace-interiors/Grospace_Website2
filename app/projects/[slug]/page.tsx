import ProjectClientPage from './ProjectClientPage';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch the project using centralized logic
  const project = await getProjectById(slug);

  if (!project) {
    notFound();
  }

  const projectData = {
    id: project.id,
    title: project.title,
    description: project.description,
    images: project.images || []
  };

  return <ProjectClientPage project={projectData} />;
}