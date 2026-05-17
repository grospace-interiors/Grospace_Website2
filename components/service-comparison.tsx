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
    <section className="py-24 lg:py-40 bg-zinc-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 mb-6"
          >
            The <span className="text-[#ee6669]">Grospace</span> Advantage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-2xl mx-auto font-light"
          >
            Experience the difference between traditional carpentry and our professional, structured approach to interiors.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-zinc-200 rounded-[3rem] overflow-hidden border border-zinc-200 shadow-2xl">
          {/* Traditional Column */}
          <div className="bg-white p-12 lg:p-20">
            <h3 className="text-2xl font-serif font-light text-zinc-400 mb-12 uppercase tracking-widest text-center">Traditional Approach</h3>
            <div className="space-y-8">
              {comparisons.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6"
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
          <div className="bg-[#2d1b4e] p-12 lg:p-20 relative overflow-hidden">
             {/* Subtle gradient background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ee6669]/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            
            <h3 className="text-2xl font-serif font-light text-white mb-12 uppercase tracking-widest text-center relative z-10">Grospace Interiors</h3>
            <div className="space-y-8 relative z-10">
              {comparisons.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6"
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
