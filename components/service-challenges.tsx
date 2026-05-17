'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Droplets, 
  Shield, 
  Zap, 
  Sparkles, 
  Sliders, 
  Maximize, 
  Gauge, 
  Clock, 
  Layout, 
  Layers, 
  Palette, 
  ShieldCheck, 
  Diamond, 
  PenTool, 
  Star, 
  Heart 
} from 'lucide-react'

const iconMap = {
  maximize: Maximize,
  zap: Zap,
  gauge: Gauge,
  sparkles: Sparkles,
  clock: Clock,
  layout: Layout,
  layers: Layers,
  palette: Palette,
  shieldCheck: ShieldCheck,
  diamond: Diamond,
  penTool: PenTool,
  star: Star,
  heart: Heart,
  shield: Shield
}

interface Challenge {
  icon: keyof typeof iconMap
  challenge: string
  solution: string
}

interface ServiceChallengesProps {
  challenges?: Challenge[]
}

const defaultChallenges: Challenge[] = [
  {
    icon: "maximize",
    challenge: "Space Optimization",
    solution: "Custom-engineered modular units and multi-functional furniture designed to maximize every square inch, especially in compact urban homes."
  },
  {
    icon: "zap",
    challenge: "Electrical Planning",
    solution: "Meticulous internal routing and concealed wiring layouts integrated into the design to ensure safety and convenient access to power points."
  },
  {
    icon: "gauge",
    challenge: "Ventilation Considerations",
    solution: "Strategic layout planning that prioritizes airflow, utilizing breathable materials and optimized window/exhaust placements."
  },
  {
    icon: "sparkles",
    challenge: "Moisture Protection",
    solution: "Exclusive use of BWP Plywood and HDHMR in high-humidity areas like kitchens and bathrooms to prevent swelling and termite issues."
  }
]

export function ServiceChallenges({ challenges = defaultChallenges }: ServiceChallengesProps) {
  return (
    <section className="py-24 lg:py-40 bg-zinc-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left Column: Heading */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <span className="text-[#ee6669] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Expertise</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-zinc-900 mb-8 leading-tight">
                Technical Challenges <span className="text-[#ee6669]">&</span> Solutions.
              </h2>
              <p className="text-zinc-500 font-light leading-relaxed">
                Interiors are more than just aesthetics. We solve complex structural and technical problems to ensure longevity and comfort.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Challenges List */}
          <div className="lg:w-2/3 space-y-12">
            {challenges.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Shield
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 lg:p-12 bg-white rounded-[2rem] border border-zinc-100 hover:border-[#ee6669]/20 transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover:bg-[#ee6669]/10 transition-colors duration-500 shrink-0">
                      <IconComponent className="w-8 h-8 text-zinc-400 group-hover:text-[#ee6669] transition-colors duration-500" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 flex-1">
                      <div>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">The Challenge</span>
                        <h3 className="text-xl font-medium text-zinc-900">{item.challenge}</h3>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#ee6669] uppercase tracking-widest mb-2 block">The Grospace Solution</span>
                        <p className="text-zinc-500 font-light leading-relaxed">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
