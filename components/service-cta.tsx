'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare, Briefcase } from 'lucide-react'

export function ServiceCTA() {
  return (
    <section className="py-32 lg:py-56 bg-[#2d1b4e] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ee6669]/5 rounded-full blur-[160px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[160px] -ml-96 -mb-96" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-3 rounded-full text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.4em] mb-12 backdrop-blur-sm"
        >
          <Briefcase className="w-3.5 h-3.5" />
          Start Your Premium Journey
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl lg:text-[100px] font-serif font-light text-white mb-10 leading-[1] tracking-tighter"
        >
          Let’s Design Your <br />
          <span className="text-[#ee6669]">Signature Home.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-purple-100/50 font-light text-xl lg:text-2xl max-w-2xl mx-auto mb-20 leading-relaxed"
        >
          Book an exclusive 1-on-1 design verification session with our principal architects and turn your vision into a reality.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <Button 
            asChild
            className="h-24 px-16 rounded-[2rem] bg-[#ee6669] hover:bg-white text-white hover:text-[#2d1b4e] font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-[#ee6669]/20 transition-all duration-500 group relative overflow-hidden"
          >
            <a href="#contact">
               <span className="relative z-10 flex items-center">
                  Book Verification Call <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
               </span>
            </a>
          </Button>

          <Button 
            variant="outline"
            className="h-24 px-16 rounded-[2rem] border-white/10 bg-white/5 backdrop-blur-md hover:bg-white hover:text-[#2d1b4e] text-white font-bold uppercase tracking-[0.3em] text-[11px] transition-all duration-500"
          >
            <MessageSquare className="w-5 h-5 mr-4" /> WhatsApp Us
          </Button>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-[10px] font-bold text-white/30 uppercase tracking-[0.5em]"
        >
          Available in Bhopal & Surrounding Areas
        </motion.p>
      </div>
    </section>
  )
}
