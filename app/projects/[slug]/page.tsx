import ProjectClientPage from './ProjectClientPage';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectById(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Grospace Interiors',
    };
  }

  return {
    title: `${project.title} | Interior Design Project by Grospace Interiors`,
    description: project.description || `Explore our ${project.style_type || ''} ${project.category || 'interior design'} project in ${project.location || 'Bhopal'}. Custom crafted by Grospace Interiors.`,
    openGraph: {
      title: project.title,
      description: project.description || undefined,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch the project using centralized logic
  const project = await getProjectById(slug);

  if (!project) {
    notFound();
  }

  const projectData = {
    id: project.id,
    title: project.title,
    description: project.description || null,
    images: project.images || []
  };

  return <ProjectClientPage project={projectData} />;
}