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

const services = {
  'modular-interiors': {
    title: 'Modular Interiors',
    headline: 'Smart, Functional & Efficient Modular Solutions',
    description: 'Transform your home with our factory-finished modular solutions. From ergonomic kitchens to space-saving wardrobes, we bring precision and style to every corner.',
    image: '/images/modular-interiors-hero.jpg',
    inclusions: [
      'Modular Kitchen Systems',
      'Custom Wardrobes',
      'Ergonomic TV Units',
      'Pantry & Crockery Units',
      'Smart Storage Solutions',
      'Study & Workstations',
      'Vanity Units',
      'Shoe Racks'
    ],
    process: [
      { title: "Consultation", description: "Understanding your space and lifestyle requirements." },
      { title: "Space Planning", description: "Optimizing layouts for maximum functionality and flow." },
      { title: "Modular Design Selection", description: "Choosing from our curated range of modular configurations." },
      { title: "Factory Manufacturing", description: "Precision crafting using advanced European machinery." },
      { title: "Quality Check", description: "Rigorous inspection of every component before dispatch." },
      { title: "45-Day Installation", description: "Swift on-site assembly with zero mess and total precision." }
    ],
    materials: [
      { name: "HDHMR", properties: ["High Density", "Water Resistant"], description: "Ideal for kitchens and bathrooms, offering superior durability." },
      { name: "BWR Plywood", properties: ["Boiling Water Resistant", "Termite Proof"], description: "Premium core material for long-lasting modular cabinets." },
      { name: "Acrylic Finishes", properties: ["High Gloss", "Scratch Resistant"], description: "A mirror-like reflective finish for a sleek, modern aesthetic." },
      { name: "Laminates", properties: ["Durable", "Textured Options"], description: "Versatile and easy-to-maintain finishes for everyday use." }
    ],
    challenges: [
      { icon: "clock", challenge: "Delayed Timelines", solution: "Our factory-first approach ensures strict adherence to our 45-day delivery promise." },
      { icon: "sparkles", challenge: "Dust & On-site Mess", solution: "90% of work happens at the factory; we only do clean assembly at your home." },
      { icon: "layout", challenge: "Poor Space Utilization", solution: "Smart modular engineering designed to utilize every inch of your urban home." },
      { icon: "shield", challenge: "Maintenance Issues", solution: "Industrial-grade edge banding and precision finishes make cleaning effortless." }
    ],
    comparisons: [
      { traditional: "Inconsistent manual finish", grospace: "Precision factory finish" },
      { traditional: "Unpredictable delivery dates", grospace: "Guaranteed 45-day delivery" },
      { traditional: "On-site carpentry mess", grospace: "Swift, clean installation" },
      { traditional: "Limited storage engineering", grospace: "Optimized modular storage" },
      { traditional: "No structured warranty", grospace: "Comprehensive service warranty" }
    ]
  },
  'full-home-interiors': {
    title: 'Full Home Interiors',
    headline: 'End-to-End Home Transformation',
    description: 'Experience a complete home makeover where every detail is curated to reflect your personality. Our experts handle everything from design to final handover.',
    image: '/images/full home interior.jpg',
    inclusions: [
      'Modular Kitchen & Wardrobes',
      'False Ceiling & Lighting',
      'Wall Treatments & Paint',
      'Custom Furniture & Decor',
      'Electrical & Plumbing',
      'Flooring & Tiling',
      'Soft Furnishings',
      'Home Automation'
    ],
    process: [
      { title: "Design Consultation", description: "Deep dive into your family's lifestyle and aesthetic preferences." },
      { title: "3D Visualization", description: "Realistic previews of your entire home before we start." },
      { title: "Civil & Electrical Coordination", description: "Handling structural changes and wiring seamlessly." },
      { title: "False Ceiling & Lighting", description: "Creating ambiance with professional lighting design." },
      { title: "Furniture Installation", description: "Coordinated assembly of all modular and custom units." },
      { title: "Final Styling & Handover", description: "The finishing touches that make your house a home." }
    ],
    materials: [
      { name: "Premium Plywood", properties: ["BWR/BWP Grades", "Structural Strength"], description: "Foundation for all custom and modular woodwork." },
      { name: "Wall Textures & Paint", properties: ["Designer Finishes", "Eco-friendly"], description: "Curated palettes from leading brands for a premium feel." },
      { name: "Designer Lighting", properties: ["Ambient", "Task", "Accent"], description: "Integrated lighting systems for every mood and function." },
      { name: "Modular Components", properties: ["Precision Made", "High-end Hardware"], description: "Blending factory modularity with site-specific needs." }
    ],
    challenges: [
      { icon: "layers", challenge: "Managing Multiple Vendors", solution: "A single point of contact for everything from civil work to final decor." },
      { icon: "zap", challenge: "Coordination Delays", solution: "Integrated project management ensures all teams work in perfect sync." },
      { icon: "palette", challenge: "Design Inconsistency", solution: "Unified design language across all rooms for a cohesive home experience." },
      { icon: "shieldCheck", challenge: "Budget Overruns", solution: "Detailed itemized estimates with locked-in pricing before execution." }
    ],
    comparisons: [
      { traditional: "Hiring separate contractors", grospace: "Unified turnkey execution" },
      { traditional: "Frequent design mismatches", grospace: "Cohesive aesthetic planning" },
      { traditional: "Managing site daily", grospace: "Professional project management" },
      { traditional: "Unclear final costs", grospace: "Transparent, itemized pricing" },
      { traditional: "Multiple warranty points", grospace: "Single-window service support" }
    ]
  },
  'luxury-interiors': {
    title: 'Luxury Interiors',
    headline: 'Signature Designs for an Elite Lifestyle',
    description: 'Bespoke interiors that define sophistication. We combine exquisite design, premium finishes, and timeless aesthetics to create your dream luxury residence.',
    image: '/images/luxary interion.jpg',
    inclusions: [
      'Signature Living Room Design',
      'Master Suites & Walk-in Closets',
      'Premium Modular Kitchens',
      'Custom Wall Art & Paneling',
      'Automated Lighting Design',
      'Designer False Ceilings',
      'Bespoke Accent Furniture',
      'Premium Flooring Solutions'
    ],
    process: [
      { title: "Private Consultation", description: "Exclusively tailored sessions to capture your vision of luxury." },
      { title: "Concept Development", description: "Creating a unique design language for your signature space." },
      { title: "Bespoke Detailing", description: "Meticulous design of custom elements and intricate finishes." },
      { title: "Premium Finish Selection", description: "Choosing from a curated library of high-end textures and tones." },
      { title: "Artisan Craftsmanship", description: "Exquisite execution by our most skilled finishing teams." },
      { title: "White-Glove Handover", description: "A seamless, premium experience from first meeting to final reveal." }
    ],
    materials: [
      { name: "Premium Finishes", properties: ["PU / Glass / High-End Veneers"], description: "Exquisite surface treatments for a sophisticated visual depth." },
      { name: "Signature Paneling", properties: ["Fluted / Upholstered / Metallic"], description: "Statement wall treatments that define the luxury character." },
      { name: "Designer Hardware", properties: ["Blum / High-end Series"], description: "The silent luxury of effortless, smooth-operating systems." },
      { name: "Ambient Lighting", properties: ["Smart Control", "Custom Fixtures"], description: "Intelligent lighting that enhances textures and sets the mood." }
    ],
    challenges: [
      { icon: "diamond", challenge: "Generic Template Designs", solution: "100% bespoke design approach where no two luxury homes are alike." },
      { icon: "penTool", challenge: "Lack of Fine Detailing", solution: "Obsessive focus on joinery, edge finishing, and material transitions." },
      { icon: "star", challenge: "Average Finish Quality", solution: "Utilizing advanced finishing techniques for a perfectly smooth, rich feel." },
      { icon: "heart", challenge: "Inexperienced Teams", solution: "Execution led by our 'Elite Squad' of veteran interior professionals." }
    ],
    comparisons: [
      { traditional: "Standard market designs", grospace: "One-of-a-kind signature spaces" },
      { traditional: "Visible joints & rough edges", grospace: "Flawless, seamless craftsmanship" },
      { traditional: "Basic off-the-shelf finishes", grospace: "Exclusive premium textures" },
      { traditional: "Standard execution speed", grospace: "White-glove, personalized service" },
      { traditional: "General project handling", grospace: "Dedicated elite management" }
    ]
  },
  'renovations': {
    title: 'Home Renovations',
    headline: 'Breathe New Life into Your Existing Space',
    description: 'Update and upgrade your home without the hassle. Our renovation experts specialize in modernizing layouts, improving functionality, and refreshing aesthetics.',
    image: '/images/renovation.jpg',
    inclusions: [
      'Space Remodeling',
      'Structural Enhancements',
      'Modern Kitchen Upgrades',
      'Bathroom Refurbishment',
      'Electrical & Plumbing Overhaul',
      'Fresh Paint & Wall Finishes',
      'Flooring Replacement',
      'Balcony Transformations'
    ],
    process: [
      { title: "Structural Audit", description: "Assessing the current state and identifying improvement areas." },
      { title: "Modernization Plan", description: "Designing layout changes for better flow and space." },
      { title: "Hassle-free Execution", description: "Phased work to minimize disruption to your daily life." },
      { title: "Quality Upgrades", description: "Replacing old materials with modern, durable alternatives." }
    ],
    materials: [
      { name: "HDHMR & Plywood", properties: ["Moisture Proof", "Strong"], description: "Replacing aging woodwork with industrial-grade materials." },
      { name: "Modern Hardware", properties: ["Soft-close", "Anti-rust"], description: "Upgrading hinges and sliders for a contemporary feel." },
      { name: "Premium Paint", properties: ["Washable", "Low VOC"], description: "Refreshing walls with high-durability, beautiful finishes." }
    ],
    challenges: [
      { icon: "clock", challenge: "Unpredictable Issues", solution: "Experienced renovation teams that can handle hidden site surprises." },
      { icon: "sparkles", challenge: "Dust Management", solution: "Strict site protection protocols to keep the rest of your home clean." }
    ],
    comparisons: [
      { traditional: "Messy, unplanned patches", grospace: "Structured, holistic upgrade" },
      { traditional: "Hidden cost surprises", grospace: "Clear, upfront renovation scope" }
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

        <ServiceTrustStrip />
        
        <ServiceInclusions 
          title={service.title}
          items={service.inclusions}
        />

        <ServiceProcess 
          title={slug === 'modular-interiors' ? "Precision Workflow" : "Transformation Journey"}
          steps={service.process} 
        />

        <ServiceMaterials 
          materials={service.materials}
        />

        <ServiceChallenges 
          challenges={service.challenges}
        />

        <ProjectsSection />

        <ServiceComparison 
          comparisons={service.comparisons}
        />

        <TestimonialsSection />

        <FAQSection />

        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
