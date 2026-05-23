'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Award, Zap, HeartHandshake } from 'lucide-react'

export function LandingWarranty() {
  const features = [
    {
      icon: ShieldCheck,
      title: '10-Year Excellence*',
      description: 'Built on a decade of collective leadership experience in Bhopal.'
    },
    {
      icon: Award,
      title: 'Premium Materials',
      description: 'We only use top-grade, certified materials for every build.'
    },
    {
      icon: Zap,
      title: 'On-Time Delivery',
      description: 'Move into your dream home exactly when we promised.'
    },
    {
      icon: HeartHandshake,
      title: 'Honest Support',
      description: 'Our relationship doesn’t end when the project finishes.'
    }
  ]

  return (
    <section className="w-full bg-[#222222] py-16 md:py-24 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ee6669]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ee6669]/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-[#ee6669] px-4 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
               Heritage of Quality
            </div>
            <h2 className="text-3xl md:text-7xl font-serif font-light text-white leading-tight">
              Precision in <span className="text-[#ee6669] italic">every detail.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg">
              Our commitment to your home is rooted in experience. We stand behind our craftsmanship with 10 years of collective design precision and unparalleled after-sales support.
            </p>
            <div className="pt-4">
               <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-[0.4em] mb-2">The Grospace Promise</p>
               <div className="h-0.5 w-24 bg-[#ee6669]" />
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#ee6669] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-serif font-light text-white">{feature.title}</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

        <p className="mt-20 text-[10px] text-zinc-500 font-medium text-center uppercase tracking-widest">
           *T&C apply. Visit our experience center for more details.
        </p>
      </div>
    </section>
  )
}
