import { Coffee, PencilRuler, ClipboardCheck, Hammer, Truck } from 'lucide-react'

export function ProcessSection() {
  const steps = [
    {
      icon: Coffee,
      title: 'Consultation',
      description: 'Discuss your vision and budget over a cup of coffee at our studio or your site.',
    },
    {
      icon: PencilRuler,
      title: '3D Design',
      description: 'Visualize your future home with our photorealistic 3D renders and material selection.',
    },
    {
      icon: ClipboardCheck,
      title: 'Confirmation',
      description: 'Finalize designs, materials, and timelines. We provide a transparent, fixed quote.',
    },
    {
      icon: Hammer,
      title: 'Execution',
      description: 'Our expert team brings the design to life with 146 quality checks along the way.',
    },
    {
      icon: Truck,
      title: 'Move-in',
      description: 'The big day! We hand over your dream home, ready to live in and fully cleaned.',
    },
  ]

  return (
    <section id="process" className="w-full bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">
            The Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-900">
            How It Works
          </h2>
          <div className="mt-6 w-24 h-0.5 bg-primary mx-auto" />
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-zinc-100" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative group flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-8 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500 shadow-sm">
                    <Icon className="w-8 h-8 text-zinc-400 group-hover:text-primary transition-colors duration-500" />
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold">
                      0{index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-light text-zinc-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-light px-4">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-zinc-400 text-sm mb-6 italic">Ready to start your journey with us?</p>
          <a href="#contact" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all duration-300">
            Book Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
