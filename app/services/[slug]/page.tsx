import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { notFound } from 'next/navigation'
import { ServiceHero } from '@/components/service-hero'
import { ServiceTrustStrip } from '@/components/service-trust-strip'
import { ServiceInclusions } from '@/components/service-inclusions'
import { ServiceProcess } from '@/components/service-process'
import { ServiceMaterials } from '@/components/service-materials'
import { ServiceChallenges } from '@/components/service-challenges'
import { ServiceComparison } from '@/components/service-comparison'
import { ServiceCTA } from '@/components/service-cta'
import { FAQSection } from '@/components/faq-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ProjectsSection } from '@/components/projects-section'
import Image from 'next/image'
import { CheckCircle2, ShieldCheck, Heart, Sparkles, Layout, Zap, Clock, Diamond, Star, Award, PenTool } from 'lucide-react'

const services = {
  'full-home-interiors': {
    title: 'Full Home Interiors',
    headline: 'Complete Home Interiors Designed Around Your Lifestyle',
    description: 'A complete home transformation experience focused on comfort, functionality, and coordinated aesthetics. We handle every detail, from design to final handover.',
    image: '/images/full home interior.jpg',
    inclusions: [
      { title: 'Living Room', desc: 'Heart of the home with custom TV units and curated lighting.' },
      { title: 'Bedrooms', desc: 'Personalized sanctuaries with bespoke wardrobes and beds.' },
      { title: 'Modular Kitchen', desc: 'Ergonomic designs with world-class smart storage.' },
      { title: 'Dining Areas', desc: 'Coordinated spaces for shared meals and memories.' },
      { title: 'Study & Work', desc: 'Quiet, functional corners for productivity.' },
      { title: 'Storage Solutions', desc: 'Hidden and smart storage that grows with you.' }
    ],
    process: [
      { title: "Coordination & Planning", description: "Deep dive into your family's lifestyle to create a cohesive home-wide plan." },
      { title: "Design Language", description: "Choosing unified colors, textures, and themes for every room." },
      { title: "Complete Project Management", description: "Handling all civil, electrical, and interior work seamlessly." },
      { title: "Hassle-free Execution", description: "Transparent updates and dedicated leads for your entire project." },
      { title: "Final Styling", description: "The finishing touches that bring your entire vision together." }
    ],
    extraSection: {
      title: "Designed As One Complete Experience",
      content: "We believe a home should feel cohesive. From the foyer to the balcony, our design language ensures every space flows into the next, balancing coordinated finishes with personalized functionality.",
      items: [
        { icon: Layout, title: "Consistent Aesthetics", desc: "Unified design language across all rooms." },
        { icon: ShieldCheck, title: "Coordinated Execution", desc: "All vendors managed under a single point of contact." },
        { icon: Heart, title: "Balanced Comfort", desc: "Spaces that grow with your family's needs." }
      ]
    }
  },
  'modular-interiors': {
    title: 'Modular Interiors',
    headline: 'Modern Modular Interiors Built For Everyday Functionality',
    description: 'Smart, efficient storage and organized living systems. Precision-engineered modular solutions for the modern Indian household.',
    image: '/images/modular-interiors-hero.jpg',
    inclusions: [
      { title: 'Smart Kitchens', desc: 'High-performance layouts with European hardware.' },
      { title: 'Efficient Wardrobes', desc: 'Maximized internal organization and sleek finishes.' },
      { title: 'Storage Intelligence', desc: 'Corner units, pantry systems, and hidden drawers.' },
      { title: 'Modern TV Units', desc: 'Clean aesthetics with integrated cable management.' }
    ],
    process: [
      { title: "Smart Assessment", description: "Understanding your storage needs and space constraints." },
      { title: "Modular Planning", description: "Creating layouts using standard and custom modular units." },
      { title: "Precision Manufacturing", description: "Factory-finished components with zero on-site mess." },
      { title: "Fast Installation", description: "Quick, clean, and millimeter-perfect assembly." }
    ],
    extraSection: {
      title: "Why Modular Interiors Work Better",
      content: "Modular systems are the backbone of modern efficient homes. They offer precision that manual carpentry cannot match, combined with speed and long-term durability.",
      items: [
        { icon: Zap, title: "Faster Delivery", desc: "90% of manufacturing happens off-site." },
        { icon: CheckCircle2, title: "Millimeter Precision", desc: "Factory machine-cutting ensures perfect alignment." },
        { icon: Clock, title: "Maintenance Friendly", desc: "Easy to clean and upgrade in the future." }
      ]
    },
    materials: [
      { name: "Premium Finishes", properties: ["Acrylic", "Laminate", "PU"], description: "A range of durable and easy-to-maintain surface options." },
      { name: "Soft-Close Hardware", properties: ["World-class series"], description: "Smooth, silent operations for drawers and shutters." },
      { name: "Durable Core", properties: ["BWR/BWP Grade"], description: "Moisture-resistant materials built to last a lifetime." }
    ]
  },
  'luxury-interiors': {
    title: 'Luxury Interiors',
    headline: 'Luxury Interiors Designed With Timeless Elegance',
    description: 'A bespoke experience where refinement meets personalization. We combine signature design philosophy with white-glove service for elite residences.',
    image: '/images/luxary interion.jpg',
    inclusions: [
      { title: 'Signature Living', desc: 'Spacious, editorial-grade designs with premium lighting.' },
      { title: 'Master Suites', desc: 'Elegant textures and walk-in closets for refined living.' },
      { title: 'Bespoke Detailing', desc: 'One-of-a-kind concepts tailored to your personal aesthetic.' }
    ],
    process: [
      { title: "Curated Design Consultation", description: "Exclusive sessions to define your signature luxury language." },
      { title: "Personalized Detailing", description: "Meticulous design of textures, lighting, and transitions." },
      { title: "White-Glove Delivery", description: "A slow, refined execution process focused on perfection." }
    ],
    extraSection: {
      title: "The Luxury Experience",
      content: "Luxury is not about more features; it's about spatial calm, refined aesthetics, and absolute personalization. Our design philosophy focuses on balance, lighting, and textures that stand the test of time.",
      items: [
        { icon: Diamond, title: "Refined Detailing", desc: "Obsessive focus on material transitions and joinery." },
        { icon: Star, title: "Personalized Aesthetics", desc: "Every home is a unique reflection of its owner." },
        { icon: Award, title: "Timeless Philosophy", desc: "Designs that transcend temporary trends." }
      ]
    }
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

        {/* 1. Editorial Introduction */}
        <section className="py-24 lg:py-40 border-b border-zinc-50">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="max-w-3xl space-y-12">
                 <span className="text-[#ee6669] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Our Approach</span>
                 <h2 className="text-4xl lg:text-7xl font-serif font-light text-[#2d1b4e] leading-tight tracking-tight">
                    {service.description.split('.')[0]}.
                 </h2>
                 <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                    {service.description.split('.').slice(1).join('.')}
                 </p>
              </div>
           </div>
        </section>

        {/* 2. Page Specific Extra Section */}
        {service.extraSection && (
          <section className="py-24 lg:py-40 bg-zinc-50 relative overflow-hidden">
             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-12">
                      <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] leading-tight">
                         {service.extraSection.title}
                      </h3>
                      <p className="text-xl text-zinc-500 font-light leading-relaxed">
                         {service.extraSection.content}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-8 pt-8">
                         {service.extraSection.items.map((item, idx) => (
                           <div key={idx} className="space-y-4">
                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                 <item.icon className="w-5 h-5 text-[#ee6669]" />
                              </div>
                              <h4 className="font-bold uppercase tracking-widest text-[11px] text-[#2d1b4e]">{item.title}</h4>
                              <p className="text-sm text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                      <Image 
                        src={service.image} 
                        alt={service.extraSection.title} 
                        fill 
                        className="object-cover"
                      />
                   </div>
                </div>
             </div>
          </section>
        )}

        <ServiceInclusions 
          title={service.title}
          items={service.inclusions}
        />

        <ServiceProcess 
          title={slug === 'luxury-interiors' ? "The Journey" : "Transformation Path"}
          steps={service.process} 
        />

        {/* 3. Materials Section (Only if present and not luxury) */}
        {service.materials && slug !== 'luxury-interiors' && (
           <ServiceMaterials materials={service.materials} />
        )}

        {/* 4. Portfolio Showcase */}
        <ProjectsSection />

        {/* 5. Advantage Comparison (Omitted for Luxury) */}
        {slug !== 'luxury-interiors' && (
          <ServiceComparison />
        )}

        <TestimonialsSection />

        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
