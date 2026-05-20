import { Card } from '@/components/ui/card'
import { Layout, Maximize, Home, Layers, Box, Tv } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: 'Full Home Interiors',
      description: 'Complete end-to-end design and execution for your 2BHK or 3BHK home.',
    },
    {
      icon: Box,
      title: 'Modular Kitchen',
      description: 'Smart, efficient, and modern kitchen solutions tailored to your space.',
    },
    {
      icon: Layers,
      title: 'Wardrobes & Storage',
      description: 'Custom-designed wardrobes that maximize space and style.',
    },
    {
      icon: Tv,
      title: 'TV Units',
      description: 'Contemporary TV units that serve as the focal point of your living room.',
    },
    {
      icon: Maximize,
      title: 'False Ceiling',
      description: 'Elegant ceiling designs with integrated lighting solutions.',
    },
    {
      icon: Layout,
      title: 'Space Planning',
      description: 'Strategic layouts to make the most of every square foot in your home.',
    },
  ]

  return (
    <section id="services" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#222222]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-primary uppercase tracking-widest text-xs font-medium mb-4">Our Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#222222] text-balance">
            Our Core Services
          </h2>
          <div className="mt-6 w-16 h-0.5 bg-primary" />
          <p className="mt-8 text-lg text-zinc-600 max-w-2xl leading-relaxed">
            We specialize in designing complete 2BHK and 3BHK homes with smart space utilization and premium finishes in Bhopal.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="p-10 bg-white border border-zinc-100 hover:border-primary/20 transition-all duration-500 hover:shadow-xl text-[#222222] group rounded-3xl"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-serif font-light group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 leading-relaxed font-light text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
