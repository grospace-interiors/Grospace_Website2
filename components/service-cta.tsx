'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare, Briefcase } from 'lucide-react'
import * as fp from '@/lib/fpixel'

export function ServiceCTA() {
  return (
    <section className="relative overflow-hidden bg-[#222222] py-16 lg:py-24">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ee6669]/5 rounded-full blur-[160px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[160px] -ml-96 -mb-96" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#ee6669] backdrop-blur-sm sm:mb-12 sm:gap-3 sm:px-8 sm:py-3 sm:text-[10px] sm:tracking-[0.4em]"
        >
          <Briefcase className="w-3.5 h-3.5" />
          Get Your Interior Quote
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-4xl font-serif font-light leading-[1.05] tracking-tight text-white sm:text-5xl lg:mb-8 lg:text-7xl"
        >
          Let’s Design Your <br />
          <span className="text-[#ee6669]">Signature Home.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mb-9 max-w-2xl text-sm font-light leading-relaxed text-purple-100/60 sm:text-lg lg:mb-12 lg:text-xl"
        >
          Book an exclusive 1-on-1 design verification session with our principal architects and turn your vision into a reality.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-8"
        >
          <Button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
            className="relative h-14 w-full overflow-hidden rounded-2xl bg-[#ee6669] px-8 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-2xl shadow-[#ee6669]/20 transition-all duration-500 hover:bg-white hover:text-[#222222] sm:h-16 sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[0.22em]"
          >
             <span className="relative z-10 flex items-center justify-center">
                Book Free Site Visit <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
             </span>
          </Button>

          <Button 
            onClick={() => {
              fp.customEvent('WhatsAppClick', { location: 'service_cta' });
              window.open(`https://wa.me/918319032087?text=${encodeURIComponent("Hi, I'm interested in a free site visit.")}`, '_blank');
            }}
            className="flex h-14 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-500 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white sm:h-16 sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[0.22em]"
          >
            <MessageSquare className="w-5 h-5 mr-4" /> WhatsApp Us
          </Button>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30 sm:mt-16 sm:text-[10px] sm:tracking-[0.5em]"
        >
          Available in Bhopal & Surrounding Areas
        </motion.p>
      </div>
    </section>
  )
}
