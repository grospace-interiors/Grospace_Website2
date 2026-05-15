'use client'

import { motion } from 'framer-motion'
import { Home, Users, Award, Calendar } from 'lucide-react'

export function LandingStats() {
  const stats = [
    {
      icon: Home,
      value: '1000+',
      label: 'Homes Designed'
    },
    {
      icon: Users,
      value: '10,000+',
      label: 'Happy Residents'
    },
    {
      icon: Award,
      value: '10 Year',
      label: 'Material Warranty'
    },
    {
      icon: Calendar,
      value: '45 Days',
      label: 'Delivery Promise'
    }
  ]

  return (
    <div className="w-full bg-white border-y border-zinc-100 py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center group-hover:bg-[#ee6669]/10 transition-colors duration-500">
                <stat.icon className="w-6 h-6 text-[#ee6669]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl lg:text-4xl font-serif font-light text-zinc-900 leading-none">
                  {stat.value}
                </h4>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
