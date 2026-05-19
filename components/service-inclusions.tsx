'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface Inclusion {
  title: string
  desc?: string
}

interface ServiceInclusionsProps {
  title: string
  items: (string | Inclusion)[]
}

export function ServiceInclusions({ title, items }: ServiceInclusionsProps) {
  const isDetailed = typeof items[0] !== 'string'

  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Left: Sticky Heading */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-[#ee6669] text-xs font-bold uppercase tracking-[0.4em] mb-6 block">What's Included</span>
              <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] leading-tight mb-8">
                Scope of <br />
                <span className="text-[#ee6669]">{title}</span>
              </h2>
              <p className="text-zinc-500 font-light leading-relaxed max-w-sm">
                A comprehensive breakdown of everything we handle, ensuring zero gaps in execution.
              </p>
            </motion.div>
          </div>

          {/* Right: Grid of Items */}
          <div className="lg:w-2/3">
            <div className={isDetailed ? "grid sm:grid-cols-2 gap-12" : "grid sm:grid-cols-2 gap-y-12 gap-x-20"}>
              {items.map((item, index) => {
                const inclusion = typeof item === 'string' ? { title: item } : item
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-[#ee6669] group-hover:border-[#ee6669] transition-all duration-500">
                        <Plus className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium text-[#2d1b4e] tracking-tight group-hover:text-[#ee6669] transition-colors">{inclusion.title}</h3>
                        {inclusion.desc && (
                          <p className="text-sm text-zinc-400 font-light leading-relaxed">{inclusion.desc}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
