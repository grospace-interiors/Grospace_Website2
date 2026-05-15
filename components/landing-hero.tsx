'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, BadgePercent, Construction } from 'lucide-react'

export function LandingHero() {
  const scrollToForm = () => {
    document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full h-[85vh] lg:h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
          alt="Premium Living Room Interior" 
          fill 
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-8xl font-serif font-light text-white leading-[1.1] tracking-tight">
              Design a home that tells <span className="text-[#ee6669] italic">your story.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-zinc-200 font-light leading-relaxed max-w-2xl">
              Affordable luxury for Bhopal families. Experience premium interior design with transparent pricing and end-to-end execution.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button 
              onClick={scrollToForm}
              className="bg-[#ee6669] hover:bg-white hover:text-[#332233] text-white px-10 py-8 text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-2xl shadow-[#ee6669]/20 group"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10 px-10 py-8 text-sm font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-sm"
            >
              View Packages
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/10"
          >
            <div className="flex items-center gap-3 text-white/80">
              <ShieldCheck className="w-6 h-6 text-[#ee6669]" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ee6669]">Peace of Mind</p>
                <p className="text-sm font-light">10-Year Warranty</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <BadgePercent className="w-6 h-6 text-[#ee6669]" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ee6669]">Honest Values</p>
                <p className="text-sm font-light">Transparent Pricing</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Construction className="w-6 h-6 text-[#ee6669]" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ee6669]">Seamless Flow</p>
                <p className="text-sm font-light">End-to-End Execution</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#ee6669] rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
