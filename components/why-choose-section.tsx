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
    <section className="w-full bg-[#fdfdfd] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] tracking-tight leading-tight">
            Why Homeowners Choose <br/>
            <span className="text-[#ee6669]">Grospace Interiors</span>
          </h2>
          <div className="w-24 h-1 bg-[#ee6669] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="group p-10 bg-white border border-zinc-100 rounded-[2.5rem] hover:border-[#ee6669]/20 hover:shadow-2xl transition-all duration-500"
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
