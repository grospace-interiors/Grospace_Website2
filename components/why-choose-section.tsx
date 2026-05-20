'use client'

import { 
  CreditCard, 
  Palette, 
  Settings, 
  Layers, 
  MapPin, 
  Maximize 
} from 'lucide-react'

export function WhyGrospaceInteriors() {
  const reasons = [
    {
      title: 'Transparent Pricing',
      description: 'Know what you are paying for with clearly structured packages.',
      icon: CreditCard
    },
    {
      title: 'Customized Designs',
      description: 'Every home is designed according to your lifestyle and space.',
      icon: Palette
    },
    {
      title: 'Complete Execution',
      description: 'From design to installation — we manage everything.',
      icon: Settings
    },
    {
      title: 'Modern Materials',
      description: 'Premium plywood, laminates and hardware built for durability.',
      icon: Layers
    },
    {
      title: 'Local Support',
      description: 'Easy site visits and support across Bhopal.',
      icon: MapPin
    },
    {
      title: 'Space Optimization',
      description: 'Smart storage solutions for modern homes.',
      icon: Maximize
    }
  ]

  return (
    <section className="w-full overflow-hidden bg-[#fdfdfd] py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-12 space-y-4 text-center sm:mb-16">
          <h2 className="text-3xl font-serif font-light leading-tight tracking-tight text-[#2d1b4e] sm:text-4xl lg:text-5xl">
            Why Homeowners Choose <br/>
            <span className="text-[#ee6669]">Grospace Interiors</span>
          </h2>
          <div className="w-24 h-1 bg-[#ee6669] mx-auto" />
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="group min-w-[84%] snap-center rounded-3xl border border-zinc-100 bg-white p-6 transition-all duration-500 hover:border-[#ee6669]/20 hover:shadow-2xl md:min-w-0 sm:p-8 sm:rounded-[2rem]"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-8 group-hover:bg-[#ee6669] group-hover:text-white transition-all duration-500">
                <reason.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-light text-[#2d1b4e] mb-4 group-hover:text-[#ee6669] transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
