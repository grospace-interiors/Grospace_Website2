'use client'

import { Star, ShieldCheck, BadgeCheck, Zap } from 'lucide-react'

export function TrustStrip() {
  const stats = [
    {
      icon: BadgeCheck,
      label: '10+ Years',
      sublabel: 'Expert Experience'
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
    <div className="w-full overflow-hidden border-y border-zinc-100 bg-zinc-50 py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-6 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ee6669]/10 flex items-center justify-center shadow-sm">
                 <item.icon className="w-6 h-6 text-[#ee6669]" />
              </div>
              <div className="space-y-1">
                 <p className="text-xl font-serif font-light tracking-tight text-[#222222] sm:text-2xl">{item.label}</p>
                 <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-500 sm:text-[10px] sm:tracking-[0.2em]">{item.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
