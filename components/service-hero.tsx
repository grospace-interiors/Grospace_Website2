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
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e]/70 via-[#2d1b4e]/40 to-[#2d1b4e]/70" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 tracking-tight leading-[1.1]">
            {title}
          </h1>
          <p className="text-xl md:text-2xl font-light text-purple-50/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Button 
            asChild
            className="h-16 px-10 rounded-full bg-[#ee6669] hover:bg-[#dd5558] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-[#ee6669]/20 group"
          >
            <a href="#contact">
              Book Free Consultation <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button 
            variant="outline"
            className="h-16 px-10 rounded-full border-white/20 bg-white/10 backdrop-blur-md hover:bg-white hover:text-[#2d1b4e] text-white font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300"
          >
            Estimate Budget
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
