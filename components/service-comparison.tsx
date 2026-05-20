'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

interface Comparison {
  traditional: string
  grospace: string
}

interface ServiceComparisonProps {
  comparisons?: Comparison[]
}

const defaultComparisons = [
  {
    traditional: "Delayed timelines",
    grospace: "Factory-precision execution"
  },
  {
    traditional: "Inconsistent finishing",
    grospace: "Standardized quality control"
  },
  {
    traditional: "Budget uncertainty",
    grospace: "Transparent, locked-in pricing"
  },
  {
    traditional: "On-site mess",
    grospace: "Swift installation with minimal disruption"
  },
  {
    traditional: "Manual dependency",
    grospace: "Professional project management"
  }
]

export function ServiceComparison({ comparisons = defaultComparisons }: ServiceComparisonProps) {
  return (
    <section className="overflow-hidden bg-zinc-50 py-16 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-12 text-center lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-serif font-light text-zinc-900 sm:text-4xl lg:mb-6 lg:text-6xl"
          >
            The <span className="text-[#ee6669]">Grospace</span> Advantage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-sm font-light text-zinc-500 sm:text-base"
          >
            Experience the difference between traditional carpentry and our professional, structured approach to interiors.
          </motion.p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 shadow-2xl lg:grid-cols-2 lg:rounded-[3rem]">
          {/* Traditional Column */}
          <div className="bg-white p-6 sm:p-12 lg:p-20">
            <h3 className="mb-8 text-center font-serif text-xl font-light uppercase tracking-[0.18em] text-zinc-400 sm:mb-12 sm:text-2xl sm:tracking-widest">Traditional Approach</h3>
            <div className="space-y-5 sm:space-y-8">
              {comparisons.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 sm:gap-6"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-zinc-300" />
                  </div>
                  <span className="text-zinc-400 font-light">{item.traditional}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Grospace Interiors Column */}
          <div className="relative overflow-hidden bg-[#2d1b4e] p-6 sm:p-12 lg:p-20">
             {/* Subtle gradient background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ee6669]/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            
            <h3 className="relative z-10 mb-8 text-center font-serif text-xl font-light uppercase tracking-[0.18em] text-white sm:mb-12 sm:text-2xl sm:tracking-widest">Grospace Interiors</h3>
            <div className="relative z-10 space-y-5 sm:space-y-8">
              {comparisons.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 sm:gap-6"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ee6669]/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#ee6669]" />
                  </div>
                  <span className="text-purple-50 font-medium">{item.grospace}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
