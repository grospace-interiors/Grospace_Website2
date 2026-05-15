import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ServicesExplore } from '@/components/services-explore'
import { ServiceCTA } from '@/components/service-cta'
import { TestimonialsSection } from '@/components/testimonials-section'
import { TrustStrip } from '@/components/trust-strip'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Grospace Interiors | Interior Design & Modular Solutions',
  description: 'Explore Grospace Interiors\' interior design services in Bhopal. From full home interiors to modular kitchens and luxury residences, we provide complete end-to-end solutions.',
}

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        <ServicesExplore />
        <TrustStrip />
        <TestimonialsSection />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
