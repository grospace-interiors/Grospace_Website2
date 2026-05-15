'use client'

import { Star, ShieldCheck, BadgeCheck, Zap } from 'lucide-react'

export function TrustStrip() {
  const stats = [
    {
      icon: BadgeCheck,
      label: '100+',
      sublabel: 'Design Concepts'
    },
    {
      icon: Zap,
      label: '25+',
      sublabel: 'Material Options'
    },
    {
      icon: ShieldCheck,
      label: 'Affordable',
      sublabel: 'Package Plans'
    },
    {
      icon: Star,
      label: 'End-to-End',
      sublabel: 'Execution Support'
    }
  ]

  return (
    <div className="w-full bg-zinc-50 py-12 border-y border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ee6669]/10 flex items-center justify-center shadow-sm">
                 <item.icon className="w-6 h-6 text-[#ee6669]" />
              </div>
              <div className="space-y-1">
                 <p className="text-2xl font-serif font-light text-[#2d1b4e] tracking-tight">{item.label}</p>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{item.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
