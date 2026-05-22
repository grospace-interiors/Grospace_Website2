'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, Gem, PenTool } from 'lucide-react'

interface ServiceHeroProps {
  title: string
  subtitle: string
  image: string
}

export function ServiceHero({ title, subtitle, image }: ServiceHeroProps) {
  return (
    <section className="relative flex h-[75svh] min-h-[480px] items-center justify-center overflow-hidden sm:h-[80vh] lg:h-[95vh] lg:min-h-[500px]">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222]/70 via-[#222222]/40 to-[#222222]/70" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 text-center text-white sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="mb-4 text-4xl font-serif font-light leading-[1.08] tracking-tight md:text-6xl lg:mb-5 lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mb-7 max-w-2xl text-sm font-light leading-relaxed text-purple-50/80 sm:text-lg md:text-xl lg:mb-9">
            {subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-6"
        >
          <Button 
            asChild
            className="h-12 rounded-full bg-[#ee6669] px-8 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-2xl shadow-[#ee6669]/20 hover:bg-[#dd5558] sm:h-14 sm:px-10 sm:text-[11px] sm:tracking-[0.2em]"
          >
            <a href="#contact">
              Book Free Site Visit <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.dispatchEvent(new CustomEvent('open-estimate-modal', { detail: { package: title } }))}
            className="h-12 rounded-full border-white/20 bg-white/10 px-8 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#222222] sm:h-14 sm:px-10 sm:text-[11px] sm:tracking-[0.2em]"
          >
            Calculate Your Estimate
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
