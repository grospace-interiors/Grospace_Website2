'use client'

import { ProjectsSection } from '@/components/projects-section'
import { ServiceCTA } from '@/components/service-cta'
import { motion } from 'framer-motion'
import { ShieldCheck, Gem, PenTool, ArrowRight, Quote, Star, Calculator } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function ProjectsPageClient() {
  return (
    <main className="overflow-x-clip bg-white">
        {/* 1. PREMIUM HERO SECTION - SAGE GREEN */}
        <section className="relative w-full overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-56 bg-[#E5EEE4]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee6669]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#222222]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
            <div className="max-w-4xl space-y-6 lg:space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#222222]/5 bg-white/50 backdrop-blur-md px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#ee6669] shadow-sm sm:gap-3 sm:px-8 sm:py-3 sm:text-[10px] sm:tracking-[0.4em]"
              >
                <Star className="w-3.5 h-3.5" />
                Portfolio Excellence
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-4xl font-serif font-light leading-[1.05] tracking-tight text-[#222222] sm:text-5xl lg:text-7xl"
              >
                Spaces designed <br />
                <span className="text-[#ee6669]">around modern living.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-2xl text-sm font-light leading-relaxed text-[#222222]/60 sm:text-xl lg:text-2xl"
              >
                 Explore thoughtfully crafted interiors designed for comfort, functionality and timeless aesthetics. From minimalist apartments to luxury villas in Bhopal.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400 sm:gap-12 sm:pt-8 sm:text-[10px] sm:tracking-[0.4em]"
              >
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/50 border border-[#222222]/5 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                    <Gem className="w-4 h-4 text-[#ee6669]" />
                  </div>
                  Premium Materials
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/50 border border-[#222222]/5 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                    <ShieldCheck className="w-4 h-4 text-[#ee6669]" />
                  </div>
                  Transparent Execution
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/50 border border-[#222222]/5 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                    <PenTool className="w-4 h-4 text-[#ee6669]" />
                  </div>
                  End-to-End Interiors
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F6F4E8] to-transparent" />
        </section>

        {/* 2. FEATURED PROJECT SECTION - CREAM LINEN */}
        <section className="relative overflow-hidden bg-[#F6F4E8] py-16 lg:py-28">
           <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1 }}
                   className="lg:col-span-7 relative group"
                 >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl lg:rounded-[3.5rem] border-8 border-white">
                       <Image 
                         src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" 
                         alt="Featured Project" 
                         fill 
                         className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/40 via-transparent to-transparent" />
                    </div>
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#ee6669] rounded-[3rem] p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700 hidden lg:flex">
                        <Star className="w-8 h-8 mb-2" />
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">Featured Design</p>
                    </div>
                 </motion.div>
                 
                 <motion.div 
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                   className="space-y-8 lg:col-span-5 lg:space-y-8"
                 >
                    <div className="space-y-6">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#ee6669] sm:text-[10px] sm:tracking-[0.4em]">Signature Collection</span>
                      <h2 className="text-3xl font-serif font-light leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-7xl">Modern Zen <br /><span className="text-[#ee6669]">Arera Villa.</span></h2>
                      <p className="text-sm font-light leading-relaxed text-zinc-500 sm:text-xl">A masterclass in minimal luxury, this 4BHK villa in Arera Colony blends natural textures with smart modular functionality.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5 pt-2 sm:gap-10 sm:pt-4">
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Location</p>
                          <p className="text-lg font-serif text-[#222222]">Arera Colony, Bhopal</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Home Type</p>
                          <p className="text-lg font-serif text-[#222222]">4BHK Independent Villa</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Style</p>
                          <p className="text-lg font-serif text-[#222222]">Modern Minimalist</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Timeline</p>
                          <p className="text-lg font-serif text-[#222222]">65 Working Days</p>
                       </div>
                    </div>

                    <Button className="h-12 w-full rounded-2xl bg-[#222222] px-8 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-2xl transition-all hover:bg-[#ee6669] sm:h-14 sm:w-auto sm:px-10 sm:text-[11px] sm:tracking-[0.2em]">
                       View Full Project <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* 3 & 4. PREMIUM PROJECT GRID with FILTERS - WHITE CANVAS */}
        <ProjectsSection />

        {/* 5. BEFORE & AFTER SECTION - DARK DRAMA */}
        <section className="relative overflow-hidden bg-[#222222] py-16 text-white lg:py-28">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ee6669]/5 rounded-full blur-[140px] -z-0 -mr-64 -mt-64" />
           <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
              <div className="mx-auto mb-12 max-w-3xl space-y-5 text-center lg:mb-32 lg:space-y-8">
                 <h2 className="text-3xl font-serif font-light leading-tight tracking-tight sm:text-5xl lg:text-7xl">From empty spaces to <br /><span className="text-[#ee6669]">thoughtful homes.</span></h2>
                 <p className="text-sm font-light text-zinc-400 sm:text-xl">See how we transform cold structures into warm, functional and premium living environments.</p>
              </div>

              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-12 md:overflow-visible md:px-0 md:pb-0 lg:gap-24">
                 <div className="group min-w-[84%] snap-center space-y-6 md:min-w-0 lg:space-y-8">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl lg:rounded-[3.5rem] border border-white/5">
                       <Image 
                         src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200" 
                         alt="Before and After" 
                         fill 
                         className="object-cover"
                       />
                       <div className="absolute bottom-10 left-10 bg-black/20 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          The Transformation
                       </div>
                    </div>
                    <div className="space-y-4 px-10">
                       <h4 className="text-3xl font-serif font-light">Arera Colony Duplex</h4>
                       <p className="text-zinc-400 text-sm leading-relaxed max-w-md italic">"We turned a bare-shell duplex into a luxury retreat within 3 months, focusing on hidden storage and premium lighting."</p>
                    </div>
                 </div>
                 
                 <div className="group min-w-[84%] snap-center space-y-6 md:mt-32 md:min-w-0 lg:space-y-8">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl lg:rounded-[3.5rem] border border-white/5">
                       <Image 
                         src="https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=1200" 
                         alt="Kitchen Transformation" 
                         fill 
                         className="object-cover"
                       />
                       <div className="absolute bottom-10 left-10 bg-black/20 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Modular Efficiency
                       </div>
                    </div>
                    <div className="space-y-4 px-10">
                       <h4 className="text-3xl font-serif font-light">Kolar Kitchen Hub</h4>
                       <p className="text-zinc-400 text-sm leading-relaxed max-w-md italic">"Maximizing space in a compact 120 sq.ft kitchen using tandem boxes and smart pantry units."</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#E5EEE4] to-transparent opacity-10" />
        </section>

        {/* 7. CLIENT TESTIMONIAL STRIP - WHITE CANVAS */}
        <section className="bg-white py-16 lg:py-48 border-y border-zinc-100">
           <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
              <div className="flex flex-col items-center space-y-8 text-center lg:space-y-8">
                 <Quote className="w-16 h-16 text-[#ee6669]/20" />
                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="max-w-5xl text-2xl font-light leading-tight text-[#222222] sm:text-3xl lg:text-5xl"
                 >
                   "Grospace transformed our empty Arera villa into a masterpiece. Their attention to detail in the modular kitchen and the choice of premium veneers was exceptional. Truly stress-free."
                 </motion.p>
                 <div className="space-y-3">
                    <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#222222]">Mr. Sanjay Mehra</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#222222]/40">4BHK Villa | Arera Colony, Bhopal</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. TRUST & EXECUTION SECTION - CREAM LINEN */}
        <section className="overflow-hidden bg-[#F6F4E8] py-16 lg:py-28">
           <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-12">
                 <div className="group min-w-[82%] snap-center space-y-6 rounded-3xl border border-[#222222]/5 bg-white p-6 transition-all hover:bg-[#ee6669] hover:border-[#ee6669] md:min-w-0 lg:space-y-8 lg:rounded-[3.5rem] lg:p-12 shadow-sm">
                    <div className="w-16 h-16 rounded-3xl bg-[#E5EEE4] border border-[#222222]/5 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                       <ShieldCheck className="w-8 h-8 text-[#ee6669]" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#222222] group-hover:text-white">Factory Finished</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed group-hover:text-white/80">Precision machine-cutting and edge-banding for a flawless premium finish.</p>
                    </div>
                 </div>
                 
                 <div className="group min-w-[82%] snap-center space-y-6 rounded-3xl border border-[#222222]/5 bg-white p-6 transition-all hover:bg-[#ee6669] hover:border-[#ee6669] md:min-w-0 lg:space-y-8 lg:rounded-[3.5rem] lg:p-12 shadow-sm">
                    <div className="w-16 h-16 rounded-3xl bg-[#E5EEE4] border border-[#222222]/5 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                       <Gem className="w-8 h-8 text-[#ee6669]" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#222222] group-hover:text-white">Premium Hardware</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed group-hover:text-white/80">Using world-class fittings from Hettich and Hafele for lifetime durability.</p>
                    </div>
                 </div>

                 <div className="group min-w-[82%] snap-center space-y-6 rounded-3xl border border-[#222222]/5 bg-white p-6 transition-all hover:bg-[#ee6669] hover:border-[#ee6669] md:min-w-0 lg:space-y-8 lg:rounded-[3.5rem] lg:p-12 shadow-sm">
                    <div className="w-16 h-16 rounded-3xl bg-[#E5EEE4] border border-[#222222]/5 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                       <PenTool className="w-8 h-8 text-[#ee6669]" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#222222] group-hover:text-white">Dedicated Lead</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed group-hover:text-white/80">Single point of contact for your entire project, from design to handover.</p>
                    </div>
                 </div>

                 <div className="group min-w-[82%] snap-center space-y-6 rounded-3xl border border-[#222222]/5 bg-white p-6 transition-all hover:bg-[#ee6669] hover:border-[#ee6669] md:min-w-0 lg:space-y-8 lg:rounded-[3.5rem] lg:p-12 shadow-sm">
                    <div className="w-16 h-16 rounded-3xl bg-[#E5EEE4] border border-[#222222]/5 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                       <Calculator className="w-8 h-8 text-[#ee6669]" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#222222] group-hover:text-white">Transparent Pricing</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed group-hover:text-white/80">No hidden charges or last-minute surprises. Fixed quotes with detailed BOQs.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 9. FINAL CTA SECTION */}
        <ServiceCTA />
      </main>
  )
}
