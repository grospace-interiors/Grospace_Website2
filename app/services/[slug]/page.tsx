import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { notFound } from 'next/navigation'
import { ServiceHero } from '@/components/service-hero'
import { ServiceInclusions } from '@/components/service-inclusions'
import { ServiceProcess } from '@/components/service-process'
import { ServiceMaterials } from '@/components/service-materials'
import { ServiceChallenges } from '@/components/service-challenges'
import { ServiceComparison } from '@/components/service-comparison'
import { ServiceCTA } from '@/components/service-cta'
import { FAQSection } from '@/components/faq-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ProjectsSection } from '@/components/projects-section'

const services = {
  'modular-interiors': {
    title: 'Modular Interiors',
    headline: 'Smart, Functional & Efficient Modular Solutions',
    description: 'Transform your home with our factory-finished modular solutions. From ergonomic kitchens to space-saving wardrobes, we bring precision and style to every corner.',
    image: 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=2000',
    inclusions: [
      'Modular Kitchen Systems',
      'Custom Wardrobes',
      'Ergonomic TV Units',
      'Pantry & Crockery Units',
      'Smart Storage Solutions',
      'Study & Workstations',
      'Vanity Units',
      'Shoe Racks'
    ]
  },
  'full-home-interiors': {
    title: 'Full Home Interiors',
    headline: 'End-to-End Home Transformation',
    description: 'Experience a complete home makeover where every detail is curated to reflect your personality. Our experts handle everything from design to final handover.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000',
    inclusions: [
      'Modular Kitchen & Wardrobes',
      'False Ceiling & Lighting',
      'Wall Treatments & Paint',
      'Custom Furniture & Decor',
      'Electrical & Plumbing',
      'Flooring & Tiling',
      'Soft Furnishings',
      'Home Automation'
    ]
  },
  'luxury-interiors': {
    title: 'Luxury Interiors',
    headline: 'Exquisite Designs for an Elite Lifestyle',
    description: 'Premium interiors that define sophistication. We combine rare materials, bespoke craftsmanship, and timeless aesthetics to create your dream luxury residence.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000',
    inclusions: [
      'Bespoke Italian Kitchens',
      'Walk-in Closets',
      'Rare Stone & Marble Work',
      'Designer Wall Paneling',
      'Automated Lighting Design',
      'Acoustic Home Theatres',
      'Custom Sculpture & Art',
      'Concierge Project Management'
    ]
  },
  'renovations': {
    title: 'Home Renovations',
    headline: 'Breathe New Life into Your Existing Space',
    description: 'Update and upgrade your home without the hassle. Our renovation experts specialize in modernizing layouts, improving functionality, and refreshing aesthetics.',
    image: 'https://images.unsplash.com/photo-1581850518616-cee8107f7fa2?q=80&w=2000',
    inclusions: [
      'Space Remodeling',
      'Structural Enhancements',
      'Modern Kitchen Upgrades',
      'Bathroom Refurbishment',
      'Electrical & Plumbing Overhaul',
      'Fresh Paint & Wall Finishes',
      'Flooring Replacement',
      'Balcony Transformations'
    ]
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services[slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main className="bg-white">
        <ServiceHero 
          title={service.title}
          subtitle={service.headline}
          image={service.image}
        />
        
        <ServiceInclusions 
          title={service.title}
          items={service.inclusions}
        />

        <ServiceProcess />

        <ServiceMaterials />

        <ServiceChallenges />

        <ProjectsSection />

        <ServiceComparison />

        <TestimonialsSection />

        <FAQSection />

        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
