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

        {/* Price Estimator */}
        <section className="bg-zinc-50 py-24 lg:py-32">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 tracking-tight">Estimate Your <span className="text-[#ee6669]">Interior Budget</span></h2>
                <p className="text-zinc-500 text-lg font-light max-w-2xl mx-auto">Get an instant, transparent estimate for your home project in just a few clicks.</p>
              </motion.div>
           </div>
           <PriceEstimator />
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
