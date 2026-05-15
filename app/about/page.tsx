import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AboutSection } from '@/components/about-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Grospace Interiors | Our Story & Design Philosophy',
  description: 'Learn about Grospace Interiors, an interior design and custom furniture studio. Our philosophy is rooted in material transparency, thoughtful design, and honest execution for Indian homes.',
}

export default function About() {
  return (
    <>
      <Navigation />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
