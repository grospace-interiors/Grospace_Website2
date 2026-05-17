'use client'

import { motion } from 'framer-motion'

interface Step {
  title: string
  description: string
}

interface ServiceProcessProps {
  title?: string
  steps?: Step[]
}

const defaultSteps = [
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

export function ServiceProcess({ title = "Process", steps = defaultSteps }: ServiceProcessProps) {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 mb-4"
          >
            Our <span className="text-[#ee6669]">{title}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-2xl mx-auto font-light text-sm md:text-base"
          >
            A structured, transparent journey from concept to reality, ensuring precision at every step.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Connecting Line - Perfectly Centered */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-100 md:-translate-x-1/2" />

          <div className="space-y-6 md:space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="relative min-h-[80px] md:min-h-0"
              >
                {/* Number Marker - Absolute Positioned to stay perfectly on the line */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 md:-translate-x-1/2 z-10">
                   <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border border-zinc-100 shadow-sm flex items-center justify-center">
                      <span className="text-xs md:text-base font-bold text-[#2d1b4e]">
                        {index + 1}
                      </span>
                   </div>
                </div>

                {/* Content Area - Alternating on Desktop, Right-aligned on Mobile */}
                <div className={`pl-16 md:pl-0 flex flex-col ${
                  index % 2 === 0 
                    ? 'md:items-end md:text-right md:pr-[55%] lg:pr-[58%]' 
                    : 'md:items-start md:text-left md:pl-[55%] lg:pl-[58%]'
                }`}>
                  <h3 className="text-lg lg:text-2xl font-serif font-light text-zinc-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 font-light text-xs lg:text-base leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
