import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ProjectsPageClient } from './projects-page-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Portfolio | Grospace Interiors | Premium Interior Projects in Bhopal',
  description: 'Explore Grospace Interiors\' selected interior design projects. From minimalist apartments to luxury villas in Bhopal, see our thoughtfully crafted homes.',
}

export default function Projects() {
  return (
    <>
      <Navigation />
      <ProjectsPageClient />
      <Footer />
    </>
  )
}
