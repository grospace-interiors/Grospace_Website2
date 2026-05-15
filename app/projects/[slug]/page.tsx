import ProjectClientPage from './ProjectClientPage';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { getProxyImageUrl } from '@/lib/utils';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch the project profile
  const { data: project, error: projectError } = await supabase
    .from('project_profile_cards')
    .select('*')
    .eq('project_id', slug)
    .single();

  if (projectError || !project) {
    notFound();
  }

  // 2. Fetch the gallery images for this project
  const { data: images, error: imagesError } = await supabase
    .from('project_images')
    .select('image_path')
    .eq('project_id', slug)
    .order('sort_order', { ascending: true });

  const projectData = {
    id: project.project_id,
    title: project.title,
    description: project.description,
    images: images ? images.map(img => getProxyImageUrl(img.image_path)) : []
  };

  return <ProjectClientPage project={projectData} />;
}