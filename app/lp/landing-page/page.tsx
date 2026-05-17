'use client'

import { LandingNavigation } from '@/components/landing-navigation'
import { LandingHero } from '@/components/landing-hero'
import { LandingStats } from '@/components/landing-stats'
import { LandingBudget } from '@/components/landing-budget'
import { LandingWarranty } from '@/components/landing-warranty'
import { LandingForm } from '@/components/landing-form'
import { PriceEstimator } from '@/components/price-estimator'
import { TestimonialsSection } from '@/components/testimonials-section'
import { FAQSection } from '@/components/faq-section'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Sparkles, ShieldCheck, Heart } from 'lucide-react'

export default function HomeInteriorsLandingPage() {
  const scrollToForm = () => {
    document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-white font-sans selection:bg-[#ee6669]/30">
      <LandingNavigation />
      
      <main>
        {/* Hero Section */}
        <LandingHero />

        {/* Brand Story & Lead Form Section - PRIMARY CONVERSION */}
        <section id="get-quote" className="py-24 lg:py-32 bg-white relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              
              {/* Left Column: Storytelling & Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#ee6669]/10 px-4 py-1 rounded-full text-[#ee6669] text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" /> Our Philosophy
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 leading-[1.1] tracking-tight">
                    Interiors that reflect <span className="text-[#ee6669]">who you are.</span>
                  </h2>
                  <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-xl">
                    At Grospace, we don't just design rooms; we create sanctuaries for families. Our design philosophy balances premium aesthetics with the practical needs of a modern Indian household.
                  </p>
                </div>

                {/* Trust Points */}
                <div className="grid sm:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 transition-colors hover:bg-white hover:shadow-xl group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#ee6669]/10 transition-colors">
                      <ShieldCheck className="w-6 h-6 text-[#ee6669]" />
                    </div>
                    <h4 className="font-serif text-xl text-zinc-900">10-Year Warranty</h4>
                    <p className="text-sm text-zinc-500 font-light">Comprehensive coverage for your peace of mind.</p>
                  </div>
                  <div className="space-y-3 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 transition-colors hover:bg-white hover:shadow-xl group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#ee6669]/10 transition-colors">
                      <Heart className="w-6 h-6 text-[#ee6669]" />
                    </div>
                    <h4 className="font-serif text-xl text-zinc-900">1000+ Families</h4>
                    <p className="text-sm text-zinc-500 font-light">Trusted by homeowners across Bhopal.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center gap-6">
                   <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" className="w-full h-full object-cover" />
                        </div>
                      ))}
                   </div>
                   <div className="text-sm font-light text-zinc-500">
                      Join 1,000+ happy homeowners in Bhopal
                   </div>
                </div>
              </motion.div>

              {/* Right Column: The Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <LandingForm />
              </motion.div>

            </div>
          </div>
          
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50/50 -z-10 skew-x-12 translate-x-1/2" />
        </section>

        {/* Stats & Trust Bar */}
        <LandingStats />

        {/* Budget Section */}
        <LandingBudget />

        {/* Warranty Section - DARK PREMIUM */}
        <LandingWarranty />

        {/* Price Estimator Section - CREATIVE HERO MOTO */}
        <section className="bg-zinc-50 py-32 lg:py-48 relative overflow-hidden">
           {/* Creative Background Elements */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
             <span className="absolute -top-10 -left-20 text-[300px] font-serif font-bold text-[#2d1b4e]">BUDGET</span>
           </div>
           
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 mb-32">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Left Column: Moto & Story */}
                <div className="space-y-10 text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 bg-white border border-[#ee6669]/20 px-8 py-3 rounded-full text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.4em] shadow-sm"
                  >
                    <Sparkles className="w-4 h-4" /> Transparency at its Heart
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl lg:text-[84px] font-serif font-light text-[#2d1b4e] leading-[1] tracking-tight"
                  >
                    Plan with <span className="text-[#ee6669] italic">Confidence,</span> <br/>
                    Design without <span className="text-[#ee6669] italic">Compromise.</span>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl lg:text-2xl text-zinc-500 font-light max-w-xl leading-relaxed"
                  >
                    No hidden costs. No guesswork. Use our premium estimator to discover the real investment for your dream home in Bhopal.
                  </motion.p>

                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '80px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-1 bg-[#ee6669] rounded-full"
                  />
                </div>

                {/* Right Column: Designed Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative group"
                >
                  <div className="relative h-[600px] w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group-hover:border-[#ee6669]/10 transition-colors duration-700">
                    <Image 
                      src="/images/living%20room.jpg" 
                      alt="Premium Interior Budgeting" 
                      fill 
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e]/40 to-transparent" />
                  </div>
                  
                  {/* Floating Trust Badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-zinc-100 hidden md:block max-w-[260px] space-y-4"
                  >
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#ee6669]/10 flex items-center justify-center">
                           <ShieldCheck className="w-5 h-5 text-[#ee6669]" />
                        </div>
                        <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-widest leading-none">Price Promise</p>
                     </div>
                     <p className="text-sm font-serif text-[#2d1b4e] leading-relaxed italic">"Get exact quotes delivered to your inbox within minutes."</p>
                  </motion.div>
                </motion.div>

              </div>
           </div>
           
           <div className="relative z-10">
             <PriceEstimator />
           </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* Mobile Sticky CTA */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="lg:hidden fixed bottom-6 left-6 right-6 z-50"
        >
           <Button 
            onClick={scrollToForm}
            className="w-full bg-[#ee6669] hover:bg-[#dd5558] text-white font-bold py-7 rounded-2xl shadow-2xl shadow-[#ee6669]/40 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
           >
             Book Free Consultation <ArrowRight className="w-4 h-4" />
           </Button>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}
