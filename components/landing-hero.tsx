'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import * as fp from '@/lib/fpixel'

export function LandingHero() {
  const triggerLeadModal = () => {
    fp.event('SiteVisitClicked', { location: 'landing_hero_primary' })
    window.dispatchEvent(new CustomEvent('open-lead-modal'))
  }

  return (
    <section className="relative flex h-[75svh] min-h-[500px] w-full items-center overflow-hidden sm:h-[80vh] lg:h-[95vh]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/landing.webp" 
          alt="Premium Living Room Interior" 
          fill 
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl font-serif font-light leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Bhopal’s Trusted Interior Designers <br/>
              <span className="text-[#ee6669] italic">Premium Homes from ₹2.15L</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm font-light leading-relaxed text-zinc-200 sm:text-lg lg:text-2xl">
              Get custom modular kitchens, wardrobes, and full home interiors with a 10-year warranty, zero hidden costs, and free site visits.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4"
          >
            <Button 
              onClick={triggerLeadModal}
              className="h-12 rounded-full bg-[#ee6669] px-8 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-2xl shadow-[#ee6669]/20 transition-all hover:bg-white hover:text-[#222222] sm:h-auto sm:px-10 sm:py-8 sm:text-sm sm:tracking-[0.2em]"
            >
              Book Free Site Visit <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                fp.customEvent('ViewPackagesClick', { location: 'landing_hero' })
                document.getElementById('budget-plans')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="h-12 rounded-full border-white/30 bg-transparent px-8 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm hover:bg-white/10 sm:h-auto sm:px-10 sm:py-8 sm:text-sm sm:tracking-[0.2em]"
            >
              View Packages
            </Button>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
