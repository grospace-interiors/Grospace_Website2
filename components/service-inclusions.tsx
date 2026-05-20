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
    <section className="overflow-hidden bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-32">
          {/* Left: Sticky Heading */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#ee6669] sm:text-xs sm:tracking-[0.4em] lg:mb-6">What's Included</span>
              <h2 className="mb-5 text-3xl font-serif font-light leading-tight text-[#222222] sm:text-4xl lg:mb-8 lg:text-6xl">
                Scope of <br />
                <span className="text-[#ee6669]">{title}</span>
              </h2>
              <p className="max-w-sm text-sm font-light leading-relaxed text-zinc-500 sm:text-base">
                A comprehensive breakdown of everything we handle, ensuring zero gaps in execution.
              </p>
            </motion.div>
          </div>

          {/* Right: Grid of Items */}
          <div className="lg:w-2/3">
            <div className={isDetailed ? "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-12" : "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-20 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0"}>
              {items.map((item, index) => {
                const inclusion = typeof item === 'string' ? { title: item } : item
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group min-w-[82%] snap-center rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm sm:min-w-0 sm:border-0 sm:p-0 sm:shadow-none"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-[#ee6669] group-hover:border-[#ee6669] transition-all duration-500">
                        <Plus className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium text-[#222222] tracking-tight group-hover:text-[#ee6669] transition-colors">{inclusion.title}</h3>
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
