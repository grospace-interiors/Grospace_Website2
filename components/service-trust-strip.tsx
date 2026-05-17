'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Gem, PenTool } from 'lucide-react'

export function ServiceTrustStrip() {
  const items = [
    {
      icon: ShieldCheck,
      label: 'Transparent Pricing',
    },
    {
      icon: Gem,
      label: 'Premium Materials',
    },
    {
      icon: PenTool,
      label: 'End-to-End Execution',
    }
  ]

  return (
    <div className="w-full bg-white py-6 border-b border-zinc-100 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ee6669]/5 flex items-center justify-center group-hover:bg-[#ee6669]/10 transition-colors duration-500">
                <item.icon className="w-5 h-5 text-[#ee6669]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2d1b4e]/60 group-hover:text-[#2d1b4e] transition-colors duration-500">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
