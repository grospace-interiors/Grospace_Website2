'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    title: "Consultation & Requirement Discussion",
    description: "Deep dive into your lifestyle, preferences, and functional needs to define the design brief."
  },
  {
    title: "Site Visit & Measurements",
    description: "Precise digital scanning and measurements of your space to ensure millimetre-perfect design."
  },
  {
    title: "Design & Layout Planning",
    description: "Creating 2D layouts and detailed 3D visualizations that bring your vision to life."
  },
  {
    title: "Material Selection",
    description: "Hand-picking premium finishes, hardware, and fabrics from our curated material library."
  },
  {
    title: "Final Quotation & Approval",
    description: "Transparent pricing with no hidden costs, finalized before we begin manufacturing."
  },
  {
    title: "Manufacturing & Execution",
    description: "Precision factory manufacturing using state-of-the-art European machinery."
  },
  {
    title: "Installation & Finishing",
    description: "Structured on-site execution by professional teams with rigorous quality checks."
  },
  {
    title: "Final Handover",
    description: "Deep cleaning and final inspection before we hand over your dream space."
  }
]

export function ServiceProcess() {
  return (
    <section className="py-24 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 mb-6"
          >
            Our <span className="text-[#ee6669]">Process</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-2xl mx-auto font-light"
          >
            A structured, transparent journey from concept to reality, ensuring precision at every step.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Connecting Path Line */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-100 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ee6669] text-white font-serif text-lg mb-6 md:hidden`}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-serif font-light text-zinc-900 mb-3">
                    {step.title}
                  </h3>
                  <p className={`text-zinc-500 font-light text-sm leading-relaxed max-w-sm mx-auto ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                    {step.description}
                  </p>
                </div>

                {/* Dot with Inner Path Point */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-zinc-100 shadow-lg z-10 shrink-0 relative">
                  <div className="w-3 h-3 rounded-full bg-[#ee6669]" />
                </div>

                {/* Step Number / Background Indicator */}
                <div className={`flex-1 hidden md:block ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <span className="text-7xl lg:text-8xl font-serif text-[#2d1b4e]/5 select-none leading-none">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
