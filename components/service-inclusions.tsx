'use client'

import { motion } from 'framer-motion'

interface ServiceInclusionProps {
  title: string
  items: string[]
}

export function ServiceInclusions({ title, items }: ServiceInclusionProps) {
  return (
    <section className="py-24 lg:py-40 bg-[#2d1b4e] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#ee6669] text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
            >
              Comprehensive Scope
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-serif font-light mb-8 leading-tight"
            >
              What this <span className="text-[#ee6669]">Service</span> Includes.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-purple-100/60 font-light leading-relaxed mb-12 max-w-lg"
            >
              We provide a complete end-to-end solution, handling every technical and aesthetic detail to deliver a move-in ready space.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#ee6669]/30 transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#ee6669] group-hover:scale-150 transition-transform" />
                  <span className="text-purple-50 group-hover:text-white transition-colors">{item}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
