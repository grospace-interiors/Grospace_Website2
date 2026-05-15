import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data: projects } = await supabase
    .from('project_profile_cards')
    .select('project_id');

  if (!projects) return [];

  return projects.map((p) => ({
    slug: p.project_id,
  }));
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
