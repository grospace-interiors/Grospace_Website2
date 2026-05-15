'use client'

import { ProjectsSection } from '@/components/projects-section'
import { ServiceCTA } from '@/components/service-cta'
import { motion } from 'framer-motion'
import { ShieldCheck, Gem, PenTool, ArrowRight, Quote, Star, Calculator } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function ProjectsPageClient() {
  return (
    <main className="bg-white">
        {/* 1. PREMIUM HERO SECTION */}
        <section className="w-full pt-32 lg:pt-56 pb-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee6669]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2d1b4e]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 bg-zinc-50 border border-zinc-100 px-8 py-3 rounded-full text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.4em] shadow-sm"
              >
                <Star className="w-3.5 h-3.5" />
                Portfolio Excellence
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-6xl lg:text-[100px] font-serif font-light text-[#2d1b4e] leading-[1] tracking-tighter"
              >
                Spaces designed <br />
                <span className="text-[#ee6669]">around modern living.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl lg:text-2xl text-zinc-500 font-light max-w-2xl leading-relaxed"
              >
                 Explore thoughtfully crafted interiors designed for comfort, functionality and timeless aesthetics. From minimalist apartments to luxury villas in Bhopal.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap items-center gap-12 pt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400"
              >
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                    <Gem className="w-4 h-4 text-[#ee6669]" />
                  </div>
                  Premium Materials
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                    <ShieldCheck className="w-4 h-4 text-[#ee6669]" />
                  </div>
                  Transparent Execution
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                    <PenTool className="w-4 h-4 text-[#ee6669]" />
                  </div>
                  End-to-End Interiors
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. FEATURED PROJECT SECTION */}
        <section className="py-24 lg:py-40 bg-zinc-50 relative overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1 }}
                   className="lg:col-span-7 relative group"
                 >
                    <div className="aspect-[16/10] rounded-[3.5rem] overflow-hidden shadow-2xl relative">
                       <Image 
                         src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" 
                         alt="Featured Project" 
                         fill 
                         className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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
                   className="lg:col-span-5 space-y-12"
                 >
                    <div className="space-y-6">
                      <span className="text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.4em]">Signature Collection</span>
                      <h2 className="text-5xl lg:text-7xl font-serif font-light text-[#2d1b4e] leading-tight tracking-tight">Modern Zen <br /><span className="text-[#ee6669]">Arera Villa.</span></h2>
                      <p className="text-xl text-zinc-500 font-light leading-relaxed">A masterclass in minimal luxury, this 4BHK villa in Arera Colony blends natural textures with smart modular functionality.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 pt-4">
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Location</p>
                          <p className="text-lg font-serif text-[#2d1b4e]">Arera Colony, Bhopal</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Home Type</p>
                          <p className="text-lg font-serif text-[#2d1b4e]">4BHK Independent Villa</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Style</p>
                          <p className="text-lg font-serif text-[#2d1b4e]">Modern Minimalist</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Timeline</p>
                          <p className="text-lg font-serif text-[#2d1b4e]">65 Working Days</p>
                       </div>
                    </div>

                    <Button className="h-20 px-12 rounded-[1.5rem] bg-[#2d1b4e] hover:bg-[#ee6669] text-white font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all group">
                       View Full Project <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* 3 & 4. PREMIUM PROJECT GRID with FILTERS */}
        <section className="py-24 lg:py-40">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
                 <div className="space-y-6 max-w-2xl">
                    <h2 className="text-5xl lg:text-7xl font-serif font-light text-[#2d1b4e] leading-tight tracking-tight">Our <span className="text-[#ee6669]">Portfolio.</span></h2>
                    <p className="text-xl text-zinc-500 font-light leading-relaxed">From compact modular kitchens to expansive full-home transformations. Filter by category to see our specific expertise.</p>
                 </div>
              </div>
              
              <ProjectsSection />
           </div>
        </section>

        {/* 5. BEFORE & AFTER SECTION */}
        <section className="py-24 lg:py-40 bg-zinc-950 text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
                 <h2 className="text-5xl lg:text-8xl font-serif font-light leading-tight tracking-tight">From empty spaces to <br /><span className="text-[#ee6669]">thoughtful homes.</span></h2>
                 <p className="text-xl text-zinc-400 font-light">See how we transform cold structures into warm, functional and premium living environments.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                 <div className="space-y-10 group">
                    <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-2xl">
                       <Image 
                         src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200" 
                         alt="Before and After" 
                         fill 
                         className="object-cover"
                       />
                       <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          The Transformation
                       </div>
                    </div>
                    <div className="space-y-4 px-10">
                       <h4 className="text-3xl font-serif font-light">Arera Colony Duplex</h4>
                       <p className="text-zinc-500 text-sm leading-relaxed max-w-md italic">"We turned a bare-shell duplex into a luxury retreat within 3 months, focusing on hidden storage and premium lighting."</p>
                    </div>
                 </div>
                 
                 <div className="space-y-10 group md:mt-32">
                    <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-2xl">
                       <Image 
                         src="https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=1200" 
                         alt="Kitchen Transformation" 
                         fill 
                         className="object-cover"
                       />
                       <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Modular Efficiency
                       </div>
                    </div>
                    <div className="space-y-4 px-10">
                       <h4 className="text-3xl font-serif font-light">Kolar Kitchen Hub</h4>
                       <p className="text-zinc-500 text-sm leading-relaxed max-w-md italic">"Maximizing space in a compact 120 sq.ft kitchen using tandem boxes and smart pantry units."</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 7. CLIENT TESTIMONIAL STRIP */}
        <section className="py-32 lg:py-48 bg-white border-y border-zinc-100">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col items-center text-center space-y-12">
                 <Quote className="w-16 h-16 text-[#ee6669]/20" />
                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-3xl lg:text-5xl font-serif font-light text-[#2d1b4e] max-w-5xl leading-tight"
                 >
                   "Grospace transformed our empty Arera villa into a masterpiece. Their attention to detail in the modular kitchen and the choice of premium veneers was exceptional. Truly stress-free."
                 </motion.p>
                 <div className="space-y-3">
                    <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#2d1b4e]">Mr. Sanjay Mehra</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">4BHK Villa | Arera Colony, Bhopal</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. TRUST & EXECUTION SECTION */}
        <section className="py-24 lg:py-40 bg-white">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                 <div className="space-y-8 p-12 rounded-[3.5rem] bg-zinc-50 border border-zinc-100 transition-all hover:shadow-2xl hover:bg-white group">
                    <div className="w-16 h-16 rounded-3xl bg-white border border-zinc-100 flex items-center justify-center group-hover:bg-[#ee6669] transition-colors">
                       <ShieldCheck className="w-8 h-8 text-[#ee6669] group-hover:text-white" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#2d1b4e]">Factory Finished</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed">Precision machine-cutting and edge-banding for a flawless premium finish.</p>
                    </div>
                 </div>
                 
                 <div className="space-y-8 p-12 rounded-[3.5rem] bg-zinc-50 border border-zinc-100 transition-all hover:shadow-2xl hover:bg-white group">
                    <div className="w-16 h-16 rounded-3xl bg-white border border-zinc-100 flex items-center justify-center group-hover:bg-[#ee6669] transition-colors">
                       <Gem className="w-8 h-8 text-[#ee6669] group-hover:text-white" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#2d1b4e]">Premium Hardware</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed">Using world-class fittings from Hettich and Hafele for lifetime durability.</p>
                    </div>
                 </div>

                 <div className="space-y-8 p-12 rounded-[3.5rem] bg-zinc-50 border border-zinc-100 transition-all hover:shadow-2xl hover:bg-white group">
                    <div className="w-16 h-16 rounded-3xl bg-white border border-zinc-100 flex items-center justify-center group-hover:bg-[#ee6669] transition-colors">
                       <PenTool className="w-8 h-8 text-[#ee6669] group-hover:text-white" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#2d1b4e]">Dedicated Lead</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed">Single point of contact for your entire project, from design to handover.</p>
                    </div>
                 </div>

                 <div className="space-y-8 p-12 rounded-[3.5rem] bg-zinc-50 border border-zinc-100 transition-all hover:shadow-2xl hover:bg-white group">
                    <div className="w-16 h-16 rounded-3xl bg-white border border-zinc-100 flex items-center justify-center group-hover:bg-[#ee6669] transition-colors">
                       <Calculator className="w-8 h-8 text-[#ee6669] group-hover:text-white" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold uppercase tracking-widest text-[#2d1b4e]">Transparent Pricing</h4>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed">No hidden charges or last-minute surprises. Fixed quotes with detailed BOQs.</p>
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
